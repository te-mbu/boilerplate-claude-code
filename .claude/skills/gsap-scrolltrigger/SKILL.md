---
name: gsap-scrolltrigger
description: Official GSAP skill for ScrollTrigger — scroll-driven animation, pinning, scrub, snap, batch. Use for scroll animations and parallax.
license: MIT
---

# GSAP ScrollTrigger

## When to Use

Apply when implementing scroll-driven animations: triggering tweens on scroll, pinning, scrubbing, or parallax.

## Registration

```javascript
gsap.registerPlugin(ScrollTrigger);
```

## Basic Trigger

```javascript
gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    end: "bottom center",
    toggleActions: "play reverse play reverse"
  }
});
```

**start/end format:** `"triggerPosition viewportPosition"` — e.g. `"top top"`, `"center center"`, `"bottom 80%"`.

## Key Config

| Property | Description |
|----------|-------------|
| **trigger** | Element that defines start position |
| **start** / **end** | When trigger activates/deactivates |
| **scrub** | `true` or number (smoothness seconds) — ties progress to scroll |
| **toggleActions** | `"onEnter onLeave onEnterBack onLeaveBack"` — play/pause/reverse/none |
| **pin** | Pin element while active |
| **pinSpacing** | `true` (default) adds spacer |
| **once** | Kill after first trigger |
| **markers** | Dev only — remove in production |
| **snap** | Snap to increments, array, or `"labels"` |
| **containerAnimation** | For fake horizontal scroll |

## Scrub

```javascript
scrollTrigger: { trigger: ".box", start: "top center", end: "bottom center", scrub: 1 }
```

## Pinning

```javascript
scrollTrigger: { trigger: ".section", start: "top top", end: "+=1000", pin: true, scrub: 1 }
```

## Timeline + ScrollTrigger

```javascript
const tl = gsap.timeline({
  scrollTrigger: { trigger: ".container", start: "top top", end: "+=2000", scrub: 1, pin: true }
});
tl.to(".a", { x: 100 }).to(".b", { y: 50 });
```

## ScrollTrigger.batch()

```javascript
ScrollTrigger.batch(".box", {
  onEnter: (elements) => gsap.to(elements, { opacity: 1, y: 0, stagger: 0.15 }),
  start: "top 80%"
});
```

## Horizontal Scroll (containerAnimation)

Container animation **must** use `ease: "none"`. Pinning/snapping not available on containerAnimation-based triggers.

## Best Practices

- ✅ registerPlugin(ScrollTrigger) once before use
- ✅ ScrollTrigger.refresh() after DOM/layout changes
- ✅ Use useGSAP() in React for cleanup
- ✅ scrub OR toggleActions, not both
- ✅ Create triggers top-to-bottom or use refreshPriority
- ✅ ease: "none" for containerAnimation

## Do Not

- ❌ Put ScrollTrigger on child tweens inside a timeline — put it on the timeline
- ❌ Nest ScrollTriggered animations inside parent timelines
- ❌ Leave markers: true in production
- ❌ Mix scrub and toggleActions on same trigger
