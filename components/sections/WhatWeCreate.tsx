import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CapabilityCard } from "@/components/cards/CapabilityCard";
import { capabilities } from "@/content/capabilities";

export function WhatWeCreate() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title={
          <>
            Everything your business needs, <span className="text-gradient">built for you.</span>
          </>
        }
        intro="Full-stack digital services — from your website to AI agents that answer the phone. One team for everything you need to run and grow online."
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
