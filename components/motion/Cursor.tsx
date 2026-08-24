"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Stateful cursor, driven declaratively from the markup.
 *
 * Any element can change it without touching this file:
 *
 *   data-cursor="hide"              hide the native-feeling dot entirely
 *   data-cursor="lg"                grow the ring (links, buttons)
 *   data-cursor="text" data-cursor-text="View"   ring + label
 *   data-cursor="drag"              horizontal drag affordance
 *   data-cursor="invert"            difference blend over imagery
 *
 * The dot tracks the pointer exactly; the ring lags behind on a spring, which
 * is what makes it feel physical rather than glued on.
 *
 * The system cursor is only hidden once the custom one has actually been
 * positioned by a real pointer move. An earlier version hid it on mount, while
 * the replacement was hidden by a CSS width breakpoint — so on any pointer
 * device narrower than 768px, or after a window resize, there was no visible
 * cursor at all. The two conditions must never be allowed to disagree.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const xTo = gsap.quickTo(dot.current, "x", { duration: 0.14, ease: "power3" });
    const yTo = gsap.quickTo(dot.current, "y", { duration: 0.14, ease: "power3" });
    const rxTo = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const ryTo = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });

    let shown = false;
    let currentState = "";

    const apply = (state: string, text: string) => {
      if (state === currentState && text === (label.current?.textContent ?? "")) return;
      currentState = state;

      const big = state === "lg" || state === "text" || state === "drag";
      gsap.to(ring.current, {
        scale: state === "text" ? 3.1 : big ? 2.2 : 1,
        borderColor:
          state === "text" || state === "lg"
            ? "var(--color-gold-400)"
            : "var(--color-blue-400)",
        backgroundColor:
          state === "text" ? "color-mix(in oklab, var(--color-gold-400) 14%, transparent)" : "transparent",
        duration: 0.45,
        ease: "zeizz",
      });
      gsap.to(dot.current, {
        scale: state === "text" || state === "hide" ? 0 : 1,
        duration: 0.35,
        ease: "zeizz",
      });
      if (label.current) {
        label.current.textContent = text;
        gsap.to(label.current, { autoAlpha: text ? 1 : 0, duration: 0.3 });
      }
      gsap.to([dot.current, ring.current], {
        mixBlendMode: state === "invert" ? "difference" : "normal",
        duration: 0,
      });
    };

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      rxTo(e.clientX);
      ryTo(e.clientY);

      if (!shown) {
        shown = true;
        // Proven working: it has a position and is about to be painted. Only
        // now is it safe to take the system cursor away.
        document.documentElement.classList.add("has-custom-cursor");
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });
      }

      const t = e.target as HTMLElement | null;
      const holder = t?.closest?.("[data-cursor]") as HTMLElement | null;
      if (holder) {
        apply(holder.dataset.cursor || "lg", holder.dataset.cursorText || "");
        return;
      }
      const interactive = t?.closest?.(
        "a, button, [role='button'], input, textarea, select, summary, label"
      );
      apply(interactive ? "lg" : "", "");
    };

    const onLeave = () => {
      shown = false;
      // Give the system cursor back the moment ours is not on screen.
      document.documentElement.classList.remove("has-custom-cursor");
      gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.25 });
    };
    const onDown = () => gsap.to(ring.current, { scale: "-=0.45", duration: 0.2 });
    const onUp = () => apply(currentState, label.current?.textContent ?? "");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[150]">
      <div
        ref={dot}
        className="fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-300 opacity-0"
      />
      <div
        ref={ring}
        className="fixed left-0 top-0 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-blue-400 opacity-0"
      >
        <span
          ref={label}
          className="select-none whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.14em] text-gold-200 opacity-0"
          style={{ transform: "scale(0.34)" }}
        />
      </div>
    </div>
  );
}
