"use client";

import { useEffect, useState } from "react";
import { services } from "@/content/services";

const words = services.map((s) => s.short);

/**
 * Cycles the eight pillars in the hero sub-line. Each word swaps on a blur+rise
 * transition; the container is sized to the longest word so nothing reflows
 * (no layout shift as it cycles). Static for reduced-motion users.
 */
export function RotatingWord() {
  const [i, setI] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setAnimating(true);
      const t = setTimeout(() => {
        setI((v) => (v + 1) % words.length);
        setAnimating(false);
      }, 320);
      return () => clearTimeout(t);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-grid place-items-center overflow-hidden align-bottom">
      {/* Invisible sizer: reserves the width of the longest label. */}
      <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {words.reduce((a, b) => (b.length > a.length ? b : a), "")}
      </span>
      <span
        className="col-start-1 row-start-1 whitespace-nowrap text-gold-300 transition-all duration-300 ease-[var(--ease-out-expo)]"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(-0.5em)" : "none",
          filter: animating ? "blur(4px)" : "none",
        }}
      >
        {words[i]}
      </span>
    </span>
  );
}
