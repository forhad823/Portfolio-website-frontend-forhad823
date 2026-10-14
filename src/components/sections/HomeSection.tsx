import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { contactInfo } from "@/data/contact";

/**
 * HomeSection — hero section with profile photo, name, designation,
 * contact details, social links, and resume CTA.
 *
 * The largest viewport-height section on the page — ensures the hero
 * dominates the first impression. Balanced two-column layout on desktop
 * collapses to a single stack on mobile with the image shown first.
 */
export function HomeSection() {
  return (
    <section
      id="home"
      aria-label="Home"
      className="flex min-h-dvh items-center scroll-mt-20 py-24"
    >
      <PageContainer>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* ── Left: Text content ── */}
          <div className="flex flex-col gap-6">
            {/* Name + designation */}
            <SectionHeading
              as="h1"
              title={contactInfo.displayName}
              align="left"
              showAccentLine={false}
              titleClassName="text-5xl sm:text-6xl lg:text-7xl"
            />

            <p className="text-2xl font-medium text-primary sm:text-3xl">
              {contactInfo.designation}
            </p>

            {/* Short introduction */}
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              I'm from{" "}
              <span className="font-medium text-foreground">
                {contactInfo.location}
              </span>{" "}
              focused on building practical, high-quality web applications with
              modern technologies.
            </p>

            {/* Contact details — email and phone */}
            <div className="flex flex-col gap-3 text-sm sm:text-base">
              <a
                href={`mailto:${contactInfo.email}`}
                className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 text-primary"
                />
                <span className="underline decoration-primary/30 decoration-1 underline-offset-2 group-hover:decoration-primary">
                  {contactInfo.email}
                </span>
              </a>

              <a
                href={`tel:${contactInfo.phone}`}
                className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 text-primary"
                />
                <span className="underline decoration-primary/30 decoration-1 underline-offset-2 group-hover:decoration-primary">
                  {contactInfo.phone}
                </span>
              </a>
            </div>

            {/* Social links */}
            <SocialLinks size="md" iconSize={20} className="mt-2" />

            {/* Resume download button */}
            <div className="mt-4">
              <a
                href={contactInfo.resumeUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                Download Resume
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
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
            </div>
          </div>

          {/* ── Right: Profile photo ── */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow effect behind the image */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-3xl"
              />

              {/* Profile image */}
              <div className="glass-surface relative overflow-hidden rounded-2xl border-2 border-primary/30 p-2">
                <Image
                  src="/my-face-image.png"
                  alt={`${contactInfo.name} — Full Stack Web Developer`}
                  width={400}
                  height={400}
                  priority
                  className="h-auto w-full max-w-sm rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
