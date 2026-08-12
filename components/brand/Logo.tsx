import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/**
 * ZeizzLabs logo — uses the OFFICIAL artwork in /public/brand.
 * Swap those files (see public/brand/README.md) to update the whole site;
 * if you change file extensions, update only these two constants.
 *
 *  - "emblem": the circular badge (self-contained brand mark). Rendered inside a
 *    rounded mask so its black canvas corners never show on the dark UI. Used in
 *    the navbar, mobile menu, and footer at every size.
 *  - "board":  the full rectangular brand board. Reserved for the hero, where the
 *    detailed logo is the visual anchor.
 */
const EMBLEM_SRC = "/brand/zeizzlabs-emblem.png"; // 1254 x 1254
const BOARD_SRC = "/brand/zeizzlabs-logo.png"; //   1536 x 1024

export function Logo({
  variant = "emblem",
  className,
  priority,
  href = "/",
  size = 42,
  showWordmark = true,
}: {
  variant?: "emblem" | "board";
  className?: string;
  priority?: boolean;
  href?: string;
  /** Rendered height in px for the emblem variant. */
  size?: number;
  /** Show the "ZeizzLabs" text beside the emblem. */
  showWordmark?: boolean;
}) {
  if (variant === "board") {
    // Un-linked showpiece for the hero.
    return (
      <Image
        src={BOARD_SRC}
        alt={`${site.brandName} — ${site.positioning}. ${site.tagline}`}
        width={1536}
        height={1024}
        priority={priority}
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 620px"
        className={cn("h-auto w-full max-w-full", className)}
      />
    );
  }

  const mark = (
    <span
      className="relative inline-grid place-items-center overflow-hidden rounded-full ring-1 ring-line-strong transition-[filter,transform] duration-300 group-hover:scale-[1.04] group-hover:ring-white/25"
      style={{ height: size, width: size }}
    >
      <Image
        src={EMBLEM_SRC}
        alt={`${site.brandName} emblem`}
        width={size * 2}
        height={size * 2}
        priority={priority}
        className="h-full w-full object-cover"
      />
    </span>
  );

  const wrapCls = cn(
    "group inline-flex items-center gap-2.5 transition-transform",
    "hover:drop-shadow-[0_0_20px_rgba(108,53,255,0.5)]",
    className
  );

  const wordmark = (
    <span className="font-display text-[17px] font-bold leading-none tracking-tight text-ink">
      Zeizz<span className="text-gradient">Labs</span>
    </span>
  );

  if (!href) {
    return (
      <span className={wrapCls}>
        {mark}
        {showWordmark && wordmark}
      </span>
    );
  }

  return (
    <Link href={href} aria-label={`${site.brandName} home`} className={wrapCls}>
      {mark}
      {showWordmark && wordmark}
    </Link>
  );
}
