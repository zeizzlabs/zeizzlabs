import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Philosophy() {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-lg border border-line-strong px-6 py-16 text-center sm:px-12 sm:py-24">
        {/* ambient brand glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background:radial-gradient(60%_120%_at_50%_0%,rgba(108,53,255,0.28),transparent_70%)]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-30" />

        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
            Brand Philosophy
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Digital has <span className="text-gradient">no box.</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            ZeizzLabs isn&apos;t built around one technology, one platform, or one
            kind of product. We create whatever solves the problem — and we stay
            ready for whatever comes next.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
