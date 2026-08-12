import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { projects } from "@/content/work";

export function Work() {
  return (
    <Section id="work">
      <SectionHeading
        eyebrow="Work"
        title={
          <>
            Things we&apos;ve <span className="text-gradient">built.</span>
          </>
        }
        intro="A growing set of products, prototypes, and experiments — each labelled honestly. No invented clients, no fabricated numbers."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 90}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
