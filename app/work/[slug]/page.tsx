import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/work";
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
        index={String(i + 1).padStart(2, "0")}
        eyebrow={project.category}
        title={project.name}
        lede={project.summary}
        meta={[
          { label: "Stage", value: project.label },
          { label: "Discipline", value: project.category },
          { label: "Stack", value: project.tech.slice(0, 2).join(", ") },
          { label: "Status", value: project.outcome.split(":")[0] },
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
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <Reveal mode="lines">
              <p className="text-pretty text-xl leading-relaxed text-steel-300 sm:text-2xl">
                {project.summary}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 flex items-start gap-3 rounded-2xl border border-gold-500/20 bg-gold-500/[0.05] p-6 text-[15px] leading-relaxed text-steel-300">
                <Icon
                  name="Activity"
                  className="mt-0.5 h-5 w-5 shrink-0 text-gold-300"
                  strokeWidth={1.8}
                />
                {project.outcome}
              </p>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <h2 className="eyebrow mb-5">Built with</h2>
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
            <Reveal delay={0.15}>
              <div className="mt-10 flex items-center gap-6 rounded-2xl border border-line bg-white/[0.02] p-6">
                <CircleCta href="/contact" label="Build something" size={110} />
                <p className="text-[14px] leading-relaxed text-muted">
                  Want one of these for your business? Tell us the goal.
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
