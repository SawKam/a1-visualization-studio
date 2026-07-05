const state = {
  uploads: {
    site: null,
    front: null,
    perspective: null,
    secondary: null,
  },
  providerStatus: {},
  resultImage: '',
};

const els = {
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

  familySelect: document.getElementById('familySelect'),
  productNameInput: document.getElementById('productNameInput'),
  colorInput: document.getElementById('colorInput'),
  heightInput: document.getElementById('heightInput'),
  notesInput: document.getElementById('notesInput'),
  promptPreview: document.getElementById('promptPreview'),

  providerSelect: document.getElementById('providerSelect'),
  providerBadges: document.getElementById('providerBadges'),
  providerHelp: document.getElementById('providerHelp'),
  testProviderBtn: document.getElementById('testProviderBtn'),
  refreshStatusBtn: document.getElementById('refreshStatusBtn'),
  generateBtn: document.getElementById('generateBtn'),
  downloadBtn: document.getElementById('downloadBtn'),
  statusText: document.getElementById('statusText'),

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

async function setUpload(key, file) {
  if (!file) return;
  const dataUrl = await readFileAsDataUrl(file);
  state.uploads[key] = { file, dataUrl, name: file.name };
  renderUpload(key);
  if (key === 'site') renderBefore();
  updatePromptPreview();
  if (!state.resultImage) {
    els.statusText.textContent = 'Ready to generate once your preferred provider is selected.';
  }
}

function clearUpload(key) {
  state.uploads[key] = null;
  renderUpload(key);
  if (key === 'site') renderBefore();
  updatePromptPreview();
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
    els[fileNameId].textContent = upload.name;
  } else {
    els[emptyId].classList.remove('hidden');
    els[previewWrapId].classList.add('hidden');
    els[previewId].removeAttribute('src');
    els[metaRowId].classList.add('hidden');
    els[fileNameId].textContent = '';
  }
}

function buildPrompt() {
  const family = els.familySelect.value;
  const productName = els.productNameInput.value.trim();
  const color = els.colorInput.value.trim();
  const height = els.heightInput.value.trim();
  const notes = els.notesInput.value.trim();

  const lines = [
    family === 'fence'
      ? 'Create a realistic fence / perimeter visualization on the uploaded site image.'
      : 'Create a realistic outdoor furniture visualization on the uploaded site image.',
    'Use the uploaded product reference images as the source of truth for design language, material appearance, proportions, and details.',
    family === 'fence'
      ? 'Choose the most plausible visible boundary, frontage, edge, or compound line in the site photo and place the fence naturally without any manual placement guide.'
      : 'Choose the most practical outdoor placement zone in the site photo and place the furniture naturally without any manual placement guide.',
    'Preserve the original building, ground, road, sky, lighting direction, and camera perspective as much as possible.',
    'Blend the product realistically into the scene and avoid replacing the site with a different location.',
  ];

  if (productName) lines.push(`Selected product: ${productName}.`);
  if (color) lines.push(`Selected color / finish: ${color}.`);
  if (height) lines.push(`Selected height / size guidance: ${height}.`);
  if (notes) lines.push(`Additional user instruction: ${notes}`);

  if (family === 'fence') {
    lines.push('Keep fence post rhythm, panel design, motifs, and overall geometry consistent with the reference images.');
  } else {
    lines.push('Keep furniture proportions, seating form, table form, and arrangement style consistent with the reference images.');
  }

  lines.push('Do not add text, logos, watermarks, unrelated objects, or unrelated people.');
  return lines.join('\n');
}

function updatePromptPreview() {
  els.promptPreview.value = buildPrompt();
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
    state.resultImage = '';
    els.downloadBtn.disabled = true;
  }
}

function referencesArray() {
  return [
    state.uploads.front ? { role: 'front', label: 'Front / clean reference', image: state.uploads.front.dataUrl } : null,
    state.uploads.perspective ? { role: 'perspective', label: 'Perspective / lifestyle reference', image: state.uploads.perspective.dataUrl } : null,
    state.uploads.secondary ? { role: 'secondary', label: 'Secondary reference', image: state.uploads.secondary.dataUrl } : null,
  ].filter(Boolean);
}

async function loadProviderStatus() {
  try {
    const res = await fetch('/api/health');
    const data = await res.json();
    state.providerStatus = data.providers || {};
    renderProviderBadges();
    updateProviderHelp();
  } catch (error) {
    state.providerStatus = {};
    els.providerBadges.innerHTML = '';
    els.providerHelp.textContent = 'Could not fetch provider health. If you are running only the static page, deploy the full package to Vercel before using AI generation.';
  }
}

function renderProviderBadges() {
  els.providerBadges.innerHTML = '';
  const order = ['openai', 'stability', 'pollinations', 'local-preview'];
  order.forEach((key) => {
    const item = state.providerStatus[key];
    if (!item) return;
    const badge = document.createElement('div');
    badge.className = `badge ${item.ready ? 'ready' : 'not-ready'}`;
    const labelMap = {
      openai: 'OpenAI',
      stability: 'Stability AI',
      pollinations: 'Pollinations',
      'local-preview': 'Local preview',
    };
    badge.textContent = `${labelMap[key]} · ${item.ready ? 'ready' : 'not ready'}`;
    els.providerBadges.appendChild(badge);
  });
}

function updateProviderHelp() {
  const provider = els.providerSelect.value;
  const status = state.providerStatus[provider];
  const help = {
    openai: 'Recommended for this simplified version. OpenAI can receive the site image plus multiple direct reference images together.',
    stability: 'Experimental in this simple mode. Stability works more from prompt + site image and may not respect uploaded reference images as strongly as OpenAI.',
    pollinations: 'Useful only for rough workflow testing. It is prompt-led and may ignore the exact uploaded scene and product.',
    'local-preview': 'No external AI call. This mode only returns the site image and is useful for testing uploads and deployment.',
  };
  const prefix = help[provider] || '';
  els.providerHelp.textContent = status?.message ? `${prefix} ${status.message}` : prefix;
}

async function testProvider() {
  els.statusText.textContent = 'Testing provider connection...';
  try {
    const res = await fetch('/api/test-provider', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider: els.providerSelect.value }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Provider test failed.');
    els.statusText.textContent = data.message || 'Provider connection succeeded.';
    await loadProviderStatus();
  } catch (error) {
    els.statusText.textContent = error.message;
  }
}

function ensureRequirements(provider) {
  if (!state.uploads.site) throw new Error('Please upload the site image first.');
  if (provider === 'openai' && referencesArray().length === 0) {
    throw new Error('For OpenAI testing, please upload at least one product reference image.');
  }
}

function setLoading(isLoading) {
  els.generateBtn.disabled = isLoading;
  els.testProviderBtn.disabled = isLoading;
  els.refreshStatusBtn.disabled = isLoading;
}

async function generateImage() {
  const provider = els.providerSelect.value;
  try {
    ensureRequirements(provider);
    setLoading(true);
    els.statusText.textContent = 'Generating AI render...';

    const payload = {
      provider,
      originalImage: state.uploads.site.dataUrl,
      prompt: buildPrompt(),
      productName: els.productNameInput.value.trim(),
      category: els.familySelect.value,
      color: els.colorInput.value.trim(),
      height: els.heightInput.value.trim(),
      references: referencesArray(),
    };

    const res = await fetch('/api/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Generation failed.');

    renderAfter(data.image || '');
    els.statusText.textContent = data.note || `Generated successfully via ${data.providerLabel || provider}.`;
  } catch (error) {
    els.statusText.textContent = error.message;
  } finally {
    setLoading(false);
  }
}

function downloadResult() {
  if (!state.resultImage) return;
  const a = document.createElement('a');
  a.href = state.resultImage;
  a.download = `a1-visualization-result-${Date.now()}.png`;
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

bindUpload(els.siteInput, 'site');
bindUpload(els.frontInput, 'front');
bindUpload(els.perspectiveInput, 'perspective');
bindUpload(els.secondaryInput, 'secondary');

els.siteRemoveBtn.addEventListener('click', () => clearUpload('site'));
els.frontRemoveBtn.addEventListener('click', () => clearUpload('front'));
els.perspectiveRemoveBtn.addEventListener('click', () => clearUpload('perspective'));
els.secondaryRemoveBtn.addEventListener('click', () => clearUpload('secondary'));

[els.familySelect, els.productNameInput, els.colorInput, els.heightInput, els.notesInput].forEach((el) => {
  el.addEventListener('input', updatePromptPreview);
  el.addEventListener('change', updatePromptPreview);
});

els.providerSelect.addEventListener('change', updateProviderHelp);
els.testProviderBtn.addEventListener('click', testProvider);
els.refreshStatusBtn.addEventListener('click', loadProviderStatus);
els.generateBtn.addEventListener('click', generateImage);
els.downloadBtn.addEventListener('click', downloadResult);

updatePromptPreview();
renderBefore();
renderAfter('');
loadProviderStatus();
