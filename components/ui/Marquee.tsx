"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * Marquee whose speed and direction react to scroll velocity — the Locomotive
 * signature. Scrolling down accelerates it; scrolling up drags it backwards.
 * It keeps drifting when the page is still, so the band is never dead.
 *
 * Implemented with a wrapped modifier on x rather than duplicated CSS keyframes,
 * so any content width loops seamlessly and the velocity can be changed on the
 * fly without restarting the animation.
 */
/**
 * `variant` rather than a render prop: this is a client component, and a
 * function cannot cross the server/client boundary as a prop.
 */
type Variant = "display" | "chip";

export function Marquee({
  items,
  speed = 60,
  reverse = false,
  className,
  variant = "display",
}: {
  items: string[];
  /** Base drift in pixels per second. */
  speed?: number;
  reverse?: boolean;
  className?: string;
  variant?: Variant;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = root.current?.querySelector("[data-track]") as HTMLElement | null;
      if (!track) return;

      const half = track.scrollWidth / 2;
      if (!half) return;

      const dir = reverse ? 1 : -1;

      if (prefersReducedMotion()) return;

      const wrap = gsap.utils.wrap(-half, 0);
      const setX = gsap.quickSetter(track, "x", "px");
      let x = 0;
      let velocity = 1;

      const tick = (_t: number, dt: number) => {
        x += dir * speed * velocity * (dt / 1000);
        setX(wrap(x));
        // Ease the boost back toward the idle drift.
        velocity += (1 - velocity) * 0.04;
      };
      gsap.ticker.add(tick);

      const st = ScrollTrigger.create({
        trigger: root.current,
        onUpdate: (self) => {
          // Scroll velocity in px/s → a bounded multiplier, sign-aware so the
          // band reverses when the visitor scrolls back up.
          const v = self.getVelocity();
          velocity = gsap.utils.clamp(-6, 6, 1 + v / 380);
        },
      });

      return () => {
        gsap.ticker.remove(tick);
        st.kill();
      };
    },
    { scope: root, dependencies: [speed, reverse] }
  );

  const row = (key: string) => (
    <div className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {items.map((item, i) =>
        variant === "chip" ? (
          <span
            key={`${key}-${i}`}
            className="mx-2 inline-flex items-center rounded-full border border-line px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-faint"
          >
            {item}
          </span>
        ) : (
          <span
            key={`${key}-${i}`}
            className="flex items-center gap-6 px-6 font-display text-lg font-medium tracking-tight text-steel-400/80 sm:text-xl"
          >
            {item}
            <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-500/60" />
          </span>
        )
      )}
    </div>
  );

  return (
    <div
      ref={root}
      className={cn(
        "relative flex overflow-hidden",
        "[mask-image:linear-gradient(90deg,transparent,#000_9%,#000_91%,transparent)]",
        className
      )}
    >
      <div data-track className="flex w-max">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
