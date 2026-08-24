import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/types";

/**
 * SERVICES — the eight brand pillars as an asymmetric bento grid.
 *
 * Grid rules (desktop, 6 columns):
 *   hero → 3 cols x 2 rows   wide → 3 cols   default → 2 cols
 * On mobile everything collapses to a single column in source order, which is
 * also priority order — Software & Development first, AI second.
 */

const accentRing: Record<Service["accent"], string> = {
  blue: "text-blue-400 border-blue-500/25 bg-blue-500/[0.07]",
  gold: "text-gold-300 border-gold-500/30 bg-gold-500/[0.07]",
  steel: "text-steel-300 border-steel-500/25 bg-steel-500/[0.07]",
};

const accentGlow: Record<Service["accent"], string> = {
  blue: "from-blue-500/20",
  gold: "from-gold-500/18",
  steel: "from-steel-500/14",
};

function span(s: Service) {
  if (s.span === "hero") return "md:col-span-3 md:row-span-2";
  if (s.span === "wide") return "md:col-span-3";
  return "md:col-span-2";
}

function Tile({ s, i }: { s: Service; i: number }) {
  const isHero = s.span === "hero";
  return (
    <Reveal delay={Math.min(i, 5) * 60} className={cn("min-w-0", span(s))}>
      <SpotlightCard className={cn("flex h-full flex-col p-6 sm:p-7", isHero && "sm:p-9")}>
        {/* Corner glow keyed to the pillar's accent family. */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br to-transparent blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-60",
            accentGlow[s.accent]
          )}
        />

        <div className="relative flex items-start justify-between gap-4">
          <span
            className={cn(
              "grid place-items-center rounded-xl border transition-transform duration-500 group-hover:-translate-y-0.5",
              accentRing[s.accent],
              isHero ? "h-14 w-14" : "h-12 w-12"
            )}
          >
            <Icon name={s.icon} className={isHero ? "h-6 w-6" : "h-5 w-5"} strokeWidth={1.5} />
          </span>
          <span className="font-mono text-[11px] tracking-[0.2em] text-faint">
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>

        <h3
          className={cn(
            "h-card relative mt-6 text-ink",
            isHero ? "text-2xl sm:text-[2rem]" : "text-xl"
          )}
        >
          {s.title}
        </h3>
        <p
          className={cn(
            "relative mt-3 text-pretty leading-relaxed text-muted",
            isHero ? "max-w-md text-[15.5px]" : "text-[14.5px]"
          )}
        >
          {s.blurb}
        </p>

        <ul className="relative mt-6 flex flex-wrap gap-2">
          {s.deliverables.map((d) => (
            <li
              key={d}
              className="rounded-full border border-line bg-white/[0.02] px-3 py-1.5 text-[12px] text-steel-400 transition-colors group-hover:border-white/15"
            >
              {d}
            </li>
          ))}
        </ul>

        {isHero && (
          <div className="relative mt-auto pt-10">
            <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
              {[
                { k: "Design", v: "In Figma, approved by you" },
                { k: "Build", v: "Fast, accessible, SEO-ready" },
                { k: "Launch", v: "Domain & hosting handled" },
              ].map((x) => (
                <div key={x.k} className="bg-ink-900/80 p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-400">
                    {x.k}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-snug text-steel-400">{x.v}</p>
                </div>
              ))}
            </div>
            <Button href="/#packages" variant="secondary" size="sm" arrow className="mt-6">
              See packages
            </Button>
          </div>
        )}
      </SpotlightCard>
    </Reveal>
  );
}

export function Services() {
  return (
    <Section id="services" className="relative">
      <div className="dot-matrix pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="Eight pillars."
            accent="One studio."
            lede="Most businesses stitch together a web guy, a designer, an agency and a freelancer. ZeizzLabs covers all of it — so the website, the brand, the AI and the automation are actually built to work together."
          />
          <Reveal delay={200} className="shrink-0">
            <Button href="/#contact" variant="secondary" arrow>
              Not sure what you need?
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(0,auto)] grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          {services.map((s, i) => (
            <Tile key={s.id} s={s} i={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
