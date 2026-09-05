import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { services } from "@/content/services";
import { offerings } from "@/content/offerings";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Frame } from "@/components/ui/Frame";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { CircleCta } from "@/components/ui/CircleCta";
import { TransitionLink } from "@/components/motion/PageTransition";
import { FinalCta } from "@/components/sections/FinalCta";
import { AddOns } from "@/components/sections/AddOns";

/** Every pillar is a real, statically-rendered page. */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.id === slug);
  if (!s) return {};
  // The overview, not the blurb: a share card and a search snippet both have
  // room for a sentence that actually says what the pillar is.
  return pageMetadata({
    title: s.short,
    description: s.overview,
    path: `/services/${s.id}`,
    image: s.image,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) notFound();

  const i = services.findIndex((s) => s.id === slug);
  const next = services[(i + 1) % services.length];

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        lede={service.blurb}
      />

      <div className="px-5 sm:px-8">
        <Frame
          src={service.image}
          alt={service.short}
          priority
          sizes="(max-width: 1024px) 92vw, 100rem"
          className="mx-auto h-[46vh] min-h-[17rem] max-w-[100rem] lg:h-[60vh]"
        />
      </div>

      <Section inner="max-w-[100rem]">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <div>
            <Reveal mode="lines">
              <p className="text-pretty text-xl leading-relaxed text-steel-300 sm:text-2xl">
                {service.overview}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <h2 className="eyebrow mt-14 mb-6">What we build</h2>
            </Reveal>
            <Reveal mode="stagger">
              <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-3 bg-canvas p-5">
                    <Icon name="Check" className="h-4 w-4 shrink-0 text-status-live" strokeWidth={2.2} />
                    <span className="text-[15px] text-ink">{d}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <h2 className="eyebrow mb-6">What you end up with</h2>
              <ul className="space-y-5">
                {service.outcomes.map((o) => (
                  <li key={o} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-400/80"
                    />
                    <span className="text-[15.5px] leading-relaxed text-muted">{o}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 flex items-center gap-6 rounded-2xl border border-line bg-raised p-6">
                <CircleCta href="/contact" label="Start a project" size={110} />
                <p className="text-[14px] leading-relaxed text-muted">
                  Free 20-minute call. You leave with a scope and a fixed price,
                  whether or not you hire us.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>

      {/* Related packages */}
      <Section data-theme="dark" className="border-y border-line" inner="max-w-[100rem]">
        <Reveal>
          <p className="eyebrow mb-6">Ways to start</p>
        </Reveal>
        <Reveal mode="stagger">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.slice(0, 3).map((o) => (
              <li key={o.id} className="plate rounded-2xl p-6">
                <Icon name={o.icon} className="h-6 w-6 text-blue-400" />
                <h3 className="h-card mt-4 text-lg text-ink">{o.name}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{o.description}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Add-ons are the most common follow-up question on a build page. */}
      {(service.id === "software-development" || service.id === "digital-products") && (
        <AddOns className="border-t border-line" />
      )}

      {/* Next pillar */}
      <Section inner="max-w-[100rem]">
        <TransitionLink
          href={`/services/${next.id}`}
          data-cursor="text"
          data-cursor-text="Next"
          className="group flex items-baseline justify-between gap-6 border-t border-line pt-10"
        >
          <span>
            <span className="eyebrow">Next pillar</span>
            <span className="mt-3 block font-display text-[clamp(1.8rem,5vw,4rem)] font-bold tracking-[-0.04em] text-steel-400 transition-colors duration-500 group-hover:text-ink">
              {next.title}
            </span>
          </span>
          <Icon
            name="ArrowUpRight"
            className="h-8 w-8 shrink-0 text-faint transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold-300"
          />
        </TransitionLink>
      </Section>

      <FinalCta />
    </>
  );
}
