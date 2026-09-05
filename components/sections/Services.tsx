import { servicesCountWord } from "@/content/services";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIndex } from "./ServiceIndex";
import { CircleCta } from "@/components/ui/CircleCta";

export function Services() {
  return (
    <Section id="services" className="relative" inner="max-w-[100rem]">
      <div className="mb-14">
        <SectionHeading
          eyebrow="What we do"
          title={`${servicesCountWord} pillars.`}
          accent="One studio."
          lede="Most businesses stitch together a web guy, a designer, an agency and a freelancer. We cover all of it — so the site, the brand, the AI and the automation are built to work together."
          aside={<CircleCta href="/services" label="All services" size={132} />}
        />
      </div>

      <ServiceIndex chips="glow" />
    </Section>
  );
}
