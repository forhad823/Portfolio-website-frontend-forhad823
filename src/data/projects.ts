/**
 * projects.ts — Typed, ordered project data.
 *
 * All content is sourced from my-projects-readme/ README files.
 * To add, edit, or remove a project: change this file only — no JSX edits needed.
 * Priority order must stay: Hemacue → RentNest → LawBD.
 *
 * serverRepoUrl is optional; LawBD intentionally omits it (frontend-only project).
 */

export interface Project {
  id: string;
  name: string;
  tagline: string;
  shortDescription: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  clientRepoUrl: string;
  /** Omit for frontend-only projects — no server-side button will be rendered */
  serverRepoUrl?: string;
  challenges: string[];
  futureImprovements: string[];
}

export const projects: Project[] = [
  {
    id: "hemacue",
    name: "Hemacue",
    tagline: "Blood Donation & Emergency Service Platform",
    shortDescription:
      "A high-reliability emergency blood donation and medical logistics platform that bridges the critical gap between blood seekers and eligible donors. Features smart blood-type compatibility matching, a 90-day donation cooldown enforcement, role-based dashboards for donors, patients, and admins, and bKash Tokenized payment integration for premium logistics services.",
    image: "/hemacue-image.png",
    technologies: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
      "React Hook Form",
      "Zod",
      "Framer Motion",
      "JWT (HTTP-Only Cookies)",
      "Cloudinary",
      "bKash Tokenized API",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma ORM",
      "Redis",
      "Nodemailer",
      "Biome",
    ],
    liveUrl: "https://hemacue-frontend.vercel.app",
    clientRepoUrl: "https://github.com/forhad823/hemacue-frontend-a7b7",
    serverRepoUrl: "https://github.com/forhad823/hemacue-backend-A6-B7",
    challenges: [
      "Implementing medically accurate ABO/Rh blood-type compatibility rules while enforcing strict 90-day donor cooldown periods required careful state-machine design across both frontend and backend.",
      "Integrating bKash Tokenized Checkout (grant-token → create → execute flow) with Redis-cached tokens and automated PDF invoice generation added significant complexity to the payment pipeline.",
      "Designing a guarded workflow state machine (PENDING → VERIFIED → DONOR_ASSIGNED → IN_PROGRESS → COMPLETED) that prevented invalid status transitions while remaining intuitive in the admin dashboard.",
      "Balancing HTTP-only cookie security with the need for client-side session awareness without exposing sensitive token data to the browser.",
    ],
    futureImprovements: [
      "Real-time donor availability notifications via WebSockets or Server-Sent Events so patients receive instant updates when a matching donor accepts.",
      "A mobile app (React Native / Expo) to allow donors to receive push alerts and respond on the go.",
      "District-level heat maps showing live blood supply/demand statistics to help coordinate regional response.",
      "Integration with hospital management systems to automate emergency blood request creation directly from hospital records.",
    ],
  },
  {
    id: "rentnest",
    name: "RentNest",
    tagline: "Rental Property Marketplace",
    shortDescription:
      "A full-featured rental property marketplace connecting tenants, landlords, and admins through role-based dashboards. Supports browsing and searching property listings, rental request workflows, Stripe Checkout payments, post-stay reviews, and platform-wide admin moderation — all built with Next.js 16 App Router and Tailwind CSS v4.",
    image: "/rentnest-image.png",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Radix UI",
      "Stripe Checkout",
      "JWT (HTTP-Only Cookies)",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma ORM",
      "Biome",
    ],
    liveUrl: "https://my-rent-nest-frontend-a5-b7.vercel.app",
    clientRepoUrl: "https://github.com/forhad823/MY-RentNest-Frontend-A5B7",
    serverRepoUrl: "https://github.com/forhad823/My-RentNest-Backend-A4B7",
    challenges: [
      "Building the Next.js 16 proxy middleware for silent JWT refresh across role-based routes (TENANT / LANDLORD / ADMIN) required careful cookie handling to avoid redirect loops.",
      "Coordinating Stripe Checkout backend-driven sessions with the multi-step rental request approval workflow (PENDING → APPROVED → ACTIVE) while keeping UI states consistent across role dashboards.",
      "Designing a flexible property listing CRUD that handles optional amenities arrays and availability status transitions without data inconsistency.",
    ],
    futureImprovements: [
      "In-app tenant–landlord messaging to reduce reliance on external communication channels.",
      "Map-based property search with geolocation filtering using a service such as Mapbox.",
      "Automated lease agreement generation as a downloadable PDF once a rental request is approved.",
      "Email and SMS notification integration for rental status changes and payment receipts.",
    ],
  },
  {
    id: "lawbd",
    name: "LawBD",
    tagline: "Lawyer Finding & Appointment Booking Platform",
    shortDescription:
      "A modern, responsive frontend application for finding and booking appointments with experienced lawyers. Users can browse and filter a list of professional lawyers, view detailed profiles including expertise and availability, and book appointments directly through the platform. Also includes a legal blog section.",
    image: "/lawbd-image.png",
    technologies: [
      "React",
      "React Router",
      "Tailwind CSS",
      "daisyUI",
      "Vite",
      "ESLint",
    ],
    liveUrl: "https://cosmic-marshmallow-0260e0.netlify.app",
    clientRepoUrl:
      "https://github.com/forhad823/Law.BD-lawyer-appointment-booking-app-",
    // serverRepoUrl intentionally omitted — this is a frontend-only project
    challenges: [
      "Designing an intuitive lawyer search and filter experience (by expertise, availability, and location) as a pure frontend application without a backend data layer required careful local state management.",
      "Ensuring the appointment booking flow felt complete and trustworthy to users while working entirely client-side without real persistence.",
    ],
    futureImprovements: [
      "Connect to a real backend API (Node.js/Express + PostgreSQL) to persist lawyer profiles, user accounts, and booking records.",
      "Add a payment gateway integration so clients can pay consultation fees at booking time.",
      "Implement a lawyer review and rating system with moderation to build platform trust.",
      "Add a real-time availability calendar for each lawyer to prevent double-booking.",
    ],
  },
];
