import { HomeSection } from "@/components/sections/HomeSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";

/**
 * page.tsx — Single-page portfolio.
 *
 * Section order is fixed and must never change:
 *   1. Home        → #home        (HomeSection)
 *   2. About Me    → #about       (AboutSection)
 *   3. Projects    → #projects    (ProjectsSection)
 *   4. Skills      → #skills      (SkillsSection)
 *   5. Contact     → #contact     (ContactSection)
 *
 * The Header/Footer shell is provided by (public)/layout.tsx.
 * scroll-mt-16 on every section ensures anchor links account for
 * the 64px (h-16) sticky header.
 */
export default function PortfolioPage() {
  return (
    <>
      {/* ── 1. Home ──────────────────────────────────────────────────── */}
      <HomeSection />

      {/* ── 2. About Me ──────────────────────────────────────────────── */}
      <AboutSection />

      {/* ── 3. Projects ──────────────────────────────────────────────── */}
      <ProjectsSection />

      {/* ── 4. Skills & Education ────────────────────────────────────── */}
      <SkillsSection />

      {/* ── 5. Contact ───────────────────────────────────────────────── */}
      <ContactSection />
    </>
  );
}
