import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/**
 * Standard section header: a small gradient eyebrow, an editorial headline,
 * and optional supporting copy. Keeps hierarchy consistent across sections.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center mx-auto max-w-2xl"
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full [background:var(--gradient-brand)]" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={80}>
        <Heading className="font-display text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-4xl md:text-5xl">
          {title}
        </Heading>
      </Reveal>
      {intro && (
        <Reveal delay={140}>
          <p
            className={cn(
              "text-pretty text-base leading-relaxed text-muted sm:text-lg",
              align === "center" ? "max-w-2xl" : "max-w-2xl"
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
