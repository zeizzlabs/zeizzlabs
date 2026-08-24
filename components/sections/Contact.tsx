import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Aurora } from "@/components/visual/Aurora";
import { ContactForm } from "@/components/forms/ContactForm";
import { site, whatsappLink, telLink, mailLink } from "@/content/site";

const channels = [
  {
    icon: "MessageCircle",
    label: "WhatsApp",
    value: "Fastest reply",
    href: whatsappLink,
    tone: "text-status-live",
  },
  { icon: "Phone", label: "Call us", value: site.phone, href: telLink, tone: "text-blue-400" },
  { icon: "Mail", label: "Email", value: site.email, href: mailLink, tone: "text-gold-300" },
];

/**
 * CONTACT — the final conversion point. The form is the primary path; the
 * direct channels sit beside it for people who'd rather just message a human.
 */
export function Contact() {
  return (
    <Section id="contact" className="relative overflow-hidden border-t border-line">
      <Aurora intensity={0.85} />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Start a project"
            title="Tell us the goal."
            accent="We'll build the thing."
            lede="No forms that go nowhere. A real person reads every message and replies with a straight answer — including whether we're the right fit."
          />

          <div className="mt-9 space-y-2">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex min-h-[64px] items-center gap-4 rounded-card border border-line bg-white/[0.02] px-5 transition-all duration-400 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] ${c.tone}`}>
                    <Icon name={c.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] text-faint">{c.label}</span>
                    <span className="block truncate text-[15px] font-medium text-ink">
                      {c.value}
                    </span>
                  </span>
                  <Icon
                    name="ArrowUpRight"
                    className="h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                  />
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.28}>
            <div className="mt-8 flex items-start gap-3 rounded-card border border-gold-500/20 bg-gold-500/[0.05] p-5">
              <Icon name="Clock" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-300" />
              <p className="text-[13.5px] leading-relaxed text-steel-300">
                First call is free and takes about 20 minutes. You&apos;ll leave it
                with a clear scope and a fixed price — whether or not you hire us.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal mode="fade" delay={0.12}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
