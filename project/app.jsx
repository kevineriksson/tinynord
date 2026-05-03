// Tinynord — main app components

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// Brandbook palette themes
const THEMES = {
  cream: { bg: '#F7F1E5', surface: '#FFFFFF', ink: '#231F20', muted: '#959791', accent: '#D0D15F', lime: '#D0D15F', beige: '#E3D8D1', lightgrey: '#F7F1E5' },
  beige: { bg: '#E3D8D1', surface: '#F7F1E5', ink: '#231F20', muted: '#959791', accent: '#D0D15F', lime: '#D0D15F', beige: '#E3D8D1', lightgrey: '#F7F1E5' },
  white: { bg: '#FFFFFF', surface: '#F7F1E5', ink: '#231F20', muted: '#959791', accent: '#D0D15F', lime: '#D0D15F', beige: '#E3D8D1', lightgrey: '#F7F1E5' },
  dark:  { bg: '#231F20', surface: '#2D2829', ink: '#F7F1E5', muted: '#959791', accent: '#D0D15F', lime: '#D0D15F', beige: '#E3D8D1', lightgrey: '#F7F1E5' },
};

const FONT_WEIGHTS = {
  bold:  { display: 700, body: 400 },
  medium:{ display: 600, body: 400 },
  light: { display: 500, body: 300 },
};

// ─── Header ───────────────────────────────────────────────────────────────
const Header = ({ route, setRoute, lang, setLang, theme }) => {
  const t = window.TINYNORD.BRAND_COPY[lang];
  const { TinynordLogo } = window.TinynordBrand;
  const items = [
    { id: 'home', label: t.nav.catalogue },
    { id: 'about', label: t.nav.about },
    { id: 'retailers', label: t.nav.retailers },
  ];
  return (
    <header className="tn-header">
      <a href="#" onClick={(e) => { e.preventDefault(); setRoute({ page: 'home' }); }} className="tn-logo">
        <TinynordLogo height={28} color={theme.ink} />
      </a>
      <nav className="tn-nav">
        {items.map(it => (
          <a key={it.id} href={`#${it.id}`}
             onClick={(e) => { e.preventDefault(); setRoute({ page: it.id }); }}
             className={'tn-nav-link' + (route.page === it.id || (it.id === 'home' && route.page === 'category') ? ' is-active' : '')}>
            {it.label}
          </a>
        ))}
      </nav>
      <div className="tn-lang">
        <button onClick={() => setLang('en')} className={'tn-lang-btn' + (lang === 'en' ? ' is-active' : '')}>EN</button>
        <span className="tn-lang-sep">·</span>
        <button onClick={() => setLang('et')} className={'tn-lang-btn' + (lang === 'et' ? ' is-active' : '')}>ET</button>
      </div>
    </header>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────
const Hero = ({ lang, theme, variant, setRoute }) => {
  const t = window.TINYNORD.BRAND_COPY[lang].hero;
  const featured = window.TINYNORD.PRODUCTS[0];
  const I = window.TinynordIllustration;
  const { DottedCircle, Slogan } = window.TinynordBrand;

  if (variant === 'typographic') {
    return (
      <section className="tn-hero tn-hero--type">
        <DottedCircle size={140} color={theme.accent} cut="right" style={{ position: 'absolute', top: 0, left: 60 }} />
        <DottedCircle size={120} color={theme.beige} cut="left" style={{ position: 'absolute', top: 80, right: 80 }} />
        <div className="tn-hero-eyebrow" style={{ justifyContent: 'center' }}>{t.eyebrow}</div>
        <h1 className="tn-h1 tn-hero-title-big">
          {t.title.map((l, i) => <span key={i}>{i === t.title.length - 1 ? <em>{l}</em> : l}</span>)}
        </h1>
        <div style={{ marginTop: 32 }}>
          <Slogan text={window.TINYNORD.BRAND_COPY[lang].slogan} color={theme.ink} size={18} />
        </div>
        <p className="tn-hero-lede tn-hero-lede--center">{t.lede}</p>
        <button className="tn-cta" onClick={() => setRoute({ page: 'home', anchor: 'catalogue' })}>{t.cta} <span>→</span></button>
      </section>
    );
  }

  if (variant === 'fullbleed') {
    return (
      <section className="tn-hero tn-hero--fullbleed">
        <div className="tn-hero-fb-image" style={{ background: theme.lime }}>
          <I id={featured.id} palette={featured.palette} className="tn-hero-fb-illus" />
        </div>
        <div className="tn-hero-fb-card">
          <div className="tn-hero-eyebrow">{t.eyebrow}</div>
          <h1 className="tn-h1">
            {t.title.map((l, i) => <span key={i}>{i === t.title.length - 1 ? <em>{l}</em> : l}{i < t.title.length - 1 ? <br/> : null}</span>)}
          </h1>
          <p className="tn-hero-lede">{t.lede}</p>
          <button className="tn-cta" onClick={() => setRoute({ page: 'home', anchor: 'catalogue' })}>{t.cta} <span>→</span></button>
        </div>
      </section>
    );
  }

  return (
    <section className="tn-hero tn-hero--split">
      <div className="tn-hero-text">
        <div className="tn-hero-eyebrow">{t.eyebrow}</div>
        <h1 className="tn-h1">
          {t.title.map((l, i) => <span key={i}>{i === t.title.length - 1 ? <em>{l}</em> : l}{i < t.title.length - 1 ? <br/> : null}</span>)}
        </h1>
        <p className="tn-hero-lede">{t.lede}</p>
        <p className="tn-hero-lede tn-hero-lede--small">{t.lede2}</p>
        <button className="tn-cta" onClick={() => setRoute({ page: 'home', anchor: 'catalogue' })}>{t.cta} <span>→</span></button>
      </div>
      <div className="tn-hero-product">
        <DottedCircle size={140} color={theme.accent} cut="right" style={{ position: 'absolute', top: -40, right: -40, zIndex: 1 }} />
        <DottedCircle size={90} color={theme.beige} cut="left" style={{ position: 'absolute', bottom: 60, left: -40, zIndex: 1, opacity: 0.85 }} />
        <div className="tn-hero-product-frame" style={{ background: theme.lime }}>
          <I id={featured.id} palette={featured.palette} className="tn-hero-product-illus" />
        </div>
        <div className="tn-hero-product-meta">
          <div className="tn-hero-product-name">{featured[lang].name}</div>
          <div className="tn-hero-product-tagline">{featured[lang].tag}</div>
        </div>
      </div>
    </section>
  );
};

// ─── Slogan band ─────────────────────────────────────────────────────────
const SloganBand = ({ lang, theme }) => {
  const { Slogan, WavyHills } = window.TinynordBrand;
  const slogan = window.TINYNORD.BRAND_COPY[lang].slogan;
  return (
    <div className="tn-slogan-band">
      <div className="tn-slogan-band-hills"><WavyHills color={theme.ink} variant="lines" opacity={0.35} /></div>
      <div className="tn-slogan-band-text">
        <Slogan text={slogan} color={theme.ink} size={28} />
      </div>
    </div>
  );
};

// ─── Category Grid ────────────────────────────────────────────────────────
const CategoryGrid = ({ lang, theme, setRoute }) => {
  const t = window.TINYNORD.BRAND_COPY[lang].catalogue;
  const cats = window.TINYNORD.CATEGORIES;
  const products = window.TINYNORD.PRODUCTS;
  const I = window.TinynordIllustration;

  return (
    <section className="tn-cats" id="catalogue">
      <div className="tn-section-head">
        <div className="tn-eyebrow">{t.eyebrow}</div>
        <h2 className="tn-h2">{t.title.split('\n').map((l,i) => <span key={i}>{l}<br/></span>)}</h2>
        <p className="tn-section-sub">{t.sub}</p>
      </div>
      <div className="tn-cat-grid">
        {cats.map((c, idx) => {
          const sample = products.find(p => p.cat === c.id);
          return (
            <a key={c.id} href={`#${c.id}`}
               onClick={(e) => { e.preventDefault(); setRoute({ page: 'category', cat: c.id }); }}
               className="tn-cat-card"
               style={{ background: theme.beige, animationDelay: `${idx * 60}ms` }}>
              <div className="tn-cat-card-illus">
                {sample && <I id={sample.id} palette={sample.palette} className="tn-cat-card-illus-inner" />}
              </div>
              <div className="tn-cat-card-foot">
                <div className="tn-cat-card-name">{c[lang]}</div>
                <div className="tn-cat-card-arrow">→</div>
              </div>
              <div className="tn-cat-card-count">{c.count} {lang === 'en' ? (c.count === 1 ? 'piece' : 'pieces') : 'toodet'}</div>
            </a>
          );
        })}
      </div>
    </section>
  );
};

// ─── Category Page ────────────────────────────────────────────────────────
const CategoryPage = ({ lang, theme, route, setRoute, openProduct }) => {
  const cat = window.TINYNORD.CATEGORIES.find(c => c.id === route.cat);
  const products = window.TINYNORD.PRODUCTS.filter(p => p.cat === route.cat);
  const I = window.TinynordIllustration;
  if (!cat) return null;

  return (
    <section className="tn-catpage">
      <div className="tn-catpage-head">
        <button className="tn-back" onClick={() => setRoute({ page: 'home', anchor: 'catalogue' })}>
          <span>←</span> {lang === 'en' ? 'All categories' : 'K\u00f5ik kategooriad'}
        </button>
        <div className="tn-eyebrow">{lang === 'en' ? 'Category' : 'Kategooria'}</div>
        <h1 className="tn-h1 tn-catpage-title"><em>{cat[lang]}</em></h1>
      </div>
      <div className="tn-prod-grid">
        {products.map((p, idx) => (
          <button key={p.id} className="tn-prod-card" style={{ animationDelay: `${idx * 80}ms` }} onClick={() => openProduct(p)}>
            <div className="tn-prod-frame" style={{ background: theme[p.tint] || theme.lightgrey }}>
              <I id={p.id} palette={p.palette} className="tn-prod-illus" />
            </div>
            <div className="tn-prod-meta">
              <div className="tn-prod-name">{p[lang].name}</div>
              <div className="tn-prod-tag">{p[lang].tag}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

// ─── Product Modal ────────────────────────────────────────────────────────
const ProductModal = ({ product, lang, theme, onClose }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const I = window.TinynordIllustration;
  const t = window.TINYNORD.BRAND_COPY[lang].modal;
  const variants = useMemo(() => {
    if (!product) return [];
    const [a, b, c] = product.palette;
    return [[a, b, c], [b, a, c], [theme.lime, c, a]];
  }, [product, theme]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    setImgIdx(0);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="tn-modal-bg" onClick={onClose}>
      <div className="tn-modal" onClick={(e) => e.stopPropagation()}>
        <button className="tn-modal-close" onClick={onClose} aria-label="Close">×</button>
        <div className="tn-modal-gallery">
          <div className="tn-modal-main" style={{ background: theme[product.tint] || theme.lightgrey }}>
            <I id={product.id} palette={variants[imgIdx]} className="tn-modal-illus" />
          </div>
          <div className="tn-modal-thumbs">
            {variants.map((v, i) => (
              <button key={i} className={'tn-thumb' + (i === imgIdx ? ' is-active' : '')} onClick={() => setImgIdx(i)} style={{ background: theme[product.tint] || theme.lightgrey }}>
                <I id={product.id} palette={v} className="tn-thumb-illus" />
              </button>
            ))}
          </div>
        </div>
        <div className="tn-modal-info">
          <div className="tn-eyebrow">{window.TINYNORD.CATEGORIES.find(c => c.id === product.cat)[lang]}</div>
          <h2 className="tn-h2 tn-modal-title">{product[lang].name}</h2>
          <p className="tn-modal-tag">{product[lang].tag}</p>
          <p className="tn-modal-desc">{product.desc[lang]}</p>
          <dl className="tn-spec">
            <div><dt>{t.materials}</dt><dd>{product.materials.join(' \u00b7 ')}</dd></div>
            <div><dt>{t.dimensions}</dt><dd>{product.dims}</dd></div>
            <div><dt>{t.ages}</dt><dd>{product.ages}</dd></div>
            <div><dt>{t.certifications}</dt><dd>{product.certs.join(' \u00b7 ')}</dd></div>
          </dl>
        </div>
      </div>
    </div>
  );
};

// ─── About / Story ───────────────────────────────────────────────────────
const About = ({ lang, theme }) => {
  const t = window.TINYNORD.BRAND_COPY[lang].about;
  return (
    <section className="tn-about" id="about">
      <div className="tn-about-grid">
        <div>
          <div className="tn-eyebrow">{t.eyebrow}</div>
          <h2 className="tn-h2">{t.title.split('\n').map((l,i) => <span key={i}>{l}<br/></span>)}</h2>
          <div className="tn-voice-tags">
            {t.voice.map(v => <span key={v} className="tn-voice-tag">{v}</span>)}
          </div>
        </div>
        <div className="tn-about-body">
          <p>{t.body}</p>
          <p>{t.body2}</p>
        </div>
      </div>
    </section>
  );
};

// ─── Values ──────────────────────────────────────────────────────────────
const Values = ({ lang, theme }) => {
  const t = window.TINYNORD.BRAND_COPY[lang].values;
  const { DottedCircle } = window.TinynordBrand;
  const cuts = ['right', 'left', 'top', 'right', 'left', 'top'];
  return (
    <section className="tn-values">
      <div className="tn-section-head tn-section-head--center">
        <div className="tn-eyebrow">{t.eyebrow}</div>
        <h2 className="tn-h2">{t.title.split('\n').map((l,i) => <span key={i}>{l}<br/></span>)}</h2>
      </div>
      <div className="tn-values-grid">
        {t.items.map((it, i) => (
          <div key={it.t} className="tn-value-card" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="tn-value-icon">
              <DottedCircle size={36} color={theme.ink} cut={cuts[i]} dotSize={2.5} />
            </div>
            <div className="tn-value-t">{it.t}</div>
            <p className="tn-value-b">{it.b}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Retailers ────────────────────────────────────────────────────────────
const Retailers = ({ lang, theme }) => {
  const t = window.TINYNORD.BRAND_COPY[lang].retailers;
  const retailers = window.TINYNORD.RETAILERS;
  const placeholders = 7;

  return (
    <section className="tn-retailers" id="retailers">
      <div className="tn-section-head tn-section-head--center">
        <div className="tn-eyebrow">{t.eyebrow}</div>
        <h2 className="tn-h2">{t.title.split('\n').map((l,i) => <span key={i}>{l}<br/></span>)}</h2>
        <p className="tn-section-sub">{t.body}</p>
      </div>
      <div className="tn-ret-grid">
        {retailers.map(r => (
          <a key={r.name} href={r.url} target="_blank" rel="noreferrer" className="tn-ret-card">
            <div className="tn-ret-logo" style={{ background: theme.lime }}>
              <span className="tn-ret-name">{r.name}</span>
              <span className="tn-ret-flag" aria-hidden>{r.flag}</span>
            </div>
            <div className="tn-ret-foot">
              <div className="tn-ret-country">{r.country}</div>
              <div className="tn-ret-tag">{r.tagline}</div>
            </div>
          </a>
        ))}
        {Array.from({length: placeholders}).map((_, i) => (
          <div key={`ph-${i}`} className="tn-ret-card tn-ret-card--ph">
            <div className="tn-ret-logo tn-ret-logo--ph">
              <div className="tn-ret-ph-line" />
              <div className="tn-ret-ph-sub">{lang === 'en' ? 'Spot reserved' : 'Koht reserveeritud'}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="tn-ret-cta">
        {t.empty}<a href="#contact">{t.emptyLink}</a>
      </p>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────
const Footer = ({ lang, theme, setRoute }) => {
  const t = window.TINYNORD.BRAND_COPY[lang].footer;
  const cats = window.TINYNORD.CATEGORIES.slice(0, 4);
  const { TinynordLogo, WavyHills, Slogan } = window.TinynordBrand;
  return (
    <footer className="tn-footer">
      <div className="tn-footer-hills"><WavyHills color={theme.accent} variant="lines" opacity={0.5} /></div>
      <div className="tn-footer-top">
        <div className="tn-footer-brand">
          <TinynordLogo height={32} color={theme.bg} />
          <div className="tn-footer-tag" style={{ marginTop: 20 }}><Slogan text={t.tagline} color={theme.accent} size={16} /></div>
          <p className="tn-footer-addr">{t.addr}</p>
        </div>
        <div className="tn-footer-cols">
          <div>
            <div className="tn-footer-h">{t.cols.catalogue}</div>
            <ul>
              {cats.map(c => <li key={c.id}><a href={`#${c.id}`} onClick={(e) => { e.preventDefault(); setRoute({ page: 'category', cat: c.id }); }}>{c[lang]}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="tn-footer-h">{t.cols.company}</div>
            <ul>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); setRoute({ page: 'about' }); }}>{lang==='en'?'About':'Lugu'}</a></li>
              <li><a href="#retailers" onClick={(e) => { e.preventDefault(); setRoute({ page: 'retailers' }); }}>{lang==='en'?'Retailers':'M\u00fc\u00fcjad'}</a></li>
              <li><a href="#sustain">{lang==='en'?'Sustainability':'J\u00e4tkusuutlikkus'}</a></li>
            </ul>
          </div>
          <div>
            <div className="tn-footer-h">{t.cols.contact}</div>
            <ul>
              <li><a href="mailto:hello@tinynord.com">hello@tinynord.com</a></li>
              <li><a href="#">+372 5555 0123</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="tn-footer-bot">
        <span>{t.legal}</span>
        <span>Pantone 13-0648 · 13-0400 · 13-064B</span>
      </div>
    </footer>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────
const App = () => {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "theme": "cream",
    "weight": "bold",
    "heroVariant": "split"
  }/*EDITMODE-END*/;
  const [tweak, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const [route, _setRoute] = useState({ page: 'home' });
  const [lang, setLang] = useState('en');
  const [activeProduct, setActiveProduct] = useState(null);

  const theme = THEMES[tweak.theme] || THEMES.cream;
  const weights = FONT_WEIGHTS[tweak.weight] || FONT_WEIGHTS.bold;

  const setRoute = useCallback((r) => {
    _setRoute(r);
    requestAnimationFrame(() => {
      if (r.anchor) {
        const el = document.getElementById(r.anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
  }, []);

  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--bg', theme.bg);
    r.style.setProperty('--surface', theme.surface);
    r.style.setProperty('--ink', theme.ink);
    r.style.setProperty('--muted', theme.muted);
    r.style.setProperty('--accent', theme.accent);
    r.style.setProperty('--lime', theme.lime);
    r.style.setProperty('--beige', theme.beige);
    r.style.setProperty('--lightgrey', theme.lightgrey);
    document.querySelectorAll('.tn-h1, .tn-h2, .tn-cat-card-name, .tn-prod-name, .tn-value-t, .tn-ret-name, .tn-hero-product-name')
      .forEach(el => el.style.fontWeight = weights.display);
  }, [theme, weights]);

  return (
    <div className="tn-app" style={{ background: theme.bg, color: theme.ink }}>
      <Header route={route} setRoute={setRoute} lang={lang} setLang={setLang} theme={theme} />
      <main className="tn-main" key={route.page + (route.cat || '')}>
        {route.page === 'home' && (
          <>
            <Hero lang={lang} theme={theme} variant={tweak.heroVariant} setRoute={setRoute} />
            <SloganBand lang={lang} theme={theme} />
            <CategoryGrid lang={lang} theme={theme} setRoute={setRoute} />
            <About lang={lang} theme={theme} />
            <Values lang={lang} theme={theme} />
          </>
        )}
        {route.page === 'category' && (
          <CategoryPage lang={lang} theme={theme} route={route} setRoute={setRoute} openProduct={setActiveProduct} />
        )}
        {route.page === 'about' && (
          <>
            <About lang={lang} theme={theme} />
            <Values lang={lang} theme={theme} />
          </>
        )}
        {route.page === 'retailers' && (
          <Retailers lang={lang} theme={theme} />
        )}
      </main>
      <Footer lang={lang} theme={theme} setRoute={setRoute} />
      <ProductModal product={activeProduct} lang={lang} theme={theme} onClose={() => setActiveProduct(null)} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme" />
        <TweakRadio label="Background" value={tweak.theme}
          options={[
            {value: 'cream', label: 'Light grey'},
            {value: 'beige', label: 'Beige'},
            {value: 'white', label: 'White'},
            {value: 'dark',  label: 'Dark'},
          ]}
          onChange={(v) => setTweak('theme', v)} />
        <TweakSection label="Typography" />
        <TweakRadio label="Weight" value={tweak.weight}
          options={[
            {value: 'bold',   label: 'CeraPRO Bold'},
            {value: 'medium', label: 'Medium'},
            {value: 'light',  label: 'Light'},
          ]}
          onChange={(v) => setTweak('weight', v)} />
        <TweakSection label="Hero layout" />
        <TweakRadio label="Variant" value={tweak.heroVariant}
          options={[
            {value: 'split',       label: 'Split'},
            {value: 'typographic', label: 'Type only'},
            {value: 'fullbleed',   label: 'Full-bleed'},
          ]}
          onChange={(v) => setTweak('heroVariant', v)} />
      </TweaksPanel>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
