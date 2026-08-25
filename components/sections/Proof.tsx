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
    <section className="relative px-5 py-12 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-[100rem]">
        <Reveal>
          <p className="eyebrow mb-10">By the numbers</p>
        </Reveal>

        {/* No rules and no boxes: the figures are large enough to group
            themselves, and every line drawn between them made the band read as
            a table of four cells instead of one statement. */}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-12">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="relative">
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
