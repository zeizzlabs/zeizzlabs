"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Icon } from "@/components/ui/Icon";
import { ShaderField } from "@/components/visual/ShaderField";
import { RotatingWord } from "@/components/sections/RotatingWord";
import { site, whatsappLink } from "@/content/site";

/**
 * HERO.
 *
 * Layers, cheapest first: WebGL shader field → grid → content. The intro
 * timeline waits for the preloader's `zeizz:intro-done` event so the headline
 * animates into a page the visitor is actually looking at, rather than playing
 * to an empty room behind the curtain.
 *
 * On scroll the whole block is pinned briefly and pushed away with a scrubbed
 * timeline, so leaving the hero feels like a camera move rather than a scroll.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const intro = gsap.timeline({ paused: true });
      intro
        .fromTo(
          "[data-hero-line]",
          { yPercent: 118 },
          { yPercent: 0, duration: 1.25, stagger: 0.085, ease: "zeizz" }
        )
        .fromTo(
          "[data-hero-stagger]",
          { y: 26, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 },
          "-=0.85"
        )
        .fromTo(
          "[data-hero-cue]",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.6 },
          "-=0.4"
        );

      // If the intro already ran this session the preloader never mounts, so
      // fall back to playing immediately on the next frame.
      const seen = sessionStorage.getItem("zeizz.intro.seen") === "1";
      if (seen) {
        gsap.delayedCall(0.05, () => intro.play());
      } else {
        window.addEventListener("zeizz:intro-done", () => intro.play(), { once: true });
      }

      // Scrubbed exit — content drifts up and dims as the hero is left behind.
      gsap.to("[data-hero-content]", {
        yPercent: -18,
        autoAlpha: 0.15,
        filter: "blur(6px)",
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === root.current) t.kill();
        });
      };
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="noise relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-32 text-center sm:px-6 sm:pt-36"
    >
      <ShaderField className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-25" />

      <div data-hero-content className="relative z-10 flex flex-col items-center">
        <div
          data-hero-stagger
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line-strong glass px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-steel-300"
        >
          <span className="relative grid h-2 w-2 place-items-center">
            <span className="absolute h-2 w-2 rounded-full bg-status-live/70 animate-ring" />
            <span className="h-1.5 w-1.5 rounded-full bg-status-live" />
          </span>
          Taking new projects
        </div>

        <h1 className="max-w-5xl text-balance">
          {/* Each line rides inside its own mask so it rises out of nothing. */}
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="h-display block text-ink">
              Everything digital.
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="h-display block text-gradient">
              Endless possibilities.
            </span>
          </span>
        </h1>

        <p
          data-hero-stagger
          className="mt-7 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 font-mono text-xs uppercase tracking-[0.22em] text-faint sm:text-[13px]"
        >
          <span>We build</span>
          <RotatingWord />
        </p>

        <p
          data-hero-stagger
          className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-[17px]"
        >
          {site.brandName} is the digital team behind growing businesses — websites
          and apps, brand and design, AI agents that answer your calls, and
          automation that removes the busywork. One studio, start to finish.
        </p>

        <div
          data-hero-stagger
          className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
        >
          <Magnetic className="w-full sm:w-auto">
            <Button href="/#contact" size="lg" arrow className="w-full sm:w-auto">
              Start a project
            </Button>
          </Magnetic>
          <Button
            href={whatsappLink}
            size="lg"
            variant="secondary"
            icon="MessageCircle"
            className="w-full sm:w-auto"
          >
            Chat on WhatsApp
          </Button>
        </div>

        <ul
          data-hero-stagger
          className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] text-faint"
        >
          {["Free consultation", "Fixed quote up front", "You own everything"].map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5">
              <Icon name="Check" className="h-3.5 w-3.5 text-status-live" strokeWidth={2.2} />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <a
        data-hero-cue
        href="#services"
        aria-label="Scroll to services"
        className="group relative z-10 mt-14 hidden flex-col items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-faint transition-colors hover:text-steel-300 sm:flex"
      >
        <span>Explore</span>
        <span className="relative h-10 w-px overflow-hidden bg-line-strong">
          <span className="absolute inset-x-0 top-0 h-4 animate-[float-y_2.2s_ease-in-out_infinite] bg-gradient-to-b from-blue-400 to-transparent" />
        </span>
      </a>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
    </section>
  );
}
