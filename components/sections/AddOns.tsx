"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { CircleCta } from "@/components/ui/CircleCta";
import { addOnGroups } from "@/content/addons";
import { cn } from "@/lib/cn";

/**
 * ADD-ONS — what can be built on top of a website or app.
 *
 * Presented as a filterable index rather than twelve open lists: seventy-odd
 * capabilities shown at once is a wall nobody reads, and the question in the
 * visitor's head is narrow ("can you do payments?"), so let them answer it in
 * one click. The first group is open by default so the section never reads as
 * a row of closed boxes.
 */
export function AddOns({
  id = "addons",
  className,
}: {
  id?: string;
  className?: string;
}) {
  const [open, setOpen] = useState<string>(addOnGroups[0].id);

  return (
    <Section id={id} className={cn("relative", className)} inner="max-w-[100rem]">
      <div className="mb-12">
        <SectionHeading
          eyebrow="Add-ons"
          title="Everything you can bolt on"
          accent="to a build."
          lede="A website is rarely just a website. These are the pieces we add most often — pick what you need, and we will tell you honestly which ones you do not."
          aside={<CircleCta href="/contact" label="Ask what you need" size={132} />}
        />
      </div>

      <Reveal mode="stagger">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {addOnGroups.map((g) => {
            const isOpen = open === g.id;
            return (
              <div
                key={g.id}
                className={cn(
                  "plate overflow-hidden rounded-2xl transition-colors duration-400",
                  isOpen ? "border-white/20 sm:col-span-2 lg:col-span-3" : "hover:border-white/15"
                )}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`addon-${g.id}`}
                  onClick={() => setOpen(isOpen ? "" : g.id)}
                  data-cursor="lg"
                  className="flex w-full items-center gap-4 p-5 text-left"
                >
                  <span
                    className={cn(
                      "grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-colors duration-400",
                      isOpen
                        ? "border-gold-500/40 bg-gold-500/10 text-gold-300"
                        : "border-line bg-raised text-blue-400"
                    )}
                  >
                    <Icon name={g.icon} className="h-5 w-5" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="h-card block text-[17px] text-ink">{g.title}</span>
                    <span className="mt-0.5 block text-[13px] text-faint">
                      {g.items.length} options
                    </span>
                  </span>

                  <span
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-400",
                      isOpen
                        ? "rotate-45 border-gold-500/50 text-gold-300"
                        : "border-line-strong text-muted"
                    )}
                  >
                    <Icon name="Plus" className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                </button>

                <div
                  id={`addon-${g.id}`}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)]",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-line px-5 pb-6 pt-5">
                      <p className="mb-5 max-w-2xl text-[15px] leading-relaxed text-muted">
                        {g.blurb}
                      </p>
                      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                        {g.items.map((it) => (
                          <li
                            key={it}
                            className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-steel-300"
                          >
                            <Icon
                              name="Check"
                              className="mt-1 h-3.5 w-3.5 shrink-0 text-status-live"
                              strokeWidth={2.4}
                            />
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mt-8 max-w-3xl text-[14px] leading-relaxed text-faint">
          Add-ons are quoted with the project, not billed by surprise. Tools are
          chosen for what suits your business and budget — the named ones above are
          simply what we reach for most often.
        </p>
      </Reveal>
    </Section>
  );
}
