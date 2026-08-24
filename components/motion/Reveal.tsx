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

        gsap.from(targets, {
          yPercent: 115,
          opacity: mode === "lines" ? 1 : 0,
          rotate: mode === "chars" ? 3 : 0,
          duration: 1.05,
          delay,
          stagger: mode === "chars" ? stagger * 0.35 : stagger,
          scrollTrigger: trigger,
        });
        return () => split.revert();
      }

      if (mode === "mask") {
        gsap.from(el, {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.25,
          delay,
          scrollTrigger: trigger,
        });
        return;
      }

      if (mode === "stagger") {
        gsap.from(Array.from(el.children), {
          y: 42,
          opacity: 0,
          duration: 1,
          delay,
          stagger,
          scrollTrigger: trigger,
        });
        return;
      }

      gsap.from(el, {
        y: 34,
        opacity: 0,
        filter: "blur(8px)",
        duration: 1.05,
        delay,
        scrollTrigger: trigger,
      });
    },
    { scope: ref, dependencies: [mode, delay, stagger, start, scrub] }
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
