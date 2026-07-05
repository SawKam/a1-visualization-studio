# A-1 Visualization Studio v0.6.3 — Internal Trial Ready UI

This build refines the simple AI-reference workflow before sharing with internal testers.

## Main purpose
Make the app less confusing and harder to misuse before asking other people at A-1 / Meshable to try it.

## Key changes from v0.6.2

### 1. Clear mode separation
The app now starts with a clear choice:
- **Fence / Perimeter**
- **Meshable Furniture**

Changing the mode updates:
- reference-image labels
- placeholders
- placement intent buttons
- generated prompt
- review summary
- mismatch validation

### 2. Controlled intent buttons
Fence mode includes:
- Full visible perimeter
- Front boundary only
- Entrance zone
- Garden edge
- Let AI decide

Furniture mode includes:
- One seating set
- Multiple sets
- Dining setup
- Terrace lounge
- Let AI decide

### 3. Prompt mismatch warning
If the selected mode and the written instruction conflict, the app warns the user and blocks generation.

Examples:
- Furniture mode + text mentions fence/perimeter/boundary/post
- Fence mode + text mentions chair/table/seating/sofa/dining

### 4. OpenAI-first workflow
OpenAI is the primary provider.
Stability remains available as experimental.
Pollinations and local preview are hidden under developer tools.

### 5. Review before generation
The app now shows a review summary before generation:
- Mode
- Intent
- Product
- Color/finish
- Height/size
- Quantity/count
- Site image status
- Reference image count
- Provider

### 6. API-credit confirmation
The Generate button stays disabled until the user confirms that the run may use API credits.

### 7. Better errors
The front end now gives clearer hints for:
- missing API key
- missing site image
- missing product reference
- API payload too large
- quota/billing issues
- mode/prompt mismatch

## Environment variables

For OpenAI testing:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_IMAGE_MODEL=gpt-image-1
OPENAI_IMAGE_SIZE=1536x1024
OPENAI_IMAGE_QUALITY=medium
```

For Stability testing:

```env
STABILITY_API_KEY=your_stability_key
STABILITY_OUTPUT_FORMAT=png
```

## Recommended internal test sequence

1. Deploy to Vercel.
2. Confirm `/api/health` shows OpenAI ready.
3. Test Fence mode with one site image + two fence references.
4. Test Furniture mode with one site image + two furniture references.
5. Try a mismatched prompt intentionally and confirm warning works.
6. Give the app to 2–3 internal users only after the above works.

## Notes
This is not yet the public/customer version. It is an internal trial build for checking UI clarity, API reliability, and output quality.
