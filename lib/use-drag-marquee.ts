"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * A marquee the reader can take hold of.
 *
 * The track drifts on its own, but everything about how it moves is a
 * velocity, not a schedule — so a finger can push it faster, drag it backwards,
 * slow it by leaning against it, or stop it dead, and when the finger lifts it
 * eases back to its own pace instead of snapping. A CSS animation cannot do any
 * of that: `animationPlayState` is binary, and there is no way to add a
 * finger's momentum to a keyframe.
 *
 * The model is one number. `velocity` is pixels per second; the resting value
 * is `base`. While dragging, position is written straight from the finger and
 * velocity is measured from it. On release, velocity keeps whatever the flick
 * gave it and decays exponentially back to `base` — so a hard flick runs on and
 * settles, and a slow drag rejoins the drift almost immediately.
 *
 * COST. One rAF loop writing one transform, and only while the rail is on
 * screen — an IntersectionObserver stops it otherwise. Transform writes do not
 * force layout or repaint, which matters on this site: the shimmer that took
 * three attempts to find was a backdrop-filter re-blurring over animating
 * content, not movement itself.
 *
 * The track must contain exactly two copies of its content. Position wraps at
 * half the scroll width, so the second copy is standing where the first was and
 * the seam is never visible.
 */
export function useDragMarquee({
  /** Resting speed in px/s. Positive drifts right, negative drifts left. */
  base,
  enabled = true,
}: {
  base: number;
  enabled?: boolean;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  const offset = useRef(0);
  const velocity = useRef(base);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const lastT = useRef(0);
  const moved = useRef(0);
  const inView = useRef(true);

  // Kept in a ref so changing the resting speed never restarts the loop.
  const baseRef = useRef(base);
  useEffect(() => {
    baseRef.current = base;
  }, [base]);

  useEffect(() => {
    const el = track.current;
    const view = viewport.current;
    if (!el || !view || !enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let prev = performance.now();

    const io = new IntersectionObserver(([e]) => (inView.current = e.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(view);

    const frame = (now: number) => {
      // Clamped: a backgrounded tab returns with a huge delta, which would
      // teleport the track a screen or more on the first frame back.
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;

      if (inView.current) {
        if (!dragging.current) {
          // Ease back toward the resting drift. Frame-rate independent, so a
          // 120Hz phone and a 60Hz one settle over the same wall time.
          const k = 1 - Math.exp(-dt / 0.45);
          velocity.current += (baseRef.current - velocity.current) * k;
          offset.current += velocity.current * dt;
        }

        // Half the scroll width is one full copy of the content.
        const half = el.scrollWidth / 2;
        if (half > 0) {
          if (offset.current <= -half) offset.current += half;
          else if (offset.current > 0) offset.current -= half;
        }

        el.style.transform = `translate3d(${offset.current}px,0,0)`;
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [enabled]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // Mouse wheels and trackpads still scroll the page; only a real press
    // takes the rail.
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragging.current = true;
    moved.current = 0;
    lastX.current = e.clientX;
    lastT.current = performance.now();
    velocity.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const now = performance.now();
    const dx = e.clientX - lastX.current;
    const dt = Math.max(1, now - lastT.current) / 1000;

    offset.current += dx;
    moved.current += Math.abs(dx);

    // Smoothed, because a single sample between two frames is noisy and a
    // spike would fling the rail off on release.
    velocity.current = velocity.current * 0.7 + (dx / dt) * 0.3;

    lastX.current = e.clientX;
    lastT.current = now;
  }, []);

  const endDrag = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);

    // A finger resting still before lifting should stop the rail, not fling
    // it: with no movement in the last moments the smoothed velocity is
    // already near zero, and the decay carries it back to the drift.
    const idle = performance.now() - lastT.current > 120;
    if (idle) velocity.current = 0;
  }, []);

  /**
   * True when the gesture travelled far enough to be a drag rather than a tap.
   * Cards are links, so the click that follows a drag has to be swallowed or
   * the reader ends up on a page they were only trying to scroll past.
   */
  const wasDragged = useCallback(() => moved.current > 8, []);

  return {
    viewport,
    track,
    wasDragged,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onPointerLeave: endDrag,
    },
  };
}
