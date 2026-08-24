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

    // The browser restoring a mid-page scroll position on reload leaves Lenis
    // initialised at 0 while the window is somewhere else. ScrollTrigger is
    // driven by Lenis, so every trigger between the two positions is skipped
    // and its content stays hidden. We own scrolling here, so own restoration
    // too and always begin at the top.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

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

    // Anything that changes document height after ScrollTriggers are created
    // leaves every trigger measuring against a stale layout, so refresh on each
    // of them: fonts settling, the intro finishing, and full page load.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("zeizz:intro-done", refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("zeizz:intro-done", refresh);
      window.removeEventListener("load", refresh);
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return null;
}
