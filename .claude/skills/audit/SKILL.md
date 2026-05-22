---
name: audit
description: Audit the project for design system compliance, design quality, conversion structure, animation coverage, SEO, code quality, and impeccable anti-patterns. Extracts boilerplate improvement proposals from session friction. Run at the start of a session or before delivery.
---

# Project Audit

## Purpose

Automated quality gate that scans the codebase against the project's own rules AND evaluates the design quality against business objectives. This is not just a linter — it checks whether the site would impress visually, convert visitors, and ship without regressions. Produces a structured report with actionable fixes and extracts boilerplate improvement proposals from session friction.

## When to Use

- **Start of session** — Run `/audit` to understand the current state before making changes
- **Before delivery** — Run `/audit` after composing sections to catch violations
- **After major changes** — Run after refactoring, token changes, or new page composition
- **Periodic maintenance** — Run on the boilerplate itself to find drift

## How It Works

The audit has two phases:

**Phase 1 — Static scan:** Run `tsx scripts/audit.ts` which performs file-by-file scans on `src/` and reports violations grouped by category (categories 1-5). No external dependencies required.

**Phase 2 — Intelligent review (Claude-driven):** After the static scan, Claude silently performs categories 6-9 by reading the codebase and conversation history. These checks require understanding context — they cannot be reduced to regex.

After both phases, Claude appends the `=== DESIGN QUALITY ===`, `=== CONVERSION CHECK ===`, and `=== BOILERPLATE FEEDBACK ===` sections to the terminal output before asking the user how to proceed. This is mandatory.

## Audit Categories

### 1. Design Tokens (from decisions.md + tokens.md)

| Check | Rule | Severity |
|-------|------|----------|
| Hardcoded colors | No hex/rgb/hsl literals in className — use CSS variable tokens | Error |
| Hardcoded spacing | No `py-20`, `py-24`, etc. on `<section>` — use `py-section` tokens | Error |
| Hardcoded font sizes | No `text-4xl` on headings — use fluid tokens `text-(length:--text-display)` | Warning |
| Color literals in dark mode | No `dark:bg-gray-800` — use semantic tokens | Error |
| Raw `h-screen` | Must use `min-h-dvh` instead | Error |

### 2. Component Compliance (from decisions.md + CLAUDE.md)

| Check | Rule | Severity |
|-------|------|----------|
| Raw `<button>` | Must use `Button` component or `buttonVariants()` | Error |
| Raw `<img>` | Must use `next/image` with `sizes` prop | Error |
| `Image` without `sizes` | `next/image` must have `sizes` prop | Warning |
| Missing `generateMetadata` | Every page must export metadata | Error |
| `asChild` on Button | Not supported on base-ui Button — use `buttonVariants() + Link` | Error |
| Direct `fetch()` in pages | Must go through content layer | Warning |

### 3. Design Anti-Patterns (from impeccable shared design laws + absolute bans)

| Check | Rule | Severity |
|-------|------|----------|
| Emoji in code | No emojis in markup, text content, or alt text | Error |
| AI cliche words | No "Elevate", "Seamless", "Unleash", "Next-Gen", "Delve" in visible text | Warning |
| Placeholder names | No "John Doe", "Jane Smith", "Acme Corp" | Warning |
| Fake round numbers | No "99.99%", "10,000+" in visible text | Info |
| `text-purple` / `bg-purple` | Purple AI aesthetic banned | Warning |
| Three equal columns | Detect `grid-cols-3` without variation (same children) | Info |

### 4. Architecture (from CLAUDE.md)

| Check | Rule | Severity |
|-------|------|----------|
| `"use client"` on pages | Pages and layouts should not be client components | Error |
| Raw `useEffect` for GSAP | NEVER use `useEffect` for animations — use the `useGSAP()` hook from `@gsap/react` exclusively. Raw `useEffect` + GSAP bypasses automatic cleanup, causes memory leaks, and misses React 18 Strict Mode double-mount issues. | Error |
| `prefers-reduced-motion` | Client components with GSAP must check reduced motion | Warning |
| Raw `useEffect` for scroll | No `useEffect` + `addEventListener("scroll")` — use Lenis or ScrollTrigger | Warning |
| Import from `examples/` | Never import from `examples/sections/` | Error |
| `[TODO:` in code | Unresolved template placeholders | Warning |
| `[CLIENT_NAME]` remaining | Setup not run or incomplete | Error |

### 5. Performance (from impeccable motion laws + CLAUDE.md)

| Check | Rule | Severity |
|-------|------|----------|
| Animate layout props | No GSAP animations on `top`, `left`, `width`, `height` | Warning |
| Arbitrary z-index | No `z-[999]` or similar — use semantic layers | Info |
| Missing `aria-hidden` on decorative SVGs | Decorative elements need `aria-hidden="true"` | Info |
| Lenis not initialized | `smoothScroll: true` in config but no Lenis instance created in layout/provider | Warning |

### 6. Design Quality (Claude-driven — from CONTEXT.md + impeccable)

These checks require reading and understanding the actual page composition. Claude performs them after the static scan.

**6a. Client Brief Completeness**

Read `design-system/client-brief.md`. If it still contains `[e.g.,` placeholders, unfilled sections, or template text, flag it.

| Check | Rule | Severity |
|-------|------|----------|
| Brief not filled | `client-brief.md` contains placeholder text (`[e.g.,`, empty fields) | Error |
| Missing brand personality | Brand personality section empty — needed for impeccable register calibration | Warning |
| Missing conversion goals | Primary CTA and success metric not defined | Warning |

**6b. Taste Skill Dial Compliance**

Read the `siteType` from `CLAUDE.md` (bottom), look up the recommended dials from CONTEXT.md, and evaluate the composed sections against them.

| Check | Rule | Severity |
|-------|------|----------|
| Centered hero when VARIANCE > 4 | Centered hero layout banned at high DESIGN_VARIANCE — use split, asymmetric, or left-aligned | Warning |
| No asymmetry at VARIANCE >= 7 | All sections are symmetric grids — add offset, varied aspect ratios, or asymmetric whitespace | Warning |
| Static page at MOTION >= 5 | No `AnimateOnScroll`, `StaggerChildren`, or GSAP detected on any section — too static for the target motion level | Error |
| Packed layout at DENSITY <= 4 | Sections lack generous whitespace — use `py-section-lg`, larger gaps, `max-w-[65ch]` on text | Warning |

**6c. Animation Coverage**

Scan every page in `src/app/(site)/`. For each page, check if at least one section uses an animation wrapper (`AnimateOnScroll`, `StaggerChildren`, or direct GSAP).

| Check | Rule | Severity |
|-------|------|----------|
| Page without any animation | A page has zero animation wrappers — every page needs at least scroll-triggered reveals | Error |
| Hero without staggered entry | The first `<section>` of a page has no staggered animation (delays 0, 0.1, 0.2...) — hero must have choreographed entry | Warning |
| No animated artifacts on hero | Hero section has no interactive micro-UI — consider TypewriterFeed, GeometricMotif, or OrbitalDiagram to add life | Info |

### 7. Conversion Structure (Claude-driven — from patterns.md)

Read each page and check against the SITE framework (Hook → Value → Proof → CTA).

| Check | Rule | Severity |
|-------|------|----------|
| No CTA on page | Page has no `buttonVariants({ variant: "cta" })` or link to contact/pricing | Error |
| CTA only in hero | CTA appears only once — must repeat at least twice on landing pages (hero + dedicated CTA section) | Warning |
| No social proof | Page has no testimonials, stats, logos, or case studies — proof reduces perceived risk | Warning |
| Contact form not wired | `ContactForm` exists but `WEBHOOK_CONTACT` is empty in `.env.local` | Warning |

### 8. SEO Completeness (from checklist.md)

| Check | Rule | Severity |
|-------|------|----------|
| Missing structured data | No JSON-LD `<script>` in site layout — `organizationSchema` and `websiteSchema` required | Error |
| Missing sitemap | `src/app/sitemap.ts` does not exist or is empty | Error |
| Missing robots.txt | `src/app/robots.ts` does not exist | Warning |
| Missing OG image | No `og-default.jpg` or `opengraph-image` in public/ or app/ | Warning |
| Missing favicon | No `favicon.ico` or `icon` in app/ | Warning |
| Duplicate page titles | Multiple pages share the same `title` in metadata | Warning |

### 9. Continuous Improvement Extraction

This category is NOT a code scan. It runs after all other categories by analyzing the current conversation history.

**What Claude reviews:**
- Errors that were corrected more than once during the session (repeated mistakes = missing rule)
- Instructions the user had to repeat or clarify (unclear convention = documentation gap)
- Architecture friction encountered (workarounds, hacks, unexpected behavior = design flaw)
- Patterns the user explicitly approved or rejected (validated decisions = candidates for decisions.md)

**Rule:** If any of the above occurred during the session, Claude MUST generate a boilerplate issue proposal in the output. This is not optional. Every friction point is a signal that the boilerplate can be improved so the same issue never happens again on a future project.

**Open issues check:** Claude reads `BOILERPLATE-ISSUES.md` and flags any issues that the current session's work has resolved (so they can be marked as fixed).

**What gets proposed:**
- New rules for `design-system/decisions.md`
- Updates to `CLAUDE.md` instructions
- Fixes to `scripts/setup.ts` or `scripts/design.ts`
- New checks for `scripts/audit.ts`
- Clarifications in skill files

## Output Format

```
=== PROJECT AUDIT ===

ERRORS (must fix):
  [E001] src/app/(site)/about/page.tsx:14 — Hardcoded color: `bg-white`
  [E002] src/app/(site)/about/page.tsx — Missing `generateMetadata` export

WARNINGS (should fix):
  [W001] src/app/(site)/test/page.tsx:42 — AI cliche: "Seamless"
  [W002] src/components/foo.tsx:8 — Raw useEffect for GSAP — use useGSAP() hook

INFO (review manually):
  [I001] src/app/(site)/test/page.tsx:88 — Three equal grid-cols-3 detected

Summary: 2 errors, 2 warnings, 1 info

=== DESIGN QUALITY ===

Site type: portfolio | Dials: VARIANCE=9, MOTION=8, DENSITY=3

  [DQ1] WARNING — Hero is centered — should be asymmetric at VARIANCE=9
  [DQ2] ERROR — src/app/(site)/about/page.tsx has zero animations
  [DQ3] INFO — Hero has no animated artifacts — consider adding visual micro-UIs
  [DQ4] ERROR — client-brief.md still has placeholder text — fill before building

=== CONVERSION CHECK ===

  [CV1] ERROR — /about has no CTA — add at least one conversion link
  [CV2] WARNING — CTA only appears once on home page — repeat in a dedicated section
  [CV3] WARNING — No social proof section detected on home page
  [CV4] WARNING — WEBHOOK_CONTACT is empty — contact form will not fire

=== SEO CHECK ===

  [SE1] OK — Structured data present in layout
  [SE2] OK — sitemap.ts exists
  [SE3] WARNING — No og-default.jpg found
  [SE4] OK — favicon present

=== BOILERPLATE FEEDBACK ===

The following issues were identified from this session's conversation history.
Copy relevant entries to BOILERPLATE-ISSUES.md:

### [Title of the friction]
- **Issue:** [Description of the friction or repeated correction]
- **Fix applied:** [How it was solved in the current project]
- **Boilerplate action:** [What needs to be updated in the source CLAUDE.md, scripts, or templates to prevent this]

### Resolved from BOILERPLATE-ISSUES.md:
- #27 (navbar active link) — fixed in this session, mark as resolved

(No new issues found — session was clean.)
```

## Scoring

The audit produces a weighted score out of 100. Weights reflect the priorities from CONTEXT.md:

| Priority | Weight multiplier | Rationale |
|----------|-------------------|-----------|
| Design quality (categories 3, 6) | x1.5 | Priority #2 — "Awwwards-level par defaut" |
| Code quality (categories 1, 2, 4) | x1.0 | Priority #3 — clean code from Claude |
| Performance (category 5) | x1.0 | Priority #4 — Lighthouse 95+ |
| Conversion (category 7) | x1.25 | Direct business impact — sites must convert |
| SEO (category 8) | x0.75 | Priority #6 — important but less critical than design |

**Calculation:**

- Start at 100
- Each **error**: -(5 x weight)
- Each **warning**: -(2 x weight)
- Each **info**: -0 points (informational only)

| Score | Verdict |
|-------|---------|
| 95-100 | Ready to ship |
| 80-94 | Good — fix errors before launch |
| 60-79 | Needs work — multiple violations |
| < 60 | Major issues — review design system compliance |

## Integration

```bash
# Run the static scan
pnpm audit:project

# The script exits with code 1 if any errors are found
# Use in CI: pnpm audit:project || exit 1

# Full audit (static + Claude-driven) happens when Claude runs /audit
# Claude adds categories 6-9 on top of the script output
```
