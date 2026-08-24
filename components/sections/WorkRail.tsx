"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { projects } from "@/content/work";
import { Icon } from "@/components/ui/Icon";
import { Frame } from "@/components/ui/Frame";
import { TransitionLink } from "@/components/motion/PageTransition";
import { cn } from "@/lib/cn";
import type { WorkLabel } from "@/lib/types";

/**
 * WORK — a pinned horizontal rail.
 *
 * The section pins to the viewport and vertical scrolling drives the rail
 * sideways, so the work is browsed like a shelf rather than scrolled past like
 * a feed. Each slide is near-full-bleed, which lets a single project own the
 * screen instead of competing with three others in a grid.
 *
 * The distance scrolled is computed from real measured widths so it works at
 * any viewport and with any number of projects, and it is recalculated on
 * resize. Below `lg` the rail degrades to a normal swipeable row — pinning a
 * short viewport traps the visitor, which is the classic failure of this
 * pattern.
 */

const labelStyle: Record<WorkLabel, string> = {
  live: "border-status-live/50 text-status-live",
  prototype: "border-blue-500/50 text-blue-300",
  experiment: "border-gold-500/50 text-gold-300",
  concept: "border-line-strong text-steel-400",
};

export function WorkRail() {
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const track = rail.current!;
        const distance = () => track.scrollWidth - window.innerWidth + 96;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: 0.8,
            // One viewport of vertical scroll per screen of horizontal travel.
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden py-16 sm:py-20">
      <div className="mx-auto mb-10 flex max-w-[100rem] items-end justify-between gap-6 px-5 sm:px-8">
        <p className="eyebrow">
          {String(projects.length).padStart(2, "0")} projects
        </p>
        <p className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint lg:flex">
          Scroll to explore
          <Icon name="ArrowRight" className="h-3.5 w-3.5" />
        </p>
      </div>

      <div
        ref={rail}
        data-cursor="drag"
        className={cn(
          "h-rail gap-5 px-5 sm:px-8",
          // Below lg this is a normal swipeable row, never a pinned trap.
          "max-lg:overflow-x-auto max-lg:snap-x max-lg:snap-mandatory max-lg:pb-4"
        )}
      >
        {projects.map((p, i) => (
          <TransitionLink
            key={p.slug}
            href={`/work/${p.slug}`}
            data-cursor="text"
            data-cursor-text="View"
            className="group relative block w-[86vw] shrink-0 overflow-hidden rounded-[1.5rem] border border-line transition-colors duration-500 hover:border-white/25 max-lg:snap-center sm:w-[70vw] lg:w-[46rem]"
          >
            {/* Project artwork — masked reveal, settle-scale and parallax. */}
            <Frame
              src={p.image}
              alt={`${p.name} — ${p.category}`}
              rounded=""
              sizes="(max-width: 1024px) 86vw, 46rem"
              className="h-[42vh] min-h-[16rem] lg:h-[52vh]"
            >
              <span className="absolute left-6 top-6 font-mono text-[11px] tracking-[0.2em] text-white/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "absolute right-6 top-6 rounded-full border bg-ink-950/70 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] backdrop-blur",
                  labelStyle[p.label]
                )}
              >
                {p.label}
              </span>
              <h3 className="absolute bottom-5 left-6 right-6 font-display text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-none tracking-[-0.04em] text-ink">
                {p.name}
              </h3>
            </Frame>

            <div className="bg-ink-950 p-6 sm:p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                {p.category}
              </p>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted">
                {p.summary}
              </p>
              <p className="mt-4 flex items-start gap-2 text-[13.5px] text-steel-300">
                <Icon
                  name="Activity"
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold-400"
                  strokeWidth={1.8}
                />
                {p.outcome}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-faint"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </TransitionLink>
        ))}
      </div>

      {/* Progress rail — only meaningful while pinned. */}
      <div className="mx-auto mt-10 hidden max-w-[100rem] px-8 lg:block">
        <span className="relative block h-px w-full overflow-hidden bg-line-strong">
          <span
            ref={bar}
            className="absolute inset-0 origin-left [background:var(--gradient-brand)]"
            style={{ transform: "scaleX(0)" }}
          />
        </span>
      </div>
    </section>
  );
}
