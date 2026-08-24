import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Frame } from "@/components/ui/Frame";
import { Reveal } from "@/components/motion/Reveal";
import { Ticker } from "@/components/sections/Ticker";
import { Proof } from "@/components/sections/Proof";
import { FinalCta } from "@/components/sections/FinalCta";
import { CircleCta } from "@/components/ui/CircleCta";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "ZeizzLabs is a digital creation and innovation studio — one team covering design, engineering, AI and automation for businesses that want to grow online.",
};

const beliefs = [
  {
    n: "01",
    t: "One team beats four freelancers",
    b: "When the designer, the developer and the person wiring your AI are the same team, nothing gets lost in the handover — and there is nobody to blame but us.",
  },
  {
    n: "02",
    t: "Speed is a feature, not a setting",
    b: "A beautiful site that takes six seconds to load is a broken site. Performance is designed in from the first decision, not bolted on before launch.",
  },
  {
    n: "03",
    t: "You should own everything",
    b: "Code, designs, domain, hosting — all in your name from day one. If you ever want to leave, you can, and that keeps us honest.",
  },
  {
    n: "04",
    t: "Say the uncomfortable thing",
    b: "If your idea needs less than you asked for, or the timing is wrong, we will tell you. Losing a project is cheaper than building the wrong one.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="05"
        eyebrow="About"
        title="A studio built"
        accent="to do all of it."
        lede={`${site.brandName} exists because most businesses are forced to assemble their digital presence from strangers who never speak to each other. We do the whole thing.`}
      />

      <div className="px-5 sm:px-8">
        <Frame
          src="/media/about-studio.jpg"
          alt=""
          priority
          sizes="(max-width: 1024px) 92vw, 100rem"
          className="mx-auto h-[40vh] min-h-[15rem] max-w-[100rem] lg:h-[54vh]"
        />
      </div>

      <Section inner="max-w-[100rem]">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow mb-6">What we believe</p>
            </Reveal>
            <Reveal mode="lines">
              <p className="text-pretty text-2xl leading-snug text-steel-300 sm:text-3xl">
                Four positions that decide every call we make on a project.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10">
                <CircleCta href="/contact" label="Work with us" size={132} />
              </div>
            </Reveal>
          </div>

          <ul>
            {beliefs.map((x) => (
              <Reveal as="li" key={x.n} mode="fade" className="border-t border-line py-8 last:border-b">
                <div className="flex gap-5">
                  <span className="font-mono text-[11px] leading-7 tracking-[0.2em] text-gold-400/80">
                    {x.n}
                  </span>
                  <div>
                    <h3 className="h-card text-xl text-ink sm:text-2xl">{x.t}</h3>
                    <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-muted">
                      {x.b}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Ticker />
      <Proof />
      <FinalCta />
    </>
  );
}
