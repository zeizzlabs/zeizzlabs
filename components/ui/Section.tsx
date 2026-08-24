import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Consistent vertical rhythm, max width and anchor offset for every section. */
export function Section({
  id,
  children,
  className,
  inner,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  inner?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24 md:py-32",
        className
      )}
    >
      <div className={cn("mx-auto w-full max-w-7xl", inner)}>{children}</div>
    </section>
  );
}
