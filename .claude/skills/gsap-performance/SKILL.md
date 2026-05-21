---
name: gsap-performance
description: Official GSAP skill for performance — prefer transforms, avoid layout thrashing, will-change, quickTo, batching.
license: MIT
---

# GSAP Performance

## Prefer Transform and Opacity

- ✅ **x**, **y**, **scale**, **rotation**, **opacity** — compositor-only, no layout
- ❌ **width**, **height**, **top**, **left** — trigger layout, cause jank

## will-change

```css
will-change: transform;
```

Only on elements that actually animate. Remove after animation if static.

## gsap.quickTo() — Frequent Updates

For mouse followers or frequently updated values:

```javascript
let xTo = gsap.quickTo("#id", "x", { duration: 0.4, ease: "power3" });
let yTo = gsap.quickTo("#id", "y", { duration: 0.4, ease: "power3" });
container.addEventListener("mousemove", (e) => { xTo(e.pageX); yTo(e.pageY); });
```

## Stagger over Separate Tweens

Use stagger instead of many individual tweens with manual delays.

## ScrollTrigger

- Pin only what's needed
- scrub with small value reduces work
- ScrollTrigger.refresh() only after actual layout changes
- Kill off-screen animations

## Best Practices

- ✅ Animate transforms and opacity
- ✅ will-change only on animating elements
- ✅ quickTo() for mouse followers
- ✅ stagger over separate tweens
- ✅ Clean up off-screen animations

## Do Not

- ❌ Animate width/height/top/left for movement
- ❌ will-change on every element
- ❌ Hundreds of simultaneous tweens without testing
