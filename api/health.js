function providersStatus() {
  return {
    'local-preview': {
      configured: true,
      ready: true,
      message: 'Built-in browser preview mode.',
    },
    pollinations: {
      configured: true,
      ready: true,
      message: 'Public endpoint. Good for workflow trials; fidelity may be limited.',
    },
    openai: {
      configured: Boolean(process.env.OPENAI_API_KEY),
      ready: Boolean(process.env.OPENAI_API_KEY),
      message: process.env.OPENAI_API_KEY ? 'Server key detected.' : 'Missing OPENAI_API_KEY.',
    },
    stability: {
      configured: Boolean(process.env.STABILITY_API_KEY),
      ready: false,
      message: process.env.STABILITY_API_KEY ? 'Key detected. Generation route still scaffolded.' : 'Missing STABILITY_API_KEY.',
    },
    replicate: {
      configured: Boolean(process.env.REPLICATE_API_TOKEN),
      ready: false,
      message: process.env.REPLICATE_API_TOKEN ? 'Token detected. Generation route still scaffolded.' : 'Missing REPLICATE_API_TOKEN.',
    },
    huggingface: {
      configured: Boolean(process.env.HUGGINGFACE_API_KEY),
      ready: false,
      message: process.env.HUGGINGFACE_API_KEY ? 'Key detected. Generation route still scaffolded.' : 'Missing HUGGINGFACE_API_KEY.',
    },
  };
}

export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    service: 'a1-visualization-studio-api',
    version: 'v0.5.2',
    providers: providersStatus(),
  });
}
