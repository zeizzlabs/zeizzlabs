import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CapabilityCard } from "@/components/cards/CapabilityCard";
import { capabilities } from "@/content/capabilities";

export function WhatWeCreate() {
  return (
    <Section id="create">
      <SectionHeading
        eyebrow="What We Create"
        title={
          <>
            If it&apos;s digital, <span className="text-gradient">we can create it.</span>
          </>
        }
        intro="Not a fixed menu of five services — a universe of digital creation. These are examples of what's possible, not the edges of what we do."
      />

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((cap, i) => (
          <Reveal key={cap.id} delay={(i % 3) * 70}>
            <CapabilityCard cap={cap} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
