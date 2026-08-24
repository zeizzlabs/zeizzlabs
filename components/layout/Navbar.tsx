"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { whatsappLink } from "@/content/site";
import { MenuOverlay } from "./MenuOverlay";
import { ScrollProgress } from "./ScrollProgress";
import { TransitionLink } from "@/components/motion/PageTransition";

/**
 * The bar itself is deliberately almost nothing: mark, one action, one menu
 * trigger. All navigation lives in the full-screen overlay, which is what lets
 * the pages breathe and keeps the chrome from competing with the work.
 *
 * `data-scrolled` drives the wordmark reveal in the logo lockup, and
 * `data-over` lets a light section invert the bar's colours as it passes under.
 */
export function Navbar({ logo }: { logo: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [over, setOver] = useState<"dark" | "light">("dark");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detect whether a light-themed section currently sits under the bar so the
  // chrome can invert instead of disappearing into it.
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-theme="light"]')
    );
    if (!sections.length) {
      setOver("dark");
      return;
    }
    const check = () => {
      const y = 40;
      const hit = sections.some((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= y && r.bottom >= y;
      });
      setOver(hit ? "light" : "dark");
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [pathname]);

  const light = over === "light" && !open;

  return (
    <>
      <header
        data-scrolled={scrolled ? "true" : "false"}
        data-over={over}
        className={cn(
          "group/nav fixed inset-x-0 top-0 z-[130] transition-[background,backdrop-filter,border-color,color] duration-500",
          scrolled && !open ? "glass border-b border-line" : "border-b border-transparent",
          light ? "text-ink-950" : "text-ink"
        )}
        style={{ height: "var(--nav-h)" }}
      >
        <div className="mx-auto flex h-full max-w-[100rem] items-center justify-between gap-4 px-5 sm:px-8">
          {logo}

          <div className="flex items-center gap-3 sm:gap-5">
            <TransitionLink
              href="/contact"
              className={cn(
                "hidden text-[13px] font-medium tracking-tight transition-opacity hover:opacity-60 sm:block",
                light ? "text-ink-950" : "text-ink"
              )}
            >
              Start a project
            </TransitionLink>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden text-[13px] font-medium tracking-tight transition-opacity hover:opacity-60 md:block",
                light ? "text-ink-950" : "text-ink"
              )}
            >
              WhatsApp
            </a>

            {/* Menu trigger — the label swaps and the rules morph into an X. */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-overlay"
              data-cursor="lg"
              className="group/btn relative inline-flex h-11 items-center gap-3 rounded-full border border-line-strong pl-5 pr-2.5 transition-colors hover:border-white/40"
            >
              <span className="text-[12.5px] font-medium uppercase tracking-[0.14em]">
                {open ? "Close" : "Menu"}
              </span>
              <span className="relative grid h-7 w-7 place-items-center">
                <span
                  className={cn(
                    "absolute h-px w-4 bg-current transition-transform duration-400 ease-[var(--ease-out-quint)]",
                    open ? "translate-y-0 rotate-45" : "-translate-y-1"
                  )}
                />
                <span
                  className={cn(
                    "absolute h-px w-4 bg-current transition-transform duration-400 ease-[var(--ease-out-quint)]",
                    open ? "translate-y-0 -rotate-45" : "translate-y-1"
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {scrolled && !open && <ScrollProgress />}
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
