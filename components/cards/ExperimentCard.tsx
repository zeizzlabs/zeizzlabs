import type { Experiment } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechBadge } from "@/components/ui/TechBadge";

/**
 * A card that behaves like an object inside a digital laboratory. Hover (or
 * focus, or tap on touch) reveals the concept, tech, and a progress meter.
 */
export function ExperimentCard({ exp }: { exp: Experiment }) {
  return (
    <article
      tabIndex={0}
      className="border-glow group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface/60 p-6 transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1"
    >
      {/* Faint blueprint corner marks */}
      <span className="pointer-events-none absolute right-4 top-4 h-3 w-3 border-r border-t border-line-strong opacity-60" />
      <span className="pointer-events-none absolute bottom-4 left-4 h-3 w-3 border-b border-l border-line-strong opacity-60" />

      <div className="flex items-start justify-between gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.05] text-violet">
          <Icon name={exp.icon} className="h-5 w-5" />
        </span>
        <StatusBadge status={exp.status} />
      </div>

      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">
        {exp.name}
      </h3>
      <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.14em] text-faint">
        {exp.kind}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-muted">{exp.concept}</p>

      {/* Details area that expands on hover/focus */}
      <div className="mt-4 grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="flex flex-wrap gap-1.5 pb-1">
            {exp.tech.map((t) => (
              <TechBadge key={t}>{t}</TechBadge>
            ))}
          </div>
        </div>
      </div>

      {/* Progress meter pinned to the bottom */}
      <div className="mt-auto pt-5">
        <div className="mb-1.5 flex items-center justify-between text-[11px] text-faint">
          <span>Progress</span>
          <span className="tabular-nums text-muted">{exp.progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full [background:var(--gradient-brand)]"
            style={{ width: `${exp.progress}%` }}
          />
        </div>
      </div>
    </article>
  );
}
