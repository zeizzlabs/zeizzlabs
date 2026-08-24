import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Packages } from "@/components/sections/Packages";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Packages & pricing",
  description:
    "Clear starting prices and a fixed quote before any work begins. Business websites, AI calling agents, WhatsApp automation, branding, e-commerce and retainers.",
};

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Packages & pricing"
        title="Pick a starting point."
        accent="We shape the rest."
        lede="No hourly invoices you cannot predict. If your project needs less than a package, we will tell you."
      />
      <Packages />
      <Faq />
      <FinalCta />
    </>
  );
}
