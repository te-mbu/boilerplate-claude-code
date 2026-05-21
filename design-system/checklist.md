# Pre-Deploy Checklist

> Run through this before every client site launch. Each item must pass.

---

## Content & SEO

- [ ] All `[CLIENT_NAME]` and `[tagline]` placeholders replaced
- [ ] Every page has `generateMetadata` with unique title + description
- [ ] `sitemap.xml` generates correctly (visit `/sitemap.xml`)
- [ ] `robots.txt` is correct (visit `/robots.txt`)
- [ ] OG images render correctly (test with [opengraph.xyz](https://www.opengraph.xyz/))
- [ ] JSON-LD schema present on homepage (test with [Google Rich Results](https://search.google.com/test/rich-results))
- [ ] Favicon and apple-touch-icon set
- [ ] 404 page works and matches design
- [ ] All links work (no broken internal links)
- [ ] Blog posts have correct dates, authors, categories
- [ ] Legal pages filled with client-specific content (privacy, terms, mentions légales)

## Design & Responsiveness

- [ ] Site looks correct at 375px (iPhone SE)
- [ ] Site looks correct at 768px (iPad)
- [ ] Site looks correct at 1440px (Desktop)
- [ ] Site looks correct at 1920px (Large desktop)
- [ ] Dark mode works on all pages (if enabled)
- [ ] No horizontal scroll on any page at any breakpoint
- [ ] Images don't overflow containers
- [ ] Text is readable (no truncation, no overlap)
- [ ] Forms are usable on mobile
- [ ] Navbar mobile menu works correctly

## Performance

- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Lighthouse Best Practices ≥ 90
- [ ] Lighthouse SEO ≥ 90
- [ ] LCP < 2.5s on 4G connection
- [ ] No layout shift (CLS < 0.1)
- [ ] All images use `next/image` with `sizes` prop
- [ ] No unused JavaScript bundles (check Network tab)
- [ ] Fonts preloaded (no FOUT/FOIT)

## Accessibility

- [ ] Full keyboard navigation works (Tab, Enter, Escape)
- [ ] Skip-to-content link present and functional
- [ ] All images have meaningful `alt` text (or `alt=""` for decorative)
- [ ] Focus indicators visible on all interactive elements
- [ ] Color contrast passes WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Forms have labels, required indicators, error messages
- [ ] `prefers-reduced-motion` respected (GSAP animations disabled)
- [ ] Screen reader test passes (VoiceOver on Mac)

## Functionality

- [ ] Contact form submits successfully → webhook fires
- [ ] Newsletter signup works → webhook fires
- [ ] Cookie consent banner appears on first visit
- [ ] Cookie preferences are saved and respected
- [ ] GTM fires correctly (check with Tag Assistant)
- [ ] Sanity preview/draft mode works (if CMS enabled)
- [ ] ISR revalidation works (if applicable)
- [ ] i18n language switcher works (if bilingual)

## Security & Headers

- [ ] `X-Frame-Options: DENY` header present
- [ ] `X-Content-Type-Options: nosniff` header present
- [ ] No sensitive data in client-side bundles
- [ ] `.env` variables not exposed to client (only `NEXT_PUBLIC_*` ones)
- [ ] API routes validate input

## Design Polish — Anti-Generic AI Patterns

### Typography
- [ ] Headings use the project's heading font — not system default or Inter
- [ ] Large headings have tight letter-spacing (`tracking-tight` or tighter)
- [ ] Body text max-width ~65 characters for readability
- [ ] No orphaned words on headlines (`text-wrap: balance` where supported)
- [ ] Font weights varied for hierarchy (not just regular + bold — use medium 500, semibold 600)
- [ ] Numbers use tabular figures where aligned (`font-variant-numeric: tabular-nums`)

### Colors & Surfaces
- [ ] No pure black backgrounds — use off-black (`#0a0a0a`, `#121212`, or tinted dark)
- [ ] Single accent color used consistently — no competing accents
- [ ] One consistent gray family (don't mix warm and cool grays)
- [ ] No purple/blue AI gradient aesthetic — the most common AI fingerprint
- [ ] Shadows are tinted to match background hue, not pure black
- [ ] Empty sections have depth (subtle pattern, ambient gradient, or background image)

### Layout
- [ ] No "3 equal columns of cards" pattern without variation — the most generic AI layout
- [ ] Break symmetry somewhere: offset margins, mixed aspect ratios, or asymmetric grid
- [ ] Use `min-height: 100dvh` instead of `100vh` (mobile viewport fix)
- [ ] Max-width containers (1200–1440px) on all content
- [ ] Generous whitespace — when in doubt, add more
- [ ] Buttons bottom-aligned in cards for visual consistency
- [ ] Border-radius varied across element types (don't use the same radius everywhere)

### Interactivity & States
- [ ] All buttons have hover effect (background shift, slight scale, or translate)
- [ ] Active/press feedback on buttons (`scale(0.98)` or `translateY(1px)`)
- [ ] Transitions are smooth (200–300ms) — no instant state changes
- [ ] All navigation links show active state
- [ ] Loading states use skeleton loaders, not circular spinners
- [ ] Empty states are designed (not blank white screens)
- [ ] Error states have clear inline messages, not browser alerts
- [ ] All buttons link to real destinations or are visually disabled

### Content Quality
- [ ] No placeholder names ("John Doe", "Jane Smith", "Acme Corp")
- [ ] No fake round numbers ("99.99%", "10,000+") — use organic data ("47.2%", "8,742")
- [ ] No AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen", "Game-changer", "Delve"
- [ ] No exclamation marks in success messages — be calm and direct
- [ ] Active voice throughout
- [ ] Sentence case for headings (not Title Case everywhere)

### Component Patterns
- [ ] Cards don't have both border AND shadow — pick one
- [ ] Button styles limited: filled + ghost/outline + text link. No more.
- [ ] Badges aren't all pill-shaped — vary with square, flag, or plain text
- [ ] FAQ isn't always accordion — consider side-by-side, searchable, or inline disclosure
- [ ] Testimonials aren't always a carousel — consider masonry wall or single rotating quote
- [ ] Footer is focused: main nav paths + legal links only. No bloat.

### Icons & Images
- [ ] Icons aren't exclusively Lucide — consider Phosphor or Heroicons for variety
- [ ] Icon metaphors aren't obvious (no rocket for "Launch") — use less literal choices
- [ ] Consistent stroke width across all icons
- [ ] Real team photos or consistent illustration style — no generic stock
- [ ] Branded favicon present (not Next.js default)

## Deployment

- [ ] `pnpm build` succeeds without errors or warnings
- [ ] Environment variables set in Vercel dashboard
- [ ] Custom domain configured and SSL active
- [ ] Redirects configured (www → non-www or vice versa)
- [ ] Analytics verified in production (GTM + GA4 or equivalent)
- [ ] Error monitoring set up (Sentry or equivalent) — optional

---

> **Sign-off:** Once all items are checked, the site is ready to go live.
