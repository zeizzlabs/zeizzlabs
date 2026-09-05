"use client";

import { useRandomFocus } from "@/components/motion/RandomFocus";
import { cn } from "@/lib/cn";

/**
 * A row of deliverable chips where a few drift softly out of focus and back,
 * on no discernible schedule.
 *
 * The blur is deliberately small. Past about 2px the text stops being readable
 * rather than reading as depth, and a chip nobody can read is a chip nobody
 * scans — the point is that the block feels alive, not that individual words
 * disappear. The paired opacity and scale do most of the work; the blur only
 * softens the edge.
 *
 * `concurrent` is the cost control: only ever this many chips are animating,
 * so a pillar with five deliverables and a page with seventeen pillars still
 * has a handful of transitions running at once rather than eighty-five.
 */
export function DriftingChips({
  items,
  className,
  chipClassName,
  concurrent = 1,
}: {
  items: string[];
  className?: string;
  chipClassName?: string;
  concurrent?: number;
}) {
  /**
   * One at a time per pillar, with long quiet gaps.
   *
   * The services page renders seventeen of these, and each instance keeps its
   * own clock — so a cap of two per pillar meant thirty-four chips blurring
   * simultaneously, measured. A blur is a repaint, and thirty-four of them on
   * a phone is the same mistake this site has already been fixed for once.
   * One per pillar, mostly resting, leaves a handful drifting page-wide at any
   * moment, which is all the effect needs.
   */
  const soft = useRandomFocus(items.length, {
    concurrent,
    gap: [1200, 4200],
    hold: [900, 2000],
  });

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((d, i) => (
        <li
          key={d}
          className={cn(
            "rounded-full border border-line px-3 py-1.5 text-[12px] text-steel-400",
            // Transitioned, not animated: the hook decides when, so each chip
            // only ever eases between two states and is otherwise inert.
            "transition-[filter,opacity,transform] duration-[900ms] ease-[var(--ease-out-expo)]",
            "motion-reduce:transition-none",
            soft.has(i)
              ? "opacity-45 blur-[1.5px] scale-[0.985]"
              : "opacity-100 blur-0 scale-100",
            chipClassName
          )}
        >
          {d}
        </li>
      ))}
    </ul>
  );
}
