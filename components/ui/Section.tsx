import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Consistent vertical rhythm, max width and anchor offset.
 *
 * Extra props are forwarded to the <section>, which is how a block opts into
 * the light theme: `<Section data-theme="light">` flips the whole token set for
 * everything inside it (see globals.css) and the navbar inverts to match.
 */
export function Section({
  id,
  children,
  className,
  inner,
  ...rest
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  inner?: string;
} & Omit<ComponentProps<"section">, "id" | "children" | "className">) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 md:py-32",
        className
      )}
      {...rest}
    >
      <div className={cn("mx-auto w-full max-w-7xl", inner)}>{children}</div>
    </section>
  );
}
