export const config = {
  maxDuration: 60,
};

const PROVIDER_LABELS = {
  'local-preview': 'Local preview only',
  pollinations: 'Pollinations',
  openai: 'OpenAI',
  stability: 'Stability AI',
  replicate: 'Replicate',
  huggingface: 'Hugging Face',
};

function dataUrlToBlobPart(dataUrl) {
  const match = /^data:(.+?);base64,(.+)$/.exec(dataUrl || '');
  if (!match) throw new Error('Invalid image payload. Expected base64 data URL.');
  return {
    mime: match[1],
    buffer: Buffer.from(match[2], 'base64'),
  };
}

function appendImage(form, fieldName, dataUrl, filename) {
  const { mime, buffer } = dataUrlToBlobPart(dataUrl);
  const blob = new Blob([buffer], { type: mime });
  form.append(fieldName, blob, filename);
}

function extractImageFromOpenAIResponse(data) {
  if (data?.data?.[0]?.b64_json) return `data:image/png;base64,${data.data[0].b64_json}`;
  if (data?.data?.[0]?.url) return data.data[0].url;
  if (Array.isArray(data?.output)) {
    for (const item of data.output) {
      if (Array.isArray(item.content)) {
        for (const content of item.content) {
          if (content.type === 'output_image' && content.image_base64) {
            return `data:image/png;base64,${content.image_base64}`;
          }
        }
      }
    }
  }
  return '';
}

function buildFullPrompt({
  prompt,
  productName,
  category,
  provider,
  placementSummary,
  color,
  height,
  postCtc,
  topOption,
  setsCount,
}) {
  let providerNote = 'Preserve the site architecture, camera angle, perspective, daylight, ground, road, building, windows, and background as much as possible.';
  if (provider === 'pollinations') {
    providerNote = 'Important: this provider is a trial text-to-image route and may not perfectly preserve the original uploaded site photo or the exact product geometry. Still aim to match the controlled concept and product intent as closely as possible.';
  }
  if (provider === 'stability') {
    providerNote = 'Use the original site photograph as the base image. Preserve every unmasked part of the scene: building, sky, road, pavement, landscaping, camera angle, and perspective. Edit only the masked placement region and turn it into a realistic product visualization.';
  }

  const metadataLines = [
    productName ? `Selected product: ${productName}.` : '',
    category ? `Product family: ${category}.` : '',
    color ? `Selected color / finish: ${color}.` : '',
    height ? `Selected height: ${height}.` : '',
    postCtc ? `Selected post CTC / spacing: ${postCtc}.` : '',
    topOption ? `Selected top option: ${topOption}.` : '',
    setsCount ? `Selected furniture set count: ${setsCount}.` : '',
    placementSummary ? `Placement instruction: ${placementSummary}` : '',
  ].filter(Boolean);

  return [
    'Create a realistic sales visualization for A-1 Fence / Meshable.',
    'Use image 1 as the original site photograph.',
    provider === 'stability'
      ? 'For Stability AI, respect the edit mask and only change the intended product placement zone.'
      : 'Use image 2 as the controlled placement guide showing where the selected product should appear.',
    providerNote,
    'Replace any rough overlay with a realistic product visualization. Keep product geometry and color faithful to the approved reference and placement intent.',
    ...metadataLines,
    'Do not add text labels, watermarks, people, extra vehicles, extra landscapes, or unrelated objects.',
    'Do not replace the factory/building/site with a different scene.',
    '',
    'User/product instruction:',
    prompt || 'Create a realistic visualization based on the selected product and placement guide.',
  ].join('\n');
}

async function fetchBinaryAsDataUrl(response) {
  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const mime = response.headers.get('content-type') || 'image/png';
  return `data:${mime};base64,${base64}`;
}

async function responseToJsonOrText(response) {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) return response.json();
  return { raw: await response.text() };
}

async function generateWithOpenAI(body) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const err = new Error('OPENAI_API_KEY is not configured on the server.');
    err.statusCode = 500;
    throw err;
  }

  const {
    originalImage,
    conceptImage,
    prompt,
    productName,
    category,
    references = [],
    placementSummary,
    color,
    height,
    postCtc,
    topOption,
    setsCount,
  } = body || {};
  if (!originalImage || !conceptImage || !prompt) {
    const err = new Error('Missing originalImage, conceptImage, or prompt.');
    err.statusCode = 400;
    throw err;
  }

  const model = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
  const fullPrompt = buildFullPrompt({ prompt, productName, category, provider: 'openai', placementSummary, color, height, postCtc, topOption, setsCount });

  const form = new FormData();
  form.append('model', model);
  form.append('prompt', fullPrompt);
  form.append('size', process.env.OPENAI_IMAGE_SIZE || '1536x1024');
  form.append('quality', process.env.OPENAI_IMAGE_QUALITY || 'medium');
  form.append('background', 'auto');
  appendImage(form, 'image', originalImage, 'original-site.jpg');
  appendImage(form, 'image', conceptImage, 'controlled-placement-guide.jpg');

  references.slice(0, 3).forEach((ref, index) => {
    if (ref?.image && String(ref.image).startsWith('data:image/')) {
      appendImage(form, 'image', ref.image, `product-reference-${index + 1}.png`);
    }
  });

  const response = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });

  const data = await responseToJsonOrText(response);
  if (!response.ok) {
    const err = new Error(data?.error?.message || data?.message || 'OpenAI image API request failed.');
    err.statusCode = response.status;
    err.details = data;
    throw err;
  }

  const image = extractImageFromOpenAIResponse(data);
  if (!image) {
    const err = new Error('OpenAI response did not contain an image.');
    err.statusCode = 502;
    err.details = data;
    throw err;
  }

  return { image, provider: 'openai', providerLabel: PROVIDER_LABELS.openai, model };
}

async function generateWithPollinations(body) {
  const { prompt, productName, category, placementSummary, color, height, postCtc, topOption, setsCount } = body || {};
  const fullPrompt = buildFullPrompt({ prompt, productName, category, provider: 'pollinations', placementSummary, color, height, postCtc, topOption, setsCount });
  const width = 1344;
  const heightPx = 768;
  const seed = Math.floor(Date.now() % 1000000);
  const model = process.env.POLLINATIONS_MODEL || 'flux';
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=${width}&height=${heightPx}&model=${encodeURIComponent(model)}&seed=${seed}&nologo=true&safe=true`;

  const response = await fetch(url, { method: 'GET', headers: { Accept: 'image/*' } });
  if (!response.ok) {
    const err = new Error(`Pollinations request failed with status ${response.status}.`);
    err.statusCode = response.status;
    throw err;
  }

  const image = await fetchBinaryAsDataUrl(response);
  return { image, provider: 'pollinations', providerLabel: PROVIDER_LABELS.pollinations, model };
}

async function generateWithStability(body) {
  const apiKey = process.env.STABILITY_API_KEY;
  if (!apiKey) {
    const err = new Error('STABILITY_API_KEY is not configured on the server.');
    err.statusCode = 500;
    throw err;
  }

  const {
    originalImage,
    conceptImage,
    editMask,
    prompt,
    productName,
    category,
    placementSummary,
    color,
    height,
    postCtc,
    topOption,
    setsCount,
  } = body || {};

  const mode = process.env.STABILITY_MODE || 'edit-inpaint';
  const outputFormat = process.env.STABILITY_OUTPUT_FORMAT || 'png';
  const negativePrompt = process.env.STABILITY_NEGATIVE_PROMPT || 'people, cars, text, watermark, logo, different building, changed architecture, distorted fence, extra vegetation, fantasy scene, unrelated landscape';
  const fullPrompt = buildFullPrompt({ prompt, productName, category, provider: 'stability', placementSummary, color, height, postCtc, topOption, setsCount });

  let endpoint = 'https://api.stability.ai/v2beta/stable-image/edit/inpaint';
  const form = new FormData();

  if (mode === 'control-structure') {
    if (!conceptImage || !prompt) {
      const err = new Error('Missing conceptImage or prompt for Stability AI control structure generation.');
      err.statusCode = 400;
      throw err;
    }
    endpoint = 'https://api.stability.ai/v2beta/stable-image/control/structure';
    appendImage(form, 'image', conceptImage, 'local-concept-structure.png');
    form.append('control_strength', process.env.STABILITY_CONTROL_STRENGTH || '0.72');
  } else {
    if (!originalImage || !editMask || !prompt) {
      const err = new Error('Missing originalImage, editMask, or prompt for Stability AI preserve-site generation.');
      err.statusCode = 400;
      throw err;
    }
    appendImage(form, 'image', originalImage, 'original-site.jpg');
    appendImage(form, 'mask', editMask, 'placement-mask.png');
    endpoint = 'https://api.stability.ai/v2beta/stable-image/edit/inpaint';
    if (process.env.STABILITY_INPAINT_SEED) form.append('seed', process.env.STABILITY_INPAINT_SEED);
  }

  form.append('prompt', fullPrompt);
  form.append('output_format', outputFormat);
  if (negativePrompt) form.append('negative_prompt', negativePrompt);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: 'image/*',
    },
    body: form,
  });

  const contentType = response.headers.get('content-type') || '';
  if (!response.ok) {
    const data = await responseToJsonOrText(response);
    const err = new Error(data?.errors?.[0] || data?.error || data?.message || `Stability AI request failed with status ${response.status}.`);
    err.statusCode = response.status;
    err.details = data;
    throw err;
  }

  if (!contentType.startsWith('image/')) {
    const data = await responseToJsonOrText(response);
    const image = data?.image ? `data:image/${outputFormat};base64,${data.image}` : '';
    if (!image) {
      const err = new Error('Stability AI response did not contain an image.');
      err.statusCode = 502;
      err.details = data;
      throw err;
    }
    return { image, provider: 'stability', providerLabel: PROVIDER_LABELS.stability, model: mode };
  }

  const image = await fetchBinaryAsDataUrl(response);
  return { image, provider: 'stability', providerLabel: PROVIDER_LABELS.stability, model: mode };
}

async function scaffoldProvider(provider, envName) {
  if (!process.env[envName]) {
    const err = new Error(`${envName} is not configured on the server.`);
    err.statusCode = 500;
    throw err;
  }
  const err = new Error(`${PROVIDER_LABELS[provider]} is scaffolded. Connection plumbing is ready, but final generation endpoint/model mapping still needs to be implemented.`);
  err.statusCode = 501;
  throw err;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const provider = body?.provider || process.env.DEFAULT_AI_PROVIDER || 'stability';

    if (provider === 'local-preview') {
      return res.status(200).json({
        image: body?.conceptImage || body?.originalImage,
        provider,
        providerLabel: PROVIDER_LABELS[provider],
        model: 'local-preview',
        note: 'No external provider was used.',
      });
    }

    let result;
    switch (provider) {
      case 'openai':
        result = await generateWithOpenAI(body);
        break;
      case 'pollinations':
        result = await generateWithPollinations(body);
        break;
      case 'stability':
        result = await generateWithStability(body);
        break;
      case 'replicate':
        result = await scaffoldProvider('replicate', 'REPLICATE_API_TOKEN');
        break;
      case 'huggingface':
        result = await scaffoldProvider('huggingface', 'HUGGINGFACE_API_KEY');
        break;
      default: {
        const err = new Error(`Unsupported provider: ${provider}`);
        err.statusCode = 400;
        throw err;
      }
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({
      error: error.message || 'Server error while generating image.',
      details: error.details || null,
    });
  }
}
