"use client";

import { useEffect, useState } from "react";

/**
 * Drifts a handful of items out of focus and back, at intervals with no
 * catchable rhythm.
 *
 * WHY NOT PURE CSS. Giving every chip its own infinite animation is one line,
 * and it is the wrong line: with eighty-odd chips on the services page, every
 * one of them is blurring on its own clock forever, and a `filter: blur()` is
 * a repaint, not a composite. That is precisely the class of always-running
 * repaint that made this site shimmer on a phone.
 *
 * So the effect is inverted. At most `concurrent` items are ever mid-drift —
 * the rest are perfectly static and cost nothing — and a single timer walks
 * the list picking the next one. Three chips easing between two states is
 * cheap on any device.
 *
 * RANDOMNESS. A uniform interval is legible within a few seconds, so both the
 * gap to the next pick and how long an item stays soft are drawn fresh each
 * time from a range. Picks avoid whatever is already drifting, which stops the
 * same chip pulsing twice and keeps the movement spread across the block.
 *
 * The state is a set of indices; what a "soft" item looks like is left to the
 * caller, so this can drive a blur, an opacity, a scale or all three.
 */
export function useRandomFocus(
  count: number,
  {
    concurrent = 3,
    gap = [420, 1500] as [number, number],
    hold = [900, 2200] as [number, number],
    enabled = true,
  } = {}
) {
  const [soft, setSoft] = useState<ReadonlySet<number>>(() => new Set());

  useEffect(() => {
    if (!enabled || count === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /**
     * State is mirrored in a ref and the scheduling happens outside the React
     * updater.
     *
     * The first version scheduled the un-blur from inside `setSoft`, which is
     * a side effect in an updater. React invokes updaters twice in
     * development, so every pick created two release timers against one entry
     * — and measured, that left seventeen chips permanently soft instead of
     * drifting: the average and the maximum were the same number, which is the
     * signature of something stuck rather than moving.
     */
    const live = new Set<number>();
    let alive = true;
    const timers = new Set<number>();
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const commit = () => setSoft(new Set(live));

    const release = (idx: number) => {
      const t = window.setTimeout(() => {
        timers.delete(t);
        if (!alive) return;
        live.delete(idx);
        commit();
      }, rand(hold[0], hold[1]));
      timers.add(t);
    };

    const pick = () => {
      if (!alive) return;

      if (live.size < concurrent) {
        // Choose among the sharp ones, so nothing is picked twice and the
        // drift stays spread across the block rather than clustering.
        const free: number[] = [];
        for (let i = 0; i < count; i++) if (!live.has(i)) free.push(i);
        if (free.length) {
          const idx = free[Math.floor(Math.random() * free.length)];
          live.add(idx);
          commit();
          release(idx);
        }
      }

      const t = window.setTimeout(() => {
        timers.delete(t);
        pick();
      }, rand(gap[0], gap[1]));
      timers.add(t);
    };

    // Stagger the first pick so several blocks on one page do not share a beat.
    const start = window.setTimeout(pick, rand(0, gap[1]));
    timers.add(start);

    return () => {
      alive = false;
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, [count, concurrent, gap, hold, enabled]);

  return soft;
}
