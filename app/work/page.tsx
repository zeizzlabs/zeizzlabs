import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { WorkRail } from "@/components/sections/WorkRail";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Systems we have built end to end — each labelled honestly as a live build, a working prototype or an experiment.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Built to prove"
        accent="they work."
        lede="Every card says exactly what stage it is at. No invented clients, no borrowed metrics — because you deserve to know the difference."
      />
      <WorkRail />
      <FinalCta />
    </>
  );
}
