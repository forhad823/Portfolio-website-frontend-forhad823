import { Code2, Heart, Lightbulb, Zap } from "lucide-react";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";

/**
 * AboutSection — concise, truthful about-me section.
 *
 * Content is grounded in real context only — no invented job titles,
 * years of experience, or metrics. Covers:
 *   1. Programming journey
 *   2. Work enjoyed / professional personality
 *   3. Hobbies & interests outside of coding
 *
 * Kept brief enough to remain within the 3–4-scroll goal for the full page.
 */

const ABOUT_CARDS = [
  {
    icon: Code2,
    title: "The Journey",
    body: "My programming journey started with structured coursework and quickly evolved into building real full-stack projects. From frontend interfaces to backend APIs and databases, I've developed skills end-to-end by shipping things that actually work.",
  },
  {
    icon: Lightbulb,
    title: "What I Enjoy",
    body: "I thrive on problem-solving — debugging complex issues, understanding how systems work under the hood, and designing clean APIs. I enjoy the full stack: crafting polished UIs as much as building the backend logic that powers them.",
  },
  {
    icon: Zap,
    title: "How I Work",
    body: "Engineering-minded and detail-oriented. I care about code quality, type safety, and building things that are maintainable. I pick up new tools and patterns quickly and enjoy learning by doing on real projects.",
  },
  {
    icon: Heart,
    title: "Beyond Code",
    body: "Outside of programming, I enjoy playing chess, reading books, following cricket, and watching documentaries. I believe a curious mind outside of work makes for better thinking inside it.",
  },
] as const;

export function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About Me"
      className="py-20 scroll-mt-20 sm:py-28"
    >
      <PageContainer>
        {/* Section header */}
        <SectionHeading
          title="About Me"
          subtitle="A full-stack developer from Bangladesh who enjoys building practical web applications and solving meaningful problems."
          className="mb-14"
        />

        {/* Two-column card grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {ABOUT_CARDS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="glass-surface group flex flex-col gap-4 rounded-2xl p-6 transition-colors duration-200 hover:border-primary/50"
            >
              {/* Icon */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <Icon size={22} aria-hidden="true" />
              </div>

              {/* Card text */}
              <h3 className="text-base font-semibold text-foreground">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
