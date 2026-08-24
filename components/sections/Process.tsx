"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { processSteps } from "@/content/process";
import { cn } from "@/lib/cn";

/**
 * PROCESS — a sticky rail on the left, steps scrolling past on the right.
 *
 * The rail's fill and the active step are driven by one rAF-throttled scroll
 * read of the section's bounding box, so there's a single measurement per frame
 * and no per-step observers. On mobile the rail collapses to a simple
 * numbered timeline and every step is shown fully.
 */
export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section's top reaches mid-screen, 1 when its bottom does.
      const total = r.height - vh * 0.5;
      const p = Math.max(0, Math.min(1, (vh * 0.5 - r.top) / Math.max(total, 1)));
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
      setActive(Math.min(processSteps.length - 1, Math.floor(p * processSteps.length)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <Section id="process" className="relative">
      <div ref={sectionRef}>
        <SectionHeading
          eyebrow="How we work"
          title="Six steps."
          accent="No mystery, no surprises."
          lede="You always know what stage the project is at, what you'll get at the end of it, and what it costs. Here's exactly how a ZeizzLabs build runs."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
          {/* Sticky rail. Desktop gets the full stepper; touch gets a compact
              progress bar pinned under the header, so the section reads as
              moving there too instead of being a plain list. */}
          <div className="lg:hidden">
            <div className="sticky top-[calc(var(--nav-h)+0.5rem)] z-20 -mx-5 px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-gold-400">
                  {processSteps[active]?.title}
                </span>
                <span className="relative h-px flex-1 overflow-hidden bg-line-strong">
                  <span
                    className="absolute inset-y-0 left-0 [background:var(--gradient-brand)] transition-[width] duration-300"
                    style={{ width: `${((active + 1) / processSteps.length) * 100}%` }}
                  />
                </span>
                <span className="font-mono text-[10.5px] tabular-nums text-faint">
                  {active + 1}/{processSteps.length}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-32">
              <div className="flex gap-6">
                {/* Track + fill */}
                <div className="relative w-px bg-line">
                  <div
                    ref={fillRef}
                    className="absolute inset-x-0 top-0 h-full origin-top [background:var(--gradient-brand)]"
                    style={{ transform: "scaleY(0)" }}
                  />
                </div>

                <ol className="flex-1 space-y-5">
                  {processSteps.map((s, i) => (
                    <li key={s.no}>
                      <button
                        type="button"
                        onClick={() =>
                          document
                            .getElementById(`step-${s.no}`)
                            ?.scrollIntoView({ behavior: "smooth", block: "center" })
                        }
                        className={cn(
                          "flex w-full items-center gap-3 text-left transition-all duration-400",
                          i === active ? "opacity-100" : "opacity-40 hover:opacity-70"
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "h-1.5 w-1.5 shrink-0 rotate-45 transition-colors",
                            i === active ? "bg-gold-300" : "bg-line-strong"
                          )}
                        />
                        <span
                          className={cn(
                            "h-card text-lg transition-colors",
                            i === active ? "text-ink" : "text-muted"
                          )}
                        >
                          {s.title}
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-10 rounded-card border border-line bg-raised p-5">
                <p className="text-sm leading-relaxed text-muted">
                  Most projects go live in{" "}
                  <span className="font-medium text-ink">2 to 4 weeks</span>.
                </p>
                <Button href="/#contact" size="sm" arrow className="mt-4">
                  Book a free call
                </Button>
              </div>
            </div>
          </div>

          {/* Steps */}
          <ol className="space-y-4">
            {processSteps.map((s, i) => (
              <Reveal key={s.no} as="li" delay={0.04}>
                <div
                  id={`step-${s.no}`}
                  className={cn(
                    "plate group relative overflow-hidden rounded-card p-6 transition-all duration-500 sm:p-8",
                    i === active
                      ? "border-white/20 bg-raised shadow-[0_24px_60px_-40px_rgba(30,123,255,0.7)]"
                      : ""
                  )}
                >
                  <div className="relative flex items-start gap-4">
                    <span
                      className={cn(
                        "grid h-12 w-12 shrink-0 place-items-center rounded-xl border transition-colors duration-500",
                        i === active
                          ? "border-blue-500/40 bg-blue-500/10 text-blue-300"
                          : "border-line bg-raised text-muted"
                      )}
                    >
                      <Icon name={s.icon} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="h-card text-xl text-ink sm:text-2xl">{s.title}</h3>
                      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
                        {s.body}
                      </p>
                      <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-raised px-3.5 py-1.5 text-[12.5px] text-steel-300">
                        <Icon
                          name="BadgeCheck"
                          className="h-3.5 w-3.5 text-status-live"
                          strokeWidth={1.8}
                        />
                        You get: {s.deliverable}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
