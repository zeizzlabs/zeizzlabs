"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Light / dark switch.
 *
 * The choice is written to <html data-theme> and persisted. The initial value
 * is applied by an inline script in the document head, before first paint —
 * doing it here would mean a flash of the wrong theme on every load, which is
 * worse than not offering the switch at all.
 *
 * Default is dark: the brand mark is a navy circuit board, so dark is the
 * brand's own ground. Light exists because it is what the reference studios do
 * and because some visitors simply prefer it.
 */
export type Theme = "dark" | "light";

export const THEME_KEY = "zeizz.theme";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current =
      (document.documentElement.dataset.theme as Theme | undefined) ?? "dark";
    const id = requestAnimationFrame(() => setTheme(current));
    return () => cancelAnimationFrame(id);
  }, []);

  const apply = (next: Theme) => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Private mode — the toggle still works for this session.
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "light"}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      onClick={() => apply(theme === "dark" ? "light" : "dark")}
      data-cursor="lg"
      className={cn(
        "relative inline-flex h-11 w-11 items-center justify-center rounded-full",
        "border border-line-strong transition-colors hover:border-white/40",
        className
      )}
    >
      {/* Sun and moon crossfade; one is always the "other" option. */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
        className={cn(
          "absolute h-[18px] w-[18px] transition-all duration-400",
          theme === "dark" ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
        )}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
        className={cn(
          "absolute h-[18px] w-[18px] transition-all duration-400",
          theme === "light" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
        )}
      >
        <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
      </svg>
    </button>
  );
}
