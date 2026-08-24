"use client";

import { useRef, type ReactNode } from "react";

/**
 * Magnetic hover — the child eases toward the cursor inside its own box, then
 * springs back. Mouse-only, skipped for reduced motion, and it mutates
 * transform directly so React never re-renders.
 */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function reset() {
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0,0,0)";
  }

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={className}
      style={{
        display: "inline-block",
        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {children}
    </span>
  );
}
