---
name: gsap-utils
description: Official GSAP skill for gsap.utils — clamp, mapRange, normalize, interpolate, random, snap, toArray, wrap, pipe, distribute, selector.
license: MIT
---

# gsap.utils

## Overview

Pure helpers on `gsap.utils`. No registration needed. Omit the last value argument to get a reusable function.

## Key Utils

### clamp(min, max, value?)
```javascript
gsap.utils.clamp(0, 100, 150); // 100
let c = gsap.utils.clamp(0, 100); c(150); // 100
```

### mapRange(inMin, inMax, outMin, outMax, value?)
```javascript
gsap.utils.mapRange(0, 1, 0, 360, 0.5); // 180
```

### normalize(min, max, value?)
```javascript
gsap.utils.normalize(0, 100, 50); // 0.5
```

### interpolate(start, end, progress?)
Handles numbers, colors, and objects:
```javascript
gsap.utils.interpolate("#ff0000", "#0000ff", 0.5); // mid color
```

### random(min, max[, snap, returnFunction])
```javascript
gsap.utils.random(-100, 100);           // immediate
let r = gsap.utils.random(-100, 100, 5, true); r(); // reusable
// In tweens: x: "random(-100, 100, 5)"
```

### snap(snapTo, value?)
```javascript
gsap.utils.snap(10, 23); // 20
gsap.utils.snap([0, 100, 200], 150); // nearest
```

### toArray(value, scope?)
```javascript
gsap.utils.toArray(".item"); // real array from selector
```

### selector(scope)
```javascript
const q = gsap.utils.selector(containerRef);
gsap.to(q(".box"), { x: 100 });
```

### wrap(min, max, value?) / wrapYoyo(min, max, value?)
```javascript
gsap.utils.wrap(0, 360, 370); // 10
gsap.utils.wrapYoyo(0, 100, 150); // 50
```

### pipe(...functions)
```javascript
const fn = gsap.utils.pipe(
  gsap.utils.normalize(0, 100),
  gsap.utils.snap(0.1)
);
```

### distribute(config)
```javascript
gsap.to(".class", {
  scale: gsap.utils.distribute({ base: 0.5, amount: 2.5, from: "center" })
});
```

## Best Practices

- ✅ Omit value for reusable functions in handlers
- ✅ Use selector(scope) in components
- ✅ Use toArray for mixed inputs
