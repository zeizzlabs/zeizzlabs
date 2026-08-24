import { cn } from "@/lib/cn";

/**
 * The signature backdrop: orthogonal circuit traces with terminal pads, drawn
 * to echo the ZeizzLabs brand board. Pure SVG so it stays crisp at any size and
 * costs nothing to animate (dash offset + opacity only).
 *
 * Traces frame the left and right edges in a 1200x760 viewBox, the way the
 * brand banner does. The two sides are authored separately rather than one
 * being a reflection of the other — a mirrored field reads as wallpaper the
 * moment the fold down the middle is noticed.
 */

type Trace = { d: string; tone: "blue" | "gold" | "steel"; dur: number; r?: number };

const LEFT: Trace[] = [
  { d: "M-10 70 H150 L210 130 H330", tone: "blue", dur: 5.5, r: 7 },
  { d: "M-10 140 H90 L150 200 H250", tone: "gold", dur: 7, r: 6 },
  { d: "M-10 220 H180 L230 270 H300", tone: "blue", dur: 6.2, r: 5 },
  { d: "M-10 300 H120 L170 350 H270", tone: "gold", dur: 8, r: 7 },
  { d: "M-10 400 H70 L130 460 H220", tone: "steel", dur: 9, r: 5 },
  { d: "M-10 500 H200 L250 550 H320", tone: "blue", dur: 6.8, r: 6 },
  { d: "M-10 600 H110 L160 650 H240", tone: "gold", dur: 7.6, r: 5 },
  { d: "M-10 700 H260 L300 660 H360", tone: "blue", dur: 8.4, r: 6 },
  { d: "M-10 105 H210 L245 145 H310", tone: "steel", dur: 10.5, r: 4 },
  { d: "M-10 255 H60 L105 300 H185", tone: "gold", dur: 6.6, r: 5 },
  { d: "M-10 350 H155 L200 395 H285", tone: "blue", dur: 9.8, r: 6 },
  { d: "M-10 545 H85 L135 595 H210", tone: "steel", dur: 7.2, r: 4 },
  { d: "M-10 645 H230 L275 690 H345", tone: "gold", dur: 11.2, r: 5 },
];

/** Different heights, lengths, tones and speeds — not a reflection of LEFT. */
const RIGHT: Trace[] = [
  { d: "M1210 40 H1080 L1030 100 H930", tone: "gold", dur: 6.4, r: 5 },
  { d: "M1210 175 H1030 L980 235 H900", tone: "blue", dur: 9.2, r: 7 },
  { d: "M1210 260 H1120 L1075 305 H985", tone: "steel", dur: 7.1, r: 4 },
  { d: "M1210 355 H1010 L965 400 H880", tone: "blue", dur: 5.9, r: 6 },
  { d: "M1210 465 H1105 L1050 520 H950", tone: "gold", dur: 8.8, r: 5 },
  { d: "M1210 560 H1040 L995 605 H915", tone: "blue", dur: 6.6, r: 7 },
  { d: "M1210 690 H1140 L1090 640 H1000", tone: "gold", dur: 7.9, r: 5 },
  { d: "M1210 105 H1150 L1105 150 H1020", tone: "steel", dur: 10.1, r: 4 },
  { d: "M1210 220 H1075 L1025 265 H960", tone: "gold", dur: 6.1, r: 5 },
  { d: "M1210 415 H1160 L1115 460 H1030", tone: "blue", dur: 11.6, r: 6 },
  { d: "M1210 620 H1090 L1045 665 H975", tone: "steel", dur: 7.4, r: 4 },
];

const tones = {
  blue: "var(--color-blue-500)",
  gold: "var(--color-gold-500)",
  steel: "var(--color-steel-500)",
} as const;

function Side({ traces, side }: { traces: Trace[]; side: "l" | "r" }) {
  return (
    <g>
      {traces.map((t, i) => {
        const stroke = tones[t.tone];
        // End pad sits at the last coordinate pair in the path string.
        const nums = t.d.match(/-?\d+(\.\d+)?/g)!.map(Number);
        const ex = nums[nums.length - 2];
        const ey = nums[nums.length - 1];
        return (
          <g key={`${side}-${i}`}>
            <path
              d={t.d}
              fill="none"
              stroke={stroke}
              strokeWidth={1.4}
              strokeOpacity={0.5}
              strokeLinecap="square"
            />
            {/* The charge is drawn twice: a long, dim wake that lifts the
                trace as it approaches and fades behind, and a short bright
                head riding just ahead of it. Together they read as current
                lighting the line rather than a dot sliding along it. */}
            <path
              d={t.d}
              fill="none"
              stroke={stroke}
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeDasharray="86 400"
              strokeOpacity={0.3}
              style={{
                animation: `dash-flow ${t.dur}s linear infinite`,
                animationDelay: `-${i * 0.55 + 0.2}s`,
                filter: `drop-shadow(0 0 7px ${stroke})`,
              }}
            />
            <path
              d={t.d}
              fill="none"
              stroke={stroke}
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeDasharray="24 462"
              style={{
                animation: `dash-flow ${t.dur}s linear infinite`,
                animationDelay: `-${i * 0.55}s`,
                filter: `drop-shadow(0 0 4px ${stroke}) drop-shadow(0 0 12px ${stroke})`,
                opacity: 0.95,
              }}
            />
            <circle
              cx={ex}
              cy={ey}
              r={t.r ?? 6}
              fill="none"
              stroke={stroke}
              strokeWidth={1.6}
              strokeOpacity={0.75}
            />
            <circle cx={ex} cy={ey} r={1.8} fill={stroke} fillOpacity={0.9} />
          </g>
        );
      })}
    </g>
  );
}

export function CircuitField({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 760"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{
        maskImage:
          "radial-gradient(ellipse 62% 62% at 50% 45%, transparent 8%, #000 72%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 62% 62% at 50% 45%, transparent 8%, #000 72%)",
      }}
    >
      <Side traces={LEFT} side="l" />
      <Side traces={RIGHT} side="r" />
    </svg>
  );
}
