---
name: gsap-timeline
description: Official GSAP skill for timelines — gsap.timeline(), position parameter, nesting, playback control.
license: MIT
---

# GSAP Timeline

## When to Use

Apply when building multi-step animations, coordinating several tweens in sequence or parallel.

## Creating Timelines

```javascript
const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power2.out" } });
tl.to(".a", { x: 100 })
  .to(".b", { y: 50 }, "-=0.3")     // overlap by 0.3s
  .to(".c", { opacity: 0 }, "+=0.2"); // gap of 0.2s
```

## Position Parameter

| Syntax | Meaning |
|--------|---------|
| `"+=0.5"` | 0.5s after previous end |
| `"-=0.3"` | 0.3s before previous end (overlap) |
| `1.5` | Absolute time 1.5s |
| `"myLabel"` | At label position |
| `"myLabel+=0.2"` | 0.2s after label |
| `"<"` | Start of previous tween |
| `"<0.5"` | 0.5s after previous start |
| `">"` | End of previous tween |

## Labels

```javascript
tl.addLabel("intro")
  .to(".a", { x: 100 })
  .addLabel("middle")
  .to(".b", { y: 50 }, "middle");
```

## Constructor Options

- **paused** — start paused
- **repeat** / **yoyo** — loop/alternate
- **defaults** — shared vars for all child tweens
- **onComplete**, **onStart**, **onUpdate** — callbacks
- **smoothChildTiming** — adjust parent when children change

## Nesting

```javascript
const master = gsap.timeline();
master.add(introTimeline()).add(mainTimeline(), "+=0.5");
```

## Playback Control

```javascript
tl.play(); tl.pause(); tl.reverse(); tl.restart();
tl.seek("myLabel"); tl.progress(0.5); tl.timeScale(2);
```

## Best Practices

- ✅ Prefer timelines over delay chains
- ✅ Use position parameter for precise timing
- ✅ Labels for maintainability
- ✅ Pass defaults to constructor
- ✅ ScrollTrigger on the timeline, not nested tweens

## Do Not

- ❌ Use delay instead of position parameter
- ❌ Omit defaults when tweens share duration/ease
- ❌ Nest ScrollTriggered animations inside timelines
