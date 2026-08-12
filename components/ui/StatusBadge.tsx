import { cn } from "@/lib/cn";
import type { ExperimentStatus, WorkLabel } from "@/lib/types";

const statusMap: Record<ExperimentStatus, { label: string; color: string }> = {
  live: { label: "Live", color: "var(--color-status-live)" },
  "in-development": { label: "In Development", color: "var(--color-status-dev)" },
  experimental: { label: "Experimental", color: "var(--color-status-experimental)" },
  "coming-soon": { label: "Coming Soon", color: "var(--color-status-soon)" },
};

const labelMap: Record<WorkLabel, { label: string; color: string }> = {
  concept: { label: "Concept", color: "var(--color-status-experimental)" },
  prototype: { label: "Prototype", color: "var(--color-status-dev)" },
  experiment: { label: "Experiment", color: "var(--color-status-soon)" },
  live: { label: "Live", color: "var(--color-status-live)" },
};

export function StatusBadge({
  status,
  className,
}: {
  status: ExperimentStatus;
  className?: string;
}) {
  const s = statusMap[status];
  return <Pill label={s.label} color={s.color} className={className} pulse={status === "live"} />;
}

export function WorkBadge({ label, className }: { label: WorkLabel; className?: string }) {
  const s = labelMap[label];
  return <Pill label={s.label} color={s.color} className={className} pulse={label === "live"} />;
}

function Pill({
  label,
  color,
  className,
  pulse,
}: {
  label: string;
  color: string;
  className?: string;
  pulse?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide",
        className
      )}
      style={{
        color,
        borderColor: color + "40",
        background: color + "12",
      }}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full", pulse && "animate-pulse")}
        style={{ background: color }}
      />
      {label}
    </span>
  );
}
