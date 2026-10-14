"use client";

import { type FormEvent, useState } from "react";
import { Mail, Phone, Send } from "lucide-react";
import { contactInfo, socialLinks } from "@/data/contact";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { cn } from "@/lib/utils";

/**
 * Icon map — same set used in SocialLinks, kept local to avoid coupling.
 */
const ICON_MAP = {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaFacebook,
} as const;
type IconKey = keyof typeof ICON_MAP;

/* ── Form field types ──────────────────────────────────────────────────── */
interface FormFields {
  name: string;
  email: string;
  message: string;
}
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

/** Very small inline validator — no library dependency. */
function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.name.trim()) {
    errors.name = "Name is required.";
  }
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.message.trim()) {
    errors.message = "Message is required.";
  } else if (fields.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }
  return errors;
}

/**
 * ContactSection — Section 5 of 5.
 *
 * Left column: contact details (email, phone) + social links.
 * Right column: contact form with accessible labels and inline validation.
 *
 * Static-site boundary: no backend email delivery is configured, so on
 * submit the form opens a pre-filled mailto: draft in the user's email
 * client. This is clearly the intended action (button label "Open Email
 * Draft") — the form never falsely reports that a message was "sent".
 *
 * To wire up a real delivery service (e.g. Resend, Formspree, EmailJS),
 * replace the openMailto() call in handleSubmit with the service's API
 * call and update the button label and success message accordingly.
 */
export function ContactSection() {
  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Re-validate only touched fields on change
    if (touched[name as keyof FormFields]) {
      setErrors(validate({ ...fields, [name]: value }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(fields));
  }

  function openMailto() {
    const subject = encodeURIComponent(
      `Portfolio Contact from ${fields.name.trim()}`,
    );
    const body = encodeURIComponent(
      `Hi Forhad,\n\n${fields.message.trim()}\n\n— ${fields.name.trim()}\n${fields.email.trim()}`,
    );
    window.open(
      `mailto:${contactInfo.email}?subject=${subject}&body=${body}`,
      "_blank",
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Mark all fields as touched to show errors
    setTouched({ name: true, email: true, message: true });
    const newErrors = validate(fields);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    openMailto();
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="py-8 scroll-mt-16 sm:py-10"
    >
      <PageContainer>
        <SectionHeading
          title="Get In Touch"
          subtitle="Open to opportunities, collaborations, and questions."
          className="mb-8"
        />

        <div className="grid gap-8 lg:grid-cols-5">
          {/* ── Left: Contact details + social ── */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="glass-surface flex flex-col gap-5 rounded-2xl p-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
                Contact Details
              </h3>

              {/* Email */}
              <a
                href={`mailto:${contactInfo.email}`}
                className="group flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail size={15} aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs font-medium text-muted-foreground/60">
                    Email
                  </span>
                  <span className="break-all group-hover:underline">
                    {contactInfo.email}
                  </span>
                </span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${contactInfo.phone}`}
                className="group flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone size={15} aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs font-medium text-muted-foreground/60">
                    Phone
                  </span>
                  <span className="group-hover:underline">
                    {contactInfo.phone}
                  </span>
                </span>
              </a>

              {/* Social links */}
              <div>
                <p className="mb-3 text-xs font-medium text-muted-foreground/60">
                  Social Profiles
                </p>
                <ul
                  role="list"
                  aria-label="Social media profiles"
                  className="flex flex-wrap gap-2.5"
                >
                  {socialLinks.map((link) => {
                    const Icon = ICON_MAP[link.icon as IconKey];
                    if (!Icon) return null;
                    return (
                      <li key={link.platform}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.ariaLabel}
                          className="glass-surface flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <Icon size={16} aria-hidden="true" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* ── Right: Contact form ── */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
              className="glass-surface flex flex-col gap-5 rounded-2xl p-6"
            >
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-sm font-medium text-foreground"
                >
                  Name <span aria-hidden="true" className="text-destructive">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-describedby={errors.name && touched.name ? "error-name" : undefined}
                  aria-invalid={!!(errors.name && touched.name)}
                  value={fields.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your full name"
                  className={cn(
                    "w-full rounded-lg border bg-input px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50",
                    "outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20",
                    errors.name && touched.name
                      ? "border-destructive focus:ring-destructive/20"
                      : "border-border",
                  )}
                />
                {errors.name && touched.name && (
                  <p id="error-name" role="alert" className="text-xs text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-sm font-medium text-foreground"
                >
                  Email <span aria-hidden="true" className="text-destructive">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-describedby={errors.email && touched.email ? "error-email" : undefined}
                  aria-invalid={!!(errors.email && touched.email)}
                  value={fields.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="your@email.com"
                  className={cn(
                    "w-full rounded-lg border bg-input px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50",
                    "outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20",
                    errors.email && touched.email
                      ? "border-destructive focus:ring-destructive/20"
                      : "border-border",
                  )}
                />
                {errors.email && touched.email && (
                  <p id="error-email" role="alert" className="text-xs text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium text-foreground"
                >
                  Message <span aria-hidden="true" className="text-destructive">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  aria-required="true"
                  aria-describedby={errors.message && touched.message ? "error-message" : undefined}
                  aria-invalid={!!(errors.message && touched.message)}
                  value={fields.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Tell me about your project or opportunity…"
                  className={cn(
                    "w-full resize-y rounded-lg border bg-input px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50",
                    "outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20",
                    errors.message && touched.message
                      ? "border-destructive focus:ring-destructive/20"
                      : "border-border",
                  )}
                />
                {errors.message && touched.message && (
                  <p id="error-message" role="alert" className="text-xs text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={hasErrors && Object.keys(touched).length === 3}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all",
                    "bg-primary text-primary-foreground shadow-lg shadow-primary/20",
                    "hover:opacity-90 hover:shadow-xl hover:shadow-primary/30",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                    "disabled:pointer-events-none disabled:opacity-50",
                  )}
                >
                  <Send size={15} aria-hidden="true" />
                  Open Email Draft
                </button>
                {/* Transparent about the static-site limitation */}
                <p className="text-xs text-muted-foreground/60">
                  This opens a pre-filled draft in your email client.
                </p>
              </div>
            </form>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
