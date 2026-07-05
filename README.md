# A-1 Visualization Studio v0.6.2 — Simple Reference AI Trial / OpenAI Image Array Fix

This version fixes the OpenAI error:

> Duplicate parameter: 'image'. You provided multiple values for this parameter...

## What changed in v0.6.2

- The OpenAI backend now sends multiple uploaded images using `image[]` array syntax.
- Site image + front reference + perspective reference + optional secondary reference can be sent together.
- Keeps the v0.6.1 client-side compression fix to reduce payload size for Vercel.
- Error handling remains improved so server errors are shown clearly in the app.

## Recommended provider

Use **OpenAI** for this simple version because it can use the site image and multiple direct product reference images together.

## Required Vercel environment variable

```env
OPENAI_API_KEY=your_openai_api_key_here
```

Optional:

```env
OPENAI_IMAGE_MODEL=gpt-image-1
OPENAI_IMAGE_SIZE=1536x1024
OPENAI_IMAGE_QUALITY=medium
```

## Deployment

Upload/replace this full folder in your GitHub repo and redeploy on Vercel.

