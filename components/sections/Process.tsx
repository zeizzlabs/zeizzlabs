import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/content/products";

export function Process() {
  return (
    <Section id="process">
      <SectionHeading
        eyebrow="Process"
        title={
          <>
            From idea to <span className="text-gradient">launch — and beyond.</span>
          </>
        }
        intro="A clear path, not a black box. Every project we take on moves through these seven stages."
      />

      <ol className="mt-12 space-y-px">
        {processSteps.map((step, i) => (
          <Reveal as="li" key={step.no} delay={(i % 4) * 50}>
            <div className="group relative grid grid-cols-[auto_1fr] items-start gap-5 border-t border-line py-6 transition-colors last:border-b sm:grid-cols-[6rem_1fr_2fr] sm:gap-8">
              <span className="font-display text-2xl font-semibold tabular-nums text-faint transition-colors group-hover:text-ink sm:text-3xl">
                {step.no}
              </span>
              <h3 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                {step.title}
              </h3>
              <p className="col-span-2 text-sm leading-relaxed text-muted sm:col-span-1 sm:text-base">
                {step.body}
              </p>
              {/* left edge illumination on hover */}
              <span className="pointer-events-none absolute left-0 top-0 h-full w-px scale-y-0 [background:var(--gradient-brand)] transition-transform duration-500 group-hover:scale-y-100" />
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
