import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Aurora } from "@/components/visual/Aurora";
import { CallDemo } from "./CallDemo";
import { systemNodes } from "@/content/process";
import { whatsappLink } from "@/content/site";

const capabilities = [
  {
    icon: "PhoneCall",
    title: "Answers every call",
    body: "Missed calls are missed revenue. The voice agent picks up on the first ring, day or night, in a natural voice.",
  },
  {
    icon: "MessageCircle",
    title: "Replies in seconds",
    body: "WhatsApp, website chat and Instagram DMs handled instantly, with a human handoff the moment it's needed.",
  },
  {
    icon: "Database",
    title: "Knows your business",
    body: "Trained on your prices, policies and catalogue — so it answers correctly instead of improvising.",
  },
  {
    icon: "Workflow",
    title: "Does the follow-up",
    body: "Books the slot, sends the confirmation, updates the CRM and chases the quiet leads on its own.",
  },
];

/**
 * AI SYSTEMS — the differentiator section.
 * Left: the plain-English argument. Right: a live-feeling demo of the calling
 * agent, which is the single most surprising thing the studio offers.
 */
export function AiSystems() {
  return (
    <Section id="ai" className="relative overflow-hidden border-y border-line bg-panel">
      <Aurora intensity={0.7} />

      <div className="relative">
        <SectionHeading
          eyebrow="AI & Intelligence"
          title="An employee that never"
          accent="sleeps, forgets or misses a call."
          lede="Every enquiry you don't answer within five minutes is one your competitor answers instead. We build the AI layer that picks up, replies, books and follows up — wired into the tools you already use."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Argument */}
          <div>
            <ul className="space-y-2">
              {capabilities.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.08} as="li">
                  <div className="group flex gap-4 rounded-card border border-transparent p-4 transition-colors hover:border-line hover:bg-raised">
                    <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/[0.07] text-gold-300 transition-transform duration-500 group-hover:-translate-y-0.5">
                      <Icon name={c.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="h-card text-lg text-ink">{c.title}</h3>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">
                        {c.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            {/* Connected systems */}
            <Reveal delay={0.34}>
              <div className="mt-8 rounded-card border border-line bg-raised p-5">
                <p className="eyebrow mb-4">Plugs into</p>
                <ul className="flex flex-wrap gap-2">
                  {systemNodes.map((n) => (
                    <li
                      key={n.id}
                      className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-[13px] text-steel-300 transition-colors hover:border-blue-500/40 hover:text-ink"
                    >
                      <Icon name={n.icon} className="h-3.5 w-3.5 text-blue-400" />
                      {n.label}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.42}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/#contact" arrow>
                  Get an AI agent
                </Button>
                <Button href={whatsappLink} variant="secondary" icon="MessageCircle">
                  Ask how it works
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Demo */}
          <Reveal mode="fade" delay={0.12} className="lg:sticky lg:top-28 lg:self-start">
            <CallDemo />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
