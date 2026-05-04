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
        { t: 'Trustful', b: 'We believe trust is earned in every product we create. Families know they can count on us to be safe, reliable and thoughtfully made.' },
        { t: 'Caring',   b: 'Every product is crafted with heartfelt dedication to support babies during the most important early years.' },
        { t: 'Joyful',   b: 'We believe childhood should be filled with wonders. That’s why we create playful, engaging products that spark imagination.' },
        { t: 'Timeless', b: 'Simple, elegant and practical designs that blend seamlessly into any home. This aesthetic ensures our products remain relevant.' },
        { t: 'Safe',     b: 'Every product we create, from onesies to strollers, is designed and tested to meet the highest safety standards.' },
        { t: 'Cherish',  b: 'We help create moments – first steps, bedtime giggles, family outings – our designs are made to be part of treasured memories.' },
      ],
    },
    about: {
      eyebrow: 'About Tinynord',
      title: 'Made for the\nfirst thousand days.',
      body: 'Once upon a time in the heart of Estonia, a brand was born to cater to the needs of the tiniest members of our families. Tinynord was created with a heartfelt mission: to provide premium baby essentials that support a child’s earliest years with care, comfort and style.',
      body2: 'Drawing inspiration from the timeless elegance of Scandinavian design, Tinynord crafts each product with the finest materials — ensuring durability, sustainability and beauty. From strollers, cozy cribs to the softest clothes, every item is made to be cherished, passed down and loved again.',
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
      addr: 'Tinynord OÜ — Tallinn, Estonia',
      cols: { catalogue: 'Catalogue', company: 'Company', contact: 'Contact' },
      legal: '© 2026 Tinynord OÜ. All rights reserved.',
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
      eyebrow: 'Tinynordist',
      title: 'Esimese tuhande\npäeva jaoks.',
      body: 'Kunagi ammu Eesti südames sündis bränd, mis hoolitseb meie perede kõige väiksemate liikmete eest.',
      body2: 'Skandinaavia disaini ajatust elegantsist inspireerituna valmistab Tinynord iga toote parimatest materjalidest.',
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
      addr: 'Tinynord OÜ — Tallinn, Eesti',
      cols: { catalogue: 'Tooted', company: 'Ettevõte', contact: 'Kontakt' },
      legal: '© 2026 Tinynord OÜ. Kõik õigused kaitstud.',
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
  { id: 'clothing',     en: 'Clothing',             et: 'Rõivad' },
  { id: 'safety',       en: 'Safety Products',      et: 'Turvatooted' },
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
function cldUrl(path, transforms = '') {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const decoded = decodeURIComponent(path).replace(/^\/+/, '');
  const publicId = encodeURI(CLOUDINARY.PATH_PREFIX + decoded).replace(/#/g, '%23').replace(/\?/g, '%3F');
  const t = [CLOUDINARY.DEFAULTS, transforms].filter(Boolean).join(',');
  return `https://res.cloudinary.com/${CLOUDINARY.CLOUD_NAME}/image/upload/${t}/${publicId}`;
}


const RETAILERS = [
  { name: 'Nordbaby', url: 'https://nordbaby.com', country: 'Estonia, Latvia, Finland', tagline: 'The flagship retailer.', flag: '🇪🇪' },
];

const THEME = { lime: '#D0D15F', beige: '#E3D8D1', lightgrey: '#F7F1E5' };

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

function dottedCircle({ size = 120, color = '#D0D15F', cut = 'right', dotSize = 4, style = '' } = {}) {
  const cx = 50, cy = 50, r = 44;
  let dots = '';
  for (let y = 0; y <= 100; y += 6) {
    for (let x = 0; x <= 100; x += 6) {
      const dx = x - cx, dy = y - cy;
      if (Math.hypot(dx, dy) > r) continue;
      if (cut === 'right' && x > cx && Math.abs(dy) < dx * 0.6) continue;
      if (cut === 'left'  && x < cx && Math.abs(dy) < (cx - x) * 0.6) continue;
      if (cut === 'top'   && y < cy && Math.abs(dx) < (cy - y) * 0.6) continue;
      dots += `<circle cx="${x}" cy="${y}" r="${dotSize / 4}" fill="${color}"/>`;
    }
  }
  return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" aria-hidden="true" style="${style}">${dots}</svg>`;
}

function wavyHills({ color = '#D0D15F', opacity = 1, style = '' } = {}) {
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
  const raw = (product.images && product.images[idx]) || (product.images && product.images[0]) || '';
  if (!raw) return `<div class="${className} tn-img--missing"></div>`;
  const src = cldUrl(raw, 'w_800');
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
    for (const path of p.images) {
      queue.push(cldUrl(path, 'w_1400'));
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
    mainImg.src = cldUrl(p.images[idx], 'w_1400');
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
        <img src="assets/logo-tinynord.png" alt="Tinynord" class="tn-logo-img" />
      </a>
      <nav class="tn-nav">
        ${items.map(it => `<button class="tn-nav-link${isActive(it.id) ? ' is-active' : ''}" data-action="route" data-page="${it.id}">${escapeHtml(it.label)}</button>`).join('')}
      </nav>
      <div class="tn-lang">
        <button class="tn-lang-btn${state.lang === 'en' ? ' is-active' : ''}" data-action="lang" data-lang="en">EN</button>
        <span class="tn-lang-sep">·</span>
        <button class="tn-lang-btn${state.lang === 'et' ? ' is-active' : ''}" data-action="lang" data-lang="et">ET</button>
      </div>
    </header>`;
}

function renderHero() {
  const t = COPY[state.lang].hero;
  const featured = PRODUCTS.find(p => p.code === 'lux') || PRODUCTS.find(p => p.category === 'strollers') || PRODUCTS[0];
  const titleHTML = t.title.map((l, i) => {
    const isLast = i === t.title.length - 1;
    const piece = isLast ? `<em>${escapeHtml(l)}</em>` : escapeHtml(l);
    return `<span>${piece}${!isLast ? '<br/>' : ''}</span>`;
  }).join('');
  if (!featured) {
    return `<section class="tn-hero"><div class="tn-hero-text">
      <div class="tn-hero-eyebrow">${escapeHtml(t.eyebrow)}</div>
      <h1 class="tn-h1">${titleHTML}</h1>
      <p class="tn-hero-lede">${escapeHtml(t.lede)}</p>
    </div></section>`;
  }
  return `
    <section class="tn-hero">
      <div class="tn-hero-text">
        <div class="tn-hero-eyebrow">${escapeHtml(t.eyebrow)}</div>
        <h1 class="tn-h1">${titleHTML}</h1>
        <p class="tn-hero-lede">${escapeHtml(t.lede)}</p>
        <p class="tn-hero-lede tn-hero-lede--small">${escapeHtml(t.lede2)}</p>
        <button class="tn-cta" data-action="route" data-page="home" data-anchor="catalogue">${escapeHtml(t.cta)} <span>→</span></button>
      </div>
      <div class="tn-hero-product" data-action="product" data-id="${escapeHtml(featured.code)}">
        <div class="tn-hero-dot-1">${dottedCircle({ size: 140, color: 'var(--accent)', cut: 'right' })}</div>
        <div class="tn-hero-dot-2">${dottedCircle({ size: 90,  color: 'var(--beige)', cut: 'left' })}</div>
        <div class="tn-hero-product-frame" style="background:${THEME.lightgrey}">
          ${productImage(featured, 0, 'tn-hero-product-illus tn-prod-img', 'eager')}
        </div>
        <div class="tn-hero-product-meta">
          <div class="tn-hero-product-name">${escapeHtml(featured.name)}</div>
          <div class="tn-hero-product-tagline">${escapeHtml(featured.tag || '')}</div>
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
  return `
    <section class="tn-cats" id="catalogue">
      <div class="tn-section-head">
        <div class="tn-eyebrow">${escapeHtml(t.eyebrow)}</div>
        <h2 class="tn-h2">${multilineH2(t.title)}</h2>
        <p class="tn-section-sub">${escapeHtml(t.sub)}</p>
      </div>
      <div class="tn-cat-grid">
        ${CATEGORIES.map((c, idx) => {
          const sample = productsInCategory(c.id).find(p => p.images && p.images.length);
          const img = sample ? productImage(sample, 0, 'tn-cat-card-illus-inner tn-prod-img') : '';
          return `
            <button class="tn-cat-card" style="animation-delay:${idx * 60}ms" data-action="category" data-cat="${c.id}">
              <div class="tn-cat-card-illus">${img}</div>
              <div class="tn-cat-card-foot">
                <div class="tn-cat-card-name">${escapeHtml(c[state.lang])}</div>
                <div class="tn-cat-card-arrow">→</div>
              </div>
            </button>`;
        }).join('')}
      </div>
    </section>`;
}

function renderAbout() {
  const t = COPY[state.lang].about;
  return `
    <section class="tn-about" id="about">
      <div class="tn-about-grid">
        <div>
          <div class="tn-eyebrow">${escapeHtml(t.eyebrow)}</div>
          <h2 class="tn-h2">${multilineH2(t.title)}</h2>
          <div class="tn-voice-tags">
            ${t.voice.map(v => `<span class="tn-voice-tag">${escapeHtml(v)}</span>`).join('')}
          </div>
        </div>
        <div class="tn-about-body">
          <p>${escapeHtml(t.body)}</p>
          <p>${escapeHtml(t.body2)}</p>
        </div>
      </div>
    </section>`;
}

function renderValues() {
  const t = COPY[state.lang].values;
  const cuts = ['right', 'left', 'top', 'right', 'left', 'top'];
  return `
    <section class="tn-values">
      <div class="tn-section-head tn-section-head--center">
        <div class="tn-eyebrow">${escapeHtml(t.eyebrow)}</div>
        <h2 class="tn-h2">${multilineH2(t.title)}</h2>
      </div>
      <div class="tn-values-grid">
        ${t.items.map((it, i) => `
          <div class="tn-value-card" style="animation-delay:${i * 60}ms">
            <div class="tn-value-icon">${dottedCircle({ size: 36, color: 'var(--ink)', cut: cuts[i], dotSize: 2.5 })}</div>
            <div class="tn-value-t">${escapeHtml(it.t)}</div>
            <p class="tn-value-b">${escapeHtml(it.b)}</p>
          </div>`).join('')}
      </div>
    </section>`;
}

function renderRetailers() {
  const t = COPY[state.lang].retailers;
  const placeholders = 7;
  return `
    <section class="tn-retailers" id="retailers">
      <div class="tn-section-head tn-section-head--center">
        <div class="tn-eyebrow">${escapeHtml(t.eyebrow)}</div>
        <h2 class="tn-h2">${multilineH2(t.title)}</h2>
        <p class="tn-section-sub">${escapeHtml(t.body)}</p>
      </div>
      <div class="tn-ret-grid">
        ${RETAILERS.map(r => `
          <a href="${escapeHtml(r.url)}" target="_blank" rel="noreferrer" class="tn-ret-card">
            <div class="tn-ret-logo">
              <span class="tn-ret-name">${escapeHtml(r.name)}</span>
              <span class="tn-ret-flag" aria-hidden="true">${r.flag}</span>
            </div>
            <div class="tn-ret-foot">
              <div class="tn-ret-country">${escapeHtml(r.country)}</div>
              <div class="tn-ret-tag">${escapeHtml(r.tagline)}</div>
            </div>
          </a>`).join('')}
        ${Array.from({ length: placeholders }, () => `
          <div class="tn-ret-card tn-ret-card--ph">
            <div class="tn-ret-logo tn-ret-logo--ph">
              <div class="tn-ret-ph-line"></div>
              <div class="tn-ret-ph-sub">${escapeHtml(COPY[state.lang].spotReserved)}</div>
            </div>
          </div>`).join('')}
      </div>
      <p class="tn-ret-cta">${escapeHtml(t.empty)}<a href="mailto:hello@tinynord.com">${escapeHtml(t.emptyLink)}</a></p>
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
  const cats = CATEGORIES.slice(0, 4);
  return `
    <footer class="tn-footer">
      <div class="tn-footer-hills">${wavyHills({ color: 'var(--accent)', opacity: 0.5 })}</div>
      <div class="tn-footer-top">
        <div class="tn-footer-brand">
          <img src="assets/logo-tinynord.png" alt="Tinynord" class="tn-footer-logo" />
          <div class="tn-footer-tag" style="margin-top:20px">${slogan(t.tagline, 'var(--accent)', 16)}</div>
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
              <li><a>${escapeHtml(COPY[state.lang].sustainability)}</a></li>
            </ul>
          </div>
          <div>
            <div class="tn-footer-h">${escapeHtml(t.cols.contact)}</div>
            <ul>
              <li><a href="mailto:hello@tinynord.com">hello@tinynord.com</a></li>
              <li><a>+372 5555 0123</a></li>
              <li><a>Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="tn-footer-bot">
        <span>${escapeHtml(t.legal)}</span>
        <span>Pantone 13-0648 · 13-0400 · 13-064B</span>
      </div>
    </footer>`;
}

function renderMain() {
  switch (state.route.page) {
    case 'home':
      return renderHero() + renderSloganBand() + renderCategoryGrid() + renderAbout() + renderValues();
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
  const codeLine = p.code && !/^[a-z-]+$/.test(p.code) ? `Code ${p.code}` : '';
  slot.innerHTML = `
    <div class="tn-modal-bg" data-action="close-modal">
      <div class="tn-modal">
        <button class="tn-modal-close" data-action="close-modal" aria-label="Close">×</button>
        <div class="tn-modal-gallery">
          <div class="tn-modal-main" style="background:${THEME.lightgrey}">
            ${images[idx] ? `<img src="${cldUrl(images[idx], 'w_1400')}" alt="${escapeHtml(p.name)}" class="tn-modal-illus tn-prod-img" />` : ''}
          </div>
          ${images.length > 1 ? `<div class="tn-modal-thumbs">
            ${images.map((src, i) => `
              <button class="tn-thumb${i === idx ? ' is-active' : ''}" data-action="thumb" data-idx="${i}" style="background:${THEME.lightgrey}">
                <img src="${cldUrl(src, 'w_240')}" alt="" class="tn-thumb-illus tn-prod-img" loading="lazy" />
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
    setRoute({ page: target.dataset.page, anchor: target.dataset.anchor });
  } else if (action === 'category') {
    e.preventDefault();
    setRoute({ page: 'category', cat: target.dataset.cat });
  } else if (action === 'lang') {
    setLang(target.dataset.lang);
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
  if (e.key === 'Escape' && state.activeProduct) closeProduct();
});

// Boot
document.addEventListener('DOMContentLoaded', renderApp);
