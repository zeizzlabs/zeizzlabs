"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Card shell with a cursor-tracking spotlight and a gradient hairline that
 * lights on hover. Writes --mx/--my as CSS vars on pointer move — no re-render.
 */
export function SpotlightCard({
  children,
  className,
  as: Tag = "div",
  tilt = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "a";
  /** Adds a subtle 3D tilt toward the cursor. */
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (tilt && !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      const rx = ((y - r.height / 2) / r.height) * -5;
      const ry = ((x - r.width / 2) / r.width) * 5;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  }

  function onLeave() {
    const el = ref.current;
    if (el && tilt) el.style.transform = "";
  }

  return (
    <Tag
      ref={ref as never}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "spotlight edge-glow plate group relative overflow-hidden rounded-card",
        "transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-out-quint)]",
        "hover:border-white/20 hover:shadow-[0_28px_70px_-32px_rgba(30,123,255,0.55)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
