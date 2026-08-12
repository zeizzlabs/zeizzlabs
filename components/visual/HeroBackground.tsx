/**
 * Hero backdrop — a sophisticated, GPU-friendly ambient environment:
 * drifting gradient blobs, a masked technical grid, and animated circuit
 * traces. Pure CSS/SVG, no canvas, no dependency. Decorative + aria-hidden.
 * All motion is paused under prefers-reduced-motion (see globals.css).
 */
export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Technical grid, radially masked so it fades at the edges */}
      <div className="absolute inset-0 grid-lines opacity-[0.5]" />

      {/* Drifting gradient blobs — the brand's colour energy, blurred way down */}
      <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(108,53,255,0.35),transparent_60%)] blur-3xl animate-drift" />
      <div className="absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(20,155,255,0.28),transparent_60%)] blur-3xl animate-drift-slow" />
      <div className="absolute -right-32 top-1/4 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(213,43,255,0.22),transparent_60%)] blur-3xl animate-drift" />
      <div className="absolute bottom-0 right-1/4 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(255,122,24,0.16),transparent_60%)] blur-3xl animate-drift-slow" />

      {/* Circuit traces */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.35]"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="trace" x1="0" y1="0" x2="1200" y2="800">
            <stop stopColor="#149bff" />
            <stop offset="0.5" stopColor="#6c35ff" />
            <stop offset="1" stopColor="#d52bff" />
          </linearGradient>
        </defs>
        <g stroke="url(#trace)" strokeWidth="1.2">
          <path className="animate-dash" d="M0 160 H260 L320 220 H520" />
          <path className="animate-dash" d="M1200 620 H940 L880 560 H660" />
          <path className="animate-dash" d="M120 800 V620 L180 560 V420" />
          <path className="animate-dash" d="M1080 0 V180 L1020 240 V360" />
        </g>
        <g fill="url(#trace)">
          <circle cx="520" cy="220" r="3" />
          <circle cx="660" cy="560" r="3" />
          <circle cx="180" cy="420" r="3" />
          <circle cx="1020" cy="360" r="3" />
        </g>
      </svg>

      {/* Top + bottom vignette to seat everything into the page */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg-950 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg-950 to-transparent" />
    </div>
  );
}
