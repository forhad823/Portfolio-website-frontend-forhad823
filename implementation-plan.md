# Implementation Plan — Forhad's Static Portfolio

> **Purpose:** Build the complete, responsive, recruiter-friendly, single-page portfolio in at most five controlled implementation steps. This plan is intended to be followed by smaller/less capable LLMs or developers without repeatedly reworking earlier steps.

> **!! Must Remember !!:** the website should be easily and highly scalable so a developer can easily add, modify, delete info and data without requiring much code changes, make it highly easier using shared and utility functions and other Nextjs features as per needed)

> **Primary outcome:** A polished static portfolio that communicates the most relevant information in about 3–4 screen scrolls, while preserving the exact five-section order required below.

---

## Project baseline and non-negotiable constraints

### What the project already contains

- **Next.js `16.3.4`, React/React DOM `19.2.8`, TypeScript `^5`.**
- **Tailwind CSS v4**, using `@tailwindcss/postcss`; `src/app/globals.css` imports `tailwindcss`, `tw-animate-css`, and `shadcn/tailwind.css`.
- **shadcn/ui CLI v4** and an existing `components.json` configured with `style: "new-york"`, `baseColor: "zinc"`, CSS variables, Lucide icons, and aliases such as `@/components`, `@/components/ui`, and `@/lib`.
- **Biome 2.4.2** for formatting/linting, with React and Next.js lint domains enabled.
- Existing static assets: `public/website-background.png`, `public/my-face-image.png`, `public/hemacue-image.png`, `public/rentnest-image.png`, and `public/lawbd-image.png`.
- Existing project README material for Hemacue, RentNest, and LawBD, plus existing shadcn primitives in `src/components/ui/`.

The dump shows a starter home page at `src/app/(public)/page.tsx` and public layout/component files under `src/components/layout/public/`. Several of those layout files appear empty in the dump. **Inspect the actual working-tree files before changing them**; a text dump can omit or misrepresent binary files and file content. Do not assume an existing component is implemented just because its filename exists.

### Required page structure — order must not change

The page is one continuous document, with navigation links that scroll to these five sections in this exact order:

1. **Home**
2. **About Me**
3. **Projects**
4. **Skills & Education**
5. **Contact & Footer**

Do not turn these into separate routes. Use semantic section IDs, for example `home`, `about`, `projects`, `skills`, and `contact`. Navigation links must point to those IDs.

### Static-site boundary

This is a static portfolio, not a new full-stack application. Do not connect it to Hemacue's backend or add authentication, a database, API fetching, or a CMS.

A contact form cannot deliver an email by itself from a static browser-only site. Unless a form service or backend endpoint is explicitly configured, implement client-side validation and a clear `mailto:` fallback. Never pretend that a message was sent successfully when no delivery service exists.

### Required personal and project content

Use the facts and URLs in `portfolio-project-requirement.txt` as the source of truth. Do not invent job titles, employers, years of experience, project metrics, user counts, or outcomes.

**Home**

- Name/logo: “Forhad” (a simple custom inline SVG wordmark is acceptable).
- Designation: **Full Stack Web Developer**.
- Profile photo: `/my-face-image.png`.
- Email: `forhaduddin823@gmail.com`.
- Phone: `+8801833568856`.
- GitHub: `https://github.com/forhad823`
- LinkedIn: `https://www.linkedin.com/in/md-forhad-uddin-b65496231`
- X/Twitter: `https://x.com/forhaduddin823`
- Facebook: `https://web.facebook.com/mdforhad.forhad.7186896`
- Resume: `https://drive.google.com/uc?export=download&id=1HjfeRQoODUXKBAnJHBHoZCms3Kwpa_7R`

**About Me**

- **Full-stack developer** from Bangladesh focused on building practical web applications.
- **Problem-solver** who enjoys debugging, logical challenges, and understanding how software works.
- **Hands-on learner** developing skills through structured courses and real-world projects.
- **Engineering-minded** with an interest in frontend, backend logic, APIs, and databases.
- **Beyond coding:** Enjoys chess, reading, cricket, and documentaries.

**Projects** — keep this priority order and show at least three:

1. **Hemacue — Blood Donation and Emergency Service Platform**
   - Live: `https://hemacue-frontend.vercel.app`
   - Client repo: `https://github.com/forhad823/hemacue-frontend-a7-b7`
   - Server repo: `https://github.com/forhad823/hemacue-backend-A6-B7`
   - Image: `/hemacue-image.png`
2. **RentNest — Rental Property Marketplace**
   - Live: `https://my-rent-nest-frontend-a5-b7.vercel.app`
   - Client repo: `https://github.com/forhad823/MY-RentNest-Frontend`
   - Server repo: `https://github.com/forhad823/My-RentNest-Backend-A4B7`
   - Image: `/rentnest-image.png`
3. **LawBD — Lawyer Finding and Appointment Booking Platform**
   - Live: `https://cosmic-marshmallow-0260e0.netlify.app`
   - Client repo: `https://github.com/forhad823/Law.BD-lawyer-appointment-booking-app-`
   - Client-only project: **do not render a server-side repository button**.
   - Image: `/lawbd-image.png`

Each project needs a **Details** action opening an accessible modal/dialog containing: project name, technology stack, concise description, live link, relevant repository links, challenges faced, and potential improvements/future plans. Read `my-projects-readme/Hemacue`, `my-projects-readme/Rentnest`, and `my-projects-readme/LawBD` for grounded technical details. Distinguish a documented fact from a reasonable future idea. If the readme does not support a specific challenge, do not fabricate one; write a modest, clearly qualified challenge or omit that detail and flag the content gap.

**Skills & Education**

- Show skills in readable visual groups, not a dense wall of badges.
- Include skills supported by project README material, including Firebase and Mongoose as specifically requested.
- Categories may include Frontend, Backend, Languages, Databases, and Tools, but only create categories that help scanning.
- Education: **Higher Secondary (Science), GPA 4.00/5.00, National Model College**.

**Contact & Footer**

- Repeat the key email, phone, and social links so they are easy to find.
- Include a contact form with accessible labels and validation; follow the static-site boundary above.
- Keep the footer simple and consistent with the rest of the page.

---

## Step 1 — Audit the real project, assets, and content; establish the visual system

### What this step is

Inspect the actual working tree and the supplied project dump/readmes before writing the site. Establish a small design system first so every later section uses the same visual decisions.

### Why this step comes first

Most expensive rework happens when later components each choose their own colors, spacing, and structure, or when an LLM assumes the wrong Tailwind/shadcn version. This step prevents incompatible configuration edits and gives every later step a stable foundation.

### Required actions

1. Inspect `package.json`, `pnpm-lock.yaml`, `components.json`, `biome.json`, `postcss.config.mjs`, `next.config.ts`, `tsconfig.json`, `src/app/layout.tsx`, `src/app/(public)/layout.tsx`, `src/app/(public)/page.tsx`, and `src/app/globals.css`.
2. Confirm the actual installed dependency versions and the Tailwind v4 setup. **Do not add Tailwind v3 configuration patterns** or replace the existing build pipeline.
3. Inspect `public/website-background.png` visually in the actual project. Identify its dominant hue, secondary hue, brightness, texture, contrast, and whether foreground text can be read over it. Also inspect the profile and three project images to confirm they exist and match the intended content.
4. Read the Hemacue, RentNest, and LawBD README sections from `my-projects-readme`. Extract only the real technology stacks, descriptions, documented development challenges, and credible future improvements.
5. Create a concise content inventory before implementing UI: five section headings, navigation labels, project data, skill categories, education facts, contact links, and resume link.
6. Decide on **one** shadcn style/preset and one theme strategy. The current baseline is `new-york` + `zinc` in `components.json`; keep it unless inspecting the image and actual installed shadcn version gives a clear reason to change it. Do not repeatedly switch styles mid-project.
7. Choose a cohesive palette **from the actual background image**, not from generic assumptions:
   - Select one primary accent sampled/visually matched to the background.
   - Select one secondary accent only if the image supports it.
   - Define readable foreground, muted foreground, surface/card, border, and focus-ring colors.
   - Keep primary CTA contrast strong even if the background is busy.
   - Use semantic CSS variables in `globals.css` so shadcn components and custom components share the same tokens.
8. Update `src/app/globals.css` as the single source of truth for global theme tokens. Preserve the required Tailwind v4 imports and the shadcn CSS-variable mapping. Define the page background image at the global page/body level or on one shared site shell—not separately on every section. Use a fixed/cover treatment only if it looks good on mobile and does not cause scrolling/performance issues. Add a subtle overlay or translucent surface layer if required for readability; the original image must remain the overall page background.
9. Use the background image as the common visual foundation while allowing cards, dialogs, navigation, and form controls to use theme-matched surfaces. A card may have a solid or translucent surface; it must not introduce an unrelated visual theme.
10. Document the chosen theme briefly in code comments or this plan: chosen primary/secondary accent, surface strategy, and why it fits the background.

### Theme implementation rules

- Prefer semantic classes such as `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, `border-border`, `bg-primary`, and `text-primary-foreground` where appropriate.
- Avoid scattering arbitrary color values such as `text-[#...]` throughout JSX. If a custom hue is needed, define it once as a CSS variable/token and reuse it.
- Do not let `globals.css` define tokens that conflict with `components.json` or shadcn's expected variables.
- Keep the theme simple: one dominant accent, a restrained secondary accent if needed, neutral readable text/surfaces, and consistent borders/radii/shadows.
- Respect reduced-motion preferences and do not rely on animation to communicate important information.

### Step 1 acceptance gate

- The project still installs and starts with its existing package manager and scripts.
- Tailwind v4 and shadcn styles compile without missing-token errors.
- The page background image is visible across the entire document, including behind all five sections.
- Text, links, focus indicators, and primary buttons remain readable against the image.
- No section UI has been built yet beyond a minimal shell/theme test; the theme decision is stable and documented.

---

## Step 2 — Build the shared page shell, navigation, Home, and About Me

### What this step is

Create the semantic single-page structure, shared layout, sticky navigation, responsive mobile navigation, Home hero, and concise About section.

### Why this step is second

The navigation and page shell establish the site's structure and global spacing. Building them before project cards and details prevents later sections from needing their own competing layout rules.

### Required actions

1. Implement the five section containers in the required order in the existing App Router home page or in small, clearly named section components imported by it. Keep the website on one route.
2. Create or repair the root layout and public layout only as needed. Ensure `globals.css` is imported once at the root layout, not repeatedly in nested components.
3. Create a sticky, transparent/translucent navigation bar with:
   - Left: accessible custom “Forhad” SVG wordmark or text fallback.
   - Middle: links to Home, About, Projects, Skills & Education, and Contact.
   - Right: a visually prominent Resume button.
   - Mobile: a keyboard-accessible menu that closes after a section is selected. Use the existing shadcn Sheet or another existing primitive if it fits; do not build a second modal/menu system unnecessarily.
4. Account for the sticky header when navigating to section anchors using `scroll-margin-top`/`scroll-mt-*`. Use smooth scrolling only when reduced motion is not requested.
5. Build a concise hero containing name, **Full Stack Web Developer**, a short fact-based introduction, the profile image `/my-face-image.png`, contact details, social links, and a clear resume action. Avoid invented experience claims or fabricated metrics.
6. Implement resume behavior and test it. If the Google Drive URL only previews the file, use a verified download-compatible URL or a clear direct link that accurately communicates its behavior.
7. Build the About Me section from real context: programming journey, work the developer enjoys, and a few authentic interests/personality details. Keep it concise enough to preserve the 3–4-scroll goal.
8. Use semantic HTML (`header`, `nav`, `main`, `section`, headings) and provide descriptive alternative text for meaningful images. Decorative SVGs/icons should be hidden from assistive technology where appropriate.
9. Use shared button, container, section-heading, social-link, and icon patterns instead of reimplementing these styles in each component.

### Step 2 acceptance gate

- All five nav links target the correct section IDs, even if later sections are still placeholders.
- Sticky navigation does not cover section headings or content.
- Desktop and mobile navigation work by mouse, touch, and keyboard.
- Home displays the correct image, designation, email, phone, social links, and resume action.
- About text is concise, truthful, and readable.
- No console errors, broken imports, or hydration warnings.

---

## Step 3 — Build data-driven Projects cards and accessible Details dialogs

### What this step is

Implement the three project cards and their Details dialogs using a single typed data source, with content grounded in the supplied README files.

### Why this step is third

Project information is the strongest evidence of development ability. A data-driven implementation makes future changes safe: adding or editing a project should normally require editing one object, not copying JSX.

### Required actions

1. Create a typed project data module, for example `src/data/projects.ts`, with a `Project` type and one object per project. Include fields for `id`, `name`, `shortDescription`, `image`, `technologies`, `liveUrl`, `clientRepoUrl`, optional `serverRepoUrl`, `challenges`, and `futureImprovements`.
2. Keep project objects in the required order: Hemacue, RentNest, LawBD. Use the exact URLs and image paths listed in the source requirements.
3. Use one reusable `ProjectCard` component for all cards and one reusable Details dialog/modal component. Render cards by mapping over the typed data array with a stable key (`project.id`), not an array index.
4. Use existing shadcn primitives—such as Card, Button, Dialog, and relevant dialog content/title/description components—rather than creating parallel custom primitives. Check the actual exports in the installed component files before importing.
5. The dialog must show:
   - Project name and concise description.
   - Main technology stack, based on its README.
   - Live project link.
   - Client repository link.
   - Server repository link **only when `serverRepoUrl` exists**; LawBD must not show a server-side button.
   - Challenges faced, using only documented or carefully qualified information.
   - Potential improvements/future plans, clearly presented as future ideas rather than already implemented features.
6. Use `next/image` for local images when supported by the current configuration, with correct `width`/`height` or `fill` plus a correctly sized parent. If the implementation instead uses normal `<img>`, explain why and avoid lint warnings. Do not configure remote image domains for images that are already local.
7. External links should have meaningful accessible names. Use `target="_blank"` with `rel="noopener noreferrer"` when opening a new tab. Buttons must have real actions; do not render dead placeholder links.
8. Ensure the dialog can be opened and closed by keyboard, has a visible title, keeps focus behavior accessible, and fits small screens without horizontal overflow.
9. Do not add a separate hard-coded card for each project. Shared structure belongs in `ProjectCard`; project-specific differences belong in the data.

### Step 3 acceptance gate

- Exactly the three required projects appear in the correct priority order.
- Each card uses its corresponding local image.
- Every Details action opens the correct project's information, not the first project's information for all cards.
- LawBD has no server-side repository action.
- Dialog controls work by keyboard and on mobile.
- Editing project text or URLs requires changing the data module only, except when a genuinely new field is introduced.

---

## Step 4 — Build Skills & Education, Contact form, and Footer

### What this step is

Complete the remaining two sections using shared data and UI patterns, then connect the footer and contact actions to the same source of truth.

### Why this step is fourth

By this point the design system, navigation, hero, and project interaction are stable. The remaining sections can reuse the established styles without changing earlier behavior.

### Required actions

1. Create a typed skills data module, for example `src/data/skills.ts`, grouping verified skills into a few meaningful categories. Include Firebase and Mongoose as requested, but only list them if the supplied project README material supports them. Do not inflate skill levels or label a technology “expert” without evidence.
2. Render skill groups with a reusable `SkillGroup`/`SkillBadge` pattern. Keep text labels readable and avoid turning the section into a wall of tiny logos.
3. Display education exactly as provided: Higher Secondary (Science), GPA 4.00 out of 5.00, National Model College. Do not add a graduation year unless the source gives one.
4. Build Contact using reusable contact/social-link data so email, phone, GitHub, LinkedIn, X/Twitter, and Facebook URLs are not duplicated as separate hard-coded values in several components.
5. Create a contact form with labeled name, email, and message fields; required-field and email validation; clear inline errors; a submitting/success state only when an actual delivery mechanism supports those states.
6. Because the portfolio is static, do not claim that a form sends email unless a real service/endpoint is configured and tested. Without one, make the form's fallback explicit—e.g. a button that opens a prefilled `mailto:` draft—or leave a clearly documented integration point for a future form service. Do not expose API keys or secrets in client-side code.
7. Implement a simple footer with copyright/name and relevant social links. Avoid repeating the full contact panel in the footer; keep it compact.
8. Check the page length and information density. Prioritize content recruiters need quickly: designation, contact/resume, strongest projects, skills, and education. Aim for the requested 3–4 scrolls without shrinking text or hiding essential content.

### Step 4 acceptance gate

- Skills are grounded in the supplied project documentation and grouped clearly.
- Education facts are correct.
- Contact links work and match the Home section.
- Form errors are accessible and understandable; the form never falsely reports delivery.
- Footer is visually consistent and not redundant.
- All five sections are populated in the required order.

---

## Step 5 — Responsive, accessibility, content, and production verification

### What this step is

Run a focused QA pass across the entire page, fix defects, and verify the production build without redesigning stable components.

### Why this step is last

A final cross-page pass catches integration issues that individual steps cannot reveal, while the earlier acceptance gates reduce the number of defects accumulated by this stage.

### Required actions

1. Run the existing scripts from the project root, using the package manager already selected by the project:
   - `pnpm lint`
   - `pnpm run format:check`
   - `pnpm run lint:check`
   - `pnpm run build`

   If a script behaves differently than its name suggests, inspect `package.json` and run the command that matches the actual script. Do not change scripts just to make a check appear successful. Fix issues in the affected source files and rerun the relevant checks.

2. Test at representative viewport widths: small mobile (around 320–375 px), large mobile, tablet, laptop, and wide desktop. Check horizontal overflow, nav wrapping, project-card layout, dialog sizing, image cropping, and readable spacing.
3. Test keyboard-only navigation: logical tab order, visible focus, Enter/Space activation, Escape to close the mobile menu/dialog, and no keyboard trap.
4. Test reduced-motion settings, color contrast, image alt text, form labels/errors, semantic heading order, and touch target sizes.
5. Verify all links manually: resume behavior, live demos, repository URLs, email, phone, and social profiles. Confirm there are no placeholder URLs, dead buttons, or misleading labels.
6. Check the browser console and terminal for missing keys, hydration mismatch, broken image paths, invalid nesting, React key warnings, and CSS/theme errors.
7. Review the actual rendered page against `public/website-background.png`. Confirm the background remains consistent across the whole document and the text/surfaces still provide adequate contrast.
8. Review content against the requirements file line by line: five sections in the exact order, at least three projects in the required order, Details dialog contents, no server repo button for LawBD, requested skills/education, contact form, and footer.
9. Do not add dependencies or refactor unrelated configuration during QA. If a defect requires a change to a shared component or theme token, make the smallest targeted change and retest every section that uses it.

### Step 5 acceptance gate

- Lint, formatting, and production build complete without unresolved errors.
- No broken images or links are known.
- The website is usable on mobile, tablet, and desktop.
- Keyboard navigation and dialog behavior are usable.
- All five required sections and project details are present and accurate.
- The visual theme matches the real background image and remains legible.
- No unrelated application/backend features or unnecessary dependencies were introduced.

---

## Global guard rails for every step

These rules apply to every LLM or developer working on this portfolio.

### 1. DRY — Do Not Repeat Yourself

- Store repeatable content in typed data modules (`src/data/projects.ts`, `src/data/skills.ts`, and a shared contact/social data module if needed).
- Build shared components for repeated UI patterns: section heading, page container, buttons/links, project card, project dialog, skill group, social link, and contact details.
- Do not duplicate the same project card JSX, social URLs, color palette, or section-heading markup in multiple places.
- Do not create a utility function for a one-line expression unless it genuinely clarifies repeated logic. Avoid both copy-paste and unnecessary abstraction.

### 2. Preserve existing project conventions

- Use the existing Next.js App Router, TypeScript, Tailwind CSS v4, shadcn configuration, aliases, and Biome setup.
- Do not migrate to another framework, change package managers, replace Tailwind v4 with v3, or rewrite `components.json` without a demonstrated need.
- Inspect existing shadcn component exports before importing them. Reuse installed components; add a new shadcn component only when the UI actually needs it.
- Do not edit generated files such as `next-env.d.ts` or build output.

### 3. Make the smallest coherent change

- Before editing, inspect the target file and its imports/callers.
- Keep each step scoped to its stated responsibilities. Do not rewrite a working earlier step to suit a later component.
- Preserve existing behavior unless the requirement explicitly changes it.
- Do not make unrelated formatting/configuration changes during feature work.

### 4. Keep the theme centralized

- `src/app/globals.css` owns the design tokens and whole-page background treatment.
- Use semantic theme utilities throughout the site. Avoid one-off arbitrary colors and conflicting per-component palettes.
- Maintain contrast over the background image with a consistent overlay/surface strategy.
- Do not set a different page background image independently on each section.

### 5. Keep the site static and truthful

- No backend integration, database, authentication, unnecessary API calls, or secrets in browser code.
- Do not invent personal achievements, project metrics, experience, skills, or challenges.
- A future improvement must be labelled as a future idea, not an existing feature.
- A contact form must not claim email delivery unless a real, tested delivery mechanism exists.

### 6. Use client components only when needed

- Prefer Server Components for static content and layout.
- Add `"use client"` only to components that need browser state or event handlers, such as mobile navigation, dialogs, or contact-form interactions.
- Keep client-side boundaries small. Do not turn the entire page into a Client Component merely because one child is interactive.

### 7. Accessibility and responsive behavior are requirements

- Use semantic elements, correct heading hierarchy, visible focus styles, accessible labels, descriptive image alternatives, and keyboard-operable controls.
- Do not use clickable `<div>` elements when a button or link is appropriate.
- Test mobile layout and long text/URLs; avoid fixed widths that cause overflow.

### 8. Validate after each step

- Complete the step's acceptance gate before starting the next step.
- After a change, run the smallest relevant lint/build checks; run the full production build in Step 5.
- If a check fails, fix the root cause before adding more features. Do not stack new changes on top of a known broken build.
- If a source file or requirement is missing/ambiguous, report the gap and ask one targeted question instead of guessing.

### 9. LLM handoff protocol

At the start of each step, the LLM must:

1. Read this plan and the exact files it intends to modify.
2. State the step's scope and list the files it expects to change.
3. Implement only that step.
4. Report files changed, design/architecture decisions, checks run, results, and any unresolved issue.
5. Stop at the acceptance gate and wait for the next step rather than silently continuing into later steps.

**Definition of done:** A complete, accurate, responsive, accessible, recruiter-friendly static portfolio that follows the five-section order, uses the real background image as its page-wide visual foundation, reuses shared data/components, and passes the final quality checks.
