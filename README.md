# Forhad — Personal Portfolio

A modern, responsive, single-page developer portfolio for **Md. Forhad Uddin**, a Full Stack Web Developer from Bangladesh. Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4, with a data-driven architecture that makes content updates a one-file change.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Biome](https://img.shields.io/badge/Biome-2.4-60A5FA?logo=biome&logoColor=white)](https://biomejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)

---

## Overview

The site is one continuous, five-section page designed to be scanned by recruiters in roughly 3–4 screen scrolls:

1. **Home** — hero with name, designation, contact details, social links, and resume download.
2. **About Me** — concise, fact-based bullet points.
3. **Projects** — three full-stack projects with quick links and accessible detail dialogs.
4. **Skills & Education** — grouped, icon-labeled skills plus education.
5. **Contact** — contact details, social profiles, and a validated contact form with a `mailto:` draft fallback.

Navigation links scroll smoothly to semantic section IDs (`#home`, `#about`, `#projects`, `#skills`, `#contact`), and a sticky glass header stays anchored to the top while scrolling.

## Features

- **Sticky, translucent navbar** that starts transparent over the hero and transitions to a glass surface on scroll.
- **Fully responsive** — desktop nav, and a keyboard-accessible slide-in `Sheet` menu on mobile.
- **Data-driven content** — projects, skills, and contact/social links live in typed modules (`src/data/*`), so adding or editing content never requires touching JSX.
- **Accessible project details** — each project opens a modal dialog with stack, links, challenges, and future plans; keyboard and screen-reader friendly.
- **Contact form** with client-side validation and inline errors. Since this is a static site, submission opens a pre-filled `mailto:` draft rather than falsely reporting delivery.
- **Themed surfaces** — translucent glass cards over a page-wide circuit-board background image, with a centralized design-token system.
- **Reduced-motion aware** — smooth scrolling is disabled when the user prefers reduced motion.
- **Static-first rendering** — the page is prerendered as static content with no backend, database, or API dependencies.

## Tech Stack

| Category        | Technology                                                                                                                               |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Framework       | [Next.js 16](https://nextjs.org) (App Router, Turbopack, React Compiler)                                                                 |
| UI Library      | [React 19](https://react.dev)                                                                                                            |
| Language        | [TypeScript 5](https://www.typescriptlang.org)                                                                                           |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com) (CSS-first config)                                                                            |
| Components      | [shadcn/ui](https://ui.shadcn.com) (`new-york`, zinc, CSS variables) + [Base UI](https://base-ui.com) / [Radix UI](https://radix-ui.com) |
| Icons           | [Lucide](https://lucide.dev) + [React Icons](https://react-icons.github.io/react-icons)                                                  |
| Theming         | [next-themes](https://github.com/pacocoursey/next-themes) tokens (single dark theme)                                                     |
| Tooling         | [Biome](https://biomejs.dev) (lint + format)                                                                                             |
| Package Manager | [pnpm](https://pnpm.io)                                                                                                                  |

## Project Structure

```
my-portfolio-website-forhad/
├─ public/                      # Static assets (background, profile, project images)
├─ src/
│  ├─ app/
│  │  ├─ (public)/
│  │  │  ├─ layout.tsx          # Public shell: Header + main + Footer
│  │  │  └─ page.tsx            # Single page — the five sections in order
│  │  ├─ layout.tsx             # Root layout, fonts, metadata, viewport
│  │  ├─ globals.css            # Design tokens, page background, glass utilities
│  │  ├─ loading.tsx            # Route-level loading UI
│  │  ├─ not-found.tsx          # 404 page
│  │  └─ global-error.tsx       # Global error boundary
│  ├─ components/
│  │  ├─ layout/public/         # Header, HeaderNav, MobileNav, Footer, ForhadLogo
│  │  ├─ sections/              # Home, About, Projects, Skills, Contact sections
│  │  │  └─ projects/           # ProjectCard + ProjectDetailsDialog
│  │  ├─ shared/                # PageContainer, SectionHeading, SocialLinks
│  │  └─ ui/                    # shadcn/ui primitives
│  ├─ data/
│  │  ├─ contact.ts             # Single source of truth: email, phone, socials, resume
│  │  ├─ projects.ts            # Typed project data (add/edit projects here)
│  │  └─ skills.ts              # Grouped skills + education
│  ├─ hooks/                    # Reusable React hooks
│  └─ lib/utils.ts              # `cn()` class-merge helper
├─ components.json              # shadcn/ui configuration
├─ biome.json                   # Biome lint/format configuration
├─ next.config.ts               # Next.js configuration
└─ package.json
```

## Getting Started

### Prerequisites

- **Node.js 20.9+**
- **pnpm** (`corepack enable` is the easiest way to get the pinned version)

### Installation

```bash
git clone <your-repository-url>
cd my-portfolio-website-forhad
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page hot-reloads as you edit files.

### Production Build

```bash
pnpm build
pnpm start
```

## Available Scripts

| Script              | Description                                      |
| ------------------- | ------------------------------------------------ |
| `pnpm dev`          | Start the development server (Turbopack).        |
| `pnpm build`        | Create an optimized production build.            |
| `pnpm start`        | Serve the production build.                      |
| `pnpm lint`         | Run Biome checks (lint + format + import order). |
| `pnpm lint:check`   | Lint only.                                       |
| `pnpm lint:fix`     | Apply safe lint fixes.                           |
| `pnpm format:check` | Check formatting.                                |
| `pnpm format:fix`   | Apply formatting.                                |

## Customizing Content

All the content a recruiter sees is centralized in three typed data modules. Update these and every component picks up the change automatically:

- **`src/data/contact.ts`** — name, designation, email, phone, resume URL, location, and social links. The header, hero, contact section, and footer all read from here.
- **`src/data/projects.ts`** — one object per project (`Project` type). Adding a new project is a matter of adding an object with `id`, `name`, `tagline`, `shortDescription`, `image`, `technologies`, `liveUrl`, `clientRepoUrl`, optional `serverRepoUrl`, `challenges`, and `futureImprovements`. Project cards and dialogs render automatically.
- **`src/data/skills.ts`** — grouped skill categories and education. Icons are real [react-icons](https://react-icons.github.io/react-icons) components (`react-icons/si`); import an icon and assign it to a skill's `icon` field.

### Adding a Project

1. Add a project screenshot to `public/`.
2. Append a `Project` object to the `projects` array in `src/data/projects.ts`.
3. Omit `serverRepoUrl` for frontend-only projects so no server repo button renders.

### Re-theming

The whole visual system lives in `src/app/globals.css` as semantic CSS variables (`--background`, `--primary`, `--card`, `--border`, etc.). The palette is sampled from `public/website-background.png`. Change the tokens there to re-skin the entire site consistently.

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) and a logical heading hierarchy.
- Descriptive `alt` text for meaningful images and `aria-hidden` on decorative icons.
- Visible focus rings, keyboard-operable navigation, dialogs, and form controls.
- Inline, screen-reader-announced form validation errors.
- `prefers-reduced-motion` respected for smooth scrolling.

## Deployment

This is a static-first Next.js app and deploys to any Node host or static-friendly platform.

**Vercel (recommended):**

1. Push the repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Next.js — accept the defaults and deploy.

**Static export (optional):** add `output: "export"` to `next.config.ts`, run `pnpm build`, and host the generated `out/` directory on any static host (Netlify, GitHub Pages, S3, etc.).

## Contact

- **Email:** forhaduddin823@gmail.com
- **GitHub:** [@forhad823](https://github.com/forhad823)
- **LinkedIn:** [md-forhad-uddin](https://www.linkedin.com/in/md-forhad-uddin-b65496231)
- **X / Twitter:** [@forhaduddin823](https://x.com/forhaduddin823)

## License

Released under the [MIT License](https://opensource.org/licenses/MIT). You are welcome to learn from the code; please do not reuse the personal content, photographs, or project write-ups as your own.
