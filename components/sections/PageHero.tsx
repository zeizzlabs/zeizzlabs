import { Reveal } from "@/components/motion/Reveal";
import { CircuitField } from "@/components/visual/CircuitField";
import { Aurora } from "@/components/visual/Aurora";

/**
 * The opening block of every inner page. Deliberately asymmetric and
 * left-aligned rather than the centred hero the home page uses, so an inner
 * page reads as a chapter rather than a second front door.
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  lede,
  meta,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lede?: string;
  meta?: { label: string; value: string }[];
}) {
  return (
    <header className="noise relative isolate overflow-hidden px-5 pb-16 pt-[calc(var(--nav-h)+5rem)] sm:px-8 sm:pb-24 sm:pt-[calc(var(--nav-h)+7rem)]">
      <Aurora intensity={0.55} />
      <CircuitField className="opacity-55" />

      <div className="relative mx-auto max-w-[100rem]">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-gradient-to-r from-gold-500/70 to-transparent" />
          <span className="eyebrow">{eyebrow}</span>
        </div>

        <h1 className="mt-7 max-w-5xl">
          <Reveal mode="lines" className="h-display block text-ink">
            {title}
          </Reveal>
          {accent && (
            <Reveal mode="lines" delay={0.12} className="h-display block text-gradient">
              {accent}
            </Reveal>
          )}
        </h1>

        {lede && (
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-pretty text-[19px] leading-relaxed text-muted sm:text-[21px]">
              {lede}
            </p>
          </Reveal>
        )}

        {meta && meta.length > 0 && (
          <Reveal mode="stagger" delay={0.28}>
            <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {meta.map((m) => (
                <div key={m.label} className="bg-canvas p-5">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-gold-400">
                    {m.label}
                  </dt>
                  <dd className="mt-2 text-[15px] text-ink">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>
    </header>
  );
}
