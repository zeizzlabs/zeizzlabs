"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

/**
 * Single registration point for GSAP.
 *
 * Importing this module anywhere in the client guarantees the plugins are
 * registered exactly once. Registering twice is harmless but the shared eases
 * defined below must only be created once, hence the guard.
 */
let registered = false;

if (typeof window !== "undefined" && !registered) {
  // Only what is actually used. Observer and Flip were registered here and never
  // referenced anywhere, shipping their weight to every page for nothing.
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

  // The house easing curve — a long, confident settle. Everything on the site
  // that isn't a micro-interaction uses this, so the whole page shares a feel.
  CustomEase.create("zeizz", "0.16, 1, 0.3, 1");
  CustomEase.create("zeizz-in", "0.7, 0, 0.84, 0");

  gsap.defaults({ ease: "zeizz", duration: 1 });

  // Never let a slow frame stretch a scroll-driven tween.
  gsap.ticker.lagSmoothing(0);

  registered = true;
}

/** True when the visitor has asked the OS to reduce motion. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export { gsap, ScrollTrigger, SplitText };
