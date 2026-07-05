# A-1 Visualization Studio v0.5.5 — Stability Preserve-Site Trial

This build changes the Stability workflow so the AI no longer treats the concept preview as a loose scene-generation guide.

## What changed in v0.5.5

### Stability AI now uses a preserve-site edit flow
- The Stability provider now defaults to:
  - `https://api.stability.ai/v2beta/stable-image/edit/inpaint`
- The app sends:
  - the **original site image** as the base photo
  - an automatically generated **edit mask** covering only the intended fence/furniture zone
  - a richer prompt with placement summary and selected product settings
- This is designed to preserve:
  - the building
  - road / ground plane
  - sky / background
  - camera angle and scene perspective

### Automatic edit-mask generation added
- For **fence** mode, the app builds a white mask strip along the chosen fence path and post height band.
- For **furniture** mode, the app builds white mask blocks around each placed furniture set.
- Black areas remain protected from editing.

### Stability messaging updated
- Provider label now shows **Stability AI (preserve site / inpaint)**.
- `/api/health` reports v0.5.5 and indicates the current Stability mode.
- `/api/test-provider` confirms the preserve-site workflow.

## Provider behavior in v0.5.5

| Provider | Status | Notes |
|---|---|---|
| Local preview only | Ready | No API cost. Validates placement and product logic. |
| Pollinations | Ready | Free workflow test only. Output may not preserve the uploaded image. |
| Stability AI | Wired | Uses original site image + generated edit mask for better preservation. |
| OpenAI | Wired if key exists | Still available as an alternate image-edit route. |
| Replicate | Scaffolded | Token detection only. |
| Hugging Face | Scaffolded | Key detection only. |

## Required Vercel environment variable

```env
STABILITY_API_KEY=your_stability_api_key_here
```

## Recommended environment variables

```env
DEFAULT_AI_PROVIDER=stability
STABILITY_MODE=edit-inpaint
STABILITY_OUTPUT_FORMAT=png
STABILITY_NEGATIVE_PROMPT=people, cars, text, watermark, logo, deformed fence, wrong building, distorted architecture, unrealistic shadows, extra products, extra landscaping
```

Optional fallback mode:

```env
STABILITY_MODE=control-structure
STABILITY_CONTROL_STRENGTH=0.72
```

## How to test

1. Upload a site image.
2. Select a fence or furniture product.
3. Use the default placement or manual placement tools.
4. Click **Generate local preview**.
5. Choose **Stability AI (preserve site / inpaint)**.
6. Click **Test API connection**.
7. Click **Generate AI refinement**.

## Expected improvement over v0.5.4

Compared to the old control-structure route, v0.5.5 should:
- preserve the original site scene better
- reduce full-scene reinvention
- focus AI edits only near the fence / furniture zone

## Important note

This is still a trial build. If output quality still needs improvement, the next tuning options are:
- refine mask size and softness
- tighten prompt language further
- add product-specific mask logic
- add a clean guide image without labels for future hybrid workflows
- test an OpenAI + Stability comparison mode

## Files changed

- `api/generate-image.js`
- `api/test-provider.js`
- `api/health.js`
- `index.html`
- `app.js`
- `.env.example`
- `README.md`
