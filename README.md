# Terence Next.js Boilerplate

A production-ready Next.js 16 boilerplate designed to scaffold any type of website — landing pages, marketing sites, corporate + blog, portfolios, SaaS, bilingual, and sites with an AI "Engine" (chatbot + diagnostic).

Built to work with **Claude Code** for rapid, AI-assisted development.

## Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS 4 (CSS-first, no `tailwind.config.ts`)
- **UI:** shadcn/ui (17 components, base-ui primitives)
- **Animation:** GSAP (ScrollTrigger, client-only, free license)
- **CMS:** Sanity v3 (optional — toggle with env var)
- **Forms:** Server Actions + Zod + react-hook-form
- **i18n:** next-intl (optional — disable in middleware)
- **Analytics:** GTM + cookie consent
- **Deploy:** Vercel

## Quick Start

```bash
# 1. Clone or copy the boilerplate
cp -r terence-nextjs-boilerplate my-client-project
cd my-client-project

# 2. Install dependencies
pnpm install

# 3. Set up environment
cp .env.local.example .env.local
# Edit .env.local with your values

# 4. Run dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CONTENT_PROVIDER` | Yes | `static` (default) or `sanity` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Your site URL |
| `NEXT_PUBLIC_SITE_NAME` | Yes | Client/brand name |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | If Sanity | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | If Sanity | Dataset name (usually `production`) |
| `SANITY_API_TOKEN` | If Sanity | Read token for server-side queries |
| `WEBHOOK_CONTACT` | Optional | Make/n8n webhook URL for contact form |
| `WEBHOOK_DIAGNOSTIC` | Optional | Webhook for diagnostic results |
| `WEBHOOK_NEWSLETTER` | Optional | Webhook for newsletter signups |
| `NEXT_PUBLIC_GTM_ID` | Optional | Google Tag Manager container ID |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | Optional | Default locale (`fr` or `en`) |

## Project Types

This boilerplate supports all common site types. When starting a project, update `CLAUDE.md` to set the site type, locale, and CMS choice:

| Type | What to use | What to remove/disable |
|------|-------------|----------------------|
| **Landing** | `/` page only, sections stacked | Remove blog routes, engine routes |
| **Marketing** | `/`, `/about`, `/services`, `/contact`, `/portfolio` | Remove blog if not needed |
| **Corporate + Blog** | All routes, Sanity CMS on | Keep everything |
| **Portfolio** | `/`, `/portfolio`, `/about`, `/contact` | Remove blog, engine, pricing |
| **SaaS** | `/`, `/features`, `/pricing`, `/changelog`, `/blog` | Remove engine if not needed |
| **Bilingual** | Any type above + i18n middleware enabled | Add translations in `src/messages/` |
| **Engine** | Any type above + `/engine/*` routes | Keep engine components |

## Architecture

### Route Groups

All pages live inside the `(site)` route group which provides a shared layout with Navbar + Footer. Only API routes live outside this group.

```
src/app/
  (site)/              # Shared Navbar + Footer layout
    page.tsx           # Home
    about/
    services/
    pricing/
    contact/
    portfolio/
    features/
    team/
    changelog/
    blog/
      page.tsx         # Blog listing
      [slug]/          # Individual post
      category/[category]/
    engine/
      diagnostic/      # Multi-step form
      results/         # Results + recommendations
    legal/
      privacy/
      terms/
      mentions-legales/
  api/                 # API routes (no layout)
    contact/
    newsletter/
    diagnostic/
    revalidate/        # Sanity webhook for ISR
    draft/             # Sanity preview mode
```

### Content Layer

The content layer abstracts the data source. Components call `getContentProvider()` without knowing whether data comes from Sanity or local static files.

```typescript
import { getContentProvider } from "@/lib/content";

// In any server component or page:
const content = await getContentProvider();
const posts = await content.getBlogPosts({ limit: 3, featured: true });
const settings = await content.getSiteSettings();
```

**Toggle with `CONTENT_PROVIDER` env var:**
- `static` — Uses `StaticContentProvider` with placeholder data in `src/lib/content/static-provider.ts`. Perfect for development and sites without a CMS.
- `sanity` — Uses `SanityContentProvider` with GROQ queries against your Sanity project.

**Available methods:**

| Method | Returns |
|--------|---------|
| `getSiteSettings()` | Site name, logo, contact info, social links |
| `getBlogPosts(options?)` | Blog posts (filter by category, featured, limit) |
| `getBlogPost(slug)` | Single blog post |
| `getCategories()` | Blog categories |
| `getTestimonials(options?)` | Client testimonials |
| `getTeamMembers()` | Team members |
| `getServices()` | Services list |
| `getProjects(options?)` | Portfolio projects |
| `getProject(slug)` | Single project |
| `getFAQs(group?)` | FAQ entries |
| `getChangelogEntries()` | Changelog entries |

### Components

**UI Primitives (`src/components/ui/`)** — 17 shadcn/ui components. Do not modify directly; customize via CSS variables in `globals.css`.

**Layout (`src/components/layout/`):**
- `Navbar` — Sticky, transparent-to-solid on scroll, responsive
- `NavbarMobile` — Drawer-based mobile menu
- `Footer` — Multi-column with newsletter form
- `Breadcrumb` — Auto-generated from route with JSON-LD
- `SkipToContent` — Accessibility skip link

**Sections (`src/components/sections/`)** — 20 pre-built sections:
- Hero: `HeroCentered`, `HeroSplit`
- Social Proof: `LogoCloud`, `TestimonialsGrid`
- Features: `FeaturesGrid`, `FeaturesAlternating`
- Pricing: `PricingCards`, `PricingToggle`
- Blog: `BlogCard`, `BlogList`, `BlogArticle`
- CTA: `CTACentered`, `CTANewsletter`
- FAQ: `FAQSection`
- Contact: `ContactForm`, `ContactInfo`
- Portfolio: `PortfolioGrid`
- Team: `TeamGrid`
- Changelog: `ChangelogList`

**Engine (`src/components/engine/`):**
- `ChatbotWidget` — Floating chat widget
- `DiagnosticForm` / `DiagnosticStep` / `DiagnosticProgress` — Multi-step diagnostic
- `DiagnosticResult` — Score display with recommendations
- `BookingEmbed` — Embed external booking (Calendly, Cal.com)

**Shared (`src/components/shared/`):**
- `GTM` — Google Tag Manager script
- `Analytics` — Page view tracking
- `CookieConsent` / `CookieSettings` — GDPR-compliant consent
- `ThemeToggle` — Dark/light mode switch
- `LanguageSwitcher` — FR/EN toggle
- `ScrollToTop` — Scroll-to-top button
- `AnnouncementBar` — Dismissible top bar
- `ErrorBoundary` — Client error boundary

### Design System

The `design-system/` folder contains 7 markdown files that Claude Code reads before writing any code:

| File | Purpose |
|------|---------|
| `tokens.md` | Colors, typography, spacing, shadows — the source of truth |
| `components.md` | Component inventory with all variants |
| `patterns.md` | Layout patterns, responsive breakpoints, conversion structures |
| `principles.md` | 5 design principles to follow |
| `decisions.md` | Governance — design decisions from past reviews (grows over time) |
| `accessibility.md` | WCAG 2.1 AA baseline rules |
| `motion.md` | GSAP animation rules and motion design principles |

**Customizing for a client:** Update `tokens.md` with the client's brand colors, typography, and spacing. Then update `globals.css` `@theme inline` block to match. All components use CSS variables from the theme.

### Animations (GSAP)

GSAP is used client-only. All animation code must be in `"use client"` components.

```typescript
import { useGsap } from "@/lib/hooks/use-gsap";

function MyComponent() {
  const containerRef = useGsap((gsap, container) => {
    gsap.from(container.querySelectorAll(".item"), {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
    });
  });

  return <div ref={containerRef}>...</div>;
}
```

8 animation presets available in `src/lib/animations/presets/`:
`fade-in`, `slide-up`, `stagger`, `parallax`, `counter`, `text-reveal`, `magnetic`, `page-transition`

### Forms & Webhooks

Forms use Server Actions + Zod validation. On submission, data is validated server-side and forwarded to a webhook URL (Make.com or n8n).

```
User fills form -> Client validation (react-hook-form + Zod)
                -> Server Action validates again (Zod)
                -> Webhook sent to Make/n8n
                -> Response returned to client
```

Zod schemas are in `src/lib/validation/`. Webhook sender is in `src/lib/webhooks/send.ts`.

3 API routes handle form submissions:
- `POST /api/contact` — Contact form
- `POST /api/newsletter` — Newsletter signup
- `POST /api/diagnostic` — Diagnostic results

### i18n

i18n uses `next-intl`. Translations are in `src/messages/fr.json` and `en.json`.

**To enable:** The middleware at `middleware.ts` handles locale routing. It's active by default.

**To disable (monolingual site):** Comment out or simplify the middleware to pass through without locale routing.

### Sanity CMS

When `CONTENT_PROVIDER=sanity`:

1. **Set env vars:** `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`
2. **Deploy schemas:** The `sanity/` folder contains 12 document schemas and 6 object schemas. Copy them to your Sanity Studio project.
3. **Revalidation:** Set up a Sanity webhook pointing to `https://your-site.com/api/revalidate?secret=YOUR_SECRET` with the `SANITY_REVALIDATE_SECRET` env var.
4. **Preview mode:** Use `/api/draft` for draft mode preview.

Schemas available:
- Documents: `post`, `category`, `author`, `testimonial`, `teamMember`, `service`, `project`, `faq`, `faqGroup`, `changelogEntry`, `page`, `siteSettings`
- Objects: `seo`, `portableText`, `imageWithAlt`, `cta`, `socialLink`, `codeBlock`

### SEO

- `src/lib/metadata.ts` — `createMetadata()` helper for consistent metadata across pages
- `src/lib/schema.ts` — JSON-LD generators (Organization, Website, Article, FAQ, BreadcrumbList)
- `src/app/sitemap.ts` — Auto-generated sitemap
- `src/app/robots.ts` — Robots.txt config

Every page should export `generateMetadata` or use `createMetadata()`.

## Working with Claude Code

This boilerplate is designed to be used with Claude Code. The `CLAUDE.md` file at the root is your control file.

### Setup for a new client

1. **Copy the boilerplate:**
   ```bash
   cp -r terence-nextjs-boilerplate client-project
   cd client-project
   ```

2. **Update `CLAUDE.md`:**
   - Replace `[CLIENT_NAME]` with the client name
   - Set the site type: `landing`, `marketing`, `corporate`, `portfolio`, `saas`, `bilingual`, or `engine`
   - Set the locale: `fr`, `en`, or `fr+en`
   - Set the CMS: `sanity` or `static`

3. **Update the design system:**
   - Run the brand extraction skill: tell Claude "extrais la marque de [client website or brief]"
   - Claude will populate `design-system/tokens.md` and update `globals.css` `@theme inline` block

4. **Build the site:**
   - Tell Claude which pages you need
   - Claude will assemble pages from the section components
   - Claude reads the design system before writing any code

### Claude Code Skills

Custom skills are in `.claude/skills/custom/`:

| Skill | How to trigger |
|-------|---------------|
| Brand Extraction | "extrais la marque de [url/brief]" |
| UX Audit | "audite [url]" |
| Competitor Research | "analyse les concurrents de [client]" |
| Deploy | "deploie" |
| QA Checklist | "QA avant livraison" |
| Client Handoff | "prepare la livraison [client]" |

Additional skills (install from source repos):
- `.claude/skills/nextjs/` — Next.js App Router patterns (wsimmonds/claude-nextjs-skills)
- `.claude/skills/seo/` — SEO audit & optimization (AgriciDaniel/claude-seo)
- `.claude/skills/blog/` — Content lifecycle management (AgriciDaniel/claude-blog)
- `.claude/skills/claudify/` — Codebase cleanup (OriStav/claudify)
- `.claude/skills/frontend-design.md` — Design quality guidelines (Anthropic)

### Key Rules for Claude Code

These rules are enforced via `CLAUDE.md`:

- Use existing shadcn/ui components — never create duplicates
- Use CSS variables from `globals.css` — no hardcoded colors
- GSAP code must be in `"use client"` components using the `use-gsap` hook
- Respect `prefers-reduced-motion`
- Every image uses `next/image` with `sizes` and `alt`
- Every page exports `generateMetadata`
- `params` and `searchParams` are Promises in Next.js 15+ — always `await`
- Forms use Zod schemas from `src/lib/validation/`

## Tailwind CSS 4 — CSS-first

Tokens are defined in `src/app/globals.css` via `@theme inline {}`. There is no `tailwind.config.ts`.

```css
@import "tailwindcss";

@theme inline {
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.145 0 0);
  --color-primary: oklch(0.205 0.035 265);
  /* ... all tokens here ... */
}
```

To customize for a client, update the values in `@theme inline {}`. All components reference these CSS variables automatically.

Dark mode tokens use `@custom-variant` or media queries — update accordingly.

## Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| Dev server | `pnpm dev` | Start development server |
| Build | `pnpm build` | Production build |
| Start | `pnpm start` | Start production server |
| Lint | `pnpm lint` | Run ESLint |

Additional scripts in `scripts/` (run manually):
- `optimize-images.ts` — Batch image optimization with Sharp
- `lighthouse-audit.ts` — Lighthouse score check (target 90+)
- `generate-og-images.ts` — OG image generation with Satori
- `deploy.sh` — Build + lint + deploy to Vercel
- `scaffold-project.ts` — Clone + customize for a new client

## Deployment

```bash
# Build and check
pnpm build

# Deploy to Vercel
vercel --prod
```

Set all environment variables in your Vercel project settings.

## Important Next.js 16 Notes

1. **`params` and `searchParams` are Promises** — Always `await` them:
   ```typescript
   export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
     const { slug } = await params;
   }
   ```

2. **No aggressive caching by default** — Use `revalidateTag()` with cache tags for Sanity content. Static pages use `force-static`.

3. **`revalidateTag` requires a second argument** — `revalidateTag("sanity", "max")` (not just `revalidateTag("sanity")`).

## License

Private boilerplate. Not for redistribution.
