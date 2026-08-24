import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIndex } from "./ServiceIndex";
import { CircleCta } from "@/components/ui/CircleCta";

export function Services() {
  return (
    <Section id="services" className="relative" inner="max-w-[100rem]">
      <div className="mb-14 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="What we do"
          title="Eight pillars."
          accent="One studio."
          lede="Most businesses stitch together a web guy, a designer, an agency and a freelancer. We cover all of it — so the site, the brand, the AI and the automation are built to work together."
        />
        <CircleCta href="/services" label="All services" />
      </div>

      <ServiceIndex />
    </Section>
  );
}
