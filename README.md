# A-1 Visualization Studio v0.6.1 — Simple Reference AI Trial, compressed upload fix

This version fixes the error:

> Unexpected token 'R', "Request En"... is not valid JSON

That error usually happens when the browser sends a payload that is too large and Vercel returns a plain-text response such as **Request Entity Too Large** instead of JSON.

## What changed from v0.6.0

- Site image and reference images are automatically resized and compressed in the browser before sending to the API.
- Frontend now handles non-JSON server responses gracefully and shows the real message instead of a JSON parse error.
- Upload labels show compressed size and pixel dimensions.
- `/api/health` reports version `v0.6.1-simple-reference-compressed`.

## Workflow

1. Upload the site image.
2. Upload front / perspective / optional secondary product references.
3. Choose provider.
4. Generate AI render.

## Provider guidance

- **OpenAI** is recommended for this simplified direct-reference workflow.
- **Stability AI** remains experimental here and may not use product references as strongly.
- **Pollinations** remains only a rough workflow test.

## Environment variables

For OpenAI:

```env
OPENAI_API_KEY=your_key
OPENAI_IMAGE_MODEL=gpt-image-1
OPENAI_IMAGE_SIZE=1536x1024
OPENAI_IMAGE_QUALITY=medium
```

For Stability:

```env
STABILITY_API_KEY=your_key
STABILITY_OUTPUT_FORMAT=png
```

## Important

If you still get a large request error, use:

- one site image
- one or two reference images only
- avoid very large PNG screenshots
- use JPEG or WebP references where possible
