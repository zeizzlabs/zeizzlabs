import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ExperimentCard } from "@/components/cards/ExperimentCard";
import { experiments } from "@/content/lab";

export function Lab() {
  return (
    <Section id="lab">
      {/* faint grid backdrop to make it feel like a lab surface */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-lines opacity-[0.4]"
      />
      <div className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="The Lab"
            title={
              <>
                Where ideas become <span className="text-gradient">experiments.</span>
              </>
            }
            intro="ZeizzLabs is a company that builds things — not just one that sells services. Here's some of what's on the bench right now."
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experiments.map((exp, i) => (
            <Reveal key={exp.id} delay={(i % 3) * 70}>
              <ExperimentCard exp={exp} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
