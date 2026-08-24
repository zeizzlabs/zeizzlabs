import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Infinite horizontal marquee. The children list is rendered twice and the
 * track translates -50%, so the loop is seamless. Pauses on hover; the CSS
 * reduced-motion block stops it entirely for users who ask for that.
 */
export function Marquee({
  items,
  duration = 46,
  reverse = false,
  className,
  renderItem,
}: {
  items: string[];
  /** Seconds for one full pass. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  renderItem?: (item: string, i: number) => ReactNode;
}) {
  const row = (keyPrefix: string) => (
    <div className="flex shrink-0 items-center" aria-hidden={keyPrefix === "b"}>
      {items.map((item, i) =>
        renderItem ? (
          <div key={`${keyPrefix}-${i}`}>{renderItem(item, i)}</div>
        ) : (
          <span
            key={`${keyPrefix}-${i}`}
            className="flex items-center gap-6 px-6 font-display text-lg font-medium tracking-tight text-steel-400/80 sm:text-xl"
          >
            {item}
            <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-500/60" />
          </span>
        )
      )}
    </div>
  );

  return (
    <div
      className={cn(
        "marquee relative flex overflow-hidden",
        "[mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]",
        className
      )}
    >
      <div
        className={cn("marquee-track", reverse && "reverse")}
        style={{ ["--dur" as string]: `${duration}s` }}
      >
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
