const STORAGE_KEY = 'a1_visualization_studio_library_v059';

function svgDataUri(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function meshableChairSvg(fill = '#2f5f46') {
  return svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="620" viewBox="0 0 900 620"><rect width="900" height="620" fill="none"/><g fill="none" stroke="${fill}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"><path d="M268 215c35-82 130-112 210-87 84 26 137 105 121 185-18 93-111 147-203 126-84-19-143-92-128-224Z"/><path d="M333 438 292 575M528 437l45 138M328 515h238"/><path d="M275 312h350M296 256h300M315 200h230"/><path d="M236 403h390c34 0 57 28 47 60l-15 48H206l-15-48c-10-32 12-60 45-60Z"/><path d="M242 455h425M248 500h404"/></g></svg>`);
}

function meshableLoungerSvg(fill = '#2f5f46') {
  return svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="560" viewBox="0 0 1000 560"><rect width="1000" height="560" fill="none"/><g fill="none" stroke="${fill}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"><path d="M138 360h630c58 0 92 42 70 92l-18 42H124l-18-42c-22-50 12-92 32-92Z"/><path d="M650 360 790 176c24-32 69-42 105-20l17 10-137 194"/><path d="M172 494 135 540M772 494l58 46"/><path d="M188 420h602M230 360l-44-104c-12-29 11-60 42-55l279 43c51 8 94 41 116 88l14 28"/><path d="M260 286h285M300 340h260"/></g></svg>`);
}

const SEED_LIBRARY = [
  {
    id: 'fence-aesthetic-tree',
    category: 'fence',
    name: 'Aesthetic Fence — Tree Motif',
    type: 'Aesthetic Fence',
    colors: ['A-1 Green', 'Graphite Black', 'Warm Grey'],
    heights: ['1.8 m', '2.4 m', '3.0 m'],
    ctc: ['2.5 m', '3.0 m'],
    topOptions: ['None', 'Integrated decorative motif'],
    referenceImage: 'assets/aesthetic_tree_motif_transparent.png',
    sideImage: '',
    topImage: '',
    perspectiveImage: 'assets/aesthetic_tree_motif_site.png',
    siteImage: 'assets/aesthetic_tree_motif_site.png',
    notes: 'Transparent PNG front reference. Preserve weldmesh background and tree laser-cut decorative motif.'
  },
  {
    id: 'fence-aesthetic-peacock',
    category: 'fence',
    name: 'Aesthetic Fence — Peacock Motif',
    type: 'Aesthetic Fence',
    colors: ['A-1 Green', 'Graphite Black', 'Warm Grey'],
    heights: ['1.8 m', '2.4 m', '3.0 m'],
    ctc: ['2.5 m', '3.0 m'],
    topOptions: ['None', 'Integrated decorative motif'],
    referenceImage: 'assets/aesthetic_peacock_motif_transparent.png',
    sideImage: '',
    topImage: '',
    perspectiveImage: 'assets/aesthetic_peacock_motif_site.png',
    siteImage: 'assets/aesthetic_peacock_motif_site.png',
    notes: 'Transparent PNG front reference. Preserve weldmesh background and peacock laser-cut decorative motif.'
  },
  {
    id: 'fence-358-basic',
    category: 'fence',
    name: '358 Anti-Climb Fence — Standard',
    type: '358 Anti-Climb',
    colors: ['A-1 Green', 'Graphite Black', 'Galvanized Grey'],
    heights: ['2.4 m', '3.0 m', '3.6 m'],
    ctc: ['2.5 m', '3.0 m'],
    topOptions: ['None', 'Y-arm', 'Concertina Coil'],
    referenceImage: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" fill="none"/><g stroke="#2f5f46" fill="none"><path stroke-width="18" d="M70 70v390M350 70v390M630 70v390M910 70v390"/><g stroke-width="3" opacity=".72">${Array.from({length:28},(_,i)=>`<path d="M40 ${88+i*13}h1010"/>`).join('')}${Array.from({length:120},(_,i)=>`<path d="M${45+i*8} 80v365"/>`).join('')}</g><path stroke-width="8" d="M40 92h1010M40 448h1010"/></g></svg>`),
    sideImage: '',
    topImage: '',
    perspectiveImage: '',
    siteImage: '',
    notes: 'Procedural seed placeholder. Replace with real 358 multi-view reference images from admin.'
  },
  {
    id: 'fence-palisade-basic',
    category: 'fence',
    name: 'Palisade Fence — D Section',
    type: 'Palisade',
    colors: ['A-1 Green', 'Graphite Black', 'Galvanized Grey'],
    heights: ['2.0 m', '2.4 m', '3.0 m'],
    ctc: ['2.75 m', '3.0 m'],
    topOptions: ['Triple point', 'Rounded top'],
    referenceImage: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" fill="none"/><g stroke="#2f5f46" fill="none" stroke-linejoin="round"><path stroke-width="18" d="M80 70v390M1020 70v390"/><g stroke-width="10">${Array.from({length:36},(_,i)=>{let x=120+i*24; return `<path d="M${x} 120v330l-12-30M${x} 120l-11 28M${x} 120l11 28"/>`}).join('')}</g><path stroke-width="10" d="M70 210h960M70 360h960"/></g></svg>`),
    sideImage: '',
    topImage: '',
    perspectiveImage: '',
    siteImage: '',
    notes: 'Procedural seed placeholder. Replace with real palisade multi-view reference images from admin.'
  },
  {
    id: 'meshable-chair',
    category: 'furniture',
    name: 'Meshable Café Chair — Wire Curve',
    type: 'Café Chair',
    colors: ['Olive Green', 'Graphite Black', 'Terracotta', 'White'],
    heights: [], ctc: [], topOptions: [],
    referenceImage: meshableChairSvg('#2f5f46'),
    sideImage: '',
    topImage: '',
    perspectiveImage: '',
    siteImage: '',
    notes: 'Seed furniture silhouette. Replace with actual transparent PNG plus side/top/perspective views.'
  },
  {
    id: 'meshable-lounger',
    category: 'furniture',
    name: 'Meshable Outdoor Lounger',
    type: 'Outdoor Lounger',
    colors: ['Olive Green', 'Graphite Black', 'Warm White'],
    heights: [], ctc: [], topOptions: [],
    referenceImage: meshableLoungerSvg('#2f5f46'),
    sideImage: '',
    topImage: '',
    perspectiveImage: '',
    siteImage: '',
    notes: 'Seed furniture silhouette. Replace with actual transparent PNG plus side/top/perspective views.'
  }
];

const PRESETS = {
  fence: [
    { id: 'visible-perimeter', icon: '▱', title: 'Visible perimeter', prompt: 'Install the selected fence along the visible perimeter lines of the photographed property.' },
    { id: 'front-boundary', icon: '▤', title: 'Front boundary', prompt: 'Visualize the selected fence only along the front road-facing boundary.' },
    { id: 'entrance-zone', icon: '⌂', title: 'Entrance zone', prompt: 'Visualize the selected fence around the entrance and gate approach zone.' },
    { id: 'garden-edge', icon: '☘', title: 'Garden edge', prompt: 'Place the fence around the landscaped or garden edge visible in the image.' },
    { id: 'drawn-line', icon: '✎', title: 'Drawn line', prompt: 'Use the manually drawn fence path and perspective controls as the placement instruction.' },
  ],
  furniture: [
    { id: 'terrace-seating', icon: '△', title: 'Terrace seating', prompt: 'Arrange the selected outdoor furniture as a realistic terrace seating composition.' },
    { id: 'garden-cluster', icon: '☘', title: 'Garden cluster', prompt: 'Place the selected furniture as a relaxed garden cluster in the open area.' },
    { id: 'cafe-arrangement', icon: '◫', title: 'Café arrangement', prompt: 'Arrange the furniture like a neat café-style setting with realistic spacing.' },
    { id: 'near-wall', icon: '▥', title: 'Near wall', prompt: 'Place the furniture near the wall or boundary edge visible in the property image.' },
    { id: 'manual-placement', icon: '✎', title: 'Manual placement', prompt: 'Use the manually placed furniture dots and scale controls as the placement instruction.' },
  ]
};

const state = {
  library: [],
  currentView: 'customer',
  selectedCategory: 'fence',
  selectedType: '',
  selectedProductId: '',
  selectedPresetId: '',
  activeAdminFilter: 'all',
  siteImage: null,
  siteName: '',
  pathPoints: [],
  fenceMode: 'edit',
  dragging: null,
  resultReady: false,
  furniturePositions: [],
  manualStatus: 'automatic',
  modalOpenFor: 'fence',
  selectedProvider: 'local-preview',
  providerHealth: null,
  blendMode: 'strict',
};

const el = {
  customerModeBtn: document.getElementById('customerModeBtn'),
  adminModeBtn: document.getElementById('adminModeBtn'),
  customerView: document.getElementById('customerView'),
  adminView: document.getElementById('adminView'),

  siteDropzone: document.getElementById('siteDropzone'),
  siteInput: document.getElementById('siteInput'),
  siteEmpty: document.getElementById('siteEmpty'),
  sitePreviewWrap: document.getElementById('sitePreviewWrap'),
  sitePreview: document.getElementById('sitePreview'),
  siteFileName: document.getElementById('siteFileName'),
  removeSiteBtn: document.getElementById('removeSiteBtn'),

  familyFenceBtn: document.getElementById('familyFenceBtn'),
  familyFurnitureBtn: document.getElementById('familyFurnitureBtn'),
  typeSelect: document.getElementById('typeSelect'),
  productSelect: document.getElementById('productSelect'),
  colorSelect: document.getElementById('colorSelect'),
  heightSelect: document.getElementById('heightSelect'),
  ctcSelect: document.getElementById('ctcSelect'),
  topOptionSelect: document.getElementById('topOptionSelect'),
  setsCountSelect: document.getElementById('setsCountSelect'),
  furnitureScale: document.getElementById('furnitureScale'),
  furnitureScaleValue: document.getElementById('furnitureScaleValue'),
  heightFieldWrap: document.getElementById('heightFieldWrap'),
  ctcFieldWrap: document.getElementById('ctcFieldWrap'),
  topFieldWrap: document.getElementById('topFieldWrap'),
  setsFieldWrap: document.getElementById('setsFieldWrap'),
  furnitureScaleWrap: document.getElementById('furnitureScaleWrap'),

  selectedProductBadge: document.getElementById('selectedProductBadge'),
  referencePreview: document.getElementById('referencePreview'),
  referenceEmpty: document.getElementById('referenceEmpty'),
  previewMeta: document.getElementById('previewMeta'),

  promptPresets: document.getElementById('promptPresets'),
  customPrompt: document.getElementById('customPrompt'),
  generatedPrompt: document.getElementById('generatedPrompt'),
  openFenceDesignerBtn: document.getElementById('openFenceDesignerBtn'),
  openFurnitureDesignerBtn: document.getElementById('openFurnitureDesignerBtn'),
  manualStatus: document.getElementById('manualStatus'),

  generateBtn: document.getElementById('generateBtn'),
  generateAiBtn: document.getElementById('generateAiBtn'),
  downloadBtn: document.getElementById('downloadBtn'),
  generateStatus: document.getElementById('generateStatus'),
  providerSelect: document.getElementById('providerSelect'),
  testApiBtn: document.getElementById('testApiBtn'),
  refreshProviderBtn: document.getElementById('refreshProviderBtn'),
  providerBadges: document.getElementById('providerBadges'),
  providerHelp: document.getElementById('providerHelp'),
  providerTestStatus: document.getElementById('providerTestStatus'),
  blendModeSelect: document.getElementById('blendModeSelect'),
  includePlacementGuideChk: document.getElementById('includePlacementGuideChk'),
  includeFrontRefChk: document.getElementById('includeFrontRefChk'),
  includePerspectiveRefChk: document.getElementById('includePerspectiveRefChk'),
  includeSecondaryRefChk: document.getElementById('includeSecondaryRefChk'),
  bundleSummaryBadge: document.getElementById('bundleSummaryBadge'),
  bundleSummary: document.getElementById('bundleSummary'),
  bundleFrontImg: document.getElementById('bundleFrontImg'),
  bundlePerspectiveImg: document.getElementById('bundlePerspectiveImg'),
  bundleSecondaryImg: document.getElementById('bundleSecondaryImg'),
  bundleFrontEmpty: document.getElementById('bundleFrontEmpty'),
  bundlePerspectiveEmpty: document.getElementById('bundlePerspectiveEmpty'),
  bundleSecondaryEmpty: document.getElementById('bundleSecondaryEmpty'),
  resultSection: document.getElementById('resultSection'),
  resultGrid: document.getElementById('resultGrid'),
  originalCanvas: document.getElementById('originalCanvas'),
  resultCanvas: document.getElementById('resultCanvas'),
  sideBySideBtn: document.getElementById('sideBySideBtn'),
  resultOnlyBtn: document.getElementById('resultOnlyBtn'),

  libraryForm: document.getElementById('libraryForm'),
  editingProductId: document.getElementById('editingProductId'),
  adminCategory: document.getElementById('adminCategory'),
  adminType: document.getElementById('adminType'),
  adminName: document.getElementById('adminName'),
  adminColors: document.getElementById('adminColors'),
  adminHeights: document.getElementById('adminHeights'),
  adminCtc: document.getElementById('adminCtc'),
  adminTopOptions: document.getElementById('adminTopOptions'),
  adminReferenceImage: document.getElementById('adminReferenceImage'),
  adminSideImage: document.getElementById('adminSideImage'),
  adminTopImage: document.getElementById('adminTopImage'),
  adminPerspectiveImage: document.getElementById('adminPerspectiveImage'),
  adminSiteImage: document.getElementById('adminSiteImage'),
  adminNotes: document.getElementById('adminNotes'),
  newProductBtn: document.getElementById('newProductBtn'),
  exportLibraryBtn: document.getElementById('exportLibraryBtn'),
  importLibraryInput: document.getElementById('importLibraryInput'),
  resetLibraryBtn: document.getElementById('resetLibraryBtn'),
  adminLibraryList: document.getElementById('adminLibraryList'),

  designerModal: document.getElementById('designerModal'),
  closeDesignerBtn: document.getElementById('closeDesignerBtn'),
  closeDesignerFooterBtn: document.getElementById('closeDesignerFooterBtn'),
  designerEyebrow: document.getElementById('designerEyebrow'),
  designerTitle: document.getElementById('designerTitle'),
  designerDescription: document.getElementById('designerDescription'),
  designerReferencePreview: document.getElementById('designerReferencePreview'),
  designerReferenceEmpty: document.getElementById('designerReferenceEmpty'),
  designerReferenceName: document.getElementById('designerReferenceName'),
  designerReferenceStatus: document.getElementById('designerReferenceStatus'),
  designerCanvas: document.getElementById('designerCanvas'),
  designerEmpty: document.getElementById('designerEmpty'),
  autoPathBtn: document.getElementById('autoPathBtn'),
  drawPathBtn: document.getElementById('drawPathBtn'),
  editPathBtn: document.getElementById('editPathBtn'),
  clearPathBtn: document.getElementById('clearPathBtn'),
  perspectiveMode: document.getElementById('perspectiveMode'),
  vpRight: document.getElementById('vpRight'),
  vpLeft: document.getElementById('vpLeft'),
  horizon: document.getElementById('horizon'),
  fenceVisualHeight: document.getElementById('fenceVisualHeight'),
  vpRightValue: document.getElementById('vpRightValue'),
  vpLeftValue: document.getElementById('vpLeftValue'),
  horizonValue: document.getElementById('horizonValue'),
  fenceVisualHeightValue: document.getElementById('fenceVisualHeightValue'),
  showGuides: document.getElementById('showGuides'),
  addShadow: document.getElementById('addShadow'),
  fenceDesignerControls: document.getElementById('fenceDesignerControls'),
  furnitureDesignerControls: document.getElementById('furnitureDesignerControls'),
  modalFurnitureScale: document.getElementById('modalFurnitureScale'),
  modalFurnitureScaleValue: document.getElementById('modalFurnitureScaleValue'),
  resetFurnitureDotsBtn: document.getElementById('resetFurnitureDotsBtn'),
  designerFooterStatus: document.getElementById('designerFooterStatus'),
  saveDesignerBtn: document.getElementById('saveDesignerBtn'),
};

const originalCtx = el.originalCanvas.getContext('2d');
const resultCtx = el.resultCanvas.getContext('2d');
const designerCtx = el.designerCanvas.getContext('2d');

const IMAGE_PROMISES = new Map();
const IMAGE_STORE = new Map();
const IMAGE_ALPHA_BOUNDS = new Map();

function isImageReference(src) {
  return Boolean(src && (String(src).startsWith('data:image/') || String(src).startsWith('assets/') || /^https?:\/\//.test(String(src))));
}

function loadImageCached(src) {
  if (!isImageReference(src)) return Promise.resolve(null);
  if (IMAGE_STORE.has(src)) return Promise.resolve(IMAGE_STORE.get(src));
  if (IMAGE_PROMISES.has(src)) return IMAGE_PROMISES.get(src);
  const promise = new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      IMAGE_STORE.set(src, img);
      resolve(img);
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
  IMAGE_PROMISES.set(src, promise);
  return promise;
}

async function ensureSelectedReferenceReady(product = getSelectedProduct()) {
  const refs = product ? [product.referenceImage, product.perspectiveImage, product.siteImage, product.sideImage, product.topImage] : [];
  await Promise.all(refs.filter(isImageReference).map(loadImageCached));
}

function getCachedImageNow(src) {
  return IMAGE_STORE.get(src) || null;
}

const PROVIDER_INFO = {
  'local-preview': {
    label: 'Local preview only',
    help: 'No external API call. Best for validating product choice, line placement, perspective controls, and deployment UI before spending credits.',
  },
  pollinations: {
    label: 'Pollinations',
    help: 'Free-style public generation route for early online testing. Useful for proving the API workflow, but it may not preserve the uploaded site image or product reference with high fidelity.',
  },
  openai: {
    label: 'OpenAI',
    help: 'Best current route in this build for reference-grounded editing using the original site image, the local placement guide, and database product references together. Requires OPENAI_API_KEY on the server.',
  },
  stability: {
    label: 'Stability AI',
    help: 'Connected in v0.5.9 using the database raster reference fix workflow. Local previews now wait for selected database reference images to load, and aesthetic fence references are drawn as full product strips instead of being replaced by the generic mesh overlay.',
  },
  replicate: {
    label: 'Replicate',
    help: 'Scaffolded. Token detection and provider selection are ready; final generation endpoint/model mapping still needs to be implemented.',
  },
  huggingface: {
    label: 'Hugging Face',
    help: 'Scaffolded. Good for future open-source model trials once a specific inference provider/model is chosen.',
  },
};

function cloneSeed() {
  return JSON.parse(JSON.stringify(SEED_LIBRARY));
}

function loadLibrary() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return cloneSeed();
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length ? parsed : cloneSeed();
  } catch (error) {
    console.warn('Could not load library:', error);
    return cloneSeed();
  }
}

function saveLibrary() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.library));
  } catch (error) {
    alert('Could not save the library in local storage. Large images may exceed browser limits.');
    console.error(error);
  }
}

function unique(values) { return [...new Set(values.filter(Boolean))]; }
function splitOptions(value, fallback = []) {
  const list = String(value || '').split(',').map(v => v.trim()).filter(Boolean);
  return list.length ? list : fallback;
}
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
}
function clearCanvas(context, canvas) { context.clearRect(0, 0, canvas.width, canvas.height); }
function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

function getProducts(category = state.selectedCategory) {
  return state.library.filter(product => product.category === category);
}
function getSelectedProduct() {
  return state.library.find(product => product.id === state.selectedProductId) || null;
}
function getPreviewImage(product) {
  if (!product) return '';
  return product.perspectiveImage || product.referenceImage || product.siteImage || product.sideImage || product.topImage || '';
}
function getReferenceImage(product) {
  if (!product) return '';
  return product.referenceImage || product.perspectiveImage || product.siteImage || product.sideImage || product.topImage || '';
}

function setView(view) {
  state.currentView = view;
  el.customerView.classList.toggle('hidden', view !== 'customer');
  el.adminView.classList.toggle('hidden', view !== 'admin');
  el.customerModeBtn.classList.toggle('active', view === 'customer');
  el.adminModeBtn.classList.toggle('active', view === 'admin');
}

function setCategory(category) {
  state.selectedCategory = category;
  state.selectedType = '';
  state.selectedProductId = '';
  const presets = PRESETS[category];
  state.selectedPresetId = presets[0]?.id || '';
  el.familyFenceBtn.classList.toggle('active', category === 'fence');
  el.familyFurnitureBtn.classList.toggle('active', category === 'furniture');
  const isFence = category === 'fence';
  el.heightFieldWrap.classList.toggle('hidden', !isFence);
  el.ctcFieldWrap.classList.toggle('hidden', !isFence);
  el.topFieldWrap.classList.toggle('hidden', !isFence);
  el.setsFieldWrap.classList.toggle('hidden', isFence);
  el.furnitureScaleWrap.classList.toggle('hidden', isFence);
  el.openFenceDesignerBtn.classList.toggle('secondary-btn', category === 'fence');
  el.openFurnitureDesignerBtn.classList.toggle('secondary-btn', category === 'furniture');
  populateSelectors();
  updatePromptPresets();
  updatePrompt();
  updateManualStatus();
}

function populateSelectors() {
  const products = getProducts();
  const types = unique(products.map(product => product.type));
  if (!types.includes(state.selectedType)) state.selectedType = types[0] || '';
  el.typeSelect.innerHTML = types.map(type => `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`).join('');
  el.typeSelect.value = state.selectedType;

  const filtered = products.filter(product => !state.selectedType || product.type === state.selectedType);
  if (!filtered.some(product => product.id === state.selectedProductId)) state.selectedProductId = filtered[0]?.id || '';
  el.productSelect.innerHTML = filtered.map(product => `<option value="${escapeHtml(product.id)}">${escapeHtml(product.name)}</option>`).join('');
  el.productSelect.value = state.selectedProductId;
  updateOptionsForSelectedProduct();
}

function populateOption(select, options, fallback) {
  const list = options && options.length ? options : fallback;
  select.innerHTML = list.map(item => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join('');
}

function updateOptionsForSelectedProduct() {
  const product = getSelectedProduct();
  const isFence = state.selectedCategory === 'fence';
  if (!product) {
    el.selectedProductBadge.textContent = 'No product selected';
    el.referencePreview.removeAttribute('src');
    el.referenceEmpty.classList.remove('hidden');
    el.previewMeta.textContent = 'Preview visible to the customer. Full database remains hidden.';
    return;
  }

  const preview = getPreviewImage(product);
  el.selectedProductBadge.textContent = product.name;
  if (preview) {
    el.referencePreview.src = preview;
    el.referenceEmpty.classList.add('hidden');
  } else {
    el.referencePreview.removeAttribute('src');
    el.referenceEmpty.classList.remove('hidden');
  }

  populateOption(el.colorSelect, product.colors, isFence ? ['A-1 Green'] : ['Olive Green']);
  if (isFence) {
    populateOption(el.heightSelect, product.heights, ['2.4 m']);
    populateOption(el.ctcSelect, product.ctc, ['2.5 m']);
    populateOption(el.topOptionSelect, product.topOptions, ['None']);
  }

  const views = ['referenceImage','sideImage','topImage','perspectiveImage','siteImage'].filter(key => product[key]).length;
  el.previewMeta.textContent = isFence
    ? `${views} reference view${views === 1 ? '' : 's'} available in admin library. Customer sees only this approved preview.`
    : `${views} product reference view${views === 1 ? '' : 's'} available in admin library. Use the manual placement tool for scale and dot placement.`;

  if (state.selectedCategory === 'furniture') syncFurnitureDots();
  if (!el.designerModal.classList.contains('hidden')) drawDesignerCanvas();
  if (state.resultReady && state.siteImage) generateConcept(false);
}

function updatePromptPresets() {
  const presets = PRESETS[state.selectedCategory];
  if (!presets.some(item => item.id === state.selectedPresetId)) state.selectedPresetId = presets[0]?.id || '';
  el.promptPresets.innerHTML = presets.map(preset => `
    <button type="button" class="preset-card ${preset.id === state.selectedPresetId ? 'active' : ''}" data-preset-id="${preset.id}">
      <span>${preset.icon}</span>
      ${escapeHtml(preset.title)}
    </button>
  `).join('');
}

function updatePrompt() {
  const product = getSelectedProduct();
  const preset = PRESETS[state.selectedCategory].find(item => item.id === state.selectedPresetId);
  if (!product || !preset) {
    el.generatedPrompt.value = 'Select a product to prepare the AI instruction.';
    return;
  }
  const lines = [preset.prompt];
  if (state.selectedCategory === 'fence') {
    lines.push(`Product family: Fence / Perimeter Product.`);
    lines.push(`Approved product: ${product.name}.`);
    lines.push(`Fence type: ${product.type}.`);
    lines.push(`Color: ${el.colorSelect.value}.`);
    lines.push(`Height: ${el.heightSelect.value}.`);
    lines.push(`Post CTC: ${el.ctcSelect.value}.`);
    lines.push(`Top option: ${el.topOptionSelect.value}.`);
    if (state.pathPoints.length >= 2) lines.push(`Use the manually defined fence path and perspective guide.`);
    lines.push(`Use the hidden admin database product as the authoritative fence reference. The local preview or manual path is the placement guide only. Preserve post rhythm, panel character, motif fidelity, scale, and perspective.`);
  } else {
    lines.push(`Product family: Meshable Outdoor Furniture.`);
    lines.push(`Approved product: ${product.name}.`);
    lines.push(`Furniture type: ${product.type}.`);
    lines.push(`Finish/color: ${el.colorSelect.value}.`);
    lines.push(`Number of sets: ${el.setsCountSelect.value}.`);
    lines.push(`Scale setting: ${el.furnitureScale.value}%.`);
    if (state.furniturePositions.length) lines.push(`Use the manually placed furniture dots as the layout guide.`);
    lines.push(`Use the hidden admin database product as the authoritative furniture reference. The local preview or manual dots are the placement guide only. Preserve product geometry, realistic ground contact, and scene fit.`);
  }
  if (el.customPrompt.value.trim()) lines.push(`User additional instruction: ${el.customPrompt.value.trim()}`);
  if (product.notes) lines.push(`Admin guidance: ${product.notes}`);
  el.generatedPrompt.value = lines.join('\n');
}

function updateManualStatus() {
  let text = 'Manual placement: using automatic defaults';
  if (state.selectedCategory === 'fence' && state.pathPoints.length >= 2) {
    text = `Manual placement: ${state.pathPoints.length} fence path point${state.pathPoints.length === 1 ? '' : 's'} saved`;
  }
  if (state.selectedCategory === 'furniture' && state.furniturePositions.length) {
    text = `Manual placement: ${state.furniturePositions.length} furniture placement dot${state.furniturePositions.length === 1 ? '' : 's'} ready`;
  }
  el.manualStatus.textContent = text;
}

function setupDropzone() {
  // siteDropzone is a <label>, so the browser already opens the file picker
  // through the hidden input. Do not call siteInput.click() here, otherwise
  // Windows/Chrome can open the upload dialog twice.
  el.siteInput.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (file) loadSiteImage(file);
  });
  ['dragenter', 'dragover'].forEach(name => {
    el.siteDropzone.addEventListener(name, event => {
      event.preventDefault();
      el.siteDropzone.classList.add('dragover');
    });
  });
  ['dragleave', 'drop'].forEach(name => {
    el.siteDropzone.addEventListener(name, event => {
      event.preventDefault();
      el.siteDropzone.classList.remove('dragover');
    });
  });
  el.siteDropzone.addEventListener('drop', (event) => {
    const file = event.dataTransfer.files?.[0];
    if (file) loadSiteImage(file);
  });
  el.removeSiteBtn.addEventListener('click', (event) => {
    event.preventDefault();
    state.siteImage = null;
    state.siteName = '';
    state.pathPoints = [];
    state.furniturePositions = [];
    state.resultReady = false;
    el.siteInput.value = '';
    el.sitePreview.src = '';
    el.siteEmpty.classList.remove('hidden');
    el.sitePreviewWrap.classList.add('hidden');
    el.resultSection.classList.add('hidden');
    el.downloadBtn.disabled = true;
    drawDesignerCanvas();
    updateManualStatus();
    el.generateStatus.textContent = 'Awaiting site image and product selection.';
  });
}

function loadSiteImage(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      state.siteImage = img;
      state.siteName = file.name;
      state.resultReady = false;
      el.sitePreview.src = reader.result;
      el.siteFileName.textContent = file.name;
      el.siteEmpty.classList.add('hidden');
      el.sitePreviewWrap.classList.remove('hidden');
      autoPath(false);
      syncFurnitureDots(true);
      drawDesignerCanvas();
      updateManualStatus();
      el.generateStatus.textContent = 'Site image loaded. Select the approved product and generate a preview.';
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function fitImageRect(img, canvas) {
  const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
  const width = img.width * ratio;
  const height = img.height * ratio;
  return { x: (canvas.width - width) / 2, y: (canvas.height - height) / 2, width, height };
}

function drawBaseImage(context, canvas, img) {
  clearCanvas(context, canvas);
  context.fillStyle = '#0f1414';
  context.fillRect(0, 0, canvas.width, canvas.height);
  if (!img) return null;
  const rect = fitImageRect(img, canvas);
  context.drawImage(img, rect.x, rect.y, rect.width, rect.height);
  return rect;
}

function mapPointBetweenImageRects(point, fromCanvas, toCanvas) {
  if (!state.siteImage) return { ...point };
  const fromRect = fitImageRect(state.siteImage, fromCanvas);
  const toRect = fitImageRect(state.siteImage, toCanvas);
  const nx = fromRect.width ? (point.x - fromRect.x) / fromRect.width : 0;
  const ny = fromRect.height ? (point.y - fromRect.y) / fromRect.height : 0;
  return {
    x: toRect.x + nx * toRect.width,
    y: toRect.y + ny * toRect.height,
  };
}

function getFencePathForCanvas(canvas) {
  return state.pathPoints.map(point => mapPointBetweenImageRects(point, el.designerCanvas, canvas));
}

function getFurniturePositionsForCanvas(canvas) {
  return state.furniturePositions.map(point => ({
    ...mapPointBetweenImageRects(point, el.designerCanvas, canvas),
    id: point.id,
  }));
}

function autoPath(forceRedraw = true) {
  if (!state.siteImage) return;
  const rect = fitImageRect(state.siteImage, el.designerCanvas);
  state.pathPoints = [
    { x: rect.x + rect.width * 0.04, y: rect.y + rect.height * 0.86 },
    { x: rect.x + rect.width * 0.50, y: rect.y + rect.height * 0.79 },
    { x: rect.x + rect.width * 0.96, y: rect.y + rect.height * 0.73 },
  ];
  if (forceRedraw) drawDesignerCanvas();
}

function syncFurnitureDots(forceReset = false) {
  const count = Number(el.setsCountSelect.value || 1);
  if (!state.siteImage) {
    if (forceReset) state.furniturePositions = Array.from({length: count}, (_, i) => ({ x: 0, y: 0, id: i + 1 }));
    return;
  }
  if (forceReset || state.furniturePositions.length !== count || !state.furniturePositions.every(p => p.x && p.y)) {
    const rect = fitImageRect(state.siteImage, el.designerCanvas);
    const rows = Math.ceil(count / 3);
    const positions = [];
    for (let i = 0; i < count; i++) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const perRow = row === rows - 1 ? (count - row * 3) : 3;
      const x = rect.x + rect.width * (0.30 + (col / Math.max(1, perRow - 1 || 1)) * 0.44);
      const y = rect.y + rect.height * (0.66 + row * 0.10);
      positions.push({ x, y, id: i + 1 });
    }
    state.furniturePositions = positions;
  }
  updateManualStatus();
}

function getCanvasPoint(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (canvas.width / rect.width),
    y: (event.clientY - rect.top) * (canvas.height / rect.height),
  };
}

function findFenceHandle(point) {
  for (let i = 0; i < state.pathPoints.length; i++) {
    const p = state.pathPoints[i];
    if (Math.hypot(point.x - p.x, point.y - p.y) < 18) return { type: 'path', index: i };
  }
  return null;
}
function findFurnitureHandle(point) {
  for (let i = 0; i < state.furniturePositions.length; i++) {
    const p = state.furniturePositions[i];
    if (Math.hypot(point.x - p.x, point.y - p.y) < 22) return { type: 'furniture', index: i };
  }
  return null;
}

function initDesignerInteractions() {
  el.designerCanvas.addEventListener('mousedown', (event) => {
    if (!state.siteImage) return;
    const point = getCanvasPoint(event, el.designerCanvas);
    if (state.modalOpenFor === 'fence') {
      if (state.fenceMode === 'edit') state.dragging = findFenceHandle(point);
    } else {
      state.dragging = findFurnitureHandle(point) || { type: 'furniture', index: 0 };
      moveFurniturePoint(point, state.dragging.index || 0);
      drawDesignerCanvas();
    }
  });
  el.designerCanvas.addEventListener('mousemove', (event) => {
    if (!state.siteImage || !state.dragging) return;
    const point = getCanvasPoint(event, el.designerCanvas);
    const rect = fitImageRect(state.siteImage, el.designerCanvas);
    if (state.dragging.type === 'path') {
      state.pathPoints[state.dragging.index] = {
        x: clamp(point.x, rect.x, rect.x + rect.width),
        y: clamp(point.y, rect.y, rect.y + rect.height)
      };
    } else if (state.dragging.type === 'furniture') {
      moveFurniturePoint(point, state.dragging.index);
    }
    drawDesignerCanvas();
  });
  ['mouseup', 'mouseleave'].forEach(name => el.designerCanvas.addEventListener(name, () => { state.dragging = null; }));
  el.designerCanvas.addEventListener('click', (event) => {
    if (!state.siteImage) return;
    const point = getCanvasPoint(event, el.designerCanvas);
    const rect = fitImageRect(state.siteImage, el.designerCanvas);
    if (state.modalOpenFor === 'fence' && state.fenceMode === 'draw') {
      state.pathPoints.push({ x: clamp(point.x, rect.x, rect.x + rect.width), y: clamp(point.y, rect.y, rect.y + rect.height) });
      drawDesignerCanvas();
      return;
    }
    if (state.modalOpenFor === 'furniture') {
      const handle = findFurnitureHandle(point);
      if (handle) return;
      const index = closestFurnitureIndex(point);
      moveFurniturePoint(point, index);
      drawDesignerCanvas();
    }
  });
}

function closestFurnitureIndex(point) {
  let best = 0;
  let bestDist = Infinity;
  state.furniturePositions.forEach((p, i) => {
    const dist = Math.hypot(point.x - p.x, point.y - p.y);
    if (dist < bestDist) { bestDist = dist; best = i; }
  });
  return best;
}

function moveFurniturePoint(point, index) {
  const rect = fitImageRect(state.siteImage, el.designerCanvas);
  if (!state.furniturePositions[index]) return;
  state.furniturePositions[index].x = clamp(point.x, rect.x, rect.x + rect.width);
  state.furniturePositions[index].y = clamp(point.y, rect.y, rect.y + rect.height);
}

function updateSliderLabels() {
  el.vpRightValue.textContent = el.vpRight.value;
  el.vpLeftValue.textContent = el.vpLeft.value;
  el.horizonValue.textContent = el.horizon.value;
  el.fenceVisualHeightValue.textContent = el.fenceVisualHeight.value;
  el.furnitureScaleValue.textContent = el.furnitureScale.value;
  el.modalFurnitureScaleValue.textContent = el.modalFurnitureScale.value;
}

function getPerspectiveData(rect) {
  const horizonY = rect.y + rect.height * (Number(el.horizon.value) / 100);
  return {
    rect,
    horizonY,
    vpRight: { x: rect.x + rect.width * (Number(el.vpRight.value) / 100), y: horizonY },
    vpLeft: { x: rect.x + rect.width * (Number(el.vpLeft.value) / 100), y: horizonY },
    visualHeight: Number(el.fenceVisualHeight.value),
  };
}

function getDepthScale(point, data) {
  const rect = data.rect;
  const verticalDepth = clamp((point.y - data.horizonY) / Math.max(1, (rect.y + rect.height) - data.horizonY), 0.08, 1.6);
  const centerFactor = 0.85 + 0.35 * (Math.abs(point.x - (rect.x + rect.width / 2)) / rect.width);
  return clamp(0.2 + verticalDepth * centerFactor, 0.18, 1.35);
}
function getPostHeightAt(point, data) { return data.visualHeight * getDepthScale(point, data); }
function getVerticalTop(point, height, data) {
  if (el.perspectiveMode.value === 'three') {
    const verticalVp = { x: point.x, y: data.rect.y - data.rect.height * 1.4 };
    const vx = verticalVp.x - point.x;
    const vy = verticalVp.y - point.y;
    const len = Math.max(1, Math.hypot(vx, vy));
    return { x: point.x + vx / len * height, y: point.y + vy / len * height };
  }
  return { x: point.x, y: point.y - height };
}
function interpolate(a, b, t) { return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }; }
function pathLength(path) {
  let total = 0;
  for (let i = 0; i < path.length - 1; i++) total += Math.hypot(path[i+1].x - path[i].x, path[i+1].y - path[i].y);
  return total;
}
function pointOnPath(path, distance) {
  let remaining = distance;
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i], b = path[i+1];
    const length = Math.hypot(b.x - a.x, b.y - a.y);
    if (remaining <= length) return interpolate(a, b, length ? remaining / length : 0);
    remaining -= length;
  }
  return path[path.length - 1];
}
function samplePath(path, count) {
  if (path.length < 2) return [];
  const len = pathLength(path);
  return Array.from({ length: count }, (_, i) => pointOnPath(path, len * (i / Math.max(1, count - 1))));
}
function samplePosts(path, ctcLabel, data) {
  if (path.length < 2) return [];
  const spacingM = Number(String(ctcLabel || '2.5').match(/[0-9.]+/)?.[0] || 2.5);
  const basePx = 92 * (spacingM / 2.5);
  const posts = [{ ...path[0] }];
  let traveled = 0;
  let nextDistance = basePx * getDepthScale(path[0], data);
  const total = pathLength(path);
  while (traveled + nextDistance < total) {
    traveled += nextDistance;
    const p = pointOnPath(path, traveled);
    posts.push(p);
    nextDistance = basePx * getDepthScale(p, data);
  }
  const last = path[path.length - 1];
  if (posts.length && Math.hypot(posts[posts.length - 1].x - last.x, posts[posts.length - 1].y - last.y) > basePx * 0.35) posts.push({ ...last });
  return posts;
}

function roundRect(context, x, y, w, h, r) {
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + w, y, x + w, y + h, r);
  context.arcTo(x + w, y + h, x, y + h, r);
  context.arcTo(x, y + h, x, y, r);
  context.arcTo(x, y, x + w, y, r);
  context.closePath();
}

function drawPerspectiveGuides(context, data) {
  const { rect, vpRight, vpLeft, horizonY } = data;
  context.save();
  context.globalAlpha = 0.45;
  context.strokeStyle = '#d0b686';
  context.lineWidth = 1.5;
  context.setLineDash([10, 8]);
  context.beginPath();
  context.moveTo(rect.x, horizonY);
  context.lineTo(rect.x + rect.width, horizonY);
  context.stroke();
  [vpRight, vpLeft].forEach(vp => {
    context.beginPath();
    context.moveTo(rect.x + rect.width / 2, rect.y + rect.height * 0.86);
    context.lineTo(vp.x, vp.y);
    context.stroke();
    context.beginPath();
    context.arc(vp.x, vp.y, 12, 0, Math.PI * 2);
    context.stroke();
  });
  context.restore();
}

function colorNameToHex(name) {
  const lower = String(name || '').toLowerCase();
  if (lower.includes('black') || lower.includes('graphite')) return '#202427';
  if (lower.includes('grey') || lower.includes('gray') || lower.includes('galvan')) return '#69716c';
  if (lower.includes('white')) return '#f1eee7';
  if (lower.includes('terracotta')) return '#9d543f';
  return '#2f5f46';
}

function isAestheticFence(product) {
  return String(product?.type || product?.name || '').toLowerCase().includes('aesthetic');
}

function drawFenceGuidedOverlay(context, path, product, color, data) {
  const posts = samplePosts(path, el.ctcSelect.value, data);
  const rails = samplePath(path, 80);
  if (el.addShadow.checked) drawGroundShadow(context, rails, data);
  const referenceImage = getReferenceImage(product);
  const drewReference = referenceImage ? drawReferencePanels(context, posts, referenceImage, data, color, path, product) : false;

  // Critical v0.5.9 change:
  // If a product reference exists, the local renderer must respect it first.
  // The old build drew a generic mesh overlay on top of every product, which made
  // aesthetic fences look like plain 358-style mesh. Generic mesh is now only a fallback.
  if (!drewReference) drawFenceRailsAndMesh(context, rails, data, color, product?.type || 'Fence');
  drawPosts(context, posts, data, color);
}

function drawGroundShadow(context, rails, data) {
  if (!rails.length) return;
  context.save();
  context.strokeStyle = 'rgba(0,0,0,.24)';
  context.lineWidth = 20;
  context.filter = 'blur(10px)';
  context.beginPath();
  rails.forEach((p, i) => {
    const s = getDepthScale(p, data);
    const x = p.x + 12 * s;
    const y = p.y + 16 * s;
    i ? context.lineTo(x, y) : context.moveTo(x, y);
  });
  context.stroke();
  context.restore();
}

function shouldTintReferenceImage(product, src) {
  if (!product) return false;
  const source = String(src || '').toLowerCase();
  // Do not tint real PNG/JPEG database references. Tinting a raster reference was the
  // reason aesthetic panels became a solid green rectangle in v0.5.9. Only tint the
  // procedural SVG placeholders where the product is deliberately stored as a mask.
  if (isAestheticFence(product)) return false;
  return source.startsWith('data:image/svg') && product.category === 'fence';
}

function getImageAlphaBounds(img, src) {
  if (!img) return null;
  if (IMAGE_ALPHA_BOUNDS.has(src)) return IMAGE_ALPHA_BOUNDS.get(src);
  let bounds = null;
  try {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let minX = width, minY = height, maxX = -1, maxY = -1;
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const alpha = data[(y * width + x) * 4 + 3];
        if (alpha > 30) {
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX >= minX && maxY >= minY) {
      const padX = Math.round(width * 0.005);
      const padY = Math.round(height * 0.02);
      bounds = {
        sx: Math.max(0, minX - padX),
        sy: Math.max(0, minY - padY),
        sw: Math.min(width, maxX + padX) - Math.max(0, minX - padX) + 1,
        sh: Math.min(height, maxY + padY) - Math.max(0, minY - padY) + 1,
      };
    }
  } catch (error) {
    bounds = null;
  }
  IMAGE_ALPHA_BOUNDS.set(src, bounds);
  return bounds;
}

function tintDrawnPixels(context, width, height, color) {
  context.globalCompositeOperation = 'source-in';
  context.fillStyle = color;
  context.globalAlpha = 0.92;
  context.fillRect(0, 0, width, height);
  context.globalCompositeOperation = 'source-over';
  context.globalAlpha = 1;
}

function buildFenceClip(context, path, data) {
  const rails = samplePath(path, 80);
  if (rails.length < 2) return null;
  const topRail = rails.map(point => getVerticalTop(point, getPostHeightAt(point, data) * 0.98, data));
  context.beginPath();
  rails.forEach((point, index) => index ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y));
  [...topRail].reverse().forEach(point => context.lineTo(point.x, point.y));
  context.closePath();
  return { rails, topRail };
}

function drawReferenceStrip(context, img, data, color, path, product, src) {
  const shape = buildFenceClip(context, path, data);
  if (!shape) return false;
  const rails = shape.rails;
  const first = rails[0];
  const last = rails[rails.length - 1];
  const firstTop = getVerticalTop(first, getPostHeightAt(first, data) * 0.98, data);
  const lastTop = getVerticalTop(last, getPostHeightAt(last, data) * 0.98, data);
  const width = Math.max(80, Math.hypot(lastTop.x - firstTop.x, lastTop.y - firstTop.y));
  const height = Math.max(40, (Math.hypot(first.x - firstTop.x, first.y - firstTop.y) + Math.hypot(last.x - lastTop.x, last.y - lastTop.y)) / 2);
  const bounds = getImageAlphaBounds(img, src) || { sx: 0, sy: 0, sw: img.naturalWidth || img.width, sh: img.naturalHeight || img.height };

  context.save();
  buildFenceClip(context, path, data);
  context.clip();
  const aM = (lastTop.x - firstTop.x) / width;
  const bM = (lastTop.y - firstTop.y) / width;
  const cM = (first.x - firstTop.x) / height;
  const dM = (first.y - firstTop.y) / height;
  context.setTransform(aM, bM, cM, dM, firstTop.x, firstTop.y);
  context.globalAlpha = isAestheticFence(product) ? 0.98 : 0.92;
  context.drawImage(img, bounds.sx, bounds.sy, bounds.sw, bounds.sh, 0, 0, width, height);
  if (shouldTintReferenceImage(product, src)) tintDrawnPixels(context, width, height, color);
  context.restore();
  return true;
}

function drawReferencePanels(context, posts, src, data, color, path, product) {
  if (posts.length < 2) return false;
  const img = getCachedImageNow(src);
  if (!img) {
    loadImageCached(src).then(() => {
      if (context === designerCtx) drawDesignerCanvas();
    });
    return false;
  }

  // Product reference is now drawn as a full strip across the selected boundary.
  // This preserves large decorative motifs such as the tree/peacock panels from the database.
  return drawReferenceStrip(context, img, data, color, path, product, src);
}

function drawFenceRailsAndMesh(context, rails, data, color, type) {
  if (!rails.length) return;
  context.save();
  const lowerType = String(type).toLowerCase();
  context.strokeStyle = color;
  context.globalAlpha = lowerType.includes('aesthetic') ? 0.45 : 0.62;
  context.lineWidth = lowerType.includes('palisade') ? 3 : 1.2;
  const rows = lowerType.includes('358') ? 22 : lowerType.includes('palisade') ? 2 : 14;
  for (let r = 0; r <= rows; r++) {
    const frac = r / rows;
    context.beginPath();
    rails.forEach((p, i) => {
      const top = getVerticalTop(p, getPostHeightAt(p, data) * (0.05 + frac * 0.92), data);
      i ? context.lineTo(top.x, top.y) : context.moveTo(top.x, top.y);
    });
    context.stroke();
  }
  context.globalAlpha = 0.38;
  for (let i = 0; i < rails.length; i += lowerType.includes('358') ? 2 : 5) {
    const p = rails[i];
    const top = getVerticalTop(p, getPostHeightAt(p, data) * 0.96, data);
    context.beginPath();
    context.moveTo(p.x, p.y); context.lineTo(top.x, top.y); context.stroke();
  }
  context.globalAlpha = 0.86;
  [0.02, 0.52, 0.98].forEach((frac, idx) => {
    context.lineWidth = idx === 1 ? 2 : 3.4;
    context.beginPath();
    rails.forEach((p, i) => {
      const top = getVerticalTop(p, getPostHeightAt(p, data) * frac, data);
      i ? context.lineTo(top.x, top.y) : context.moveTo(top.x, top.y);
    });
    context.stroke();
  });
  context.restore();
}

function drawPosts(context, posts, data, color) {
  context.save();
  posts.forEach(p => {
    const scale = getDepthScale(p, data);
    const h = getPostHeightAt(p, data);
    const top = getVerticalTop(p, h, data);
    context.strokeStyle = color;
    context.lineCap = 'round';
    context.lineWidth = Math.max(3, 12 * scale);
    context.beginPath(); context.moveTo(p.x, p.y); context.lineTo(top.x, top.y); context.stroke();
    context.fillStyle = 'rgba(0,0,0,.25)';
    context.beginPath(); context.ellipse(p.x + 8 * scale, p.y + 8 * scale, 16 * scale, 5 * scale, 0, 0, Math.PI * 2); context.fill();
  });
  context.restore();
}

function drawLabel(context, rect, text) {
  context.save();
  context.fillStyle = 'rgba(18,22,22,.78)';
  roundRect(context, rect.x + 18, rect.y + 18, Math.min(420, rect.width * 0.6), 44, 16);
  context.fill();
  context.fillStyle = '#f7f7f3';
  context.font = 'bold 18px sans-serif';
  context.fillText(text, rect.x + 34, rect.y + 46);
  context.restore();
}

function drawDesignerCanvas() {
  const rect = drawBaseImage(designerCtx, el.designerCanvas, state.siteImage);
  el.designerEmpty.classList.toggle('hidden', !!state.siteImage);
  if (!rect || !state.siteImage) return;
  if (state.modalOpenFor === 'fence') drawFenceDesigner(rect);
  else drawFurnitureDesigner(rect);
}

function drawFenceDesigner(rect) {
  const data = getPerspectiveData(rect);
  if (el.showGuides.checked) drawPerspectiveGuides(designerCtx, data);
  if (state.pathPoints.length >= 2) {
    drawFenceGuidedOverlay(designerCtx, state.pathPoints, getSelectedProduct(), colorNameToHex(el.colorSelect.value), data);
  }
  designerCtx.save();
  designerCtx.lineWidth = 4;
  designerCtx.strokeStyle = '#9cc0a8';
  designerCtx.setLineDash([10, 8]);
  if (state.pathPoints.length) {
    designerCtx.beginPath();
    state.pathPoints.forEach((p, i) => i ? designerCtx.lineTo(p.x, p.y) : designerCtx.moveTo(p.x, p.y));
    designerCtx.stroke();
  }
  designerCtx.setLineDash([]);
  state.pathPoints.forEach((p, i) => {
    designerCtx.fillStyle = '#6f9f7d';
    designerCtx.beginPath(); designerCtx.arc(p.x, p.y, 12, 0, Math.PI * 2); designerCtx.fill();
    designerCtx.fillStyle = '#102014';
    designerCtx.font = 'bold 12px sans-serif';
    designerCtx.textAlign = 'center'; designerCtx.textBaseline = 'middle';
    designerCtx.fillText(String(i + 1), p.x, p.y + 1);
  });
  designerCtx.restore();
}

function getFurnitureBox(point, rect, scalePercent = Number(el.furnitureScale.value)) {
  const scale = scalePercent / 100;
  const depth = clamp((point.y - rect.y) / rect.height, 0.45, 1.05);
  const width = rect.width * 0.11 * scale * depth;
  const height = width * 0.75;
  return { x: point.x - width / 2, y: point.y - height, width, height };
}

function drawFurnitureImageAt(context, product, box, finalMode = false) {
  const src = getReferenceImage(product);
  if (!src) return;
  const img = new Image();
  img.onload = () => {
    context.save();
    context.fillStyle = finalMode ? 'rgba(0,0,0,.22)' : 'rgba(111,159,125,.16)';
    context.filter = 'blur(8px)';
    context.beginPath();
    context.ellipse(box.x + box.width / 2, box.y + box.height + 12, box.width * 0.42, box.height * 0.08, 0, 0, Math.PI * 2);
    context.fill();
    context.filter = 'none';
    context.globalAlpha = finalMode ? 0.94 : 0.75;
    context.drawImage(img, box.x, box.y, box.width, box.height);
    context.restore();
  };
  img.src = src;
}

function drawFurnitureDesigner(rect) {
  const product = getSelectedProduct();
  if (!product) return;
  state.furniturePositions.forEach((point, index) => {
    const box = getFurnitureBox(point, rect, Number(el.modalFurnitureScale.value));
    drawFurnitureImageAt(designerCtx, product, box, false);
    designerCtx.save();
    designerCtx.fillStyle = '#6f9f7d';
    designerCtx.beginPath(); designerCtx.arc(point.x, point.y, 14, 0, Math.PI * 2); designerCtx.fill();
    designerCtx.fillStyle = '#102014';
    designerCtx.font = 'bold 13px sans-serif';
    designerCtx.textAlign = 'center'; designerCtx.textBaseline = 'middle';
    designerCtx.fillText(String(index + 1), point.x, point.y + 1);
    designerCtx.restore();
  });
}

async function openDesigner(kind) {
  if (!state.siteImage) {
    alert('Upload a site image first.');
    return;
  }
  // Do not reset the selected product when opening the editor.
  // Earlier builds called setCategory('fence') every time, which reset a user-selected
  // product like Palisade back to the first fence in the library.
  if (kind !== state.selectedCategory) setCategory(kind);
  state.modalOpenFor = kind;
  el.fenceDesignerControls.classList.toggle('hidden', kind !== 'fence');
  el.furnitureDesignerControls.classList.toggle('hidden', kind !== 'furniture');
  el.designerEyebrow.textContent = kind === 'fence' ? 'Fence placement tool' : 'Furniture placement tool';
  el.designerTitle.textContent = kind === 'fence' ? 'Fence line & perspective editor' : 'Furniture placement & scale editor';
  el.designerDescription.textContent = kind === 'fence'
    ? 'Draw the fence path, adjust perspective, then save the placement.'
    : 'Drag the placement dots to position the furniture sets on the photographed site.';
  el.designerFooterStatus.textContent = kind === 'fence'
    ? `${state.pathPoints.length || 0} path points currently saved.`
    : `${state.furniturePositions.length || 0} furniture placement dots currently saved.`;
  el.designerModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  await ensureSelectedReferenceReady(getSelectedProduct());
  drawDesignerCanvas();
}

function closeDesigner() {
  el.designerModal.classList.add('hidden');
  document.body.style.overflow = '';
}


function getSelectedProvider() {
  return el.providerSelect?.value || state.selectedProvider || 'local-preview';
}

function updateProviderUI() {
  state.selectedProvider = getSelectedProvider();
  const info = PROVIDER_INFO[state.selectedProvider] || PROVIDER_INFO['local-preview'];
  if (el.providerHelp) el.providerHelp.textContent = info.help;
  if (el.providerTestStatus && (!el.providerTestStatus.textContent || el.providerTestStatus.textContent.includes('Select a provider'))) {
    el.providerTestStatus.textContent = `${info.label} selected.`;
  }
  if (el.generateAiBtn) {
    el.generateAiBtn.textContent = state.selectedProvider === 'local-preview' ? 'Use local preview only' : `Generate AI refinement (${info.label})`;
  }
}

function renderProviderBadges(health) {
  if (!el.providerBadges) return;
  const providers = health?.providers || {};
  const order = ['local-preview', 'pollinations', 'openai', 'stability', 'replicate', 'huggingface'];
  el.providerBadges.innerHTML = order.map((key) => {
    const item = providers[key] || {};
    const configured = item.configured !== false;
    const ready = item.ready === true;
    const className = ready ? 'ready' : configured ? 'partial' : 'offline';
    const label = PROVIDER_INFO[key]?.label || key;
    const hint = item.message || (ready ? 'ready' : configured ? 'configured' : 'not configured');
    return `<div class="provider-badge ${className}" title="${hint.replace(/"/g,'&quot;')}"><span class="dot"></span><strong>${label}</strong><span>· ${ready ? 'ready' : configured ? 'configured / scaffold' : 'offline'}</span></div>`;
  }).join('');
}

async function refreshProviderHealth(showFeedback = false) {
  if (!el.providerTestStatus) return;
  try {
    const response = await fetch('/api/health');
    const data = await response.json();
    state.providerHealth = data;
    renderProviderBadges(data);
    if (showFeedback) {
      el.providerTestStatus.textContent = 'Provider status refreshed.';
    }
  } catch (error) {
    el.providerTestStatus.textContent = 'Provider status could not be loaded in local-file mode. It will work after deployment.';
    renderProviderBadges({ providers: {
      'local-preview': { ready: true, configured: true },
      pollinations: { ready: true, configured: true },
      openai: { ready: false, configured: false },
      stability: { ready: false, configured: false },
      replicate: { ready: false, configured: false },
      huggingface: { ready: false, configured: false },
    }});
  }
}

async function testApiConnection() {
  const provider = getSelectedProvider();
  const info = PROVIDER_INFO[provider] || { label: provider };
  if (provider === 'local-preview') {
    el.providerTestStatus.textContent = 'Local preview mode needs no API connection.';
    return;
  }
  el.testApiBtn.disabled = true;
  el.providerTestStatus.textContent = `Testing ${info.label}...`;
  try {
    const response = await fetch('/api/test-provider', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || data.message || `Test failed with status ${response.status}`);
    }
    el.providerTestStatus.textContent = data.message || `${info.label} connection test completed.`;
    await refreshProviderHealth(false);
  } catch (error) {
    el.providerTestStatus.textContent = `${info.label} test failed: ${error.message}`;
  } finally {
    el.testApiBtn.disabled = false;
  }
}

function saveDesignerPlacement() {
  if (state.modalOpenFor === 'fence') {
    if (state.pathPoints.length < 2) {
      alert('Add at least 2 path points for the fence line.');
      return;
    }
    state.selectedPresetId = 'drawn-line';
    el.designerFooterStatus.textContent = `${state.pathPoints.length} fence path points saved.`;
  } else {
    if (!state.furniturePositions.length) syncFurnitureDots(true);
    state.selectedPresetId = 'manual-placement';
    el.designerFooterStatus.textContent = `${state.furniturePositions.length} furniture placement dots saved.`;
  }
  updatePromptPresets();
  updatePrompt();
  updateManualStatus();
  closeDesigner();
}


function canvasToCompressedDataUrl(canvas, quality = 0.86) {
  return canvas.toDataURL('image/jpeg', quality);
}

async function imageSourceToDataUrl(src) {
  if (!isImageReference(src)) return '';
  if (String(src).startsWith('data:image/')) return src;
  const img = await loadImageCached(src);
  if (!img) return '';
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL('image/png');
}

async function getProductReferencePayload(product) {
  const refs = [];
  for (const key of ['referenceImage', 'perspectiveImage', 'sideImage', 'topImage', 'siteImage']) {
    if (product && product[key]) {
      const image = await imageSourceToDataUrl(product[key]);
      if (image) refs.push({ label: key, image });
    }
  }
  return refs.slice(0, 4);
}

function createOffscreenCanvas(width = el.resultCanvas.width, height = el.resultCanvas.height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function renderOriginalImageDataUrl(quality = 0.9) {
  const canvas = createOffscreenCanvas();
  const context = canvas.getContext('2d');
  drawBaseImage(context, canvas, state.siteImage);
  return canvas.toDataURL('image/jpeg', quality);
}

function renderCleanConceptFromCurrentResult(quality = 0.9) {
  const canvas = createOffscreenCanvas();
  const context = canvas.getContext('2d');
  context.drawImage(el.resultCanvas, 0, 0);

  // Remove the UI label from the generated guide before sending it to Stability.
  // The local guide must look like a product mock-up, not a UI screenshot.
  if (state.siteImage) {
    const rect = fitImageRect(state.siteImage, canvas);
    context.save();
    context.beginPath();
    context.rect(rect.x + 8, rect.y + 8, Math.min(460, rect.width * 0.65), 66);
    context.clip();
    drawBaseImage(context, canvas, state.siteImage);
    context.restore();
  }
  return canvas.toDataURL('image/jpeg', quality);
}

function waitForLocalPreviewPaint(ms = 450) {
  return new Promise(resolve => window.setTimeout(resolve, ms));
}

function drawLocalGuideOverlayOnCanvas(context, canvas, product) {
  if (!state.siteImage || !product) return;
  const rect = fitImageRect(state.siteImage, canvas);
  if (!rect) return;

  if (state.selectedCategory === 'fence') {
    if (state.pathPoints.length < 2) autoPath(false);
    const path = state.pathPoints.length >= 2 ? getFencePathForCanvas(canvas) : [
      { x: rect.x + rect.width * 0.04, y: rect.y + rect.height * 0.86 },
      { x: rect.x + rect.width * 0.50, y: rect.y + rect.height * 0.79 },
      { x: rect.x + rect.width * 0.96, y: rect.y + rect.height * 0.73 },
    ];
    const data = getPerspectiveData(rect);
    drawFenceGuidedOverlay(context, path, product, colorNameToHex(el.colorSelect.value), data);
  } else {
    syncFurnitureDots();
    getFurniturePositionsForCanvas(canvas).forEach(point => {
      const box = getFurnitureBox(point, rect, Number(el.furnitureScale.value));
      drawFurnitureImageAt(context, product, box, true);
    });
  }
}

function drawFenceMaskOverlay(context, path, data) {
  const rails = samplePath(path, 72);
  if (!rails.length) return;
  const topRail = rails.map(point => getVerticalTop(point, getPostHeightAt(point, data) * 0.98, data));
  const posts = samplePosts(path, el.ctcSelect.value, data);

  context.save();
  context.fillStyle = '#ffffff';
  context.beginPath();
  rails.forEach((point, index) => index ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y));
  [...topRail].reverse().forEach(point => context.lineTo(point.x, point.y));
  context.closePath();
  context.fill();

  context.strokeStyle = '#ffffff';
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.lineWidth = 28;
  context.beginPath();
  rails.forEach((point, index) => index ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y));
  context.stroke();

  context.lineWidth = 24;
  context.beginPath();
  topRail.forEach((point, index) => index ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y));
  context.stroke();

  posts.forEach(point => {
    const height = getPostHeightAt(point, data);
    const top = getVerticalTop(point, height, data);
    context.lineWidth = Math.max(16, 28 * getDepthScale(point, data));
    context.beginPath();
    context.moveTo(point.x, point.y);
    context.lineTo(top.x, top.y);
    context.stroke();
  });
  context.restore();
}

function drawFurnitureMaskOverlay(context, canvas, rect) {
  const points = getFurniturePositionsForCanvas(canvas);
  context.save();
  context.fillStyle = '#ffffff';
  points.forEach(point => {
    const box = getFurnitureBox(point, rect, Number(el.furnitureScale.value));
    const pad = Math.max(22, box.width * 0.14);
    roundRect(context, box.x - pad, box.y - pad, box.width + pad * 2, box.height + pad * 2, 28);
    context.fill();
  });
  context.restore();
}

function renderEditMaskDataUrl() {
  const canvas = createOffscreenCanvas();
  const context = canvas.getContext('2d');
  context.fillStyle = '#000000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  const rect = fitImageRect(state.siteImage, canvas);
  if (!rect) return canvas.toDataURL('image/png');

  if (state.selectedCategory === 'fence') {
    if (state.pathPoints.length < 2) autoPath(false);
    const path = state.pathPoints.length >= 2 ? getFencePathForCanvas(canvas) : [
      { x: rect.x + rect.width * 0.04, y: rect.y + rect.height * 0.86 },
      { x: rect.x + rect.width * 0.50, y: rect.y + rect.height * 0.79 },
      { x: rect.x + rect.width * 0.96, y: rect.y + rect.height * 0.73 },
    ];
    const data = getPerspectiveData(rect);
    drawFenceMaskOverlay(context, path, data);
  } else {
    syncFurnitureDots();
    drawFurnitureMaskOverlay(context, canvas, rect);
  }

  return canvas.toDataURL('image/png');
}

function buildPlacementSummary() {
  const product = getSelectedProduct();
  if (!product) return '';

  if (state.selectedCategory === 'fence') {
    const points = (state.pathPoints.length >= 2 ? getFencePathForCanvas(el.resultCanvas) : []).map((point, index) => {
      const x = ((point.x / el.resultCanvas.width) * 100).toFixed(1);
      const y = ((point.y / el.resultCanvas.height) * 100).toFixed(1);
      return 'P' + (index + 1) + '(' + x + '%, ' + y + '%)';
    });

    const parts = [
      'Place a ' + product.name + ' fence along the visible site boundary in perspective.',
      'Color / finish should read as ' + el.colorSelect.value + '.',
      'Height should read as ' + el.heightSelect.value + '.',
      'Post spacing should follow ' + el.ctcSelect.value + '.',
      'Top option: ' + el.topOptionSelect.value + '.',
    ];

    if (points.length) parts.push('Use this approximate boundary path on the image frame: ' + points.join(', ') + '.');
    return parts.join(' ');
  }

  const positions = getFurniturePositionsForCanvas(el.resultCanvas).map((point, index) => {
    const x = ((point.x / el.resultCanvas.width) * 100).toFixed(1);
    const y = ((point.y / el.resultCanvas.height) * 100).toFixed(1);
    return 'set ' + (index + 1) + ' at (' + x + '%, ' + y + '%)';
  });

  return [
    'Place ' + el.setsCountSelect.value + ' set(s) of ' + product.name + ' on the site image.',
    'Color / finish should read as ' + el.colorSelect.value + '.',
    positions.length ? 'Approximate placement points: ' + positions.join('; ') + '.' : '',
  ].filter(Boolean).join(' ');
}


async function generateAiRefinement() {
  if (!state.siteImage) {
    alert('Upload a site image first.');
    return;
  }
  const product = getSelectedProduct();
  if (!product) {
    alert('Select a product first.');
    return;
  }

  const provider = getSelectedProvider();

  // Always generate the controlled local base first. This gives any provider a clear placement guide.
  await generateConcept();
  if (!state.resultReady) return;
  await waitForLocalPreviewPaint(provider === 'stability' ? 650 : 350);

  if (provider === 'local-preview') {
    el.generateStatus.textContent = 'Local preview generated. Select another provider when you are ready to test a live API.';
    return;
  }

  el.generateAiBtn.disabled = true;
  el.generateStatus.textContent = provider === 'stability'
    ? 'Preparing site image, database product references, local placement guide, and edit mask for Stability AI reference-grounded blend...'
    : `Preparing site image, database product references, and local placement guide for ${PROVIDER_INFO[provider]?.label || provider}...`;

  try {
    const payload = {
      provider,
      originalImage: renderOriginalImageDataUrl(0.9),
      conceptImage: canvasToCompressedDataUrl(el.resultCanvas, 0.88),
      stabilityBaseImage: provider === 'stability' ? renderCleanConceptFromCurrentResult(0.92) : '',
      editMask: renderEditMaskDataUrl(),
      guideLock: provider === 'stability',
      includePlacementGuide: el.includePlacementGuideChk?.checked !== false,
      blendMode: el.blendModeSelect?.value || 'strict',
      prompt: el.generatedPrompt.value,
      productName: product.name,
      category: state.selectedCategory,
      references: await getProductReferencePayload(product),
      placementSummary: buildPlacementSummary(),
      color: el.colorSelect.value,
      height: state.selectedCategory === 'fence' ? el.heightSelect.value : '',
      postCtc: state.selectedCategory === 'fence' ? el.ctcSelect.value : '',
      topOption: state.selectedCategory === 'fence' ? el.topOptionSelect.value : '',
      setsCount: state.selectedCategory === 'furniture' ? el.setsCountSelect.value : '',
    };

    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.image) {
      throw new Error(data.error || data.message || `API request failed with status ${response.status}`);
    }

    const aiImage = new Image();
    aiImage.onload = () => {
      clearCanvas(resultCtx, el.resultCanvas);
      resultCtx.fillStyle = '#0f1414';
      resultCtx.fillRect(0, 0, el.resultCanvas.width, el.resultCanvas.height);
      const ratio = Math.min(el.resultCanvas.width / aiImage.width, el.resultCanvas.height / aiImage.height);
      const width = aiImage.width * ratio;
      const height = aiImage.height * ratio;
      const x = (el.resultCanvas.width - width) / 2;
      const y = (el.resultCanvas.height - height) / 2;
      resultCtx.drawImage(aiImage, x, y, width, height);
      if (provider === 'stability') {
        drawLocalGuideOverlayOnCanvas(resultCtx, el.resultCanvas, product);
      }
      state.resultReady = true;
      el.resultSection.classList.remove('hidden');
      el.downloadBtn.disabled = false;
      const providerLabel = data.providerLabel || PROVIDER_INFO[provider]?.label || provider;
      el.generateStatus.textContent = provider === 'stability'
        ? `AI refinement generated via ${providerLabel}; database product references were packed with the request and the local product guide was locked back onto the result.`
        : `AI refinement generated successfully via ${providerLabel} using the reference-grounded bundle.`;
    };
    aiImage.src = data.image;
  } catch (error) {
    console.error(error);
    el.generateStatus.textContent = `AI generation failed: ${error.message}. Local preview remains available.`;
  } finally {
    el.generateAiBtn.disabled = false;
  }
}

async function generateConcept() {
  if (!state.siteImage) {
    alert('Upload a site image first.');
    return;
  }
  const product = getSelectedProduct();
  if (!product) {
    alert('Select a product first.');
    return;
  }
  await ensureSelectedReferenceReady(product);
  const rectOriginal = drawBaseImage(originalCtx, el.originalCanvas, state.siteImage);
  const rectResult = drawBaseImage(resultCtx, el.resultCanvas, state.siteImage);
  if (!rectOriginal || !rectResult) return;

  if (state.selectedCategory === 'fence') {
    if (state.pathPoints.length < 2) autoPath(false);
    const path = state.pathPoints.length >= 2 ? getFencePathForCanvas(el.resultCanvas) : [
      { x: rectResult.x + rectResult.width * 0.04, y: rectResult.y + rectResult.height * 0.86 },
      { x: rectResult.x + rectResult.width * 0.50, y: rectResult.y + rectResult.height * 0.79 },
      { x: rectResult.x + rectResult.width * 0.96, y: rectResult.y + rectResult.height * 0.73 },
    ];
    const data = getPerspectiveData(rectResult);
    drawFenceGuidedOverlay(resultCtx, path, product, colorNameToHex(el.colorSelect.value), data);
    drawLabel(resultCtx, rectResult, product.name);
  } else {
    syncFurnitureDots();
    getFurniturePositionsForCanvas(el.resultCanvas).forEach(point => {
      const box = getFurnitureBox(point, rectResult, Number(el.furnitureScale.value));
      drawFurnitureImageAt(resultCtx, product, box, true);
    });
    drawLabel(resultCtx, rectResult, `${product.name} · ${el.setsCountSelect.value} set(s)`);
  }

  state.resultReady = true;
  el.resultSection.classList.remove('hidden');
  el.downloadBtn.disabled = false;
  el.generateStatus.textContent = 'Local preview generated. This controlled scene can now be used as the basis for an AI API workflow.';
}

function downloadResult() {
  if (!state.resultReady) return;
  const a = document.createElement('a');
  a.download = `a1-visualization-studio-v0-5-8-${new Date().toISOString().slice(0,19).replace(/[:T]/g, '-')}.png`;
  a.href = el.resultCanvas.toDataURL('image/png');
  a.click();
}

function readFileAsDataUrl(file) {
  return new Promise((resolve) => {
    if (!file) return resolve('');
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

async function handleAdminSave(event) {
  event.preventDefault();
  const existingId = el.editingProductId.value;
  const existing = state.library.find(item => item.id === existingId);
  const category = el.adminCategory.value;
  const product = {
    id: existingId || `product-${Date.now()}`,
    category,
    type: el.adminType.value.trim(),
    name: el.adminName.value.trim(),
    colors: splitOptions(el.adminColors.value, category === 'fence' ? ['A-1 Green'] : ['Olive Green']),
    heights: category === 'fence' ? splitOptions(el.adminHeights.value, ['2.4 m']) : [],
    ctc: category === 'fence' ? splitOptions(el.adminCtc.value, ['2.5 m']) : [],
    topOptions: category === 'fence' ? splitOptions(el.adminTopOptions.value, ['None']) : [],
    referenceImage: await readFileAsDataUrl(el.adminReferenceImage.files[0]) || existing?.referenceImage || '',
    sideImage: await readFileAsDataUrl(el.adminSideImage.files[0]) || existing?.sideImage || '',
    topImage: await readFileAsDataUrl(el.adminTopImage.files[0]) || existing?.topImage || '',
    perspectiveImage: await readFileAsDataUrl(el.adminPerspectiveImage.files[0]) || existing?.perspectiveImage || '',
    siteImage: await readFileAsDataUrl(el.adminSiteImage.files[0]) || existing?.siteImage || '',
    notes: el.adminNotes.value.trim(),
  };
  if (!product.type || !product.name) return;
  const index = state.library.findIndex(item => item.id === product.id);
  if (index >= 0) state.library[index] = product;
  else state.library.unshift(product);
  saveLibrary();
  clearAdminForm();
  renderAdminList();
  populateSelectors();
  updatePrompt();
}

function clearAdminForm() {
  el.editingProductId.value = '';
  el.libraryForm.reset();
  el.adminCategory.value = 'fence';
  updateAdminFormFields();
}

function updateAdminFormFields() {
  const isFence = el.adminCategory.value === 'fence';
  document.querySelectorAll('.fence-only-admin').forEach(item => item.classList.toggle('hidden', !isFence));
}

function renderAdminList() {
  const products = state.library.filter(product => state.activeAdminFilter === 'all' || product.category === state.activeAdminFilter);
  if (!products.length) {
    el.adminLibraryList.innerHTML = '<div class="reference-empty">No products in this filter.</div>';
    return;
  }
  el.adminLibraryList.innerHTML = products.map(product => {
    const img = getPreviewImage(product);
    const views = ['referenceImage','sideImage','topImage','perspectiveImage','siteImage'].filter(key => product[key]).length;
    return `
      <article class="library-item">
        <div class="library-item-img">${img ? `<img src="${img}" alt="${escapeHtml(product.name)}" />` : 'No image'}</div>
        <div>
          <h4>${escapeHtml(product.name)}</h4>
          <div class="library-item-meta">
            <strong>${escapeHtml(product.category)}</strong> · ${escapeHtml(product.type)}<br/>
            Colors: ${escapeHtml((product.colors || []).join(', ') || '-')}<br/>
            ${product.category === 'fence' ? `Heights: ${escapeHtml((product.heights || []).join(', ') || '-')}<br/>CTC: ${escapeHtml((product.ctc || []).join(', ') || '-')}<br/>Top options: ${escapeHtml((product.topOptions || []).join(', ') || '-')}` : `Furniture sets controlled at customer side.<br/>`}<br/>
            Available reference views: ${views}
          </div>
          <div class="library-actions">
            <button type="button" data-action="edit" data-id="${escapeHtml(product.id)}">Edit</button>
            <button type="button" class="delete" data-action="delete" data-id="${escapeHtml(product.id)}">Delete</button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function editProduct(id) {
  const product = state.library.find(item => item.id === id);
  if (!product) return;
  el.editingProductId.value = product.id;
  el.adminCategory.value = product.category;
  el.adminType.value = product.type;
  el.adminName.value = product.name;
  el.adminColors.value = (product.colors || []).join(', ');
  el.adminHeights.value = (product.heights || []).join(', ');
  el.adminCtc.value = (product.ctc || []).join(', ');
  el.adminTopOptions.value = (product.topOptions || []).join(', ');
  el.adminNotes.value = product.notes || '';
  updateAdminFormFields();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteProduct(id) {
  const product = state.library.find(item => item.id === id);
  if (!product) return;
  if (!confirm(`Delete ${product.name}?`)) return;
  state.library = state.library.filter(item => item.id !== id);
  if (state.selectedProductId === id) state.selectedProductId = '';
  saveLibrary();
  renderAdminList();
  populateSelectors();
  updatePrompt();
}

function exportLibrary() {
  const blob = new Blob([JSON.stringify(state.library, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `a1-visualization-library-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importLibrary(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!Array.isArray(data)) throw new Error('JSON must be an array.');
      state.library = data;
      saveLibrary();
      renderAdminList();
      populateSelectors();
      updatePrompt();
    } catch (error) {
      alert('Could not import the library JSON.');
      console.error(error);
    }
  };
  reader.readAsText(file);
}

function resetLibrary() {
  if (!confirm('Reset the admin library to the seed products?')) return;
  state.library = cloneSeed();
  saveLibrary();
  renderAdminList();
  populateSelectors();
  updatePrompt();
}

function initEvents() {
  setupDropzone();
  initDesignerInteractions();

  el.customerModeBtn.addEventListener('click', () => setView('customer'));
  el.adminModeBtn.addEventListener('click', () => setView('admin'));
  el.familyFenceBtn.addEventListener('click', () => setCategory('fence'));
  el.familyFurnitureBtn.addEventListener('click', () => setCategory('furniture'));

  el.typeSelect.addEventListener('change', () => {
    state.selectedType = el.typeSelect.value;
    state.selectedProductId = '';
    populateSelectors();
    updatePrompt();
  });
  el.productSelect.addEventListener('change', () => {
    state.selectedProductId = el.productSelect.value;
    updateOptionsForSelectedProduct();
    updatePrompt();
  });
  [el.colorSelect, el.heightSelect, el.ctcSelect, el.topOptionSelect].forEach(input => input.addEventListener('change', () => {
    updatePrompt();
    if (!el.designerModal.classList.contains('hidden')) drawDesignerCanvas();
    if (state.resultReady && state.siteImage) generateConcept(false);
  }));
  el.setsCountSelect.addEventListener('change', () => { syncFurnitureDots(true); updatePrompt(); updateManualStatus(); });
  el.furnitureScale.addEventListener('input', () => {
    el.modalFurnitureScale.value = el.furnitureScale.value;
    updateSliderLabels();
    updatePrompt();
  });
  el.modalFurnitureScale.addEventListener('input', () => {
    el.furnitureScale.value = el.modalFurnitureScale.value;
    updateSliderLabels();
    drawDesignerCanvas();
    updatePrompt();
  });
  el.customPrompt.addEventListener('input', updatePrompt);

  el.promptPresets.addEventListener('click', (event) => {
    const button = event.target.closest('.preset-card');
    if (!button) return;
    state.selectedPresetId = button.dataset.presetId;
    updatePromptPresets();
    updatePrompt();
  });

  el.openFenceDesignerBtn.addEventListener('click', () => openDesigner('fence'));
  el.openFurnitureDesignerBtn.addEventListener('click', () => openDesigner('furniture'));
  el.closeDesignerBtn.addEventListener('click', closeDesigner);
  el.closeDesignerFooterBtn.addEventListener('click', closeDesigner);
  el.saveDesignerBtn.addEventListener('click', saveDesignerPlacement);
  el.designerModal.addEventListener('click', (event) => {
    if (event.target.dataset.closeModal === 'true') closeDesigner();
  });

  el.autoPathBtn.addEventListener('click', () => { autoPath(true); updateManualStatus(); });
  el.drawPathBtn.addEventListener('click', () => {
    state.fenceMode = 'draw';
    el.drawPathBtn.classList.add('active');
    el.editPathBtn.classList.remove('active');
  });
  el.editPathBtn.addEventListener('click', () => {
    state.fenceMode = 'edit';
    el.editPathBtn.classList.add('active');
    el.drawPathBtn.classList.remove('active');
  });
  el.clearPathBtn.addEventListener('click', () => { state.pathPoints = []; drawDesignerCanvas(); updateManualStatus(); });
  [el.perspectiveMode, el.vpRight, el.vpLeft, el.horizon, el.fenceVisualHeight, el.showGuides, el.addShadow].forEach(input => {
    input.addEventListener('input', () => { updateSliderLabels(); drawDesignerCanvas(); });
    input.addEventListener('change', () => { updateSliderLabels(); drawDesignerCanvas(); });
  });
  el.resetFurnitureDotsBtn.addEventListener('click', () => { syncFurnitureDots(true); drawDesignerCanvas(); updateManualStatus(); });

  el.generateBtn.addEventListener('click', generateConcept);
  el.generateAiBtn.addEventListener('click', generateAiRefinement);
  el.providerSelect.addEventListener('change', updateProviderUI);
  el.testApiBtn.addEventListener('click', testApiConnection);
  el.refreshProviderBtn.addEventListener('click', () => refreshProviderHealth(true));
  el.downloadBtn.addEventListener('click', downloadResult);
  el.sideBySideBtn.addEventListener('click', () => {
    el.resultGrid.classList.remove('result-only');
    el.sideBySideBtn.classList.add('active');
    el.resultOnlyBtn.classList.remove('active');
  });
  el.resultOnlyBtn.addEventListener('click', () => {
    el.resultGrid.classList.add('result-only');
    el.resultOnlyBtn.classList.add('active');
    el.sideBySideBtn.classList.remove('active');
  });

  el.libraryForm.addEventListener('submit', handleAdminSave);
  el.newProductBtn.addEventListener('click', clearAdminForm);
  el.adminCategory.addEventListener('change', updateAdminFormFields);
  document.querySelectorAll('.library-filter').forEach(button => {
    button.addEventListener('click', () => {
      state.activeAdminFilter = button.dataset.filter;
      document.querySelectorAll('.library-filter').forEach(item => item.classList.toggle('active', item === button));
      renderAdminList();
    });
  });
  el.adminLibraryList.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    if (button.dataset.action === 'edit') editProduct(button.dataset.id);
    if (button.dataset.action === 'delete') deleteProduct(button.dataset.id);
  });
  el.exportLibraryBtn.addEventListener('click', exportLibrary);
  el.importLibraryInput.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (file) importLibrary(file);
    el.importLibraryInput.value = '';
  });
  el.resetLibraryBtn.addEventListener('click', resetLibrary);
}

function init() {
  state.library = loadLibrary();
  initEvents();
  updateSliderLabels();
  updateAdminFormFields();
  updatePromptPresets();
  setCategory('fence');
  renderAdminList();
  updatePrompt();
  updateProviderUI();
  refreshProviderHealth(false);
}

init();
