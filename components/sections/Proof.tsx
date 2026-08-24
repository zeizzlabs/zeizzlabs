import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Icon } from "@/components/ui/Icon";
import { stats } from "@/content/offerings";

const promises = [
  {
    icon: "ShieldCheck",
    title: "You own it all",
    body: "Code, designs, domain and hosting accounts are in your name from day one. No lock-in.",
  },
  {
    icon: "Zap",
    title: "Built for speed",
    body: "Every build is tuned for Core Web Vitals — fast sites rank higher and convert better.",
  },
  {
    icon: "Users",
    title: "One team, start to finish",
    body: "The people who design it are the people who build it and the people who answer your calls.",
  },
];

/**
 * PROOF — numbers first, then the three promises that remove the usual risk of
 * hiring an agency. Deliberately placed straight after the hero: the skill's
 * Trust & Authority pattern puts credibility before the solution overview.
 */
export function Proof() {
  return (
    <Section className="relative py-16 sm:py-20 md:py-24">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 70}>
            <div className="plate group relative h-full overflow-hidden rounded-card p-6 text-center transition-colors duration-500 hover:border-white/15">
              <div className="font-display text-4xl font-bold tracking-tight text-gradient sm:text-5xl">
                <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-sm font-medium text-ink">{s.label}</p>
              {s.note && <p className="mt-1 text-[12.5px] text-faint">{s.note}</p>}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {promises.map((p, i) => (
          <Reveal key={p.title} delay={i * 70}>
            <div className="flex h-full items-start gap-4 rounded-card border border-line bg-white/[0.015] p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-blue-400">
                <Icon name={p.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="h-card text-base text-ink">{p.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{p.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
