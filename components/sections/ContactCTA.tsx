import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { site, whatsappLink } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

export function ContactCTA() {
  const telHref = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <Section id="contact">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full [background:var(--gradient-brand)]" />
              Work With Us
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Tell us what your business{" "}
              <span className="text-gradient">needs.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted sm:text-lg">
              A website, WhatsApp automation, an AI agent, an AI calling
              system — or something you can&apos;t quite name yet. Tell us the
              goal and we&apos;ll figure out how to build it.
            </p>
          </Reveal>

          {/* Direct contact methods */}
          <Reveal delay={200}>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-card border border-line bg-surface/60 px-4 py-3 transition-colors hover:border-line-strong"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/[0.05] text-status-live">
                  <Icon name="MessageCircle" className="h-4 w-4" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs uppercase tracking-[0.14em] text-faint">
                    WhatsApp
                  </span>
                  <span className="text-sm font-medium text-ink tabular-nums">
                    {site.phone}
                  </span>
                </span>
                <Icon
                  name="ArrowUpRight"
                  className="ml-auto h-4 w-4 text-muted transition-colors group-hover:text-ink"
                />
              </a>

              <a
                href={telHref}
                className="group flex items-center gap-3 rounded-card border border-line bg-surface/60 px-4 py-3 transition-colors hover:border-line-strong"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/[0.05] text-blue">
                  <Icon name="Phone" className="h-4 w-4" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs uppercase tracking-[0.14em] text-faint">
                    Call
                  </span>
                  <span className="text-sm font-medium text-ink tabular-nums">
                    {site.phone}
                  </span>
                </span>
                <Icon
                  name="ArrowUpRight"
                  className="ml-auto h-4 w-4 text-muted transition-colors group-hover:text-ink"
                />
              </a>

              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-3 rounded-card border border-line bg-surface/60 px-4 py-3 transition-colors hover:border-line-strong"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/[0.05] text-magenta">
                  <Icon name="ArrowRight" className="h-4 w-4" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs uppercase tracking-[0.14em] text-faint">
                    Email
                  </span>
                  <span className="text-sm font-medium text-ink">{site.email}</span>
                </span>
                <Icon
                  name="ArrowUpRight"
                  className="ml-auto h-4 w-4 text-muted transition-colors group-hover:text-ink"
                />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="relative">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
