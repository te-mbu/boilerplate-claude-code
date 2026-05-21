---
name: gsap-plugins
description: Official GSAP skill for plugins — ScrollToPlugin, Flip, Draggable, SplitText, DrawSVG, MorphSVG, MotionPath, CustomEase.
license: MIT
---

# GSAP Plugins

## Licensing

Since Webflow acquired GSAP, all plugins are permanently free. No license keys needed. Install via `npm install gsap`.

## Registration

```javascript
gsap.registerPlugin(ScrollToPlugin, Flip, Draggable);
```

Register once at top level, not inside components.

## Key Plugins

### ScrollToPlugin
Animates scroll position: `gsap.to(window, { scrollTo: "#section", duration: 1 })`.

### Flip
Layout transitions via state capture:
```javascript
const state = Flip.getState(".items");
// ...change layout...
Flip.from(state, { duration: 0.5, stagger: 0.05 });
```

### Draggable + InertiaPlugin
```javascript
Draggable.create(".box", { type: "x,y", inertia: true });
```

### SplitText
Split text for granular animation:
```javascript
const split = new SplitText(".text", { type: "words,chars" });
gsap.from(split.chars, { opacity: 0, y: 20, stagger: 0.02 });
```

### DrawSVGPlugin
Reveal SVG strokes: `gsap.from(".path", { drawSVG: 0, duration: 1 })`.

### MorphSVGPlugin
Morph between SVG shapes: `gsap.to("#shape1", { morphSVG: "#shape2", duration: 1 })`.

### MotionPathPlugin
Move along a path: `gsap.to(".dot", { motionPath: { path: "#curve", align: "#curve" }, duration: 2 })`.

### CustomEase
```javascript
CustomEase.create("hop", "M0,0 C0.1,0.5 0.2,1 0.5,1 0.8,1 0.9,0.5 1,0");
gsap.to(".box", { x: 100, ease: "hop" });
```

### ScrambleTextPlugin
Glitch text reveal: `gsap.to(".text", { scrambleText: { text: "Hello", chars: "01" } })`.

## Best Practices

- ✅ Register all plugins before first use
- ✅ Revert/cleanup on component unmount
- ✅ Use Flip for layout transitions
- ✅ SplitText + stagger for text reveals

## Do Not

- ❌ Ship GSDevTools to production
- ❌ Register inside re-rendering component bodies
