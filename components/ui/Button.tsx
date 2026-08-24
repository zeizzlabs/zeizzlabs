import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "gold" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight " +
  "transition-[transform,box-shadow,background,color,border-color] duration-300 ease-[var(--ease-out-quint)] " +
  "active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-8 text-[15px]",
};

const variants: Record<Variant, string> = {
  // The brand gradient. Reserved for the single most important action in view.
  primary:
    "text-white [background:var(--gradient-brand)] bg-[length:200%_auto] " +
    "shadow-[0_10px_34px_-10px_rgba(30,123,255,0.75)] " +
    "hover:bg-[position:right_center] hover:shadow-[0_16px_44px_-10px_rgba(220,184,119,0.6)]",
  gold:
    "text-ink-950 bg-gold-400 hover:bg-gold-300 shadow-[0_10px_30px_-12px_rgba(220,184,119,0.8)]",
  secondary:
    "text-ink border border-line-strong bg-raised backdrop-blur-sm " +
    "hover:bg-raised-strong hover:border-white/35",
  ghost: "text-muted hover:text-ink",
};

interface Props {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
  /** Trailing arrow that nudges on hover. */
  arrow?: boolean;
  icon?: string;
  className?: string;
  /** Force a new tab (external links get this automatically). */
  external?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  arrow,
  icon,
  className,
  external,
  onClick,
  ...rest
}: Props & Partial<ComponentProps<"button">>) {
  const cls = cn(base, sizes[size], variants[variant], className);
  const inner = (
    <>
      {icon && <Icon name={icon} className="h-[1.05em] w-[1.05em]" strokeWidth={1.8} />}
      {children}
      {arrow && (
        <Icon
          name="ArrowRight"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={1.8}
        />
      )}
    </>
  );

  if (href) {
    const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
    return (
      <Link
        href={href}
        className={cls}
        onClick={onClick as never}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </Link>
    );
  }
  return (
    <button className={cls} onClick={onClick} {...rest}>
      {inner}
    </button>
  );
}
