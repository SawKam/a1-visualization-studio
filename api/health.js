function providersStatus() {
  return {
    'local-preview': {
      configured: true,
      ready: true,
      message: 'No external key needed. Returns the site image for deployment testing.',
    },
    openai: {
      configured: Boolean(process.env.OPENAI_API_KEY),
      ready: Boolean(process.env.OPENAI_API_KEY),
      message: process.env.OPENAI_API_KEY
        ? 'OPENAI_API_KEY detected. Best provider for direct multi-reference image guidance.'
        : 'Missing OPENAI_API_KEY.',
    },
    stability: {
      configured: Boolean(process.env.STABILITY_API_KEY),
      ready: Boolean(process.env.STABILITY_API_KEY),
      message: process.env.STABILITY_API_KEY
        ? 'STABILITY_API_KEY detected. Experimental in simple reference mode.'
        : 'Missing STABILITY_API_KEY.',
    },
    pollinations: {
      configured: true,
      ready: true,
      message: 'Public endpoint. Prompt-led only, with limited fidelity to uploaded images.',
    },
  };
}

export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    service: 'a1-visualization-studio-api',
    version: 'v0.6.2-simple-reference-compressed',
    providers: providersStatus(),
  });
}
