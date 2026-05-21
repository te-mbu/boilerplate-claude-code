---
name: gsap-core
description: Official GSAP skill for the core API — gsap.to(), from(), fromTo(), easing, duration, stagger, defaults, gsap.matchMedia(). Use when animating DOM/SVG with GSAP.
license: MIT
---

# GSAP Core

## When to Use This Skill

Apply when writing or reviewing GSAP animations using the core engine: single tweens, eases, staggers, or when explaining how GSAP tweens work.

**Related skills:** For sequencing use **gsap-timeline**; for scroll-linked animation use **gsap-scrolltrigger**; for React use **gsap-react**; for plugins use **gsap-plugins**; for helpers use **gsap-utils**; for performance use **gsap-performance**.

## Core Tween Methods

- **gsap.to(targets, vars)** — animate from current state to `vars`. Most common.
- **gsap.from(targets, vars)** — animate from `vars` to current state (good for entrances).
- **gsap.fromTo(targets, fromVars, toVars)** — explicit start and end.
- **gsap.set(targets, vars)** — apply immediately (duration 0).

Always use **camelCase** property names (e.g. `backgroundColor`, `rotationX`).

## Common vars

- **duration** — seconds (default 0.5).
- **delay** — seconds before start.
- **ease** — string: `"power1.out"` (default), `"power3.inOut"`, `"back.out(1.7)"`, `"elastic.out(1, 0.3)"`, `"none"`.
- **stagger** — number (seconds between) or object: `{ amount: 0.3, from: "center" }`.
- **overwrite** — `false` (default), `true`, or `"auto"`.
- **repeat** — number or `-1` for infinite. **yoyo** — alternate direction.
- **onComplete**, **onStart**, **onUpdate** — callbacks.
- **immediateRender** — default `true` for from()/fromTo(). Set `false` on later tweens targeting same property.

## Transform Aliases (prefer over raw transform)

| GSAP property | CSS equivalent |
|---|---|
| `x`, `y`, `z` | translateX/Y/Z (px) |
| `xPercent`, `yPercent` | translateX/Y in % |
| `scale`, `scaleX`, `scaleY` | scale |
| `rotation` | rotate (deg) |
| `rotationX`, `rotationY` | 3D rotate |
| `skewX`, `skewY` | skew |
| `transformOrigin` | transform-origin |

- **autoAlpha** — Prefer over `opacity`. At 0, also sets `visibility: hidden`.
- **CSS variables** — `"--hue": 180` supported.
- **svgOrigin** — SVG global coordinate transform-origin.
- **clearProps** — Remove inline styles on complete: `clearProps: "all"`.
- **Relative values** — `x: "+=20"`, `rotation: "-=30"`.
- **Directional rotation** — `"_short"`, `"_cw"`, `"_ccw"`.

## Stagger

```javascript
gsap.to(".item", { y: -20, stagger: 0.1 });
// Object syntax: { amount: 0.3, from: "center" | "random" | "edges" | index }
```

## Easing

Built-in: `none`, `power1`–`power4`, `back`, `bounce`, `circ`, `elastic`, `expo`, `sine`. Each has `.in`, `.out`, `.inOut`.

```javascript
ease: "power3.out"     // entrances
ease: "power2.inOut"   // morphs
ease: "back.out(1.7)"  // overshoot
```

## Controlling Tweens

```javascript
const tween = gsap.to(".box", { x: 100, duration: 1 });
tween.pause(); tween.play(); tween.reverse(); tween.kill();
tween.progress(0.5); tween.time(0.2);
```

## Function-based Values

```javascript
gsap.to(".item", { x: (i, target, arr) => i * 50, stagger: 0.1 });
```

## Defaults

```javascript
gsap.defaults({ duration: 0.6, ease: "power2.out" });
```

## gsap.matchMedia() — Responsive & Accessibility

```javascript
let mm = gsap.matchMedia();
mm.add({
  isDesktop: "(min-width: 800px)",
  isMobile: "(max-width: 799px)",
  reduceMotion: "(prefers-reduced-motion: reduce)"
}, (context) => {
  const { isDesktop, reduceMotion } = context.conditions;
  gsap.to(".box", {
    rotation: isDesktop ? 360 : 180,
    duration: reduceMotion ? 0 : 2
  });
});
```

## Best Practices

- ✅ camelCase properties, transform aliases, autoAlpha for fades
- ✅ Prefer timelines over delay chains
- ✅ gsap.matchMedia() for responsive + prefers-reduced-motion
- ✅ Store tween return value when controlling playback

## Do Not

- ❌ Animate layout properties (width, height, top, left) when transforms work
- ❌ Use both svgOrigin and transformOrigin on same SVG element
- ❌ Stack from()/fromTo() on same property without immediateRender: false on later ones
