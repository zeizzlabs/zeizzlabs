import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

export function ContactCTA() {
  return (
    <Section id="contact">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full [background:var(--gradient-brand)]" />
              Start a Project
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Got a digital <span className="text-gradient">idea?</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Let&apos;s turn it into something real. Tell us what you&apos;re
              thinking — even if it&apos;s just a rough shape.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 rounded-card border border-line bg-surface/60 p-5">
              <p className="text-sm font-medium text-ink">
                Not sure what you need yet?
              </p>
              <p className="mt-1 text-sm text-muted">
                That&apos;s a fine place to start. Send a note and we&apos;ll
                figure it out together.
              </p>
              <a
                href={`mailto:${site.email}?subject=Let's figure it out`}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-blue"
              >
                Let&apos;s figure it out
                <Icon name="ArrowRight" className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block text-sm text-muted transition-colors hover:text-ink"
            >
              or email {site.email}
            </a>
          </Reveal>
        </div>

        <Reveal delay={120} className="relative">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
