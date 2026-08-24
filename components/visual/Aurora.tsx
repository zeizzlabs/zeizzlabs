import { cn } from "@/lib/cn";

/**
 * Slow-drifting colour wash behind dark sections. Two blurred radial blobs —
 * one blue, one champagne — on long, offset loops so the pattern never
 * visibly repeats. Blur is applied to a fixed-size layer to keep it cheap.
 */
export function Aurora({
  className,
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="animate-drift absolute -top-[22%] left-[8%] h-[46rem] w-[46rem] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-blue-500) 46%, transparent), transparent 66%)",
          opacity: 0.55 * intensity,
        }}
      />
      <div
        className="animate-drift-slow absolute -bottom-[26%] right-[4%] h-[40rem] w-[40rem] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-gold-500) 40%, transparent), transparent 68%)",
          opacity: 0.42 * intensity,
        }}
      />
      <div
        className="absolute left-1/2 top-1/3 h-[30rem] w-[62rem] -translate-x-1/2 rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(ellipse, color-mix(in oklab, var(--color-blue-700) 40%, transparent), transparent 70%)",
          opacity: 0.5 * intensity,
        }}
      />
    </div>
  );
}
