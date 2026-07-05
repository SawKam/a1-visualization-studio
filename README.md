# A-1 Visualization Studio v0.5.4 — Stability AI Control Trial

This build upgrades the previous multi-provider trial by wiring **Stability AI** as a real generation provider.

## What changed in v0.5.4

### Stability AI is now wired
- The **Stability AI** provider is no longer only scaffolded.
- `/api/generate-image` now routes Stability requests to:
  - `https://api.stability.ai/v2beta/stable-image/control/structure`
- The app sends the **local concept preview** as the structure/control image.
- This means Stability receives a guide image that already contains:
  - the original site photo
  - selected product placement
  - local fence/furniture overlay
  - perspective path / placement intent

### Stability key testing improved
- `/api/test-provider` now validates the Stability API key using the Stability balance endpoint:
  - `https://api.stability.ai/v1/user/balance`
- `/api/health` now shows Stability as **ready** when `STABILITY_API_KEY` is configured.

## Provider behavior

| Provider | Status in v0.5.4 | Notes |
|---|---|---|
| Local preview only | Ready | No API cost. Validates placement and product logic. |
| Pollinations | Ready | Free workflow test only. Output may not preserve the uploaded image. |
| Stability AI | Wired | Uses Stable Image Control Structure with the local preview as guide image. |
| OpenAI | Wired if key exists | Optional. Requires `OPENAI_API_KEY`. |
| Replicate | Scaffolded | Token detection only. |
| Hugging Face | Scaffolded | Key detection only. |

## Required Vercel environment variable for Stability

Add this in Vercel:

```env
STABILITY_API_KEY=your_stability_api_key_here
```

Recommended optional values:

```env
DEFAULT_AI_PROVIDER=stability
STABILITY_MODE=control-structure
STABILITY_OUTPUT_FORMAT=png
STABILITY_CONTROL_STRENGTH=0.72
STABILITY_NEGATIVE_PROMPT=people, cars, text, watermark, logo, deformed fence, wrong building, distorted architecture, unrealistic shadows, extra products
```

After adding environment variables, redeploy the project.

## How to test Stability

1. Upload site image.
2. Select fence/furniture product.
3. Draw placement or use automatic local placement.
4. Click **Generate local preview**.
5. Select **Stability AI** from provider dropdown.
6. Click **Test API connection**.
7. Click **Generate AI refinement**.

## Important limitation

Stability Control Structure should preserve placement better than Pollinations, but it may still reinterpret the scene. This is the first live Stability test build. We should evaluate output quality and then tune:

- `STABILITY_CONTROL_STRENGTH`
- prompt wording
- whether to use Control Structure or SD3 image-to-image mode
- local guide image strength and visual clarity

## Alternate Stability mode

The backend includes an experimental SD3 image-to-image mode. To try it, set:

```env
STABILITY_MODE=sd3-image-to-image
STABILITY_SD3_MODEL=sd3.5-large
STABILITY_IMAGE_STRENGTH=0.45
```

Then redeploy.

## Files changed

- `api/generate-image.js`
- `api/test-provider.js`
- `api/health.js`
- `index.html`
- `app.js`
- `.env.example`
- `README.md`
