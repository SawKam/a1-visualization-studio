# A-1 Visualization Studio v0.5.6 — Stability Guide-Lock Trial

This build responds to the v0.5.5 issue where Stability preserved the site better, but still ignored the locally generated fence/furniture reference and sometimes generated the wrong product style.

## What changed in v0.5.6

### Stability now uses a guide-lock workflow
Instead of sending only the original site image as the Stability base image, the app now sends a **clean local concept guide** as the base image.

That clean guide is made from the local preview but removes the UI label before sending it to Stability.

### Local reference is locked back onto the result
After the Stability result returns, the app redraws the selected local fence/furniture guide over the AI output.

This prevents the final preview from drifting into unrelated outputs such as:
- wooden fence
- solid privacy fence
- ranch fence
- wrong product design
- wrong color

### Stability still uses inpaint
The Stability provider still uses:

```text
/v2beta/stable-image/edit/inpaint
```

But now the base image is the clean local concept, not only the original site photo.

## Why this version is needed

v0.5.4 used Control Structure and changed the whole scene.
v0.5.5 used original-photo inpaint and preserved the scene, but ignored the local fence reference.
v0.5.6 combines both ideas:

1. use the local preview as the base visual guide
2. use masking to constrain the edit region
3. lock the selected product overlay back onto the final result

## Required Vercel environment variables

```env
STABILITY_API_KEY=your_stability_api_key_here
STABILITY_MODE=edit-inpaint
STABILITY_OUTPUT_FORMAT=png
```

Recommended negative prompt:

```env
STABILITY_NEGATIVE_PROMPT=people, cars, text, watermark, logo, deformed fence, wrong building, distorted architecture, unrealistic shadows, extra products, extra landscaping, wooden fence, timber fence, brown fence, solid privacy fence, ranch fence, different product design
```

## How to test

1. Upload site image.
2. Select fence/furniture product.
3. Generate local preview and check that the local preview is correct.
4. Choose **Stability AI (guide-lock / inpaint)**.
5. Click **Test API connection**.
6. Click **Generate AI refinement**.

## Expected result

The final result should stay much closer to the locally generated preview. It may still need realism improvements, but it should no longer completely replace the selected fence with an unrelated wooden or solid fence.

## Files changed

- `app.js`
- `api/generate-image.js`
- `api/health.js`
- `api/test-provider.js`
- `index.html`
- `.env.example`
- `README.md`
