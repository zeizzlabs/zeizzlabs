"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/** Appears after two viewports; hidden on mobile where the action bar lives. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Throttled to a frame, and the viewport height is cached: reading
    // innerHeight on every scroll event is a layout read the browser has to
    // resolve synchronously, which is exactly the per-frame work that made the
    // page judder while scrolling.
    let vh = window.innerHeight;
    let raf = 0;
    const update = () => {
      raf = 0;
      setShow(window.scrollY > vh * 2);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      vh = window.innerHeight;
      onScroll();
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "glass fixed bottom-6 right-6 z-40 hidden h-12 w-12 place-items-center rounded-full border border-line-strong text-muted",
        "transition-all duration-400 hover:text-ink hover:border-white/30 sm:grid",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <Icon name="ArrowDown" className="h-5 w-5 rotate-180" strokeWidth={1.8} />
    </button>
  );
}
