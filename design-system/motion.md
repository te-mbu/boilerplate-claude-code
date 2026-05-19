# Motion & Animation

All animations use **GSAP** (GreenSock Animation Platform). No CSS keyframe animations for content — CSS is reserved for micro-interactions (hover, focus) only.

---

## Core Principles

1. **Animation serves comprehension.** It guides the eye, confirms actions, and creates spatial continuity. Never animate for the sake of animation.
2. **Fast by default.** Most animations are under 0.6s. If it feels slow, it is slow.
3. **Reduced motion is respected.** Every animation checks `prefers-reduced-motion` before running.

---

## Entrance Animations

Used when elements enter the viewport for the first time via ScrollTrigger.

### Fade In
```js
gsap.from(element, {
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
});
```

### Slide Up (default entrance)
```js
gsap.from(element, {
  opacity: 0,
  y: 20,
  duration: 0.6,
  ease: "power2.out",
});
```

### Staggered Group
For grids of cards, feature lists, or any repeated elements:
```js
gsap.from(elements, {
  opacity: 0,
  y: 20,
  duration: 0.6,
  ease: "power2.out",
  stagger: 0.1,
});
```

---

## Scroll Triggers

All entrance animations are triggered by GSAP ScrollTrigger.

```js
ScrollTrigger.create({
  trigger: element,
  start: "top 80%",   // Fires when top of element hits 80% of viewport
  once: true,          // Only animate once — no reverse on scroll up
  onEnter: () => {
    gsap.from(element, { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" });
  },
});
```

### Rules
- **Trigger point:** `top 80%` (element enters when 20% visible). This feels natural without being too early.
- **Once only:** Set `once: true`. Elements do not re-animate when scrolling back up.
- **No scroll-linked animations:** Do not tie opacity or position to scroll position (parallax). It causes layout thrashing and motion sickness.

---

## Counter Animations

Animated number counters for stats sections.

```js
const counter = { value: 0 };
gsap.to(counter, {
  value: targetNumber,
  duration: 2,
  ease: "power2.out",
  roundProps: "value",
  onUpdate: () => {
    element.textContent = counter.value.toLocaleString();
  },
  scrollTrigger: {
    trigger: element,
    start: "top 80%",
    once: true,
  },
});
```

### Rules
- Duration: **2 seconds**
- Easing: **power2.out** (fast start, smooth deceleration)
- Format numbers with `toLocaleString()` for commas/periods
- Trigger on scroll into view, not on page load

---

## Hover States

Hover animations use CSS transitions, not GSAP. Keep them lightweight.

```css
/* Button hover */
.btn {
  transition: transform 150ms ease, box-shadow 150ms ease;
}
.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px oklch(0 0 0 / 10%);
}

/* Card hover */
.card-interactive {
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.card-interactive:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px oklch(0 0 0 / 8%);
}

/* Link underline */
.link-animated {
  position: relative;
}
.link-animated::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 200ms ease;
}
.link-animated:hover::after {
  width: 100%;
}
```

---

## Page Transitions

Page transitions are optional and should be implemented only if they add value. Use Next.js `<ViewTransition>` API or GSAP Flip.

### Simple Fade (recommended default)
```js
// Wrap in a layout transition component
gsap.from(pageContent, {
  opacity: 0,
  duration: 0.3,
  ease: "power1.out",
});
```

### Rules
- Maximum transition duration: **0.3s** for page transitions (users should not wait)
- Never block navigation — content must be interactive immediately
- Prefer opacity-only transitions over slide/scale to avoid layout shifts

---

## Performance Rules

1. **Use `will-change` sparingly.** Only apply to elements currently animating, remove after.
2. **Animate only `transform` and `opacity`.** These are GPU-composited. Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`.
3. **Batch DOM reads and writes.** Use `gsap.set()` for initial states, not inline styles.
4. **Kill on unmount.** Always clean up ScrollTrigger instances and GSAP tweens in React `useEffect` cleanup:
   ```js
   useEffect(() => {
     const ctx = gsap.context(() => {
       // animations here
     }, containerRef);
     return () => ctx.revert();
   }, []);
   ```
5. **No layout thrashing.** Never read layout (getBoundingClientRect) then write (style changes) in the same frame.

---

## Reduced Motion

All GSAP animations must check for reduced motion preference:

```js
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  // Set elements to their final state immediately
  gsap.set(element, { opacity: 1, y: 0 });
} else {
  gsap.from(element, { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" });
}
```

Wrap this check in a utility:

```ts
export function shouldAnimate(): boolean {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
```

---

## Timing Reference

| Animation Type | Duration | Easing | Trigger |
|---|---|---|---|
| Entrance (fade/slide) | 0.6s | power2.out | ScrollTrigger top 80% |
| Stagger delay | 0.1s | — | Per element in group |
| Counter | 2s | power2.out | ScrollTrigger top 80% |
| Hover transform | 0.15s | ease (CSS) | `:hover` |
| Card hover | 0.2s | ease (CSS) | `:hover` |
| Page transition | 0.3s | power1.out | Route change |
| Tooltip/popover | 0.15s | ease (CSS) | Open/close |
| Focus ring | 0.15s | ease (CSS) | `:focus-visible` |
