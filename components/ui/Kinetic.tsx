"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Kinetic headline: splits text into words that rise, un-rotate and fade in on
 * a stagger. Words stay in the DOM as real text (screen readers read the whole
 * string via aria-label), so this is decoration only.
 */
export function Kinetic({
  text,
  className,
  as: Tag = "span",
  startDelay = 0,
  /** Render immediately instead of waiting for scroll (used in the hero). */
  immediate = false,
}: {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  startDelay?: number;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (immediate) {
      const t = setTimeout(() => setRun(true), startDelay);
      return () => clearTimeout(t);
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.unobserve(e.target);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate, startDelay]);

  const words = text.split(" ");

  return (
    <Tag
      ref={ref as never}
      aria-label={text}
      className={cn(run && "kinetic-run", className)}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden className="inline-block overflow-hidden">
          <span className="kinetic-word" style={{ ["--i" as string]: i }}>
            {w}
          </span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
