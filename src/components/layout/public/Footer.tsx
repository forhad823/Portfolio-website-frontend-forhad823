import { PageContainer } from "@/components/shared/PageContainer";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { contactInfo } from "@/data/contact";

/**
 * Footer — minimal, consistent footer that closes the page.
 *
 * Keeps it compact: copyright line + social icons.
 * Full contact details are in the Contact section above — no duplication.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60">
      <div className="glass-surface-strong py-6">
        <PageContainer>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              &copy; {year}{" "}
              <span className="font-medium text-foreground">
                {contactInfo.name}
              </span>
              . Built with Next.js &amp; Tailwind CSS.
            </p>

            {/* Social icons — sm size for footer */}
            <SocialLinks size="sm" iconSize={16} />
          </div>
        </PageContainer>
      </div>
    </footer>
  );
}
