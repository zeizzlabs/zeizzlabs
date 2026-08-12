import type { Project } from "@/lib/types";
import { WorkBadge } from "@/components/ui/StatusBadge";
import { TechBadge } from "@/components/ui/TechBadge";
import { Icon } from "@/components/ui/Icon";

export function ProjectCard({ project }: { project: Project }) {
  const [a, b] = project.accent;
  return (
    <article className="border-glow group relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface/60 transition-transform duration-300 hover:-translate-y-1">
      {/* Visual preview — abstract branded gradient field, not stock imagery */}
      <div
        className="relative h-48 overflow-hidden sm:h-56"
        style={{
          background: `radial-gradient(120% 120% at 15% 15%, ${a}55, transparent 55%), radial-gradient(120% 120% at 85% 85%, ${b}55, transparent 55%), #0a0d17`,
        }}
      >
        <div className="absolute inset-0 grid-lines opacity-40" />
        {/* Big ghosted initial for character */}
        <span
          className="absolute -bottom-6 right-2 font-display text-[9rem] font-bold leading-none text-white/[0.06]"
          aria-hidden
        >
          {project.name.charAt(0)}
        </span>
        <div className="absolute left-4 top-4">
          <WorkBadge label={project.label} />
        </div>
        <div className="absolute inset-0 flex items-end p-5">
          <div className="flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-sm font-medium text-ink">View case study</span>
            <Icon name="ArrowUpRight" className="h-4 w-4 text-ink" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
            {project.name}
          </h3>
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-faint">
            {project.category}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li key={t}>
              <TechBadge>{t}</TechBadge>
            </li>
          ))}
        </ul>

        <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
          <span className="font-medium text-ink">Outcome — </span>
          {project.outcome}
        </p>
      </div>
    </article>
  );
}
