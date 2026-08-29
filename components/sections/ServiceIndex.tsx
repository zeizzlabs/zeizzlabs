"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { services } from "@/content/services";
import { TransitionLink } from "@/components/motion/PageTransition";
import { Icon } from "@/components/ui/Icon";
import { PreviewCard } from "@/components/ui/PreviewCard";
import { cn } from "@/lib/cn";

/**
 * SERVICES — an editorial index, not a grid of cards.
 *
 * This is the layout the studios use for capability lists and it works because
 * it inverts the usual hierarchy: instead of eight equal boxes competing at
 * once, one enormous row owns the screen at a time and the rest recede. Reading
 * it is a scan down a table of contents, and hovering commits to a single idea.
 *
 * Interaction:
 *   - the hovered row lifts to full white, its neighbours dim
 *   - a preview panel follows the cursor and swaps art per row
 *   - the row's deliverables slide open underneath it
 * Phones get the same list. It used to be a scroll-swapped card stack, one
 * pillar at a time; at sixteen pillars that was nine screens of forced
 * scrolling to read a menu, so the list now renders at every width — hover
 * reveals the deliverables on desktop, touch simply always shows them.
 *
 * (Historical note — the old card stack handed a single
 * card slot from one pillar to the next as you scroll. Hover is the whole
 * mechanism here, and there is no honest touch equivalent of it.
 */

const accents: Record<string, [string, string]> = {
  blue: ["#0f5bd6", "#4da3ff"],
  gold: ["#c9a15c", "#ecd3a0"],
  steel: ["#3d4759", "#7d8da6"],
};

export function ServiceIndex() {
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Touch gets the list without the entrance stagger: the rows start at
      // autoAlpha 0, and a scrub that never resolves on a coarse pointer would
      // leave the whole menu invisible.
      if (window.matchMedia("(pointer: coarse)").matches) return;

      // Rows rise in sequence as the block enters. fromTo, not from — see the
      // note in components/motion/Reveal.tsx.
      gsap.fromTo(
        "[data-svc-row]",
        { yPercent: 100, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.07,
          scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
        }
      );

      if (!window.matchMedia("(pointer: fine)").matches) return;
      const xTo = gsap.quickTo(preview.current, "x", { duration: 0.85, ease: "power3" });
      const yTo = gsap.quickTo(preview.current, "y", { duration: 0.85, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: root }
  );

  const current = active !== null ? services[active] : null;
  const [a, b] = accents[current?.accent ?? "blue"];

  return (
    <div ref={root} className="relative">
      {/* Cursor-tracked preview */}
      <div
        ref={preview}
        aria-hidden
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-30 hidden -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 lg:block",
          current ? "opacity-100" : "opacity-0"
        )}
      >
        {current && (
          <PreviewCard
            className="h-60 w-[19rem]"
            data={{
              title: current.short,
              icon: current.icon,
              tags: current.deliverables,
              image: current.image,
              from: a,
              to: b,
            }}
          />
        )}
      </div>

      <ul onMouseLeave={() => setActive(null)}>
        {services.map((s, i) => {
          const on = active === i;
          const dim = active !== null && !on;
          return (
            <li key={s.id} className="overflow-hidden border-t border-line last:border-b">
              <TransitionLink
                href={`/services/${s.id}`}
                data-svc-row
                data-cursor="text"
                data-cursor-text="Open"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={cn(
                  "group block py-6 transition-opacity duration-500 sm:py-8",
                  dim ? "opacity-35" : "opacity-100"
                )}
              >
                <div className="flex items-baseline gap-4 sm:gap-8">
                  <h3
                    className={cn(
                      "font-display font-bold leading-[1.02] tracking-[-0.04em] transition-all duration-500",
                      "text-[clamp(1.6rem,5.2vw,4.2rem)]",
                      on ? "translate-x-2 text-ink sm:translate-x-4" : "text-steel-400"
                    )}
                  >
                    {s.title}
                  </h3>

                  <span
                    className={cn(
                      "ml-auto hidden max-w-xs shrink text-right text-[13.5px] leading-relaxed transition-colors duration-500 lg:block",
                      on ? "text-steel-300" : "text-faint"
                    )}
                  >
                    {s.blurb}
                  </span>

                  <Icon
                    name="ArrowUpRight"
                    className={cn(
                      "h-5 w-5 shrink-0 transition-all duration-500 sm:h-6 sm:w-6",
                      on
                        ? "translate-x-0 text-gold-300 opacity-100"
                        : "-translate-x-3 text-faint opacity-0"
                    )}
                  />
                </div>

                {/* Deliverables: revealed on hover at desktop, always shown on
                    touch where there is no hover to reveal them with. */}
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-600 ease-[var(--ease-out-expo)]",
                    "grid-rows-[1fr] opacity-100",
                    "lg:opacity-0 lg:grid-rows-[0fr]",
                    on && "lg:grid-rows-[1fr] lg:opacity-100"
                  )}
                >
                  <div className="overflow-hidden">
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {s.deliverables.map((d) => (
                        <li
                          key={d}
                          className="rounded-full border border-line px-3 py-1.5 text-[12px] text-steel-400"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TransitionLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
