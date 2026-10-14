import type * as React from "react";
import { cn } from "@/lib/utils";

/**
 * SectionHeading — reusable section title + optional subtitle.
 *
 * Renders an <h2> by default. Pass `as="h1"` for the home hero title.
 * align defaults to "center"; pass "left" for left-aligned hero content.
 */
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
  /** Extra classes applied only to the title element */
  titleClassName?: string;
  /** Extra classes applied only to the subtitle element */
  subtitleClassName?: string;
  /** Accent line decoration below the title */
  showAccentLine?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  as: Tag = "h2",
  align = "center",
  className,
  titleClassName,
  subtitleClassName,
  showAccentLine = true,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <Tag
        className={cn(
          "font-bold tracking-tight text-foreground",
          Tag === "h1" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl",
          titleClassName,
        )}
      >
        {title}
      </Tag>

      {showAccentLine && (
        <span
          aria-hidden="true"
          className={cn(
            "block h-1 w-16 rounded-full bg-primary",
            align === "center" && "mx-auto",
          )}
        />
      )}

      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-base text-muted-foreground sm:text-lg",
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
