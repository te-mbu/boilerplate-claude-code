---
name: gsap-react
description: Official GSAP skill for React — useGSAP hook, refs, gsap.context(), cleanup. Use when animating in React or Next.js.
license: MIT
---

# GSAP with React

## When to Use This Skill

Apply when writing GSAP code in React or Next.js: setting up animations, cleaning up on unmount, or avoiding SSR issues.

**Related skills:** For tweens use **gsap-core** and **gsap-timeline**; for scroll use **gsap-scrolltrigger**.

## Installation

```bash
npm install gsap @gsap/react
```

## Prefer useGSAP() Hook

```javascript
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

const containerRef = useRef(null);
useGSAP(() => {
  gsap.to(".box", { x: 100 });
  gsap.from(".item", { opacity: 0, stagger: 0.1 });
}, { scope: containerRef });
```

- ✅ **scope** — selectors scoped to container ref
- ✅ Cleanup runs automatically on unmount
- ✅ Use **contextSafe** for event handler animations

## Dependency Array and revertOnUpdate

```javascript
useGSAP(() => {
  // gsap code
}, { dependencies: [endX], scope: container, revertOnUpdate: true });
```

## gsap.context() in useEffect (fallback)

When @gsap/react is not used:

```javascript
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to(".box", { x: 100 });
  }, containerRef);
  return () => ctx.revert();
}, []);
```

## Context-Safe Callbacks

```javascript
useGSAP((context, contextSafe) => {
  const onClick = contextSafe(() => {
    gsap.to(ref.current, { rotation: 180 });
  });
  ref.current.addEventListener('click', onClick);
  return () => ref.current.removeEventListener('click', onClick);
}, { scope: container });
```

## SSR (Next.js)

GSAP runs in the browser only. All GSAP code must be in useGSAP or useEffect — never during server render.

## Best Practices

- ✅ Prefer useGSAP() over useEffect for GSAP
- ✅ Always pass scope ref
- ✅ Client-only (useGSAP/useEffect)
- ✅ contextSafe for event handlers

## Do Not

- ❌ Target selectors without scope
- ❌ Skip cleanup (always ctx.revert())
- ❌ Run GSAP during SSR
