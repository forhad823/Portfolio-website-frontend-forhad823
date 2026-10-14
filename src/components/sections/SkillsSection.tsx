import { GraduationCap } from "lucide-react";
import { skillCategories, education } from "@/data/skills";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";

/**
 * SkillsSection — Section 4 of 5.
 *
 * Renders:
 *  • Skill groups sourced from src/data/skills.ts (skillCategories).
 *    Only includes skills grounded in the supplied project README material.
 *    Skills are displayed as readable text badges grouped by category.
 *  • Education card sourced from src/data/skills.ts (education[]).
 *    Only the documented facts: level, group, institution, GPA/scale.
 *    No graduation year is shown because the source does not provide one.
 *
 * To add/remove a skill or update education: edit src/data/skills.ts only.
 */
export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-label="Skills and Education"
      className="py-10 scroll-mt-16 sm:py-14"
    >
      <PageContainer>
        <SectionHeading
          title="Skills & Education"
          subtitle="Technologies I build with and my academic background."
          className="mb-8"
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {/* ── Left / centre: Skill groups (2 wide columns on lg) ── */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2">
              {skillCategories.map((category) => (
                <div
                  key={category.id}
                  className="glass-surface rounded-2xl p-5"
                >
                  {/* Category label */}
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-secondary-foreground">
                    {category.label}
                  </h3>

                  {/* Skill badges */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill.name}
                        variant="outline"
                        className="text-xs font-medium border-blue-300"
                      >
                        {skill.icon && (
                          <span className="mr-2">
                            <skill.icon />
                          </span>
                        )}
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Education card ── */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
              Education
            </h3>

            {education.map((edu) => (
              <div
                key={`${edu.institution}-${edu.level}`}
                className="glass-surface flex flex-col gap-4 rounded-2xl p-5"
              >
                {/* Icon row */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <GraduationCap size={22} aria-hidden="true" />
                </div>

                {/* Level + group */}
                <div>
                  <p className="text-sm font-semibold leading-snug text-foreground">
                    {edu.level}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Group: {edu.group}
                  </p>
                </div>

                {/* Institution */}
                <p className="text-sm font-medium text-foreground">
                  {edu.institution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
