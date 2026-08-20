import { Hero } from "@/components/sections/Hero";
import { WhatWeCreate } from "@/components/sections/WhatWeCreate";
import { Products } from "@/components/sections/Products";
import { AiAutomation } from "@/components/sections/AiAutomation";
import { DesignBuild } from "@/components/sections/DesignBuild";
import { Philosophy } from "@/components/sections/Philosophy";
import { Process } from "@/components/sections/Process";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeCreate />
      <Products />
      <AiAutomation />
      <DesignBuild />
      <Philosophy />
      <Process />
      <ContactCTA />
    </>
  );
}
