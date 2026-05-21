---
name: site-analyzer
description: Analyze an existing website to extract business context, content, and structure — then map it to the boilerplate's components for a redesign. Uses WebFetch (free, built-in). No API key needed.
---

# Site Analyzer

## Purpose

Extract maximum business context from an existing website and map it to this boilerplate's component catalogue — enabling fast redesign with real content instead of placeholders.

## When to Use

- A client has an existing site and wants a redesign
- You need to understand a business before building their new site
- You want to pre-fill `client-brief.md` and page content from a live URL
- You're doing competitor analysis for a client in the same industry

## Process — 4 Phases

### Phase 1: Deep Crawl (extract raw content)

Crawl the site's key pages using WebFetch. Always fetch these pages in this order:

```
1. Homepage (/)
2. About page (/about, /a-propos, /qui-sommes-nous, /company)
3. Services page (/services, /solutions, /what-we-do, /nos-services)
4. Contact page (/contact, /nous-contacter)
5. Pricing page (/pricing, /tarifs, /plans) — if it exists
6. Blog/Resources (/blog, /resources, /actualites) — just the listing
7. Team page (/team, /equipe, /notre-equipe) — if it exists
8. Case studies/Portfolio (/portfolio, /case-studies, /realisations, /projets)
9. Legal pages (/mentions-legales, /privacy, /legal) — quick scan for company legal name & address
```

**For each page**, use WebFetch with this prompt pattern:

```
Extract ALL of the following from this page. Return structured data, not a summary:

1. HEADINGS: Every h1, h2, h3 with their hierarchy
2. VALUE PROPOSITIONS: Any benefit statements, taglines, or promises
3. SERVICES/FEATURES: Names, descriptions, icons mentioned
4. STATISTICS: Any numbers with labels (clients, projects, years, revenue)
5. TESTIMONIALS: Name, role, company, quote — for each
6. TEAM MEMBERS: Name, role, photo description — for each
7. CALL-TO-ACTION: Button texts and where they link
8. SOCIAL PROOF: Client logos mentioned, certifications, awards
9. CONTACT INFO: Email, phone, address, social links
10. VISUAL OBSERVATIONS: Colors mentioned in CSS, overall layout structure, image descriptions
11. NAVIGATION: Menu structure (all links and labels)
12. FOOTER: All footer links and content
13. META: Page title, meta description, OG tags if visible
```

**Handling common URL patterns:**

If the homepage doesn't have obvious nav links, try common URL patterns:
- French sites: `/a-propos`, `/nos-services`, `/contact`, `/realisations`, `/equipe`, `/tarifs`
- English sites: `/about`, `/services`, `/contact`, `/portfolio`, `/team`, `/pricing`
- SaaS: `/features`, `/pricing`, `/docs`, `/blog`, `/changelog`

### Phase 2: Structure Analysis (understand the business)

After crawling, synthesize the extracted data into a **Business Profile**:

```markdown
## Business Profile — [Company Name]

### Identity
- **Legal name:** [from legal pages or footer]
- **Brand name:** [from logo/nav]
- **Industry:** [inferred from content]
- **Business model:** [B2B / B2C / SaaS / service / e-commerce]
- **Location:** [from contact page]
- **Year founded:** [if found]

### Value Proposition
- **One-liner:** [the main headline or tagline]
- **Target audience:** [who the site speaks to]
- **Key differentiator:** [what makes them unique vs competitors]
- **Pain point addressed:** [what problem they solve]

### Services/Products
For each service found:
- **Name:** [service name]
- **Description:** [1-2 sentences]
- **Key features:** [bullet points]

### Social Proof
- **Client logos:** [list]
- **Testimonials:** [list with name, role, company, quote]
- **Statistics:** [list with number + label]
- **Awards/Certifications:** [list]

### Team (if found)
For each member:
- **Name:** [name]
- **Role:** [title]
- **Bio:** [short bio if available]

### Content Inventory
- **Total pages found:** [count]
- **Blog posts:** [count, last publish date]
- **Case studies:** [count]
- **Languages:** [fr / en / bilingual]
- **Tone:** [formal/casual, tu/vous, technical/accessible]

### Visual Identity (observed)
- **Primary color:** [observed dominant color]
- **Secondary/accent:** [observed]
- **Typography feel:** [serif/sans-serif, geometric/humanist]
- **Layout density:** [airy/balanced/dense]
- **Image style:** [photos/illustrations/icons/3D]
- **Shape language:** [sharp/rounded/pill]

### Conversion Structure
- **Primary CTA:** [main action button text + destination]
- **Secondary CTA:** [if any]
- **Conversion funnel:** [describe the path: homepage → service → contact?]

### Technical Observations
- **Current stack:** [if detectable — WordPress, Webflow, custom, etc.]
- **Performance impression:** [fast/slow/heavy images]
- **Mobile responsive:** [yes/no/partial]
- **SEO basics:** [meta tags present, sitemap, structured data]
```

### Phase 3: Boilerplate Mapping (plan the redesign)

Map the extracted content to the boilerplate's component catalogue:

#### Recommended siteType

Based on the business profile, recommend a `siteType`:

| Business Pattern | Recommended siteType |
|---|---|
| Single product/service, one conversion goal | `landing` |
| Multiple services, brand-focused, content marketing | `marketing` |
| Established company, trust-focused, institutional | `corporate` |
| Creative work showcase, visual portfolio | `portfolio` |
| Software product, feature-driven, pricing tiers | `saas` |

#### Section-by-Section Mapping

For each section of the new site, map extracted content to a specific component:

```markdown
## Page: Homepage

### Section 1 — Hero
- **Component:** HeroCentered / HeroSplit / HeroCinematic
- **Heading:** [extracted main headline or rewritten version]
- **Subheading:** [extracted tagline or value prop]
- **Primary CTA:** [extracted CTA text] → [destination]
- **Secondary CTA:** [if any]
- **Image:** [description of hero image needed]
- **Why this variant:** [justify the choice]

### Section 2 — Social Proof
- **Component:** LogoCloud
- **Logos:** [list of client logos extracted]
- **Why:** [e.g., "They have 12 recognizable client logos — use them early"]

### Section 3 — Features
- **Component:** FeaturesGrid (columns: 3)
- **Features:**
  1. [Service name] — [description] — [suggested icon]
  2. [Service name] — [description] — [suggested icon]
  3. [Service name] — [description] — [suggested icon]
- **Why this variant:** [justify grid vs alternating]

[... continue for all sections ...]
```

#### Page Plan

```markdown
## Pages to Create

| Page | Route | Source Content | Components |
|---|---|---|---|
| Homepage | `/` | Main page + value props | Hero, LogoCloud, FeaturesGrid, StatsBar, Testimonials, CTA |
| About | `/about` | About page | HeroSplit, ProcessSteps, TeamGrid, StatsBar |
| Services | `/services` | Services page | HeroCentered, FeaturesAlternating, ComparisonCards, CTA |
| Contact | `/contact` | Contact page | ContactForm, ContactInfo |
| Blog | `/blog` | Blog listing | BlogGrid (existing) |
| [etc.] | | | |
```

### Phase 4: Pre-fill Configuration (generate ready-to-use config)

Generate the actual configuration files from extracted data:

#### 1. client.config.ts values

```typescript
{
  name: "[extracted company name]",
  slug: "[kebab-case slug]",
  url: "[current site URL]",
  tagline: "[extracted tagline]",
  headingFont: "[suggested based on observed typography]",
  locale: "[detected language]",
  cms: "static",
  siteType: "[recommended]",
  theme: {
    primary: "[extracted or suggested hex]",
    cta: "[extracted or suggested hex]",
    success: "#16a34a",
    destructive: "#dc2626",
    radius: "[suggested based on observed shape language]",
  },
  pages: {
    home: true,
    about: [true if about content found],
    services: [true if services content found],
    pricing: [true if pricing content found],
    features: [true if features page found],
    portfolio: [true if portfolio content found],
    team: [true if team content found],
    blog: [true if blog content found],
    changelog: false,
    contact: [true if contact info found],
    legal: true,
    engine: false,
  },
}
```

#### 2. client-brief.md (pre-filled)

Generate a filled version of `design-system/client-brief.md` with all extracted data in the correct fields.

#### 3. Content data files

For static CMS, generate content data files with real extracted content:
- `src/lib/content/data/services.ts` — extracted services
- `src/lib/content/data/testimonials.ts` — extracted testimonials
- `src/lib/content/data/team.ts` — extracted team members
- `src/lib/content/data/stats.ts` — extracted statistics

## Output Format

After completing all 4 phases, present a **Redesign Proposal** to the developer:

```markdown
# Redesign Proposal — [Company Name]

## Business Summary
[2-3 sentences summarizing the business from Phase 2]

## Recommended Configuration
[client.config.ts values from Phase 4]

## Page Structure
[Section-by-section mapping from Phase 3 — table format]

## Content Ready to Use
- ✅ [count] services extracted
- ✅ [count] testimonials extracted
- ✅ [count] team members extracted
- ✅ [count] statistics extracted
- ✅ [count] client logos identified
- ⚠️ [what's missing and needs to be created]

## Design Direction
[Visual identity observations + suggestions for improvement]

## Next Steps
1. Review and approve this proposal
2. Apply config: edit client.config.ts → pnpm setup
3. Fill client-brief.md → pnpm design (for design tokens)
4. Start iterating page by page
```

## Rules

- **WebFetch is the primary tool.** No external API keys required. Works with any public website.
- **Fetch at least 5 pages** before synthesizing. Homepage alone is not enough.
- **Detect the language** from content and `<html lang>`. Set locale accordingly.
- **Never copy design verbatim.** Extract content and structure, but the visual redesign uses the project's own design system and tokens.
- **Handle failures gracefully.** If a URL returns 404 or blocks scraping, note it and try alternative URL patterns.
- **Respect robots.txt.** If a site blocks crawling, note it and work with whatever the homepage provides.
- **Always present the proposal before building.** Never start generating pages without developer approval of the mapping.

## Example Invocation

```
"Analyse le site example.com et propose un redesign avec le boilerplate"

"Crawle basanto.fr et pré-remplis le client-brief + la config"

"Fais une analyse complète de competitor.com pour comprendre leur positionnement"
```

## Limitations

- **JavaScript-heavy SPAs** may not render fully with WebFetch. Content behind client-side routing may be missed. For SPAs, try fetching known routes directly.
- **Authenticated content** (behind login) is not accessible.
- **Images cannot be downloaded** — only described. The developer will need to source new images.
- **Rate limiting** — some sites may block rapid successive fetches. Space requests if needed.

For sites where WebFetch is insufficient, install Crawl4AI MCP (free, self-hosted) for deeper crawling:
```bash
# Optional: install Crawl4AI MCP for complex sites
pip install crawl4ai
# Add to MCP config: github.com/sadiuysal/crawl4ai-mcp-server
```
