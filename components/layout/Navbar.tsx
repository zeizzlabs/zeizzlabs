"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { nav } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={cn(
            "flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300",
            scrolled
              ? "glass border-line-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
              : "border-transparent"
          )}
        >
          <Logo variant="emblem" size={40} priority />

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <Button href="/#contact" size="md" arrow>
                Start a Project
              </Button>
            </span>
            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-ink lg:hidden"
            >
              <Icon name={open ? "X" : "Menu"} className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu panel */}
      <div
        className={cn(
          "fixed inset-0 top-0 z-40 origin-top bg-bg-950/95 backdrop-blur-xl transition-all duration-300 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="flex h-full flex-col px-6 pt-28 pb-10">
          <ul className="flex flex-col gap-1">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-line py-4 font-display text-2xl font-medium text-ink"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  {item.label}
                  <Icon name="ArrowUpRight" className="h-5 w-5 text-muted" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <Button href="/#contact" size="lg" arrow className="w-full" >
              Start a Project
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
