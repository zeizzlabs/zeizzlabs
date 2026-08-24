import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Kinetic } from "@/components/ui/Kinetic";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Aurora } from "@/components/visual/Aurora";
import { CircuitField } from "@/components/visual/CircuitField";
import { ParticleField } from "@/components/visual/ParticleField";
import { RotatingWord } from "@/components/sections/RotatingWord";
import { site, whatsappLink } from "@/content/site";

/**
 * HERO — the immersive first impression.
 *
 * Four stacked layers, cheapest first so the text paints immediately:
 *   1. Aurora colour wash (CSS)
 *   2. Circuit traces echoing the brand board (SVG)
 *   3. Node network reacting to the cursor (canvas, client-only)
 *   4. Content
 * On mobile the canvas layer is hidden — the immersive pattern needs a
 * lightweight fallback, and phones get the SVG + wash only.
 */
export function Hero() {
  return (
    <section className="noise relative isolate flex min-h-[820px] flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-32 text-center sm:px-6 sm:pt-36">
      <Aurora />
      <CircuitField className="opacity-[0.55]" />
      <ParticleField className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-70 md:block" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />

      {/* Availability pill */}
      <Reveal className="relative z-10">
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line-strong glass px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-steel-300">
          <span className="relative grid h-2 w-2 place-items-center">
            <span className="absolute h-2 w-2 rounded-full bg-status-live/70 animate-ring" />
            <span className="h-1.5 w-1.5 rounded-full bg-status-live" />
          </span>
          Taking new projects
        </div>
      </Reveal>

      {/* Headline */}
      <h1 className="relative z-10 max-w-5xl text-balance">
        <Kinetic
          text="Everything digital."
          immediate
          startDelay={120}
          className="h-display block text-ink"
        />
        <Kinetic
          text="Endless possibilities."
          immediate
          startDelay={420}
          className="h-display block text-gradient"
        />
      </h1>

      {/* Rotating capability line — the eight pillars, one at a time. */}
      <Reveal delay={260} className="relative z-10">
        <p className="mt-7 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 font-mono text-xs uppercase tracking-[0.22em] text-faint sm:text-[13px]">
          <span>We build</span>
          <RotatingWord />
        </p>
      </Reveal>

      <Reveal delay={340} className="relative z-10">
        <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-[17px]">
          {site.brandName} is the digital team behind growing businesses — websites
          and apps, brand and design, AI agents that answer your calls, and
          automation that removes the busywork. One studio, start to finish.
        </p>
      </Reveal>

      <Reveal delay={420} className="relative z-10">
        <div className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <Magnetic className="w-full sm:w-auto">
            <Button href="/#contact" size="lg" arrow className="w-full sm:w-auto">
              Start a project
            </Button>
          </Magnetic>
          <Button
            href={whatsappLink}
            size="lg"
            variant="secondary"
            icon="MessageCircle"
            className="w-full sm:w-auto"
          >
            Chat on WhatsApp
          </Button>
        </div>
      </Reveal>

      {/* Low-commitment reassurance directly under the CTA. */}
      <Reveal delay={500} className="relative z-10">
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] text-faint">
          {["Free consultation", "Fixed quote up front", "You own everything"].map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5">
              <Icon name="Check" className="h-3.5 w-3.5 text-status-live" strokeWidth={2.2} />
              {t}
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Scroll cue */}
      <a
        href="/#services"
        aria-label="Scroll to services"
        className="group relative z-10 mt-14 hidden flex-col items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-faint transition-colors hover:text-steel-300 sm:flex"
      >
        <span>Explore</span>
        <span className="relative h-10 w-px overflow-hidden bg-line-strong">
          <span className="absolute inset-x-0 top-0 h-4 animate-[float-y_2.2s_ease-in-out_infinite] bg-gradient-to-b from-blue-400 to-transparent" />
        </span>
      </a>

      {/* Fade into the next section so there is no hard seam. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
    </section>
  );
}
