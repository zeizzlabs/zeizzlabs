"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { nav, site, whatsappLink, telLink, mailLink, mailAltLink } from "@/content/site";
import { services } from "@/content/services";
import { TransitionLink } from "@/components/motion/PageTransition";
import { Icon } from "@/components/ui/Icon";
import { PreviewCard } from "@/components/ui/PreviewCard";
import { cn } from "@/lib/cn";

/**
 * Full-screen overlay menu.
 *
 * This is the studio-site convention and it does more than a dropdown can: the
 * navigation becomes the page. Oversized index type, a live descriptor column,
 * and a preview panel that tracks the cursor and swaps art per item — so
 * choosing where to go is itself part of the experience.
 *
 * Structure:
 *   left   — numbered index of routes, huge type, mask-reveal per row
 *   right  — cursor-tracked preview keyed to the hovered row
 *   footer — direct contact + the eight pillars as quick links
 */

/**
 * Per-route preview content. Fully generated from brand tokens, so there are no
 * image assets to go missing — add `image` to any entry to swap in real art.
 */
const previews: Record<
  string,
  { from: string; to: string; title: string; icon: string; tags: string[]; image: string }
> = {
  "/": {
    from: "#0f5bd6",
    to: "#dcb877",
    title: "Everything digital",
    icon: "Sparkles",
    tags: ["Studio", "End to end"],
    image: "/media/service-digital-experiences.jpg",
  },
  "/services": {
    from: "#0b429e",
    to: "#4da3ff",
    title: "Eight pillars, one studio",
    icon: "Boxes",
    tags: ["Web", "AI", "Design"],
    image: "/media/service-software-development.jpg",
  },
  "/work": {
    from: "#1e7bff",
    to: "#ecd3a0",
    title: "Selected work",
    icon: "Layers",
    tags: ["Prototypes", "In development"],
    image: "/media/work-voice-reception.jpg",
  },
  "/process": {
    from: "#a37f42",
    to: "#4da3ff",
    title: "Six steps, no mystery",
    icon: "Workflow",
    tags: ["Fixed quote", "2–4 weeks"],
    image: "/media/service-automation-workflows.jpg",
  },
  "/packages": {
    from: "#c9a15c",
    to: "#0f5bd6",
    title: "What we build",
    icon: "BadgeCheck",
    tags: ["Fixed quote", "Fixed scope"],
    image: "/media/service-digital-products.jpg",
  },
  "/about": {
    from: "#5b6880",
    to: "#1e7bff",
    title: "Who you'd work with",
    icon: "Users",
    tags: ["One team", "You own it"],
    image: "/media/about-studio.jpg",
  },
  "/contact": {
    from: "#23c98b",
    to: "#dcb877",
    title: "Start a project",
    icon: "MessageCircle",
    tags: ["Free call", "1-day reply"],
    image: "/media/contact-signal.jpg",
  },
};

export function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();

  // Close on route change and on Escape; lock the page behind the overlay.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } })
      .lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useGSAP(
    () => {
      if (!root.current) return;
      if (prefersReducedMotion()) {
        gsap.set(root.current, { autoAlpha: open ? 1 : 0 });
        return;
      }

      if (open) {
        const tl = gsap.timeline();
        tl.set(root.current, { pointerEvents: "auto" })
          // The panel wipes down as a clip, so it reads as a surface arriving
          // rather than a box fading in.
          .fromTo(
            root.current,
            { clipPath: "inset(0 0 100% 0)", autoAlpha: 1 },
            { clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "zeizz" }
          )
          .fromTo(
            "[data-menu-row]",
            { yPercent: 108 },
            { yPercent: 0, duration: 0.9, stagger: 0.055, ease: "zeizz" },
            "-=0.5"
          )
          .fromTo(
            "[data-menu-fade]",
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05 },
            "-=0.55"
          );
      } else {
        gsap.to(root.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.6,
          ease: "zeizz-in",
          onComplete: () =>
            gsap.set(root.current, { autoAlpha: 0, pointerEvents: "none" }),
        });
      }
    },
    { dependencies: [open] }
  );

  // The preview follows the cursor with a lag, like a held object.
  useEffect(() => {
    if (!open || !preview.current) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(preview.current, "x", { duration: 0.7, ease: "power3" });
    const yTo = gsap.quickTo(preview.current, "y", { duration: 0.7, ease: "power3" });
    const onMove = (e: PointerEvent) => {
      xTo(e.clientX - window.innerWidth * 0.5);
      yTo(e.clientY - window.innerHeight * 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [open]);

  const p = hovered ? previews[hovered] : null;

  return (
    <div
      ref={root}
      id="menu-overlay"
      aria-hidden={!open}
      className="fixed inset-0 z-[120] bg-canvas opacity-0"
      style={{ clipPath: "inset(0 0 100% 0)", pointerEvents: "none" }}
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />

      {/* Cursor-tracked preview. Desktop only — it needs a pointer. */}
      <div
        ref={preview}
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-[62%] top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transition-opacity duration-400 lg:block",
          // Only while a route is actually hovered. Previously the last hovered
          // card stayed on screen even with the pointer well away from the list.
          p ? "opacity-100" : "opacity-0"
        )}
      >
        {p && (
          <PreviewCard
            compact
            className="h-[min(19rem,38vh)] w-[min(15.5rem,24vw)]"
            data={{
              title: p.title,
              icon: p.icon,
              tags: p.tags,
              image: p.image,
              from: p.from,
              to: p.to,
            }}
          />
        )}
      </div>

      <div className="relative flex h-full flex-col justify-between overflow-y-auto px-5 pb-7 pt-[calc(var(--nav-h)+2rem)] sm:px-8">
        {/* Index */}
        <nav aria-label="Primary" className="relative">
          <ul onMouseLeave={() => setHovered(null)}>
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href} className="overflow-hidden">
                  <TransitionLink
                    href={item.href}
                    data-menu-row
                    data-cursor="text"
                    data-cursor-text="Go"
                    onMouseEnter={() => setHovered(item.href)}
                    onFocus={() => setHovered(item.href)}
                    className={cn(
                      "group flex items-baseline gap-4 border-b border-line py-[clamp(0.4rem,1.4vh,1rem)] transition-colors duration-500 sm:gap-8",
                      active ? "text-ink" : "text-steel-400 hover:text-ink"
                    )}
                  >
                    <span className="font-display text-[clamp(1.55rem,min(6.2vw,5.6vh),4.4rem)] font-bold leading-[1.03] tracking-[-0.04em]">
                      {item.label}
                    </span>
                    <span className="ml-auto hidden shrink-0 text-right text-[13px] text-faint transition-colors group-hover:text-steel-300 md:block">
                      {item.desc}
                    </span>
                    <Icon
                      name="ArrowUpRight"
                      className="h-5 w-5 shrink-0 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </TransitionLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Foot: pillars + direct contact */}
        <div className="relative mt-10 grid gap-8 border-t border-line pt-8 lg:grid-cols-[1.4fr_1fr]">
          <div data-menu-fade>
            <p className="eyebrow mb-4">The eight pillars</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {services.map((s) => (
                <li key={s.id}>
                  <TransitionLink
                    href={`/services/${s.id}`}
                    className="text-[13.5px] text-muted transition-colors hover:text-gold-300"
                  >
                    {s.short}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          <div data-menu-fade className="lg:text-right">
            <p className="eyebrow mb-4">Direct</p>
            <ul className="space-y-1.5 text-[14px]">
              <li>
                <a href={telLink} className="text-muted transition-colors hover:text-ink">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={mailLink} className="text-muted transition-colors hover:text-ink">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={mailAltLink} className="text-muted transition-colors hover:text-ink">
                  {site.emailAlt}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-status-live transition-opacity hover:opacity-80 lg:flex-row-reverse"
                >
                  <Icon name="MessageCircle" className="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
