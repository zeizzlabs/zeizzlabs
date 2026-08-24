"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/** Appears after two viewports; hidden on mobile where the action bar lives. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
