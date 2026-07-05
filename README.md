# A-1 Visualization Studio v0.6.0 — Simple Reference AI Trial

This version intentionally simplifies the workflow.

## What changed
- No manual fence line drawing popup.
- No hidden admin library dependency for testing.
- User directly uploads:
  - site image
  - front / clean product reference
  - perspective / lifestyle reference
  - optional secondary reference
- AI is asked to decide the placement automatically.

## Best use
This version is best for quick testing when you want the AI to work mainly from uploaded reference images rather than from local placement overlays.

## Provider guidance
- **OpenAI**: recommended for this version because it can receive the site photo and multiple direct reference images in one image-edit request.
- **Stability AI**: available as an experimental route, but in this simple mode it is more prompt-led and may not follow uploaded reference images as strongly.
- **Pollinations**: useful only for rough testing.
- **Local preview**: returns the uploaded site image without external AI.

## Required environment variables
### For OpenAI
- `OPENAI_API_KEY`
- optional: `OPENAI_IMAGE_MODEL=gpt-image-1`
- optional: `OPENAI_IMAGE_SIZE=1536x1024`
- optional: `OPENAI_IMAGE_QUALITY=medium`

### For Stability AI
- `STABILITY_API_KEY`
- optional: `STABILITY_OUTPUT_FORMAT=png`
- optional: `STABILITY_NEGATIVE_PROMPT=...`

## Deployment
Upload the full project to GitHub or Vercel and deploy.

## Notes
If your goal is **“site image + product reference images + AI decides placement automatically”**, OpenAI is the stronger provider to test first in this version.
