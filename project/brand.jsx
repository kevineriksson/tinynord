// Tinynord brand graphics — logo mark, wavy hills, dotted circle motif

// The Tinynord glyph: an asymmetric circle with two cut-out sectors that read like a stylised "co" / infinity.
// Reproduced from the brandbook screenshots.
const TinynordMark = ({ size = 28, color = 'currentColor', style }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} fill="none" style={style} aria-hidden="true">
    {/* Two interlocking shapes: left semicircle with notch, right semicircle with notch */}
    <path d="M 32 4 C 16.5 4 4 16.5 4 32 C 4 47.5 16.5 60 32 60 L 32 44 C 25 44 19 38.5 19 32 C 19 25 25 19 32 19 Z" fill={color} />
    <path d="M 32 60 C 47.5 60 60 47.5 60 32 C 60 16.5 47.5 4 32 4 L 32 19 C 39 19 45 25 45 32 C 45 38.5 39 44 32 44 Z" fill={color} />
  </svg>
);

// Tinynord wordmark = mark + "tinynord" in Mulish
const TinynordLogo = ({ height = 32, color = 'currentColor', compact = false, style }) => {
  if (compact) {
    return <TinynordMark size={height} color={color} style={style} />;
  }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: height * 0.22, color, ...style }}>
      <TinynordMark size={height * 0.95} color={color} />
      <span style={{
        fontFamily: 'Mulish, system-ui, sans-serif',
        fontWeight: 700,
        fontSize: height * 0.78,
        letterSpacing: '-0.025em',
        lineHeight: 1,
        color,
      }}>tinynord</span>
    </span>
  );
};

// Wavy hills — signature graphic motif from brandbook
// variant: 'lines' (just stroked curves) | 'filled' (dotted/striped solid hills)
const WavyHills = ({ color = '#D0D15F', variant = 'lines', opacity = 1, style }) => {
  if (variant === 'lines') {
    return (
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block', ...style }} aria-hidden="true">
        <g fill="none" stroke={color} strokeWidth="1" opacity={opacity}>
          <path d="M 0 100 C 200 60 400 130 600 100 S 1000 70 1240 110 L 1440 90" />
          <path d="M 0 130 C 240 90 460 160 720 130 S 1100 110 1440 140" opacity="0.7" />
          <path d="M 0 160 C 300 130 540 190 820 165 S 1200 145 1440 170" opacity="0.5" />
          <path d="M 0 80  C 220 50 480 105 780 78 S 1180 60 1440 80"  opacity="0.6" />
          <circle cx="930" cy="100" r="4" fill={color} stroke="none" opacity="0.7" />
          <circle cx="970" cy="118" r="3" fill={color} stroke="none" opacity="0.5" />
        </g>
      </svg>
    );
  }
  // filled — dotted hill bands
  return (
    <svg viewBox="0 0 1440 220" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block', ...style }} aria-hidden="true">
      <defs>
        <pattern id="tn-hill-dots" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.1" fill={color} />
        </pattern>
        <pattern id="tn-hill-stripes" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke={color} strokeWidth="1.4" />
        </pattern>
      </defs>
      <path d="M 0 200 C 240 120 480 180 720 150 S 1200 110 1440 160 L 1440 220 L 0 220 Z" fill="url(#tn-hill-stripes)" opacity={opacity * 0.85} />
      <path d="M 0 220 C 300 160 540 210 820 180 S 1200 150 1440 200 L 1440 220 L 0 220 Z" fill="url(#tn-hill-dots)" opacity={opacity} />
    </svg>
  );
};

// Dotted half-circle — primary graphic element from brandbook
const DottedCircle = ({ size = 120, color = '#D0D15F', cut = 'right', dotSize = 4, style }) => {
  const cx = 50, cy = 50, r = 44;
  const dots = [];
  // grid of dots clipped to circle - "cut" sector removed
  for (let y = 0; y <= 100; y += 6) {
    for (let x = 0; x <= 100; x += 6) {
      const dx = x - cx, dy = y - cy;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > r) continue;
      // remove a triangular sector
      if (cut === 'right' && x > cx && Math.abs(dy) < dx * 0.6) continue;
      if (cut === 'left'  && x < cx && Math.abs(dy) < (cx - x) * 0.6) continue;
      if (cut === 'top'   && y < cy && Math.abs(dx) < (cy - y) * 0.6) continue;
      if (cut === 'none') {/* full */}
      dots.push(<circle key={`${x}-${y}`} cx={x} cy={y} r={dotSize / 4} fill={color} />);
    }
  }
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={style} aria-hidden="true">
      {dots}
    </svg>
  );
};

// "a world of wonders" slogan — dot · text · dot
const Slogan = ({ text, color = 'currentColor', size = 16, style }) => (
  <span style={{
    fontFamily: 'Mulish, system-ui, sans-serif',
    fontStyle: 'italic',
    fontWeight: 400,
    fontSize: size,
    letterSpacing: '0.02em',
    color,
    display: 'inline-flex',
    alignItems: 'center',
    gap: size * 0.5,
    ...style,
  }}>
    <span style={{ width: size * 0.25, height: size * 0.25, borderRadius: '50%', background: color, display: 'inline-block' }} />
    {text}
    <span style={{ width: size * 0.25, height: size * 0.25, borderRadius: '50%', background: color, display: 'inline-block' }} />
  </span>
);

window.TinynordBrand = { TinynordMark, TinynordLogo, WavyHills, DottedCircle, Slogan };
