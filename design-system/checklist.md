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

## Deployment

- [ ] `pnpm build` succeeds without errors or warnings
- [ ] Environment variables set in Vercel dashboard
- [ ] Custom domain configured and SSL active
- [ ] Redirects configured (www → non-www or vice versa)
- [ ] Analytics verified in production (GTM + GA4 or equivalent)
- [ ] Error monitoring set up (Sentry or equivalent) — optional

---

> **Sign-off:** Once all items are checked, the site is ready to go live.
