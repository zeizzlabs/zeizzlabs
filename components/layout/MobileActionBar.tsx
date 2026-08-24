"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site, whatsappLink, telLink } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

/**
 * Persistent mobile action bar — Call / WhatsApp / Quote.
 *
 * For a services business most mobile visitors want to contact you, not read.
 * The bar appears once the hero is past (so it never covers the first
 * impression) and hides while the contact section is on screen, since the form
 * is already right there. Sits above the iOS home indicator via safe-area
 * padding, and every target clears 44px.
 */
export function MobileActionBar() {
  const [show, setShow] = useState(false);
  // Read inside the scroll handler without re-subscribing it every render.
  const shown = useRef(false);

  useEffect(() => {
    /**
     * One source of truth, measured in a single rAF-throttled read.
     *
     * The previous version had a scroll handler and an IntersectionObserver
     * both writing this state, and they disagreed whenever the contact section
     * entered or left the viewport — which is what made the bar flicker. It
     * also waited three quarters of a viewport before appearing, so on a long
     * hero it felt like it never came.
     */
    let raf = 0;

    const update = () => {
      raf = 0;
      // Matches the header's trigger so the two arrive together, but with a
      // dead zone: a single threshold flaps on and off when the scroll position
      // sits near it, which is what made the bar look unstable.
      const y = window.scrollY;
      const past = shown.current ? y > 8 : y > 24;

      // Hide it over the contact section: the form is right there, and a
      // floating bar on top of it is just in the way.
      const contact = document.getElementById("contact");
      let overContact = false;
      if (contact) {
        const r = contact.getBoundingClientRect();
        overContact = r.top < window.innerHeight * 0.9 && r.bottom > 0;
      }

      const next = past && !overContact;
      shown.current = next;
      setShow(next);
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

  const items = [
    { href: telLink, label: "Call", icon: "Phone", sub: site.phone },
    { href: whatsappLink, label: "WhatsApp", icon: "MessageCircle", sub: "Chat now" },
  ];

  return (
    <div
      aria-hidden={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden",
        // Only the slide and the fade animate. `transition-all` also animated
        // the repositioning the mobile URL bar causes, which made it drift.
        // Note `translate`, not `transform`: Tailwind v4's translate-y-*
        // utilities set the standalone `translate` property, so naming
        // `transform` here would leave the slide un-animated.
        "transition-[translate,opacity] duration-300 ease-[var(--ease-out-quint)]",
        // Promote to its own layer without writing `transform` here, which
        // would fight the translate-y utilities below.
        "[will-change:translate,opacity]",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      )}
    >
      <div className="glass flex items-center gap-2 rounded-2xl border border-line-strong p-2 shadow-[0_-10px_40px_-20px_rgba(0,0,0,1)]">
        {items.map((it) => (
          <a
            key={it.label}
            href={it.href}
            target={it.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-raised px-3 text-[13px] font-medium text-ink active:scale-[0.97] transition-transform"
          >
            <Icon name={it.icon} className="h-4 w-4 text-blue-400" strokeWidth={1.8} />
            {it.label}
          </a>
        ))}
        <Link
          href="/#contact"
          className="flex min-h-[46px] flex-1 items-center justify-center rounded-xl px-3 text-[13px] font-semibold text-white [background:var(--gradient-brand)] active:scale-[0.97] transition-transform"
        >
          Get a quote
        </Link>
      </div>
    </div>
  );
}
