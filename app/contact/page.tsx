import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell us the goal and we will build it. Free 20-minute call, fixed quote up front, reply within one working day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Start a project"
        title="Tell us the goal."
        accent="We'll build the thing."
        lede="No forms that go nowhere. A real person reads every message and replies with a straight answer — including whether we are the right fit."
      />
      <Contact />
    </>
  );
}
