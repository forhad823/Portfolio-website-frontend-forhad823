import Image from "next/image";
import { ExternalLink, GitBranch } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { ProjectDetailsDialog } from "./ProjectDetailsDialog";

interface ProjectCardProps {
  project: Project;
}

/**
 * ProjectCard — displays a single project card with image, title, tagline,
 * a short tech-stack preview, quick-action links, and a Details trigger that
 * opens the full ProjectDetailsDialog.
 *
 * All project-specific data comes from the typed `Project` object; this
 * component contains zero hard-coded project information.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  // Show at most 4 tech badges on the card; the rest are in the dialog.
  const visibleTech = project.technologies.slice(0, 4);
  const remainingCount = project.technologies.length - visibleTech.length;

  return (
    <article
      className="glass-surface group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
      aria-label={`${project.name} — ${project.tagline}`}
    >
      {/* ── Project image ── */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.name} project screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle overlay to keep text legible */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
        />
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Title + tagline */}
        <div>
          <h3 className="text-lg font-bold text-foreground leading-snug">
            {project.name}
          </h3>
          <p className="mt-0.5 text-sm font-medium text-secondary-foreground leading-snug">
            {project.tagline}
          </p>
        </div>

        {/* Tech-stack badges (preview) */}
        <div className="flex flex-wrap gap-1.5">
          {visibleTech.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs border-x-blue-300 text-white/80"
            >
              {tech}
            </Badge>
          ))}
          {remainingCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              +{remainingCount} more
            </Badge>
          )}
        </div>

        {/* ── Footer: quick links + Details button ── */}
        <div className="mt-auto flex  items-center gap-2 pt-2 border-t border-border/50">
          {/* Live demo */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.name} live demo`}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-white  border border-primary transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ExternalLink size={13} aria-hidden="true" />
            Live
          </a>

          {/* Client repo */}
          <a
            href={project.clientRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.name} client repository on GitHub`}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-white border border-primary transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <GitBranch size={13} aria-hidden="true" />
            Client
          </a>

          {/* Server repo — only when the project has one */}
          {project.serverRepoUrl && (
            <a
              href={project.serverRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} server repository on GitHub`}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-white  border border-primary transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <GitBranch size={13} aria-hidden="true" />
              Server
            </a>
          )}

          {/* Details dialog trigger — pushed to the far right */}
          <div className="ml-auto">
            <ProjectDetailsDialog project={project} />
          </div>
        </div>
      </div>
    </article>
  );
}
