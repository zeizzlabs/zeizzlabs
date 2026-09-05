import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { WorkRail } from "@/components/sections/WorkRail";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Live client platforms, commerce with real payments, six industry website templates and the studio's own R&D — each card labelled with the stage it is actually at.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Built, and"
        accent="running."
        lede="Live platforms taking real payments, six industry templates, and the experiments we have not finished yet. Every card says which of those it is — no invented clients, no borrowed metrics."
      />
      <WorkRail />
      <FinalCta />
    </>
  );
}
