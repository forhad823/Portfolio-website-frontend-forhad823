# Implementation Plan: Forhad's Single-Page Portfolio (i'll try it Later or future)

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui on Base UI · Biome · pnpm
**Goal:** a static, recruiter-friendly, fully responsive portfolio that can be built by several lower-grade LLMs in **5 steps** without any step breaking an earlier one.

> **Verification statement.** Every code block in this plan was copied from a working reconstruction of your repo (built from `project.txt`) that passed: `biome check`, `tsc --noEmit`, the guardrail script, the duplicate-code check, and `next build` (Next 16.3.4). The production HTML was also inspected (five sections in order, resume link, mailto/tel links, four social links, three Details buttons, a real 404). **Not verified:** how it looks in a browser, and the real `website-background.png` colours (see 1.2, item 6). Step 1 includes a script that measures the image, so no model has to guess.

---

## 0. How to use this plan

1. Run the steps **in order, 1 to 5, one step per LLM session.**
2. After each step run **`pnpm verify`**. It must finish with no error. Then `git commit`. Only then start the next step.
3. Give the LLM this prompt (replace `N`):

```text
Read implementation-plan.md fully. Execute ONLY "Step N". Create/overwrite exactly the files listed
in that step, with exactly the code shown. Do not touch any other file. Do not refactor, rename,
or "improve" anything. Obey every rule in section 2 (Guardrails). When finished, run `pnpm verify`
and paste the result. If it fails, fix only the files of this step.
```

4. If a step fails, **do not continue.** Fix it first (section 6 lists the common causes).

**Why this order never breaks earlier work:** each step only _adds_ files that depend on files from _earlier_ steps, never on later ones. Where a later file is needed earlier (the page needs five section components), Step 3 creates tiny placeholders that Steps 4 and 5 overwrite completely (same file path, same export name).

---

## 1. Analysis of the uploaded project

### 1.1 What exists today

| Area           | Finding                                                                                                                                                                                                                                                                                      |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework      | `next 16.3.4`, `react 19.2.8`, React Compiler on, Tailwind v4 (`@tailwindcss/postcss`), TypeScript strict, `@/*` maps to `src/*`                                                                                                                                                             |
| Tooling        | `pnpm 11`, Biome 2.4.2 (`pnpm lint` = `biome check`)                                                                                                                                                                                                                                         |
| shadcn config  | `components.json`: style `new-york`, base colour `zinc`, CSS variables on, icons `lucide`, aliases `@/components`, `@/components/ui`, `@/hooks`, `@/lib`                                                                                                                                     |
| UI primitives  | 25 components in `src/components/ui`. Most are built on **Base UI** (`@base-ui/react`), not Radix. Only `accordion` uses `radix-ui`. `cn` comes from the **`cn`** npm package (shadcn's own class merger, a drop-in for clsx + tailwind-merge), so `import { cn } from "cn"` is correct here |
| Public assets  | `hemacue-image.png`, `rentnest-image.png`, `lawbd-image.png`, `my-face-image.png`, `website-background.png`, plus unused default SVGs                                                                                                                                                        |
| Source state   | `src/app/layout.tsx`, `loading.tsx`, `not-found.tsx`, `(public)/layout.tsx`, `Header/HeaderNav/MobileNav/Footer.tsx` are **empty (0 bytes)**. `global-error.tsx` only contains `"use client";`. `page.tsx` is a placeholder. `README.md` is empty                                            |
| Content source | `my-projects-readme/` (Hemacue backend + frontend, RentNest backend + frontend, LawBD frontend) and `portfolio-project-requirement.txt` (embedded inside `project.txt`)                                                                                                                      |

### 1.2 Problems found (all fixed in Step 1)

1. **Build is broken today.** `src/components/ui/input-otp.tsx` imports the package `input-otp`, which is not in `package.json`. `tsc` fails.
2. **`pnpm lint` fails today** (24 errors, 2 warnings). All of them are in shadcn files this portfolio does not use (`input-otp`, `pagination`, `sidebar`) plus import-order issues that `biome check --write` fixes, plus one a11y rule on `label.tsx`.
3. **Empty root layout.** A Next.js `layout.tsx` must export a component, so the app cannot render.
4. **`globals.css` has a self-reference bug:** `--font-sans: var(--font-sans);` points to itself, and no font is ever loaded. The palette is also a generic red/blue-grey theme that has nothing to do with the background image.
5. **Components use Base UI's `render` prop, not Radix's `asChild`.** A model that writes `<Button asChild>` will produce broken code. Guardrail G4 covers this.
6. **The background image could not be inspected.** `project.txt` is a text bundle, so binary images are corrupted inside it. From the JPEG header that survived: `website-background.png` is really a **JPEG (not PNG) of about 622×286 px, 16 KB.** That is small and wide, so it will be stretched on large screens. The design therefore treats it as an atmospheric texture under a tinted overlay. The colours are measured by `scripts/analyze-background.mjs` in Step 1 (hue + dark/light), so no model has to see the image.
7. No `src/lib`, `src/config`, `src/data`, `src/types` folders exist yet.

### 1.3 `hemacue-frontend` conventions reused (so the repo feels like yours)

From `Hemacue-frontend-Readme.md`: `src/components/{layout/public, modules/<feature>, shared, ui}`, `src/hooks`, `src/lib`, `src/types/*.type.ts`, `src/app/(public)` route group, route-level `loading.tsx`/`not-found.tsx`/`global-error.tsx`, Biome for lint/format. The same stack facts (Next, TanStack Query, React Hook Form, Zod, bKash, Cloudinary, PostgreSQL, Prisma, Redis…) feed `src/data/projects.ts` and `src/data/skills.ts`.

### 1.4 Requirement → where it is built

| Requirement                                                                                    | Built in                                                                                                                     |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Simple, elegant, recruiter-friendly, 3 to 4 scrolls                                            | Compact sections (`py-16 md:py-20`), hero = one screen, 3-column project grid, skills + education in one grid (Steps 3 to 5) |
| Fully responsive                                                                               | Mobile-first Tailwind; `md` = tablet nav, `lg` = 3 columns; `Sheet` menu on phones                                           |
| Polished colour scheme matching the background                                                 | One number `--brand-hue` drives every colour (Step 1)                                                                        |
| Strict section order                                                                           | `src/config/sections.ts` + `page.tsx` (Steps 1 and 3)                                                                        |
| Single page, navbar navigation                                                                 | `<a href="#id">` + smooth scroll + scroll-spy (Steps 2 and 3)                                                                |
| Whole page uses `website-background.png`                                                       | `body::before` in `globals.css` (Step 1)                                                                                     |
| Sticky transparent navbar, visible buttons, SVG "Forhad" logo left, links middle, Resume right | `Header`, `HeaderNav`, `ForhadLogo`, `ResumeButton` (Step 3)                                                                 |
| One-click resume download (navbar + hero)                                                      | `getDriveDownloadUrl` + `ResumeButton` (Steps 1 and 3)                                                                       |
| Designation, photo, email, phone, social links                                                 | `HomeSection` (Step 4)                                                                                                       |
| About (journey, work I enjoy, hobbies, personality), concise                                   | `AboutSection` + `src/data/about.ts` (Steps 2 and 4)                                                                         |
| 3 projects in priority order, card + Details modal, server button hidden for front-end-only    | `PROJECTS`, `ProjectCard`, `ProjectDetailsDialog` (Steps 2 and 4)                                                            |
| Skills (incl. Firebase, Mongoose), categories, education                                       | `SkillsSection` + data files (Steps 2 and 5)                                                                                 |
| Contact info, socials, message form to email, footer                                           | `ContactSection`, `ContactForm`, `Footer` (Steps 3 and 5)                                                                    |
| Easy to add/modify/delete content                                                              | All content lives in `src/data/*` and `src/config/*` (section 3.2)                                                           |

---

## 2. Guardrails (every model must obey, in every step)

**G1. DRY (Don't Repeat Yourself).**

- Content (text, links, lists) exists **once**, in `src/data/*` or `src/config/*`. Components only _render_ it with `.map()`.
- Before writing a new component, function, constant or class string, search the repo. If something similar exists, **reuse or extend it**. Never copy-paste a block.
- A button that looks like a link is always `LinkButton`. A section always uses `Section` + `SectionHeading`. Social icons always come from `SocialLinks`. Email/phone always from `ContactList`.
- Enforced by `pnpm dup` (jscpd fails on any copied block of 6+ lines outside `ui/`).

**G2. TypeScript.**

- **No `any`.** **No `unknown`, except** the error in a catch clause: `catch (error: unknown)`.
- Derive types from data instead of retyping them: `as const`, `satisfies`, `typeof`, `keyof`, `Record<...>`.
- No non-null `!`, no `// @ts-ignore`.
- Enforced by Biome (`noExplicitAny`) and `pnpm guard`.

**G3. Colours and styling (theme-only).**

- Use semantic tokens only: `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-primary`, `text-primary-foreground`, `bg-primary/15`, `from-primary/40 to-brand-2/40`, plus the utilities `glass` and `gradient-text`.
- **Forbidden:** hex/rgb colours, palette classes like `bg-blue-500`, `text-white`. (One exception: the green `bg-emerald-500` "available" dot.)
- Never put `bg-*` on `body`, `main` or a full-page wrapper (it would hide the background image).
- Mobile-first: write the base class first, then `sm:`, `md:`, `lg:`.
- Enforced by `pnpm guard`.

**G4. shadcn/ui on Base UI.**

- Never run `shadcn init`, never re-add or overwrite files in `src/components/ui`. This plan needs **no new shadcn component.**
- To render a different element inside a Base UI part, use the **`render` prop**: `<DialogTrigger render={<Button />}>`. Never `asChild`.
- Before using any `ui` component, open its file and use only the props it really exports.
- Button-styled links: use `LinkButton` (it wraps `buttonVariants`).

**G5. Next.js.**

- Components are **Server Components by default.** Add `"use client"` only for state, effects, event handlers or browser APIs. Allowed in this project: `Header`, `MobileNav`, `NavLink`, `ProjectDetailsDialog`, `ContactForm`, `use-scroll-spy`.
- Images: `next/image` with `fill` + `sizes`. The hero photo has `priority`; nothing else does.
- No `localStorage`/`sessionStorage`. No new npm packages beyond those named in Step 1.

**G6. Accessibility.** One `<h1>` (hero). Icon-only buttons have `aria-label`. Every image has meaningful `alt`. Visible focus rings come from the `ui` components; do not remove them. Respect reduced motion (`motion-safe:` on animations).

**G7. Scope discipline.** Touch only the files a step lists. Do not rename files or exports. Do not "fix" things outside the step. Content wording may only be changed by the human owner.

---

## 3. Target architecture

### 3.1 Final file tree (new or changed files are marked)

```text
scripts/
  analyze-background.mjs        NEW (step 1)  measures the background image
  check-guardrails.mjs          NEW (step 1)  enforces G2/G3/G5
src/
  app/
    globals.css                 CHANGED (1)   theme from one hue + background image
    layout.tsx                  FILLED  (1)   <html>, fonts, metadata, <Toaster/>
    loading.tsx / not-found.tsx / global-error.tsx   FILLED (1)
    (public)/layout.tsx         FILLED  (1, 3) Header + <main> + Footer
    (public)/page.tsx           CHANGED (1, 3) the 5 sections, in order
  config/
    sections.ts                 NEW (1)  section order + nav labels
    site.ts                     NEW (1)  name, contact, socials, resume
    palette.generated.ts        NEW (1)  AUTO-GENERATED hue + dark/light
  data/                         NEW (2)  about, projects, skills, education, contact-form
  hooks/use-scroll-spy.ts       NEW (2)  (+ added to hooks/index.ts)
  lib/                          NEW (1, 2) fonts, theme, url, icons, scroll, validation, contact
  types/                        NEW (1, 2) portfolio.type.ts, contact.type.ts
  components/
    shared/                     NEW (3)  Section, SectionHeading, LinkButton, ResumeButton,
                                          SocialLinks, ContactList, ForhadLogo, NavLink
    layout/public/              FILLED (3) Header, HeaderNav, MobileNav, Footer
    modules/                    NEW (3 stubs, 4, 5) home, about, projects, skills, contact
    ui/                         UNTOUCHED (3 unused files deleted in step 1)
```

### 3.2 "Where do I edit X?" (this is the scalability promise)

| I want to…                                          | Edit only this                                                                                                                | Code changes needed        |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| Change name, email, phone, resume link, social URLs | `src/config/site.ts`                                                                                                          | none                       |
| Add / remove / reorder a project                    | `src/data/projects.ts`                                                                                                        | none                       |
| Hide the server-repo button                         | delete `repos.server` of that project                                                                                         | none                       |
| Add a skill / category                              | `src/data/skills.ts` (import the icon from `react-icons/si`)                                                                  | none                       |
| Edit About text, quick facts, hobbies               | `src/data/about.ts`                                                                                                           | none                       |
| Edit education                                      | `src/data/education.ts`                                                                                                       | none                       |
| Add a contact-form field                            | `src/data/contact-form.ts` + `ContactFieldName` in `src/types/contact.type.ts` + a rule in `RULES` in `src/lib/validation.ts` | none in the form component |
| Rename a nav label / change section order           | `src/config/sections.ts` (and reorder in `page.tsx`)                                                                          | none                       |
| Re-theme everything (new background image)          | replace the image, run `pnpm palette`                                                                                         | none                       |

---

## 4. The five steps

### Step 1: Foundation, theme from the background image, and quality gates

**What this step is.** Prepare the repo so it builds and lints cleanly, build the colour theme from the background image, add the root layout, and add the automatic rule-checkers.

**Why it comes first.** Everything else depends on a repo that compiles, a theme that exists, and a working `pnpm verify` gate. Fixing the broken base once, here, means no later step has to deal with it.

**Key terms (simple example each)**

- **shadcn/ui preset**: a saved bundle of design choices (style, base colour, radius, fonts, icon set). Ours is: Base UI primitives, `new-york` style, `lucide` icons, radius `0.75rem`, and brand colours computed from one hue. Because the project is already initialised, we _express_ the preset in `globals.css` instead of re-running the CLI (re-running would overwrite your components).
- **Base UI vs Radix**: two libraries that supply unstyled, accessible behaviour (dialogs, menus). Your `ui` files use Base UI. Difference you will notice: `render={<Button />}` (Base UI) instead of `asChild` (Radix).
- **Design token / CSS variable**: a named value reused everywhere. `--primary: oklch(0.74 0.16 270)` then `bg-primary` means "use that value".
- **OKLCH**: a colour format `oklch(lightness chroma hue)`. Keeping lightness and chroma fixed and changing only _hue_ gives a matching colour at any angle. Hue wheel: 0 red, 30 orange, 90 yellow, 145 green, 195 cyan, 250 blue, 290 violet, 330 pink.
- **`--brand-hue`**: the ONE number that drives the whole palette. `oklch(0.74 0.16 var(--brand-hue))`: change the number, every colour follows.
- **Tailwind v4 `@theme inline`**: tells Tailwind "the class `bg-primary` means `var(--primary)`", directly in CSS (no `tailwind.config`).
- **`@utility glass`**: defines your own Tailwind class. `glass` = translucent card colour + blur, so cards stay readable over the image.
- **Overlay**: a semi-transparent tint of `--background` painted over the image so text always has contrast, whatever the image looks like.
- **Root layout**: `src/app/layout.tsx` wraps every page; it must contain `<html>` and `<body>`.
- **Route group `(public)`**: the parentheses folder groups routes and shares a layout without adding `/public` to the URL.
- **Metadata API**: exporting `metadata` makes Next.js write the `<title>`/description tags.
- **Biome `organizeImports`**: auto-sorts imports; `biome check --write` applies it.

**Preconditions.** `public/website-background.png` and the other images exist. Google Drive resume file is shared as _"Anyone with the link"_.

**1.1 Install and clean up** (PowerShell on Windows; on macOS/Linux use `rm` instead of `Remove-Item`)

```bash
pnpm add geist
pnpm add -D sharp jscpd
Remove-Item src/components/ui/input-otp.tsx, src/components/ui/pagination.tsx, src/components/ui/sidebar.tsx
```

`geist` = the Geist font package (works offline at build, no Google Fonts request). `sharp` = image reader used only by the palette script. `jscpd` = copy-paste detector. The three deleted files are unused by this portfolio and are the cause of the current build/lint failures (`input-otp` is not even installed).

**1.2 `biome.json`: add this key at the end of the top-level object** (keep everything else; add a comma after the previous key)

```json
  "overrides": [
    {
      "includes": ["src/components/ui/**"],
      "linter": { "rules": { "a11y": { "noLabelWithoutControl": "off" } } }
    }
  ]
```

It switches off one a11y rule only for vendor shadcn files (`label.tsx` is shadcn's code and is not ours to rewrite).

**1.3 `package.json`: replace the `"scripts"` block with this** (do not change anything else)

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "biome check",
  "format:check": "npx @biomejs/biome format ./src",
  "format:fix": "npx @biomejs/biome format --write ./src",
  "lint:check": "npx @biomejs/biome lint ./src",
  "lint:fix": "npx @biomejs/biome lint --write ./src",
  "palette": "node scripts/analyze-background.mjs",
  "typecheck": "tsc --noEmit",
  "guard": "node scripts/check-guardrails.mjs",
  "dup": "jscpd src --ignore \"src/components/ui/**,**/*.css\" --min-lines 6 --min-tokens 60 --threshold 0 --reporters console",
  "verify": "biome check --write && pnpm typecheck && pnpm guard && pnpm dup && pnpm build"
}
```

`pnpm verify` is the single gate used after every step: autofix + lint, type-check, guardrails, duplicate check, production build.

**1.4 Create / overwrite these files exactly**

**`scripts/analyze-background.mjs`**

```js
// One-time helper. Measures public/website-background.png and writes
// src/config/palette.generated.ts (brand hue + dark/light mode).
// Run: pnpm palette
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const INPUT = "public/website-background.png";
const OUTPUT = "src/config/palette.generated.ts";
const SAMPLE_SIZE = 48;
const MIN_CHROMA = 0.04; // ignore near-grey pixels when looking for the hue
const FALLBACK_HUE = 250;
const DARK_BELOW_LIGHTNESS = 0.6;

const toLinear = (channel) => {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

// sRGB (0-255) -> OKLCH { l: 0-1, c: chroma, h: 0-360 }
function toOklch(red, green, blue) {
  const r = toLinear(red);
  const g = toLinear(green);
  const b = toLinear(blue);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const lightness = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bAxis = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const hue = ((Math.atan2(bAxis, a) * 180) / Math.PI + 360) % 360;
  return { l: lightness, c: Math.hypot(a, bAxis), h: hue };
}

const { data } = await sharp(INPUT)
  .resize(SAMPLE_SIZE, SAMPLE_SIZE, { fit: "cover" })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

let lightnessSum = 0;
let hueX = 0;
let hueY = 0;
const pixelCount = data.length / 3;

for (let i = 0; i < data.length; i += 3) {
  const { l, c, h } = toOklch(data[i], data[i + 1], data[i + 2]);
  lightnessSum += l;
  if (c >= MIN_CHROMA) {
    // Colourful pixels count more; average angles as vectors so 350° and 10° meet at 0°.
    hueX += Math.cos((h * Math.PI) / 180) * c;
    hueY += Math.sin((h * Math.PI) / 180) * c;
  }
}

const meanLightness = lightnessSum / pixelCount;
const hue =
  Math.hypot(hueX, hueY) > 0
    ? Math.round(((Math.atan2(hueY, hueX) * 180) / Math.PI + 360) % 360)
    : FALLBACK_HUE;
const mode = meanLightness < DARK_BELOW_LIGHTNESS ? "dark" : "light";

const file = `import type { BackgroundPalette } from "@/types/portfolio.type";

// AUTO-GENERATED by scripts/analyze-background.mjs (pnpm palette). Do not edit by hand.
export const BACKGROUND_PALETTE: BackgroundPalette = {
  hue: ${hue},
  mode: "${mode}",
  meanLightness: ${meanLightness.toFixed(3)},
};
`;

await writeFile(OUTPUT, file);
console.log(
  JSON.stringify({
    hue,
    mode,
    meanLightness: Number(meanLightness.toFixed(3)),
  }),
);
```

**`scripts/check-guardrails.mjs`**

```js
// Fails the build when a project rule is broken. Run: pnpm guard (also part of pnpm verify)
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = "src";
const SKIP_DIRS = ["src/components/ui"]; // vendor (shadcn) files are not checked
const EXTENSIONS = [".ts", ".tsx"];

const RULES = [
  {
    name: "No `any` type",
    test: (line) => /(:\s*any\b|<any>|\bas any\b|any\[\])/.test(line),
  },
  {
    name: "`unknown` is only allowed in catch clauses",
    test: (line) =>
      /\bunknown\b/.test(line) &&
      !/catch\s*\(\s*\w+\s*:\s*unknown\s*\)/.test(line),
  },
  {
    name: "No hard-coded hex/rgb colours (use theme tokens)",
    test: (line) =>
      /#[0-9a-fA-F]{3,8}\b(?![\w-])/.test(line) &&
      !/(href|url|src)=/.test(line) &&
      !line.includes("&#"),
  },
  {
    name: "No Tailwind palette colours like bg-blue-500 (use bg-primary, text-muted-foreground, ...)",
    test: (line) =>
      /\b(?:bg|text|border|ring|from|to|via|fill|stroke)-(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone|white|black)(?:-\d{2,3})?\b/.test(
        line,
      ) && !line.includes("bg-emerald-500"), // the single allowed "available" status dot
  },
  {
    name: "No browser storage (static site, nothing to persist)",
    test: (line) => /\b(localStorage|sessionStorage)\b/.test(line),
  },
];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name).replaceAll("\\", "/");
    if (SKIP_DIRS.includes(path)) continue;
    if (entry.isDirectory()) yield* walk(path);
    else if (EXTENSIONS.some((ext) => path.endsWith(ext))) yield path;
  }
}

const problems = [];
for await (const file of walk(ROOT)) {
  const lines = (await readFile(file, "utf8")).split("\n");
  lines.forEach((line, index) => {
    if (line.trim().startsWith("//") || line.trim().startsWith("*")) return;
    for (const rule of RULES) {
      if (rule.test(line))
        problems.push(`${file}:${index + 1}  ${rule.name}\n    ${line.trim()}`);
    }
  });
}

if (problems.length > 0) {
  console.error(
    `\nGuardrail violations (${problems.length}):\n\n${problems.join("\n\n")}\n`,
  );
  process.exit(1);
}
console.log("Guardrails OK");
```

**`src/types/portfolio.type.ts`**

```ts
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

/** Result of scripts/analyze-background.mjs (see src/config/palette.generated.ts). */
export type BackgroundPalette = {
  hue: number;
  mode: "dark" | "light";
  meanLightness: number;
};

export type SocialPlatform = "github" | "linkedin" | "twitter" | "facebook";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  url: string;
};

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: { src: string; alt: string };
  techStack: readonly string[];
  liveUrl: string;
  repos: { client: string; server?: string };
  challenges: readonly string[];
  improvements: readonly string[];
};

export type Skill = { name: string; icon: IconType };

export type SkillCategory = {
  id: string;
  title: string;
  icon: LucideIcon;
  skills: readonly Skill[];
};

export type AboutFact = { label: string; value: string; icon: LucideIcon };

export type AboutInterest = { label: string; icon: LucideIcon };

export type EducationEntry = {
  degree: string;
  group: string;
  institution: string;
  result: string;
};
```

**`src/config/palette.generated.ts`**

```ts
import type { BackgroundPalette } from "@/types/portfolio.type";

// Default values. `pnpm palette` overwrites this file with values measured from
// public/website-background.png (hue = brand colour angle 0-360, mode = dark | light).
export const BACKGROUND_PALETTE: BackgroundPalette = {
  hue: 250,
  mode: "dark",
  meanLightness: 0.2,
};
```

**`src/config/sections.ts`**

```ts
/**
 * Single source of truth for section ORDER, ids and navbar labels.
 * The order here is the order of the navbar AND of src/app/(public)/page.tsx.
 */
export const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
```

**`src/lib/url.ts`**

```ts
const DRIVE_FILE_ID = /\/file\/d\/([\w-]+)/;

/** Turns a Google Drive "view" link into a direct-download link (so one click downloads the file). */
export function getDriveDownloadUrl(viewUrl: string): string {
  const fileId = DRIVE_FILE_ID.exec(viewUrl)?.[1];
  return fileId
    ? `https://drive.google.com/uc?export=download&id=${fileId}`
    : viewUrl;
}

export function isExternalUrl(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export const toMailtoHref = (email: string): string => `mailto:${email}`;

export const toTelHref = (phone: string): string =>
  `tel:${phone.replace(/[^\d+]/g, "")}`;
```

**`src/config/site.ts`**

```ts
import { getDriveDownloadUrl } from "@/lib/url";
import type { SocialLink } from "@/types/portfolio.type";

const RESUME_VIEW_URL =
  "https://drive.google.com/file/d/1HjfeRQoODUXKBAnJHBHoZCms3Kwpa_7R/view?usp=sharing";

export const SITE = {
  name: "Forhad",
  designation: "Full Stack Web Developer",
  title: "Forhad | Full Stack Web Developer",
  description:
    "Portfolio of Forhad, a full stack web developer building production-style apps with Next.js, TypeScript, Node.js, PostgreSQL and MongoDB.",
  intro:
    "I design and build fast, type-safe web applications end to end, from polished interfaces to payment-ready APIs.",
  email: "forhaduddin823@gmail.com",
  phone: "+8801833568856",
  phoneDisplay: "+880 1833 568856",
  resumeViewUrl: RESUME_VIEW_URL,
  resumeDownloadUrl: getDriveDownloadUrl(RESUME_VIEW_URL),
  socials: [
    {
      platform: "github",
      label: "GitHub",
      url: "https://github.com/forhad823",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/md-forhad-uddin-b65496231",
    },
    {
      platform: "twitter",
      label: "Twitter (X)",
      url: "https://x.com/forhaduddin823",
    },
    {
      platform: "facebook",
      label: "Facebook",
      url: "https://web.facebook.com/mdforhad.forhad.7186896",
    },
  ] as const satisfies readonly SocialLink[],
} as const;
```

**`src/lib/fonts.ts`**

```ts
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

/** Class names that define --font-geist-sans and --font-geist-mono on <html>. */
export const FONT_CLASS_NAME = `${GeistSans.variable} ${GeistMono.variable}`;
```

**`src/lib/theme.ts`**

```ts
import { cn } from "cn";
import type { CSSProperties } from "react";

import { BACKGROUND_PALETTE } from "@/config/palette.generated";

type BrandStyle = CSSProperties & { "--brand-hue": number };

/** Single source for the <html> theme attributes (used by layout.tsx and global-error.tsx). */
export function getThemeAttributes(fontClassName: string): {
  className: string;
  style: BrandStyle;
} {
  return {
    className: cn(fontClassName, BACKGROUND_PALETTE.mode === "dark" && "dark"),
    style: { "--brand-hue": BACKGROUND_PALETTE.hue },
  };
}
```

**`src/app/globals.css`**

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

/*
 * THEME SOURCE OF TRUTH
 * Every colour below is built from ONE number: --brand-hue (0-360).
 * layout.tsx sets --brand-hue on <html> from src/config/palette.generated.ts,
 * which `pnpm palette` measures from public/website-background.png.
 * To re-theme the whole site, re-run `pnpm palette` (or edit that one number).
 */
@theme inline {
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
  --font-heading: var(--font-sans);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-brand-2: var(--brand-2);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

/* LIGHT preset: used when the background image is bright (mode = "light"). */
:root {
  --brand-hue: 250; /* overridden inline on <html> */
  --radius: 0.75rem;
  --background: oklch(0.985 0.008 var(--brand-hue));
  --foreground: oklch(0.2 0.03 var(--brand-hue));
  --card: oklch(1 0 0 / 0.7);
  --card-foreground: oklch(0.2 0.03 var(--brand-hue));
  --popover: oklch(0.99 0.006 var(--brand-hue));
  --popover-foreground: oklch(0.2 0.03 var(--brand-hue));
  --primary: oklch(0.52 0.2 var(--brand-hue));
  --primary-foreground: oklch(0.985 0.01 var(--brand-hue));
  --secondary: oklch(0.94 0.02 var(--brand-hue));
  --secondary-foreground: oklch(0.25 0.04 var(--brand-hue));
  --muted: oklch(0.95 0.015 var(--brand-hue));
  --muted-foreground: oklch(0.42 0.03 var(--brand-hue));
  --accent: oklch(0.92 0.04 var(--brand-hue));
  --accent-foreground: oklch(0.3 0.08 var(--brand-hue));
  --brand-2: oklch(0.58 0.18 calc(var(--brand-hue) + 55));
  --destructive: oklch(0.58 0.22 27);
  --border: oklch(0.88 0.02 var(--brand-hue) / 0.8);
  --input: oklch(0.88 0.02 var(--brand-hue));
  --ring: oklch(0.52 0.2 var(--brand-hue));
  --overlay-from: 0.72;
  --overlay-to: 0.9;
  color-scheme: light;
}

/* DARK preset: used when the background image is dark (mode = "dark"). Must stay AFTER :root. */
.dark {
  --background: oklch(0.16 0.03 var(--brand-hue));
  --foreground: oklch(0.97 0.01 var(--brand-hue));
  --card: oklch(0.22 0.035 var(--brand-hue) / 0.6);
  --card-foreground: oklch(0.97 0.01 var(--brand-hue));
  --popover: oklch(0.2 0.035 var(--brand-hue));
  --popover-foreground: oklch(0.97 0.01 var(--brand-hue));
  --primary: oklch(0.74 0.16 var(--brand-hue));
  --primary-foreground: oklch(0.16 0.03 var(--brand-hue));
  --secondary: oklch(0.27 0.04 var(--brand-hue));
  --secondary-foreground: oklch(0.96 0.01 var(--brand-hue));
  --muted: oklch(0.25 0.035 var(--brand-hue));
  --muted-foreground: oklch(0.74 0.03 var(--brand-hue));
  --accent: oklch(0.3 0.05 var(--brand-hue));
  --accent-foreground: oklch(0.95 0.03 var(--brand-hue));
  --brand-2: oklch(0.78 0.14 calc(var(--brand-hue) + 55));
  --destructive: oklch(0.68 0.2 25);
  --border: oklch(0.97 0.01 var(--brand-hue) / 0.14);
  --input: oklch(0.97 0.01 var(--brand-hue) / 0.18);
  --ring: oklch(0.74 0.16 var(--brand-hue));
  --overlay-from: 0.78;
  --overlay-to: 0.92;
  color-scheme: dark;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  html {
    @apply font-sans;
    background-color: var(--background);
    scroll-behavior: smooth;
  }
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }
  /* Never put bg-* on body or page wrappers: it would hide the background image below. */
  body {
    @apply text-foreground antialiased;
  }
  /* Site-wide background image + tinted overlay (keeps text readable on any screen). */
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(
        to bottom,
        color-mix(
          in oklab,
          var(--background) calc(var(--overlay-from) * 100%),
          transparent
        ),
        color-mix(
          in oklab,
          var(--background) calc(var(--overlay-to) * 100%),
          transparent
        )
      ),
      url("/website-background.png") center / cover no-repeat;
  }
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}

@utility glass {
  background-color: var(--card);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
}

@utility gradient-text {
  background-image: linear-gradient(90deg, var(--primary), var(--brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@utility text-balance {
  text-wrap: balance;
}
```

**`src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";

import "./globals.css";

import { Toaster } from "@/components/ui/toast";
import { SITE } from "@/config/site";
import { FONT_CLASS_NAME } from "@/lib/fonts";
import { getThemeAttributes } from "@/lib/theme";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...getThemeAttributes(FONT_CLASS_NAME)}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

**`src/app/loading.tsx`**

```tsx
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Spinner className="size-8 text-primary" />
    </div>
  );
}
```

**`src/app/not-found.tsx`**

```tsx
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm font-medium tracking-widest text-primary uppercase">
        404
      </p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="max-w-md text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className={buttonVariants({ size: "lg" })}>
        Back to home
      </Link>
    </main>
  );
}
```

**`src/app/global-error.tsx`**

```tsx
"use client";

import "./globals.css";

import { FONT_CLASS_NAME } from "@/lib/fonts";
import { getThemeAttributes } from "@/lib/theme";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" {...getThemeAttributes(FONT_CLASS_NAME)}>
      <body className="flex min-h-svh flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Something went wrong
        </h1>
        <p className="max-w-md text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="h-10 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
```

**`src/app/(public)/layout.tsx`** (temporary version, replaced in Step 3)

```tsx
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main id="main-content">{children}</main>;
}
```

**`src/app/(public)/page.tsx`** (temporary version, replaced in Step 3)

```tsx
export default function HomePage() {
  return (
    <section className="flex min-h-svh items-center justify-center">
      <p className="text-muted-foreground">Portfolio is being built.</p>
    </section>
  );
}
```

**`.env.example`** (commit this) and copy it to **`.env.local`** (never commit) with real values

```bash
# Free key from https://web3forms.com (enter forhaduddin823@gmail.com). Public by design.
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=
# Production URL (used for metadata). Example: https://forhad.vercel.app
NEXT_PUBLIC_SITE_URL=
```

**1.5 Generate the palette from the image, then run the gate**

```bash
pnpm palette
pnpm verify
```

`pnpm palette` prints something like `{"hue":270,"mode":"dark","meanLightness":0.21}` and rewrites `src/config/palette.generated.ts`.

- `hue` = dominant colour angle of the image, `mode` = `dark` if the image is darker than lightness 0.6 else `light`.
- The layout adds the `dark` class to `<html>` automatically for `dark`; the matching colour set in `globals.css` (`:root` for light, `.dark` for dark) is used. **No model needs to edit `globals.css` colours.**
- **If `pnpm palette` fails** (for example `sharp` could not load): keep the default file (hue 250, dark) and continue; the site still works. Optionally let an image-capable model look at the image and set `hue`/`mode` by hand in `palette.generated.ts` using the hue wheel above.
- Re-run `pnpm palette` whenever the background image changes.

**Done when:** `pnpm verify` passes; `pnpm dev` shows the text "Portfolio is being built." on the background image with a tinted overlay, no console errors.

**Do NOT:** run `shadcn init/add`, edit other `ui` files, hard-code colours, create `tailwind.config.*`.

---

### Step 2: Data layer, helpers and hooks (no visual UI)

**What this step is.** Create all the _content_ (about, projects, skills, education), the _helpers_ (validation, contact submission, icons, scrolling) and the one _hook_ that tells the navbar which section is on screen.

**Why now.** UI components in Steps 3 to 5 only _render_ this data. Building data and logic first, with no UI, means nothing visual can break, and later models never need to invent text or logic. It is also what makes the site easy to edit later (section 3.2).

**Key terms (simple example each)**

- **Data-driven UI**: the component loops over a list. `PROJECTS.map(p => <ProjectCard project={p} />)`; adding a project = adding one object.
- **`type`**: a description of shape. `type Skill = { name: string }`.
- **`as const`**: freezes literal values so TypeScript knows exact strings. `const A = ["x","y"] as const` gives type `"x" | "y"`.
- **`satisfies`**: checks a value against a type without widening it. `const s = {...} satisfies Foo`.
- **`Record<K, V>`**: an object with keys `K` and values `V`. `Record<"a"|"b", number>` = `{a:number; b:number}`.
- **`Partial<T>`**: all fields optional (used for form errors: only fields with a problem appear).
- **`readonly`**: the array cannot be changed after creation.
- **Discriminated union**: `{ ok: true } | { ok: false; message: string }`. Checking `ok` tells TypeScript which fields exist.
- **`catch (error: unknown)`**: the only place `unknown` is allowed, because thrown values can be anything.
- **Barrel file**: `hooks/index.ts` re-exports hooks so you can write `import { useScrollSpy } from "@/hooks"`.
- **Web3Forms**: a free service that receives a form POST and emails it to you. Works on a fully static site (no server of your own).
- **Google Drive direct download**: a "view" link opens a preview; changing it to `https://drive.google.com/uc?export=download&id=<ID>` downloads the file in one click (`getDriveDownloadUrl` in Step 1).
- **`window.history.replaceState`**: updates the URL hash (`#about`) without adding browser-history entries.
- **Scroll-spy**: on scroll, find which section's top has passed a line near the top of the screen and mark it active in the navbar.

**Create these files exactly**

**`src/types/contact.type.ts`**

```ts
export type ContactFieldName = "name" | "email" | "message";

export type ContactFieldConfig = {
  name: ContactFieldName;
  label: string;
  type: "text" | "email" | "textarea";
  placeholder: string;
  autoComplete?: string;
};

export type ContactValues = Record<ContactFieldName, string>;

export type ContactErrors = Partial<Record<ContactFieldName, string>>;

export type SubmitResult = { ok: true } | { ok: false; message: string };
```

**`src/data/contact-form.ts`**

```ts
import type { ContactFieldConfig } from "@/types/contact.type";

/** The contact form renders itself from this list. Add a field here (and in ContactFieldName + RULES). */
export const CONTACT_FIELDS: readonly ContactFieldConfig[] = [
  {
    name: "name",
    label: "Your name",
    type: "text",
    placeholder: "Jane Doe",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Your email",
    type: "email",
    placeholder: "jane@company.com",
    autoComplete: "email",
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Tell me about the role or project...",
  },
];
```

**`src/lib/validation.ts`**

```ts
import { CONTACT_FIELDS } from "@/data/contact-form";
import type {
  ContactErrors,
  ContactFieldName,
  ContactValues,
} from "@/types/contact.type";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const RULES: Record<ContactFieldName, (value: string) => string | undefined> = {
  name: (value) =>
    value.trim().length < 2 ? "Please enter your name." : undefined,
  email: (value) =>
    EMAIL_PATTERN.test(value.trim())
      ? undefined
      : "Please enter a valid email address.",
  message: (value) =>
    value.trim().length < 10
      ? "Message should be at least 10 characters."
      : undefined,
};

export function readContactValues(formData: FormData): ContactValues {
  const values: ContactValues = { name: "", email: "", message: "" };
  for (const { name } of CONTACT_FIELDS) {
    values[name] = String(formData.get(name) ?? "");
  }
  return values;
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  for (const { name } of CONTACT_FIELDS) {
    const message = RULES[name](values[name]);
    if (message) errors[name] = message;
  }
  return errors;
}
```

**`src/lib/contact.ts`**

```ts
import type { ContactValues, SubmitResult } from "@/types/contact.type";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type Web3FormsResponse = { success: boolean; message: string };

/**
 * Sends the message to forhaduddin823@gmail.com through Web3Forms (works on a fully static site).
 * Needs NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local (see .env.example).
 */
export async function sendContactMessage(
  values: ContactValues,
): Promise<SubmitResult> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return {
      ok: false,
      message:
        "The contact form is not configured yet. Please email me directly.",
    };
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Portfolio message from ${values.name}`,
        from_name: "Portfolio contact form",
        ...values,
      }),
    });
    const result: Web3FormsResponse = await response.json();
    return result.success
      ? { ok: true }
      : { ok: false, message: result.message };
  } catch (error: unknown) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Network error.",
    };
  }
}
```

**`src/lib/icons.ts`**

```ts
import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import type { SocialPlatform } from "@/types/portfolio.type";

export const SOCIAL_ICONS = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  twitter: FaXTwitter,
  facebook: FaFacebookF,
} satisfies Record<SocialPlatform, IconType>;
```

**`src/lib/scroll.ts`**

```ts
import type { SectionId } from "@/config/sections";

/** Smoothly scrolls to a section and updates the URL hash. `delayMs` lets a closing mobile menu release scroll-lock first. */
export function scrollToSection(id: SectionId, delayMs = 0): void {
  window.setTimeout(() => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  }, delayMs);
}
```

**`src/hooks/use-scroll-spy.ts`**

```ts
"use client";

import { useEffect, useState } from "react";

import { SECTIONS, type SectionId } from "@/config/sections";

const SCROLLED_AFTER_PX = 24;
const ACTIVE_LINE_RATIO = 0.35;
const BOTTOM_TOLERANCE_PX = 8;

type ScrollSpyState = { activeId: SectionId; isScrolled: boolean };

function getActiveSectionId(): SectionId {
  const reachedBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - BOTTOM_TOLERANCE_PX;
  if (reachedBottom) return SECTIONS[SECTIONS.length - 1].id;

  let current: SectionId = SECTIONS[0].id;
  for (const { id } of SECTIONS) {
    const top = document.getElementById(id)?.getBoundingClientRect().top;
    if (top !== undefined && top <= window.innerHeight * ACTIVE_LINE_RATIO) {
      current = id;
    }
  }
  return current;
}

/** Tells the navbar which section is on screen and whether the page has scrolled. */
export function useScrollSpy(): ScrollSpyState {
  const [state, setState] = useState<ScrollSpyState>({
    activeId: SECTIONS[0].id,
    isScrolled: false,
  });

  useEffect(() => {
    const update = () => {
      const next = {
        activeId: getActiveSectionId(),
        isScrolled: window.scrollY > SCROLLED_AFTER_PX,
      };
      setState((previous) =>
        previous.activeId === next.activeId &&
        previous.isScrolled === next.isScrolled
          ? previous
          : next,
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return state;
}
```

**`src/hooks/index.ts`**

```ts
export * from "./use-mobile";
export * from "./use-scroll-spy";
```

**`src/data/about.ts`**

```ts
import {
  BriefcaseIcon,
  CalculatorIcon,
  CodeIcon,
  GraduationCapIcon,
  MapPinIcon,
  SolarPanelIcon,
  TrendingUpIcon,
} from "lucide-react";

import type { AboutFact, AboutInterest } from "@/types/portfolio.type";

export const ABOUT_PARAGRAPHS: readonly string[] = [
  "I started with the MERN stack and now build end-to-end products with Next.js, TypeScript, PostgreSQL and Prisma. A 6-month full-stack, AI-driven bootcamp sharpened my fundamentals, from typed APIs and payments to clean, maintainable interfaces.",
  "I enjoy turning messy real-world workflows into clear systems: role-based dashboards, request state machines and payment flows with bKash and Stripe. I care about type safety, readable code and software that simply works for its users.",
  "I learn step by step, one small isolated example at a time, then put the pieces together, and I like explaining my reasoning as much as writing the code.",
];

export const ABOUT_FACTS: readonly AboutFact[] = [
  { label: "Based in", value: "Bangladesh", icon: MapPinIcon },
  {
    label: "Focus",
    value: "Full stack web (MERN, Next.js, PostgreSQL)",
    icon: CodeIcon,
  },
  {
    label: "Education",
    value: "HSC Science, GPA 4.00 / 5.00",
    icon: GraduationCapIcon,
  },
  {
    label: "Looking for",
    value: "Remote-friendly software roles",
    icon: BriefcaseIcon,
  },
];

export const ABOUT_INTERESTS: readonly AboutInterest[] = [
  { label: "Electrical & solar tinkering", icon: SolarPanelIcon },
  { label: "Finance", icon: TrendingUpIcon },
  { label: "Math problem-solving", icon: CalculatorIcon },
];
```

**`src/data/education.ts`**

```ts
import type { EducationEntry } from "@/types/portfolio.type";

export const EDUCATION: readonly EducationEntry[] = [
  {
    degree: "Higher Secondary Certificate",
    group: "Science Group",
    institution: "National Model College",
    result: "GPA 4.00 out of 5.00",
  },
];
```

**`src/data/skills.ts`**

```ts
import {
  CodeIcon,
  DatabaseIcon,
  LayoutIcon,
  ServerIcon,
  WrenchIcon,
} from "lucide-react";
import {
  SiCloudinary,
  SiCss,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMongoose,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiReacthookform,
  SiReactquery,
  SiRedis,
  SiShadcnui,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiZod,
} from "react-icons/si";

import type { SkillCategory } from "@/types/portfolio.type";

/** Add a skill = add one line. Add a category = add one object. Order here = order on the page. */
export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    icon: CodeIcon,
    skills: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS", icon: SiCss },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: LayoutIcon,
    skills: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "shadcn/ui", icon: SiShadcnui },
      { name: "TanStack Query", icon: SiReactquery },
      { name: "React Hook Form", icon: SiReacthookform },
      { name: "Vite", icon: SiVite },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: ServerIcon,
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "JWT Auth", icon: SiJsonwebtokens },
      { name: "Zod", icon: SiZod },
    ],
  },
  {
    id: "databases",
    title: "Databases & ORM",
    icon: DatabaseIcon,
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Mongoose", icon: SiMongoose },
      { name: "Prisma", icon: SiPrisma },
      { name: "Redis", icon: SiRedis },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    id: "tools",
    title: "Tools & Services",
    icon: WrenchIcon,
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Stripe", icon: SiStripe },
      { name: "Cloudinary", icon: SiCloudinary },
      { name: "Vercel", icon: SiVercel },
      { name: "Netlify", icon: SiNetlify },
    ],
  },
];
```

**`src/data/projects.ts`**

```ts
import type { Project } from "@/types/portfolio.type";

/** Order here = order on the page. Omit `repos.server` for front-end-only projects (the button hides itself). */
export const PROJECTS: readonly Project[] = [
  {
    id: "hemacue",
    name: "Hemacue",
    tagline: "Blood donation and emergency service platform",
    description:
      "Hemacue connects patients who urgently need blood with eligible donors across Bangladesh. It checks ABO/Rh compatibility, enforces a 90-day donor cooldown, moves each request through a guarded status workflow, and supports bKash-powered add-ons with PDF invoices. Patients, donors and admins each get their own dashboard.",
    image: {
      src: "/hemacue-image.png",
      alt: "Hemacue blood donation platform preview",
    },
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "bKash",
      "Cloudinary",
    ],
    liveUrl: "https://hemacue-frontend.vercel.app",
    repos: {
      client: "https://github.com/forhad823/hemacue-frontend-a7b7",
      server: "https://github.com/forhad823/hemacue-backend-A6-B7",
    },
    challenges: [
      "Modelling a guarded request lifecycle (PENDING, VERIFIED, DONOR_ASSIGNED, IN_PROGRESS, COMPLETED) so invalid status jumps are impossible.",
      "Matching donors by ABO/Rh compatibility while excluding unverified, unavailable, blocked and cooling-down donors.",
      "Integrating bKash tokenized checkout (grant-token, create, execute, refund) with Redis token caching, PDF invoices and email receipts.",
      "Keeping cookie-based JWT sessions, silent token refresh and role-based route protection consistent across three dashboards.",
    ],
    improvements: [
      "Real-time donor alerts with WebSockets or server-sent events.",
      "SMS gateway integration for the premium notification add-on.",
      "Location-based nearest-donor search.",
      "Automated unit and end-to-end test coverage.",
    ],
  },
  {
    id: "rentnest",
    name: "RentNest",
    tagline: "Rental property marketplace",
    description:
      "RentNest is a multi-role rental marketplace for tenants, landlords and admins. Tenants search listings and request rentals, landlords manage properties and approve requests, and approved rentals are paid through Stripe Checkout. Admins moderate users, properties and requests.",
    image: {
      src: "/rentnest-image.png",
      alt: "RentNest rental marketplace preview",
    },
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Stripe",
    ],
    liveUrl: "https://my-rent-nest-frontend-a5-b7.vercel.app",
    repos: {
      client: "https://github.com/forhad823/MY-RentNest-Frontend-A5B7",
      server: "https://github.com/forhad823/My-RentNest-Backend-A4B7",
    },
    challenges: [
      "Stripe webhook signature failures: the raw request body had to be preserved by registering express.raw() before express.json().",
      "Protecting role-based routes with Next.js proxy middleware while silently refreshing expired JWT access tokens.",
      "Making HTTP-only cookies and CORS work between a Vercel frontend and a separately deployed API.",
      "Modelling payments so a rental request can have several attempts but only one completed payment.",
    ],
    improvements: [
      "Multi-image galleries and map-based property search.",
      "In-app chat between tenants and landlords.",
      "Email notifications for request and payment updates.",
      "Automated test coverage for the payment flow.",
    ],
  },
  {
    id: "lawbd",
    name: "LawBD",
    tagline: "Lawyer finding and appointment booking app",
    description:
      "LawBD is a fully responsive front-end app for finding lawyers and booking appointments. Visitors browse and filter lawyers, read detailed profiles, book appointments and read legal blog articles.",
    image: {
      src: "/lawbd-image.png",
      alt: "LawBD lawyer appointment booking app preview",
    },
    techStack: ["React", "React Router", "Tailwind CSS", "daisyUI", "Vite"],
    liveUrl: "https://cosmic-marshmallow-0260e0.netlify.app",
    repos: {
      client:
        "https://github.com/forhad823/Law.BD-lawyer-appointment-booking-app-",
    },
    challenges: [
      "Structuring reusable lawyer data and profile pages with React Router.",
      "Designing a booking flow that runs entirely on the client, with no backend.",
      "Keeping one layout clean and fully responsive from phones to desktops with Tailwind CSS and daisyUI.",
    ],
    improvements: [
      "Connect to a real backend with authentication and persistent bookings.",
      "Live availability calendar and reminders.",
      "Online payment and client reviews.",
    ],
  },
];
```

**Content notes for the human owner (the LLM must not change these):**

- Project descriptions, challenges and technologies come from your READMEs. **"Improvements and future plans" are suggestions** (the READMEs contain no roadmap). LawBD's challenges are inferred from its feature list. Review all of them.
- Hobbies (electrical/solar tinkering, finance, maths problem-solving) come from your earlier conversations. Edit freely in `src/data/about.ts`.

**Gate:** `pnpm verify`.
**Done when:** it passes. (The data is not shown anywhere yet, which is expected.)
**Do NOT:** add UI, add packages, add `any`/`unknown`, copy lists into components.

---

### Step 3: Shared components, navbar, footer and the page shell

**What this step is.** Build the small reusable pieces (button-link, resume button, social icons, contact list, section wrapper and heading, SVG logo, nav link), then the sticky navbar (logo left, links middle, Resume right, hamburger menu on phones), the footer, and the page that lists the five sections in the fixed order.

**Why now.** Every section in Steps 4 and 5 is made of these pieces. Creating them once is how DRY is achieved. The five section files are created as **placeholders** so `page.tsx` can already import all five and the site builds. Steps 4 and 5 simply overwrite those placeholder files; `page.tsx` never changes again.

**Key terms (simple example each)**

- **Server vs Client Component**: server components render on the server (fast, no JS shipped). A file with `"use client"` on line 1 can use `useState`, `onClick`, `window`.
- **Anchor / hash navigation**: `<a href="#about">` jumps to the element with `id="about"`. We add smooth scrolling in JS and CSS (`scroll-behavior: smooth`).
- **`scroll-mt-16`**: "scroll margin top". Stops a section hiding under the fixed 4rem (16 × 0.25rem) navbar.
- **`fixed` + `backdrop-blur`**: the navbar stays on top while scrolling; it is fully transparent at the top and becomes a frosted, translucent bar after 24px of scroll so the buttons are always readable.
- **`aria-current="location"`**: tells screen readers which nav link is active.
- **`Sheet`**: a side drawer (Base UI dialog). Used as the phone menu.
- **`render` prop**: Base UI's way to choose the HTML element/component to render: `<SheetTrigger render={<Button />}>`.
- **`cva` / `buttonVariants`**: class-variance-authority builds class strings from options. `buttonVariants({ variant: "outline" })` returns the classes of an outline button, so a plain `<a>` can look like a button.
- **`ComponentProps<"a">`**: "all props a normal `<a>` accepts", so our wrapper stays flexible without `any`.
- **`rel="noopener noreferrer"`**: security attribute for links that open a new tab; `LinkButton` adds it automatically for `https://` URLs.
- **Placeholder (stub)**: a minimal component that keeps imports valid until the real one replaces it.

**Create / overwrite these files exactly**

**`src/components/shared/link-button.tsx`**

```tsx
import type { VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type { ComponentProps } from "react";

import { buttonVariants } from "@/components/ui/button";
import { isExternalUrl } from "@/lib/url";

export type LinkButtonProps = ComponentProps<"a"> &
  VariantProps<typeof buttonVariants>;

/** The ONE way to render a button-looking link. External URLs automatically open in a new tab. */
export function LinkButton({
  href = "",
  variant,
  size,
  className,
  ...props
}: LinkButtonProps) {
  const externalProps = isExternalUrl(href)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : undefined;

  return (
    <a
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      {...externalProps}
      {...props}
    />
  );
}
```

**`src/components/shared/resume-button.tsx`**

```tsx
import { DownloadIcon } from "lucide-react";

import {
  LinkButton,
  type LinkButtonProps,
} from "@/components/shared/link-button";
import { SITE } from "@/config/site";

type ResumeButtonProps = Omit<LinkButtonProps, "href" | "children"> & {
  label?: string;
};

/** Downloads the resume with a single click (used in the navbar AND the hero). */
export function ResumeButton({
  label = "Resume",
  ...props
}: ResumeButtonProps) {
  return (
    <LinkButton href={SITE.resumeDownloadUrl} download {...props}>
      <DownloadIcon />
      {label}
    </LinkButton>
  );
}
```

**`src/components/shared/social-links.tsx`**

```tsx
import { cn } from "cn";

import { LinkButton } from "@/components/shared/link-button";
import { SITE } from "@/config/site";
import { SOCIAL_ICONS } from "@/lib/icons";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {SITE.socials.map(({ platform, label, url }) => {
        const Icon = SOCIAL_ICONS[platform];
        return (
          <li key={platform}>
            <LinkButton
              href={url}
              variant="outline"
              className="glass size-10 rounded-full hover:border-primary hover:text-primary"
              aria-label={label}
              title={label}
            >
              <Icon className="size-4" />
            </LinkButton>
          </li>
        );
      })}
    </ul>
  );
}
```

**`src/components/shared/contact-list.tsx`**

```tsx
import { cn } from "cn";
import { MailIcon, PhoneIcon } from "lucide-react";

import { SITE } from "@/config/site";
import { toMailtoHref, toTelHref } from "@/lib/url";

const CONTACT_ITEMS = [
  {
    key: "email",
    label: SITE.email,
    href: toMailtoHref(SITE.email),
    icon: MailIcon,
  },
  {
    key: "phone",
    label: SITE.phoneDisplay,
    href: toTelHref(SITE.phone),
    icon: PhoneIcon,
  },
] as const;

/** Clickable email + phone (used in the hero AND the contact section). */
export function ContactList({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {CONTACT_ITEMS.map(({ key, label, href, icon: Icon }) => (
        <li key={key}>
          <a
            href={href}
            className="group inline-flex items-center gap-3 text-sm font-medium text-foreground/90 transition-colors hover:text-primary sm:text-base"
          >
            <span className="glass flex size-9 items-center justify-center rounded-full border border-border text-primary">
              <Icon className="size-4" />
            </span>
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
```

**`src/components/shared/section.tsx`**

```tsx
import { cn } from "cn";
import type { ReactNode } from "react";

import type { SectionId } from "@/config/sections";

type SectionProps = {
  id: SectionId;
  className?: string;
  children: ReactNode;
};

/** Every page section uses this wrapper: anchor id, navbar offset, consistent spacing and width. */
export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-16 py-16 md:py-20", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}
```

**`src/components/shared/section-heading.tsx`**

```tsx
type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-2 text-sm font-semibold tracking-widest text-primary uppercase">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
```

**`src/components/shared/forhad-logo.tsx`**

```tsx
import { cn } from "cn";

/** Original SVG logo: rounded "F" monogram + "Forhad" wordmark. Colours come from theme tokens. */
export function ForhadLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 128 40"
      className={cn("h-9 w-auto", className)}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <title>Forhad</title>
      <rect x="1" y="4" width="32" height="32" rx="9" fill="var(--primary)" />
      <path
        d="M12 11h13v4h-8.5v4H23v4h-6.5v7H12z"
        fill="var(--primary-foreground)"
      />
      <circle cx="30" cy="8" r="3.2" fill="var(--brand-2)" />
      <text
        x="42"
        y="27"
        fill="currentColor"
        fontSize="22"
        fontWeight="700"
        letterSpacing="-0.5"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Forhad
      </text>
      <rect
        x="42"
        y="31"
        width="22"
        height="2.5"
        rx="1.25"
        fill="var(--brand-2)"
      />
    </svg>
  );
}
```

**`src/components/shared/nav-link.tsx`**

```tsx
"use client";

import { cn } from "cn";

import type { SectionId } from "@/config/sections";
import { scrollToSection } from "@/lib/scroll";

type NavLinkProps = {
  id: SectionId;
  label: string;
  active: boolean;
  onNavigate?: () => void;
  scrollDelayMs?: number;
  className?: string;
};

/** One navbar/menu link. Without JavaScript the plain #hash href still works. */
export function NavLink({
  id,
  label,
  active,
  onNavigate,
  scrollDelayMs,
  className,
}: NavLinkProps) {
  return (
    <a
      href={`#${id}`}
      aria-current={active ? "location" : undefined}
      onClick={(event) => {
        event.preventDefault();
        onNavigate?.();
        scrollToSection(id, scrollDelayMs);
      }}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-foreground/80 hover:bg-muted hover:text-foreground",
        className,
      )}
    >
      {label}
    </a>
  );
}
```

**`src/components/layout/public/HeaderNav.tsx`**

```tsx
import { NavLink } from "@/components/shared/nav-link";
import { SECTIONS, type SectionId } from "@/config/sections";

export function HeaderNav({ activeId }: { activeId: SectionId }) {
  return (
    <nav aria-label="Primary" className="hidden md:block">
      <ul className="glass flex items-center gap-1 rounded-full border border-border p-1">
        {SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <NavLink id={id} label={label} active={activeId === id} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

**`src/components/layout/public/MobileNav.tsx`**

```tsx
"use client";

import { MenuIcon } from "lucide-react";
import { useState } from "react";

import { NavLink } from "@/components/shared/nav-link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SECTIONS, type SectionId } from "@/config/sections";

const MENU_CLOSE_DELAY_MS = 250;

export function MobileNav({ activeId }: { activeId: SectionId }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon-lg"
            className="glass md:hidden"
            aria-label="Open menu"
          />
        }
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
          {SECTIONS.map(({ id, label }) => (
            <NavLink
              key={id}
              id={id}
              label={label}
              active={activeId === id}
              onNavigate={() => setOpen(false)}
              scrollDelayMs={MENU_CLOSE_DELAY_MS}
              className="py-2.5 text-base"
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
```

**`src/components/layout/public/Header.tsx`**

```tsx
"use client";

import { cn } from "cn";

import { HeaderNav } from "@/components/layout/public/HeaderNav";
import { MobileNav } from "@/components/layout/public/MobileNav";
import { ForhadLogo } from "@/components/shared/forhad-logo";
import { ResumeButton } from "@/components/shared/resume-button";
import { SECTIONS } from "@/config/sections";
import { useScrollSpy } from "@/hooks";
import { scrollToSection } from "@/lib/scroll";

const HOME_ID = SECTIONS[0].id;

export function Header() {
  const { activeId, isScrolled } = useScrollSpy();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-all duration-300",
        isScrolled
          ? "border-border bg-background/70 shadow-sm backdrop-blur-lg"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a
          href={`#${HOME_ID}`}
          aria-label="Forhad, back to top"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection(HOME_ID);
          }}
        >
          <ForhadLogo />
        </a>
        <HeaderNav activeId={activeId} />
        <div className="flex items-center gap-2">
          <ResumeButton size="lg" className="shadow-sm" />
          <MobileNav activeId={activeId} />
        </div>
      </div>
    </header>
  );
}
```

**`src/components/layout/public/Footer.tsx`**

```tsx
import { ForhadLogo } from "@/components/shared/forhad-logo";
import { SocialLinks } from "@/components/shared/social-links";
import { SITE } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/60 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-5 px-4 py-8 sm:px-6 md:flex-row">
        <ForhadLogo className="h-8" />
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE.name}. Built with Next.js,
          Tailwind CSS and shadcn/ui.
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
```

**`src/components/modules/home/home-section.tsx`** (temporary placeholder, replaced in Step 4)

```tsx
import { Section } from "@/components/shared/section";

export function HomeSection() {
  return (
    <Section id="home">
      <p className="text-muted-foreground">home section placeholder</p>
    </Section>
  );
}
```

**`src/components/modules/about/about-section.tsx`** (temporary placeholder, replaced in Step 4)

```tsx
import { Section } from "@/components/shared/section";

export function AboutSection() {
  return (
    <Section id="about">
      <p className="text-muted-foreground">about section placeholder</p>
    </Section>
  );
}
```

**`src/components/modules/projects/projects-section.tsx`** (temporary placeholder, replaced in Step 4)

```tsx
import { Section } from "@/components/shared/section";

export function ProjectsSection() {
  return (
    <Section id="projects">
      <p className="text-muted-foreground">projects section placeholder</p>
    </Section>
  );
}
```

**`src/components/modules/skills/skills-section.tsx`** (temporary placeholder, replaced in Step 5)

```tsx
import { Section } from "@/components/shared/section";

export function SkillsSection() {
  return (
    <Section id="skills">
      <p className="text-muted-foreground">skills section placeholder</p>
    </Section>
  );
}
```

**`src/components/modules/contact/contact-section.tsx`** (temporary placeholder, replaced in Step 5)

```tsx
import { Section } from "@/components/shared/section";

export function ContactSection() {
  return (
    <Section id="contact">
      <p className="text-muted-foreground">contact section placeholder</p>
    </Section>
  );
}
```

**`src/app/(public)/layout.tsx`**

```tsx
import { Footer } from "@/components/layout/public/Footer";
import { Header } from "@/components/layout/public/Header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
```

**`src/app/(public)/page.tsx`**

```tsx
import { AboutSection } from "@/components/modules/about/about-section";
import { ContactSection } from "@/components/modules/contact/contact-section";
import { HomeSection } from "@/components/modules/home/home-section";
import { ProjectsSection } from "@/components/modules/projects/projects-section";
import { SkillsSection } from "@/components/modules/skills/skills-section";

/** Section ORDER is fixed by the brief: Home, About, Projects, Skills, Contact. Keep it in sync with src/config/sections.ts. */
export default function HomePage() {
  return (
    <>
      <HomeSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
```

**Gate:** `pnpm verify`.
**Done when:** `pnpm dev` shows a transparent navbar (logo, five links, Resume button; hamburger on phones), five "placeholder" sections, the footer; clicking a nav link scrolls smoothly and highlights it; after scrolling the navbar becomes frosted; clicking **Resume** starts the PDF download.
**Do NOT:** edit `page.tsx` in later steps, put `bg-*` on `main`, use `asChild`.

---

### Step 4: Home (hero), About and Projects sections

**What this step is.** Replace three placeholders with the real **Home** (designation, photo, email, phone, social links, download-resume button), **About** (short story, quick facts, hobbies) and **Projects** (three cards, each with name, image, and a **Details** button that opens a modal with stack, description, live link, GitHub links, challenges and future plans).

**Why now.** These three sections create the first impression and the recruiter's main evidence (projects). They only combine Step 2 data with Step 3 components, so the risk of breaking something is very small.

**Key terms (simple example each)**

- **`next/image` with `fill`**: the image fills its parent box. The parent must be `relative` with a size (for example `aspect-video`). `sizes` tells the browser which width to download at each screen size (smaller download on phones).
- **`priority`**: load this image immediately. Only the hero photo has it (above the fold).
- **`min-h-svh`**: minimum height = the small viewport height, so the hero fills one phone screen even when the browser toolbar is visible. `dvh` is the same idea for modals (`max-h-[88dvh]`).
- **Dialog (Base UI)**: `Dialog` = state holder, `DialogTrigger` = the button that opens it, `DialogContent` = the popup (rendered in a portal above the page), `DialogTitle` = required heading for screen readers.
- **Card composition**: `Card` > `CardHeader`/`CardTitle`/`CardDescription`, `CardContent`, `CardFooter`; each part is a separate component you stack.
- **`gradient-text` / `glass`**: the two utilities from Step 1 (gradient-coloured text, frosted card background).
- **`motion-safe:animate-in`**: play the entrance animation only for users who have not asked for reduced motion.
- **Conditional render `{x ? <A/> : null}`**: used to hide the "Server repo" button when a project has no `repos.server`.

**Overwrite these files (the first three) and create the last two**

**`src/components/modules/home/home-section.tsx`**

```tsx
import { cn } from "cn";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";

import { ContactList } from "@/components/shared/contact-list";
import { LinkButton } from "@/components/shared/link-button";
import { ResumeButton } from "@/components/shared/resume-button";
import { Section } from "@/components/shared/section";
import { SocialLinks } from "@/components/shared/social-links";
import { Badge } from "@/components/ui/badge";
import { SITE } from "@/config/site";

const CTA_CLASS_NAME = "h-11 px-6 text-base";

export function HomeSection() {
  return (
    <Section id="home" className="flex min-h-svh items-center pt-28 pb-16">
      <div className="grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
        <div className="order-2 flex flex-col gap-6 motion-safe:animate-in motion-safe:duration-700 motion-safe:fade-in motion-safe:slide-in-from-bottom-4 md:order-1">
          <Badge variant="outline" className="glass h-7 gap-2 px-3">
            <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
            Open to new opportunities
          </Badge>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Hi, I&apos;m <span className="gradient-text">{SITE.name}</span>
            </h1>
            <p className="text-xl font-semibold text-primary sm:text-2xl">
              {SITE.designation}
            </p>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              {SITE.intro}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ResumeButton label="Download Resume" className={CTA_CLASS_NAME} />
            <LinkButton
              href="#projects"
              variant="outline"
              className={cn("glass", CTA_CLASS_NAME)}
            >
              View Projects
              <ArrowDownIcon />
            </LinkButton>
          </div>
          <ContactList />
          <SocialLinks />
        </div>

        <div className="order-1 mx-auto w-full max-w-[16rem] md:order-2 md:max-w-sm">
          <div className="relative aspect-square">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-full bg-linear-to-tr from-primary/40 to-brand-2/40 blur-2xl"
            />
            <div className="relative size-full overflow-hidden rounded-full ring-4 ring-primary/30">
              <Image
                src="/my-face-image.png"
                alt="Portrait of Forhad"
                fill
                priority
                sizes="(min-width: 768px) 384px, 256px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
```

**`src/components/modules/about/about-section.tsx`**

```tsx
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ABOUT_FACTS, ABOUT_INTERESTS, ABOUT_PARAGRAPHS } from "@/data/about";

export function AboutSection() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About me"
        title="Developer, problem-solver, lifelong learner"
      />
      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
          {ABOUT_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="pt-2">
            <p className="mb-3 text-sm font-semibold text-foreground">
              Beyond code
            </p>
            <ul className="flex flex-wrap gap-2">
              {ABOUT_INTERESTS.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <Badge
                    variant="outline"
                    className="glass h-8 gap-2 px-3 text-sm"
                  >
                    <Icon className="text-primary" />
                    {label}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Card className="glass h-fit">
          <CardContent>
            <ul className="space-y-5">
              {ABOUT_FACTS.map(({ label, value, icon: Icon }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs tracking-wide text-muted-foreground uppercase">
                      {label}
                    </p>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
```

**`src/components/modules/projects/projects-section.tsx`**

```tsx
import { ProjectCard } from "@/components/modules/projects/project-card";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { PROJECTS } from "@/data/projects";

export function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Things I have built"
        description="Real products with authentication, payments and role-based dashboards. Open Details for the stack, challenges and next steps."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
```

**`src/components/modules/projects/project-card.tsx`**

```tsx
import Image from "next/image";

import { ProjectDetailsDialog } from "@/components/modules/projects/project-details-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/types/portfolio.type";

const VISIBLE_TECH_COUNT = 4;

export function ProjectCard({ project }: { project: Project }) {
  const { name, tagline, image, techStack } = project;
  const hiddenCount = techStack.length - VISIBLE_TECH_COUNT;

  return (
    <Card className="glass h-full pt-0 transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription>{tagline}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="flex flex-wrap gap-1.5">
          {techStack.slice(0, VISIBLE_TECH_COUNT).map((tech) => (
            <li key={tech}>
              <Badge variant="secondary">{tech}</Badge>
            </li>
          ))}
          {hiddenCount > 0 ? (
            <li>
              <Badge variant="outline">+{hiddenCount}</Badge>
            </li>
          ) : null}
        </ul>
      </CardContent>
      <CardFooter>
        <ProjectDetailsDialog project={project} />
      </CardFooter>
    </Card>
  );
}
```

**`src/components/modules/projects/project-details-dialog.tsx`**

```tsx
"use client";

import { ArrowUpRightIcon, ExternalLinkIcon } from "lucide-react";
import type { ReactNode } from "react";
import { FaGithub } from "react-icons/fa6";

import { LinkButton } from "@/components/shared/link-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Project } from "@/types/portfolio.type";

function DetailBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground marker:text-primary">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ProjectDetailsDialog({ project }: { project: Project }) {
  const {
    name,
    tagline,
    description,
    techStack,
    liveUrl,
    repos,
    challenges,
    improvements,
  } = project;

  return (
    <Dialog>
      <DialogTrigger render={<Button size="lg" className="w-full" />}>
        Details
        <ArrowUpRightIcon data-icon="inline-end" />
      </DialogTrigger>
      <DialogContent className="max-h-[88dvh] gap-5 overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{name}</DialogTitle>
          <DialogDescription>{tagline}</DialogDescription>
        </DialogHeader>

        <DetailBlock title="Main technology stack">
          <ul className="flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <li key={tech}>
                <Badge variant="secondary">{tech}</Badge>
              </li>
            ))}
          </ul>
        </DetailBlock>

        <DetailBlock title="About the project">
          <p className="leading-relaxed text-muted-foreground">{description}</p>
        </DetailBlock>

        <DetailBlock title="Links">
          <div className="flex flex-wrap gap-2">
            <LinkButton href={liveUrl} size="lg">
              <ExternalLinkIcon />
              Live project
            </LinkButton>
            <LinkButton href={repos.client} variant="outline" size="lg">
              <FaGithub />
              Client repo
            </LinkButton>
            {repos.server ? (
              <LinkButton href={repos.server} variant="outline" size="lg">
                <FaGithub />
                Server repo
              </LinkButton>
            ) : null}
          </div>
        </DetailBlock>

        <DetailBlock title="Challenges faced">
          <BulletList items={challenges} />
        </DetailBlock>

        <DetailBlock title="Improvements and future plans">
          <BulletList items={improvements} />
        </DetailBlock>

        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  );
}
```

**Gate:** `pnpm verify`.
**Done when:** the hero shows the heading, designation, photo, email, phone, four social icons, "Download Resume"; About shows paragraphs, facts card and hobbies; Projects shows Hemacue, RentNest, LawBD in that order; each **Details** opens a scrollable modal with all required parts; LawBD shows **no** Server repo button; Esc or the close button closes the modal.
**Do NOT:** hard-code project text in components, change the order of `PROJECTS`, import images that are not in `public/`.

---

### Step 5: Skills, Education, Contact form, final QA

**What this step is.** Replace the last two placeholders: **Skills** (five categories with brand icons, plus the Education card in the same grid) and **Contact** (email, phone, all social icons, and a working message form that emails you). Then run the final checks.

**Why last.** The contact form is the only part with an external dependency (Web3Forms) and the most logic, so it is built when everything else is stable. The footer already exists from Step 3, so Contact + Footer together complete the 5th section as required.

**Key terms (simple example each)**

- **Uncontrolled form + `FormData`**: the browser keeps the field values; on submit we read them once with `new FormData(form)`. Simpler and fewer re-renders than storing every keystroke in state.
- **Client-side validation**: `validateContact(values)` returns `{ email: "Please enter a valid email address." }` when invalid, or `{}` when fine.
- **`aria-invalid` + `FieldError`**: marks the field as wrong for assistive tech and shows the message under it.
- **Toast**: a small pop-up message (`toast.add({ type: "success", title })`). The `<Toaster />` in the root layout displays it.
- **`NEXT_PUBLIC_` env variable**: variables with this prefix are written into the browser bundle at build time. A Web3Forms access key is designed to be public (you can restrict it to your domain in their dashboard).
- **Static prerender**: Next.js builds this page into plain HTML at build time (`○ (Static)` in the build output). No server is needed, which is what "static portfolio" means here.

**Prerequisite (human, 2 minutes):** create a free access key at <https://web3forms.com> using `forhaduddin823@gmail.com`, then put it in `.env.local` as `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=...` (and later in the hosting dashboard). Without it the form shows a friendly "not configured, please email me directly" message and nothing breaks.

**Overwrite the placeholder and create the files**

**`src/components/modules/skills/skills-section.tsx`**

```tsx
import type { LucideIcon } from "lucide-react";
import { GraduationCapIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EDUCATION } from "@/data/education";
import { SKILL_CATEGORIES } from "@/data/skills";

function IconTitle({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <CardTitle className="flex items-center gap-3 text-base">
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
        <Icon className="size-4" />
      </span>
      {children}
    </CardTitle>
  );
}

export function SkillsSection() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills & education"
        title="Tools I work with"
        description="Grouped by area. Technologies I have used in the projects above."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SKILL_CATEGORIES.map(({ id, title, icon, skills }) => (
          <Card key={id} className="glass">
            <CardHeader>
              <IconTitle icon={icon}>{title}</IconTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-wrap gap-2">
                {skills.map(({ name, icon: SkillIcon }) => (
                  <li
                    key={name}
                    className="flex items-center gap-2 rounded-lg border border-border bg-background/50 px-2.5 py-1.5 text-sm transition-colors hover:border-primary"
                  >
                    <SkillIcon className="size-4 text-primary" />
                    {name}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}

        <Card className="glass">
          <CardHeader>
            <IconTitle icon={GraduationCapIcon}>
              Educational Qualification
            </IconTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {EDUCATION.map(({ degree, group, institution, result }) => (
                <li key={degree} className="space-y-1">
                  <p className="font-medium">
                    {degree} ({group})
                  </p>
                  <p className="text-sm text-muted-foreground">{institution}</p>
                  <p className="inline-block rounded-md bg-primary/15 px-2 py-0.5 text-sm font-semibold text-primary">
                    {result}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
```

**`src/components/modules/contact/contact-form.tsx`**

```tsx
"use client";

import { SendIcon } from "lucide-react";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { CONTACT_FIELDS } from "@/data/contact-form";
import { sendContactMessage } from "@/lib/contact";
import { readContactValues, validateContact } from "@/lib/validation";
import type { ContactErrors } from "@/types/contact.type";

export function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = readContactValues(new FormData(form));
    const foundErrors = validateContact(values);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    setIsSending(true);
    const result = await sendContactMessage(values);
    setIsSending(false);

    if (result.ok) {
      form.reset();
      toast.add({
        type: "success",
        title: "Message sent",
        description: "Thanks for reaching out. I will reply soon.",
      });
      return;
    }
    toast.add({
      type: "error",
      title: "Message not sent",
      description: result.message,
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FieldGroup>
        {CONTACT_FIELDS.map((field) => {
          const error = errors[field.name];
          return (
            <Field key={field.name} data-invalid={Boolean(error)}>
              <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
              {field.type === "textarea" ? (
                <Textarea
                  id={field.name}
                  name={field.name}
                  rows={5}
                  placeholder={field.placeholder}
                  aria-invalid={Boolean(error)}
                />
              ) : (
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  aria-invalid={Boolean(error)}
                />
              )}
              {error ? <FieldError>{error}</FieldError> : null}
            </Field>
          );
        })}
        <Button
          type="submit"
          size="lg"
          className="h-11 w-full"
          disabled={isSending}
        >
          {isSending ? <Spinner /> : <SendIcon />}
          {isSending ? "Sending..." : "Send message"}
        </Button>
      </FieldGroup>
    </form>
  );
}
```

**`src/components/modules/contact/contact-section.tsx`**

```tsx
import { ContactForm } from "@/components/modules/contact/contact-form";
import { ContactList } from "@/components/shared/contact-list";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { SocialLinks } from "@/components/shared/social-links";
import { Card, CardContent } from "@/components/ui/card";

export function ContactSection() {
  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Let's work together"
        description="Have a role or project in mind? Send a message and I will get back to you."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Card className="glass h-fit">
          <CardContent className="space-y-6">
            <ContactList />
            <div className="space-y-3">
              <p className="text-sm font-semibold">Find me online</p>
              <SocialLinks />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
```

**Final gate and manual QA**

```bash
pnpm verify
pnpm start   # after the build, open http://localhost:3000
```

| Check                            | Expected                                                                                                             |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Widths 360, 390, 768, 1024, 1440 | no horizontal scrollbar; navbar never wraps; Resume + menu button fit at 360                                         |
| Order                            | Home, About, Projects, Skills, Contact (nav and page)                                                                |
| Scroll length at 1440×900        | about 5 screens or fewer (hero + 4 scrolls)                                                                          |
| Navbar                           | transparent at top, frosted after scroll, active link highlighted, Contact link reaches the last section             |
| Mobile menu                      | opens, link closes it and scrolls to the section                                                                     |
| Resume (navbar and hero)         | one click downloads the PDF                                                                                          |
| Details modal                    | scrolls on small screens; Esc closes; LawBD has no server button                                                     |
| Contact form                     | empty submit shows 3 errors; valid submit shows success toast and resets                                             |
| Contrast                         | body text and buttons readable over the image (if not, raise `--overlay-from/--overlay-to` in `globals.css` by 0.05) |
| Lighthouse (mobile)              | Accessibility ≥ 95, Best Practices ≥ 95                                                                              |

**Deploy (Vercel):** push to GitHub, import the repo, add `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` and `NEXT_PUBLIC_SITE_URL`, deploy.

---

## 5. Final definition of done

- `pnpm verify` passes and the working tree is committed after each of the 5 steps.
- No `any`; `unknown` only in `catch`; no hex or palette colours; no copied blocks.
- All text/links live in `src/data` or `src/config`.
- The theme still follows the image after `pnpm palette`.

## 6. Troubleshooting

| Symptom                                           | Cause and fix                                                                      |
| ------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `Cannot find module 'input-otp'`                  | Step 1 deletion skipped. Delete `input-otp.tsx`, `pagination.tsx`, `sidebar.tsx`   |
| `biome check` fails on import order or formatting | run `pnpm exec biome check --write` (part of `pnpm verify`)                        |
| `pnpm palette` cannot load `sharp`                | run `pnpm approve-builds`, reinstall, retry; or keep the default palette (see 1.5) |
| `asChild` type error                              | use `render={...}` (guardrail G4)                                                  |
| Page shows solid colour, no image                 | a wrapper has `bg-*`, or `public/website-background.png` is missing                |
| Contact form says "not configured"                | add `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` to `.env.local` and restart `pnpm dev`      |
| Resume opens a Google page instead of downloading | the Drive file is not shared "Anyone with the link"                                |
| `pnpm guard` reports a colour or `unknown`        | replace with a theme token / remove the type, then rerun                           |
| `pnpm dup` reports a clone                        | extract the shared part into one component/function and reuse it                   |
