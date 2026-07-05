export const config = { maxDuration: 30 };

async function testStabilityKey() {
  if (!process.env.STABILITY_API_KEY) {
    return { status: 500, body: { ok: false, provider: 'stability', ready: false, error: 'STABILITY_API_KEY is not configured.' } };
  }
  const response = await fetch('https://api.stability.ai/v1/user/balance', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
      Accept: 'application/json',
    },
  });
  const data = await response.json().catch(async () => ({ raw: await response.text() }));
  if (!response.ok) {
    return {
      status: response.status,
      body: {
        ok: false,
        provider: 'stability',
        ready: false,
        error: data?.message || data?.error || `Stability key test failed with status ${response.status}.`,
        details: data,
      },
    };
  }
  return {
    status: 200,
    body: {
      ok: true,
      provider: 'stability',
      ready: true,
      message: 'Stability key validated. Use as experimental only.',
      balance: data?.credits ?? data?.balance ?? data,
    },
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const provider = body?.provider;
    if (!provider) return res.status(400).json({ error: 'Missing provider.' });

    if (provider === 'local-preview') {
      return res.status(200).json({ ok: true, provider, ready: true, message: 'Local preview mode is ready.' });
    }

    if (provider === 'pollinations') {
      const testUrl = 'https://image.pollinations.ai/prompt/hello?width=64&height=64&seed=1&nologo=true';
      const response = await fetch(testUrl, { method: 'GET', headers: { Accept: 'image/*' } });
      if (!response.ok) return res.status(502).json({ ok: false, provider, ready: false, error: `Pollinations endpoint returned ${response.status}.` });
      return res.status(200).json({ ok: true, provider, ready: true, message: 'Pollinations endpoint responded. Developer test only.' });
    }

    if (provider === 'openai') {
      if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ ok: false, provider, ready: false, error: 'OPENAI_API_KEY is not configured.' });
      }
      return res.status(200).json({ ok: true, provider, ready: true, message: 'OpenAI key detected. Ready for internal trial generation.' });
    }

    if (provider === 'stability') {
      const result = await testStabilityKey();
      return res.status(result.status).json(result.body);
    }

    return res.status(400).json({ ok: false, error: `Unsupported provider: ${provider}` });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || 'Provider test failed.' });
  }
}
