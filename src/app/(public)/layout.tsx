import { Header } from "@/components/layout/public/Header";
import { Footer } from "@/components/layout/public/Footer";

/**
 * (public)/layout.tsx — Shell for all public-facing routes.
 *
 * Wraps children with sticky Header and Footer so every public page inherits
 * the same navigation structure. The main element applies scroll-mt-20 via
 * Tailwind so anchor navigation accounts for the sticky header height.
 *
 * Remains a Server Component — only the mobile hamburger Sheet in Header
 * is a Client Component.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      {/*
       * pt-16 offsets the fixed 64px (h-16) header so content is never
       * hidden behind it. scroll-mt-20 on individual sections handles
       * anchor-jump offsets independently.
       */}
      <main className="pt-16">{children}</main>

      <Footer />
    </>
  );
}
