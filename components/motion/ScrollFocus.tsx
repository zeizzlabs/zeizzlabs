"use client";

import { useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { useRafScroll } from "@/lib/use-raf-scroll";

/**
 * A card that comes into focus as it reaches the middle of the screen and falls
 * out of it again on the way past: small and blurred at the edges, full size
 * and perfectly sharp at the centre.
 *
 * Because every card in a list runs this at once, the one arriving from below
 * is growing and sharpening at exactly the moment the one above it is shrinking
 * and blurring away — the hand-off happens without either card being moved off
 * its natural place in the flow.
 *
 * There is deliberately no rotation. A `perspective()` layer ghosted badly on
 * mobile Chrome: text on the tilted card composited twice, offset, as if the
 * previous frame had been left behind. Scale and blur read as depth without
 * putting the element on a 3D layer at all.
 *
 * The angle of everything is scrubbed off distance from the viewport centre
 * rather than fired by a trigger, so it tracks the finger and reverses when the
 * scroll does.
 */
export function ScrollFocus({
  children,
  className,
  /** How far the card shrinks at the screen edges. */
  shrink = 0.16,
  /** Peak blur in px at the screen edges. */
  blur = 7,
}: {
  children: ReactNode;
  className?: string;
  shrink?: number;
  blur?: number;
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

    // 0 dead centre, 1 at either edge. Clamped so a tall card cannot overshoot
    // into a negative scale.
    const half = vh / 2;
    const a = Math.min(1, Math.abs(r.top + r.height / 2 - half) / half);

    // Sharpen and grow over the middle of the travel rather than linearly, so
    // the card holds its full, readable state around the centre instead of
    // being subtly wrong everywhere except one exact scroll position.
    const focus = 1 - Math.pow(a, 1.45);
    const b = blur * (1 - focus);

    // Written even when far off-screen: skipping those left a card at full size
    // and sharp until it crossed the band, then snapped in a single frame.
    node.style.willChange =
      r.bottom < -80 || r.top > vh + 80 ? "auto" : "transform, opacity, filter";
    node.style.transform = `translate3d(0,0,0) scale(${(1 - shrink * (1 - focus)).toFixed(4)})`;
    node.style.opacity = (0.12 + 0.88 * focus).toFixed(3);
    node.style.filter = b < 0.06 ? "none" : `blur(${b.toFixed(2)}px)`;
  });

  return (
    <div ref={el} className={className} style={{ transformOrigin: "50% 50%" }}>
      {children}
    </div>
  );
}
