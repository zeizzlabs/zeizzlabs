import { Marquee } from "@/components/ui/Marquee";
import { marqueeWords, techStack } from "@/content/services";

/**
 * Two counter-scrolling marquees: what we make (large, brand type) above the
 * stack we build on (small, mono). It reads as a live index of the studio and
 * doubles as a keyword band for search.
 */
export function Ticker() {
  return (
    <section
      aria-label="What we build"
      className="relative overflow-hidden border-y border-line bg-ink-900/60 py-8"
    >
      <Marquee items={marqueeWords} duration={54} />
      <div className="h-4" />
      <Marquee
        items={techStack}
        duration={44}
        reverse
        renderItem={(t) => (
          <span className="mx-2 inline-flex items-center rounded-full border border-line px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-faint">
            {t}
          </span>
        )}
      />
    </section>
  );
}
