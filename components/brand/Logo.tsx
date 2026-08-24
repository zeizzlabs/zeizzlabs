import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/**
 * ZeizzLabs logo lockup — the Z monogram plus the "ZeizzLabs" wordmark.
 *
 *  MARK_SRC      the transparent Z monogram. Primary mark, used at every size.
 *  WORDMARK_SRC  the wordmark artwork. OPTIONAL and auto-detected: drop a file
 *                at public/brand/zeizzlabs-wordmark.png and it is used
 *                automatically, no code change. It must have a real alpha
 *                channel — a white-wordmark-on-white-background export cannot
 *                be used on this dark UI, because keying out the white
 *                background would erase the (also white) letterforms.
 *                Until then the type-set wordmark below stands in: Poppins
 *                ExtraBold with a brushed-metal fill and a bevel, matching the
 *                geometric bowls and single-storey "a" of the real logotype.
 *  BOARD_SRC     the full rectangular brand board, for social/OG imagery.
 */
const MARK_SRC = "/brand/zeizzlabs-mark.png"; // 1024 x 1024, transparent
const WORDMARK_SRC = "/brand/zeizzlabs-wordmark.png";
const BOARD_SRC = "/brand/zeizzlabs-logo.png"; // 1536 x 1024

/** Resolved once on the server at build time. */
const hasWordmarkImage = fs.existsSync(
  path.join(process.cwd(), "public", "brand", "zeizzlabs-wordmark.png")
);

/** Intrinsic size of zeizzlabs-wordmark.png, trimmed. Ratio ≈ 3.438 : 1. */
const WORDMARK_W = 1200;
const WORDMARK_H = 349;

export function Logo({
  variant = "mark",
  className,
  priority,
  href = "/",
  size = 40,
  showWordmark = true,
  /**
   * Start collapsed to just the monogram and reveal the wordmark once an
   * ancestor with `group/nav` carries `data-scrolled="true"`.
   *
   * Driven by CSS rather than a prop so this stays a server component — it
   * reads the filesystem above, which a client component cannot do.
   */
  revealOnScroll = false,
}: {
  variant?: "mark" | "board";
  className?: string;
  priority?: boolean;
  href?: string | null;
  /** Rendered height of the mark, in px. */
  size?: number;
  showWordmark?: boolean;
  revealOnScroll?: boolean;
}) {
  if (variant === "board") {
    return (
      <Image
        src={BOARD_SRC}
        alt={`${site.brandName} — ${site.positioning}. ${site.tagline}`}
        width={1536}
        height={1024}
        priority={priority}
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 66vw, 560px"
        className={cn("h-auto w-full max-w-full", className)}
      />
    );
  }

  const mark = (
    <Image
      src={MARK_SRC}
      alt=""
      width={size * 2}
      height={size * 2}
      priority={priority}
      className="shrink-0 transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:scale-[1.06]"
      style={{
        height: size,
        width: size,
        filter:
          "saturate(1.15) brightness(1.12) drop-shadow(0 2px 12px rgba(30,123,255,0.45))",
      }}
    />
  );

  const wordmark = hasWordmarkImage ? (
    <Image
      src={WORDMARK_SRC}
      alt={site.brandName}
      width={WORDMARK_W}
      height={WORDMARK_H}
      priority={priority}
      /* Served at 3x the rendered height so the bevel detail stays crisp on
         high-DPR screens; the source is far larger than any use here. */
      sizes={`${Math.round(size * 0.42 * (WORDMARK_W / WORDMARK_H) * 3)}px`}
      className="w-auto"
      style={{ height: size * 0.42 }}
    />
  ) : (
    <span className="wordmark leading-none" style={{ fontSize: size * 0.42 }}>
      {site.brandName}
    </span>
  );

  const wrapCls = cn("group inline-flex items-center", className);

  const inner = (
    <>
      {mark}
      {showWordmark && (
        /* 0fr → 1fr collapses the width with no JS measurement and no layout
           jump anywhere else in the bar. See globals.css for why this is not
           written with Tailwind utilities. */
        <span className={revealOnScroll ? "wordmark-reveal" : "wordmark-static"}>
          <span className="wordmark-clip">{wordmark}</span>
        </span>
      )}
    </>
  );

  if (!href) return <span className={wrapCls}>{inner}</span>;

  return (
    <Link href={href} aria-label={`${site.brandName} home`} className={wrapCls}>
      {inner}
    </Link>
  );
}
