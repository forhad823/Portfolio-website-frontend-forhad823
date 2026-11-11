import Image from "next/image";
import { Download, Mail, Phone } from "lucide-react";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { contactInfo } from "@/data/contact";

/**
 * HomeSection — hero section with profile photo, name, designation,
 * contact details, social links, and resume CTA.
 *
 * Layout:
 *  - Desktop (lg+): two columns. The text column defines the row height and
 *    the photo column stretches to match it exactly, so both sides always
 *    line up top and bottom, whatever the content length.
 *  - Mobile / tablet: single column. The photo comes first, then name,
 *    designation and the rest of the content underneath.
 *
 * The photo uses `next/image` with `fill`, so it has no intrinsic height of
 * its own and can never push the row taller than the text column.
 */
export function HomeSection() {
  return (
    <section
      id="home"
      aria-label="Home"
      className="flex min-h-[calc(100dvh-4rem)] scroll-mt-16 items-center py-10 sm:py-12"
    >
      <PageContainer>
        {/* items-stretch → both columns share the same height on desktop */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-14">
          {/* ── Photo ──
              DOM order keeps the <h1> first for screen readers and SEO;
              `order-first` puts the photo on top for mobile and
              `lg:order-last` moves it to the right on desktop. */}
          <div className="relative isolate order-first mx-auto aspect-4/5 w-full max-w-xs sm:max-w-sm lg:order-last lg:ml-auto lg:mr-0 lg:aspect-auto lg:min-h-104 lg:max-w-md">
            {/* Soft glow behind the frame */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-3xl"
            />

            {/* Frame fills the whole grid cell */}
            <div className="glass-surface absolute inset-0 rounded-2xl border-2 border-primary/30 p-2 shadow-xl shadow-primary/10">
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src="/my-face-image.png"
                  alt={`${contactInfo.name} — ${contactInfo.designation}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 90vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* ── Text content ──
              justify-center keeps the content visually centred against
              the photo if the photo ever ends up taller than the text. */}
          <div className="flex flex-col justify-center gap-5">
            {/* Name + designation */}
            <div className="flex flex-col gap-2">
              <SectionHeading
                as="h1"
                title={contactInfo.displayName}
                align="left"
                showAccentLine={false}
                titleClassName="text-4xl sm:text-6xl lg:text-7xl tracking-tight"
              />

              <p className="text-xl font-medium text-primary sm:text-2xl lg:text-3xl">
                {contactInfo.designation}
              </p>
            </div>

            {/* Short introduction */}
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I&apos;m from{" "}
              <span className="font-medium text-foreground">
                {contactInfo.location}
              </span>
              , focused on building and maintaining industry-standard,
              high-quality web applications with modern technologies.
            </p>

            {/* Contact details — email and phone */}
            <ul className="flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6 sm:text-base">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  <Mail
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 text-primary"
                  />
                  <span className="underline decoration-primary/30 decoration-1 underline-offset-4 group-hover:decoration-primary">
                    {contactInfo.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  <Phone
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 text-primary"
                  />
                  <span className="underline decoration-primary/30 decoration-1 underline-offset-4 group-hover:decoration-primary">
                    {contactInfo.phone}
                  </span>
                </a>
              </li>
            </ul>

            {/* Divider separates identity from actions */}
            <div
              aria-hidden="true"
              className="h-px w-full max-w-xl bg-border"
            />

            {/* Resume CTA + social links */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={contactInfo.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                Download Resume
                <Download size={18} aria-hidden="true" />
              </a>

              <SocialLinks size="md" iconSize={20} />
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
