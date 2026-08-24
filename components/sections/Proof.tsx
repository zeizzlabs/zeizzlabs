import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/ui/Counter";
import { stats } from "@/content/offerings";

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
    <section className="relative px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[100rem]">
        <Reveal>
          <p className="eyebrow mb-10">By the numbers</p>
        </Reveal>

        <dl className="grid divide-y divide-line border-y border-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className="relative py-9 sm:px-8 sm:first:pl-0 lg:border-l lg:border-line lg:first:border-l-0"
            >
              <dd className="font-display text-[clamp(3rem,7vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.05em] text-gradient">
                <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </dd>
              <dt className="mt-5 text-[15px] font-medium text-ink">{s.label}</dt>
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
