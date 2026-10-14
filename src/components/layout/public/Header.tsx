import { ForhadLogo } from "./ForhadLogo";
import { HeaderNav } from "./HeaderNav";
import { MobileNav } from "./MobileNav";
import { PageContainer } from "@/components/shared/PageContainer";
import { contactInfo } from "@/data/contact";

/**
 * Header — sticky, transparent-to-glass navigation bar.
 *
 * Remains a Server Component: only MobileNav (the interactive hamburger +
 * Sheet) is a Client Component. Tailwind's `scroll-mt-20` is added to each
 * section so the sticky header never obscures headings on anchor navigation.
 *
 * Visual strategy:
 * – Starts transparent over the circuit-board background.
 * – Becomes glass-surface-strong (backdrop-blur + dark tint) on scroll via
 *   the CSS class `header-scrolled` toggled by a tiny inline script-free
 *   approach: we use a CSS scroll-driven hack or simply always apply the
 *   glass treatment since the header sits above the background image anyway.
 *   For a static portfolio this is the right pragmatic choice.
 */
export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glass backdrop — always on so text is always readable */}
      <div className="glass-surface-strong border-b border-border/60">
        <PageContainer>
          <div className="flex h-16 items-center justify-between gap-4">
            {/* ── Left: Logo ── */}
            <a
              href="#home"
              aria-label="Forhad — go to top"
              className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
            >
              <ForhadLogo height={32} />
            </a>

            {/* ── Centre: Desktop nav (hidden on mobile) ── */}
            <div className="hidden flex-1 justify-center md:flex">
              <HeaderNav />
            </div>

            {/* ── Right: Resume button + Mobile hamburger ── */}
            <div className="flex shrink-0 items-center gap-2">
              {/* Resume — visible on all breakpoints */}
              <a
                href={contactInfo.resumeUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-lg border border-primary bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex items-center gap-1.5"
              >
                Resume
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>

              {/* Mobile hamburger — client component */}
              <MobileNav />
            </div>
          </div>
        </PageContainer>
      </div>
    </header>
  );
}
