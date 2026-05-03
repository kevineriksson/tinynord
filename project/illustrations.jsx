// Tinynord product illustrations — abstract, palette-driven SVG placeholders
// Each illustration accepts a palette [bg, mid, accent] and a productId hint

const Illustration = ({ id, palette, vary = 0, className, style }) => {
  const [bg, mid, accent] = palette || ['#EAE2D6','#C8D5C0','#2A2A28'];
  const seed = (id || '').charCodeAt(0) || 1;

  // Map product ids to specific illustrations
  const map = {
    'fjord-04':       <Stroller bg={bg} mid={mid} accent={accent} />,
    'tundra-go':      <Buggy bg={bg} mid={mid} accent={accent} />,
    'rain-cover':     <RainCover bg={bg} mid={mid} accent={accent} />,
    'footmuff-arctic':<Footmuff bg={bg} mid={mid} accent={accent} />,
    'moln-cot':       <Cot bg={bg} mid={mid} accent={accent} />,
    'cloud-mobile':   <Mobile bg={bg} mid={mid} accent={accent} />,
    'soft-tub':       <Tub bg={bg} mid={mid} accent={accent} />,
    'linen-towel':    <Towel bg={bg} mid={mid} accent={accent} />,
    'first-bowl':     <Bowl bg={bg} mid={mid} accent={accent} />,
    'sip-cup':        <Cup bg={bg} mid={mid} accent={accent} />,
    'sleep-bag':      <SleepBag bg={bg} mid={mid} accent={accent} />,
    'first-cardigan': <Cardigan bg={bg} mid={mid} accent={accent} />,
    'door-set':       <DoorSet bg={bg} mid={mid} accent={accent} />,
    'plug-set':       <Plug bg={bg} mid={mid} accent={accent} />,
    'sun-shade':      <SunShade bg={bg} mid={mid} accent={accent} />,
    'mirror':         <Mirror bg={bg} mid={mid} accent={accent} />,
  };

  return (
    <div className={className} style={{ background: bg, ...(style || {}) }}>
      <svg viewBox="0 0 400 400" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        {map[id] || <Stroller bg={bg} mid={mid} accent={accent} />}
        {/* Subtle grain */}
        <rect width="400" height="400" fill="url(#grain-pat)" opacity="0.04" />
        <defs>
          <pattern id="grain-pat" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.5" fill="#000" />
            <circle cx="20" cy="14" r="0.5" fill="#000" />
            <circle cx="32" cy="28" r="0.5" fill="#000" />
            <circle cx="8" cy="34" r="0.5" fill="#000" />
          </pattern>
        </defs>
      </svg>
    </div>
  );
};

// ─── product drawings ──────────────────────────────────────────────────────
const Stroller = ({ bg, mid, accent }) => (
  <g>
    <ellipse cx="200" cy="330" rx="120" ry="6" fill="#000" opacity="0.08" />
    {/* Carrycot body */}
    <path d="M 100 200 Q 100 160 140 160 L 280 160 Q 320 160 320 200 L 320 240 Q 320 250 310 250 L 110 250 Q 100 250 100 240 Z" fill={mid} />
    <path d="M 100 200 Q 100 160 140 160 L 220 160 Q 200 200 195 250 L 110 250 Q 100 250 100 240 Z" fill={accent} opacity="0.12" />
    {/* Handle */}
    <path d="M 320 220 Q 350 180 340 130" stroke={accent} strokeWidth="6" fill="none" strokeLinecap="round" />
    <circle cx="340" cy="130" r="6" fill={accent} />
    {/* Wheels */}
    <circle cx="140" cy="290" r="36" fill={accent} />
    <circle cx="140" cy="290" r="14" fill={bg} />
    <circle cx="280" cy="290" r="36" fill={accent} />
    <circle cx="280" cy="290" r="14" fill={bg} />
    {/* Strut */}
    <line x1="160" y1="250" x2="155" y2="285" stroke={accent} strokeWidth="4" />
    <line x1="260" y1="250" x2="265" y2="285" stroke={accent} strokeWidth="4" />
    {/* Trim */}
    <line x1="120" y1="220" x2="300" y2="220" stroke={accent} strokeWidth="1" opacity="0.3" />
  </g>
);

const Buggy = ({ bg, mid, accent }) => (
  <g>
    <ellipse cx="200" cy="335" rx="110" ry="5" fill="#000" opacity="0.08" />
    {/* Seat back */}
    <path d="M 145 100 L 175 100 L 230 250 L 200 250 Z" fill={accent} />
    {/* Seat */}
    <path d="M 145 220 L 280 220 L 270 270 L 160 270 Z" fill={mid} />
    {/* Handle */}
    <path d="M 145 100 Q 130 95 130 110" stroke={accent} strokeWidth="6" fill="none" strokeLinecap="round" />
    {/* Frame legs */}
    <line x1="170" y1="250" x2="140" y2="310" stroke={accent} strokeWidth="5" strokeLinecap="round" />
    <line x1="260" y1="250" x2="290" y2="310" stroke={accent} strokeWidth="5" strokeLinecap="round" />
    <line x1="200" y1="265" x2="200" y2="305" stroke={accent} strokeWidth="3" />
    {/* Wheels */}
    <circle cx="140" cy="310" r="20" fill={accent} />
    <circle cx="200" cy="310" r="14" fill={accent} />
    <circle cx="290" cy="310" r="20" fill={accent} />
    <circle cx="140" cy="310" r="6" fill={bg} />
    <circle cx="290" cy="310" r="6" fill={bg} />
  </g>
);

const RainCover = ({ bg, mid, accent }) => (
  <g>
    <ellipse cx="200" cy="320" rx="100" ry="5" fill="#000" opacity="0.06" />
    {/* Translucent dome */}
    <path d="M 110 260 Q 110 130 200 130 Q 290 130 290 260 Z" fill={mid} opacity="0.4" stroke={accent} strokeWidth="1.5" />
    <path d="M 200 130 L 200 260" stroke={accent} strokeWidth="0.8" opacity="0.4" />
    {/* Zip */}
    <line x1="200" y1="135" x2="200" y2="220" stroke={accent} strokeWidth="2" strokeDasharray="3 2" />
    <circle cx="200" cy="220" r="4" fill={accent} />
    {/* Drips */}
    <circle cx="140" cy="170" r="3" fill={accent} opacity="0.3" />
    <circle cx="260" cy="200" r="3" fill={accent} opacity="0.3" />
    <circle cx="170" cy="240" r="2" fill={accent} opacity="0.3" />
  </g>
);

const Footmuff = ({ bg, mid, accent }) => (
  <g>
    <ellipse cx="200" cy="335" rx="110" ry="5" fill="#000" opacity="0.06" />
    {/* Body */}
    <path d="M 130 130 Q 130 110 150 110 L 250 110 Q 270 110 270 130 L 270 310 Q 270 325 255 325 L 145 325 Q 130 325 130 310 Z" fill={mid} />
    {/* Wool fleece collar */}
    <path d="M 130 130 Q 130 110 150 110 L 250 110 Q 270 110 270 130 L 270 145 Q 270 155 250 158 Q 200 150 150 158 Q 130 155 130 145 Z" fill={bg} stroke={accent} strokeWidth="0.5" opacity="0.9" />
    {/* Zipper */}
    <line x1="200" y1="160" x2="200" y2="310" stroke={accent} strokeWidth="1.5" strokeDasharray="2 2" />
    <circle cx="200" cy="310" r="5" fill={accent} />
    {/* Fleece dots inside */}
    <circle cx="155" cy="135" r="2" fill={accent} opacity="0.2" />
    <circle cx="245" cy="138" r="2" fill={accent} opacity="0.2" />
  </g>
);

const Cot = ({ bg, mid, accent }) => (
  <g>
    <ellipse cx="200" cy="330" rx="120" ry="5" fill="#000" opacity="0.07" />
    {/* Base */}
    <rect x="80" y="160" width="240" height="14" rx="2" fill={accent} />
    <rect x="80" y="270" width="240" height="14" rx="2" fill={accent} />
    {/* Slats */}
    {Array.from({length: 11}).map((_, i) => (
      <rect key={i} x={92 + i * 22} y="174" width="3.5" height="96" fill={accent} opacity="0.85" />
    ))}
    {/* Posts */}
    <rect x="80" y="140" width="14" height="160" rx="3" fill={accent} />
    <rect x="306" y="140" width="14" height="160" rx="3" fill={accent} />
    {/* Mattress */}
    <rect x="100" y="220" width="200" height="48" rx="4" fill={mid} />
    <rect x="120" y="225" width="160" height="6" rx="2" fill={bg} opacity="0.6" />
    {/* Soft toy on mattress */}
    <circle cx="245" cy="248" r="10" fill={bg} opacity="0.85" />
    <circle cx="241" cy="245" r="1.5" fill={accent} />
    <circle cx="249" cy="245" r="1.5" fill={accent} />
  </g>
);

const Mobile = ({ bg, mid, accent }) => (
  <g>
    {/* Cord */}
    <line x1="200" y1="40" x2="200" y2="130" stroke={accent} strokeWidth="1" />
    {/* Ring */}
    <ellipse cx="200" cy="150" rx="100" ry="14" fill="none" stroke={accent} strokeWidth="3" />
    <ellipse cx="200" cy="150" rx="100" ry="14" fill="none" stroke={accent} strokeWidth="1" opacity="0.3" />
    {/* Cords */}
    <line x1="120" y1="156" x2="120" y2="220" stroke={accent} strokeWidth="0.6" />
    <line x1="160" y1="160" x2="160" y2="260" stroke={accent} strokeWidth="0.6" />
    <line x1="200" y1="162" x2="200" y2="240" stroke={accent} strokeWidth="0.6" />
    <line x1="240" y1="160" x2="240" y2="290" stroke={accent} strokeWidth="0.6" />
    <line x1="280" y1="156" x2="280" y2="230" stroke={accent} strokeWidth="0.6" />
    {/* Clouds */}
    <ellipse cx="120" cy="230" rx="20" ry="14" fill={mid} />
    <ellipse cx="160" cy="270" rx="22" ry="15" fill={bg} stroke={accent} strokeWidth="0.5" opacity="0.95" />
    <ellipse cx="200" cy="250" rx="18" ry="13" fill={mid} opacity="0.7" />
    <ellipse cx="240" cy="300" rx="22" ry="15" fill={bg} stroke={accent} strokeWidth="0.5" opacity="0.95" />
    <ellipse cx="280" cy="240" rx="20" ry="14" fill={mid} />
    {/* Cloud bumps */}
    <circle cx="115" cy="225" r="6" fill={mid} />
    <circle cx="156" cy="265" r="7" fill={bg} stroke={accent} strokeWidth="0.5" />
    <circle cx="244" cy="295" r="7" fill={bg} stroke={accent} strokeWidth="0.5" />
    <circle cx="285" cy="235" r="6" fill={mid} />
  </g>
);

const Tub = ({ bg, mid, accent }) => (
  <g>
    <ellipse cx="200" cy="320" rx="130" ry="6" fill="#000" opacity="0.06" />
    {/* Outer */}
    <path d="M 80 180 Q 80 270 200 290 Q 320 270 320 180 Z" fill={mid} />
    {/* Inner */}
    <path d="M 110 200 Q 110 260 200 275 Q 290 260 290 200 Z" fill={bg} opacity="0.7" />
    {/* Spout */}
    <path d="M 80 180 Q 70 180 65 195 L 80 200 Z" fill={mid} />
    {/* Water ripple */}
    <path d="M 130 235 Q 165 230 200 235 T 270 235" stroke={accent} strokeWidth="1.2" fill="none" opacity="0.35" />
    <path d="M 145 250 Q 180 246 215 250 T 260 250" stroke={accent} strokeWidth="1" fill="none" opacity="0.25" />
    {/* Suction marks */}
    <circle cx="120" cy="260" r="3" fill={accent} opacity="0.25" />
    <circle cx="280" cy="260" r="3" fill={accent} opacity="0.25" />
  </g>
);

const Towel = ({ bg, mid, accent }) => (
  <g>
    <ellipse cx="200" cy="335" rx="110" ry="5" fill="#000" opacity="0.06" />
    {/* Folded towel */}
    <path d="M 110 130 L 290 130 L 280 320 L 120 320 Z" fill={mid} />
    {/* Hood point */}
    <path d="M 170 130 L 200 100 L 230 130 Z" fill={mid} />
    <path d="M 170 130 L 200 100 L 230 130 Z" fill={accent} opacity="0.1" />
    {/* Linen weave lines */}
    {Array.from({length: 12}).map((_, i) => (
      <line key={i} x1="118" y1={150 + i * 14} x2="282" y2={150 + i * 14} stroke={accent} strokeWidth="0.4" opacity="0.18" />
    ))}
    {Array.from({length: 14}).map((_, i) => (
      <line key={i} x1={120 + i * 12} y1="135" x2={120 + i * 12} y2="318" stroke={accent} strokeWidth="0.4" opacity="0.12" />
    ))}
    {/* Tag */}
    <rect x="262" y="280" width="14" height="22" rx="1" fill={bg} stroke={accent} strokeWidth="0.5" />
  </g>
);

const Bowl = ({ bg, mid, accent }) => (
  <g>
    <ellipse cx="200" cy="290" rx="130" ry="8" fill="#000" opacity="0.08" />
    {/* Bowl body */}
    <path d="M 90 180 Q 90 270 200 280 Q 310 270 310 180 Z" fill={mid} />
    <ellipse cx="200" cy="180" rx="110" ry="22" fill={bg} stroke={accent} strokeWidth="1" />
    <ellipse cx="200" cy="180" rx="100" ry="18" fill={accent} opacity="0.08" />
    {/* Spoon */}
    <path d="M 320 110 Q 350 130 340 165" stroke={accent} strokeWidth="6" fill="none" strokeLinecap="round" />
    <ellipse cx="338" cy="180" rx="14" ry="10" transform="rotate(20 338 180)" fill={accent} />
  </g>
);

const Cup = ({ bg, mid, accent }) => (
  <g>
    <ellipse cx="200" cy="330" rx="80" ry="5" fill="#000" opacity="0.07" />
    {/* Glass */}
    <path d="M 140 130 L 260 130 L 250 310 Q 250 320 240 320 L 160 320 Q 150 320 150 310 Z" fill={bg} opacity="0.4" stroke={accent} strokeWidth="1.5" />
    {/* Silicone collar */}
    <rect x="142" y="180" width="116" height="40" fill={mid} />
    {/* Liquid */}
    <path d="M 158 280 L 242 280 L 246 300 Q 246 310 240 310 L 160 310 Q 154 310 154 300 Z" fill={accent} opacity="0.3" />
    {/* Top ellipse */}
    <ellipse cx="200" cy="130" rx="60" ry="6" fill="none" stroke={accent} strokeWidth="1.5" />
  </g>
);

const SleepBag = ({ bg, mid, accent }) => (
  <g>
    <ellipse cx="200" cy="335" rx="115" ry="5" fill="#000" opacity="0.07" />
    {/* Body */}
    <path d="M 130 140 L 270 140 L 280 320 L 120 320 Z" fill={mid} />
    {/* Sleeve openings */}
    <path d="M 130 140 Q 100 145 100 175 L 130 175 Z" fill={mid} />
    <path d="M 270 140 Q 300 145 300 175 L 270 175 Z" fill={mid} />
    {/* Neck */}
    <path d="M 175 130 Q 200 110 225 130 L 220 145 L 180 145 Z" fill={bg} stroke={accent} strokeWidth="0.8" />
    {/* Side zip */}
    <line x1="135" y1="160" x2="135" y2="310" stroke={accent} strokeWidth="1.5" strokeDasharray="2 2" />
    {/* Subtle merino texture lines */}
    {Array.from({length: 8}).map((_, i) => (
      <line key={i} x1="130" y1={170 + i * 20} x2="270" y2={170 + i * 20} stroke={accent} strokeWidth="0.3" opacity="0.15" />
    ))}
  </g>
);

const Cardigan = ({ bg, mid, accent }) => (
  <g>
    <ellipse cx="200" cy="320" rx="120" ry="5" fill="#000" opacity="0.06" />
    {/* Body */}
    <path d="M 120 170 L 200 150 L 280 170 L 290 310 L 110 310 Z" fill={mid} />
    {/* Sleeves */}
    <path d="M 120 170 L 70 220 L 90 240 L 130 200 Z" fill={mid} />
    <path d="M 280 170 L 330 220 L 310 240 L 270 200 Z" fill={mid} />
    {/* Center opening */}
    <line x1="200" y1="155" x2="200" y2="310" stroke={accent} strokeWidth="0.8" />
    {/* Buttons */}
    {[180, 215, 250, 285].map(y => <circle key={y} cx="200" cy={y} r="3" fill={bg} stroke={accent} strokeWidth="0.6" />)}
    {/* Knit ribbing texture */}
    {Array.from({length: 30}).map((_, i) => (
      <line key={i} x1={130 + i * 5} y1="180" x2={130 + i * 5} y2="305" stroke={accent} strokeWidth="0.25" opacity="0.18" />
    ))}
  </g>
);

const DoorSet = ({ bg, mid, accent }) => (
  <g>
    {/* Two corner caps + door stopper + finger guard, arranged as a flat-lay */}
    <ellipse cx="200" cy="340" rx="140" ry="6" fill="#000" opacity="0.05" />
    {/* Finger guard (long C) */}
    <path d="M 90 130 L 200 130 Q 220 130 220 150 L 220 230 Q 220 250 200 250 L 90 250 Q 100 200 90 130 Z" fill={mid} />
    {/* Stopper (cylinder seen from side) */}
    <ellipse cx="280" cy="180" rx="50" ry="22" fill={mid} />
    <rect x="230" y="180" width="100" height="50" fill={mid} />
    <ellipse cx="280" cy="230" rx="50" ry="22" fill={accent} opacity="0.15" />
    <ellipse cx="280" cy="180" rx="50" ry="22" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.4" />
    {/* Corner cap (triangle) */}
    <path d="M 130 280 L 200 280 L 200 320 Z" fill={mid} />
    <path d="M 250 280 L 320 280 L 320 320 Z" fill={mid} />
  </g>
);

const Plug = ({ bg, mid, accent }) => (
  <g>
    <ellipse cx="200" cy="330" rx="100" ry="6" fill="#000" opacity="0.06" />
    {/* Outlet plate */}
    <rect x="120" y="120" width="160" height="200" rx="14" fill={mid} />
    <rect x="120" y="120" width="160" height="200" rx="14" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.3" />
    {/* Round outlet */}
    <circle cx="200" cy="220" r="50" fill={bg} stroke={accent} strokeWidth="1" />
    {/* The plug cover (translucent) */}
    <circle cx="200" cy="220" r="36" fill={accent} opacity="0.18" />
    <circle cx="200" cy="220" r="36" fill="none" stroke={accent} strokeWidth="0.8" />
    {/* Two pin holes */}
    <circle cx="186" cy="220" r="3.5" fill={accent} />
    <circle cx="214" cy="220" r="3.5" fill={accent} />
    {/* Earth contact tabs */}
    <rect x="196" y="180" width="8" height="3" fill={accent} />
    <rect x="196" y="257" width="8" height="3" fill={accent} />
  </g>
);

const SunShade = ({ bg, mid, accent }) => (
  <g>
    <ellipse cx="200" cy="330" rx="110" ry="6" fill="#000" opacity="0.05" />
    {/* Window frame */}
    <rect x="80" y="100" width="240" height="200" rx="6" fill={accent} opacity="0.85" />
    <rect x="92" y="112" width="216" height="176" rx="3" fill={bg} />
    {/* Linen shade */}
    <rect x="100" y="120" width="200" height="160" fill={mid} opacity="0.85" />
    {/* Linen weave */}
    {Array.from({length: 14}).map((_, i) => (
      <line key={`h${i}`} x1="102" y1={125 + i * 11} x2="298" y2={125 + i * 11} stroke={accent} strokeWidth="0.3" opacity="0.2" />
    ))}
    {Array.from({length: 18}).map((_, i) => (
      <line key={`v${i}`} x1={104 + i * 11} y1="122" x2={104 + i * 11} y2="278" stroke={accent} strokeWidth="0.3" opacity="0.15" />
    ))}
    {/* Light dapples */}
    <circle cx="160" cy="170" r="14" fill={bg} opacity="0.25" />
    <circle cx="240" cy="220" r="10" fill={bg} opacity="0.25" />
  </g>
);

const Mirror = ({ bg, mid, accent }) => (
  <g>
    <ellipse cx="200" cy="330" rx="110" ry="6" fill="#000" opacity="0.07" />
    {/* Frame */}
    <circle cx="200" cy="200" r="120" fill={mid} />
    {/* Mirror */}
    <circle cx="200" cy="200" r="92" fill={bg} opacity="0.4" stroke={accent} strokeWidth="1" />
    {/* Reflection arc */}
    <path d="M 140 160 Q 200 130 260 160" stroke={bg} strokeWidth="14" strokeLinecap="round" opacity="0.6" />
    {/* Mount */}
    <rect x="186" y="320" width="28" height="20" fill={accent} rx="3" />
    <line x1="200" y1="310" x2="200" y2="320" stroke={accent} strokeWidth="3" />
    {/* Inner reflection (suggesting baby) */}
    <ellipse cx="200" cy="220" rx="22" ry="26" fill={accent} opacity="0.12" />
    <circle cx="200" cy="200" r="10" fill={accent} opacity="0.18" />
  </g>
);

window.TinynordIllustration = Illustration;
