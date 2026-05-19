# Accessibility Standards

Baseline: **WCAG 2.1 Level AA**. Every page must pass these requirements before shipping.

---

## Color Contrast

- **Normal text** (under 18px / 14px bold): minimum contrast ratio **4.5:1** against background
- **Large text** (18px+ / 14px+ bold): minimum contrast ratio **3:1** against background
- **UI components and graphical objects**: minimum contrast ratio **3:1** against adjacent colors
- Non-text indicators (icons, borders, focus rings) must meet 3:1 against their background
- Never use color alone to convey information — pair with text, icons, or patterns

### Testing
- Use browser DevTools contrast checker on every color pairing
- Test both light and dark modes
- Test with simulated color vision deficiencies (protanopia, deuteranopia, tritanopia)

---

## Focus Management

- **Focus visible:** All interactive elements must have a visible focus indicator. Use `outline-ring/50` (already set globally) or a custom `ring-2 ring-ring ring-offset-2` style.
- **Focus order:** Tab order must follow visual reading order (left-to-right, top-to-bottom). Do not use `tabindex` values greater than 0.
- **Focus trapping:** Modals and dialogs must trap focus inside the overlay. shadcn Dialog and Drawer handle this by default.
- **Skip-to-content:** Include a visually hidden link as the first focusable element: "Skip to main content". It becomes visible on focus.

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md focus:ring-2 focus:ring-ring"
>
  Skip to main content
</a>
```

---

## Semantic HTML

- Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` landmarks
- One `<main>` per page with `id="main-content"`
- One `<h1>` per page, heading levels do not skip (h1 > h2 > h3, never h1 > h3)
- Use `<button>` for actions, `<a>` for navigation. Never use `<div onClick>`.
- Lists of items use `<ul>` or `<ol>`. Navigation links use `<nav><ul>`.
- Tables use `<th scope="col">` or `<th scope="row">` for headers

---

## ARIA Labels

- Icon-only buttons must have `aria-label`: `<Button size="icon" aria-label="Close menu">`
- Decorative images use `aria-hidden="true"` and empty `alt=""`
- Live regions for dynamic content: `aria-live="polite"` for non-urgent updates, `aria-live="assertive"` for errors
- Navigation landmarks: `<nav aria-label="Main navigation">`, `<nav aria-label="Footer navigation">`
- Do not use ARIA when native HTML provides the same semantics

---

## Images and Media

- All informational images must have descriptive `alt` text
- Decorative images: `alt=""` and `aria-hidden="true"`
- Complex images (charts, diagrams): provide a text alternative nearby or via `aria-describedby`
- Videos must have captions. Audio must have transcripts.
- Avoid auto-playing media. If unavoidable, provide pause/stop controls.

---

## Forms

- Every input must have a visible `<Label>` associated via `htmlFor`/`id`
- Required fields: use `aria-required="true"` and indicate visually (asterisk or text)
- Error messages: use `aria-describedby` linking the input to the error message element. Error messages must be announced: `aria-live="polite"`
- Group related fields with `<fieldset>` and `<legend>`
- Submit buttons must have clear text ("Send message", not "Submit")
- Success states: announce via `aria-live="polite"` region

```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email <span aria-hidden="true">*</span></Label>
  <Input
    id="email"
    type="email"
    aria-required="true"
    aria-describedby="email-error"
    aria-invalid={!!error}
  />
  {error && (
    <p id="email-error" className="text-sm text-destructive" role="alert">
      {error}
    </p>
  )}
</div>
```

---

## Keyboard Navigation

- All functionality available via mouse must be available via keyboard
- Enter or Space activates buttons. Enter activates links.
- Escape closes modals, dropdowns, and popovers
- Arrow keys navigate within composite widgets (tabs, radio groups, menus)
- No keyboard traps — users can always Tab out of a component (except modals, which trap intentionally)

---

## Reduced Motion

- Wrap all animations in a `prefers-reduced-motion` check
- CSS: `@media (prefers-reduced-motion: reduce)` — disable transforms, reduce durations to 0.01s
- GSAP: Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` before animating. If true, set elements to final state immediately.
- Essential motion (loading spinners, progress bars) may continue but should be simplified

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Testing Checklist

- [ ] Navigate entire page with keyboard only (no mouse)
- [ ] Screen reader test (VoiceOver on macOS, NVDA on Windows)
- [ ] Zoom to 200% — no content loss or horizontal scroll
- [ ] Color contrast passes on all text and UI elements
- [ ] All images have appropriate alt text
- [ ] All form fields have labels and error handling
- [ ] Focus indicators are visible on all interactive elements
- [ ] Reduced motion preference is respected
- [ ] Skip-to-content link works
- [ ] Heading hierarchy is correct (no skipped levels)
