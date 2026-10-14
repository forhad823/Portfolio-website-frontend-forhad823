/**
 * skills.ts — Typed, grouped skills data.
 *
 * All skills are verified against the project README files.
 * Firebase and Mongoose are explicitly included as requested.
 * To add or remove a skill: edit this file only.
 */

export interface Skill {
  name: string;
  /** Optional icon identifier — matched against react-icons Si* names in the component */
  icon?: string;
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
      { name: "Next.js", icon: "SiNextdotjs" },
      { name: "React", icon: "SiReact" },
      { name: "TypeScript", icon: "SiTypescript" },
      { name: "Tailwind CSS", icon: "SiTailwindcss" },
      { name: "shadcn/ui", icon: "SiShadcnui" },
      { name: "Radix UI", icon: "SiRadixui" },
      { name: "Framer Motion", icon: "SiFramer" },
      { name: "React Hook Form", icon: "SiReacthookform" },
      { name: "Zod", icon: "SiZod" },
      { name: "TanStack Query", icon: "SiReactquery" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js", icon: "SiNodedotjs" },
      { name: "Express.js", icon: "SiExpress" },
      { name: "Prisma ORM", icon: "SiPrisma" },
      { name: "REST APIs", icon: "SiPostman" },
      { name: "JWT", icon: "SiJsonwebtokens" },
      { name: "Redis", icon: "SiRedis" },
    ],
  },
  {
    id: "database",
    label: "Database",
    skills: [
      { name: "PostgreSQL", icon: "SiPostgresql" },
      { name: "MongoDB", icon: "SiMongodb" },
      { name: "Mongoose", icon: "SiMongoose" },
      { name: "Firebase", icon: "SiFirebase" },
    ],
  },
  {
    id: "services",
    label: "Services & Integrations",
    skills: [
      { name: "Cloudinary", icon: "SiCloudinary" },
      { name: "Stripe", icon: "SiStripe" },
      { name: "bKash API" },
    ],
  },
  {
    id: "tools",
    label: "Tools & Workflow",
    skills: [
      { name: "Git", icon: "SiGit" },
      { name: "GitHub", icon: "SiGithub" },
      { name: "Vite", icon: "SiVite" },
      { name: "Biome", icon: "SiBiome" },
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
