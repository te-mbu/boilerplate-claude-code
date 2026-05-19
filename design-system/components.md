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

## Custom Components (To Build)

### Layout
| Component | Path | Purpose |
|---|---|---|
| `Navbar` | `src/components/layout/navbar.tsx` | Fixed top navigation with logo, links, CTA button, mobile hamburger |
| `Footer` | `src/components/layout/footer.tsx` | Site footer with columns, links, legal, social icons |
| `Container` | `src/components/layout/container.tsx` | Max-width wrapper (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`) |
| `Section` | `src/components/layout/section.tsx` | Semantic `<section>` with `py-section` padding and optional background |

### Section Components (Engine)
| Component | Path | Purpose |
|---|---|---|
| `HeroSection` | `src/components/sections/hero.tsx` | Above-the-fold hero with headline, subline, CTA, optional media |
| `FeaturesSection` | `src/components/sections/features.tsx` | Grid of feature cards (icon + title + description) |
| `TestimonialsSection` | `src/components/sections/testimonials.tsx` | Social proof carousel or grid |
| `PricingSection` | `src/components/sections/pricing.tsx` | Pricing cards with toggle (monthly/yearly) |
| `FAQSection` | `src/components/sections/faq.tsx` | Accordion-based FAQ block |
| `CTASection` | `src/components/sections/cta.tsx` | Full-width conversion block with headline + button |
| `LogoCloudSection` | `src/components/sections/logo-cloud.tsx` | Client/partner logo strip |
| `StatsSection` | `src/components/sections/stats.tsx` | Animated number counters |
| `ContactSection` | `src/components/sections/contact.tsx` | Contact form with validation |

### Utility Components
| Component | Path | Purpose |
|---|---|---|
| `AnimateOnScroll` | `src/components/utils/animate-on-scroll.tsx` | GSAP ScrollTrigger wrapper |
| `Counter` | `src/components/utils/counter.tsx` | Animated number counter (GSAP) |
| `SkipToContent` | `src/components/utils/skip-to-content.tsx` | Accessibility skip link |
