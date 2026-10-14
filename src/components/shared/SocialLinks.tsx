import { FaFacebook, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { socialLinks } from "@/data/contact";

/**
 * Icon map — fa6 brand icons verified to exist in react-icons@5.7.0.
 * react-icons/si v5 dropped SiLinkedin; fa6 has all four platforms.
 */
const ICON_MAP = {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaFacebook,
} as const;

type IconKey = keyof typeof ICON_MAP;

interface SocialLinksProps {
  /** Additional classes on the wrapping <ul> */
  className?: string;
  /** Icon size in px passed to react-icons (default 20) */
  iconSize?: number;
  /** Visual size variant of the button ring */
  size?: "sm" | "md" | "lg";
}

/**
 * SocialLinks — renders the four social icon links as an accessible list.
 *
 * All URLs and labels come from src/data/contact.ts — never duplicated here.
 */
export function SocialLinks({
  className,
  iconSize = 20,
  size = "md",
}: SocialLinksProps) {
  const ringSize = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }[size];

  return (
    <ul
      // role="list"
      aria-label="Social media profiles"
      className={cn("flex flex-wrap items-center gap-3", className)}
    >
      {socialLinks.map((link) => {
        const IconComponent = ICON_MAP[link.icon as IconKey];
        if (!IconComponent) return null;

        return (
          <li key={link.platform}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
              className={cn(
                ringSize,
                "glass-surface flex items-center justify-center rounded-full",
                "text-muted-foreground transition-colors duration-200",
                "hover:border-primary hover:text-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
              )}
            >
              <IconComponent size={iconSize} aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
