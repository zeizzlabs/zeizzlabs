import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Section header: mono eyebrow with a hairline, kinetic display title, and an
 * optional lede. `align` switches between the standard left rail and centred.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  lede,
  align = "left",
  className,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Trailing words rendered in the brand gradient. */
  accent?: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "relative",
        centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className
      )}
    >
      <Reveal>
        <div
          className={cn(
            "mb-5 flex items-center gap-3",
            centered && "justify-center"
          )}
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold-500/70" />
          <span className="eyebrow">{eyebrow}</span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold-500/70" />
        </div>
      </Reveal>

      <h2 className="text-balance">
        <Reveal mode="lines" className="h-section block text-ink">
          {title}
        </Reveal>
        {accent && (
          <Reveal mode="lines" delay={0.1} className="h-section text-gradient block">
            {accent}
          </Reveal>
        )}
      </h2>

      {lede && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-muted sm:text-[19px]",
              centered && "mx-auto"
            )}
          >
            {lede}
          </p>
        </Reveal>
      )}
      {children}
    </div>
  );
}
