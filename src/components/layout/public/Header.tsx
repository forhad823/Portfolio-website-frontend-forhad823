"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ForhadLogo } from "./ForhadLogo";
import { HeaderNav } from "./HeaderNav";
import { MobileNav } from "./MobileNav";
import { PageContainer } from "@/components/shared/PageContainer";
import { contactInfo } from "@/data/contact";

/**
 * Header — sticky navigation bar that starts fully transparent at the top
 * of the page and transitions to a glass surface once the user scrolls past
 * the hero section.
 *
 * Strategy: an IntersectionObserver watches a 1px sentinel div placed just
 * below the hero. When the sentinel leaves the viewport (user has scrolled
 * down), we apply the glass styles. When it re-enters (user scrolled back
 * to top), we restore transparency. This is lightweight, jank-free, and
 * works without polling scroll position.
 *
 * "use client" is required here only because we need useState / useEffect
 * for the IntersectionObserver. MobileNav was already a client component.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/*
       * Sentinel: a 1px element placed at the very top of the document body.
       * When it scrolls out of view, the header gets the glass treatment.
       */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="absolute top-0 h-px w-full"
      />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass-surface-strong border-b border-border/60"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <PageContainer>
          <div className="flex h-16 items-center justify-between gap-4">
            {/* ── Left: Logo ── */}
            <a
              href="#home"
              aria-label="Forhad — go to top"
              className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <ForhadLogo height={32} />
            </a>

            {/* ── Centre: Desktop nav (hidden on mobile) ── */}
            <div className="hidden flex-1 justify-center md:flex">
              <HeaderNav />
            </div>

            {/* ── Right: Resume button + Mobile hamburger ── */}
            <div className="flex shrink-0 items-center gap-2">
              {/* Resume — visible on sm+ */}
              <a
                href={contactInfo.resumeUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-primary bg-primary/10 px-4 py-1.5 text-sm font-semibold text-secondary-foreground backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
      </header>
    </>
  );
}
