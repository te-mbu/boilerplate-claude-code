# Components Reference

---

## shadcn/ui Components (Installed)

### Accordion
- **Path:** `src/components/ui/accordion.tsx`
- **Variants:** Single, Multiple (via `type` prop)
- **Required props:** `type` (`"single"` | `"multiple"`), children (`AccordionItem`, `AccordionTrigger`, `AccordionContent`)
- **Example:**
```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question</AccordionTrigger>
    <AccordionContent>Answer</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Badge
- **Path:** `src/components/ui/badge.tsx`
- **Variants:** `default`, `secondary`, `destructive`, `outline`
- **Required props:** `children`
- **Example:**
```tsx
<Badge variant="secondary">New</Badge>
```

### Button
- **Path:** `src/components/ui/button.tsx`
- **Variants:** `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- **Sizes:** `default`, `sm`, `lg`, `icon`
- **Required props:** `children`
- **Example:**
```tsx
<Button variant="default" size="lg">Get Started</Button>
```

### Card
- **Path:** `src/components/ui/card.tsx`
- **Variants:** Default only (compose with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`)
- **Required props:** `children`
- **Example:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Body</CardContent>
</Card>
```

### Checkbox
- **Path:** `src/components/ui/checkbox.tsx`
- **Variants:** Default
- **Required props:** None (controlled via `checked`, `onCheckedChange`)
- **Example:**
```tsx
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>
```

### Dialog
- **Path:** `src/components/ui/dialog.tsx`
- **Variants:** Default (compose with `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`)
- **Required props:** `children`
- **Example:**
```tsx
<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

### Drawer
- **Path:** `src/components/ui/drawer.tsx`
- **Variants:** Default (mobile-first bottom sheet)
- **Required props:** `children`
- **Example:**
```tsx
<Drawer>
  <DrawerTrigger asChild><Button>Open</Button></DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Title</DrawerTitle>
    </DrawerHeader>
  </DrawerContent>
</Drawer>
```

### Input
- **Path:** `src/components/ui/input.tsx`
- **Variants:** Default
- **Required props:** None (standard HTML input props)
- **Example:**
```tsx
<Input type="email" placeholder="email@example.com" />
```

### Label
- **Path:** `src/components/ui/label.tsx`
- **Variants:** Default
- **Required props:** `children`, `htmlFor`
- **Example:**
```tsx
<Label htmlFor="email">Email</Label>
```

### Radio Group
- **Path:** `src/components/ui/radio-group.tsx`
- **Variants:** Default
- **Required props:** `value`, `onValueChange`, children (`RadioGroupItem`)
- **Example:**
```tsx
<RadioGroup defaultValue="option-1">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
</RadioGroup>
```

### Select
- **Path:** `src/components/ui/select.tsx`
- **Variants:** Default (compose with `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`)
- **Required props:** `children`
- **Example:**
```tsx
<Select>
  <SelectTrigger><SelectValue placeholder="Choose" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </SelectContent>
</Select>
```

### Separator
- **Path:** `src/components/ui/separator.tsx`
- **Variants:** Default
- **Required props:** None
- **Example:**
```tsx
<Separator orientation="horizontal" />
```

### Skeleton
- **Path:** `src/components/ui/skeleton.tsx`
- **Variants:** Default
- **Required props:** `className` (for sizing)
- **Example:**
```tsx
<Skeleton className="h-12 w-48" />
```

### Tabs
- **Path:** `src/components/ui/tabs.tsx`
- **Variants:** Default (compose with `TabsList`, `TabsTrigger`, `TabsContent`)
- **Required props:** `defaultValue`, `children`
- **Example:**
```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Textarea
- **Path:** `src/components/ui/textarea.tsx`
- **Variants:** Default
- **Required props:** None (standard HTML textarea props)
- **Example:**
```tsx
<Textarea placeholder="Your message..." rows={4} />
```

### Toggle
- **Path:** `src/components/ui/toggle.tsx`
- **Variants:** `default`, `outline`
- **Sizes:** `default`, `sm`, `lg`
- **Required props:** `children`
- **Example:**
```tsx
<Toggle variant="outline" aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>
```

### Tooltip
- **Path:** `src/components/ui/tooltip.tsx`
- **Variants:** Default (compose with `TooltipTrigger`, `TooltipContent`)
- **Required props:** Must be wrapped in `TooltipProvider`
- **Example:**
```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>Tooltip text</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

## Custom Components

### Layout
| Component | Path | Purpose |
|---|---|---|
| `Navbar` | `src/components/layout/navbar.tsx` | Fixed top navigation with logo, links, CTA button, mobile hamburger |
| `Footer` | `src/components/layout/footer.tsx` | Active footer (copied from template by setup) |
| `FooterMarketing` | `src/components/layout/footer-marketing.tsx` | 5-column footer with newsletter — for marketing/saas siteTypes |
| `FooterMinimal` | `src/components/layout/footer-minimal.tsx` | Single-row footer — for portfolio/corporate/landing siteTypes |

### Section Components
| Component | Import | Props | Purpose |
|---|---|---|---|
| `HeroCentered` | `@/components/sections/hero` | `heading`, `subheading`, `primaryCta`, `secondaryCta?`, `badge?`, `fullHeight?` | Centered hero with headline, CTAs, optional badge |
| `HeroSplit` | `@/components/sections/hero` | `heading`, `subheading`, `primaryCta`, `secondaryCta?`, `image`, `imagePosition?` | Side-by-side hero with image |
| `FeaturesGrid` | `@/components/sections/features` | `features[]`, `heading?`, `subheading?`, `columns?` | Grid of icon + title + description cards |
| `FeaturesAlternating` | `@/components/sections/features` | *(see file)* | Alternating text/image rows |
| `LogoCloud` | `@/components/sections/social-proof` | `logos[]`, `heading?` | Client/partner logo strip (static) |
| `TestimonialsGrid` | `@/components/sections/social-proof` | `testimonials[]`, `heading?`, `columns?` | Testimonial cards in a grid |
| `TestimonialCarousel` | `@/components/sections/social-proof` | `testimonials[]`, `heading?` | Horizontal scroll-snap carousel with prev/next |
| `StatsBar` | `@/components/sections/stats` | `stats[]`, `heading?`, `variant?` | Key metrics in a row. Variants: `default`, `card`, `dark` |
| `ProcessSteps` | `@/components/sections/timeline` | `steps[]`, `heading?`, `subheading?`, `layout?` | Process/timeline. Layouts: `vertical` (with line), `horizontal` |
| `ComparisonCards` | `@/components/sections/comparison` | `options[]`, `heading?`, `subheading?` | Side-by-side feature comparison with Check/X |
| `GalleryGrid` | `@/components/sections/gallery` | `images[]`, `heading?`, `columns?` | Image grid with Dialog lightbox + keyboard nav |
| `Marquee` | `@/components/sections/marquee` | `items[]`, `speed?`, `direction?`, `pauseOnHover?` | Infinite scroll text/logos. CSS-only, zero JS |
| `PricingCards` | `@/components/sections/pricing` | `plans[]` | Pricing cards with features list + popular badge |
| `PricingToggle` | `@/components/sections/pricing` | *(see file)* | Monthly/yearly pricing toggle |
| `FaqSection` | `@/components/sections/faq` | `faqs[]`, `heading?`, `subheading?` | Accordion FAQ with JSON-LD structured data |
| `CtaCentered` | `@/components/sections/cta` | `heading`, `description?`, `primaryCta`, `secondaryCta?`, `variant?` | CTA block. Variants: `default`, `gradient`, `dark` |
| `CtaNewsletter` | `@/components/sections/cta` | *(see file)* | CTA with newsletter signup form |
| `PortfolioGrid` | `@/components/sections/portfolio` | `projects[]`, `heading?`, `columns?` | Project cards with image, tags, tech stack |
| `TeamGrid` | `@/components/sections/team` | `members[]`, `heading?`, `columns?` | Team member cards with photo + social links |
| `ContactForm` | `@/components/sections/contact` | *(see file)* | Contact form with Zod validation + Server Action |
| `ContactInfo` | `@/components/sections/contact` | *(see file)* | Contact details (email, phone, address, map) |

### Animation Wrappers
| Component | Import | Props | Purpose |
|---|---|---|---|
| `AnimateOnScroll` | `@/components/animations` | `preset?`, `duration?`, `delay?` | Animates children on scroll. Presets: `fade-up`, `fade-in`, `slide-left`, `slide-right`, `scale-up` |
| `StaggerChildren` | `@/components/animations` | `preset?`, `stagger?`, `duration?`, `selector?` | Animates children one by one. Presets: `fade-up`, `fade-in`, `scale-up` |
| `CountUp` | `@/components/animations` | `value`, `prefix?`, `suffix?`, `duration?` | Animates a number from 0 to target on scroll |

All animation wrappers respect `prefers-reduced-motion` and use GSAP lazy-loaded via `getGsap()`.
