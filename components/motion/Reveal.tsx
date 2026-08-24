"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Mode = "lines" | "words" | "chars" | "fade" | "mask" | "stagger";

/**
 * Scroll-linked reveal, replacing the old IntersectionObserver + CSS class.
 *
 * The difference matters: an observer can only fire a fixed animation once an
 * element crosses a threshold. ScrollTrigger ties the animation to scroll
 * position, so reveals arrive in rhythm with the momentum of the page and can
 * be scrubbed, staggered and reversed.
 *
 * `lines` / `words` / `chars` use SplitText and always revert the split
 * afterwards, which restores the original DOM so screen readers and
 * copy-and-paste see normal text.
 *
 * Every animation here is a `fromTo`, never a `from`. `gsap.from()` records the
 * element's *current* value as the destination, so if the effect is ever
 * invoked twice — which React StrictMode does in development — the second call
 * reads the already-applied opacity of 0 and animates the element to invisible,
 * permanently. Stating both ends explicitly makes it idempotent.
 */
export function Reveal({
  children,
  mode = "fade",
  delay = 0,
  stagger = 0.055,
  start = "top 88%",
  className,
  as: Tag = "div",
  scrub = false,
}: {
  children: ReactNode;
  mode?: Mode;
  delay?: number;
  stagger?: number;
  start?: string;
  className?: string;
  as?: ElementType;
  /** Tie progress to scroll position rather than playing once. */
  scrub?: boolean | number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const trigger = {
        trigger: el,
        start,
        once: !scrub,
        ...(scrub ? { end: "bottom 55%", scrub: scrub === true ? 1 : scrub } : {}),
      };

      if (mode === "lines" || mode === "words" || mode === "chars") {
        const split = new SplitText(el, {
          type: mode === "lines" ? "lines" : mode === "words" ? "words" : "chars,words",
          linesClass: "split-line",
          autoSplit: true,
mask: mode === "lines" ? "lines" : undefined,
        });
        const targets =
          mode === "lines" ? split.lines : mode === "words" ? split.words : split.chars;

        gsap.fromTo(
          targets,
          {
            yPercent: 115,
            opacity: mode === "lines" ? 1 : 0,
            rotate: mode === "chars" ? 3 : 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            rotate: 0,
            duration: 1.05,
            delay,
            stagger: mode === "chars" ? stagger * 0.35 : stagger,
            scrollTrigger: trigger,
          }
        );
        return () => split.revert();
      }

      if (mode === "mask") {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1.25, delay, scrollTrigger: trigger }
        );
        return;
      }

      if (mode === "stagger") {
        gsap.fromTo(
          Array.from(el.children),
          { y: 42, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay, stagger, scrollTrigger: trigger }
        );
        return;
      }

      // The blur is desktop-only: animating a filter re-rasterises the element
      // every frame, and on a phone that cost lands on dozens of elements at
      // once for an effect the y/opacity change already carries.
      const heavyOk = !window.matchMedia("(pointer: coarse)").matches;
      gsap.fromTo(
        el,
        { y: 34, opacity: 0, ...(heavyOk ? { filter: "blur(8px)" } : null) },
        {
          y: 0,
          opacity: 1,
          ...(heavyOk ? { filter: "blur(0px)" } : null),
          duration: 1.05,
          delay,
          scrollTrigger: trigger,
        }
      );
    },
    { scope: ref, dependencies: [mode, delay, stagger, start, scrub] }
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
