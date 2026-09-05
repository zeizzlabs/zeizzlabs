"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * A deck that advances itself: each card enters small and soft from the left,
 * grows to full size and full sharpness as it reaches the middle, then carries
 * on to the right shrinking and blurring away while the next one is already
 * arriving behind it.
 *
 * Only for content that is not interactive. An auto-advancing deck of links is
 * a trap — the card moves between the decision to tap and the tap itself, and
 * the wrong page opens.
 *
 * Three things stop it being an annoyance:
 *   - it is paused while off-screen, so it never runs unseen or in a background
 *     tab, and costs nothing when the section is not being looked at;
 *   - a finger takes it over completely: drag to scrub the deck forwards or
 *     backwards at whatever speed the hand moves, flick to send it on, or hold
 *     to stop it dead — and on release the flick's momentum decays back into
 *     the normal advance rather than snapping;
 *   - `prefers-reduced-motion` disables it outright and the caller's static
 *     fallback is shown instead.
 *
 * The clock is wall-time, not a frame count, so a dropped frame shifts nothing
 * and a paused stretch is subtracted rather than replayed.
 */

/** Milliseconds a card owns the deck, including its move. */
const CYCLE = 3600;
/** Fraction of the cycle a card spends parked in the middle. */
const HOLD = 0.44;
/**
 * How quickly a flick's momentum bleeds back into the normal advance, in
 * milliseconds. Long enough that a hard flick visibly runs on, short enough
 * that it never feels out of control.
 */
const FLICK_DECAY = 520;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function AutoDeck({
  slides,
  className,
  height = "13.5rem",
}: {
  slides: { key: string; node: ReactNode }[];
  className?: string;
  /** Fixed track height — the cards are stacked, so they cannot size it. */
  height?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = track.current;
    if (!el) return;

    const n = slides.length;
    if (n < 2) return;

    let raf = 0;
    let clock = 0; // ms of motion accumulated
    let prev = 0;
    let running = false;
    let onScreen = false;
    let held = false;
    /**
     * Extra clock milliseconds per real second, carried over from a flick.
     * Decays to zero, at which point the deck is back to its own pace. Signed,
     * so a backwards flick runs the deck backwards before it settles.
     */
    let flick = 0;
    let lastX = 0;
    let lastT = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);

      const dt = prev ? Math.min(now - prev, 64) : 0;
      prev = now;

      // While a finger is down the clock is written by the drag handler alone.
      // Otherwise the deck advances at its own pace plus whatever is left of
      // the last flick.
      if (!held) {
        clock += dt + (flick * dt) / 1000;
        flick *= Math.exp(-dt / FLICK_DECAY);
        if (Math.abs(flick) < 1) flick = 0;
      }

      const raw = clock / CYCLE;
      const idx = Math.floor(raw);
      const moved = easeInOut(clamp01((raw - idx - HOLD) / (1 - HOLD)));
      const phase = idx + moved;

      const spread = el.clientWidth * 0.92;

      for (let i = 0; i < n; i++) {
        const node = cards.current[i];
        if (!node) continue;

        // Wrapped into [-n/2, n/2) so a card leaving the right edge reappears
        // at the left rather than travelling back across the deck.
        let d = i - phase;
        d = (((d + n / 2) % n) + n) % n - n / 2;

        const a = Math.abs(d);
        if (a > 1.12) {
          node.style.visibility = "hidden";
          continue;
        }

        const k = Math.min(a, 1);
        // Negated: as `phase` grows a card's `d` falls, and the card should
        // travel left-to-right, not the other way.
        const x = -d * spread;

        node.style.visibility = "visible";
        node.style.zIndex = String(100 - Math.round(k * 50));
        node.style.opacity = (1 - Math.pow(k, 1.25)).toFixed(3);
        node.style.transform = `translate3d(${x.toFixed(1)}px,0,0) scale(${(
          1 - k * 0.22
        ).toFixed(4)})`;
        const b = k * 6;
        node.style.filter = b < 0.06 ? "none" : `blur(${b.toFixed(2)}px)`;
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      prev = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // Off-screen decks do not animate. A carousel spinning where nobody can see
    // it is pure battery cost.
    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        if (onScreen && document.visibilityState === "visible") start();
        else stop();
      },
      { threshold: 0.15 }
    );
    io.observe(el);

    const onVis = () => {
      if (document.visibilityState === "visible" && onScreen) start();
      else stop();
    };
    /**
     * Drag maps horizontal distance onto the clock: moving a card's full
     * travel across the deck is one cycle, so the deck tracks the finger
     * one-to-one rather than at some invented sensitivity.
     */
    const down = (e: PointerEvent) => {
      held = true;
      flick = 0;
      lastX = e.clientX;
      lastT = performance.now();
      el.setPointerCapture?.(e.pointerId);
    };

    const move = (e: PointerEvent) => {
      if (!held) return;
      const spread = el.clientWidth * 0.92;
      if (spread <= 0) return;

      const now = performance.now();
      const dx = e.clientX - lastX;
      const dtMs = Math.max(1, now - lastT);

      const deltaClock = (dx / spread) * CYCLE;
      clock += deltaClock;

      // Smoothed: one raw sample between frames is noisy, and a spike would
      // fling the deck across several cards on release.
      flick = flick * 0.7 + (deltaClock / (dtMs / 1000)) * 0.3;

      lastX = e.clientX;
      lastT = now;
    };

    const up = (e: PointerEvent) => {
      if (!held) return;
      held = false;
      el.releasePointerCapture?.(e.pointerId);
      // A finger held still before lifting should leave the deck where it is
      // rather than throwing it.
      if (performance.now() - lastT > 120) flick = 0;
    };

    document.addEventListener("visibilitychange", onVis);
    el.addEventListener("pointerdown", down, { passive: true });
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerup", up, { passive: true });
    el.addEventListener("pointercancel", up, { passive: true });

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [slides.length]);

  return (
    <div
      ref={track}
      className={className}
      style={{ position: "relative", height, overflow: "hidden", touchAction: "pan-y" }}
    >
      {slides.map((s, i) => (
        <div
          key={s.key}
          ref={(node) => {
            cards.current[i] = node;
          }}
          className="absolute inset-0 flex items-center"
          style={
            i === 0
              ? { willChange: "transform, opacity, filter" }
              : { opacity: 0, visibility: "hidden", willChange: "transform, opacity, filter" }
          }
        >
          {s.node}
        </div>
      ))}
    </div>
  );
}
