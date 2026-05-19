# Design Patterns

---

## Conversion Structure (SITE Framework)

Every page follows a conversion-optimized flow:

1. **Hook** — Capture attention in under 3 seconds. Hero headline addresses the visitor's core desire or pain point. No jargon. No "Welcome to..."
2. **Value Proposition** — Immediately answer "What do I get?" with concrete outcomes. Features section, benefit cards, or a single clear statement.
3. **Proof** — Testimonials, logos, stats, case studies. Social proof reduces perceived risk. Place proof after value prop and before the ask.
4. **CTA** — One clear call to action per screen. Repeat the primary CTA at least twice on a landing page (hero + dedicated CTA section).

### Section Ordering by Site Type

**Landing Page (single product/offer):**
1. Hero (Hook + CTA)
2. Logo Cloud (Proof)
3. Features / Value Props
4. How It Works (3-step)
5. Testimonials (Proof)
6. Pricing
7. FAQ
8. CTA Section (final conversion)
9. Footer

**Marketing Site (multi-page):**
1. Hero (Hook + CTA)
2. Features Overview
3. Stats (Proof)
4. Detailed Features (tabs or cards)
5. Testimonials
6. CTA Section
7. Footer

**Corporate Site:**
1. Hero (mission-driven)
2. Logo Cloud / Partners
3. Services Overview
4. Case Studies / Stats
5. Team / About
6. Contact
7. Footer

**SaaS Product Site:**
1. Hero (problem > solution + CTA)
2. Logo Cloud
3. Feature Deep-Dives (alternating left/right)
4. Integrations
5. Pricing
6. Testimonials
7. FAQ
8. CTA Section
9. Footer

---

## Responsive Breakpoints

| Name | Width | Tailwind prefix | Target |
|---|---|---|---|
| Mobile | 375px | (default) | Phones (portrait) |
| Tablet | 768px | `md:` | Tablets, small laptops |
| Desktop | 1024px | `lg:` | Standard desktops |
| Wide | 1440px | `xl:` | Large monitors |

Design mobile-first. Start with the smallest screen, layer up.

---

## Grid Patterns

### Content Grid
```
Default: 1 column (mobile)
md: 2 columns
lg: 3 columns (features, cards)
xl: 4 columns (logo clouds, small items)
```

### Two-Column Split
```
Default: stack (1 column)
lg: 2 columns, 50/50 or 60/40
```
Used for: Hero with media, alternating feature sections, contact + form.

### Asymmetric Layout
```
lg: grid-cols-[1fr_2fr] or grid-cols-[2fr_1fr]
```
Used for: Sidebar layouts, content + illustration.

---

## Container Rules

- Max width: `max-w-7xl` (1280px)
- Horizontal padding: `px-4` (mobile), `sm:px-6`, `lg:px-8`
- Always centered: `mx-auto`
- No container nesting. One container per section.

```tsx
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  {children}
</div>
```

---

## Spacing Rules

### Vertical Rhythm
- Between sections: `py-section` (5rem / 80px) or `py-section-lg` (7rem / 112px)
- Between content blocks within a section: `space-y-8` or `space-y-12`
- Between heading and body: `mt-4` or `mt-6`
- Between paragraphs: `space-y-4`

### Component Spacing
- Card padding: `p-6` or `p-8`
- Button padding: built into shadcn size variants
- Form field gaps: `space-y-4`
- Grid gaps: `gap-6` (mobile), `gap-8` (desktop)

### Section Padding Pattern
```tsx
<section className="py-section">         {/* Standard section */}
<section className="py-section-lg">      {/* Hero, final CTA */}
<section className="py-section bg-muted"> {/* Alternating background */}
```

---

## Typography Scale

Use Tailwind's default type scale. Heading hierarchy per section:

| Element | Class | Usage |
|---|---|---|
| Page title (H1) | `text-4xl md:text-5xl lg:text-6xl font-bold font-heading` | Hero headline only (1 per page) |
| Section title (H2) | `text-3xl md:text-4xl font-bold font-heading` | One per section |
| Subsection (H3) | `text-xl md:text-2xl font-semibold` | Card titles, feature names |
| Body | `text-base md:text-lg` | Paragraphs |
| Small / Caption | `text-sm text-muted-foreground` | Labels, meta info |

---

## Color Usage Patterns

| Intent | Token | Example |
|---|---|---|
| Primary action | `bg-primary text-primary-foreground` | Main navigation CTA |
| Conversion action | `bg-cta text-white` | Hero CTA, pricing CTA |
| Secondary action | `bg-secondary text-secondary-foreground` | "Learn more" buttons |
| Ghost action | `bg-transparent hover:bg-accent` | Navbar links |
| Destructive | `bg-destructive text-white` | Delete, cancel |
| Success feedback | `text-success` | Form submission confirmation |
| Muted background | `bg-muted` | Alternating section backgrounds |
