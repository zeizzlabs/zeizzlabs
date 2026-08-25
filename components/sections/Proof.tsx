import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/ui/Counter";
import { stats } from "@/content/offerings";
import { cn } from "@/lib/cn";

/**
 * PROOF — a full-bleed editorial band, not a row of stat cards.
 *
 * Numbers are set at display scale and separated by hairlines rather than boxed
 * up, so the band reads as a single statement across the page. Each figure
 * carries its own qualifier underneath, because a number without a clarifier is
 * a claim waiting to be misread.
 */
export function Proof() {
  return (
    <section className="relative px-5 py-12 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-[100rem]">
        <Reveal>
          <p className="eyebrow mb-10">By the numbers</p>
        </Reveal>

        <dl className="grid grid-cols-2 border-y border-line lg:grid-cols-4">
          {stats.map((s, i) => (
            /* Two columns on phones, four from lg. Every rule is drawn with a
               one-directional variant (`max-lg:` below, `lg:` above) rather than
               a base class an `lg:` utility has to override — same-specificity
               border overrides are decided by stylesheet order, not class
               order, and that fight is not worth having. */
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={cn(
                "relative py-8 pr-4 sm:py-9 sm:pr-8",
                i >= 2 && "max-lg:border-t max-lg:border-line",
                i % 2 === 1 && "max-lg:border-l max-lg:border-line max-lg:pl-4 sm:max-lg:pl-6",
                i !== 0 && "lg:border-l lg:border-line lg:pl-8"
              )}
            >
              <dd className="font-display text-[clamp(2.5rem,10vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.05em] text-gradient">
                <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </dd>
              <dt className="mt-4 text-[14px] font-medium leading-snug text-ink sm:mt-5 sm:text-[15px]">{s.label}</dt>
              {s.note && (
                <p className="mt-1.5 text-[13px] leading-relaxed text-faint">{s.note}</p>
              )}
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
