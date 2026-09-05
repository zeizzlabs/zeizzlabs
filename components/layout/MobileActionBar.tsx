"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { whatsappLink, telLink } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

/**
 * Mobile contact affordances — two round buttons and a quote flag.
 *
 * STABILITY. Everything here is `position: fixed` with a safe-area offset and
 * nothing writes a position from JavaScript, so the browser owns the placement
 * and there is nothing to chase. The controls are visible from first paint
 * rather than appearing at a scroll threshold: a threshold is one more thing
 * that can flap, and the flag is wanted over the hero anyway.
 *
 * The only scroll-driven state is whether the contact section is under them,
 * and that is read once per animation frame with cached offsets — the same
 * discipline the header now uses, for the same reason.
 *
 * THE FLAG'S CLICK. The furled tab and the unfurled label used to be two
 * different elements, swapped on click. Tapping the tab therefore unmounted the
 * element mid-gesture and no navigation ever started — the flag opened and then
 * did nothing. It is now one link for the whole life of the component: the
 * first tap only prevents default and widens it, the second is an ordinary link
 * click that the router handles.
 */
export function MobileActionBar() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number>(0);

  useEffect(() => {
    // Cached offsets, refreshed on resize and load — never per scroll event.
    let box: { top: number; bottom: number } | null = null;
    const measure = () => {
      const el = document.getElementById("contact");
      if (!el) return (box = null);
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY;
      return (box = { top, bottom: top + r.height });
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      if (!box) return setHidden(false);
      const viewBottom = window.scrollY + window.innerHeight;
      setHidden(box.top < viewBottom - 40 && box.bottom > window.scrollY);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    };
  }, []);

  // Unfurled is a flourish, not a mode. It furls itself so it never sits there
  // covering what the reader is trying to get to.
  useEffect(() => {
    if (!open) return;
    closeTimer.current = window.setTimeout(() => setOpen(false), 6000);
    return () => window.clearTimeout(closeTimer.current);
  }, [open]);

  const round =
    "pointer-events-auto grid h-14 w-14 place-items-center rounded-full border " +
    "border-line-strong bg-panel text-ink shadow-[0_8px_28px_-10px_rgba(0,0,0,0.55)] " +
    // No backdrop-blur: a backdrop-filter on a fixed element over scrolling
    // content repaints every frame on iOS and visibly flickers. The panel
    // colour is opaque enough on its own.
    "transition-transform duration-200 active:scale-90";

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-40 sm:hidden",
        "transition-opacity duration-300 ease-[var(--ease-out-quint)]",
        hidden ? "opacity-0" : "opacity-100"
      )}
      aria-hidden={hidden}
    >
      <a
        href={telLink}
        aria-label="Call ZeizzLabs"
        tabIndex={hidden ? -1 : 0}
        className={cn(round, "absolute left-4 bottom-[calc(env(safe-area-inset-bottom)+1rem)]")}
      >
        <Icon name="Phone" className="h-5 w-5 text-blue-400" strokeWidth={1.8} />
      </a>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message ZeizzLabs on WhatsApp"
        tabIndex={hidden ? -1 : 0}
        className={cn(round, "absolute right-4 bottom-[calc(env(safe-area-inset-bottom)+1rem)]")}
      >
        <Icon name="MessageCircle" className="h-5 w-5 text-[var(--color-gold-400)]" strokeWidth={1.8} />
      </a>

      {/*
        One element throughout. `transform-origin: right` is what makes the
        wave read as cloth pinned along its edge rather than a box wobbling.
        /contact is a real route, so this works from every page — the previous
        "/#contact" only resolved on the homepage.
      */}
      {/*
        `top` in vh, not a percentage of the wrapper. The wrapper is inset-0 on
        a fixed layer, so its height follows the visual viewport as the mobile
        URL bar shows and hides — and a percentage of that moved the flag up and
        down through every scroll. vh is resolved against the large viewport and
        does not move.
      */}
      <div className="fixed right-0 top-[52vh] -translate-y-1/2">
        <Link
          href="/contact"
          aria-label="Get a quote"
          aria-expanded={open}
          tabIndex={hidden ? -1 : 0}
          onClick={(e) => {
            if (!open) {
              e.preventDefault();
              setOpen(true);
            }
          }}
          className={cn(
            "quote-flag pointer-events-auto flex items-center justify-center gap-2 rounded-l-lg",
            "text-[#2a1f08] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]",
            "[background:linear-gradient(100deg,var(--color-gold-300),var(--color-gold-400)_55%,var(--color-gold-500))]",
            "transition-[width,height,padding] duration-500 ease-[var(--ease-out-expo)]",
            open ? "h-12 w-[9.5rem] px-4" : "h-16 w-8"
          )}
        >
          {open ? (
            <>
              <span className="whitespace-nowrap text-[13px] font-semibold tracking-tight">
                Get a quote
              </span>
              <Icon name="ArrowUpRight" className="h-4 w-4 shrink-0" strokeWidth={2} />
            </>
          ) : (
            <Icon name="Sparkles" className="h-4 w-4" strokeWidth={2} />
          )}
        </Link>
      </div>
    </div>
  );
}
