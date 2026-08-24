"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import { nav, site, whatsappLink } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ScrollProgress } from "./ScrollProgress";

/**
 * Sticky navigation.
 * - Turns from transparent to glass once the hero is behind it.
 * - Desktop: hover/focus mega-menu listing the eight pillars.
 * - Mobile: full-screen overlay with staggered links (body scroll locked).
 * - Highlights the section currently in view via IntersectionObserver.
 *
 * `logo` is rendered on the server and handed in: Logo reads the filesystem to
 * auto-detect the wordmark artwork, which it can only do outside the client
 * bundle. Its scroll reveal is driven by the `data-scrolled` attribute below.
 */
export function Navbar({ logo }: { logo: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [flyout, setFlyout] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile overlay and close it on Escape.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setFlyout(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Scroll-spy for the active nav item.
  useEffect(() => {
    const ids = ["services", "ai", "process", "work", "packages", "faq", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`/#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header
        data-scrolled={scrolled ? "true" : "false"}
        className={cn(
          "group/nav fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color,box-shadow] duration-500",
          scrolled
            ? "glass border-b border-line shadow-[0_10px_40px_-24px_rgba(0,0,0,0.9)]"
            : "border-b border-transparent"
        )}
        style={{ height: "var(--nav-h)" }}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-6"
        >
          {logo}

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const isActive = active === item.href;
              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setFlyout(true)}
                  onMouseLeave={() => item.children && setFlyout(false)}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300",
                      isActive ? "text-ink" : "text-muted hover:text-ink"
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <Icon
                        name="ChevronDown"
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-300",
                          flyout && "rotate-180"
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        "absolute inset-x-3.5 -bottom-0.5 h-px origin-left scale-x-0 [background:var(--gradient-brand)] transition-transform duration-400",
                        isActive && "scale-x-100"
                      )}
                    />
                  </Link>

                  {/* Mega-menu — built from the eight pillars. */}
                  {item.children && (
                    <div
                      className={cn(
                        "absolute left-1/2 top-full w-[min(46rem,88vw)] -translate-x-1/2 pt-3 transition-all duration-300",
                        flyout
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none -translate-y-2 opacity-0"
                      )}
                    >
                      <div className="glass grid grid-cols-2 gap-1 rounded-xl2 border border-line-strong p-2.5 shadow-[0_40px_90px_-40px_rgba(0,0,0,1)]">
                        {item.children.map((c) => (
                          <Link
                            key={c.label}
                            href={c.href}
                            onClick={() => setFlyout(false)}
                            className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-white/[0.05]"
                          >
                            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.03] text-blue-400 transition-colors group-hover:border-gold-500/40 group-hover:text-gold-300">
                              <Icon name={c.icon ?? "Sparkles"} className="h-4.5 w-4.5" />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[13.5px] font-medium text-ink">
                                {c.label}
                              </span>
                              <span className="mt-0.5 block truncate text-xs text-faint">
                                {c.desc}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {/* Wrapped rather than hiding the Buttons directly: the Button base
                sets `inline-flex`, and a bare `hidden` on the same element is
                not guaranteed to win the display cascade in Tailwind v4. */}
            <div className="hidden items-center gap-2 md:flex">
              <Button
                href={whatsappLink}
                variant="secondary"
                size="sm"
                icon="MessageCircle"
              >
                WhatsApp
              </Button>
              <Button href="/#contact" size="sm" arrow>
                Start a project
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:bg-white/[0.06] lg:hidden"
            >
              <Icon name={open ? "X" : "Menu"} className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>
        </nav>

        {scrolled && <ScrollProgress />}
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink-950/85 backdrop-blur-xl transition-opacity duration-400",
            open ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "absolute inset-x-0 top-0 origin-top overflow-y-auto pb-10 pt-[calc(var(--nav-h)+1.25rem)] transition-all duration-500 ease-[var(--ease-out-expo)]",
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          )}
          style={{ maxHeight: "100dvh" }}
        >
          <ul className="px-5">
            {nav.map((item, i) => (
              <li
                key={item.label}
                className="border-b border-line transition-all duration-500 ease-[var(--ease-out-expo)]"
                style={{
                  transitionDelay: open ? `${80 + i * 45}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(14px)",
                }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-5 font-display text-2xl font-semibold tracking-tight text-ink"
                >
                  {item.label}
                  <Icon name="ArrowUpRight" className="h-5 w-5 text-faint" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 px-5">
            <Button href="/#contact" size="lg" arrow onClick={() => setOpen(false)}>
              Start a project
            </Button>
            <Button href={whatsappLink} variant="secondary" size="lg" icon="MessageCircle">
              Chat on WhatsApp
            </Button>
            <p className="mt-3 text-center text-sm text-faint">
              {site.phone} · {site.email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
