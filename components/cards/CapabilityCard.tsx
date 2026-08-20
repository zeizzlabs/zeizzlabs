import type { Capability } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export function CapabilityCard({ cap }: { cap: Capability }) {
  if (cap.isFrontier) {
    return (
      <a
        href="/#contact"
        className="border-glow group relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-card border border-line-strong p-6 transition-colors sm:col-span-2 lg:col-span-1"
      >
        <div className="absolute inset-0 -z-10 opacity-[0.14] [background:var(--gradient-brand-135)]" />
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.06] text-ink">
            <Icon name={cap.icon} className="h-5 w-5" />
          </span>
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
            {cap.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{cap.blurb}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
            Tell us what you need
            <Icon
              name="ArrowRight"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </a>
    );
  }

  return (
    <div className="border-glow group relative flex min-h-[180px] flex-col overflow-hidden rounded-card border border-line bg-surface/60 p-6 transition-transform duration-300 hover:-translate-y-1">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.05] text-blue transition-colors group-hover:text-ink">
        <Icon name={cap.icon} className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-ink">
        {cap.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{cap.blurb}</p>

      {/* Example chips reveal on hover (and are always present for a11y) */}
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {cap.examples.map((ex, i) => (
          <li
            key={ex}
            className={cn(
              "rounded-md border border-line bg-white/[0.02] px-2 py-1 text-[11px] text-muted",
              "opacity-70 transition-all duration-300 group-hover:opacity-100"
            )}
            style={{ transitionDelay: `${i * 30}ms` }}
          >
            {ex}
          </li>
        ))}
      </ul>
    </div>
  );
}
