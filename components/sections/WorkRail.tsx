"use client";

import { useDragMarquee } from "@/lib/use-drag-marquee";
import { projects, workLabels } from "@/content/work";
import { Icon } from "@/components/ui/Icon";
import { TransitionLink } from "@/components/motion/PageTransition";
import Image from "next/image";
import { mediaSrc } from "@/lib/media-manifest";
import { cn } from "@/lib/cn";
import type { Project, WorkLabel } from "@/lib/types";

/**
 * WORK — two rails travelling in opposite directions.
 *
 * The old version pinned the section and drove one full-bleed rail from the
 * scroll position. It read well on a desktop and badly on a phone, where a
 * pinned section is a trap and one card at 86vw means the shelf is browsed a
 * card at a time. Two counter-moving rows show the range at a glance: the eye
 * catches the opposition immediately and the whole body of work reads as
 * bigger than it would in a single line.
 *
 * MOTION. Pure CSS `transform` on a duplicated track, so it runs on the
 * compositor and costs nothing per frame — which matters, because the last
 * round of work on this site was removing per-frame repaints that made the
 * page shimmer. No JavaScript touches the position at any point.
 *
 * CONTROL. Each row is a velocity, not a schedule, so a finger can push it
 * along, drag it back the other way, slow it by leaning against it, or stop it
 * dead — and on release it eases back to its own drift rather than snapping.
 * The rows are independent, so holding one leaves the other running. See
 * lib/use-drag-marquee for the model; a CSS animation cannot do this, because
 * play state is binary and a keyframe has nowhere to put a finger's momentum.
 */

const labelStyle: Record<WorkLabel, string> = {
  live: "border-status-live/50 text-status-live",
  shipped: "border-status-live/40 text-status-live/90",
  "in-development": "border-status-live/50 text-status-live",
  prototype: "border-blue-500/50 text-blue-300",
  research: "border-gold-500/50 text-gold-300",
  concept: "border-line-strong text-steel-400",
};

function Card({ p }: { p: Project }) {
  return (
    <TransitionLink
      href={`/work/${p.slug}`}
      data-cursor="text"
      data-cursor-text="View"
      className="group relative block w-[15rem] shrink-0 overflow-hidden rounded-2xl border border-line bg-canvas transition-colors duration-500 hover:border-white/25 sm:w-[19rem]"
    >
      <div className="relative h-[9.5rem] overflow-hidden bg-panel sm:h-[11.5rem]">
        {p.image ? (
          // next/image rather than Frame: Frame carries a scroll-triggered
          // clip-path reveal and a parallax read, and neither means anything
          // for a card already travelling sideways on its own. The track is
          // rendered twice, so this is 46 pictures — served at card size rather
          // than full width, which is the difference between a few hundred
          // kilobytes and several megabytes on a phone.
          <Image
            src={mediaSrc(p.image)}
            alt={`${p.name} — ${p.category}`}
            fill
            sizes="(max-width: 640px) 15rem, 19rem"
            className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.04]"
          />
        ) : (
          <div
            aria-hidden
            className="h-full w-full bg-[radial-gradient(120%_100%_at_30%_0%,rgba(255,255,255,0.07),transparent_60%)]"
          />
        )}
        <span
          className={cn(
            "absolute right-3 top-3 rounded-full border bg-ink-950/70 px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.16em]",
            labelStyle[p.label]
          )}
        >
          {workLabels[p.label]}
        </span>
      </div>

      <div className="p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
          {p.category}
        </p>
        <h3 className="mt-1.5 font-display text-[17px] font-semibold leading-tight tracking-[-0.02em] text-ink">
          {p.name}
        </h3>
      </div>
    </TransitionLink>
  );
}

function Rail({ items, dir }: { items: Project[]; dir: "left" | "right" }) {
  // Pixels per second. Left-travelling rows carry a negative velocity, which
  // is the only difference between the two rows.
  const { viewport, track, wasDragged, handlers } = useDragMarquee({
    base: dir === "left" ? -38 : 38,
  });

  return (
    <div
      ref={viewport}
      // touch-pan-y keeps vertical page scrolling native while the horizontal
      // axis belongs to the rail; without it the browser claims the gesture
      // and the drag never reaches us.
      // Named so the rail can be found unambiguously — the homepage has other
      // horizontal flex tracks, and a class selector picked the wrong one.
      data-work-rail={dir}
      className="relative touch-pan-y select-none overflow-hidden py-2"
      {...handlers}
      onClickCapture={(e) => {
        // A drag that ends on a card would otherwise open it.
        if (wasDragged()) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <div ref={track} className="flex w-max gap-4 will-change-transform">
        {/* Rendered twice: position wraps at half the scroll width, so the
            second copy stands where the first was and the seam never shows. */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-4" aria-hidden={copy === 1}>
            {items.map((p) => (
              <Card key={`${copy}-${p.slug}`} p={p} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function WorkRail() {
  // Split rather than interleave, so a row is a coherent run of work rather
  // than every other card.
  const half = Math.ceil(projects.length / 2);
  const top = projects.slice(0, half);
  const bottom = projects.slice(half);

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="mx-auto mb-8 flex max-w-[100rem] items-end justify-between gap-6 px-5 sm:px-8">
        <p className="eyebrow">Selected work</p>
        <p className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint sm:flex">
          Drag a row to steer it
          <Icon name="ArrowRight" className="h-3.5 w-3.5" />
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Rail items={top} dir="right" />
        <Rail items={bottom} dir="left" />
      </div>
    </section>
  );
}
