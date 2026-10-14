import { cn } from "@/lib/utils";

interface ForhadLogoProps {
  className?: string;
  /** Height of the SVG in px (width scales proportionally) */
  height?: number;
}

/**
 * ForhadLogo — Custom inline SVG wordmark spelling "Forhad".
 *
 * Designed to match the electric-blue circuit-board theme:
 * – Letter strokes use the primary accent colour.
 * – A small circuit-node dot decorates the baseline for a tech feel.
 * – Fully scalable; no external assets required.
 * – aria-hidden when used beside a visible text label, or give it
 *   an aria-label when it is the sole brand identifier.
 */
export function ForhadLogo({ className, height = 36 }: ForhadLogoProps) {
  // viewBox proportions: width 130 × height 40
  const width = (height / 40) * 130;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130 40"
      width={width}
      height={height}
      aria-label="Forhad — Full Stack Web Developer"
      role="img"
      className={cn("select-none", className)}
    >
      {/* Gradient definition — electric blue → cyan, matching palette */}
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="oklch(0.62 0.22 240)" />
          <stop offset="100%" stopColor="oklch(0.78 0.15 200)" />
        </linearGradient>
      </defs>

      {/*
       * "FORHAD" text rendered as SVG text with the gradient fill.
       * Font-family falls back to system sans-serif; the Geist font
       * variable is available on the page but SVG text uses the
       * inherited font stack.
       */}
      <text
        x="2"
        y="30"
        fontFamily="var(--font-sans, system-ui, sans-serif)"
        fontSize="28"
        fontWeight="800"
        letterSpacing="1"
        fill="url(#logoGrad)"
      >
        FORHAD
      </text>

      {/* Decorative circuit node — small filled circle on the baseline */}
      {/* <circle cx="124" cy="34" r="3" fill="oklch(0.78 0.15 200)" /> */}

      {/* Decorative short circuit trace line below the text */}
      {/* <line
        x1="2"
        y1="36"
        x2="118"
        y2="36"
        stroke="url(#logoGrad)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        strokeLinecap="round"
        opacity="0.5"
      /> */}
    </svg>
  );
}
