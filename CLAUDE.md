# [CLIENT_NAME] — Project CLAUDE.md

## Identity
You are building a website for [CLIENT_NAME]. Read the design system files before writing any code.

## Architecture
- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + pnpm
- UI primitives: shadcn/ui (src/components/ui/) — do NOT create duplicates
- Design intelligence: taste skill (.claude/skills/taste/) — READ before building any UI
- Custom components: src/components/{layout,sections,shared}/
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

## Composition Philosophy — "Page Blanche"
Every section is composed from scratch for each client. Once the brief and design tokens are set, build section by section using the taste skill rules + shadcn/ui primitives. Never start from pre-built templates — each section is a unique response to the client's identity, content, and conversion goals.

## Rules
- **Page blanche**: compose every section from scratch using taste skill + shadcn/ui primitives — never from pre-built components
- examples/sections/ exists as loose inspiration only — do NOT import, do NOT copy-paste verbatim
- Use existing shadcn/ui components — do not create duplicates
- Use CSS variables from globals.css for all token values — no hardcoded colors
- Button component uses base-ui (no asChild) — use buttonVariants() + Link for nav links
- All GSAP code must be in "use client" components using the use-gsap hook
- Respect prefers-reduced-motion
- Every image must use next/image with sizes and alt props
- Every page must export generateMetadata
- Forms use Zod schemas from src/lib/validation/
- params and searchParams are Promises in Next.js 15+ — always await
- 1-3 tasks at a time. Show result before continuing.

## Design Intelligence — taste skill + shadcn/ui

BEFORE building any UI (new page, new section, new component), follow this process:

### Step 1: Read the taste skill
Read `.claude/skills/taste/SKILL.md` to internalize the design engineering rules (bias correction, typography, color, layout, motion, forbidden patterns).

### Step 2: Check the dials
The taste skill has 3 dials (DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY) at baseline (8, 6, 4). Adjust based on the client brief and user requests. These dials drive layout, animation, and spacing decisions.

### Step 3: Build with shadcn/ui primitives
Compose UI using existing shadcn components (Button, Card, Badge, Separator, Accordion, etc.).
The taste skill provides the "what" (rules, anti-patterns, creative arsenal) — shadcn provides the "how" (accessible components).

### Step 4: Run the pre-flight check
Before delivering, run through Section 9 (Pre-Flight Check) of the taste skill.

## File Structure
src/app/(site)/ — all pages with shared nav+footer layout
src/app/api/ — API routes (outside site layout)
src/components/ui/ — shadcn/ui primitives (do not modify directly)
src/components/layout/ — navbar, footer, breadcrumb
src/components/sections/ — functional section components (contact form, blog list/article)
examples/sections/ — loose inspiration for common patterns (hero, features, pricing, etc.) — NOT imported, NOT copy-pasted verbatim
src/components/animations/ — scroll animation wrappers (AnimateOnScroll, StaggerChildren, CountUp)
src/components/shared/ — SEO, GTM, cookies, utilities
src/lib/content/ — content layer (Sanity or static)
src/lib/hooks/ — custom hooks (GSAP, media query, form, etc.)
src/lib/animations/ — GSAP config and low-level animation functions

## Design System — Additional Files
8. design-system/client-brief.md — client identity, brand personality, visual direction (READ for context)
9. design-system/checklist.md — pre-deploy quality gate (RUN before every launch)

## Workflows — How the Developer Iterates

### 0. Redesign from Existing Site
The developer provides a URL of the client's current site and wants a full redesign using the boilerplate.

**Process (skill: site-analyzer):**
1. Crawl 5-9 key pages using WebFetch (home, about, services, contact, pricing, team, portfolio, blog, legal)
2. Extract all content: services, testimonials, team, stats, CTAs, tone, colors, typography
3. Synthesize a Business Profile (identity, value proposition, visual identity, conversion structure)
4. Plan a section-by-section page structure tailored to the client's content and goals
5. Generate pre-filled `client.config.ts` values and `client-brief.md`
6. Present a Redesign Proposal — **wait for developer approval before building**

**Rules:**
- Always present the proposal before generating any code
- Extract real content — don't use placeholder text when real data exists
- Never copy the visual design verbatim — use the project's own design tokens
- Detect language and set `locale` accordingly
- If WebFetch fails on some pages (SPA, auth-gated), note it and work with what's available

**Example prompts:**
- `"Analyse le site example.com et propose un redesign"`
- `"Crawle basanto.fr et pré-remplis le client-brief + la config"`
- `"Fais une analyse complète de competitor.com pour comprendre leur positionnement"`

### 1. Inspiration Screenshot
The developer sends a screenshot + HTML/CSS from another site to adapt for the client.

**Rules:**
- Always read `design-system/client-brief.md` first to understand the client's visual identity
- Read the taste skill's Creative Arsenal (Section 8) for pattern ideas
- NEVER copy colors, fonts, or spacing from the inspiration — adapt everything to the project's design tokens from `globals.css`
- Compose the section from scratch with shadcn/ui primitives, using the screenshot as directional inspiration only
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
2. Read the taste skill — check which DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY fits the page type
3. Create the route in `src/app/(site)/`
4. Export `generateMetadata` with unique title + description
5. Compose each section from scratch with shadcn/ui primitives, guided by taste skill rules — do not start from templates
6. Use shadcn/ui primitives (Card, Button, Badge, Separator, Accordion, etc.) as building blocks
7. Follow the SITE conversion pattern from `design-system/patterns.md` (Hook → Value → Proof → CTA)
8. Run the taste skill's Pre-Flight Check (Section 9) before delivering
9. Test at 375px, 768px, 1440px mentally (or flag if unsure about responsive behavior)
10. Add the page to `sitemap.ts` static pages array

### 5. Pre-Launch Polish
The developer runs Lighthouse, checks accessibility, fixes responsive issues.

**Rules:**
- Follow `design-system/checklist.md` item by item
- Run the taste skill's Pre-Flight Check (Section 9) as a validation pass
- Check taste skill Section 5 (Performance Guardrails) for any performance concern
- Fix issues in order of impact: performance > accessibility > SEO > cosmetic
- Do not refactor working code while fixing issues — separate concerns
- Report each fix individually so the developer can track progress

## Project Setup

### First-time setup
1. Edit `client.config.ts` with client details (name, colors, pages, features)
2. Run `pnpm setup` to apply configuration across the project
3. Fill `design-system/client-brief.md` with brand context
4. Read the taste skill and apply design direction based on the brief
5. Record design decisions in `design-system/decisions.md`
6. Run `pnpm dev` and start building

### From existing site (redesign)
1. Ask Claude: `"Analyse le site https://client.com et propose un redesign"`
2. The site-analyzer skill crawls key pages and extracts all business content
3. Review and approve the Redesign Proposal (config + brief + page mapping)
4. Claude applies `client.config.ts` → `pnpm setup` → `pnpm design`
5. Iterate with real content from day 1

### Re-configuration
Edit `client.config.ts` and run `pnpm setup` again — it's idempotent.

### New project from boilerplate
```bash
./scripts/create-client.sh "Client Name" client-slug
```

## Site Type: marketing
## Locale: fr
## CMS: static
