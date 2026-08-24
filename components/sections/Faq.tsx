import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { faqs } from "@/content/offerings";
import { whatsappLink } from "@/content/site";

export function Faq() {
  return (
    <Section id="faq" className="relative">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Questions"
            title="Straight"
            accent="answers."
            lede="The things people actually ask before hiring us — answered honestly, including the parts other agencies leave vague."
          />
          <Reveal delay={220}>
            <div className="mt-8 rounded-card border border-line bg-white/[0.02] p-6">
              <p className="text-sm leading-relaxed text-muted">
                Still unsure? Send us a message — we&apos;ll tell you what we&apos;d
                do, even if the answer is &ldquo;you don&apos;t need us yet&rdquo;.
              </p>
              <Button
                href={whatsappLink}
                size="sm"
                variant="secondary"
                icon="MessageCircle"
                className="mt-4"
              >
                Ask on WhatsApp
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </Section>
  );
}
