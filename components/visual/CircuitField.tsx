import { cn } from "@/lib/cn";

/**
 * The signature backdrop: a circuit board with charge running through it.
 *
 * Four rules shape it:
 *
 *  1. NOT SYMMETRICAL. Every trace is generated independently across the full
 *     width. An earlier version mirrored one half onto the other, which reads
 *     as wallpaper the moment the fold is noticed.
 *
 *  2. NO TWO TRACES CROSS. Each is confined to its own horizontal lane and
 *     never leaves it, so intersections are impossible by construction rather
 *     than by luck. Within its lane a trace still wanders, so the lanes are
 *     never visible as rows.
 *
 *  3. ROUTED AT 45°, NOT IN RIGHT ANGLES. Real boards turn on diagonals, and
 *     it is the difference between a graph and a circuit. Horizontal runs are
 *     joined by exact 45° chamfers with rounded joins.
 *
 *  4. NO TWO TRACES LOOK OR MOVE ALIKE. Weight, opacity, glow, colour and
 *     depth vary per trace; each carries one to three separate charges at
 *     different lengths and speeds, offset so they never line up. That
 *     layering of slow, unsynchronised motion is what makes it hold the eye —
 *     a single pulse per line just looks like a loading bar.
 *
 * Generated at module load from a fixed seed, so server and client produce
 * identical markup and the pattern is stable across reloads.
 */

const W = 1440;
const H = 640;
const LANES = 24;

/** mulberry32 — small, fast, deterministic. */
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Pulse = { dash: number; dur: number; delay: number; width: number };

type Trace = {
  d: string;
  stroke: string;
  width: number;
  opacity: number;
  /** 0 means a hard, sharp line. */
  glow: number;
  pulses: Pulse[];
  pads: { x: number; y: number; r: number; dur: number; delay: number }[];
};

const TONES = [
  "var(--color-blue-500)",
  "var(--color-blue-400)",
  "var(--color-blue-300)",
  "var(--color-gold-500)",
  "var(--color-gold-400)",
  "var(--color-steel-500)",
];

function build(): Trace[] {
  const r = rng(20260826);
  const traces: Trace[] = [];
  const laneH = H / LANES;

  for (let lane = 0; lane < LANES; lane++) {
    const count = r() < 0.5 ? 2 : 1;

    for (let n = 0; n < count; n++) {
      const top = lane * laneH;
      const bandTop = top + laneH * (count === 2 ? (n === 0 ? 0.1 : 0.55) : 0.16);
      const bandH = laneH * (count === 2 ? 0.32 : 0.62);

      const ltr = r() < 0.5;
      const step = ltr ? 1 : -1;
      let x = ltr ? -60 : W + 60;
      let y = bandTop + r() * bandH;

      const d: string[] = [`M${x.toFixed(1)} ${y.toFixed(1)}`];
      const turns = 2 + Math.floor(r() * 3);

      for (let t = 0; t < turns; t++) {
        // Straight run.
        x += step * (90 + r() * 260);
        d.push(`L${x.toFixed(1)} ${y.toFixed(1)}`);

        // 45° chamfer: equal travel in x and y keeps the angle exact.
        const ny = bandTop + r() * bandH;
        const dy = ny - y;
        x += step * Math.abs(dy);
        y = ny;
        d.push(`L${x.toFixed(1)} ${y.toFixed(1)}`);
      }
      x += step * (140 + r() * 320);
      d.push(`L${x.toFixed(1)} ${y.toFixed(1)}`);

      // Depth: a third of the traces sit far back — faint, soft, slow.
      const far = r() < 0.34;
      const bright = r();

      const pulseCount = far ? 1 : 1 + Math.floor(r() * 3);
      const pulses: Pulse[] = [];
      for (let k = 0; k < pulseCount; k++) {
        pulses.push({
          dash: 10 + r() * 78,
          dur: (far ? 16 : 7) + r() * (far ? 12 : 13),
          delay: r() * 22,
          width: 0.6 + r() * 1.0,
        });
      }

      const pads: Trace["pads"] = [];
      if (r() > 0.4) {
        pads.push({ x, y, r: 2.5 + r() * 5, dur: 3 + r() * 5, delay: r() * 6 });
      }

      traces.push({
        d: d.join(" "),
        stroke: TONES[Math.floor(r() * TONES.length)],
        width: far ? 0.35 + r() * 0.35 : 0.45 + r() * 0.8,
        opacity: far ? 0.16 + bright * 0.22 : 0.32 + bright * 0.46,
        glow: far ? 0 : bright > 0.5 ? 1.5 + r() * 4 : 0,
        pulses,
        pads,
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
        maskImage:
          "radial-gradient(ellipse 38% 44% at 50% 46%, transparent 4%, #000 70%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 38% 44% at 50% 46%, transparent 4%, #000 70%)",
      }}
    >
      {TRACES.map((t, i) => (
        <g key={i} strokeLinejoin="round" strokeLinecap="round">
          <path
            d={t.d}
            fill="none"
            stroke={t.stroke}
            strokeWidth={t.width}
            strokeOpacity={t.opacity}
            style={
              t.glow ? { filter: `drop-shadow(0 0 ${t.glow}px ${t.stroke})` } : undefined
            }
          />

          {/* Charges. Several per trace at different lengths and speeds, with
              negative delays so they are already mid-flight on first paint. */}
          {t.pulses.map((p, k) => (
            <path
              key={k}
              d={t.d}
              fill="none"
              stroke={t.stroke}
              strokeWidth={p.width}
              strokeDasharray={`${p.dash} 2200`}
              style={{
                animation: `dash-flow ${p.dur}s linear infinite`,
                animationDelay: `-${p.delay}s`,
                // Charges are deliberately brighter and softer than the trace
                // they run along — the movement is the subject, the board is
                // the setting.
                filter: `drop-shadow(0 0 ${4 + t.glow * 1.4}px ${t.stroke})`,
                opacity: 0.7 + t.opacity * 0.3,
              }}
            />
          ))}

          {t.pads.map((pad, k) => (
            <g
              key={k}
              style={{
                animation: `node-breathe ${pad.dur}s ease-in-out infinite`,
                animationDelay: `-${pad.delay}s`,
              }}
            >
              <circle
                cx={pad.x}
                cy={pad.y}
                r={pad.r}
                fill="none"
                stroke={t.stroke}
                strokeWidth={Math.max(0.5, t.width * 0.85)}
                strokeOpacity={t.opacity + 0.2}
              />
              <circle
                cx={pad.x}
                cy={pad.y}
                r={Math.max(0.8, pad.r * 0.3)}
                fill={t.stroke}
                fillOpacity={t.opacity + 0.3}
              />
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}
