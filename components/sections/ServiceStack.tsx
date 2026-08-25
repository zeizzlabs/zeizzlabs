"use client";

import { useRef, useState } from "react";
import { services } from "@/content/services";
import { TransitionLink } from "@/components/motion/PageTransition";
import { Icon } from "@/components/ui/Icon";
import { prefersReducedMotion } from "@/lib/gsap";
import { useRafScroll, range, ease } from "@/lib/use-raf-scroll";
import { cn } from "@/lib/cn";

/**
 * SERVICES, on a phone — one card at a time, swapped by scroll.
 *
 * The desktop index works because hover lets one row own the screen. Touch has
 * no hover, so the phone version does it with position instead: every pillar
 * occupies the same slot, and scrolling hands that slot from one to the next.
 * The incoming card slides in from alternating sides while the outgoing one
 * blurs back and away, so the two are visibly the same object being replaced
 * rather than a list moving past.
 *
 * The scroll is scrubbed, not triggered: each frame reads one bounding box and
 * writes transforms straight to the DOM. Nothing here goes through React state
 * except the segment indicator, which changes a handful of times per section.
 */

/** Vertical scroll spent on each hand-off, in units of viewport height. */
const STEP_VH = 56;

export function ServiceStack() {
  const wrap = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const reduced = useRef<boolean | null>(null);

  const last = services.length - 1;

  useRafScroll(() => {
    if (reduced.current === null) reduced.current = prefersReducedMotion();
    if (reduced.current) return;

    const el = wrap.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    // The sticky child pins for everything past the first viewport, so that is
    // exactly the distance the scrub runs over.
    const travel = Math.max(1, r.height - window.innerHeight);
    const p = range(-r.top, 0, travel);
    const pos = p * last;

    setActive(Math.round(pos));

    for (let i = 0; i < services.length; i++) {
      const node = cards.current[i];
      if (!node) continue;

      const t = pos - i;
      const inP = ease(range(t, -0.9, -0.05));
      const outP = ease(range(t, 0.3, 0.95));
      const opacity = inP * (1 - outP);

      if (opacity < 0.008) {
        node.style.visibility = "hidden";
        node.style.willChange = "auto";
        node.style.opacity = "0";
        continue;
      }

      // Odd cards arrive from the right, even from the left; each leaves back
      // the way the next one is coming from, so the two cross.
      const dir = i % 2 === 0 ? -1 : 1;
      const x = dir * 78 * (1 - inP) - dir * 42 * outP;
      const scale = 0.94 + 0.06 * inP - 0.08 * outP;
      const blur = 9 * (1 - inP) + 10 * outP;

      node.style.visibility = "visible";
      node.style.willChange = "transform, opacity, filter";
      node.style.opacity = String(opacity);
      node.style.transform = `translate3d(${x.toFixed(2)}px,0,0) scale(${scale.toFixed(4)})`;
      node.style.filter = blur < 0.05 ? "none" : `blur(${blur.toFixed(2)}px)`;
    }
  });

  return (
    <div
      ref={wrap}
      className="relative lg:hidden"
      style={{ height: `calc(100svh + ${last * STEP_VH}svh)` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pb-24 pt-[calc(var(--nav-h)+1.25rem)]">
        <div className="relative min-h-[26rem] flex-1">
          {services.map((s, i) => (
            <div
              key={s.id}
              ref={(n) => {
                cards.current[i] = n;
              }}
              /* Every card sits in the same slot; only one is ever legible. The
                 first is painted visible so the section is not blank before the
                 first scroll frame lands. */
              className="absolute inset-0 flex flex-col justify-center"
              style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }}
              aria-hidden={i !== active}
            >
              <TransitionLink
                href={`/services/${s.id}`}
                className="plate block rounded-[1.5rem] border border-line p-6 sm:p-8"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-raised text-blue-300">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>

                <h3 className="mt-5 font-display text-[clamp(1.9rem,8vw,2.6rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink">
                  {s.title}
                </h3>

                <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.blurb}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.deliverables.map((d) => (
                    <li
                      key={d}
                      className="rounded-full border border-line px-3 py-1.5 text-[12px] text-steel-400"
                    >
                      {d}
                    </li>
                  ))}
                </ul>

                <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-gold-300">
                  Open
                  <Icon name="ArrowUpRight" className="h-4 w-4" />
                </span>
              </TransitionLink>
            </div>
          ))}
        </div>

        {/* Segment indicator rather than a counter — it shows how far through
            the set you are without putting numbering back on the page. */}
        <ul className="mt-6 flex shrink-0 gap-1.5" aria-hidden>
          {services.map((s, i) => (
            <li
              key={s.id}
              className={cn(
                "h-[3px] flex-1 rounded-full transition-colors duration-300",
                i === active ? "[background:var(--gradient-brand)]" : "bg-line-strong"
              )}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
