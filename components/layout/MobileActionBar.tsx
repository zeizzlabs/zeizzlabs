"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const contact = document.getElementById("contact");
    let io: IntersectionObserver | undefined;
    if (contact) {
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setShow(false);
          else onScroll();
        },
        { threshold: 0.15 }
      );
      io.observe(contact);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
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
        "fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-all duration-500 ease-[var(--ease-out-expo)] sm:hidden",
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
            className="flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-white/[0.03] px-3 text-[13px] font-medium text-ink active:scale-[0.97] transition-transform"
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
