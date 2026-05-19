---
name: qa-checklist
description: Run a comprehensive pre-launch quality assurance checklist
---

# QA Checklist

## Trigger
"QA avant livraison" or "qa checklist" or "pre-launch check"

## Checklist

### Responsive Design
- [ ] 375px (iPhone SE)
- [ ] 768px (iPad)
- [ ] 1024px (laptop)
- [ ] 1440px (desktop)

### Functionality
- [ ] All navigation links work
- [ ] Contact form submits successfully
- [ ] Newsletter form works
- [ ] Diagnostic form (if applicable) works end-to-end
- [ ] CTA buttons link to correct destinations
- [ ] External links open in new tab
- [ ] 404 page displays correctly
- [ ] Error page displays correctly

### SEO
- [ ] Every page has unique title and meta description
- [ ] All images have alt text
- [ ] Heading hierarchy is correct (no skipping levels)
- [ ] JSON-LD schema is present (Organization, FAQ, Article where applicable)
- [ ] sitemap.xml exists and includes all pages
- [ ] robots.txt is valid
- [ ] Canonical URLs are set
- [ ] OG images are set for all pages

### Performance
- [ ] Lighthouse Performance >= 90
- [ ] No render-blocking resources
- [ ] Images are optimized (WebP/AVIF)
- [ ] Fonts are self-hosted with font-display: swap

### Accessibility
- [ ] Color contrast passes WCAG AA
- [ ] Keyboard navigation works (tab through all interactive elements)
- [ ] Focus states are visible
- [ ] Skip-to-content link works
- [ ] Screen reader compatibility (landmarks, ARIA labels)

### Legal & Compliance
- [ ] Privacy policy page exists and is linked
- [ ] Terms of service page exists
- [ ] Mentions legales page exists (if French site)
- [ ] Cookie consent banner appears and works
- [ ] Cookie preferences save correctly

### Analytics
- [ ] GTM is loaded (check in browser dev tools)
- [ ] GA4 events fire correctly
- [ ] Cookie consent controls tag firing

### Content
- [ ] No placeholder text remaining
- [ ] No broken images
- [ ] Spelling and grammar checked
- [ ] Phone numbers and emails are correct and clickable

## Output
Markdown checklist with pass/fail status for each item
