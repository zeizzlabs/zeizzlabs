import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { offerings, tiers } from "@/content/offerings";
import { cn } from "@/lib/cn";

/**
 * PACKAGES — two layers of choice.
 *   1. Individual offerings, for people who know what they want.
 *   2. Three engagement tiers, for people who want it decided for them.
 * Transparent pricing is the biggest single trust lever for an agency site.
 */
export function Packages() {
  return (
    <Section id="packages" className="relative border-y border-line bg-ink-900/40">
      <div className="dot-matrix pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative">
        <SectionHeading
          align="center"
          eyebrow="Packages & pricing"
          title="Pick a starting point."
          accent="We'll shape the rest around you."
          lede="Clear starting prices, a fixed quote before any work begins, and no hourly invoices you can't predict. If your project needs less than a package, we'll tell you."
        />

        {/* Individual offerings */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((o, i) => (
            <Reveal key={o.id} delay={(i % 3) * 70}>
              <SpotlightCard
                className={cn(
                  "flex h-full flex-col p-6",
                  o.featured && "border-gold-500/30"
                )}
              >
                {o.featured && (
                  <span className="absolute right-5 top-5 rounded-full border border-gold-500/40 bg-gold-500/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-gold-300">
                    Most asked for
                  </span>
                )}

                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white/[0.03] text-blue-400">
                  <Icon name={o.icon} className="h-5 w-5" />
                </span>

                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                  {o.type}
                </p>
                <h3 className="h-card mt-1.5 text-lg text-ink">{o.name}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
                  {o.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {o.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-[13.5px] text-steel-300">
                      <Icon
                        name="Check"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-status-live"
                        strokeWidth={2.4}
                      />
                      {pt}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                  <span className="text-sm text-faint">
                    {o.from ? (
                      <>
                        from <span className="font-medium text-ink">{o.from}</span>
                      </>
                    ) : (
                      "Custom quote"
                    )}
                  </span>
                  <Button href="/#contact" size="sm" variant="secondary" arrow>
                    Enquire
                  </Button>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* Engagement tiers */}
        <div className="mt-16">
          <Reveal>
            <p className="eyebrow mb-8 text-center">Or work with us end to end</p>
          </Reveal>

          <div className="grid items-start gap-5 lg:grid-cols-3">
            {tiers.map((t, i) => (
              <Reveal key={t.id} delay={i * 90} variant={t.featured ? "scale" : "up"}>
                <div
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-xl2 p-7 transition-all duration-500 sm:p-8",
                    t.featured
                      ? "conic-ring plate lg:-my-4 lg:py-12 shadow-[0_40px_100px_-50px_rgba(30,123,255,0.8)]"
                      : "plate hover:border-white/15"
                  )}
                >
                  {t.featured && (
                    <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full [background:var(--gradient-brand)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                      <Icon name="Sparkles" className="h-3 w-3" strokeWidth={2} />
                      Most popular
                    </span>
                  )}

                  <h3 className="h-card text-2xl text-ink">{t.name}</h3>
                  <p className="mt-1.5 text-[14px] text-muted">{t.tagline}</p>

                  <div className="mt-6 flex items-end gap-2">
                    <span
                      className={cn(
                        "font-display text-4xl font-bold tracking-tight",
                        t.featured ? "text-gradient" : "text-ink"
                      )}
                    >
                      {t.price}
                    </span>
                    <span className="pb-1.5 text-[12.5px] text-faint">{t.priceNote}</span>
                  </div>

                  <ul className="mt-7 space-y-3">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[14px] text-steel-300">
                        <Icon
                          name="Check"
                          className={cn(
                            "mt-0.5 h-4 w-4 shrink-0",
                            t.featured ? "text-gold-300" : "text-status-live"
                          )}
                          strokeWidth={2.2}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <Button
                      href="/#contact"
                      variant={t.featured ? "primary" : "secondary"}
                      className="w-full"
                      arrow
                    >
                      {t.cta}
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-8 text-center text-[13px] text-faint">
              Prices are indicative starting points and exclude taxes. Every project
              gets a fixed written quote before work begins.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
