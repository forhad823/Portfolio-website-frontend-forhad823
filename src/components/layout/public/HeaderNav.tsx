import { cn } from "@/lib/utils";

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

interface HeaderNavProps {
  /** Called after a link is clicked — used by mobile nav to close the sheet */
  onLinkClick?: () => void;
  /** Extra classes on the <nav> element */
  className?: string;
  /** Render links in a vertical stack instead of a row (mobile sheet) */
  vertical?: boolean;
}

/**
 * HeaderNav — desktop navigation link list.
 *
 * Shared between the sticky desktop header and the mobile Sheet panel.
 * All nav links point to in-page section IDs. The scroll-margin-top on
 * each section (set in globals.css via scroll-mt-* utilities) prevents the
 * sticky header from obscuring headings on anchor navigation.
 */
export function HeaderNav({
  onLinkClick,
  className,
  vertical = false,
}: HeaderNavProps) {
  return (
    <nav aria-label="Main navigation">
      <ul
        role="list"
        className={cn(
          "flex items-center",
          vertical ? "flex-col gap-1" : "flex-row gap-1",
          className,
        )}
      >
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={onLinkClick}
              className={cn(
                "relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground",
                "transition-colors duration-150",
                "hover:text-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-transparent",
                // Animated underline
                "after:absolute after:bottom-0.5 after:left-3 after:right-3 after:h-px",
                "after:origin-left after:scale-x-0 after:rounded-full after:bg-primary",
                "after:transition-transform after:duration-200",
                "hover:after:scale-x-100",
                vertical && "w-full text-base",
              )}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
