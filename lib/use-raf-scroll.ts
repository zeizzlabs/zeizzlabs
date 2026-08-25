"use client";

import { useEffect, useRef } from "react";

/**
 * Runs `fn` at most once per animation frame on scroll and resize, plus once
 * immediately so the first paint is already in its correct state.
 *
 * `fn` is held in a ref, so a caller can pass a fresh closure every render
 * without the listeners being torn down and re-attached each time.
 */
export function useRafScroll(fn: () => void) {
  const held = useRef(fn);
  // Refreshed in an effect rather than during render — writing a ref while
  // rendering is what React's rules-of-hooks lint flags, and it is a real
  // hazard under concurrent rendering.
  useEffect(() => {
    held.current = fn;
  });

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      held.current();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    held.current();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}

/** 0 below `a`, 1 above `b`, linear between. */
export function range(v: number, a: number, b: number) {
  const t = (v - a) / (b - a);
  return t < 0 ? 0 : t > 1 ? 1 : t;
}

/** easeInOutQuad — gentle at both ends, which is what a scrub wants. */
export function ease(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
