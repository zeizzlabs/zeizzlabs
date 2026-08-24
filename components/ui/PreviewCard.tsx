import Image from "next/image";
import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

/**
 * The card that follows the cursor over the menu and the service index.
 *
 * It was previously a bare gradient rectangle, which read as an empty box. Now
 * it is a real composition: index number, icon, title, a line of tags and a
 * circuit motif over the pillar's accent gradient — enough that a glance at it
 * tells you what you are about to open.
 *
 * `image` is an escape hatch: set it and real artwork replaces the generated
 * composition, no other change needed. Until then this is fully procedural, so
 * there are no missing-asset holes.
 */
export type PreviewData = {
  index?: string;
  title: string;
  tags?: string[];
  icon?: string;
  /** Two gradient stops. */
  from: string;
  to: string;
  /** Optional real artwork; overrides the generated composition. */
  image?: string;
};

export function PreviewCard({
  data,
  className,
  compact = false,
}: {
  data: PreviewData;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.35rem] ring-1 ring-white/15",
        "shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]",
        className
      )}
      style={{ background: `linear-gradient(145deg, ${data.from}, ${data.to})` }}
    >
      {data.image ? (
        <Image
          src={data.image}
          alt=""
          fill
          sizes="320px"
          className="object-cover"
        />
      ) : (
        <>
          {/* Ground: technical grid, a top-left key light, and a soft vignette
              so the composition has depth rather than reading as flat colour. */}
          <div className="grid-lines absolute inset-0 opacity-[0.45]" />
          <div className="absolute inset-0 mix-blend-overlay [background:radial-gradient(circle_at_26%_16%,#fff9,transparent_58%)]" />
          <div className="absolute inset-0 [background:linear-gradient(to_top,rgba(4,6,12,0.92)_2%,rgba(4,6,12,0.72)_28%,transparent_72%)]" />

          {/* Circuit motif, echoing the brand mark. */}
          <svg
            viewBox="0 0 300 240"
            aria-hidden
            className="absolute inset-0 h-full w-full opacity-35"
            fill="none"
            stroke="rgba(4,6,12,0.55)"
            strokeWidth="1.6"
          >
            <path d="M-10 52 H70 L104 86 H196" />
            <path d="M-10 128 H44 L82 166 H150 L178 138 H310" />
            <path d="M310 74 H236 L206 44 H150" />
            <circle cx="196" cy="86" r="5" />
            <circle cx="150" cy="166" r="5" />
            <circle cx="150" cy="44" r="5" />
            <path d="M232 190 H300" />
            <circle cx="232" cy="190" r="4" />
          </svg>

          {/* The brand mark, sitting in the artwork rather than on top of it. */}
          <Image
            src="/brand/zeizzlabs-mark.png"
            alt=""
            width={220}
            height={220}
            className={cn(
              "absolute opacity-[0.16] mix-blend-luminosity",
              compact ? "-right-6 -top-6 h-28 w-28" : "-right-8 -top-8 h-36 w-36"
            )}
          />

          <div className="relative flex h-full flex-col justify-between p-5">
            <div className="flex items-start justify-between gap-3">
              {data.index && (
                <span className="font-mono text-[10.5px] tracking-[0.22em] text-ink-950/70">
                  {data.index}
                </span>
              )}
              {data.icon && (
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink-950/25 text-white/90 backdrop-blur-sm">
                  <Icon name={data.icon} className="h-4.5 w-4.5" strokeWidth={1.8} />
                </span>
              )}
            </div>

            <div>
              <p
                className={cn(
                  "font-display font-bold leading-[1.06] tracking-[-0.035em] text-white",
                  compact ? "text-lg" : "text-[1.45rem]"
                )}
              >
                {data.title}
              </p>

              {data.tags && data.tags.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {data.tags.slice(0, compact ? 2 : 3).map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-ink-950/35 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-white/85 backdrop-blur-sm"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
