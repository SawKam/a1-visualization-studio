export const config = {
  maxDuration: 30,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const provider = body?.provider;
    if (!provider) {
      return res.status(400).json({ error: 'Missing provider.' });
    }

    if (provider === 'local-preview') {
      return res.status(200).json({ ok: true, provider, ready: true, message: 'Local preview mode is ready and needs no external API key.' });
    }

    if (provider === 'pollinations') {
      const testUrl = 'https://image.pollinations.ai/prompt/hello?width=64&height=64&seed=1&nologo=true';
      const response = await fetch(testUrl, { method: 'GET', headers: { Accept: 'image/*' } });
      if (!response.ok) {
        return res.status(502).json({ ok: false, provider, ready: false, error: `Pollinations endpoint returned ${response.status}.` });
      }
      return res.status(200).json({ ok: true, provider, ready: true, message: 'Pollinations endpoint responded successfully.' });
    }

    if (provider === 'openai') {
      if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ ok: false, provider, ready: false, error: 'OPENAI_API_KEY is not configured.' });
      }
      return res.status(200).json({ ok: true, provider, ready: true, message: 'OpenAI key detected on the server. Ready for image refinement tests.' });
    }

    if (provider === 'stability') {
      if (!process.env.STABILITY_API_KEY) {
        return res.status(500).json({ ok: false, provider, ready: false, error: 'STABILITY_API_KEY is not configured.' });
      }
      return res.status(200).json({ ok: true, provider, ready: false, message: 'Stability key detected. Route is scaffolded but final generation mapping is pending.' });
    }

    if (provider === 'replicate') {
      if (!process.env.REPLICATE_API_TOKEN) {
        return res.status(500).json({ ok: false, provider, ready: false, error: 'REPLICATE_API_TOKEN is not configured.' });
      }
      return res.status(200).json({ ok: true, provider, ready: false, message: 'Replicate token detected. Route is scaffolded but final generation mapping is pending.' });
    }

    if (provider === 'huggingface') {
      if (!process.env.HUGGINGFACE_API_KEY) {
        return res.status(500).json({ ok: false, provider, ready: false, error: 'HUGGINGFACE_API_KEY is not configured.' });
      }
      return res.status(200).json({ ok: true, provider, ready: false, message: 'Hugging Face key detected. Route is scaffolded but final generation mapping is pending.' });
    }

    return res.status(400).json({ ok: false, error: `Unsupported provider: ${provider}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: error.message || 'Provider test failed.' });
  }
}
