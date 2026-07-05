function providersStatus() {
  return {
    openai: {
      configured: Boolean(process.env.OPENAI_API_KEY),
      ready: Boolean(process.env.OPENAI_API_KEY),
      message: process.env.OPENAI_API_KEY
        ? 'OPENAI_API_KEY detected. Primary provider for internal trials.'
        : 'Missing OPENAI_API_KEY.',
    },
    stability: {
      configured: Boolean(process.env.STABILITY_API_KEY),
      ready: Boolean(process.env.STABILITY_API_KEY),
      message: process.env.STABILITY_API_KEY
        ? 'STABILITY_API_KEY detected. Experimental provider only.'
        : 'Missing STABILITY_API_KEY.',
    },
    pollinations: {
      configured: true,
      ready: true,
      message: 'Public endpoint. Developer connectivity test only; not recommended for visualization quality.',
    },
    'local-preview': {
      configured: true,
      ready: true,
      message: 'No external key needed. Developer test mode only.',
    },
  };
}

export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    service: 'a1-visualization-studio-api',
    version: 'v0.6.4-status-fix',
    providers: providersStatus(),
  });
}
