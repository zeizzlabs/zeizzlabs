import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = pageMetadata({
  title: "How we work",
  description:
    "Six steps from first call to launch and beyond — with a fixed quote, a staging link from week one, and something concrete delivered at every stage.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="Six steps."
        accent="No mystery."
        lede="You always know what stage the project is at, what you get at the end of it, and what it costs."
        meta={[
          { label: "First call", value: "Free, 20 minutes" },
          { label: "Quote", value: "Fixed before work starts" },
          { label: "Visibility", value: "Live staging from week one" },
          { label: "After launch", value: "Support included" },
        ]}
      />
      <Process />
      <FinalCta />
    </>
  );
}
