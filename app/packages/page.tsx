import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Packages } from "@/components/sections/Packages";
import { AddOns } from "@/components/sections/AddOns";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = pageMetadata({
  title: "Packages",
  description:
    "Everything ZeizzLabs builds, and what can be added to it. Business websites, mobile apps, AI calling agents, WhatsApp automation, branding and e-commerce — each with a fixed written quote on enquiry.",
  path: "/packages",
});

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we build"
        title="Pick a starting point."
        accent="We shape the rest."
        lede="Every project gets a fixed written quote before work begins — no hourly invoices you cannot predict. If your project needs less than a package, we will tell you."
      />
      <Packages showHeading={false} />
      <AddOns />
      <Faq />
      <FinalCta />
    </>
  );
}
