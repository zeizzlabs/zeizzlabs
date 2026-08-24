"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Inertia scrolling, driven by Lenis and slaved to GSAP's ticker.
 *
 * This is the single biggest difference between a normal site and a studio
 * one: the page carries momentum instead of snapping to the wheel. Lenis is
 * driven from `gsap.ticker` rather than its own rAF loop so scroll position and
 * every ScrollTrigger update happen in the same frame — mixing the two loops is
 * what produces the classic one-frame jitter on pinned sections.
 *
 * `syncTouch` extends the same feel to touch devices. That is a deliberate
 * choice here (the brief asked for an identical experience on phones); it is
 * the one knob to turn off first if mid-range Android ever feels heavy.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Expose it so anchors and the page-transition layer can drive scrolling.
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);

    // Anchor links must go through Lenis or they teleport past the animation.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"], a[href^="/#"]'
      ) as HTMLAnchorElement | null;
      if (!link) return;
      const hash = link.getAttribute("href")!.replace(/^\//, "");
      if (hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -90, duration: 1.4 });
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    // Recalculate after fonts land, or pinned sections measure the wrong height.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return null;
}
