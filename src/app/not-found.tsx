import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist or has moved.",
};

export default function NotFound() {
  return <div>Not Found</div>;
}
