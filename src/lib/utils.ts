/**
 * cn — class name merger
 *
 * The project uses the "cn" npm package (not clsx+twMerge) and
 * @base-ui/react components that already import from "cn" directly.
 * This re-export gives every component a single consistent import path
 * (@/lib/utils) while delegating to the installed package.
 */
export { cn } from "cn";
