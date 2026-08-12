import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-2 disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

const variants: Record<Variant, string> = {
  // Gradient CTA — the brand's energy, reserved for primary actions.
  primary:
    "text-white shadow-[0_8px_30px_-8px_rgba(108,53,255,0.6)] [background:var(--gradient-brand-135)] bg-[length:150%_auto] hover:bg-[position:right_center] hover:shadow-[0_10px_40px_-8px_rgba(213,43,255,0.6)]",
  secondary:
    "text-ink border border-line-strong bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/30",
  ghost: "text-muted hover:text-ink",
};

interface Props {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
  /** Show a trailing arrow that nudges on hover. */
  arrow?: boolean;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  arrow,
  className,
  ...rest
}: Props & Partial<ComponentProps<"button">>) {
  const cls = cn(base, sizes[size], variants[variant], className);
  const inner = (
    <>
      {children}
      {arrow && (
        <Icon
          name="ArrowRight"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (href) {
    const external = href.startsWith("http");
    return (
      <Link
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}
