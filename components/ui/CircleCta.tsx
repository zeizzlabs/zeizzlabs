"use client";

import { useRef } from "react";
import { TransitionLink } from "@/components/motion/PageTransition";
import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

/**
 * The big circular call to action.
 *
 * A studio-site staple, and it earns its place: at this size it works as a
 * graphic element in the layout rather than a control bolted to the end of a
 * paragraph. The ring counter-rotates its label, the whole thing is magnetic,
 * and the arrow slips diagonally on hover.
 */
export function CircleCta({
  href,
  label,
  className,
  size = 148,
}: {
  href: string;
  label: string;
  className?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.28;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.28;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  const chars = `${label} — ${label} — `.split("");

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn("shrink-0", className)}
      style={{ transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)" }}
    >
      <TransitionLink
        href={href}
        data-cursor="hide"
        aria-label={label}
        className="group relative grid place-items-center rounded-full border border-line-strong transition-colors duration-500 hover:border-gold-500/60"
        style={{ height: size, width: size }}
      >
        <span className="absolute inset-0 rounded-full bg-gold-400/0 transition-colors duration-500 group-hover:bg-gold-400/[0.07]" />

        {/* Ring of text, one char per angular step. */}
        <span className="animate-spin-slow absolute inset-0" aria-hidden>
          {chars.map((c, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 origin-[0_0] font-mono text-[9.5px] uppercase tracking-[0.1em] text-steel-400"
              style={{
                transform: `rotate(${(360 / chars.length) * i}deg) translateY(-${size / 2 - 13}px)`,
              }}
            >
              {c}
            </span>
          ))}
        </span>

        <Icon
          name="ArrowUpRight"
          className="h-6 w-6 text-gold-300 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
          strokeWidth={1.4}
        />
      </TransitionLink>
    </div>
  );
}
