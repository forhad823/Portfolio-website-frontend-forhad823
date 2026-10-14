import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/* ── Fonts ───────────────────────────────────────────────────────────────── */
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* ── Metadata ────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "Forhad | Full Stack Web Developer",
    template: "%s | Forhad",
  },
  description:
    "Portfolio of Md. Forhad Uddin — Full Stack Web Developer from Bangladesh. " +
    "Building practical web applications with Next.js, React, TypeScript, Node.js, and PostgreSQL.",
  keywords: [
    "Full Stack Web Developer",
    "Next.js developer",
    "React developer",
    "TypeScript",
    "Bangladesh developer",
    "Forhad",
    "Md. Forhad Uddin",
  ],
  authors: [{ name: "Md. Forhad Uddin" }],
  creator: "Md. Forhad Uddin",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Forhad | Full Stack Web Developer",
    description:
      "Portfolio of Md. Forhad Uddin — Full Stack Web Developer from Bangladesh.",
    siteName: "Forhad's Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forhad | Full Stack Web Developer",
    description:
      "Portfolio of Md. Forhad Uddin — Full Stack Web Developer from Bangladesh.",
    creator: "@forhaduddin823",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0d1b4b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/* ── Root Layout ─────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
