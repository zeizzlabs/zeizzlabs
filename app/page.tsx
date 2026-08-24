import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { Proof } from "@/components/sections/Proof";
import { Services } from "@/components/sections/Services";
import { AiSystems } from "@/components/sections/AiSystems";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { Packages } from "@/components/sections/Packages";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * Page order follows the Trust & Authority conversion pattern:
 * immersive hero → credibility → solution overview → differentiator →
 * how it works → evidence → transparent pricing → objections → convert.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Proof />
      <Services />
      <AiSystems />
      <Process />
      <Work />
      <Packages />
      <Faq />
      <Contact />
      <FinalCta />
    </>
  );
}
