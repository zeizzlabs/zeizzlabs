"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: a small dot plus a lagging ring that grows over interactive
 * elements. Mouse-only — it never mounts on touch devices or for users who
 * asked for reduced motion, and the native cursor is left intact (we add a
 * layer, we don't hide the system one on inputs).
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        dot.current?.style.setProperty("opacity", "1");
        ring.current?.style.setProperty("opacity", "1");
      }
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest("a, button, [role='button'], input, textarea, select, label");
      ring.current?.style.setProperty("--s", interactive ? "2.1" : "1");
      ring.current?.style.setProperty(
        "--bc",
        interactive ? "var(--color-gold-400)" : "var(--color-blue-400)"
      );
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%,-50%)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%,-50%) scale(var(--s,1))`;
      raf = requestAnimationFrame(loop);
    };

    const onLeave = () => {
      visible = false;
      dot.current?.style.setProperty("opacity", "0");
      ring.current?.style.setProperty("opacity", "0");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <div
        ref={dot}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-gold-300 opacity-0 transition-opacity duration-300"
      />
      <div
        ref={ring}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border opacity-0 transition-[opacity,border-color] duration-300"
        style={{
          borderColor: "var(--bc, var(--color-blue-400))",
          transitionProperty: "opacity, border-color",
        }}
      />
    </div>
  );
}
