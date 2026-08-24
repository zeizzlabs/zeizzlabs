import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { Proof } from "@/components/sections/Proof";
import { Services } from "@/components/sections/Services";
import { AiSystems } from "@/components/sections/AiSystems";
import { WorkRail } from "@/components/sections/WorkRail";
import { ProcessTeaser } from "@/components/sections/ProcessTeaser";
import { Packages } from "@/components/sections/Packages";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * The home page is a trailer, not the whole film: each block sells one idea and
 * hands off to a real page. Depth lives in /services, /work, /process and
 * /packages, which is what keeps this page from turning back into a scroll of
 * every section the site owns.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Proof />
      <Services />
      <AiSystems />
      <WorkRail />
      <ProcessTeaser />
      <Packages />
      <Faq />
      <FinalCta />
    </>
  );
}
