# A-1 Visualization Studio v0.6.4 — Status + Error Visibility Fix

This build fixes the issue where clicking **Generate AI render** could return no visible generated image and no useful error.

## What changed from v0.6.3

- Generation status is now locked during/after API generation, so the app does not overwrite real API errors with “Ready to generate.”
- The After panel now shows a clear message while generation is running.
- If OpenAI/Vercel/API fails, the error is shown both in the status line and in the After panel.
- Added a 90-second browser timeout message with guidance.
- Better visible messages for server timeout, billing, missing key, payload too large, and empty API response.

## How to test

1. Upload site image.
2. Select Fence or Furniture mode.
3. Upload at least one product reference image.
4. Confirm API credit usage.
5. Select OpenAI.
6. Click Generate AI render.

If it fails, copy the exact message shown in the After panel/status line. That message is now preserved.

## Note

If generation still times out, set these Vercel environment variables for faster testing:

```env
OPENAI_IMAGE_SIZE=1024x1024
OPENAI_IMAGE_QUALITY=medium
```

Then redeploy.
