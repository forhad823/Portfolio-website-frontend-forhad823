"use client";

import {
  ExternalLink,
  GitBranch,
  Lightbulb,
  AlertTriangle,
  X,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface ProjectDetailsDialogProps {
  project: Project;
}

/**
 * ProjectDetailsDialog — responsive details panel.
 *
 * Layout strategy (pure CSS, no JS breakpoint detection):
 *   Mobile  (< md): bottom-sheet — slides up from the bottom edge,
 *                   full viewport width, rounded top corners only,
 *                   max-height 85dvh with internal scroll.
 *   Tablet+ (≥ md): centred wide modal — max-w-2xl, fully rounded,
 *                   two-column feel for links/tech, centred on screen.
 *
 * Both layouts share identical markup and content — only positioning,
 * rounding, and sizing change via Tailwind responsive variants.
 * The shared Dialog primitive from @base-ui/react handles focus-trap,
 * Escape-to-close, and aria roles for both layouts.
 */
export function ProjectDetailsDialog({ project }: ProjectDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="default"
            size="sm"
            aria-label={`View full details for ${project.name}`}
          />
        }
      >
        Details
      </DialogTrigger>

      <DialogContent
        /*
         * Responsive positioning:
         *
         * Mobile  — fixed to the bottom edge, full width, rounded top corners.
         *           Overrides the default top-1/2 / translate-y centering.
         * md+     — reverts to centred modal (top-1/2 translate-y-1/2),
         *           max-w-2xl, fully rounded.
         *
         * We use showCloseButton={false} and render our own close button in
         * the header so we can position it precisely at every breakpoint.
         */
        showCloseButton={false}
        className={[
          // ── shared ──
          "glass-surface-strong border-border/60 p-0 overflow-hidden",
          "flex flex-col",

          // ── mobile: bottom-sheet ──
          "fixed bottom-0 left-0 right-0 top-auto",
          "translate-x-0 translate-y-0", // cancel default centering transforms
          "w-full max-w-full",
          "max-h-[85dvh]",
          "rounded-t-2xl rounded-b-none",

          // ── md+: centred modal ──
          "md:top-1/2 md:left-1/2 md:bottom-auto md:right-auto",
          "md:-translate-x-1/2 md:-translate-y-1/2",
          "md:w-full md:max-w-2xl",
          "md:max-h-[88dvh]",
          "md:rounded-2xl",
        ].join(" ")}
      >
        {/* ── Drag handle — mobile only ── */}
        <div
          aria-hidden="true"
          className="mx-auto mt-3 mb-1 h-1 w-10 shrink-0 rounded-full bg-border/60 md:hidden"
        />

        {/* ── Scrollable body ── */}
        <div className="flex flex-col gap-5 overflow-y-auto px-5 py-5 md:gap-6 md:px-7 md:py-6">
          {/* ── Header ── */}
          <DialogHeader className="relative shrink-0 border-b border-border/50 px-5 py-4 md:px-7 md:py-5">
            <DialogTitle className="pr-8 text-lg font-bold text-foreground md:text-xl">
              {project.name}
            </DialogTitle>
            <p className="mt-0.5 text-sm font-medium text-primary">
              {project.tagline}
            </p>
            <DialogDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {project.shortDescription}
            </DialogDescription>

            {/* Close button — top-right of header */}
            <DialogClose
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Close project details"
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                />
              }
            >
              <X size={16} aria-hidden="true" />
            </DialogClose>
          </DialogHeader>

          {/* Technology stack */}
          <section aria-labelledby={`tech-${project.id}`}>
            <h3
              id={`tech-${project.id}`}
              className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </section>

          {/* Links */}
          <section aria-labelledby={`links-${project.id}`}>
            <h3
              id={`links-${project.id}`}
              className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Links
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {/* Live demo */}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.name} live demo in a new tab`}
                className="inline-flex items-center gap-2 rounded-lg border border-primary/60 bg-primary/10 px-3.5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ExternalLink size={14} aria-hidden="true" />
                Live Demo
              </a>

              {/* Client repo */}
              <a
                href={project.clientRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.name} client repository on GitHub`}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-transparent px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <GitBranch size={14} aria-hidden="true" />
                Client Repo
              </a>

              {/* Server repo — omitted for LawBD (no serverRepoUrl) */}
              {project.serverRepoUrl && (
                <a
                  href={project.serverRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.name} server repository on GitHub`}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-transparent px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <GitBranch size={14} aria-hidden="true" />
                  Server Repo
                </a>
              )}
            </div>
          </section>

          {/* Challenges */}
          <section aria-labelledby={`challenges-${project.id}`}>
            <h3
              id={`challenges-${project.id}`}
              className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              <AlertTriangle
                size={13}
                aria-hidden="true"
                className="text-amber-400"
              />
              Challenges Faced
            </h3>
            <ul className="flex flex-col gap-2">
              {project.challenges.map((challenge, index) => (
                <li
                  key={String(index) + String(challenge)}
                  className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"
                  />
                  {challenge}
                </li>
              ))}
            </ul>
          </section>

          {/* Future improvements */}
          <section aria-labelledby={`future-${project.id}`}>
            <h3
              id={`future-${project.id}`}
              className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              <Lightbulb
                size={13}
                aria-hidden="true"
                className="text-primary"
              />
              Potential Improvements
              <span className="ml-1 text-xs font-normal normal-case text-muted-foreground/60">
                (future ideas)
              </span>
            </h3>
            <ul className="flex flex-col gap-2">
              {project.futureImprovements.map((improvement, index) => (
                <li
                  key={String(index) + String(improvement)}
                  className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  {improvement}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ── Footer ── */}
        <DialogFooter
          showCloseButton
          className="shrink-0 rounded-b-2xl md:rounded-b-2xl"
        >
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Open ${project.name} live demo`}
          >
            <ExternalLink size={14} aria-hidden="true" />
            View Live
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
