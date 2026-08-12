export function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-white/[0.02] px-2 py-1 text-[11px] font-medium text-muted">
      {children}
    </span>
  );
}
