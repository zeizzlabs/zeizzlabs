import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { CircleCta } from "@/components/ui/CircleCta";
import { processSteps } from "@/content/process";

/**
 * Home-page teaser for the process. A light-themed block, so the page inverts
 * once as you scroll it — the section rhythm the studios use to stop a long
 * dark page from reading as one undifferentiated scroll.
 */
export function ProcessTeaser() {
  return (
    <Section data-theme="light" className="border-y border-line" inner="max-w-[100rem]">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="How we work"
            title="Six steps."
            accent="No mystery."
            lede="A fixed quote before anything starts, a live link from week one, and something concrete handed over at every stage."
          />
          <Reveal delay={0.2}>
            <div className="mt-10">
              <CircleCta href="/process" label="The full process" size={132} />
            </div>
          </Reveal>
        </div>

        <ol>
          {processSteps.map((s) => (
            <Reveal as="li" key={s.no} className="border-t border-line py-7 last:border-b">
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-[11px] tracking-[0.2em] text-gold-400">
                  {s.no}
                </span>
                <div className="min-w-0">
                  <h3 className="h-card text-2xl text-ink sm:text-3xl">{s.title}</h3>
                  <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">
                    {s.body}
                  </p>
                  <p className="mt-3 text-[13px] text-faint">
                    You get: <span className="text-steel-400">{s.deliverable}</span>
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
