import type * as React from "react";
import { cn } from "@/lib/utils";

/**
 * PageContainer — consistent max-width + horizontal padding wrapper.
 *
 * All sections use this so gutter sizes are never duplicated in JSX.
 * Pass `as` to change the rendered element (default: div).
 */
interface PageContainerProps extends React.ComponentProps<"div"> {
  as?: React.ElementType;
}

export function PageContainer({
  as: Tag = "div",
  className,
  children,
  ...props
}: PageContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
