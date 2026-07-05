# A-1 Visualization Studio v0.5.3 — Multi-provider API Trial

This build extends v0.5.1 into a **multi-provider API trial** so you can deploy one UI and switch providers from the front end.

## What is new in v0.5.3

### Front-end additions
- Added a **Multi-provider API Trial** panel in Step 04.
- Added a provider selector with these options:
  - Local preview only
  - Pollinations
  - OpenAI
  - Stability AI (scaffold)
  - Replicate (scaffold)
  - Hugging Face (scaffold)
- Added **Test API connection** button.
- Added **Refresh provider status** button.
- Added visual provider readiness badges.
- Added provider-specific help text so you know which provider is fully ready and which is only scaffolded.

### Backend additions
- `/api/health` now returns readiness/configuration status for multiple providers.
- Added `/api/test-provider` for provider-specific connection checks.
- `/api/generate-image` now routes by provider.

## Provider behavior in this build

| Provider | Status in v0.5.3 | Notes |
|---|---|---|
| Local preview only | Fully ready | No external API call. Best for UI / logic / placement trial. |
| Pollinations | Ready for simple online test | Good for proving end-to-end API workflow. Fidelity to the uploaded site/reference may be limited. |
| OpenAI | Fully wired | Best option in this build for realistic refinement using original site image + local guide + product references. |
| Stability AI | Scaffolded | Key detection and provider selection are ready; final generation endpoint is still pending. |
| Replicate | Scaffolded | Token detection and provider selection are ready; final model wiring is still pending. |
| Hugging Face | Scaffolded | Key detection and provider selection are ready; final model/provider wiring is still pending. |

## Recommended testing order

1. **Local preview only**
   - Validate upload, product selection, prompt generation, manual fence path, and result download.
2. **Pollinations**
   - Validate that your deployed site can reach an external image provider without storing a paid key.
3. **OpenAI**
   - Validate the higher-fidelity refinement workflow once you are happy with the deployment and UI flow.

## Environment variables

Copy `.env.example` values into your deployment environment.

Minimum for OpenAI trial:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_IMAGE_MODEL=gpt-image-1
```

Pollinations works in this build without a server key.

## Local run

```bash
npm install
npm start
```

Then test:
- `http://localhost:3000`
- `http://localhost:3000/api/health`
- `http://localhost:3000/api/test-provider` via the UI button

## Suggested deployment test on Vercel

1. Create a Vercel project from this folder.
2. Add environment variables.
3. Deploy.
4. Open the app.
5. In Step 04:
   - choose provider
   - click **Test API connection**
   - generate local preview
   - generate AI refinement

## File summary

- `index.html` — customer + admin UI
- `styles.css` — UI styling
- `app.js` — front-end logic, provider switching, placement workflow
- `api/health.js` — multi-provider health endpoint
- `api/test-provider.js` — provider connection test route
- `api/generate-image.js` — provider-routed image generation endpoint

## Important limitation in v0.5.3

Only **OpenAI** is currently wired for the full “site image + local placement guide + product references” refinement workflow.

**Pollinations** is included mainly as a **free workflow trial provider**.
It proves deployment and API connectivity, but it should not yet be treated as the final-quality visualization engine.


## Fix in v0.5.3

- Fixed the upload dialog opening twice on Windows/Chrome. The site upload area is already a label connected to the hidden file input, so the extra JavaScript `siteInput.click()` call was removed.
