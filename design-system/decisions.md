# Design Decisions Log

This file records every design decision as an explicit, enforceable rule. When a question comes up twice, add it here so it never comes up again.

---

## How to Add a Decision

Copy this template, fill it in, and append it below the line.

```
### [Rule Name]
- **Rule:** [What to do]
- **When:** [When this applies]
- **Example:** [Correct usage]
- **Counter-example:** [What not to do]
- **Why added:** [Context — the situation that triggered this decision]
```

---

### Section Spacing Is Always Token-Based
- **Rule:** Use `py-section` or `py-section-lg` (mapped to `--spacing-section` / `--spacing-section-lg`) for all section vertical padding. Never hardcode `py-20`, `py-24`, etc.
- **When:** Any time you create or modify a `<section>` element
- **Example:** `<section className="py-section">`
- **Counter-example:** `<section className="py-20">` or `<section className="py-[5rem]">`
- **Why added:** Inconsistent section spacing across pages makes the site look unpolished. Token-based spacing allows global adjustment from one place.

### Buttons Use CVA Variants, Never Custom Classes
- **Rule:** All buttons must use the `Button` component from `@/components/ui/button` with its existing variants (`default`, `destructive`, `outline`, `secondary`, `ghost`, `link`). If a new style is needed, add a variant — do not create a custom `<button>` with Tailwind classes.
- **When:** Any clickable action element
- **Example:** `<Button variant="outline" size="lg">Learn More</Button>`
- **Counter-example:** `<button className="bg-blue-500 text-white px-4 py-2 rounded">Click</button>`
- **Why added:** Custom buttons diverge from the design system and become impossible to theme globally.

### No Inline Fetch — Always Go Through Content Layer
- **Rule:** Page components never call `fetch()` or Sanity client directly. All data comes from `getContentProvider()` methods.
- **When:** Any server component that needs CMS or content data
- **Example:** `const content = await getContentProvider(); const posts = await content.getBlogPosts();`
- **Counter-example:** `const res = await fetch('https://api.sanity.io/...')` in a page component
- **Why added:** Direct fetch calls bypass the content provider abstraction, making it impossible to switch between Sanity and static without rewriting pages.

### Images Always Use next/image with sizes
- **Rule:** Every `<img>` must be replaced with `next/image`. The `sizes` prop is mandatory for responsive images to avoid loading oversized images on mobile.
- **When:** Any image rendering
- **Example:** `<Image src={img.src} alt={img.alt} width={800} height={400} sizes="(max-width: 768px) 100vw, 50vw" />`
- **Counter-example:** `<img src="/photo.jpg" />` or `<Image src={img} alt="" />` (missing sizes)
- **Why added:** Missing `sizes` causes Next.js to serve the largest image to all devices, killing Core Web Vitals (LCP).

### One CTA Per Viewport
- **Rule:** Each visible viewport should have at most one primary CTA (Button variant="default"). Secondary actions use `variant="outline"` or `variant="ghost"`.
- **When:** Laying out any section with multiple actions
- **Example:** Primary "Réserver un appel" + outline "En savoir plus"
- **Counter-example:** Two primary buttons side by side
- **Why added:** Multiple primary CTAs create decision paralysis and reduce conversion rates. This aligns with design principle #2 (One Decision Per Screen).

### Dark Mode Tokens — Never Use Color Literals
- **Rule:** Use semantic color classes (`text-foreground`, `bg-card`, `border-border`) not color literals (`text-gray-900`, `bg-white`). This ensures dark mode works automatically.
- **When:** Any styling that involves color
- **Example:** `className="bg-card text-card-foreground"`
- **Counter-example:** `className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white"`
- **Why added:** Hardcoded colors require manual dark mode overrides for every element and will inevitably be missed, creating broken dark mode states.

### Client Components Must Be Explicitly Minimal
- **Rule:** Only add `"use client"` when the component genuinely needs browser APIs (useState, useEffect, event handlers, GSAP). Server components are the default. When a component needs interactivity, extract only the interactive part into a client component and keep the rest server-rendered.
- **When:** Deciding whether a component should be client or server
- **Example:** A FAQ section where the accordion is a client component but the page and surrounding layout stay server
- **Counter-example:** Adding `"use client"` to an entire page because one button has an onClick
- **Why added:** Excessive client components increase bundle size and hurt Time to Interactive (TTI).

### Form Actions Use Server Actions + Zod
- **Rule:** All form submissions use Next.js Server Actions with Zod validation. No client-side API calls for form submissions. The Zod schema lives in `src/lib/validation/`.
- **When:** Any form that submits data (contact, newsletter, diagnostic)
- **Example:** `action={submitContact}` with `contactSchema.parse(formData)` in the server action
- **Counter-example:** `onSubmit={() => fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })}`
- **Why added:** Server Actions reduce client bundle size and provide built-in progressive enhancement (forms work without JS).
