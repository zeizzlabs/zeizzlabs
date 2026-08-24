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
      className="relative overflow-hidden border-y border-line bg-panel py-8"
    >
      <Marquee items={marqueeWords} speed={70} />
      <div className="h-4" />
      <Marquee items={techStack} speed={46} reverse variant="chip" />
    </section>
  );
}
