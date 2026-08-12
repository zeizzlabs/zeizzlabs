import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Consistent section rhythm + max width + anchor target. */
export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24 md:py-28",
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}
