import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";
import { Magnetic } from "@/components/ui/Magnetic";
import { HeroBackground } from "@/components/visual/HeroBackground";
import { Icon } from "@/components/ui/Icon";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16 text-center sm:px-6">
      <HeroBackground />

      {/* Positioning eyebrow */}
      <div
        data-reveal
        className="is-visible mb-6 inline-flex items-center gap-2 rounded-full border border-line-strong glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-muted"
      >
        <span className="h-1.5 w-1.5 rounded-full [background:var(--gradient-brand)]" />
        Digital Creation &amp; Innovation
      </div>

      {/* The logo is the visual anchor — framed as a deliberate showpiece so its
          black canvas reads as an intentional plate, not a stray rectangle. */}
      <div className="relative mb-8 w-full max-w-[560px]">
        <div className="absolute -inset-8 -z-10 blur-3xl [background:radial-gradient(ellipse_at_center,rgba(108,53,255,0.4),transparent_65%)]" />
        <div className="border-glow overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[0_24px_90px_-28px_rgba(108,53,255,0.6)]">
          <Logo variant="board" priority />
        </div>
      </div>

      <h1 className="font-display text-balance text-4xl font-semibold leading-[1.03] tracking-tight text-ink sm:text-6xl md:text-7xl">
        We build what the digital
        <br className="hidden sm:block" /> world needs{" "}
        <span className="text-gradient">next.</span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
        ZeizzLabs is a digital laboratory. We create products, software, AI
        systems, automations, experiences, and assets — and the systems that
        connect them. If it's digital, we can build it.
      </p>

      <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
        <Magnetic>
          <Button href="/#contact" size="lg" arrow>
            Start a Project
          </Button>
        </Magnetic>
        <Button href="/#lab" size="lg" variant="secondary" arrow>
          Explore the Lab
        </Button>
      </div>

      {/* Scroll cue */}
      <a
        href="/#create"
        aria-label="Scroll to what we create"
        className="mt-16 hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-faint transition-colors hover:text-muted sm:inline-flex"
      >
        <Icon name="ArrowRight" className="h-4 w-4 rotate-90" />
        Scroll
      </a>
    </section>
  );
}
