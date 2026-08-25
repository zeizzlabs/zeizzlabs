"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { CircleCta } from "@/components/ui/CircleCta";
import { TransitionLink } from "@/components/motion/PageTransition";
import { offerings } from "@/content/offerings";
import { addOnGroups } from "@/content/addons";
import { cn } from "@/lib/cn";

/**
 * PACKAGES — an expanding index of what we build.
 *
 * The offerings are a table, not a grid of cards: name and category on
 * one line, with the detail unfolding in place when a row is opened. That keeps
 * all six comparable at a glance, which is what someone choosing between them
 * actually needs — six equal cards force a scan of six separate blocks to
 * answer one question.
 */
export function Packages({
  /**
   * The /packages page already leads with this exact heading, so it is
   * suppressed there. On the home page the section still needs to introduce
   * itself.
   */
  showHeading = true,
}: {
  showHeading?: boolean;
} = {}) {
  const [open, setOpen] = useState<string | null>(offerings[0]?.id ?? null);

  return (
    <Section id="packages" className="relative" inner="max-w-[100rem]">
      {showHeading && (
        <div className="mb-14">
          <SectionHeading
            eyebrow="What we build"
            title="Pick a starting point."
            accent="We shape the rest."
            lede="Tell us what you are trying to do and you get a fixed written quote before any work begins. If your project needs less than a package, we will say so."
            aside={<CircleCta href="/contact" label="Send enquiry" size={132} />}
          />
        </div>
      )}

      {/* Index of what we build */}
      <div className="border-t border-line">
        {offerings.map((o) => {
          const isOpen = open === o.id;
          return (
            <div key={o.id} className="border-b border-line">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`pkg-${o.id}`}
                onClick={() => setOpen(isOpen ? null : o.id)}
                data-cursor="lg"
                className="group flex w-full items-center gap-4 py-6 text-left sm:gap-8"
              >
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block font-display text-[clamp(1.25rem,3vw,2.35rem)] font-semibold leading-tight tracking-[-0.03em] transition-colors duration-400",
                      isOpen ? "text-ink" : "text-steel-400 group-hover:text-ink"
                    )}
                  >
                    {o.name}
                  </span>
                  <span className="mt-1 block font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">
                    {o.type}
                    {o.featured && (
                      <span className="ml-3 text-gold-400">Most asked for</span>
                    )}
                  </span>
                </span>

                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-400",
                    isOpen
                      ? "rotate-45 border-gold-500/60 bg-gold-500/10 text-gold-300"
                      : "border-line-strong text-muted group-hover:border-white/30"
                  )}
                >
                  <Icon name="Plus" className="h-4 w-4" strokeWidth={1.8} />
                </span>
              </button>

              <div
                id={`pkg-${o.id}`}
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-600 ease-[var(--ease-out-expo)]",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="pb-9">
                    <div className="grid gap-8 sm:grid-cols-[1fr_1fr] lg:grid-cols-[1.2fr_1fr_auto]">
                      <p className="max-w-md text-[15px] leading-relaxed text-muted">
                        {o.description}
                      </p>
                      <ul className="space-y-2">
                        {o.points.map((pt) => (
                          <li
                            key={pt}
                            className="flex items-start gap-2 text-[14px] text-steel-300"
                          >
                            <Icon
                              name="Check"
                              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-status-live"
                              strokeWidth={2.4}
                            />
                            {pt}
                          </li>
                        ))}
                      </ul>
                      <TransitionLink
                        href="/contact"
                        className="group/link inline-flex h-11 items-center gap-2 self-start rounded-full border border-line-strong px-5 text-[13.5px] font-medium text-ink transition-colors hover:border-gold-500/60"
                      >
                        Enquire
                        <Icon
                          name="ArrowUpRight"
                          className="h-4 w-4 transition-transform duration-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        />
                      </TransitionLink>
                    </div>

                    {/* What people most often add to this specific package. The
                        full catalogue is further down the page; this is the
                        shortlist relevant to what they just opened. */}
                    {o.addOns && o.addOns.length > 0 && (
                      <div className="mt-8 border-t border-line pt-6">
                        <p className="eyebrow mb-4">Commonly added to this</p>
                        <ul className="flex flex-wrap gap-2">
                          {o.addOns.map((id) => {
                            const g = addOnGroups.find((x) => x.id === id);
                            if (!g) return null;
                            return (
                              <li key={id}>
                                <a
                                  href="#addons"
                                  className="inline-flex items-center gap-2 rounded-full border border-line bg-raised px-3.5 py-2 text-[13px] text-steel-300 transition-colors hover:border-gold-500/50 hover:text-ink"
                                >
                                  <Icon
                                    name={g.icon}
                                    className="h-3.5 w-3.5 text-blue-400"
                                    strokeWidth={1.8}
                                  />
                                  {g.title}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Reveal delay={0.2}>
        <p className="mt-10 text-[13px] text-faint">
          Every project gets a fixed written quote before work begins — no hourly
          invoices you cannot predict.
        </p>
      </Reveal>

    </Section>
  );
}
