import { cn } from "@/lib/cn";

/**
 * The signature backdrop: circuit traces travelling across the page.
 *
 * Three rules shape it, and they are the whole point of the file:
 *
 *  1. NOT SYMMETRICAL. An earlier version drew one set of traces and mirrored
 *     it, which reads as wallpaper the moment you notice the fold. Every trace
 *     here is generated independently across the full width.
 *
 *  2. NO TWO TRACES CROSS. Each one is confined to its own horizontal lane and
 *     never leaves it, so intersections are impossible by construction rather
 *     than by luck. Within its lane a trace still jogs up and down, so the
 *     lanes are not visible as rows.
 *
 *  3. NO TWO TRACES LOOK ALIKE. Weight, opacity, glow, colour, direction of
 *     travel and pulse speed all vary per trace. Some are hairlines with no
 *     glow at all, some are bright and soft-edged, and a few carry no pulse so
 *     the movement never falls into a rhythm.
 *
 * Generated at module load from a fixed seed, so the server and the client
 * produce byte-identical markup and hydration stays quiet.
 */

// Close to the aspect these sections actually occupy, so `slice` crops as
// little as possible — a taller box lost half its lanes off the top and bottom.
const W = 1440;
const H = 640;
const LANES = 22;

/** mulberry32 — small, fast, and deterministic for a given seed. */
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Trace = {
  d: string;
  stroke: string;
  width: number;
  opacity: number;
  /** Blur radius for the glow; 0 means a hard, sharp line. */
  glow: number;
  /** Seconds for one pulse pass; 0 means no pulse on this trace. */
  dur: number;
  delay: number;
  pad: { x: number; y: number; r: number } | null;
  dash: number;
};

const TONES = [
  "var(--color-blue-500)",
  "var(--color-blue-400)",
  "var(--color-gold-500)",
  "var(--color-gold-400)",
  "var(--color-steel-500)",
];

function build(): Trace[] {
  const r = rng(20260825);
  const traces: Trace[] = [];
  const laneH = H / LANES;

  for (let lane = 0; lane < LANES; lane++) {
    // One or two traces per lane, sharing it without overlapping vertically.
    const count = r() < 0.55 ? 2 : 1;
    for (let n = 0; n < count; n++) {
      const top = lane * laneH;
      // Sub-band, inset so a trace never touches its lane's edges and so two
      // traces sharing a lane keep clear of one another.
      const bandTop = top + laneH * (count === 2 ? (n === 0 ? 0.12 : 0.56) : 0.2);
      const bandH = laneH * (count === 2 ? 0.3 : 0.55);

      const leftToRight = r() < 0.55;
      let x = leftToRight ? -40 : W + 40;
      const step = leftToRight ? 1 : -1;
      let y = bandTop + r() * bandH;

      const pts: string[] = [`M${x.toFixed(0)} ${y.toFixed(0)}`];
      const jogs = 1 + Math.floor(r() * 3);
      for (let j = 0; j < jogs; j++) {
        x += step * (110 + r() * 300);
        pts.push(`H${x.toFixed(0)}`);
        // Stay inside the sub-band — this is what guarantees no crossings.
        y = bandTop + r() * bandH;
        pts.push(`V${y.toFixed(0)}`);
      }
      x += step * (120 + r() * 340);
      pts.push(`H${x.toFixed(0)}`);

      const bright = r();
      const hasGlow = bright > 0.55;
      const hasPulse = r() > 0.22;

      traces.push({
        d: pts.join(" "),
        stroke: TONES[Math.floor(r() * TONES.length)],
        width: 0.8 + r() * 2.1,
        opacity: 0.26 + bright * 0.52,
        glow: hasGlow ? 2 + r() * 5 : 0,
        dur: hasPulse ? 5 + r() * 11 : 0,
        delay: r() * 9,
        dash: 20 + r() * 40,
        pad:
          r() > 0.45
            ? { x, y, r: 3 + Math.floor(r() * 8) }
            : null,
      });
    }
  }
  return traces;
}

const TRACES = build();

export function CircuitField({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{
        // Only fades the very centre, where headlines sit.
        maskImage:
          "radial-gradient(ellipse 38% 44% at 50% 46%, transparent 4%, #000 70%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 38% 44% at 50% 46%, transparent 4%, #000 70%)",
      }}
    >
      {TRACES.map((t, i) => (
        <g key={i}>
          <path
            d={t.d}
            fill="none"
            stroke={t.stroke}
            strokeWidth={t.width}
            strokeOpacity={t.opacity}
            strokeLinecap="square"
            style={
              t.glow
                ? { filter: `drop-shadow(0 0 ${t.glow}px ${t.stroke})` }
                : undefined
            }
          />

          {/* The travelling charge. Absent on some traces on purpose. */}
          {t.dur > 0 && (
            <path
              d={t.d}
              fill="none"
              stroke={t.stroke}
              strokeWidth={t.width + 0.6}
              strokeLinecap="round"
              strokeDasharray={`${t.dash} ${1400}`}
              style={{
                animation: `dash-flow ${t.dur}s linear infinite`,
                animationDelay: `-${t.delay}s`,
                filter: `drop-shadow(0 0 ${3 + t.glow}px ${t.stroke})`,
                opacity: 0.5 + t.opacity * 0.7,
              }}
            />
          )}

          {t.pad && (
            <>
              <circle
                cx={t.pad.x}
                cy={t.pad.y}
                r={t.pad.r}
                fill="none"
                stroke={t.stroke}
                strokeWidth={Math.max(1, t.width * 0.9)}
                strokeOpacity={t.opacity + 0.18}
              />
              <circle
                cx={t.pad.x}
                cy={t.pad.y}
                r={Math.max(1, t.pad.r * 0.28)}
                fill={t.stroke}
                fillOpacity={t.opacity + 0.25}
              />
            </>
          )}
        </g>
      ))}
    </svg>
  );
}
