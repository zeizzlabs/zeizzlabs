import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { servicesCount, servicesCountWord } from "@/content/services";
import { ServiceIndex } from "@/components/sections/ServiceIndex";
import { FinalCta } from "@/components/sections/FinalCta";
import { Ticker } from "@/components/sections/Ticker";

export const metadata: Metadata = {
  title: "Services",
  description:
    "One studio for the digital side of a business: websites and apps, AI agents and chatbots, automation, WhatsApp, CRM, SEO, social media, branding, dashboards and custom tools.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={`${servicesCountWord} pillars.`}
        accent="One studio."
        lede="Everything on the digital side of a business, built by one team that talks to itself. Pick the pillar you need — or tell us the goal and we will tell you which ones it takes."
        meta={[
          { label: "Pillars", value: `${servicesCount} disciplines` },
          { label: "Typical build", value: "2–4 weeks" },
          { label: "Quote", value: "Fixed, up front" },
          { label: "Ownership", value: "100% yours" },
        ]}
      />
      <Section inner="max-w-[100rem]" className="pt-0">
        <ServiceIndex />
      </Section>
      <Ticker />
      <FinalCta />
    </>
  );
}
