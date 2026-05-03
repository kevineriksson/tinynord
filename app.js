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

const CATEGORIES = [
  { id: 'strollers',    en: 'Strollers',            et: 'Lapsevankrid',           count: 2 },
  { id: 'stroller-acc', en: 'Stroller Accessories', et: 'Vankri tarvikud',        count: 2 },
  { id: 'bedroom',      en: 'Bedroom',              et: 'Magamistuba',            count: 2 },
  { id: 'bathroom',     en: 'Bathroom',             et: 'Vannituba',              count: 2 },
  { id: 'eating',       en: 'Eating Goods',         et: 'Söögivahendid', count: 2 },
  { id: 'clothing',     en: 'Clothing',             et: 'Rõivad',             count: 2 },
  { id: 'safety',       en: 'Safety Products',      et: 'Turvatooted',            count: 2 },
  { id: 'car',          en: 'Car Accessories',      et: 'Auto tarvikud',          count: 2 },
];

const PRODUCTS = [
  { id: 'fjord-04', cat: 'strollers', tint: 'lime',
    en: { name: 'Fjord 04 Pram', tag: 'A complete travel system, from newborn to toddler.' },
    et: { name: 'Fjord 04 vanker', tag: 'Täielik süsteem väikelapsest taadiks.' },
    desc: { en: 'Four configurations — carrycot, seat, car seat adapter, and toddler stand. Magnesium chassis, all-terrain wheels with PU-foam cushioning, and a one-handed fold designed for narrow Nordic doorways.', et: 'Neli konfiguratsiooni — vanker, iste, turvahoidja adapter ja väikelapse seismislaud.' },
    materials: ['Magnesium chassis','OEKO-TEX cotton canvas','Recycled aluminium handle'],
    dims: '102 × 60 × 95 cm — 12.4 kg',
    ages: '0–36 months',
    certs: ['EN 1888-1','EN 1466','OEKO-TEX 100'],
    palette: ['#E3D8D1','#959791','#231F20'] },
  { id: 'tundra-go', cat: 'strollers', tint: 'beige',
    en: { name: 'Tundra Go Buggy', tag: 'Light, foldable, made for cobblestones.' },
    et: { name: 'Tundra Go jalutuskaru', tag: 'Kerge, kokkupandav.' },
    desc: { en: 'A 6.8 kg city buggy that folds with one hand and stands on its own. Reclines fully flat and rolls on suspension wheels tuned for the Tallinn old town.', et: 'Linna jalutuskaru kaaluga 6.8 kg.' },
    materials: ['Aluminium alloy frame','OEKO-TEX shadowfabric','Recycled PET basket'],
    dims: '47 × 30 × 56 cm folded — 6.8 kg',
    ages: '6–48 months',
    certs: ['EN 1888-2','OEKO-TEX 100'],
    palette: ['#F7F1E5','#231F20','#D0D15F'] },
  { id: 'rain-cover', cat: 'stroller-acc', tint: 'lightgrey',
    en: { name: 'Sky Rain Cover', tag: 'Tailored to fit the Fjord 04 and Tundra Go.' },
    et: { name: 'Sky vihmakate', tag: 'Õmmeldud Fjord 04 ja Tundra Go jaoks.' },
    desc: { en: 'A clear PU rain cover with a soft trim and a single front zip for ventilation. Folds into a matching pouch the size of a paperback.', et: 'Läbipaistev PU vihmakate.' },
    materials: ['PFC-free PU','Recycled cotton trim','YKK zippers'],
    dims: 'Universal fit — packs to 18 × 12 cm',
    ages: 'All ages',
    certs: ['REACH','OEKO-TEX 100'],
    palette: ['#F7F1E5','#959791','#231F20'] },
  { id: 'footmuff-arctic', cat: 'stroller-acc', tint: 'beige',
    en: { name: 'Arctic Footmuff', tag: 'For −20 °C mornings.' },
    et: { name: 'Arctic jalakott', tag: '−20 °C hommikuteks.' },
    desc: { en: 'Recycled wool fleece interior, water-repellent shell, full-length two-way zip. Tested through a Tallinn winter and an Areön morning at the lighthouse.', et: 'Ringlussevõetud villane sisu.' },
    materials: ['Recycled wool fleece','Bluesign® shell','Cotton lining'],
    dims: '90 × 45 cm',
    ages: '0–36 months',
    certs: ['Bluesign®','OEKO-TEX 100'],
    palette: ['#E3D8D1','#959791','#231F20'] },
  { id: 'moln-cot', cat: 'bedroom', tint: 'beige',
    en: { name: 'Mo̊ln Convertible Cot', tag: 'A cot, a toddler bed, a junior bed.' },
    et: { name: 'Mo̊ln muundatav voodi', tag: 'Võrepesa, väikelapse voodi.' },
    desc: { en: 'Solid Estonian birch in a brushed lime-wash. Three heights, two open sides, and a conversion kit included. No exposed hardware.', et: 'Eesti kase massiiv.' },
    materials: ['FSC Estonian birch','Water-based lacquer','Brass fittings'],
    dims: '125 × 67 × 88 cm',
    ages: '0–6 years',
    certs: ['EN 716','FSC','EU Ecolabel'],
    palette: ['#E3D8D1','#F7F1E5','#231F20'] },
  { id: 'cloud-mobile', cat: 'bedroom', tint: 'lime',
    en: { name: 'Cloud Mobile', tag: 'Hand-felted shapes that move with the room.' },
    et: { name: 'Cloud mobiil', tag: 'Käsitsi vooditud kujundid.' },
    desc: { en: 'Six wool-felt clouds suspended on a turned beech ring. Balanced to drift on the gentlest breeze; never battery-powered, never musical.', et: 'Kuus villasest vildist pilvekest.' },
    materials: ['100% wool felt','FSC beech','Cotton cord'],
    dims: 'Ø 32 cm — 60 cm drop',
    ages: '0–12 months',
    certs: ['EN 71','OEKO-TEX 100'],
    palette: ['#D0D15F','#F7F1E5','#231F20'] },
  { id: 'soft-tub', cat: 'bathroom', tint: 'lightgrey',
    en: { name: 'Soft-Tub Baby Bath', tag: 'Silicone, suction-base, dishwasher safe.' },
    et: { name: 'Soft-Tub vann', tag: 'Silikoon, alusega.' },
    desc: { en: 'Food-grade silicone with a non-slip bottom and a low-pour spout for easy emptying. Folds flat for travel.', et: 'Toidusilikoon mittelibiseva põhjaga.' },
    materials: ['Food-grade silicone','BPA-free'],
    dims: '76 × 44 × 22 cm',
    ages: '0–12 months',
    certs: ['LFGB','FDA'],
    palette: ['#F7F1E5','#E3D8D1','#231F20'] },
  { id: 'linen-towel', cat: 'bathroom', tint: 'beige',
    en: { name: 'Hooded Linen Towel', tag: 'Stonewashed Estonian linen.' },
    et: { name: 'Kapuutsiga linane rätik', tag: 'Pehmestatud Eesti linane.' },
    desc: { en: 'Woven in Tartu from European flax, then stonewashed three times for a softness that ordinary cotton can’t match. Two corners, one hood, no buttons.', et: 'Kootud Tartus Euroopa linast.' },
    materials: ['100% European flax linen'],
    dims: '90 × 90 cm',
    ages: '0–3 years',
    certs: ['European Flax®','OEKO-TEX 100'],
    palette: ['#E3D8D1','#F7F1E5','#959791'] },
  { id: 'first-bowl', cat: 'eating', tint: 'lime',
    en: { name: 'First Bowl & Spoon', tag: 'Weighted base. Won’t skid, won’t flip.' },
    et: { name: 'Esimene kauss ja lusikas', tag: 'Raskendatud põhi.' },
    desc: { en: 'A wide, low silicone bowl with a stoneware-feel weight at the base, paired with a cherry-wood handled spoon sized to a six-month-old’s grip.', et: 'Lai madal silikoonkauss.' },
    materials: ['Food-grade silicone','FSC cherry wood'],
    dims: 'Ø 14 cm — spoon 14 cm',
    ages: '6+ months',
    certs: ['LFGB','FSC'],
    palette: ['#D0D15F','#231F20','#F7F1E5'] },
  { id: 'sip-cup', cat: 'eating', tint: 'beige',
    en: { name: 'Sip Training Cup', tag: 'A real cup, sized small.' },
    et: { name: 'Sip joogitäss', tag: 'Päris täss, väike.' },
    desc: { en: 'A 90 ml borosilicate cup with a silicone collar. No spout, no straw, no lid — the way speech therapists recommend.', et: '90 ml klaasist täss.' },
    materials: ['Borosilicate glass','Food-grade silicone'],
    dims: 'Ø 6 × 6 cm — 90 ml',
    ages: '6+ months',
    certs: ['LFGB'],
    palette: ['#E3D8D1','#F7F1E5','#231F20'] },
  { id: 'sleep-bag', cat: 'clothing', tint: 'beige',
    en: { name: 'Merino Sleep Bag', tag: 'Year-round. Two togs in one.' },
    et: { name: 'Meriino magamiskott', tag: 'Aastaringne.' },
    desc: { en: 'A Merino jersey shell over a fine-knit liner. Unzip the liner in summer, keep it in for winter. Side zip, fold-over mitts, no tags.', et: 'Meriino kest peene koe voodriga.' },
    materials: ['100% Merino wool','OEKO-TEX cotton liner'],
    dims: 'Sizes 0–6, 6–18, 18–36 mo',
    ages: '0–36 months',
    certs: ['ZQ Merino','OEKO-TEX 100'],
    palette: ['#E3D8D1','#F7F1E5','#231F20'] },
  { id: 'first-cardigan', cat: 'clothing', tint: 'lightgrey',
    en: { name: 'First Cardigan', tag: 'Knitted in Viljandi from undyed wool.' },
    et: { name: 'Esimene kampsun', tag: 'Kootud Viljandis värvimata villast.' },
    desc: { en: 'A relaxed boxy cut with raglan sleeves and shell buttons. Three natural fleece colours — oat, ash, mocha — nothing dyed.', et: 'Vaba lõige raglaan-varrukatega.' },
    materials: ['100% undyed Estonian wool','Mother-of-pearl buttons'],
    dims: 'Sizes 56 → 92 cm',
    ages: '0–24 months',
    certs: ['Estonian wool mark'],
    palette: ['#F7F1E5','#959791','#231F20'] },
  { id: 'door-set', cat: 'safety', tint: 'beige',
    en: { name: 'Quiet Door Set', tag: 'Foam stoppers and finger guards.' },
    et: { name: 'Vaikse ukse komplekt', tag: 'Vahust stopperid.' },
    desc: { en: 'A six-piece set: two finger guards, two soft door-stoppers, two corner caps. All in a calm tone that disappears against most walls.', et: 'Kuueosaline komplekt.' },
    materials: ['EVA foam','Recycled silicone'],
    dims: 'Universal fit',
    ages: '6+ months',
    certs: ['EN 71','REACH'],
    palette: ['#E3D8D1','#F7F1E5','#231F20'] },
  { id: 'plug-set', cat: 'safety', tint: 'lime',
    en: { name: 'Outlet Plug Set', tag: 'Pinch-proof EU type-F covers.' },
    et: { name: 'Pistikukaitsmete komplekt', tag: 'EU tüüp-F kaitsmed.' },
    desc: { en: 'A box of twelve translucent plugs that slot flush against the wall. Tested to 25 N pull-out force. No visible logo.', et: 'Karp 12 läbipaistva pistikuga.' },
    materials: ['Recycled ABS'],
    dims: 'EU type F (Schuko)',
    ages: '6+ months',
    certs: ['EN 50075','REACH'],
    palette: ['#D0D15F','#F7F1E5','#231F20'] },
  { id: 'sun-shade', cat: 'car', tint: 'lime',
    en: { name: 'Linen Sun Shade', tag: 'Two per pack. Static-cling, no suction.' },
    et: { name: 'Linane päikesekate', tag: 'Kaks pakis.' },
    desc: { en: 'A loose-weave linen sun shade that cuts 89 % of UV without darkening the cabin. Static-cling sticks to clean glass for years.', et: 'Linane kate, mis lõikab 89 % UV.' },
    materials: ['100% linen','Static-cling backing'],
    dims: '44 × 36 cm × 2',
    ages: 'All ages',
    certs: ['UPF 50+','OEKO-TEX 100'],
    palette: ['#D0D15F','#F7F1E5','#231F20'] },
  { id: 'mirror', cat: 'car', tint: 'beige',
    en: { name: 'Rear-Seat Mirror', tag: 'Wide angle, shatterproof, tilt-locked.' },
    et: { name: 'Tagaistme peegel', tag: 'Lai vaatenurk.' },
    desc: { en: 'A 24 cm convex mirror in a soft frame. Adjustable head locks in place — no rattles on cobbles, no glare in headlights.', et: '24 cm kumer peegel.' },
    materials: ['Shatterproof acrylic','Recycled silicone frame'],
    dims: 'Ø 24 cm',
    ages: '0–2 years',
    certs: ['ECE R17'],
    palette: ['#E3D8D1','#231F20','#F7F1E5'] },
];

function tintColor(tint) {
  return THEME[tint] || THEME.lightgrey;
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
     <span style="font-family:Mulish,system-ui,sans-serif;font-weight:700;font-size:${height * 0.78}px;letter-spacing:-0.025em;line-height:1;color:${color}">tinynord</span>
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
  return `<span style="font-family:Mulish,system-ui,sans-serif;font-style:italic;font-weight:400;font-size:${size}px;letter-spacing:0.02em;color:${color};display:inline-flex;align-items:center;gap:${size * 0.5}px">${dot}${escapeHtml(text)}${dot}</span>`;
};

// ─── Product illustrations (mapped by id) ─────────────────────────────────
const ILLUSTRATIONS = {
  'fjord-04': (bg, mid, accent) => `
    <ellipse cx="200" cy="330" rx="120" ry="6" fill="#000" opacity="0.08"/>
    <path d="M 100 200 Q 100 160 140 160 L 280 160 Q 320 160 320 200 L 320 240 Q 320 250 310 250 L 110 250 Q 100 250 100 240 Z" fill="${mid}"/>
    <path d="M 100 200 Q 100 160 140 160 L 220 160 Q 200 200 195 250 L 110 250 Q 100 250 100 240 Z" fill="${accent}" opacity="0.12"/>
    <path d="M 320 220 Q 350 180 340 130" stroke="${accent}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <circle cx="340" cy="130" r="6" fill="${accent}"/>
    <circle cx="140" cy="290" r="36" fill="${accent}"/>
    <circle cx="140" cy="290" r="14" fill="${bg}"/>
    <circle cx="280" cy="290" r="36" fill="${accent}"/>
    <circle cx="280" cy="290" r="14" fill="${bg}"/>
    <line x1="160" y1="250" x2="155" y2="285" stroke="${accent}" stroke-width="4"/>
    <line x1="260" y1="250" x2="265" y2="285" stroke="${accent}" stroke-width="4"/>
    <line x1="120" y1="220" x2="300" y2="220" stroke="${accent}" stroke-width="1" opacity="0.3"/>`,
  'tundra-go': (bg, mid, accent) => `
    <ellipse cx="200" cy="335" rx="110" ry="5" fill="#000" opacity="0.08"/>
    <path d="M 145 100 L 175 100 L 230 250 L 200 250 Z" fill="${accent}"/>
    <path d="M 145 220 L 280 220 L 270 270 L 160 270 Z" fill="${mid}"/>
    <path d="M 145 100 Q 130 95 130 110" stroke="${accent}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <line x1="170" y1="250" x2="140" y2="310" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>
    <line x1="260" y1="250" x2="290" y2="310" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>
    <line x1="200" y1="265" x2="200" y2="305" stroke="${accent}" stroke-width="3"/>
    <circle cx="140" cy="310" r="20" fill="${accent}"/>
    <circle cx="200" cy="310" r="14" fill="${accent}"/>
    <circle cx="290" cy="310" r="20" fill="${accent}"/>
    <circle cx="140" cy="310" r="6" fill="${bg}"/>
    <circle cx="290" cy="310" r="6" fill="${bg}"/>`,
  'rain-cover': (bg, mid, accent) => `
    <ellipse cx="200" cy="320" rx="100" ry="5" fill="#000" opacity="0.06"/>
    <path d="M 110 260 Q 110 130 200 130 Q 290 130 290 260 Z" fill="${mid}" opacity="0.4" stroke="${accent}" stroke-width="1.5"/>
    <path d="M 200 130 L 200 260" stroke="${accent}" stroke-width="0.8" opacity="0.4"/>
    <line x1="200" y1="135" x2="200" y2="220" stroke="${accent}" stroke-width="2" stroke-dasharray="3 2"/>
    <circle cx="200" cy="220" r="4" fill="${accent}"/>
    <circle cx="140" cy="170" r="3" fill="${accent}" opacity="0.3"/>
    <circle cx="260" cy="200" r="3" fill="${accent}" opacity="0.3"/>
    <circle cx="170" cy="240" r="2" fill="${accent}" opacity="0.3"/>`,
  'footmuff-arctic': (bg, mid, accent) => `
    <ellipse cx="200" cy="335" rx="110" ry="5" fill="#000" opacity="0.06"/>
    <path d="M 130 130 Q 130 110 150 110 L 250 110 Q 270 110 270 130 L 270 310 Q 270 325 255 325 L 145 325 Q 130 325 130 310 Z" fill="${mid}"/>
    <path d="M 130 130 Q 130 110 150 110 L 250 110 Q 270 110 270 130 L 270 145 Q 270 155 250 158 Q 200 150 150 158 Q 130 155 130 145 Z" fill="${bg}" stroke="${accent}" stroke-width="0.5" opacity="0.9"/>
    <line x1="200" y1="160" x2="200" y2="310" stroke="${accent}" stroke-width="1.5" stroke-dasharray="2 2"/>
    <circle cx="200" cy="310" r="5" fill="${accent}"/>
    <circle cx="155" cy="135" r="2" fill="${accent}" opacity="0.2"/>
    <circle cx="245" cy="138" r="2" fill="${accent}" opacity="0.2"/>`,
  'moln-cot': (bg, mid, accent) => {
    let slats = '';
    for (let i = 0; i < 11; i++) slats += `<rect x="${92 + i * 22}" y="174" width="3.5" height="96" fill="${accent}" opacity="0.85"/>`;
    return `
      <ellipse cx="200" cy="330" rx="120" ry="5" fill="#000" opacity="0.07"/>
      <rect x="80" y="160" width="240" height="14" rx="2" fill="${accent}"/>
      <rect x="80" y="270" width="240" height="14" rx="2" fill="${accent}"/>
      ${slats}
      <rect x="80" y="140" width="14" height="160" rx="3" fill="${accent}"/>
      <rect x="306" y="140" width="14" height="160" rx="3" fill="${accent}"/>
      <rect x="100" y="220" width="200" height="48" rx="4" fill="${mid}"/>
      <rect x="120" y="225" width="160" height="6" rx="2" fill="${bg}" opacity="0.6"/>
      <circle cx="245" cy="248" r="10" fill="${bg}" opacity="0.85"/>
      <circle cx="241" cy="245" r="1.5" fill="${accent}"/>
      <circle cx="249" cy="245" r="1.5" fill="${accent}"/>`;
  },
  'cloud-mobile': (bg, mid, accent) => `
    <line x1="200" y1="40" x2="200" y2="130" stroke="${accent}" stroke-width="1"/>
    <ellipse cx="200" cy="150" rx="100" ry="14" fill="none" stroke="${accent}" stroke-width="3"/>
    <ellipse cx="200" cy="150" rx="100" ry="14" fill="none" stroke="${accent}" stroke-width="1" opacity="0.3"/>
    <line x1="120" y1="156" x2="120" y2="220" stroke="${accent}" stroke-width="0.6"/>
    <line x1="160" y1="160" x2="160" y2="260" stroke="${accent}" stroke-width="0.6"/>
    <line x1="200" y1="162" x2="200" y2="240" stroke="${accent}" stroke-width="0.6"/>
    <line x1="240" y1="160" x2="240" y2="290" stroke="${accent}" stroke-width="0.6"/>
    <line x1="280" y1="156" x2="280" y2="230" stroke="${accent}" stroke-width="0.6"/>
    <ellipse cx="120" cy="230" rx="20" ry="14" fill="${mid}"/>
    <ellipse cx="160" cy="270" rx="22" ry="15" fill="${bg}" stroke="${accent}" stroke-width="0.5" opacity="0.95"/>
    <ellipse cx="200" cy="250" rx="18" ry="13" fill="${mid}" opacity="0.7"/>
    <ellipse cx="240" cy="300" rx="22" ry="15" fill="${bg}" stroke="${accent}" stroke-width="0.5" opacity="0.95"/>
    <ellipse cx="280" cy="240" rx="20" ry="14" fill="${mid}"/>
    <circle cx="115" cy="225" r="6" fill="${mid}"/>
    <circle cx="156" cy="265" r="7" fill="${bg}" stroke="${accent}" stroke-width="0.5"/>
    <circle cx="244" cy="295" r="7" fill="${bg}" stroke="${accent}" stroke-width="0.5"/>
    <circle cx="285" cy="235" r="6" fill="${mid}"/>`,
  'soft-tub': (bg, mid, accent) => `
    <ellipse cx="200" cy="320" rx="130" ry="6" fill="#000" opacity="0.06"/>
    <path d="M 80 180 Q 80 270 200 290 Q 320 270 320 180 Z" fill="${mid}"/>
    <path d="M 110 200 Q 110 260 200 275 Q 290 260 290 200 Z" fill="${bg}" opacity="0.7"/>
    <path d="M 80 180 Q 70 180 65 195 L 80 200 Z" fill="${mid}"/>
    <path d="M 130 235 Q 165 230 200 235 T 270 235" stroke="${accent}" stroke-width="1.2" fill="none" opacity="0.35"/>
    <path d="M 145 250 Q 180 246 215 250 T 260 250" stroke="${accent}" stroke-width="1" fill="none" opacity="0.25"/>
    <circle cx="120" cy="260" r="3" fill="${accent}" opacity="0.25"/>
    <circle cx="280" cy="260" r="3" fill="${accent}" opacity="0.25"/>`,
  'linen-towel': (bg, mid, accent) => {
    let h = '', v = '';
    for (let i = 0; i < 12; i++) h += `<line x1="118" y1="${150 + i * 14}" x2="282" y2="${150 + i * 14}" stroke="${accent}" stroke-width="0.4" opacity="0.18"/>`;
    for (let i = 0; i < 14; i++) v += `<line x1="${120 + i * 12}" y1="135" x2="${120 + i * 12}" y2="318" stroke="${accent}" stroke-width="0.4" opacity="0.12"/>`;
    return `
      <ellipse cx="200" cy="335" rx="110" ry="5" fill="#000" opacity="0.06"/>
      <path d="M 110 130 L 290 130 L 280 320 L 120 320 Z" fill="${mid}"/>
      <path d="M 170 130 L 200 100 L 230 130 Z" fill="${mid}"/>
      <path d="M 170 130 L 200 100 L 230 130 Z" fill="${accent}" opacity="0.1"/>
      ${h}${v}
      <rect x="262" y="280" width="14" height="22" rx="1" fill="${bg}" stroke="${accent}" stroke-width="0.5"/>`;
  },
  'first-bowl': (bg, mid, accent) => `
    <ellipse cx="200" cy="290" rx="130" ry="8" fill="#000" opacity="0.08"/>
    <path d="M 90 180 Q 90 270 200 280 Q 310 270 310 180 Z" fill="${mid}"/>
    <ellipse cx="200" cy="180" rx="110" ry="22" fill="${bg}" stroke="${accent}" stroke-width="1"/>
    <ellipse cx="200" cy="180" rx="100" ry="18" fill="${accent}" opacity="0.08"/>
    <path d="M 320 110 Q 350 130 340 165" stroke="${accent}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <ellipse cx="338" cy="180" rx="14" ry="10" transform="rotate(20 338 180)" fill="${accent}"/>`,
  'sip-cup': (bg, mid, accent) => `
    <ellipse cx="200" cy="330" rx="80" ry="5" fill="#000" opacity="0.07"/>
    <path d="M 140 130 L 260 130 L 250 310 Q 250 320 240 320 L 160 320 Q 150 320 150 310 Z" fill="${bg}" opacity="0.4" stroke="${accent}" stroke-width="1.5"/>
    <rect x="142" y="180" width="116" height="40" fill="${mid}"/>
    <path d="M 158 280 L 242 280 L 246 300 Q 246 310 240 310 L 160 310 Q 154 310 154 300 Z" fill="${accent}" opacity="0.3"/>
    <ellipse cx="200" cy="130" rx="60" ry="6" fill="none" stroke="${accent}" stroke-width="1.5"/>`,
  'sleep-bag': (bg, mid, accent) => {
    let lines = '';
    for (let i = 0; i < 8; i++) lines += `<line x1="130" y1="${170 + i * 20}" x2="270" y2="${170 + i * 20}" stroke="${accent}" stroke-width="0.3" opacity="0.15"/>`;
    return `
      <ellipse cx="200" cy="335" rx="115" ry="5" fill="#000" opacity="0.07"/>
      <path d="M 130 140 L 270 140 L 280 320 L 120 320 Z" fill="${mid}"/>
      <path d="M 130 140 Q 100 145 100 175 L 130 175 Z" fill="${mid}"/>
      <path d="M 270 140 Q 300 145 300 175 L 270 175 Z" fill="${mid}"/>
      <path d="M 175 130 Q 200 110 225 130 L 220 145 L 180 145 Z" fill="${bg}" stroke="${accent}" stroke-width="0.8"/>
      <line x1="135" y1="160" x2="135" y2="310" stroke="${accent}" stroke-width="1.5" stroke-dasharray="2 2"/>
      ${lines}`;
  },
  'first-cardigan': (bg, mid, accent) => {
    let knit = '';
    for (let i = 0; i < 30; i++) knit += `<line x1="${130 + i * 5}" y1="180" x2="${130 + i * 5}" y2="305" stroke="${accent}" stroke-width="0.25" opacity="0.18"/>`;
    let buttons = '';
    for (const y of [180, 215, 250, 285]) buttons += `<circle cx="200" cy="${y}" r="3" fill="${bg}" stroke="${accent}" stroke-width="0.6"/>`;
    return `
      <ellipse cx="200" cy="320" rx="120" ry="5" fill="#000" opacity="0.06"/>
      <path d="M 120 170 L 200 150 L 280 170 L 290 310 L 110 310 Z" fill="${mid}"/>
      <path d="M 120 170 L 70 220 L 90 240 L 130 200 Z" fill="${mid}"/>
      <path d="M 280 170 L 330 220 L 310 240 L 270 200 Z" fill="${mid}"/>
      <line x1="200" y1="155" x2="200" y2="310" stroke="${accent}" stroke-width="0.8"/>
      ${buttons}${knit}`;
  },
  'door-set': (bg, mid, accent) => `
    <ellipse cx="200" cy="340" rx="140" ry="6" fill="#000" opacity="0.05"/>
    <path d="M 90 130 L 200 130 Q 220 130 220 150 L 220 230 Q 220 250 200 250 L 90 250 Q 100 200 90 130 Z" fill="${mid}"/>
    <ellipse cx="280" cy="180" rx="50" ry="22" fill="${mid}"/>
    <rect x="230" y="180" width="100" height="50" fill="${mid}"/>
    <ellipse cx="280" cy="230" rx="50" ry="22" fill="${accent}" opacity="0.15"/>
    <ellipse cx="280" cy="180" rx="50" ry="22" fill="none" stroke="${accent}" stroke-width="0.6" opacity="0.4"/>
    <path d="M 130 280 L 200 280 L 200 320 Z" fill="${mid}"/>
    <path d="M 250 280 L 320 280 L 320 320 Z" fill="${mid}"/>`,
  'plug-set': (bg, mid, accent) => `
    <ellipse cx="200" cy="330" rx="100" ry="6" fill="#000" opacity="0.06"/>
    <rect x="120" y="120" width="160" height="200" rx="14" fill="${mid}"/>
    <rect x="120" y="120" width="160" height="200" rx="14" fill="none" stroke="${accent}" stroke-width="0.6" opacity="0.3"/>
    <circle cx="200" cy="220" r="50" fill="${bg}" stroke="${accent}" stroke-width="1"/>
    <circle cx="200" cy="220" r="36" fill="${accent}" opacity="0.18"/>
    <circle cx="200" cy="220" r="36" fill="none" stroke="${accent}" stroke-width="0.8"/>
    <circle cx="186" cy="220" r="3.5" fill="${accent}"/>
    <circle cx="214" cy="220" r="3.5" fill="${accent}"/>
    <rect x="196" y="180" width="8" height="3" fill="${accent}"/>
    <rect x="196" y="257" width="8" height="3" fill="${accent}"/>`,
  'sun-shade': (bg, mid, accent) => {
    let h = '', v = '';
    for (let i = 0; i < 14; i++) h += `<line x1="102" y1="${125 + i * 11}" x2="298" y2="${125 + i * 11}" stroke="${accent}" stroke-width="0.3" opacity="0.2"/>`;
    for (let i = 0; i < 18; i++) v += `<line x1="${104 + i * 11}" y1="122" x2="${104 + i * 11}" y2="278" stroke="${accent}" stroke-width="0.3" opacity="0.15"/>`;
    return `
      <ellipse cx="200" cy="330" rx="110" ry="6" fill="#000" opacity="0.05"/>
      <rect x="80" y="100" width="240" height="200" rx="6" fill="${accent}" opacity="0.85"/>
      <rect x="92" y="112" width="216" height="176" rx="3" fill="${bg}"/>
      <rect x="100" y="120" width="200" height="160" fill="${mid}" opacity="0.85"/>
      ${h}${v}
      <circle cx="160" cy="170" r="14" fill="${bg}" opacity="0.25"/>
      <circle cx="240" cy="220" r="10" fill="${bg}" opacity="0.25"/>`;
  },
  'mirror': (bg, mid, accent) => `
    <ellipse cx="200" cy="330" rx="110" ry="6" fill="#000" opacity="0.07"/>
    <circle cx="200" cy="200" r="120" fill="${mid}"/>
    <circle cx="200" cy="200" r="92" fill="${bg}" opacity="0.4" stroke="${accent}" stroke-width="1"/>
    <path d="M 140 160 Q 200 130 260 160" stroke="${bg}" stroke-width="14" stroke-linecap="round" opacity="0.6"/>
    <rect x="186" y="320" width="28" height="20" fill="${accent}" rx="3"/>
    <line x1="200" y1="310" x2="200" y2="320" stroke="${accent}" stroke-width="3"/>
    <ellipse cx="200" cy="220" rx="22" ry="26" fill="${accent}" opacity="0.12"/>
    <circle cx="200" cy="200" r="10" fill="${accent}" opacity="0.18"/>`,
};

function illustration(id, palette, className = '', extraStyle = '') {
  const [bg, mid, accent] = palette || ['#EAE2D6', '#C8D5C0', '#2A2A28'];
  const inner = (ILLUSTRATIONS[id] || ILLUSTRATIONS['fjord-04'])(bg, mid, accent);
  return `<div class="${className}" style="background:${bg};${extraStyle}">
    <svg viewBox="0 0 400 400" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">${inner}</svg>
  </div>`;
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
}

function setLang(lang) {
  state.lang = lang;
  renderApp();
}

function openProduct(id) {
  state.activeProduct = PRODUCTS.find(p => p.id === id) || null;
  state.modalImgIdx = 0;
  renderModal();
  document.body.style.overflow = state.activeProduct ? 'hidden' : '';
}

function closeProduct() {
  state.activeProduct = null;
  renderModal();
  document.body.style.overflow = '';
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
      <a href="#" class="tn-logo" data-action="route" data-page="home">${logoWordmark(28, 'var(--ink)')}</a>
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
  const featured = PRODUCTS[0];
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
        <div class="tn-hero-dot-1">${dottedCircle({ size: 140, color: 'var(--accent)', cut: 'right' })}</div>
        <div class="tn-hero-dot-2">${dottedCircle({ size: 90,  color: 'var(--beige)', cut: 'left' })}</div>
        <div class="tn-hero-product-frame" style="background:${THEME.lime}">
          ${illustration(featured.id, featured.palette, 'tn-hero-product-illus')}
        </div>
        <div class="tn-hero-product-meta">
          <div class="tn-hero-product-name">${escapeHtml(featured[state.lang].name)}</div>
          <div class="tn-hero-product-tagline">${escapeHtml(featured[state.lang].tag)}</div>
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
          const sample = PRODUCTS.find(p => p.cat === c.id);
          const illus = sample ? illustration(sample.id, sample.palette, 'tn-cat-card-illus-inner') : '';
          return `
            <button class="tn-cat-card" style="animation-delay:${idx * 60}ms" data-action="category" data-cat="${c.id}">
              <div class="tn-cat-card-illus">${illus}</div>
              <div class="tn-cat-card-foot">
                <div class="tn-cat-card-name">${escapeHtml(c[state.lang])}</div>
                <div class="tn-cat-card-arrow">→</div>
              </div>
              <div class="tn-cat-card-count">${c.count} ${escapeHtml(COPY[state.lang].pieces(c.count))}</div>
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
  const products = PRODUCTS.filter(p => p.cat === cat.id);
  return `
    <section class="tn-catpage">
      <div class="tn-catpage-head">
        <button class="tn-back" data-action="route" data-page="home" data-anchor="catalogue">
          <span>←</span> ${escapeHtml(COPY[state.lang].allCats)}
        </button>
        <div class="tn-eyebrow">${escapeHtml(COPY[state.lang].category)}</div>
        <h1 class="tn-h1 tn-catpage-title"><em>${escapeHtml(cat[state.lang])}</em></h1>
      </div>
      <div class="tn-prod-grid">
        ${products.map((p, idx) => `
          <button class="tn-prod-card" style="animation-delay:${idx * 80}ms" data-action="product" data-id="${p.id}">
            <div class="tn-prod-frame" style="background:${tintColor(p.tint)}">
              ${illustration(p.id, p.palette, 'tn-prod-illus')}
            </div>
            <div class="tn-prod-meta">
              <div class="tn-prod-name">${escapeHtml(p[state.lang].name)}</div>
              <div class="tn-prod-tag">${escapeHtml(p[state.lang].tag)}</div>
            </div>
          </button>`).join('')}
      </div>
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
          ${logoWordmark(32, 'var(--bg)')}
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
  const [a, b, c] = p.palette;
  const variants = [[a, b, c], [b, a, c], [THEME.lime, c, a]];
  const variant = variants[state.modalImgIdx];
  const cat = CATEGORIES.find(x => x.id === p.cat);
  slot.innerHTML = `
    <div class="tn-modal-bg" data-action="close-modal">
      <div class="tn-modal">
        <button class="tn-modal-close" data-action="close-modal" aria-label="Close">×</button>
        <div class="tn-modal-gallery">
          <div class="tn-modal-main" style="background:${tintColor(p.tint)}">
            ${illustration(p.id, variant, 'tn-modal-illus')}
          </div>
          <div class="tn-modal-thumbs">
            ${variants.map((v, i) => `
              <button class="tn-thumb${i === state.modalImgIdx ? ' is-active' : ''}" data-action="thumb" data-idx="${i}" style="background:${tintColor(p.tint)}">
                ${illustration(p.id, v, 'tn-thumb-illus')}
              </button>`).join('')}
          </div>
        </div>
        <div class="tn-modal-info">
          <div class="tn-eyebrow">${escapeHtml(cat[state.lang])}</div>
          <h2 class="tn-h2 tn-modal-title">${escapeHtml(p[state.lang].name)}</h2>
          <p class="tn-modal-tag">${escapeHtml(p[state.lang].tag)}</p>
          <p class="tn-modal-desc">${escapeHtml(p.desc[state.lang])}</p>
          <dl class="tn-spec">
            <div><dt>${escapeHtml(t.materials)}</dt><dd>${escapeHtml(p.materials.join(' · '))}</dd></div>
            <div><dt>${escapeHtml(t.dimensions)}</dt><dd>${escapeHtml(p.dims)}</dd></div>
            <div><dt>${escapeHtml(t.ages)}</dt><dd>${escapeHtml(p.ages)}</dd></div>
            <div><dt>${escapeHtml(t.certifications)}</dt><dd>${escapeHtml(p.certs.join(' · '))}</dd></div>
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
    state.modalImgIdx = parseInt(target.dataset.idx, 10) || 0;
    renderModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && state.activeProduct) closeProduct();
});

// Boot
document.addEventListener('DOMContentLoaded', renderApp);
