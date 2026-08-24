import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { CircuitField } from "@/components/visual/CircuitField";
import { site, whatsappLink } from "@/content/site";

/**
 * The closing beat before the footer: brand line, one primary action, one
 * low-commitment alternative. Nothing else competes for attention here.
 */
export function FinalCta() {
  return (
    <section className="noise relative isolate overflow-hidden px-5 py-24 text-center sm:px-6 sm:py-32">
      <CircuitField className="opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(ellipse, color-mix(in oklab, var(--color-blue-600) 42%, transparent), transparent 68%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl">
        <Reveal mode="fade">
          <div className="relative mx-auto mb-8 w-fit">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 blur-2xl [background:radial-gradient(circle,rgba(30,123,255,0.55),transparent_68%)]"
            />
            <Image
              src="/brand/zeizzlabs-mark.png"
              alt=""
              width={200}
              height={200}
              className="animate-float h-20 w-20 sm:h-24 sm:w-24"
            />
          </div>
        </Reveal>

        <Reveal>
          <p className="eyebrow mb-6">{site.subline}</p>
        </Reveal>

        <h2 className="text-balance">
          <Reveal mode="lines" className="h-display block text-ink">
            Everything digital.
          </Reveal>
          <Reveal mode="lines" delay={0.1} className="h-display block text-gradient">
            Endless possibilities.
          </Reveal>
        </h2>

        <Reveal delay={0.22}>
          <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Whatever the digital side of your business needs next — the site, the
            brand, the app, the AI — we build it end to end.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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
              Just ask a question
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
