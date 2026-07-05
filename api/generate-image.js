export const config = { maxDuration: 60 };

const PROVIDER_LABELS = {
  'local-preview': 'Local preview only',
  openai: 'OpenAI',
  stability: 'Stability AI',
  pollinations: 'Pollinations',
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

async function responseToJsonOrText(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    return { raw: text };
  }
}

async function fetchBinaryAsDataUrl(response) {
  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const mime = response.headers.get('content-type') || 'image/png';
  return `data:${mime};base64,${base64}`;
}

function buildFullPrompt({ prompt, productName, category, color, height, quantity, intent, references = [], provider }) {
  const familyWord = category === 'furniture' ? 'Meshable outdoor furniture' : 'A-1 Fence / perimeter product';
  const referenceSummary = references.map((ref, index) => `Image ${index + 2} is the ${ref.label || ref.role || 'product reference'}.`).join(' ');
  const providerNote = provider === 'stability'
    ? 'Stability is experimental here and may follow prompt more than exact product references; preserve the site and product intent as strongly as possible.'
    : provider === 'pollinations'
      ? 'Pollinations is developer-only and prompt-led; it may not preserve exact uploaded images.'
      : 'Use all uploaded images together. The first image is the site photo. The additional images are authoritative product references.';

  const placementGuidance = category === 'furniture'
    ? 'Automatically identify the most practical outdoor placement zone and place the furniture naturally with believable scale, seating clearance, ground contact, and shadows.'
    : 'Automatically identify the most plausible visible perimeter, frontage, boundary, road edge, or compound line and place the fence naturally with believable perspective, continuity, corner logic, post rhythm, and shadows.';

  return [
    `Create a realistic visualization for ${familyWord}.`,
    'Preserve the uploaded site photo: building, wall, terrace, road/ground, sky, landscape, lighting direction, and camera angle must remain recognizable.',
    referenceSummary,
    providerNote,
    placementGuidance,
    'Use the uploaded product reference images as source of truth for geometry, material, color, proportions, motifs, mesh/panel details, and finish.',
    productName ? `Selected product / design: ${productName}.` : '',
    color ? `Selected color / finish: ${color}.` : '',
    height ? `Height / size guidance: ${height}.` : '',
    quantity ? `Quantity / count guidance: ${quantity}.` : '',
    intent ? `Selected placement intent: ${intent}.` : '',
    prompt || '',
    'Do not add text labels, logos, watermarks, unrelated people, unrelated objects, or replace the site with a different location.',
    'If the prompt and reference images conflict, keep the selected product family and uploaded product references as the priority.',
  ].filter(Boolean).join('\n');
}

async function generateWithOpenAI(body) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const err = new Error('OPENAI_API_KEY is not configured on the server. Add it in Vercel Environment Variables and redeploy.');
    err.statusCode = 500;
    throw err;
  }

  const { originalImage, prompt, productName, category, color, height, quantity, intent, references = [] } = body || {};
  if (!originalImage) {
    const err = new Error('Missing original site image.');
    err.statusCode = 400;
    throw err;
  }
  if (!references.length) {
    const err = new Error('Please upload at least one product reference image for OpenAI generation.');
    err.statusCode = 400;
    throw err;
  }

  const model = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
  const fullPrompt = buildFullPrompt({ prompt, productName, category, color, height, quantity, intent, references, provider: 'openai' });

  const form = new FormData();
  form.append('model', model);
  form.append('prompt', fullPrompt);
  form.append('size', process.env.OPENAI_IMAGE_SIZE || '1536x1024');
  form.append('quality', process.env.OPENAI_IMAGE_QUALITY || 'medium');

  // OpenAI requires array syntax for multiple image inputs.
  appendImage(form, 'image[]', originalImage, 'site-photo.jpg');
  references.slice(0, 3).forEach((ref, index) => appendImage(form, 'image[]', ref.image, `reference-${index + 1}.jpg`));

  const response = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });

  const data = await responseToJsonOrText(response);
  if (!response.ok) {
    const err = new Error(data?.error?.message || data?.message || data?.raw || 'OpenAI image API request failed.');
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
  const { prompt, productName, category, color, height, quantity, intent, references = [] } = body || {};
  const fullPrompt = buildFullPrompt({ prompt, productName, category, color, height, quantity, intent, references, provider: 'pollinations' });
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
  return { image, provider: 'pollinations', providerLabel: PROVIDER_LABELS.pollinations, model, note: 'Pollinations is prompt-led and developer-only. Use OpenAI for real reference-image testing.' };
}

async function generateWithStability(body) {
  const apiKey = process.env.STABILITY_API_KEY;
  if (!apiKey) {
    const err = new Error('STABILITY_API_KEY is not configured on the server.');
    err.statusCode = 500;
    throw err;
  }

  const { originalImage, prompt, productName, category, color, height, quantity, intent, references = [] } = body || {};
  if (!originalImage) {
    const err = new Error('Missing original site image for Stability generation.');
    err.statusCode = 400;
    throw err;
  }

  const fullPrompt = buildFullPrompt({ prompt, productName, category, color, height, quantity, intent, references, provider: 'stability' });
  const endpoint = 'https://api.stability.ai/v2beta/stable-image/edit/search-and-replace';
  const form = new FormData();
  appendImage(form, 'image', originalImage, 'site-photo.jpg');
  form.append('prompt', fullPrompt);
  form.append('search_prompt', category === 'furniture' ? 'empty outdoor area, terrace floor, patio floor, deck area, or garden seating zone' : 'site frontage, property boundary, compound edge, open perimeter edge, or road-side boundary');
  form.append('output_format', process.env.STABILITY_OUTPUT_FORMAT || 'png');
  form.append('negative_prompt', process.env.STABILITY_NEGATIVE_PROMPT || 'different building, text, watermark, unrelated scene, people, cars, random trees, wooden fence if not requested, unrelated furniture');

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
    const err = new Error(data?.errors?.[0] || data?.error || data?.message || data?.raw || `Stability AI request failed with status ${response.status}.`);
    err.statusCode = response.status;
    err.details = data;
    throw err;
  }

  if (!contentType.startsWith('image/')) {
    const data = await responseToJsonOrText(response);
    const image = data?.image ? `data:image/png;base64,${data.image}` : '';
    if (!image) {
      const err = new Error('Stability AI response did not contain an image.');
      err.statusCode = 502;
      err.details = data;
      throw err;
    }
    return { image, provider: 'stability', providerLabel: PROVIDER_LABELS.stability, model: 'search-and-replace' };
  }

  const image = await fetchBinaryAsDataUrl(response);
  return {
    image,
    provider: 'stability',
    providerLabel: PROVIDER_LABELS.stability,
    model: 'search-and-replace',
    note: 'Generated via Stability AI experimental route. OpenAI remains recommended for multi-reference image guidance.',
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const provider = body?.provider || 'openai';

    if (provider === 'local-preview') {
      return res.status(200).json({
        image: body?.originalImage || '',
        provider,
        providerLabel: PROVIDER_LABELS[provider],
        model: 'local-preview',
        note: 'No external AI call was made. This mode only returns the uploaded site image.',
      });
    }

    let result;
    switch (provider) {
      case 'openai':
        result = await generateWithOpenAI(body);
        break;
      case 'stability':
        result = await generateWithStability(body);
        break;
      case 'pollinations':
        result = await generateWithPollinations(body);
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
