import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { projects } from "@/content/work";
import { cn } from "@/lib/cn";
import type { WorkLabel } from "@/lib/types";

const labelStyle: Record<WorkLabel, string> = {
  live: "border-status-live/40 bg-status-live/10 text-status-live",
  prototype: "border-blue-500/40 bg-blue-500/10 text-blue-300",
  experiment: "border-gold-500/40 bg-gold-500/10 text-gold-300",
  concept: "border-line-strong bg-white/[0.04] text-steel-400",
};

/**
 * WORK — capability demonstrations, labelled honestly. Nothing here claims a
 * client or a revenue figure that didn't happen; the label on each card says
 * exactly what stage it's at. Swap in real client projects via content/work.ts.
 */
export function Work() {
  return (
    <Section id="work" className="relative">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Selected work"
          title="Things we've built"
          accent="to prove they work."
          lede="Real systems, built end to end. Each one is labelled for exactly what it is — a live build, a working prototype or an experiment — because you deserve to know the difference."
        />
        <Reveal delay={180} className="shrink-0">
          <Button href="/#contact" variant="secondary" arrow>
            Discuss your project
          </Button>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 80}>
            <SpotlightCard tilt className="h-full">
              {/* Preview plate — a gradient field with a faint circuit motif. */}
              <div
                className="relative h-44 overflow-hidden sm:h-52"
                style={{
                  background: `linear-gradient(135deg, ${p.accent[0]}22, ${p.accent[1]}12 55%, transparent)`,
                }}
              >
                <div className="grid-lines absolute inset-0 opacity-50" />
                <div
                  aria-hidden
                  className="absolute -bottom-10 -right-6 h-40 w-40 rounded-full blur-3xl"
                  style={{ background: `${p.accent[0]}44` }}
                />
                <div className="absolute inset-x-6 bottom-5 flex items-end justify-between gap-4">
                  <span className="font-display text-3xl font-bold tracking-tight text-ink/90 sm:text-4xl">
                    {p.name}
                  </span>
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em]",
                      labelStyle[p.label]
                    )}
                  >
                    {p.label}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                  {p.category}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.summary}</p>

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
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
