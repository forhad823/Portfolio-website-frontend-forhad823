import { projects } from "@/data/projects";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "./projects/ProjectCard";

/**
 * ProjectsSection — renders the three portfolio projects in priority order
 * (Hemacue → RentNest → LawBD) from the typed `projects` data array.
 *
 * To add, edit, or remove a project: change `src/data/projects.ts` only.
 * No JSX edits are needed here unless the layout itself changes.
 *
 * Section order: 3 of 5 (Home → About → **Projects** → Skills → Contact).
 */
export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-label="Projects"
      className="py-10 scroll-mt-16 sm:py-14"
    >
      <PageContainer>
        {/* Section header */}
        <SectionHeading
          title="Projects"
          subtitle="Real-world full-stack applications built end-to-end."
          className="mb-6"
        />

        {/* Project cards grid — single column on mobile, three columns on lg+ */}
        <div className="grid gap-6 lg:gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
