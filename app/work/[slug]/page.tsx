import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, workLabels } from "@/content/work";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Frame } from "@/components/ui/Frame";
import { Icon } from "@/components/ui/Icon";
import { CircleCta } from "@/components/ui/CircleCta";
import { TransitionLink } from "@/components/motion/PageTransition";
import { FinalCta } from "@/components/sections/FinalCta";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.name, description: p.summary };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const i = projects.findIndex((p) => p.slug === slug);
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.name}
        lede={project.summary}
        meta={[
          { label: "Stage", value: workLabels[project.label] },
          { label: "Discipline", value: project.category },
          { label: "Stack", value: project.tech.slice(0, 3).join(", ") },
          { label: "Built for", value: project.client ?? "Our own R&D" },
        ]}
      />

      {/* Full-bleed artwork */}
      <div className="px-5 sm:px-8">
        <Frame
          src={project.image}
          alt={`${project.name} — ${project.category}`}
          priority
          sizes="(max-width: 1024px) 92vw, 100rem"
          className="mx-auto h-[46vh] min-h-[18rem] max-w-[100rem] lg:h-[62vh]"
        >
          <span className="absolute bottom-7 left-7 font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-none tracking-[-0.05em] text-white/20">
            {project.name}
          </span>
        </Frame>
      </div>

      <Section inner="max-w-[100rem]">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">The idea</p>
            </Reveal>
            <Reveal mode="lines">
              <p className="text-pretty text-xl leading-relaxed text-steel-300 sm:text-[1.4rem]">
                {project.summary}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-2xl text-[16.5px] leading-[1.75] text-muted">
                {project.vision}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <h2 className="eyebrow mb-5 mt-14">How we are building it</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-2xl text-[16.5px] leading-[1.75] text-muted">
                {project.approach}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <h2 className="eyebrow mb-5 mt-14">What is being built</h2>
            </Reveal>
            <Reveal mode="stagger">
              <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
                {project.building.map((b) => (
                  <li key={b} className="flex items-start gap-3 bg-canvas p-5">
                    <Icon
                      name="Check"
                      className="mt-0.5 h-4 w-4 shrink-0 text-status-live"
                      strokeWidth={2.2}
                    />
                    <span className="text-[15.5px] leading-relaxed text-ink">{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            {/* The honest bit: what exists today, stated before anything else. */}
            <Reveal>
              <div className="rounded-2xl border border-gold-500/25 bg-gold-500/[0.06] p-6">
                <p className="eyebrow mb-3">Where it actually is</p>
                <p className="text-[15.5px] leading-relaxed text-steel-300">
                  {project.stage}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <h2 className="eyebrow mb-5 mt-10">What comes next</h2>
              <ol className="space-y-4">
                {project.next.map((n) => (
                  <li key={n} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-400/80"
                    />
                    <span className="text-[15.5px] leading-relaxed text-muted">{n}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.18}>
              <h2 className="eyebrow mb-4 mt-10">Built with</h2>
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line px-3.5 py-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-steel-400"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 flex items-center gap-6 rounded-2xl border border-line bg-raised p-6">
                <CircleCta href="/contact" label="Build something" size={110} />
                <p className="text-[14.5px] leading-relaxed text-muted">
                  Want something like this for your business? Tell us the goal and
                  we will tell you honestly what it takes.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>

      <Section inner="max-w-[100rem]" className="pt-0">
        <TransitionLink
          href={`/work/${next.slug}`}
          data-cursor="text"
          data-cursor-text="Next"
          className="group flex items-baseline justify-between gap-6 border-t border-line pt-10"
        >
          <span>
            <span className="eyebrow">Next project</span>
            <span className="mt-3 block font-display text-[clamp(1.8rem,5vw,4rem)] font-bold tracking-[-0.04em] text-steel-400 transition-colors duration-500 group-hover:text-ink">
              {next.name}
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
