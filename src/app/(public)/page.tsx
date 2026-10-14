import { HomeSection } from "@/components/sections/HomeSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";

/**
 * page.tsx — Single-page portfolio.
 *
 * Section order is fixed and must never change:
 *   1. Home        → #home        (HomeSection — built in Step 2)
 *   2. About Me    → #about       (AboutSection — built in Step 2)
 *   3. Projects    → #projects    (stub — built in Step 3)
 *   4. Skills      → #skills      (stub — built in Step 4)
 *   5. Contact     → #contact     (stub — built in Step 4)
 *
 * The Header/Footer shell is provided by (public)/layout.tsx.
 * scroll-mt-20 on every section ensures anchor links account for
 * the 64px (h-16) sticky header.
 */
export default function PortfolioPage() {
  return (
    <>
      {/* ── 1. Home ──────────────────────────────────────────────────── */}
      <HomeSection />

      {/* ── 2. About Me ──────────────────────────────────────────────── */}
      <AboutSection />

      {/* ── 3. Projects (Step 3 stub) ────────────────────────────────── */}
      <section
        id="projects"
        aria-label="Projects"
        className="py-20 scroll-mt-20 sm:py-28"
      >
        <PageContainer>
          <SectionHeading
            title="Projects"
            subtitle="Showcasing real-world projects built end-to-end."
            className="mb-14"
          />
          <div className="glass-surface flex min-h-40 items-center justify-center rounded-2xl">
            <p className="text-muted-foreground">
              Project cards coming in Step 3.
            </p>
          </div>
        </PageContainer>
      </section>

      {/* ── 4. Skills & Education (Step 4 stub) ─────────────────────── */}
      <section
        id="skills"
        aria-label="Skills and Education"
        className="py-20 scroll-mt-20 sm:py-28"
      >
        <PageContainer>
          <SectionHeading
            title="Skills & Education"
            subtitle="Technologies I build with and my academic background."
            className="mb-14"
          />
          <div className="glass-surface flex min-h-40 items-center justify-center rounded-2xl">
            <p className="text-muted-foreground">
              Skills &amp; Education coming in Step 4.
            </p>
          </div>
        </PageContainer>
      </section>

      {/* ── 5. Contact (Step 4 stub) ─────────────────────────────────── */}
      <section
        id="contact"
        aria-label="Contact"
        className="py-20 scroll-mt-20 sm:py-28"
      >
        <PageContainer>
          <SectionHeading
            title="Contact"
            subtitle="Get in touch — I'm open to new opportunities."
            className="mb-14"
          />
          <div className="glass-surface flex min-h-40 items-center justify-center rounded-2xl">
            <p className="text-muted-foreground">Contact form coming in Step 4.</p>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
