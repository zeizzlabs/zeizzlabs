import Image from "next/image";
import { Icon } from "./Icon";
import { mediaSrc } from "@/lib/media-manifest";
import { cn } from "@/lib/cn";

/**
 * The card that follows the cursor over the menu and the service index.
 *
 * It was previously a bare gradient rectangle, which read as an empty box. Now
 * it is a real composition: index number, icon, title, a line of tags and a
 * circuit motif over the pillar's accent gradient — enough that a glance at it
 * tells you what you are about to open.
 *
 * `image` layers real artwork underneath rather than replacing the card. The
 * label, icon and tags always render on top — an image on its own gave no clue
 * what you were about to open, which is what made these read as empty.
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
      {/* Ground: artwork if there is any, otherwise the generated composition.
          Either way the label layer below sits on top of it. */}
      {data.image ? (
        <Image
          src={mediaSrc(data.image)}
          alt=""
          fill
          sizes="(max-width: 1024px) 40vw, 320px"
          className="object-cover"
        />
      ) : (
        <>
          <div className="grid-lines absolute inset-0 opacity-[0.45]" />
          <div className="absolute inset-0 mix-blend-overlay [background:radial-gradient(circle_at_26%_16%,#fff9,transparent_58%)]" />

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
        </>
      )}

      {/* Always-on scrim, so the label reads over artwork of any brightness. */}
      <div className="absolute inset-0 [background:linear-gradient(to_top,rgba(4,6,12,0.92)_2%,rgba(4,6,12,0.7)_30%,rgba(4,6,12,0.15)_74%)]" />

      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between gap-3">
          {data.index && (
            <span className="font-mono text-[10.5px] tracking-[0.22em] text-white/70">
              {data.index}
            </span>
          )}
          {data.icon && (
            <span className="ml-auto grid h-9 w-9 place-items-center rounded-lg bg-white/15 text-white backdrop-blur-sm">
              <Icon name={data.icon} className="h-4.5 w-4.5" strokeWidth={1.8} />
            </span>
          )}
        </div>

        <div>
          <p
            className={cn(
              "font-display font-semibold leading-[1.08] tracking-[-0.03em] text-white",
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
                  className="rounded-full bg-white/15 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-white backdrop-blur-sm"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
