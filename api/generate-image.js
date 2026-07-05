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
  if (data?.data?.[0]?.b64_json) {
    return `data:image/png;base64,${data.data[0].b64_json}`;
  }
  if (data?.data?.[0]?.url) {
    return data.data[0].url;
  }
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

function buildFullPrompt({ prompt, productName, category, provider }) {
  const providerNote = provider === 'pollinations'
    ? 'Important: this provider is a trial text-to-image route and may not perfectly preserve the original uploaded site photo or the exact product geometry. Still aim to match the controlled concept and product intent as closely as possible.'
    : 'Preserve the site architecture, camera angle, perspective, daylight, ground, road, building, windows, and background as much as possible.';

  return [
    'Create a realistic sales visualization for A-1 Fence / Meshable.',
    'Use image 1 as the original site photograph.',
    'Use image 2 as the controlled placement guide showing where the selected product should appear.',
    providerNote,
    'Replace the rough overlay with a realistic product visualization. Keep product geometry and color faithful to the approved reference and placement guide.',
    `Selected product: ${productName || 'Approved product'}.`,
    `Product family: ${category || 'visualization'}.`,
    'Do not add text labels, watermarks, people, extra vehicles, or unrelated objects.',
    '',
    'User/product instruction:',
    prompt || 'Create a realistic visualization based on the selected product and placement guide.',
  ].join('\n');
}

async function fetchBinaryAsDataUrl(response) {
  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const mime = response.headers.get('content-type') || 'image/jpeg';
  return `data:${mime};base64,${base64}`;
}

async function generateWithOpenAI(body) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const err = new Error('OPENAI_API_KEY is not configured on the server.');
    err.statusCode = 500;
    throw err;
  }

  const { originalImage, conceptImage, prompt, productName, category, references = [] } = body || {};
  if (!originalImage || !conceptImage || !prompt) {
    const err = new Error('Missing originalImage, conceptImage, or prompt.');
    err.statusCode = 400;
    throw err;
  }

  const model = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
  const fullPrompt = buildFullPrompt({ prompt, productName, category, provider: 'openai' });

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

  const data = await response.json().catch(async () => ({ raw: await response.text() }));
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
  const { prompt, productName, category } = body || {};
  const fullPrompt = buildFullPrompt({ prompt, productName, category, provider: 'pollinations' });
  const width = 1344;
  const height = 768;
  const seed = Math.floor(Date.now() % 1000000);
  const model = process.env.POLLINATIONS_MODEL || 'flux';
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=${width}&height=${height}&model=${encodeURIComponent(model)}&seed=${seed}&nologo=true&safe=true`;

  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'image/*' },
  });

  if (!response.ok) {
    const err = new Error(`Pollinations request failed with status ${response.status}.`);
    err.statusCode = response.status;
    throw err;
  }

  const image = await fetchBinaryAsDataUrl(response);
  return { image, provider: 'pollinations', providerLabel: PROVIDER_LABELS.pollinations, model };
}

async function scaffoldProvider(provider, envName) {
  if (!process.env[envName]) {
    const err = new Error(`${envName} is not configured on the server.`);
    err.statusCode = 500;
    throw err;
  }
  const err = new Error(`${PROVIDER_LABELS[provider]} is scaffolded in v0.5.2. Connection plumbing is ready, but final generation endpoint/model mapping still needs to be implemented.`);
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
    const provider = body?.provider || process.env.DEFAULT_AI_PROVIDER || 'openai';

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
        result = await scaffoldProvider('stability', 'STABILITY_API_KEY');
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
