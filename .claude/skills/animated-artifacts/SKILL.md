---
name: animated-artifacts
description: Generate animated SVG micro-UIs and visual artifacts for sections — typewriter, card shuffler, waveform, geometric motifs, cursor protocols, pulse indicators, counters, orbital diagrams. Use when building interactive section decorations, feature card animations, or visual storytelling elements.
---

# Animated Artifacts

## Purpose

This skill teaches you to generate **animated micro-UIs** — small, self-contained visual components that make feature cards, hero sections, and content blocks feel like functional software interfaces rather than static marketing layouts.

These are NOT generic looping animations. Each artifact tells a micro-story related to the section's content.

## When to Use

- Building **feature/service cards** that need visual interest beyond icons
- Creating **hero section decorations** (geometric motifs, data visualizations)
- Adding **proof-of-concept animations** to product/SaaS landing pages
- Making **process/timeline steps** feel interactive
- Any time a section feels "flat" and needs a functional, premium micro-UI

## Architecture in This Project

All animated artifacts are **"use client"** components that use the project's existing animation infrastructure:

```typescript
// Always use the project's lazy GSAP loader
import { getGsap } from "@/lib/animations/gsap-config";

// Or the useGsap hook for simpler cases
import { useGsap } from "@/lib/hooks/use-gsap";
```

### File Location

```
src/components/animations/artifacts/
├── typewriter.tsx
├── card-shuffler.tsx
├── waveform.tsx
├── geometric-motif.tsx
├── cursor-protocol.tsx
├── pulse-indicator.tsx
├── orbital-diagram.tsx
└── index.ts
```

### Component Contract

Every artifact component follows this interface pattern:

```typescript
interface ArtifactProps {
  /** Content labels derived from the section's value proposition */
  labels: string[];
  /** Optional: override accent color (defaults to CSS var --cta) */
  accentColor?: string;
  /** Optional: className for the container */
  className?: string;
}
```

## Pattern Catalogue

### 1. Typewriter Feed

A monospace live-text feed that types out messages character-by-character with a blinking cursor.

**Use for:** Real-time data, monitoring, AI/tech features, log-style storytelling.

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterFeedProps {
  /** Messages to cycle through */
  messages: string[];
  /** Typing speed in ms per character. Default 40 */
  speed?: number;
  /** Pause between messages in ms. Default 2000 */
  pause?: number;
  /** Label shown above the feed */
  label?: string;
  className?: string;
}

export function TypewriterFeed({
  messages,
  speed = 40,
  pause = 2000,
  label = "Live Feed",
  className,
}: TypewriterFeedProps) {
  const [displayed, setDisplayed] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(messages[0]);
      setIsTyping(false);
      return;
    }

    const msg = messages[msgIndex % messages.length];

    if (isTyping) {
      if (charIndex < msg.length) {
        timerRef.current = setTimeout(() => {
          setDisplayed(msg.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, speed);
      } else {
        timerRef.current = setTimeout(() => {
          setIsTyping(false);
          setCharIndex(0);
          setMsgIndex((i) => i + 1);
        }, pause);
      }
    } else {
      timerRef.current = setTimeout(() => {
        setDisplayed("");
        setIsTyping(true);
      }, 300);
    }

    return () => clearTimeout(timerRef.current);
  }, [messages, msgIndex, charIndex, isTyping, speed, pause]);

  return (
    <div className={cn("rounded-2xl border bg-card p-4 font-mono text-sm", className)}>
      <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="inline-block size-1.5 animate-pulse rounded-full bg-[var(--cta)]" />
        {label}
      </div>
      <div className="min-h-[1.5em]">
        <span>{displayed}</span>
        <span className="ml-0.5 inline-block w-[2px] bg-[var(--cta)] animate-pulse">
          &nbsp;
        </span>
      </div>
    </div>
  );
}
```

### 2. Card Shuffler

Overlapping cards that cycle vertically every N seconds with a spring-bounce transition.

**Use for:** Multiple features, data categories, plan comparisons, rotating testimonials.

```tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface CardShufflerProps {
  /** Card labels (minimum 3) */
  cards: { title: string; subtitle?: string }[];
  /** Interval between shuffles in ms. Default 3000 */
  interval?: number;
  className?: string;
}

export function CardShuffler({
  cards,
  interval = 3000,
  className,
}: CardShufflerProps) {
  const [stack, setStack] = useState(cards);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    timerRef.current = setInterval(() => {
      setStack((prev) => {
        const next = [...prev];
        next.unshift(next.pop()!);
        return next;
      });
    }, interval);

    return () => clearInterval(timerRef.current);
  }, [interval]);

  return (
    <div className={cn("relative h-48 w-full", className)}>
      {stack.map((card, i) => (
        <div
          key={card.title}
          className="absolute inset-x-0 rounded-2xl border bg-card p-4 shadow-sm"
          style={{
            top: `${i * 12}px`,
            zIndex: stack.length - i,
            opacity: 1 - i * 0.2,
            scale: `${1 - i * 0.04}`,
            transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <p className="font-heading text-sm font-semibold">{card.title}</p>
          {card.subtitle && (
            <p className="mt-1 text-xs text-muted-foreground">{card.subtitle}</p>
          )}
        </div>
      ))}
    </div>
  );
}
```

### 3. SVG Waveform

An animated EKG/audio waveform using SVG path with `stroke-dashoffset` animation.

**Use for:** Health, audio, real-time data, monitoring, signal processing.

```tsx
"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface WaveformProps {
  /** Number of wave cycles. Default 3 */
  cycles?: number;
  /** Animation duration in seconds. Default 2 */
  duration?: number;
  className?: string;
}

export function Waveform({ cycles = 3, duration = 2, className }: WaveformProps) {
  const pathRef = useRef<SVGPathElement>(null);

  // Generate EKG-style path
  const generatePath = () => {
    const w = 300;
    const h = 80;
    const mid = h / 2;
    const segW = w / cycles;
    let d = `M 0 ${mid}`;

    for (let i = 0; i < cycles; i++) {
      const x = i * segW;
      d += ` L ${x + segW * 0.3} ${mid}`;
      d += ` L ${x + segW * 0.35} ${mid - 25}`;
      d += ` L ${x + segW * 0.4} ${mid + 35}`;
      d += ` L ${x + segW * 0.45} ${mid - 15}`;
      d += ` L ${x + segW * 0.55} ${mid}`;
      d += ` L ${x + segW} ${mid}`;
    }
    return d;
  };

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.style.animation = `waveform-draw ${duration}s ease-in-out infinite`;
  }, [duration]);

  return (
    <div className={cn("overflow-hidden rounded-2xl border bg-card p-4", className)}>
      <style>{`
        @keyframes waveform-draw {
          0% { stroke-dashoffset: var(--path-length); }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: calc(var(--path-length) * -1); }
        }
      `}</style>
      <svg viewBox="0 0 300 80" className="w-full" aria-hidden="true">
        <path
          ref={pathRef}
          d={generatePath()}
          fill="none"
          stroke="var(--cta)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
```

### 4. Geometric Motif

A slowly rotating SVG geometric pattern (concentric circles, double helix, or radial lines).

**Use for:** Tech, precision, engineering, abstract brand identity, background decoration.

```tsx
"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/animations/gsap-config";
import { cn } from "@/lib/utils";

type MotifVariant = "concentric" | "radial" | "helix";

interface GeometricMotifProps {
  variant?: MotifVariant;
  /** Size in px. Default 200 */
  size?: number;
  className?: string;
}

export function GeometricMotif({
  variant = "concentric",
  size = 200,
  className,
}: GeometricMotifProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;

    getGsap().then(({ gsap }) => {
      if (!svgRef.current?.isConnected) return;

      const elements = svgRef.current.querySelectorAll("[data-animate]");
      const tween = gsap.to(elements, {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
        transformOrigin: "center center",
        stagger: { each: 2, from: "center" },
      });

      cleanup = () => tween.kill();
    });

    return () => cleanup?.();
  }, []);

  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        {variant === "concentric" &&
          [0.2, 0.35, 0.5, 0.65, 0.8].map((r, i) => (
            <circle
              key={i}
              data-animate
              cx={cx}
              cy={cy}
              r={cx * r}
              fill="none"
              stroke="var(--cta)"
              strokeWidth="1"
              opacity={0.15 + i * 0.1}
              strokeDasharray={i % 2 === 0 ? "4 8" : "none"}
            />
          ))}

        {variant === "radial" &&
          Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const inner = cx * 0.2;
            const outer = cx * 0.85;
            return (
              <line
                key={i}
                data-animate
                x1={cx + Math.cos(angle) * inner}
                y1={cy + Math.sin(angle) * inner}
                x2={cx + Math.cos(angle) * outer}
                y2={cy + Math.sin(angle) * outer}
                stroke="var(--cta)"
                strokeWidth="1"
                opacity={0.2 + (i % 3) * 0.15}
              />
            );
          })}

        {variant === "helix" &&
          [0, 1].map((strand) => {
            const points = Array.from({ length: 20 }, (_, i) => {
              const t = i / 19;
              const x = cx + Math.sin(t * Math.PI * 3 + strand * Math.PI) * cx * 0.6;
              const y = cy * 0.1 + t * size * 0.8;
              return `${x},${y}`;
            }).join(" ");
            return (
              <polyline
                key={strand}
                data-animate
                points={points}
                fill="none"
                stroke="var(--cta)"
                strokeWidth="1.5"
                opacity={0.4}
              />
            );
          })}
      </svg>
    </div>
  );
}
```

### 5. Cursor Protocol

An animated SVG cursor that enters, navigates to elements, clicks, and activates them.

**Use for:** Scheduling, form demos, interactive tutorials, product walkthroughs.

```tsx
"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/animations/gsap-config";
import { cn } from "@/lib/utils";

interface CursorProtocolProps {
  /** Grid items (e.g., days of week, form fields) */
  items: string[];
  /** Which items to "activate" in sequence */
  activeIndices: number[];
  /** Label for the action button */
  actionLabel?: string;
  className?: string;
}

export function CursorProtocol({
  items,
  activeIndices,
  actionLabel = "Save",
  className,
}: CursorProtocolProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!containerRef.current || !cursorRef.current) return;

    let cleanup: (() => void) | undefined;

    getGsap().then(({ gsap }) => {
      if (!containerRef.current?.isConnected) return;

      const cursor = cursorRef.current!;
      const cells = containerRef.current!.querySelectorAll("[data-cell]");
      const btn = containerRef.current!.querySelector("[data-action]");
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

      // Cursor enters
      tl.fromTo(cursor, { autoAlpha: 0, x: -20, y: -20 }, { autoAlpha: 0.8, x: 0, y: 0, duration: 0.4 });

      // Navigate and click each active cell
      activeIndices.forEach((idx) => {
        const cell = cells[idx] as HTMLElement;
        if (!cell) return;
        tl.to(cursor, {
          x: cell.offsetLeft + cell.offsetWidth / 2,
          y: cell.offsetTop + cell.offsetHeight / 2,
          duration: 0.5,
          ease: "power2.inOut",
        });
        tl.to(cursor, { scale: 0.9, duration: 0.1 });
        tl.to(cursor, { scale: 1, duration: 0.1 });
        tl.to(cell, { backgroundColor: "var(--cta)", color: "white", duration: 0.2 }, "<");
      });

      // Click action button
      if (btn) {
        tl.to(cursor, {
          x: (btn as HTMLElement).offsetLeft + (btn as HTMLElement).offsetWidth / 2,
          y: (btn as HTMLElement).offsetTop + (btn as HTMLElement).offsetHeight / 2,
          duration: 0.4,
          ease: "power2.inOut",
        });
        tl.to(cursor, { scale: 0.9, duration: 0.1 });
        tl.to(cursor, { scale: 1, duration: 0.1 });
      }

      // Cursor exits
      tl.to(cursor, { autoAlpha: 0, duration: 0.3 }, "+=0.5");

      // Reset cells
      tl.to(cells, { backgroundColor: "", color: "", duration: 0.3 });

      cleanup = () => tl.kill();
    });

    return () => cleanup?.();
  }, [activeIndices, actionLabel]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-2xl border bg-card p-4", className)}
    >
      {/* Cursor SVG */}
      <div
        ref={cursorRef}
        className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 opacity-0"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="var(--cta)">
          <path d="M2 2l7 16 2.5-6.5L18 9z" />
        </svg>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1">
        {items.map((item, i) => (
          <div
            key={i}
            data-cell
            className="flex items-center justify-center rounded-lg p-2 text-xs font-medium transition-colors"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Action button */}
      <button
        data-action
        className="mt-3 w-full rounded-xl bg-muted px-3 py-1.5 text-xs font-medium"
      >
        {actionLabel}
      </button>
    </div>
  );
}
```

### 6. Pulse Indicator

A status indicator with concentric pulse rings — the "system operational" dot.

**Use for:** Status displays, live indicators, footer elements, trust signals.

```tsx
"use client";

import { cn } from "@/lib/utils";

interface PulseIndicatorProps {
  /** Status label */
  label?: string;
  /** Color — uses CSS variable name. Default "var(--success)" */
  color?: string;
  /** Size of the dot in px. Default 8 */
  size?: number;
  className?: string;
}

export function PulseIndicator({
  label = "System Operational",
  color = "var(--success)",
  size = 8,
  className,
}: PulseIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-2 font-mono text-xs text-muted-foreground", className)}>
      <span className="relative flex items-center justify-center">
        <span
          className="absolute animate-ping rounded-full opacity-30"
          style={{ width: size * 2.5, height: size * 2.5, backgroundColor: color }}
        />
        <span
          className="relative rounded-full"
          style={{ width: size, height: size, backgroundColor: color }}
        />
      </span>
      {label}
    </div>
  );
}
```

### 7. Orbital Diagram

Animated concentric orbits with dots moving at different speeds.

**Use for:** Ecosystem, integrations, platform architecture, connected services.

```tsx
"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/animations/gsap-config";
import { cn } from "@/lib/utils";

interface OrbitalDiagramProps {
  /** Labels for orbital nodes */
  nodes?: string[];
  /** Size in px. Default 250 */
  size?: number;
  className?: string;
}

export function OrbitalDiagram({
  nodes = [],
  size = 250,
  className,
}: OrbitalDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;

    getGsap().then(({ gsap }) => {
      if (!svgRef.current?.isConnected) return;

      const dots = svgRef.current.querySelectorAll("[data-orbit-dot]");
      const tweens = Array.from(dots).map((dot, i) =>
        gsap.to(dot, {
          rotation: 360,
          duration: 8 + i * 4,
          ease: "none",
          repeat: -1,
          transformOrigin: `${size / 2}px ${size / 2}px`,
        })
      );

      cleanup = () => tweens.forEach((t) => t.kill());
    });

    return () => cleanup?.();
  }, [size]);

  const cx = size / 2;
  const orbits = [0.25, 0.45, 0.65];

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        {/* Center dot */}
        <circle cx={cx} cy={cx} r={4} fill="var(--cta)" />

        {/* Orbits + dots */}
        {orbits.map((r, i) => (
          <g key={i}>
            <circle
              cx={cx}
              cy={cx}
              r={cx * r}
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <circle
              data-orbit-dot
              cx={cx + cx * r}
              cy={cx}
              r={5}
              fill="var(--cta)"
              opacity={0.6 + i * 0.15}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
```

## Integration Rules

### Design System Compliance

- **Colors:** Always use CSS variables (`var(--cta)`, `var(--success)`, `var(--border)`, `var(--muted-foreground)`). NEVER hardcode hex values.
- **Typography:** Use project font classes (`font-mono`, `font-heading`, `font-sans`).
- **Radius:** Use `rounded-2xl` for artifact containers (matches project's premium radius system).
- **Borders:** Use `border` class (maps to `var(--border)`).
- **Background:** Use `bg-card` for artifact surfaces.

### Accessibility

- **prefers-reduced-motion:** EVERY artifact MUST check and respect this. Show static state instead.
- **aria-hidden="true"** on all decorative SVGs.
- Artifacts are decorative — they must NOT contain essential content.
- No seizure-inducing flash rates (max 3 flashes/second).

### Performance

- Use **CSS animations** (animate-pulse, animate-ping, @keyframes) for simple effects.
- Use **GSAP** (via getGsap() or useGsap hook) only for complex multi-step sequences.
- Use **will-change: transform** sparingly — only on elements with continuous animation.
- Artifacts should be lazy — use dynamic import or place in client components that render below the fold.

### Content Derivation

Artifact content (labels, messages, items) should be **derived from the section's value proposition**, not generic placeholder text. When generating an artifact for a feature card:

1. Read the card's title and description
2. Generate 3-5 contextual labels/messages that relate to the feature
3. Choose the artifact pattern that best matches the feature's domain

**Mapping guide:**

| Feature Domain | Best Artifact |
|---|---|
| Real-time, monitoring, AI | TypewriterFeed |
| Multiple categories, plans | CardShuffler |
| Health, audio, signals | Waveform |
| Tech, precision, abstract | GeometricMotif |
| Scheduling, workflows, UX | CursorProtocol |
| Status, uptime, trust | PulseIndicator |
| Platform, ecosystem | OrbitalDiagram |

### Setup Integration

When `pnpm setup` generates pages with feature cards, the setup script can optionally add artifact components to cards based on the siteType:

- **saas** → TypewriterFeed + CardShuffler + CursorProtocol
- **marketing** → GeometricMotif + PulseIndicator
- **portfolio** → Waveform + OrbitalDiagram
- **corporate** → CardShuffler + PulseIndicator
- **landing** → Choose based on value propositions

### Prompt-Driven Generation

When the developer asks to "make this section more interactive" or "add visual artifacts", follow this process:

1. Read the section's content (headings, descriptions, value props)
2. Select 1-3 artifact patterns from the catalogue above
3. Derive contextual labels from the content
4. Implement as client components with proper GSAP cleanup
5. Place artifacts alongside or inside the section cards

Example prompt → response:

> "Add animated artifacts to the features section"

→ Read feature card titles → Map each to an artifact pattern → Generate with contextual labels → Place inside each card's visual area.
