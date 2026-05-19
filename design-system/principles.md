# Design Principles

Five universal rules that govern every decision in this design system.

---

## 1. Substance Over Decoration

Every element must earn its place. No decorative gradients, no background patterns, no ornamental icons unless they directly support comprehension. If removing an element does not reduce clarity, remove it.

- Whitespace is a design tool, not empty space
- Borders and shadows are used sparingly to establish hierarchy, not for decoration
- Illustrations and images must convey information, not fill space
- Animation serves function (guiding attention, confirming actions) not spectacle

---

## 2. One Decision Per Screen

Each screen (or viewport-height section) presents one clear action. The visitor should never ask "what am I supposed to do here?"

- One primary CTA per visible area
- Secondary actions are visually subordinate (outline, ghost, text link)
- Navigation does not compete with content
- Reduce cognitive load by limiting choices — if a pricing page has 5 plans, highlight one

---

## 3. Mobile-First, Content-First

Design starts at 375px with real content, not lorem ipsum. Layout complexity is added at larger breakpoints, never subtracted at smaller ones.

- Write the headline before designing the hero
- Components stack vertically on mobile — no horizontal scrolling
- Touch targets are minimum 44x44px
- Images are lazy-loaded and responsive (`sizes` attribute always set)
- Content hierarchy must work without any styling (semantic HTML test)

---

## 4. Speed Is a Feature

Performance is not a technical concern — it is a design decision. A site that loads in 1s converts better than a beautiful site that loads in 4s.

- No client-side JavaScript for content that can be server-rendered
- Fonts: max 2 families, subset to Latin, `font-display: swap`
- Images: WebP/AVIF, responsive sizes, lazy-loaded below the fold
- Third-party scripts (analytics, chat widgets) loaded after interaction or after `load` event
- Target: Lighthouse 90+ on all four metrics, LCP under 2.5s, CLS under 0.1

---

## 5. The Site Works 24/7

The website is a salesperson that never sleeps. Every page must function as a standalone entry point, not just a step in a funnel.

- Every page has a clear CTA — even blog posts and legal pages
- Contact information is always accessible (footer, navbar)
- Forms work without JavaScript (progressive enhancement)
- Error states are helpful, not dead ends (404 pages suggest alternatives)
- The site communicates value even if the visitor reads nothing but the H1 and the CTA button text
