import { CheckCircle2 } from "lucide-react";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";

/**
 * AboutSection — concise, recruiter-friendly about-me section.
 *
 * Uses at-a-glance bullet points to quickly communicate:
 *   - Technical identity and location
 *   - Problem-solving mindset
 *   - Learning approach
 *   - Engineering interests
 *   - Personality/hobbies
 *
 * Designed for maximum impact with minimum reading time.
 */

const ABOUT_POINTS = [
  {
    text: (
      <>
        <strong>Full-stack developer</strong> who improves efficiency of
        businesses through technology.
      </>
    ),
  },
  {
    text: (
      <>
        <strong>Problem-solver</strong> who enjoys debugging, logical
        challenges, and understanding how software works.
      </>
    ),
  },
  {
    text: (
      <>
        <strong>Hands-on learner</strong> developing skills through structured
        courses and real-world projects.
      </>
    ),
  },
  {
    text: (
      <>
        <strong>Engineering-minded</strong> with an interest in frontend,
        backend logic, APIs, and databases.
      </>
    ),
  },
  {
    text: (
      <>
        <strong>Beyond coding:</strong> Enjoys chess, reading, cricket, and
        documentaries.
      </>
    ),
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
        <SectionHeading title="About Me" className="mb-10" />

        {/* Concise bullet-point list */}
        <div className="glass-surface mx-auto max-w-2xl rounded-2xl p-8 sm:p-10">
          <ul className="space-y-4">
            {ABOUT_POINTS.map((point, index) => (
              <li
                key={String(index) + String(point.text)}
                className="flex gap-3"
              >
                {/* Check icon */}
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden="true"
                />

                {/* Bullet text */}
                <span className="text-base leading-relaxed text-muted-foreground">
                  {point.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </PageContainer>
    </section>
  );
}
