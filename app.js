// Tinynord — vanilla JS implementation of the Claude Design prototype.
// Single-file SPA: home, category, about, retailers + product modal, EN/ET toggle.

// ─── Copy ─────────────────────────────────────────────────────────────────
const COPY = {
  en: {
    nav: { catalogue: 'Catalogue', about: 'About', retailers: 'Retailers', contact: 'Contact' },
    slogan: 'a world of wonders',
    hero: {
      eyebrow: 'From the heart of Estonia',
      title: ['Where every', 'tiny detail', 'matters.'],
      lede: 'Tinynord, a brand originating from the heart of Estonia, was created with the aim of developing and offering baby products that support a child’s early development and ensure safety and comfort for both children and their parents.',
      lede2: 'Our products are characterised by timeless Scandinavian design and a thoughtful selection of materials — each piece is made of high-quality and durable materials to ensure reliability and long-term use.',
      cta: 'Browse the catalogue',
    },
    catalogue: {
      eyebrow: 'The catalogue',
      title: 'Eight categories,\nbuilt for everyday.',
      sub: 'A small, considered range. Designed once, made to last.',
    },
    values: {
      eyebrow: 'Our values',
      title: 'Why families\nchoose Tinynord.',
      items: [
        { t: 'Trustful', b: 'We believe trust is earned with every product we create. Families choose Tinynord because they know they can count on us for safe, reliable and thoughtfully made baby essentials.' },
        { t: 'Caring',   b: 'Every product is crafted with heartfelt dedication to support babies during the most important early years. We design every product with real family needs in mind.' },
        { t: 'Joyful',   b: 'We believe childhood should be filled with wonders. That’s why we create playful, engaging products that spark imagination and delight.' },
        { t: 'Timeless', b: 'The brand embraces simple, elegant and practical designs that blend seamlessly into any home. This aesthetic ensures that products remain relevant over time.' },
        { t: 'Safe',     b: 'Every product we create, from onesies to strollers, is designed and tested to meet the highest safety standards. Because nothing matters more than your baby’s well-being.' },
        { t: 'Cherish',  b: 'We’re helping create moments – first steps, bedtime giggles, family outings, our designs are made to be part of your baby’s most treasured memories.' },
      ],
    },
    about: {
      title: ['Where every', 'tiny detail', 'matters.'],
      body: 'Born in the heart of Estonia, Tinynord makes premium baby essentials that support a child’s earliest years with care, comfort and style — inspired by timeless Scandinavian design.',
      body2: 'Made from the finest materials, every piece is built to be cherished, passed down and loved again. Quality that never has to be a luxury, trusted in nurseries across the Baltics and Scandinavia.',
      body3: 'From strollers and cribs to the softest clothes, every detail is considered with real families in mind — safe, durable and beautifully simple, one baby at a time.',
      full: [
        'Once upon a time in the heart of Estonia, a brand was born to cater to the needs of the tiniest members of our families. This brand, Tinynord, was created with a heartfelt mission: to provide premium baby essentials that support a child’s earliest years with care, comfort and style.',
        'Drawing inspiration from the timeless elegance of Scandinavian design, Tinynord crafts each product with the finest materials, ensuring durability, sustainability and beauty. From strollers, cozy cribs to the softest clothes, every item is made to be cherished, passed down and loved again.',
        'At Tinynord, we believe that every baby deserves the best start in life and that quality should never be a luxury. That’s why we remain committed to keeping our products affordable, without compromising on safety, design or function. Our reputation for excellence has grown across the Baltics and Scandinavia, making Tinynord a trusted name in nurseries and homes alike.',
        'We envision a world where Tinynord represents more than just baby products – it stands for trust, simplicity and lasting value. With a deep respect for nature and family, we continue to lead the way in sustainable design for modern families. Tinynord is more than a brand – it’s a promise of comfort, quality and care, one baby at a time.',
      ],
      voice: ['Modern & Relatable', 'Clear & Accessible', 'Joyful & Uplifting'],
    },
    retailers: {
      eyebrow: 'Where to buy',
      title: 'Stocked by considered\nretailers across Europe.',
      body: 'Tinynord is sold through a small network of children’s specialists who share our values. Visit them in store or online.',
      empty: 'Becoming a retailer? ',
      emptyLink: 'Get in touch.',
    },
    footer: {
      tagline: 'a world of wonders',
      addr: 'Fliis Trade OÜ — Tallinn, Estonia',
      cols: { catalogue: 'Catalogue', company: 'Company', contact: 'Contact' },
      legal: '© 2026 Fliis Trade OÜ. All rights reserved.',
    },
    modal: {
      materials: 'Materials',
      dimensions: 'Dimensions',
      ages: 'Suitable from',
      certifications: 'Certifications',
    },
    pieces: (n) => n === 1 ? 'piece' : 'pieces',
    allCats: 'All categories',
    category: 'Category',
    aboutShort: 'About',
    retailersShort: 'Retailers',
    sustainability: 'Sustainability',
    spotReserved: 'Spot reserved',
  },
  et: {
    nav: { catalogue: 'Tooted', about: 'Lugu', retailers: 'Müüjad', contact: 'Kontakt' },
    slogan: 'imede maailm',
    hero: {
      eyebrow: 'Eesti südamest',
      title: ['Iga väike', 'detail', 'loeb.'],
      lede: 'Tinynord on Eesti südamest pärit bränd, mis loodi eesmärgiga arendada ja pakkuda beebitooteid, mis toetavad lapse varast arengut ning tagavad turvalisuse ja mugavuse nii lastele kui vanematele.',
      lede2: 'Tinynordi tooteid iseloomustab ajatu skandinaavia disain ja läbimõeldud materjalivalik — iga toode on valmistatud kvaliteetsetest ja vastupidavatest materjalidest.',
      cta: 'Vaata kataloogi',
    },
    catalogue: {
      eyebrow: 'Kataloog',
      title: 'Kaheksa kategooriat,\niga päev kasutamiseks.',
      sub: 'Väike, läbimõeldud valik. Disainitud korra, tehtud kestma.',
    },
    values: {
      eyebrow: 'Meie väärtused',
      title: 'Miks pered valivad\nTinynordi.',
      items: [
        { t: 'Usaldus',   b: 'Usume, et usaldus tuleb välja teenida iga tootega.' },
        { t: 'Hoolitsus', b: 'Iga toode on loodud südamliku pühendumusega.' },
        { t: 'Rõõm', b: 'Usume, et lapsepõlv peaks olema täis imesid.' },
        { t: 'Ajatu',     b: 'Lihtne, elegantne ja praktiline disain.' },
        { t: 'Turvaline', b: 'Iga toode on disainitud kõrgeimate ohutusstandardite järgi.' },
        { t: 'Hellitus',  b: 'Aitame luua hetki, mis jäävad mälestustesse.' },
      ],
    },
    about: {
      title: ['Iga väike', 'detail', 'loeb.'],
      body: 'Eesti südamest pärit Tinynord valmistab esmaklassilisi beebitooteid, mis toetavad lapse esimesi aastaid hoole, mugavuse ja stiiliga – inspireerituna ajatust Skandinaavia disainist.',
      body2: 'Parimatest materjalidest valmistatud, iga ese on loodud hoidmiseks ja edasi andmiseks. Kvaliteet, mis ei pea olema luksus – usaldatud lastetubades üle Baltikumi ja Skandinaavia.',
      body3: 'Vankritest ja võrevooditest pehmeimate rõivasteni – iga detail on läbi mõeldud päris perede jaoks: turvaline, vastupidav ja kaunilt lihtne, üks laps korraga.',
      full: [
        'Kunagi ammu Eesti südames sündis bränd, mis hoolitseb meie perede kõige väiksemate liikmete eest. Tinynord loodi südamliku missiooniga: pakkuda esmaklassilisi beebitooteid, mis toetavad lapse esimesi aastaid hoole, mugavuse ja stiiliga.',
        'Skandinaavia disaini ajatust elegantsist inspireerituna valmistab Tinynord iga toote parimatest materjalidest, tagades vastupidavuse, jätkusuutlikkuse ja ilu. Vankritest hubaste võrevoodite ja pehmeimate rõivasteni – iga ese on loodud hoidmiseks ja edasi andmiseks.',
        'Usume, et iga laps väärib parimat algust ja et kvaliteet ei tohiks olla luksus. Seepärast hoiame oma tooted taskukohased, tegemata järeleandmisi ohutuses, disainis ega funktsioonis. Meie maine on kasvanud üle Baltikumi ja Skandinaavia.',
        'Näeme maailma, kus Tinynord tähendab enamat kui beebitooted – see tähistab usaldust, lihtsust ja püsivat väärtust. Sügava austusega looduse ja pere vastu juhime teed jätkusuutliku disaini suunas. Tinynord on enam kui bränd – see on lubadus mugavusest, kvaliteedist ja hoolest.',
      ],
      voice: ['Modernne & lähedane', 'Selge & ligipääsetav', 'Rõõmus & innustav'],
    },
    retailers: {
      eyebrow: 'Kust osta',
      title: 'Valitud poodides\nüle Euroopa.',
      body: 'Tinynordi müüakse väikese võrgustiku kaudu, kes jagavad meie väärtusi.',
      empty: 'Tahad müüjaks saada? ',
      emptyLink: 'Võta ühendust.',
    },
    footer: {
      tagline: 'imede maailm',
      addr: 'Fliis Trade OÜ — Tallinn, Eesti',
      cols: { catalogue: 'Tooted', company: 'Ettevõte', contact: 'Kontakt' },
      legal: '© 2026 Fliis Trade OÜ. Kõik õigused kaitstud.',
    },
    modal: {
      materials: 'Materjalid',
      dimensions: 'Mõõdud',
      ages: 'Sobib alates',
      certifications: 'Sertifikaadid',
    },
    pieces: () => 'toodet',
    allCats: 'Kõik kategooriad',
    category: 'Kategooria',
    aboutShort: 'Lugu',
    retailersShort: 'Müüjad',
    sustainability: 'Jätkusuutlikkus',
    spotReserved: 'Koht reserveeritud',
  },
};

const _CATS_BASE = [
  { id: 'strollers',    en: 'Strollers',            et: 'Lapsevankrid' },
  { id: 'stroller-acc', en: 'Stroller Accessories', et: 'Vankri tarvikud' },
  { id: 'bedroom',      en: 'Bedroom',              et: 'Magamistuba' },
  { id: 'bathroom',     en: 'Bathroom',             et: 'Vannituba' },
  { id: 'eating',       en: 'Eating Goods',         et: 'Söögivahendid' },
  { id: 'safety',       en: 'Safety Products',      et: 'Turvatooted' },
  { id: 'clothing',     en: 'Clothing',             et: 'Rõivad' },
  { id: 'car',          en: 'Car Accessories',      et: 'Auto tarvikud' },
];

const TND = window.TINYNORD_DATA || { products: [], counts: {} };
const CATEGORIES = _CATS_BASE.map(c => ({ ...c, count: TND.counts[c.id] || 0 }));
const PRODUCTS = TND.products;
function productsInCategory(catId) { return PRODUCTS.filter(p => p.category === catId); }

// ─── Cloudinary ───────────────────────────────────────────────────────────
// Set CLOUD_NAME to your Cloudinary cloud name (dashboard → Account Details).
// PATH_PREFIX is prepended to image paths from data.js — set it to the folder
// you uploaded into on Cloudinary (e.g. 'tinynord/'), or '' if you uploaded
// preserving the original folder structure at the cloud root.
const CLOUDINARY = {
  CLOUD_NAME: 'dqbtlzcft',
  PATH_PREFIX: '',
  DEFAULTS: 'f_auto,q_auto',
};
function isLocalHost() {
  if (typeof window === 'undefined' || !window.location) return false;
  const h = window.location.hostname;
  return h === 'localhost' || h === '127.0.0.1' || h === '0.0.0.0' || h.endsWith('.local');
}
// Build a Cloudinary URL given a public_id (no path-prefixing, since the
// manifest stores fully qualified IDs as Cloudinary returned them).
function cldUrlFromPublicId(publicId, transforms = '') {
  if (!publicId) return '';
  const t = [CLOUDINARY.DEFAULTS, transforms].filter(Boolean).join(',');
  // Path-based public_ids keep `/` as folder separators — encode each segment
  // individually so the slashes survive in the delivery URL.
  const encoded = publicId.split('/').map(encodeURIComponent).join('/');
  return `https://res.cloudinary.com/${CLOUDINARY.CLOUD_NAME}/image/upload/${t}/${encoded}.jpg`;
}
// `pathOrEntry` is either the URL-encoded local path string (back-compat)
// or a {url, cloudId} pair so the caller can pass both at once.
function cldUrl(pathOrEntry, transforms = '') {
  const entry = (pathOrEntry && typeof pathOrEntry === 'object')
    ? pathOrEntry
    : { url: pathOrEntry, cloudId: '' };
  const path = entry.url || '';
  const cloudId = entry.cloudId || '';
  if (!path && !cloudId) return '';
  if (/^https?:\/\//i.test(path)) return path;
  // On localhost serve directly from the Python static server.
  if (isLocalHost() || !CLOUDINARY.CLOUD_NAME) {
    return '/' + path.replace(/^\/+/, '');
  }
  // Production: prefer Cloudinary public_id from the manifest.
  if (cloudId) return cldUrlFromPublicId(cloudId, transforms);
  // Manifest miss → fall through to constructing a URL from the path.
  const decoded = decodeURIComponent(path).replace(/^\/+/, '');
  const publicId = encodeURI(CLOUDINARY.PATH_PREFIX + decoded).replace(/#/g, '%23').replace(/\?/g, '%3F');
  const t = [CLOUDINARY.DEFAULTS, transforms].filter(Boolean).join(',');
  return `https://res.cloudinary.com/${CLOUDINARY.CLOUD_NAME}/image/upload/${t}/${publicId}`;
}
// Resolve image #i of a product to a {url, cloudId} pair the caller can pass on.
function imageEntry(product, i) {
  const url = (product.images && product.images[i]) || '';
  const cloudId = (product.cloudIds && product.cloudIds[i]) || '';
  return { url, cloudId };
}
// Resolve a static site asset (hero, category tiles). Serves the local file on
// localhost, otherwise the Cloudinary public_id.
function assetUrl(localPath, cloudId, transforms = 'w_1600') {
  if (isLocalHost() || !CLOUDINARY.CLOUD_NAME) return localPath;
  return cldUrlFromPublicId(cloudId, transforms);
}


const RETAILERS = [
  { country: 'Estonia', flag: '🇪🇪', items: [
    { name: 'Nordbaby', url: 'https://nordbaby.com' },
  ] },
  { country: 'Finland', flag: '🇫🇮', items: [
    { name: 'AT-Lastenturva', url: 'https://www.lastenturva.fi' },
    { name: 'OZ Baby', url: 'https://www.ozbaby.fi' },
    { name: 'Wauva', url: 'https://www.wauva.com' },
    { name: 'Verkkokauppa', url: 'https://www.verkkokauppa.com' },
    { name: 'Vaunula', url: 'https://www.vaunula.fi' },
    { name: 'Vaunupuoti', url: 'https://vaunupuoti.fi' },
    { name: 'Muksumassi', url: 'https://muksumassi.fi' },
  ] },
  { country: 'Sweden', flag: '🇸🇪', items: [
    { name: 'BabyV', url: 'https://www.babyv.se' },
    { name: 'Jollyroom', url: 'https://www.jollyroom.se' },
    { name: 'Babyringen', url: 'https://www.babyringen.se' },
    { name: 'Babyproffsen', url: 'https://babyproffsen.se' },
  ] },
  { country: 'Denmark', flag: '🇩🇰', items: [
    { name: 'Luksusbaby', url: 'https://luksusbaby.dk' },
  ] },
  { country: 'Norway', flag: '🇳🇴', items: [
    { name: 'Barnevognhuset', url: 'https://barnevognhuset.no' },
    { name: 'Babyland Sandviken', url: 'https://www.babyland.no' },
    { name: 'Siljes Barn & Utstyr', url: 'https://siljes.no' },
    { name: 'Babymagasinet', url: 'https://babymagasinetas.no' },
    { name: 'Barnevognservice', url: 'https://barnevognservice.no' },
    { name: 'Tøff og Liten' },
    { name: 'Ringo Askim', url: 'https://www.ringo.no' },
    { name: 'S. Endeve Sport', url: 'https://endeve.no' },
  ] },
];

const THEME = { lime: '#7A8E81', beige: '#E3D8D1', lightgrey: '#EFEFEF' };
// Our Tiny Friends Textile Collection – Season 2026 (product catalogue, pages 8-9),
// plus a pastel powder blue pulled from the stroller photography on pages 4-5.
const PALETTE = ['#F6F8F9', '#DEDDD1', '#D7C8CE', '#BAD4C9', '#7A8E81', '#B3DBE9'];
function paletteInk(hex) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) < 140 ? '#F7F1E5' : '#231F20';
}

// ─── Brand graphics ───────────────────────────────────────────────────────
const logoMark = (size = 28, color = 'currentColor') =>
  `<svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" aria-hidden="true">
     <path d="M 32 4 C 16.5 4 4 16.5 4 32 C 4 47.5 16.5 60 32 60 L 32 44 C 25 44 19 38.5 19 32 C 19 25 25 19 32 19 Z" fill="${color}"/>
     <path d="M 32 60 C 47.5 60 60 47.5 60 32 C 60 16.5 47.5 4 32 4 L 32 19 C 39 19 45 25 45 32 C 45 38.5 39 44 32 44 Z" fill="${color}"/>
   </svg>`;

const logoWordmark = (height = 32, color = 'currentColor') =>
  `<span style="display:inline-flex;align-items:center;gap:${height * 0.22}px;color:${color}">
     ${logoMark(Math.round(height * 0.95), color)}
     <span style="font-family:'Cera Pro',system-ui,sans-serif;font-weight:700;font-size:${height * 0.78}px;letter-spacing:-0.025em;line-height:1;color:${color}">tinynord</span>
   </span>`;

// Small footer contact icons (inherit currentColor → --ink).
const iconMail = () =>
  `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`;
const iconPhone = () =>
  `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 3h3l1.5 5-2 1.5a12 12 0 0 0 5 5l1.5-2 5 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5a2 2 0 0 1 2-2z"/></svg>`;
const iconInstagram = () =>
  `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`;

function dottedCircle({ size = 120, color = '#7A8E81', dotSize = 4, style = '' } = {}) {
  const cx = 50, cy = 50, r = 44;
  let dots = '';
  for (let y = 0; y <= 100; y += 6) {
    for (let x = 0; x <= 100; x += 6) {
      const dx = x - cx, dy = y - cy;
      if (Math.hypot(dx, dy) > r) continue;
      dots += `<circle cx="${x}" cy="${y}" r="${dotSize / 4}" fill="${color}"/>`;
    }
  }
  return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" aria-hidden="true" style="${style}">${dots}</svg>`;
}

function wavyHills({ color = '#7A8E81', opacity = 1, style = '' } = {}) {
  return `<svg viewBox="0 0 1440 200" preserveAspectRatio="none" style="width:100%;height:100%;display:block;${style}" aria-hidden="true">
    <g fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}">
      <path d="M 0 100 C 200 60 400 130 600 100 S 1000 70 1240 110 L 1440 90"/>
      <path d="M 0 130 C 240 90 460 160 720 130 S 1100 110 1440 140" opacity="0.7"/>
      <path d="M 0 160 C 300 130 540 190 820 165 S 1200 145 1440 170" opacity="0.5"/>
      <path d="M 0 80  C 220 50 480 105 780 78 S 1180 60 1440 80"  opacity="0.6"/>
      <circle cx="930" cy="100" r="4" fill="${color}" stroke="none" opacity="0.7"/>
      <circle cx="970" cy="118" r="3" fill="${color}" stroke="none" opacity="0.5"/>
    </g>
  </svg>`;
}

const slogan = (text, color = 'currentColor', size = 16) => {
  const dot = `<span style="width:${size * 0.25}px;height:${size * 0.25}px;border-radius:50%;background:${color};display:inline-block"></span>`;
  return `<span style="font-family:'Cera Pro',system-ui,sans-serif;font-style:italic;font-weight:400;font-size:${size}px;letter-spacing:0.02em;color:${color};display:inline-flex;align-items:center;gap:${size * 0.5}px">${dot}${escapeHtml(text)}${dot}</span>`;
};

// ─── Product images ───────────────────────────────────────────────────────
function productImage(product, idx, className = '', loading = 'lazy') {
  const fallback = (product.images && product.images.length) ? imageEntry(product, idx in (product.images || {}) ? idx : 0) : null;
  if (!fallback || !fallback.url) return `<div class="${className} tn-img--missing"></div>`;
  const src = cldUrl(fallback, 'w_800');
  const alt = product.name || '';
  return `<img src="${src}" alt="${escapeHtml(alt)}" class="${className}" loading="${loading}" />`;
}


// ─── State ────────────────────────────────────────────────────────────────
const state = {
  route: { page: 'home' },
  lang: 'en',
  activeProduct: null,
  modalImgIdx: 0,
};

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function setRoute(r) {
  state.route = r;
  renderApp();
  requestAnimationFrame(() => {
    if (r.anchor) {
      const el = document.getElementById(r.anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  });
  if (r.page === 'category' && r.cat) {
    preloadCategoryImages(r.cat);
  } else {
    cancelPreload();
  }
}

// Sequentially preload every gallery image for a category, so the product
// modal's images are already in browser cache by the time the user opens one.
let _preloadCtrl = null;
function cancelPreload() {
  if (_preloadCtrl) _preloadCtrl.cancelled = true;
  _preloadCtrl = null;
}
function preloadCategoryImages(catId) {
  cancelPreload();
  const ctrl = { cancelled: false };
  _preloadCtrl = ctrl;

  const queue = [];
  for (const p of productsInCategory(catId)) {
    if (!p.images) continue;
    for (let i = 0; i < p.images.length; i++) {
      queue.push(cldUrl(imageEntry(p, i), 'w_1400'));
    }
  }

  let i = 0;
  const step = () => {
    if (ctrl.cancelled || i >= queue.length) return;
    const img = new Image();
    const done = () => { if (!ctrl.cancelled) { i++; step(); } };
    img.onload = done;
    img.onerror = done;
    img.src = queue[i];
  };
  step();
}

function setLang(lang) {
  state.lang = lang;
  renderApp();
}

// iOS Safari ignores body{overflow:hidden} once a tap happens, so freeze the
// body in place with position:fixed and restore the scroll offset on close.
let _savedScrollY = 0;
function lockBodyScroll() {
  _savedScrollY = window.scrollY || window.pageYOffset || 0;
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${_savedScrollY}px`;
  document.body.style.width = '100%';
}
function unlockBodyScroll() {
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, _savedScrollY);
}

function openProduct(id) {
  state.activeProduct = PRODUCTS.find(p => p.code === id) || null;
  state.modalImgIdx = 0;
  renderModal();
  if (state.activeProduct) lockBodyScroll();
  else unlockBodyScroll();
}

function closeProduct() {
  state.activeProduct = null;
  renderModal();
  unlockBodyScroll();
}

// Swap only the main modal image and active-thumb class — no full re-render.
function setModalImage(idx) {
  const p = state.activeProduct;
  if (!p || !p.images || !p.images[idx]) return;
  state.modalImgIdx = idx;
  const mainImg = document.querySelector('.tn-modal-main img');
  if (mainImg) {
    mainImg.src = cldUrl(imageEntry(p, idx), 'w_1400');
  }
  document.querySelectorAll('.tn-modal-thumbs .tn-thumb').forEach((btn, i) => {
    btn.classList.toggle('is-active', i === idx);
  });
}

// ─── Section renderers ────────────────────────────────────────────────────
function renderHeader() {
  const t = COPY[state.lang];
  const items = [
    { id: 'home',      label: t.nav.catalogue },
    { id: 'about',     label: t.nav.about },
    { id: 'retailers', label: t.nav.retailers },
  ];
  const isActive = (id) => state.route.page === id || (id === 'home' && state.route.page === 'category');
  return `
    <header class="tn-header">
      <a href="#" class="tn-logo" data-action="route" data-page="home" aria-label="Tinynord — home">
        <img src="assets/logo-tinynord.png?v=2" alt="Tinynord" class="tn-logo-img" />
      </a>
      <nav class="tn-nav">
        ${items.map(it => `<button class="tn-nav-link${isActive(it.id) ? ' is-active' : ''}" data-action="route" data-page="${it.id}">${escapeHtml(it.label)}</button>`).join('')}
      </nav>
      <div class="tn-lang"></div>
      <button class="tn-burger" data-action="burger" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <div class="tn-mobile-menu">
        <nav class="tn-mobile-nav">
          ${items.map(it => `<button class="tn-mobile-link${isActive(it.id) ? ' is-active' : ''}" data-action="route" data-page="${it.id}">${escapeHtml(it.label)}</button>`).join('')}
        </nav>
      </div>
    </header>`;
}

function toggleMobileMenu() {
  const header = document.querySelector('.tn-header');
  if (!header) return;
  const open = !header.classList.contains('is-open');
  header.classList.toggle('is-open', open);
  const burger = header.querySelector('.tn-burger');
  if (burger) burger.setAttribute('aria-expanded', String(open));
}
function closeMobileMenu() {
  const header = document.querySelector('.tn-header');
  if (!header) return;
  header.classList.remove('is-open');
  const burger = header.querySelector('.tn-burger');
  if (burger) burger.setAttribute('aria-expanded', 'false');
}

function renderHero() {
  const t = COPY[state.lang].hero;
  const titleHTML = t.title.map((l, i) => {
    const isLast = i === t.title.length - 1;
    const piece = isLast ? `<em>${escapeHtml(l)}</em>` : escapeHtml(l);
    return `<span>${piece}${!isLast ? '<br/>' : ''}</span>`;
  }).join('');
  return `
    <section class="tn-hero">
      <div class="tn-hero-text">
        <div class="tn-hero-eyebrow">${escapeHtml(t.eyebrow)}</div>
        <h1 class="tn-h1">${titleHTML}</h1>
        <p class="tn-hero-lede">${escapeHtml(t.lede)}</p>
        <p class="tn-hero-lede tn-hero-lede--small">${escapeHtml(t.lede2)}</p>
        <button class="tn-cta" data-action="route" data-page="home" data-anchor="catalogue">${escapeHtml(t.cta)} <span>→</span></button>
      </div>
      <div class="tn-hero-product">
        <div class="tn-hero-product-frame" style="background:${THEME.lightgrey}">
          <img src="${assetUrl('assets/hero.jpg', 'tinynord/hero', 'w_1600,q_auto,f_auto')}" alt="Parent walking with a Tinynord stroller" class="tn-hero-product-illus tn-prod-img" loading="eager" />
        </div>
      </div>
    </section>`;
}

function renderSloganBand() {
  const text = COPY[state.lang].slogan;
  return `
    <div class="tn-slogan-band">
      <div class="tn-slogan-band-hills">${wavyHills({ color: 'var(--ink)', opacity: 0.35 })}</div>
      <div class="tn-slogan-band-text">${slogan(text, 'var(--ink)', 28)}</div>
    </div>`;
}

function multilineH2(text) {
  return text.split('\n').map(l => `<span>${escapeHtml(l)}<br/></span>`).join('');
}

function renderCategoryGrid() {
  const t = COPY[state.lang].catalogue;
  // Colour the second line of the heading with the accent (matches the design).
  const titleLines = t.title.split('\n');
  const titleHTML = titleLines.map((l, i) => i === titleLines.length - 1 && titleLines.length > 1
    ? `<em>${escapeHtml(l)}</em>`
    : `${escapeHtml(l)} `).join('');
  return `
    <section class="tn-cats" id="catalogue">
      <div class="tn-section-head">
        <div class="tn-eyebrow">${escapeHtml(t.eyebrow)}</div>
        <h2 class="tn-h2">${titleHTML}</h2>
        <p class="tn-section-sub">${escapeHtml(t.sub)}</p>
      </div>
      <div class="tn-cat-grid">
        ${CATEGORIES.map((c, idx) => `
            <button class="tn-cat-card" style="animation-delay:${idx * 60}ms" data-action="category" data-cat="${c.id}">
              <div class="tn-cat-card-illus">
                <img src="${assetUrl(`assets/cat/${c.id}.jpg`, `tinynord/cat/${c.id}`, 'w_800,h_600,c_fill,q_auto,f_auto')}" alt="${escapeHtml(c[state.lang])}" class="tn-cat-card-illus-inner tn-prod-img" loading="lazy" />
                <div class="tn-cat-card-name">${escapeHtml(c[state.lang])}</div>
              </div>
            </button>`).join('')}
      </div>
    </section>`;
}

function renderAbout() {
  const t = COPY[state.lang].about;
  const titleHTML = t.title.map((l, i) => {
    const isLast = i === t.title.length - 1;
    const piece = isLast ? `<em>${escapeHtml(l)}</em>` : escapeHtml(l);
    return `<span>${piece}${!isLast ? '<br/>' : ''}</span>`;
  }).join('');
  const paras = [t.body, t.body2, t.body3].filter(Boolean);
  return `
    <section class="tn-about" id="about">
      <div class="tn-about-grid">
        <div class="tn-about-head">
          <h1 class="tn-h1 tn-about-title">${titleHTML}</h1>
          <div class="tn-voice-tags">
            ${t.voice.map(v => `<span class="tn-voice-tag">${escapeHtml(v)}</span>`).join('')}
          </div>
        </div>
        <div class="tn-about-body">
          ${paras.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
        </div>
      </div>
    </section>`;
}

function renderValues() {
  const t = COPY[state.lang].values;
  return `
    <section class="tn-values">
      <div class="tn-section-head">
        <div class="tn-eyebrow">${escapeHtml(t.eyebrow)}</div>
        <h2 class="tn-h2">${multilineH2(t.title)}</h2>
      </div>
      <div class="tn-values-grid">
        ${t.items.map((it, i) => `
          <div class="tn-value-card" style="animation-delay:${i * 60}ms">
            <div class="tn-value-t">${escapeHtml(it.t)}</div>
            <p class="tn-value-b">${escapeHtml(it.b)}</p>
          </div>`).join('')}
      </div>
    </section>`;
}

function renderRetailers() {
  const t = COPY[state.lang].retailers;
  return `
    <section class="tn-retailers" id="retailers">
      <div class="tn-section-head tn-section-head--center">
        <div class="tn-eyebrow">${escapeHtml(t.eyebrow)}</div>
        <h2 class="tn-h2">${multilineH2(t.title)}</h2>
        <p class="tn-section-sub">${escapeHtml(t.body)}</p>
      </div>
      <div class="tn-ret-countries">
        ${RETAILERS.map(g => `
          <div class="tn-ret-country-block">
            <div class="tn-ret-country-h"><span class="tn-ret-flag" aria-hidden="true">${g.flag}</span> ${escapeHtml(g.country)}</div>
            <ul class="tn-ret-list">
              ${g.items.map(it => `<li>${it.url
                ? `<a href="${escapeHtml(it.url)}" target="_blank" rel="noreferrer" class="tn-ret-item tn-ret-item--link">${escapeHtml(it.name)}</a>`
                : `<span class="tn-ret-item">${escapeHtml(it.name)}</span>`}</li>`).join('')}
            </ul>
          </div>`).join('')}
      </div>
      <p class="tn-ret-cta">${escapeHtml(t.empty)}<a href="mailto:info@fliistrade.com">${escapeHtml(t.emptyLink)}</a></p>
    </section>`;
}

function renderCategoryPage() {
  const cat = CATEGORIES.find(c => c.id === state.route.cat);
  if (!cat) return '';
  const products = productsInCategory(cat.id);
  // Group by subcategory for readability when categories are large.
  const groups = new Map();
  for (const p of products) {
    const k = p.subcategory || '';
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(p);
  }
  const groupHTML = Array.from(groups.entries()).map(([sub, items]) => `
    ${sub ? `<h3 class="tn-catpage-sub">${escapeHtml(sub)}</h3>` : ''}
    <div class="tn-prod-grid">
      ${items.map((p, idx) => `
        <button class="tn-prod-card" style="animation-delay:${idx * 40}ms" data-action="product" data-id="${escapeHtml(p.code)}">
          <div class="tn-prod-frame" style="background:${THEME.lightgrey}">
            ${productImage(p, 0, 'tn-prod-illus tn-prod-img')}
          </div>
          <div class="tn-prod-meta">
            <div class="tn-prod-name">${escapeHtml(p.name)}</div>
            <div class="tn-prod-tag">${escapeHtml(p.tag || '')}</div>
          </div>
        </button>`).join('')}
    </div>`).join('');
  return `
    <section class="tn-catpage">
      <div class="tn-catpage-head">
        <button class="tn-back" data-action="route" data-page="home" data-anchor="catalogue">
          <span>←</span> ${escapeHtml(COPY[state.lang].allCats)}
        </button>
        <div class="tn-eyebrow">${escapeHtml(COPY[state.lang].category)}</div>
        <h1 class="tn-h1 tn-catpage-title"><em>${escapeHtml(cat[state.lang])}</em></h1>
      </div>
      ${groupHTML}
    </section>`;
}

function renderFooter() {
  const t = COPY[state.lang].footer;
  const cats = CATEGORIES;
  return `
    <footer class="tn-footer">
      <div class="tn-footer-hills">${wavyHills({ color: 'var(--accent)', opacity: 0.5 })}</div>
      <div class="tn-footer-top">
        <div class="tn-footer-brand">
          <img src="assets/logo-tinynord.png?v=2" alt="Tinynord" class="tn-footer-logo" />
          <div class="tn-footer-tag" style="margin-top:20px">${slogan(t.tagline, 'var(--ink)', 16)}</div>
          <p class="tn-footer-addr">${escapeHtml(t.addr)}</p>
        </div>
        <div class="tn-footer-cols">
          <div>
            <div class="tn-footer-h">${escapeHtml(t.cols.catalogue)}</div>
            <ul>${cats.map(c => `<li><a data-action="category" data-cat="${c.id}">${escapeHtml(c[state.lang])}</a></li>`).join('')}</ul>
          </div>
          <div>
            <div class="tn-footer-h">${escapeHtml(t.cols.company)}</div>
            <ul>
              <li><a data-action="route" data-page="about">${escapeHtml(COPY[state.lang].aboutShort)}</a></li>
              <li><a data-action="route" data-page="retailers">${escapeHtml(COPY[state.lang].retailersShort)}</a></li>
            </ul>
          </div>
          <div>
            <div class="tn-footer-h">${escapeHtml(t.cols.contact)}</div>
            <ul>
              <li><a href="mailto:info@fliistrade.com" class="tn-footer-contact">${iconMail()}<span>info@fliistrade.com</span></a></li>
              <li><a href="tel:+37251946988" class="tn-footer-contact">${iconPhone()}<span>+372 5194 6988</span></a></li>
              <li><a href="https://instagram.com/tinynord" target="_blank" rel="noreferrer" class="tn-footer-contact">${iconInstagram()}<span>Instagram</span></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="tn-footer-bot">
        <span>${escapeHtml(t.legal)}</span>
      </div>
    </footer>`;
}

function renderMain() {
  switch (state.route.page) {
    case 'home':
      return renderHero() + renderCategoryGrid();
    case 'category':
      return renderCategoryPage();
    case 'about':
      return renderAbout() + renderValues();
    case 'retailers':
      return renderRetailers();
    default:
      return '';
  }
}

function renderApp() {
  document.getElementById('header-slot').innerHTML = renderHeader();
  document.getElementById('main-slot').innerHTML = renderMain();
  document.getElementById('footer-slot').innerHTML = renderFooter();
}

function renderModal() {
  const slot = document.getElementById('modal-slot');
  const p = state.activeProduct;
  if (!p) { slot.innerHTML = ''; return; }
  const t = COPY[state.lang].modal;
  const cat = CATEGORIES.find(x => x.id === p.category);
  const images = p.images || [];
  const idx = Math.min(state.modalImgIdx, images.length - 1);
  const colorsLine = (p.colors && p.colors.length) ? p.colors.join(' · ') : '';
  const chassisLine = (p.chassis && p.chassis.length) ? p.chassis.join(' · ') : '';
  const codeLine = p.code && !/^[a-z-]+$/.test(p.code) ? `Code ${p.code}` : '';
  slot.innerHTML = `
    <div class="tn-modal-bg" data-action="close-modal">
      <div class="tn-modal">
        <button class="tn-modal-close" data-action="close-modal" aria-label="Close">×</button>
        <div class="tn-modal-gallery">
          <div class="tn-modal-main" style="background:${THEME.lightgrey}">
            ${images[idx] ? `<img src="${cldUrl(imageEntry(p, idx), 'w_1400')}" alt="${escapeHtml(p.name)}" class="tn-modal-illus tn-prod-img" />` : ''}
          </div>
          ${images.length > 1 ? `<div class="tn-modal-thumbs">
            ${images.map((src, i) => `
              <button class="tn-thumb${i === idx ? ' is-active' : ''}" data-action="thumb" data-idx="${i}" style="background:${THEME.lightgrey}">
                <img src="${cldUrl(imageEntry(p, i), 'w_240')}" alt="" class="tn-thumb-illus tn-prod-img" loading="lazy" />
              </button>`).join('')}
          </div>` : ''}
        </div>
        <div class="tn-modal-info">
          <div class="tn-eyebrow">${cat ? escapeHtml(cat[state.lang]) : ''}</div>
          <h2 class="tn-h2 tn-modal-title">${escapeHtml(p.name)}</h2>
          ${p.tag ? `<p class="tn-modal-tag">${escapeHtml(p.tag)}</p>` : ''}
          ${p.description ? `<p class="tn-modal-desc">${escapeHtml(p.description)}</p>` : ''}
          <dl class="tn-spec">
            ${(p.materials && p.materials.length) ? `<div><dt>${escapeHtml(t.materials)}</dt><dd>${escapeHtml(p.materials.join(' · '))}</dd></div>` : ''}
            ${p.dims ? `<div><dt>${escapeHtml(t.dimensions)}</dt><dd>${escapeHtml(p.dims)}</dd></div>` : ''}
            ${p.ages ? `<div><dt>${escapeHtml(t.ages)}</dt><dd>${escapeHtml(p.ages)}</dd></div>` : ''}
            ${(p.certs && p.certs.length) ? `<div><dt>${escapeHtml(t.certifications)}</dt><dd>${escapeHtml(p.certs.join(' · '))}</dd></div>` : ''}
            ${colorsLine ? `<div><dt>${state.lang==='en'?'Colours':'Värvid'}</dt><dd>${escapeHtml(colorsLine)}</dd></div>` : ''}
            ${chassisLine ? `<div><dt>${state.lang==='en'?'Chassis':'Šassii'}</dt><dd>${escapeHtml(chassisLine)}</dd></div>` : ''}
            ${codeLine ? `<div><dt>${state.lang==='en'?'Code':'Kood'}</dt><dd>${escapeHtml(p.code)}</dd></div>` : ''}
          </dl>
        </div>
      </div>
    </div>`;
}

// ─── Event delegation ─────────────────────────────────────────────────────
document.addEventListener('click', (e) => {
  const target = e.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;
  if (action === 'route') {
    e.preventDefault();
    closeMobileMenu();
    setRoute({ page: target.dataset.page, anchor: target.dataset.anchor });
  } else if (action === 'category') {
    e.preventDefault();
    closeMobileMenu();
    setRoute({ page: 'category', cat: target.dataset.cat });
  } else if (action === 'lang') {
    setLang(target.dataset.lang);
    closeMobileMenu();
  } else if (action === 'burger') {
    toggleMobileMenu();
  } else if (action === 'product') {
    openProduct(target.dataset.id);
  } else if (action === 'close-modal') {
    // For backdrop clicks, only close when the click landed directly on the backdrop —
    // not when it bubbled up from inner content.
    if (target.classList.contains('tn-modal-bg') && e.target !== target) return;
    closeProduct();
  } else if (action === 'thumb') {
    setModalImage(parseInt(target.dataset.idx, 10) || 0);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (state.activeProduct) closeProduct();
    else closeMobileMenu();
    return;
  }
});

// Boot
document.addEventListener('DOMContentLoaded', renderApp);
