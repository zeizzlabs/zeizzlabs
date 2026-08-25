import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { CircleCta } from "@/components/ui/CircleCta";
import { ScrollFocus } from "@/components/motion/ScrollFocus";
import { processSteps } from "@/content/process";

/**
 * Home-page teaser for the process. Deliberately the opposite theme to the
 * page, so the rhythm breaks once as you scroll — the trick the studios use to
 * stop a long page reading as one undifferentiated scroll. The site defaults
 * to light, so this block is the dark one.
 */
export function ProcessTeaser() {
  return (
    <Section data-theme="dark" className="border-y border-line" inner="max-w-[100rem]">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="How we work"
            title="Six steps."
            accent="No mystery."
            lede="A fixed quote before anything starts, a live link from week one, and something concrete handed over at every stage."
            aside={<CircleCta href="/process" label="The full process" size={124} />}
          />
        </div>

        <ol>
          {processSteps.map((s) => (
            <Reveal as="li" key={s.no} className="border-t border-line py-7 last:border-b">
              <ScrollFocus>
              <div className="flex items-baseline gap-5">
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
              </ScrollFocus>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
