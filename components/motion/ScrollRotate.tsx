"use client";

import { useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { useRafScroll } from "@/lib/use-raf-scroll";

/**
 * A card that turns as it crosses the screen: tilted back on the way in, flat
 * and fully lit at the centre, tilted away again on the way out.
 *
 * The angle is scrubbed off the element's distance from the viewport centre
 * rather than fired by a trigger, so the motion tracks the finger exactly and
 * reverses when the scroll does — a triggered animation would play once and
 * then sit still while the card is plainly still moving.
 *
 * Phones only. On a pointer device the same effect fights the mouse-driven
 * hover states these cards already have, and desktop rows are short enough that
 * several sit inside the tilt band at once, which reads as a wobble.
 */
export function ScrollRotate({
  children,
  className,
  /** Peak tilt in degrees at the top and bottom of the screen. */
  tilt = 20,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
}) {
  const el = useRef<HTMLDivElement>(null);
  const on = useRef<boolean | null>(null);

  useRafScroll(() => {
    if (on.current === null) {
      on.current =
        !prefersReducedMotion() && window.matchMedia("(pointer: coarse)").matches;
    }
    if (!on.current) return;

    const node = el.current;
    if (!node) return;

    const r = node.getBoundingClientRect();
    const vh = window.innerHeight;

    // -1 when the card's middle sits at the top edge, 0 dead centre, +1 at the
    // bottom edge. Clamped so a very tall card cannot over-rotate.
    const half = vh / 2;
    const d = Math.max(-1.25, Math.min(1.25, (r.top + r.height / 2 - half) / half));
    const a = Math.abs(d);

    // Written even when the card is well off-screen: leaving it untouched at
    // its untransformed default meant it sat fully upright and fully opaque
    // until it crossed the band, then snapped to the tilted state in one frame.
    // Only the compositor hint is withheld from cards that are nowhere near.
    node.style.willChange =
      r.bottom < -80 || r.top > vh + 80 ? "auto" : "transform, opacity";
    node.style.transform = `perspective(900px) rotateX(${(d * tilt).toFixed(2)}deg) scale(${(
      1 - a * 0.075
    ).toFixed(4)})`;
    node.style.opacity = (1 - Math.pow(a, 1.7) * 0.8).toFixed(3);
  });

  return (
    <div ref={el} className={className} style={{ transformOrigin: "50% 50%" }}>
      {children}
    </div>
  );
}
