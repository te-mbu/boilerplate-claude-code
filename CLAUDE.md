# [CLIENT_NAME] — Project CLAUDE.md

## Identity
You are building a website for [CLIENT_NAME]. Read the design system files before writing any code.

## Architecture
- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + pnpm
- UI primitives: shadcn/ui (src/components/ui/) — do NOT create duplicates
- Custom components: src/components/{layout,sections,engine,shared}/
- Animations: GSAP (client-only, use-gsap hook, respect prefers-reduced-motion)
- CMS: Content layer abstraction (src/lib/content/) — toggle via CONTENT_PROVIDER env
- Deployment: Vercel
- Forms: Server Actions + Zod validation + webhook to Make/n8n
- i18n: next-intl (optional, disable in middleware for monolingual)

## Design System — READ BEFORE CODING
1. design-system/tokens.md — colors, spacing, typography (source of truth)
2. design-system/components.md — component inventory with variants
3. design-system/patterns.md — layout patterns, conversion structure, responsive
4. design-system/principles.md — design principles (follow strictly)
5. design-system/accessibility.md — WCAG 2.1 AA rules
6. design-system/motion.md — GSAP animation rules
7. design-system/decisions.md — governance rules from past reviews (HIGHEST PRIORITY)

## Rules
- Use existing shadcn/ui components — do not create duplicates
- Use CSS variables from globals.css for all token values — no hardcoded colors
- All GSAP code must be in "use client" components using the use-gsap hook
- Respect prefers-reduced-motion
- Every image must use next/image with sizes and alt props
- Every page must export generateMetadata
- Forms use Zod schemas from src/lib/validation/
- params and searchParams are Promises in Next.js 15+ — always await
- 1-3 tasks at a time. Show result before continuing.

## File Structure
src/app/(site)/ — all pages with shared nav+footer layout
src/app/api/ — API routes (outside site layout)
src/components/ui/ — shadcn/ui primitives (do not modify directly)
src/components/layout/ — navbar, footer, breadcrumb
src/components/sections/ — page sections (hero, features, pricing, etc.)
src/components/engine/ — AI chatbot, diagnostic form
src/components/shared/ — SEO, GTM, cookies, utilities
src/lib/content/ — content layer (Sanity or static)
src/lib/hooks/ — custom hooks (GSAP, media query, form, etc.)
src/lib/animations/ — GSAP config and presets

## Design System — Additional Files
8. design-system/client-brief.md — client identity, brand personality, visual direction (READ for context)
9. design-system/checklist.md — pre-deploy quality gate (RUN before every launch)

## Workflows — How the Developer Iterates

### 1. Inspiration Screenshot
The developer sends a screenshot + HTML/CSS from another site to adapt for the client.

**Rules:**
- Always read `design-system/client-brief.md` first to understand the client's visual identity
- NEVER copy colors, fonts, or spacing from the inspiration — adapt everything to the project's design tokens from `globals.css`
- Rewrite the HTML to use existing shadcn/ui components and section components from `src/components/sections/`
- If no existing section component fits, create a new one in `src/components/sections/` following the same pattern (typed props, server component by default, responsive)
- Save the original screenshot in `references/` for future reference
- Explain what you adapted and what you deliberately changed to fit the client's brand

### 2. Section Iteration
The developer wants to try variants of a section ("make it bolder", "more compact", "add a gradient").

**Rules:**
- Modify the existing section component directly — do not create a copy unless the developer asks for an A/B comparison
- For A/B comparison: create a variant with a suffix (e.g., `hero-centered-v2.tsx`) and let the developer choose, then delete the other
- Always show the result before continuing to the next change
- Keep changes scoped to what was asked — do not "improve" surrounding code
- If the change affects the design system (new color, new spacing), propose adding a token rather than hardcoding

### 3. Design System Review
The developer looks at the site and wants to adjust global design tokens ("primary is too dark", "cards need more shadow").

**Rules:**
- Changes go in `globals.css` (CSS variables) and nowhere else
- Update both `:root` (light) and `.dark` (dark) if the change affects color
- After the change, list which components are affected so the developer can review
- If the change is a recurring decision (e.g., "we always want border on cards"), add it to `design-system/decisions.md`

### 4. New Page from Brief / Figma
The developer provides a brief, wireframe, or Figma and wants a full page built.

**Rules:**
1. Read `design-system/client-brief.md` and `design-system/patterns.md` before starting
2. Create the route in `src/app/(site)/`
3. Export `generateMetadata` with unique title + description
4. Compose the page from existing section components first — only create new sections if needed
5. Follow the SITE conversion pattern from `design-system/patterns.md` (Hook → Value → Proof → CTA)
6. Test at 375px, 768px, 1440px mentally (or flag if unsure about responsive behavior)
7. Add the page to `sitemap.ts` static pages array

### 5. Pre-Launch Polish
The developer runs Lighthouse, checks accessibility, fixes responsive issues.

**Rules:**
- Follow `design-system/checklist.md` item by item
- Fix issues in order of impact: performance > accessibility > SEO > cosmetic
- Do not refactor working code while fixing issues — separate concerns
- Report each fix individually so the developer can track progress

## Project Setup

### First-time setup
1. Edit `client.config.ts` with client details (name, colors, pages, features)
2. Run `pnpm setup` to apply configuration across the project
3. Fill `design-system/client-brief.md` with brand context
4. Run `pnpm dev` and start building

### Re-configuration
Edit `client.config.ts` and run `pnpm setup` again — it's idempotent.

### New project from boilerplate
```bash
./scripts/create-client.sh "Client Name" client-slug
```

## Site Type: marketing
## Locale: fr
## CMS: static
