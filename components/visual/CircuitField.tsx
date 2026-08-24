import { cn } from "@/lib/cn";

/**
 * The signature backdrop: orthogonal circuit traces with terminal pads, drawn
 * to echo the ZeizzLabs brand board. Pure SVG so it stays crisp at any size and
 * costs nothing to animate (dash offset + opacity only).
 *
 * Traces are authored in a 1200x760 viewBox and mirrored, so the left and right
 * edges frame the content the way the brand banner does.
 */

type Trace = { d: string; tone: "blue" | "gold" | "steel"; dur: number; r?: number };

const LEFT: Trace[] = [
  { d: "M-10 60 H150 L210 120 H360 L400 90 H520", tone: "blue", dur: 5.5, r: 7 },
  { d: "M-10 130 H90 L150 190 H270", tone: "gold", dur: 7, r: 6 },
  { d: "M-10 195 H210 L255 240 H330 L370 205 H470", tone: "steel", dur: 9.5, r: 5 },
  { d: "M-10 260 H130 L185 315 H300", tone: "blue", dur: 6.2, r: 5 },
  { d: "M-10 330 H240 L285 375 H420", tone: "gold", dur: 8, r: 7 },
  { d: "M-10 395 H70 L130 455 H250 L290 425 H400", tone: "blue", dur: 6.9, r: 6 },
  { d: "M-10 460 H175 L215 500 H310", tone: "steel", dur: 10.5, r: 5 },
  { d: "M-10 530 H200 L250 580 H360", tone: "blue", dur: 6.8, r: 6 },
  { d: "M-10 600 H110 L160 650 H280 L320 620 H430", tone: "gold", dur: 7.6, r: 5 },
  { d: "M-10 675 H160 L205 720 H320", tone: "blue", dur: 8.4, r: 6 },
  { d: "M-10 740 H260 L300 700 H400", tone: "steel", dur: 11, r: 4 },
];

const tones = {
  blue: "var(--color-blue-500)",
  gold: "var(--color-gold-500)",
  steel: "var(--color-steel-500)",
} as const;

function Side({ mirror }: { mirror?: boolean }) {
  return (
    <g transform={mirror ? "translate(1200,0) scale(-1,1)" : undefined}>
      {LEFT.map((t, i) => {
        const stroke = tones[t.tone];
        // End pad sits at the last coordinate pair in the path string.
        const nums = t.d.match(/-?\d+(\.\d+)?/g)!.map(Number);
        const ex = nums[nums.length - 2];
        const ey = nums[nums.length - 1];
        return (
          <g key={`${mirror ? "r" : "l"}-${i}`}>
            <path
              d={t.d}
              fill="none"
              stroke={stroke}
              strokeWidth={1.4}
              strokeOpacity={0.42}
              strokeLinecap="square"
            />
            {/* Travelling pulse along the same path. */}
            <path
              d={t.d}
              fill="none"
              stroke={stroke}
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="34 520"
              style={{
                animation: `dash-flow ${t.dur}s linear infinite`,
                animationDelay: `${i * 0.42}s`,
                filter: "drop-shadow(0 0 6px currentColor)",
                color: stroke,
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
        // Opened up: at 62% the mask cleared almost the whole viewport and the
        // field only survived as a thin frame at the edges.
        maskImage:
          "radial-gradient(ellipse 46% 50% at 50% 45%, transparent 4%, #000 68%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 46% 50% at 50% 45%, transparent 4%, #000 68%)",
      }}
    >
      <Side />
      <Side mirror />
    </svg>
  );
}
