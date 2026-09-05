"use client";

import { cn } from "@/lib/cn";

/**
 * Chips that all glow and fade on their own clocks — a light show rather than
 * a single moving highlight.
 *
 * EVERY chip animates here, unlike the drifting version on the services index
 * where only one per pillar is ever soft. That is affordable for exactly one
 * reason: the thing being animated is the opacity of a glow layer that already
 * exists and never changes. Opacity is composited, so eighty-five of them cost
 * the GPU a blend and the main thread nothing. A blur, or an animated
 * box-shadow, would be a repaint each and could not be done this way — which
 * is why the effect is a glow and the text stays sharp throughout.
 *
 * The timing is deliberately incommensurate. Each chip gets a duration and a
 * delay derived from its index through a small hash, so the periods do not
 * share factors and the pattern never visibly repeats — but it is a hash and
 * not Math.random, so the server and the client agree and React does not
 * re-render everything on hydration.
 */

/**
 * Deterministic 0..1 from a string. Seeded with the chip's own label rather
 * than its index, because the index only runs 0..4 inside a pillar — so
 * seventeen pillars shared six timings between eighty-five chips and the
 * repetition was visible. Measured: six distinct durations before, and one per
 * chip after.
 *
 * A hash rather than Math.random so the server and the client agree.
 */
function hashed(seed: string, salt: number) {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // >>> 0 to shed the sign before normalising.
  return ((h >>> 0) % 100000) / 100000;
}

export function GlowChips({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((d) => {
        // 2.6s-5.4s periods with delays spread across a full cycle, so the
        // block is never all-on or all-off.
        const dur = 2.6 + hashed(d, 1) * 2.8;
        const delay = hashed(d, 2) * -5.4;
        return (
          <li
            key={d}
            className="relative rounded-full border border-line px-3 py-1.5 text-[12px] text-steel-400"
          >
            <span
              aria-hidden
              className="chip-glow"
              style={
                {
                  "--dur": `${dur.toFixed(2)}s`,
                  "--delay": `${delay.toFixed(2)}s`,
                } as React.CSSProperties
              }
            />
            <span className="relative">{d}</span>
          </li>
        );
      })}
    </ul>
  );
}
