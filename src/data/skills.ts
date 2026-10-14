/**
 * skills.ts — Typed, grouped skills data.
 *
 * All skills are verified against the project README files.
 * Firebase and Mongoose are explicitly included as requested.
 * To add or remove a skill: edit this file only.
 *
 * Icons are real react-icons component references (Simple Icons set), not
 * strings — a string would render as an unknown HTML tag and stay invisible.
 * Import a new icon from "react-icons/si" and assign it to `icon` to use it.
 */

import type { IconType } from "react-icons";
import {
  SiBiome,
  SiCloudinary,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
  SiJsonwebtokens,
  SiMongodb,
  SiMongoose,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiRadixui,
  SiReact,
  SiReacthookform,
  SiReactquery,
  SiRedis,
  SiShadcnui,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiZod,
} from "react-icons/si";

export interface Skill {
  name: string;
  /** Optional react-icons component rendered before the skill label */
  icon?: IconType;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "shadcn/ui", icon: SiShadcnui },
      { name: "Radix UI", icon: SiRadixui },
      { name: "Framer Motion", icon: SiFramer },
      { name: "React Hook Form", icon: SiReacthookform },
      { name: "Zod", icon: SiZod },
      { name: "TanStack Query", icon: SiReactquery },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "Prisma ORM", icon: SiPrisma },
      { name: "REST APIs", icon: SiPostman },
      { name: "JWT", icon: SiJsonwebtokens },
      { name: "Redis", icon: SiRedis },
    ],
  },
  {
    id: "database",
    label: "Database",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Mongoose", icon: SiMongoose },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    id: "services",
    label: "Services & Integrations",
    skills: [
      { name: "Cloudinary", icon: SiCloudinary },
      { name: "Stripe", icon: SiStripe },
      { name: "bKash API" },
    ],
  },
  {
    id: "tools",
    label: "Tools & Workflow",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Vite", icon: SiVite },
      { name: "Biome", icon: SiBiome },
    ],
  },
];

/**
 * Education data — use exactly the facts provided; no fabricated graduation year.
 */
export interface Education {
  level: string;
  group: string;
  institution: string;
  gpa: string;
  scale: string;
}

export const education: Education[] = [
  {
    level: "Higher Secondary Certificate (HSC)",
    group: "Science",
    institution: "National Model College",
    gpa: "4.00",
    scale: "5.00",
  },
];
