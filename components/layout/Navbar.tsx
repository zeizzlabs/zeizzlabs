"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { whatsappLink } from "@/content/site";
import { MenuOverlay } from "./MenuOverlay";
import { ScrollProgress } from "./ScrollProgress";
import { TransitionLink } from "@/components/motion/PageTransition";
import { ThemeToggle } from "./ThemeToggle";

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
  const [over, setOver] = useState<"dark" | "light">("light");
  const pathname = usePathname();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        /**
         * Hysteresis, because this threshold had none.
         *
         * `scrolled` toggles the glass backdrop-filter, a border, a shadow and
         * the wordmark reveal all at once. With a single 24px line, resting
         * anywhere near it — which is where a reader is while easing away from
         * the top — flipped every one of those on and off repeatedly. That is
         * the header flicker, and because backdrop-filter repaints what is
         * behind it, the page under the header appeared to flicker too.
         */
        setScrolled((was) => (was ? window.scrollY > 16 : window.scrollY > 72));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Detect whether a light-themed section currently sits under the bar so the
  // chrome can invert instead of disappearing into it.
  useEffect(() => {
    // Any section can declare its own theme; the bar adopts whichever one is
    // currently under it, falling back to the page's theme between sections.
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-theme]")
    ).filter((el) => el !== document.documentElement);
    /**
     * Cache each section's document offsets instead of measuring every scroll.
     *
     * This ran getBoundingClientRect() over every themed section on EVERY
     * scroll event, unthrottled. Lenis emits one per animation frame, so the
     * header forced a synchronous layout 60-120 times a second for the whole
     * length of a scroll — which is what made the header, and by extension the
     * whole page, judder on a phone. Offsets only change when the layout does,
     * so they are measured once and re-measured on resize.
     */
    const measure = () =>
      sections.map((el) => {
        const r = el.getBoundingClientRect();
        const top = r.top + window.scrollY;
        return { top, bottom: top + r.height, theme: el.dataset.theme };
      });
    let boxes = measure();

    const check = () => {
      const y = window.scrollY + 40;
      const hit = boxes.find((b) => b.top <= y && b.bottom >= y);
      const pageTheme =
        (document.documentElement.dataset.theme as "dark" | "light") ?? "light";
      setOver(
        hit ? ((hit.theme as "dark" | "light") ?? pageTheme) : pageTheme
      );
    };

    let raf = 0;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; check(); });
    };
    const onResize = () => { boxes = measure(); check(); };

    // First measurement waits a frame so layout has settled after a route swap.
    const id = requestAnimationFrame(onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Images and fonts land after mount and move everything below them.
    window.addEventListener("load", onResize);
    return () => {
      cancelAnimationFrame(id);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    };
  }, [pathname]);

  const light = over === "light" && !open;


  return (
    <>
      <header
        data-scrolled={scrolled ? "true" : "false"}
        data-over={over}
        className={cn(
          "group/nav fixed inset-x-0 top-0 z-[130]",
          "transition-[background,backdrop-filter,border-color,color,transform,opacity] duration-500 ease-[var(--ease-out-quint)]",
          // Always present, just quieter at rest — a bar that only appears once
          // you scroll reads as missing when you are at the top of the page.
          // At the top the bar has no line and no background — the logo,
          // theme switch, CTA and menu simply sit over the hero. The divider
          // and glass only arrive once there is content scrolling underneath
          // for them to separate.
          scrolled && !open
            ? "glass border-b border-line shadow-[0_10px_40px_-28px_rgba(4,6,12,0.55)]"
            : "border-b border-transparent",
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

            <ThemeToggle />

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

        <ScrollProgress hidden={!scrolled || open} />
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
