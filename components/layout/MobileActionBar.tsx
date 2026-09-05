"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { whatsappLink, telLink } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

/**
 * Mobile contact affordances — two round buttons and a quote flag.
 *
 * WHY THE OLD BAR MOVED. It was a full-width bar that re-anchored itself to the
 * visual viewport on every `visualViewport` scroll and resize event, writing a
 * new `bottom` each frame. The intent was right — `position: fixed` is anchored
 * to the layout viewport, which on a phone stays tall while the visible area
 * shrinks under the URL bar. But iOS fires those events continuously through
 * the URL-bar animation and through rubber-band overscroll, and the value it
 * reports mid-gesture is not stable. So the bar chased a moving number and
 * visibly juddered up and down the whole time you scrolled.
 *
 * The fix is to stop fighting the browser. Two small round buttons pinned to
 * the bottom corners and a flag on the right edge are all small enough that
 * they sit inside the safe area at every URL-bar state, so plain `fixed` with
 * `env(safe-area-inset-bottom)` is correct and never needs a single write from
 * JavaScript. Nothing is measured per frame, so there is nothing left to
 * judder.
 *
 * Colour comes from tokens that are already redefined under
 * [data-theme="dark"], so both themes are handled without a second code path.
 */
export function MobileActionBar() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const shown = useRef(false);
  const closeTimer = useRef<number>(0);

  useEffect(() => {
    /**
     * One rAF-throttled read, and it only ever sets a boolean.
     *
     * The hysteresis matters: a single threshold flaps on and off while the
     * scroll position sits near it, which is a second, independent reason the
     * old bar looked unstable.
     */
    let raf = 0;

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const past = shown.current ? y > 60 : y > 140;

      // Over the contact section the form is right there; floating buttons on
      // top of it are just in the way.
      const contact = document.getElementById("contact");
      let overContact = false;
      if (contact) {
        const r = contact.getBoundingClientRect();
        overContact = r.top < window.innerHeight * 0.9 && r.bottom > 0;
      }

      const next = past && !overContact;
      if (next !== shown.current) {
        shown.current = next;
        setShow(next);
        if (!next) setOpen(false);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Unfurled is a look-at-me state, not a mode. It furls itself again so it
  // never sits there covering content the reader is trying to get to.
  useEffect(() => {
    if (!open) return;
    closeTimer.current = window.setTimeout(() => setOpen(false), 5000);
    return () => window.clearTimeout(closeTimer.current);
  }, [open]);

  const round =
    "pointer-events-auto grid h-14 w-14 place-items-center rounded-full border " +
    "border-line-strong bg-panel text-ink shadow-[0_8px_28px_-10px_rgba(0,0,0,0.55)] " +
    "backdrop-blur-xl transition-transform duration-200 active:scale-90";

  return (
    <div
      aria-hidden={!show}
      className={cn(
        "pointer-events-none fixed inset-0 z-40 sm:hidden",
        "transition-opacity duration-300 ease-[var(--ease-out-quint)]",
        show ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Call — bottom left. */}
      <a
        href={telLink}
        aria-label="Call ZeizzLabs"
        tabIndex={show ? 0 : -1}
        className={cn(
          round,
          "absolute left-4 bottom-[calc(env(safe-area-inset-bottom)+1rem)]",
          "transition-[translate,opacity] duration-300",
          show ? "translate-y-0" : "pointer-events-none translate-y-6"
        )}
      >
        <Icon name="Phone" className="h-5 w-5 text-blue-400" strokeWidth={1.8} />
      </a>

      {/* WhatsApp — bottom right. */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message ZeizzLabs on WhatsApp"
        tabIndex={show ? 0 : -1}
        className={cn(
          round,
          "absolute right-4 bottom-[calc(env(safe-area-inset-bottom)+1rem)]",
          "transition-[translate,opacity] duration-300",
          show ? "translate-y-0" : "pointer-events-none translate-y-6"
        )}
      >
        <Icon name="MessageCircle" className="h-5 w-5 text-[var(--color-gold-400)]" strokeWidth={1.8} />
      </a>

      {/*
        The quote flag — pinned to the right edge, hanging around the middle.
        Furled it is a bare gold tab with no words on it. Tapping unfurls it
        into "Get a quote", which is the link.

        `transform-origin: right` is the whole trick: every transform pivots on
        the edge it is pinned to, so the rotate/skew reads as cloth catching
        wind rather than a box wobbling.
      */}
      <div className="absolute right-0 top-[56%] flex -translate-y-1/2 items-center">
        {open ? (
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className={cn(
              "quote-flag pointer-events-auto flex items-center gap-2 rounded-l-lg py-3 pl-4 pr-3",
              "text-[13px] font-semibold tracking-tight whitespace-nowrap",
              "text-[#2a1f08] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]",
              "[background:linear-gradient(100deg,var(--color-gold-300),var(--color-gold-400)_55%,var(--color-gold-500))]"
            )}
          >
            Get a quote
            <Icon name="ArrowUpRight" className="h-4 w-4" strokeWidth={2} />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Get a quote"
            tabIndex={show ? 0 : -1}
            className={cn(
              "quote-flag pointer-events-auto grid h-16 w-8 place-items-center rounded-l-lg",
              "text-[#2a1f08] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]",
              "[background:linear-gradient(100deg,var(--color-gold-300),var(--color-gold-400)_55%,var(--color-gold-500))]"
            )}
          >
            <Icon name="Sparkles" className="h-4 w-4" strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
}
