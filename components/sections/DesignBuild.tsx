import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

const disciplines = ["Strategy", "Design", "Engineering", "AI", "Automation"];
const flow = [
  { label: "Idea", icon: "Sparkles" },
  { label: "Design", icon: "PenTool" },
  { label: "Build", icon: "Code2" },
  { label: "Automate", icon: "Workflow" },
  { label: "Launch", icon: "Rocket" },
  { label: "Scale", icon: "BarChart3" },
];

export function DesignBuild() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="Design + Development"
        align="center"
        title={
          <>
            We don&apos;t just design interfaces.{" "}
            <span className="text-gradient">We build the systems behind them.</span>
          </>
        }
        intro="Strategy, design, engineering, AI, and automation under one roof — so an idea becomes a real, running product instead of a handoff between five vendors."
      />

      <Reveal className="mt-8 flex flex-wrap justify-center gap-2">
        {disciplines.map((d) => (
          <span
            key={d}
            className="rounded-full border border-line-strong bg-white/[0.03] px-4 py-1.5 text-sm font-medium text-ink"
          >
            {d}
          </span>
        ))}
      </Reveal>

      {/* Pipeline */}
      <div className="relative mt-14">
        {/* animated gradient rail */}
        <div className="absolute left-0 right-0 top-7 hidden h-px [background:var(--gradient-brand)] bg-[length:200%_auto] animate-sweep opacity-60 md:block" />
        <ol className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
          {flow.map((step, i) => (
            <Reveal as="li" key={step.label} delay={i * 60} className="relative flex flex-col items-center text-center">
              <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-line-strong bg-surface text-ink">
                <Icon name={step.icon} className="h-6 w-6" />
              </span>
              <span className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-faint">
                Step {i + 1}
              </span>
              <span className="font-display text-base font-semibold text-ink">
                {step.label}
              </span>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
