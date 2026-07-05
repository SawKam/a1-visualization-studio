const INTENTS = {
  fence: [
    { id: 'visible-perimeter', label: 'Full visible perimeter', text: 'Follow the visible perimeter/boundary of the property and turn the fence naturally around the corner wherever the site photo shows a corner.' },
    { id: 'front-boundary', label: 'Front boundary only', text: 'Place the fence only along the front visible boundary facing the viewer or road.' },
    { id: 'entrance-zone', label: 'Entrance zone', text: 'Place the fence around the entrance or gate-facing zone, keeping access and driveway logic realistic.' },
    { id: 'garden-edge', label: 'Garden edge', text: 'Place the fence along the garden or landscape edge visible in the site photo.' },
    { id: 'ai-decide', label: 'Let AI decide', text: 'Choose the most plausible boundary line in the site image and place the fence naturally.' },
  ],
  furniture: [
    { id: 'one-set', label: 'One seating set', text: 'Place one complete furniture set in the most practical outdoor seating area.' },
    { id: 'multiple-sets', label: 'Multiple sets', text: 'Place multiple furniture sets where they fit naturally without cluttering the scene.' },
    { id: 'dining-setup', label: 'Dining setup', text: 'Create an outdoor dining setup, keeping table and chair spacing realistic.' },
    { id: 'terrace-lounge', label: 'Terrace lounge', text: 'Create a relaxed terrace/lounge arrangement with realistic scale, shadows, and circulation space.' },
    { id: 'ai-decide', label: 'Let AI decide', text: 'Choose the most practical outdoor placement zone and place the furniture naturally.' },
  ],
};

const MODE_COPY = {
  fence: {
    title: 'Add fence reference images',
    description: 'Upload the fence design references directly. The AI should treat these as the source of truth.',
    productPlaceholder: 'Example: Aesthetic Fence — Tree Motif',
    colorPlaceholder: 'Example: A-1 Green / Matte Black',
    heightPlaceholder: 'Example: 1.8 m / 2.0 m / 2.75 m bay',
    quantityPlaceholder: 'Example: full visible perimeter / 2.5 m CTC posts',
    frontTitle: 'Fence front / clean reference',
    frontEmpty: 'Upload fence front reference',
    perspectiveTitle: 'Fence perspective / installed reference',
    perspectiveEmpty: 'Upload fence perspective reference',
    secondaryTitle: 'Optional detail / top option reference',
    secondaryEmpty: 'Upload optional fence detail / side reference',
    notesPlaceholder: 'Optional. Example: follow the front road-side boundary, turn around the visible corner, keep posts aligned to the property edge.',
  },
  furniture: {
    title: 'Add furniture reference images',
    description: 'Upload Meshable furniture references directly. The AI should treat these as the source of truth.',
    productPlaceholder: 'Example: Meshable 8-Seater Dining Set',
    colorPlaceholder: 'Example: A-1 Green frame / printed cushions',
    heightPlaceholder: 'Example: 8-seater set / lounge chair / 3-seater sofa',
    quantityPlaceholder: 'Example: 1 set / 2 sets / dining arrangement',
    frontTitle: 'Furniture front / clean reference',
    frontEmpty: 'Upload furniture front reference',
    perspectiveTitle: 'Furniture perspective / lifestyle reference',
    perspectiveEmpty: 'Upload furniture perspective reference',
    secondaryTitle: 'Optional side / detail reference',
    secondaryEmpty: 'Upload optional furniture side / detail reference',
    notesPlaceholder: 'Optional. Example: place the set on the terrace deck, avoid blocking the walkway, keep the seating under the pergola shade.',
  },
};

const KEYWORDS = {
  fence: ['fence', 'perimeter', 'boundary', 'compound', 'post', 'gate', 'palisade', 'mesh', 'railing', 'wall', 'frontage'],
  furniture: ['furniture', 'chair', 'table', 'seating', 'sofa', 'dining', 'lounge', 'bench', 'cushion', 'set', 'terrace'],
};

const state = {
  mode: 'fence',
  intentId: 'visible-perimeter',
  uploads: {
    site: null,
    front: null,
    perspective: null,
    secondary: null,
  },
  providerStatus: {},
  resultImage: '',
  currentProvider: 'openai',
};

const els = {
  modeFenceBtn: document.getElementById('modeFenceBtn'),
  modeFurnitureBtn: document.getElementById('modeFurnitureBtn'),
  referenceSectionTitle: document.getElementById('referenceSectionTitle'),
  referenceSectionDescription: document.getElementById('referenceSectionDescription'),
  frontTitle: document.getElementById('frontTitle'),
  frontEmptyText: document.getElementById('frontEmptyText'),
  perspectiveTitle: document.getElementById('perspectiveTitle'),
  perspectiveEmptyText: document.getElementById('perspectiveEmptyText'),
  secondaryTitle: document.getElementById('secondaryTitle'),
  secondaryEmptyText: document.getElementById('secondaryEmptyText'),

  siteInput: document.getElementById('siteInput'),
  siteEmpty: document.getElementById('siteEmpty'),
  sitePreviewWrap: document.getElementById('sitePreviewWrap'),
  sitePreview: document.getElementById('sitePreview'),
  siteMetaRow: document.getElementById('siteMetaRow'),
  siteFileName: document.getElementById('siteFileName'),
  siteRemoveBtn: document.getElementById('siteRemoveBtn'),

  frontInput: document.getElementById('frontInput'),
  frontEmpty: document.getElementById('frontEmpty'),
  frontPreviewWrap: document.getElementById('frontPreviewWrap'),
  frontPreview: document.getElementById('frontPreview'),
  frontMetaRow: document.getElementById('frontMetaRow'),
  frontFileName: document.getElementById('frontFileName'),
  frontRemoveBtn: document.getElementById('frontRemoveBtn'),

  perspectiveInput: document.getElementById('perspectiveInput'),
  perspectiveEmpty: document.getElementById('perspectiveEmpty'),
  perspectivePreviewWrap: document.getElementById('perspectivePreviewWrap'),
  perspectivePreview: document.getElementById('perspectivePreview'),
  perspectiveMetaRow: document.getElementById('perspectiveMetaRow'),
  perspectiveFileName: document.getElementById('perspectiveFileName'),
  perspectiveRemoveBtn: document.getElementById('perspectiveRemoveBtn'),

  secondaryInput: document.getElementById('secondaryInput'),
  secondaryEmpty: document.getElementById('secondaryEmpty'),
  secondaryPreviewWrap: document.getElementById('secondaryPreviewWrap'),
  secondaryPreview: document.getElementById('secondaryPreview'),
  secondaryMetaRow: document.getElementById('secondaryMetaRow'),
  secondaryFileName: document.getElementById('secondaryFileName'),
  secondaryRemoveBtn: document.getElementById('secondaryRemoveBtn'),

  productNameInput: document.getElementById('productNameInput'),
  colorInput: document.getElementById('colorInput'),
  heightInput: document.getElementById('heightInput'),
  quantityInput: document.getElementById('quantityInput'),
  notesInput: document.getElementById('notesInput'),
  intentButtons: document.getElementById('intentButtons'),
  mismatchWarning: document.getElementById('mismatchWarning'),
  promptPreview: document.getElementById('promptPreview'),

  providerSelect: document.getElementById('providerSelect'),
  providerBadges: document.getElementById('providerBadges'),
  providerHelp: document.getElementById('providerHelp'),
  showDeveloperProviders: document.getElementById('showDeveloperProviders'),
  developerProviderBox: document.getElementById('developerProviderBox'),
  testProviderBtn: document.getElementById('testProviderBtn'),
  refreshStatusBtn: document.getElementById('refreshStatusBtn'),
  generateBtn: document.getElementById('generateBtn'),
  downloadBtn: document.getElementById('downloadBtn'),
  statusText: document.getElementById('statusText'),
  costConfirm: document.getElementById('costConfirm'),
  reviewSummary: document.getElementById('reviewSummary'),

  beforeImage: document.getElementById('beforeImage'),
  beforeEmpty: document.getElementById('beforeEmpty'),
  afterImage: document.getElementById('afterImage'),
  afterEmpty: document.getElementById('afterEmpty'),
};

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImageFromDataUrl(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
}

async function compressImageDataUrl(file, key) {
  const original = await readFileAsDataUrl(file);
  const img = await loadImageFromDataUrl(original);
  const maxSide = key === 'site' ? 1400 : 1050;
  const quality = key === 'site' ? 0.78 : 0.82;
  let { width, height } = img;
  const scale = Math.min(1, maxSide / Math.max(width, height));
  width = Math.max(1, Math.round(width * scale));
  height = Math.max(1, Math.round(height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);
  const compressed = canvas.toDataURL('image/jpeg', quality);
  return {
    dataUrl: compressed,
    originalSize: file.size,
    compressedBytes: Math.round((compressed.length * 3) / 4),
    width,
    height,
  };
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return '';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function parseFetchJsonSafe(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    const clean = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return { error: clean || `Server returned non-JSON response with status ${response.status}.`, raw: text };
  }
}

function setStatus(message, lock = false) {
  els.statusText.textContent = message;
  state.statusLocked = lock;
}

function clearStatusLock() {
  state.statusLocked = false;
}

function showAfterMessage(message) {
  els.afterImage.removeAttribute('src');
  els.afterImage.classList.add('hidden');
  els.afterEmpty.classList.remove('hidden');
  els.afterEmpty.textContent = message;
  state.resultImage = '';
  els.downloadBtn.disabled = true;
}

function currentIntent() {
  return INTENTS[state.mode].find((item) => item.id === state.intentId) || INTENTS[state.mode][0];
}

function referenceCount() {
  return ['front', 'perspective', 'secondary'].filter((key) => state.uploads[key]).length;
}

function referencesArray() {
  return [
    state.uploads.front ? { role: 'front', label: state.mode === 'fence' ? 'Fence front / clean reference' : 'Furniture front / clean reference', image: state.uploads.front.dataUrl } : null,
    state.uploads.perspective ? { role: 'perspective', label: state.mode === 'fence' ? 'Fence perspective / installed reference' : 'Furniture perspective / lifestyle reference', image: state.uploads.perspective.dataUrl } : null,
    state.uploads.secondary ? { role: 'secondary', label: 'Optional detail / secondary reference', image: state.uploads.secondary.dataUrl } : null,
  ].filter(Boolean);
}

function updateModeCopy() {
  const copy = MODE_COPY[state.mode];
  els.referenceSectionTitle.textContent = copy.title;
  els.referenceSectionDescription.textContent = copy.description;
  els.productNameInput.placeholder = copy.productPlaceholder;
  els.colorInput.placeholder = copy.colorPlaceholder;
  els.heightInput.placeholder = copy.heightPlaceholder;
  els.quantityInput.placeholder = copy.quantityPlaceholder;
  els.frontTitle.textContent = copy.frontTitle;
  els.frontEmptyText.textContent = copy.frontEmpty;
  els.perspectiveTitle.textContent = copy.perspectiveTitle;
  els.perspectiveEmptyText.textContent = copy.perspectiveEmpty;
  els.secondaryTitle.textContent = copy.secondaryTitle;
  els.secondaryEmptyText.textContent = copy.secondaryEmpty;
  els.notesInput.placeholder = copy.notesPlaceholder;

  els.modeFenceBtn.classList.toggle('active', state.mode === 'fence');
  els.modeFurnitureBtn.classList.toggle('active', state.mode === 'furniture');
}

function renderIntentButtons() {
  els.intentButtons.innerHTML = '';
  INTENTS[state.mode].forEach((intent) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `intent-btn ${intent.id === state.intentId ? 'active' : ''}`;
    button.dataset.intentId = intent.id;
    button.innerHTML = `<strong>${intent.label}</strong><span>${intent.text}</span>`;
    button.addEventListener('click', () => {
      state.intentId = intent.id;
      renderIntentButtons();
      updateAllDerivedUI();
    });
    els.intentButtons.appendChild(button);
  });
}

function setMode(mode) {
  if (!MODE_COPY[mode]) return;
  state.mode = mode;
  state.intentId = mode === 'fence' ? 'visible-perimeter' : 'one-set';
  updateModeCopy();
  renderIntentButtons();
  updateAllDerivedUI();
}

function analyzeMismatch() {
  const text = `${els.notesInput.value} ${els.productNameInput.value}`.toLowerCase();
  const fenceHits = KEYWORDS.fence.filter((word) => new RegExp(`\\b${word}\\b`, 'i').test(text));
  const furnitureHits = KEYWORDS.furniture.filter((word) => new RegExp(`\\b${word}\\b`, 'i').test(text));

  if (state.mode === 'furniture' && fenceHits.length >= 2) {
    return `This instruction sounds like a fence/perimeter request (${fenceHits.slice(0, 3).join(', ')}), but the selected mode is Meshable Furniture. Switch to Fence mode or revise the instruction.`;
  }
  if (state.mode === 'fence' && furnitureHits.length >= 2 && !fenceHits.length) {
    return `This instruction sounds like a furniture request (${furnitureHits.slice(0, 3).join(', ')}), but the selected mode is Fence / Perimeter. Switch to Furniture mode or revise the instruction.`;
  }
  return '';
}

function buildPrompt() {
  const productName = els.productNameInput.value.trim();
  const color = els.colorInput.value.trim();
  const height = els.heightInput.value.trim();
  const quantity = els.quantityInput.value.trim();
  const notes = els.notesInput.value.trim();
  const intent = currentIntent();

  const lines = [];
  if (state.mode === 'fence') {
    lines.push('Create a realistic fence / perimeter visualization on the uploaded site image.');
    lines.push('Use the uploaded fence reference images as the source of truth for panel design, post rhythm, mesh/motif details, material, color, and proportions.');
    lines.push(`Placement intent: ${intent.text}`);
    lines.push('The AI may identify the correct boundary automatically, but it must preserve the original building, road, ground, sky, camera angle, and site context.');
    lines.push('Place the fence with believable perspective, ground contact, post spacing, corner turn logic, and realistic shadows.');
  } else {
    lines.push('Create a realistic Meshable outdoor furniture visualization on the uploaded site image.');
    lines.push('Use the uploaded furniture reference images as the source of truth for product geometry, frame details, material, color, seating/table proportions, and arrangement style.');
    lines.push(`Placement intent: ${intent.text}`);
    lines.push('The AI may identify the best placement automatically, but it must preserve the original terrace, ground, wall, sky, camera angle, and site context.');
    lines.push('Place the furniture with believable scale, perspective, ground contact, usable circulation, and realistic shadows.');
  }

  if (productName) lines.push(`Selected product / design: ${productName}.`);
  if (color) lines.push(`Selected color / finish: ${color}.`);
  if (height) lines.push(`Height / size guidance: ${height}.`);
  if (quantity) lines.push(`Quantity / count guidance: ${quantity}.`);
  if (notes) lines.push(`Additional user instruction: ${notes}`);

  lines.push('Do not add text labels, logos, watermarks, unrelated objects, unrelated people, or a different location.');
  lines.push('If the uploaded reference and instruction conflict, prioritize the selected mode and the uploaded product references.');
  return lines.join('\n');
}

function renderMismatchWarning() {
  const message = analyzeMismatch();
  if (message) {
    els.mismatchWarning.textContent = message;
    els.mismatchWarning.classList.remove('hidden');
  } else {
    els.mismatchWarning.textContent = '';
    els.mismatchWarning.classList.add('hidden');
  }
  return message;
}

function renderReviewSummary() {
  const refs = referenceCount();
  const providerLabel = {
    openai: 'OpenAI — Primary',
    stability: 'Stability AI — Experimental',
    pollinations: 'Pollinations — Developer test',
    'local-preview': 'Local preview only',
  }[state.currentProvider] || state.currentProvider;

  const items = [
    ['Mode', state.mode === 'fence' ? 'Fence / Perimeter' : 'Meshable Furniture'],
    ['Intent', currentIntent().label],
    ['Product', els.productNameInput.value.trim() || 'Not specified'],
    ['Color / finish', els.colorInput.value.trim() || 'Not specified'],
    ['Height / size', els.heightInput.value.trim() || 'Not specified'],
    ['Quantity / count', els.quantityInput.value.trim() || 'Not specified'],
    ['Site image', state.uploads.site ? state.uploads.site.name : 'Missing'],
    ['Product references', `${refs} uploaded`],
    ['Provider', providerLabel],
  ];

  els.reviewSummary.innerHTML = items.map(([key, value]) => `<dt>${key}</dt><dd>${value}</dd>`).join('');
}

function updatePromptPreview() {
  els.promptPreview.value = buildPrompt();
}

function updateAllDerivedUI() {
  updatePromptPreview();
  renderMismatchWarning();
  renderReviewSummary();
  updateGenerateReadiness();
}

async function setUpload(key, file) {
  if (!file) return;
  els.statusText.textContent = 'Compressing uploaded image for API-safe request size...';
  try {
    const compressed = await compressImageDataUrl(file, key);
    state.uploads[key] = { file, dataUrl: compressed.dataUrl, name: file.name, compressed };
    renderUpload(key);
    if (key === 'site') renderBefore();
    const before = formatBytes(compressed.originalSize);
    const after = formatBytes(compressed.compressedBytes);
    els.statusText.textContent = `Image prepared for API upload: ${before} → ${after}.`;
  } catch (error) {
    els.statusText.textContent = `Could not prepare image: ${error.message}`;
  }
  updateAllDerivedUI();
}

function clearUpload(key) {
  state.uploads[key] = null;
  renderUpload(key);
  if (key === 'site') renderBefore();
  updateAllDerivedUI();
}

function renderUpload(key) {
  const upload = state.uploads[key];
  const map = {
    site: ['siteEmpty', 'sitePreviewWrap', 'sitePreview', 'siteMetaRow', 'siteFileName'],
    front: ['frontEmpty', 'frontPreviewWrap', 'frontPreview', 'frontMetaRow', 'frontFileName'],
    perspective: ['perspectiveEmpty', 'perspectivePreviewWrap', 'perspectivePreview', 'perspectiveMetaRow', 'perspectiveFileName'],
    secondary: ['secondaryEmpty', 'secondaryPreviewWrap', 'secondaryPreview', 'secondaryMetaRow', 'secondaryFileName'],
  };
  const [emptyId, previewWrapId, previewId, metaRowId, fileNameId] = map[key];
  if (upload) {
    els[emptyId].classList.add('hidden');
    els[previewWrapId].classList.remove('hidden');
    els[previewId].src = upload.dataUrl;
    els[metaRowId].classList.remove('hidden');
    const detail = upload.compressed ? ` · ${upload.compressed.width}×${upload.compressed.height} · ${formatBytes(upload.compressed.compressedBytes)}` : '';
    els[fileNameId].textContent = `${upload.name}${detail}`;
  } else {
    els[emptyId].classList.remove('hidden');
    els[previewWrapId].classList.add('hidden');
    els[previewId].removeAttribute('src');
    els[metaRowId].classList.add('hidden');
    els[fileNameId].textContent = '';
  }
}

function renderBefore() {
  if (state.uploads.site) {
    els.beforeImage.src = state.uploads.site.dataUrl;
    els.beforeImage.classList.remove('hidden');
    els.beforeEmpty.classList.add('hidden');
  } else {
    els.beforeImage.removeAttribute('src');
    els.beforeImage.classList.add('hidden');
    els.beforeEmpty.classList.remove('hidden');
  }
}

function renderAfter(image) {
  if (image) {
    els.afterImage.src = image;
    els.afterImage.classList.remove('hidden');
    els.afterEmpty.classList.add('hidden');
    state.resultImage = image;
    els.downloadBtn.disabled = false;
  } else {
    els.afterImage.removeAttribute('src');
    els.afterImage.classList.add('hidden');
    els.afterEmpty.classList.remove('hidden');
    els.afterEmpty.textContent = 'Generated AI result will appear here.';
    state.resultImage = '';
    els.downloadBtn.disabled = true;
  }
}

async function loadProviderStatus() {
  try {
    const res = await fetch('/api/health');
    const data = await parseFetchJsonSafe(res);
    state.providerStatus = data.providers || {};
    renderProviderBadges();
    updateProviderHelp();
  } catch (error) {
    state.providerStatus = {};
    els.providerBadges.innerHTML = '';
    els.providerHelp.textContent = 'Could not fetch provider health. Deploy the full package to Vercel before using AI generation.';
  }
}

function renderProviderBadges() {
  els.providerBadges.innerHTML = '';
  const order = ['openai', 'stability', 'pollinations', 'local-preview'];
  order.forEach((key) => {
    const item = state.providerStatus[key];
    if (!item) return;
    if (!els.showDeveloperProviders.checked && ['pollinations', 'local-preview'].includes(key)) return;
    const badge = document.createElement('div');
    badge.className = `badge ${item.ready ? 'ready' : 'not-ready'}`;
    const labelMap = { openai: 'OpenAI', stability: 'Stability AI', pollinations: 'Pollinations', 'local-preview': 'Local preview' };
    badge.textContent = `${labelMap[key]} · ${item.ready ? 'ready' : 'not ready'}`;
    els.providerBadges.appendChild(badge);
  });
}

function updateProviderHelp() {
  const provider = state.currentProvider;
  const status = state.providerStatus[provider];
  const help = {
    openai: 'Recommended for internal trials. OpenAI receives the site image plus multiple uploaded reference images together.',
    stability: 'Experimental. Stability may not respect product references as strongly as OpenAI in this simplified workflow.',
    pollinations: 'Developer-only connectivity test. Prompt-led and not suitable for client-quality visualization.',
    'local-preview': 'Developer-only test. No external AI call; returns the uploaded site image.',
  };
  els.providerHelp.textContent = status?.message ? `${help[provider]} ${status.message}` : help[provider];
}

function updateGenerateReadiness() {
  const missing = [];
  if (!state.uploads.site) missing.push('site image');
  if (!referenceCount() && state.currentProvider !== 'local-preview') missing.push('at least one product reference');
  if (!els.costConfirm.checked && state.currentProvider !== 'local-preview') missing.push('API credit confirmation');
  if (analyzeMismatch()) missing.push('matching mode/instruction');

  els.generateBtn.disabled = missing.length > 0;
  if (state.statusLocked) return;
  if (missing.length) {
    els.statusText.textContent = `Waiting for: ${missing.join(', ')}.`;
  } else if (!state.resultImage) {
    els.statusText.textContent = 'Ready to generate. Review summary and prompt before clicking Generate.';
  }
}

async function testProvider() {
  els.statusText.textContent = 'Testing provider connection...';
  try {
    const res = await fetch('/api/test-provider', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider: state.currentProvider }),
    });
    const data = await parseFetchJsonSafe(res);
    if (!res.ok) throw new Error(data.error || 'Provider test failed.');
    els.statusText.textContent = data.message || 'Provider connection succeeded.';
    await loadProviderStatus();
  } catch (error) {
    els.statusText.textContent = error.message;
  }
}

function setLoading(isLoading) {
  state.isGenerating = isLoading;
  els.generateBtn.disabled = isLoading;
  els.testProviderBtn.disabled = isLoading;
  els.refreshStatusBtn.disabled = isLoading;
}

function validateBeforeGenerate() {
  const mismatch = analyzeMismatch();
  if (mismatch) throw new Error(mismatch);
  if (!state.uploads.site) throw new Error('Please upload the site image first.');
  if (state.currentProvider !== 'local-preview' && !referenceCount()) throw new Error('Please upload at least one product reference image.');
  if (state.currentProvider !== 'local-preview' && !els.costConfirm.checked) throw new Error('Please confirm that this generation may use API credits.');
  if (state.currentProvider === 'pollinations') throw new Error('Pollinations is developer-only and not recommended for this internal trial. Use OpenAI unless you only want a rough connectivity test.');
}

async function generateImage() {
  try {
    validateBeforeGenerate();
    setLoading(true);
    const payload = {
      provider: state.currentProvider,
      originalImage: state.uploads.site.dataUrl,
      prompt: buildPrompt(),
      productName: els.productNameInput.value.trim(),
      category: state.mode,
      color: els.colorInput.value.trim(),
      height: els.heightInput.value.trim(),
      quantity: els.quantityInput.value.trim(),
      intent: currentIntent().label,
      references: referencesArray(),
    };
    const approxPayloadMb = (JSON.stringify(payload).length / (1024 * 1024)).toFixed(1);
    setStatus(`Generating AI render... API payload approx. ${approxPayloadMb} MB. Please wait; OpenAI image generation can take 30–90 seconds.`, true);
    showAfterMessage('Generating... please wait. If this takes too long, check Vercel logs or try one fewer reference image.');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000);
    const res = await fetch('/api/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));
    const data = await parseFetchJsonSafe(res);
    if (!res.ok) {
      const msg = data.error || 'Generation failed.';
      const hint = /request ent|body size|too large/i.test(msg)
        ? ' Try one fewer reference image or a smaller upload.'
        : /billing|credit|quota|insufficient/i.test(msg)
          ? ' Check OpenAI API credits/billing and usage limit.'
          : /api key|unauthorized|authentication/i.test(msg)
            ? ' Check Vercel environment variable OPENAI_API_KEY and redeploy.'
            : '';
      throw new Error(msg + hint);
    }

    if (!data.image) throw new Error('The server responded successfully but no image was returned. Check the provider response in Vercel logs.');
    renderAfter(data.image);
    setStatus(data.note || `Generated successfully via ${data.providerLabel || state.currentProvider}.`, true);
  } catch (error) {
    const message = error.name === 'AbortError'
      ? 'Generation timed out in the browser after 90 seconds. Check Vercel Function logs. Try OpenAI size 1024x1024, medium quality, or one fewer reference image.'
      : error.message;
    setStatus(message, true);
    showAfterMessage(message);
  } finally {
    setLoading(false);
    updateAllDerivedUI();
  }
}

function downloadResult() {
  if (!state.resultImage) return;
  const a = document.createElement('a');
  a.href = state.resultImage;
  a.download = `a1-visualization-v063-${Date.now()}.png`;
  a.click();
}

function bindUpload(inputEl, key) {
  inputEl.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await setUpload(key, file);
    inputEl.value = '';
  });
}

function selectProvider(provider) {
  clearStatusLock();
  state.currentProvider = provider;
  if (['openai', 'stability'].includes(provider)) els.providerSelect.value = provider;
  updateProviderHelp();
  renderReviewSummary();
  updateGenerateReadiness();
}

bindUpload(els.siteInput, 'site');
bindUpload(els.frontInput, 'front');
bindUpload(els.perspectiveInput, 'perspective');
bindUpload(els.secondaryInput, 'secondary');

els.siteRemoveBtn.addEventListener('click', () => clearUpload('site'));
els.frontRemoveBtn.addEventListener('click', () => clearUpload('front'));
els.perspectiveRemoveBtn.addEventListener('click', () => clearUpload('perspective'));
els.secondaryRemoveBtn.addEventListener('click', () => clearUpload('secondary'));
els.modeFenceBtn.addEventListener('click', () => setMode('fence'));
els.modeFurnitureBtn.addEventListener('click', () => setMode('furniture'));

[els.productNameInput, els.colorInput, els.heightInput, els.quantityInput, els.notesInput, els.costConfirm].forEach((el) => {
  el.addEventListener('input', updateAllDerivedUI);
  el.addEventListener('change', updateAllDerivedUI);
});

els.providerSelect.addEventListener('change', () => selectProvider(els.providerSelect.value));
els.showDeveloperProviders.addEventListener('change', () => {
  els.developerProviderBox.classList.toggle('hidden', !els.showDeveloperProviders.checked);
  renderProviderBadges();
});
els.developerProviderBox.querySelectorAll('[data-dev-provider]').forEach((button) => {
  button.addEventListener('click', () => selectProvider(button.dataset.devProvider));
});
els.testProviderBtn.addEventListener('click', testProvider);
els.refreshStatusBtn.addEventListener('click', loadProviderStatus);
els.generateBtn.addEventListener('click', generateImage);
els.downloadBtn.addEventListener('click', downloadResult);

updateModeCopy();
renderIntentButtons();
renderBefore();
renderAfter('');
updateAllDerivedUI();
loadProviderStatus();
