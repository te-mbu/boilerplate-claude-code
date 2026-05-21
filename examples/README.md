# Examples

Reference implementations for common section patterns. These are **not imported** by the project — they serve as copy-paste references when composing pages with shadcn/ui primitives.

## sections/

Pre-built section components organized by type:

- `hero/` — HeroCentered, HeroSplit, HeroCinematic
- `social-proof/` — LogoCloud, TestimonialsGrid, TestimonialCarousel
- `features/` — FeaturesGrid, FeaturesAlternating
- `pricing/` — PricingCards, PricingToggle
- `cta/` — CtaCentered, CtaNewsletter
- `faq/` — FaqSection
- `portfolio/` — PortfolioGrid
- `team/` — TeamGrid
- `stats/` — StatsBar
- `timeline/` — ProcessSteps
- `comparison/` — ComparisonCards
- `gallery/` — GalleryGrid
- `marquee/` — Marquee
- `changelog/` — ChangelogList

## Usage

When building a page, browse the relevant example to understand the pattern, then compose your own version using shadcn/ui components (`Card`, `Button`, `Badge`, `Accordion`, etc.) and the project's design tokens.

```tsx
// Don't import from examples — compose with primitives:
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
```
