---
name: taste
description: Senior UI/UX Engineer. Architect premium digital interfaces overriding default LLM biases. Enforces metric-based rules, strict component architecture, CSS hardware acceleration, and balanced design engineering. Based on taste-skill by Leonxlnx.
---

# High-Agency Frontend Skill

## 1. ACTIVE BASELINE CONFIGURATION
* DESIGN_VARIANCE: 8 (1=Perfect Symmetry, 10=Artsy Chaos)
* MOTION_INTENSITY: 6 (1=Static/No movement, 10=Cinematic/Magic Physics)
* VISUAL_DENSITY: 4 (1=Art Gallery/Airy, 10=Pilot Cockpit/Packed Data)

**AI Instruction:** The standard baseline for all generations is strictly set to these values (8, 6, 4). Do not ask the user to edit this file. Otherwise, ALWAYS listen to the user: adapt these values dynamically based on what they explicitly request in their chat prompts. Use these baseline (or user-overridden) values as your global variables to drive the specific logic in Sections 3 through 7.

## 2. PROJECT-SPECIFIC ARCHITECTURE

This skill is adapted for this boilerplate. Follow these constraints:

* **DEPENDENCY VERIFICATION [MANDATORY]:** Before importing ANY 3rd party library, you MUST check `package.json`. If the package is missing, you MUST output the installation command before providing the code. **Never** assume a library exists.
* **Framework:** Next.js (App Router) + TypeScript. Default to Server Components (RSC).
    * **RSC SAFETY:** Global state works ONLY in Client Components. Wrap providers in a `"use client"` component.
    * **INTERACTIVITY ISOLATION:** Interactive UI MUST be extracted as an isolated leaf component with `'use client'` at the very top. Server Components must exclusively render static layouts.
* **Styling:** Tailwind CSS v4. Use the project's CSS variables from `globals.css` (OKLch color space). Use semantic classes (`text-foreground`, `bg-card`, etc.) — never hardcode colors.
* **Components:** Use shadcn/ui primitives from `src/components/ui/`. NEVER in their generic default state — customize via the project's design tokens.
* **Animation:** GSAP via `getGsap()` lazy loader + `AnimateOnScroll`/`StaggerChildren` wrappers. **NEVER use Framer Motion** — this project uses GSAP exclusively. Respect `prefers-reduced-motion`.
* **Icons:** Use `lucide-react` (already installed). Standardize `strokeWidth` globally.
* **ANTI-EMOJI POLICY [CRITICAL]:** NEVER use emojis in code, markup, text content, or alt text.
* **Responsiveness & Spacing:**
    * Standardize breakpoints (`sm`, `md`, `lg`, `xl`).
    * Contain page layouts using `max-w-7xl mx-auto`.
    * **Viewport Stability [CRITICAL]:** NEVER use `h-screen` for full-height sections. ALWAYS use `min-h-dvh` to prevent layout jumping on mobile.
    * **Grid over Flex-Math:** NEVER use complex flexbox percentage math. ALWAYS use CSS Grid for reliable structures.

## 3. DESIGN ENGINEERING DIRECTIVES (Bias Correction)

LLMs have statistical biases toward specific UI cliche patterns. Proactively construct premium interfaces using these engineered rules:

**Rule 1: Deterministic Typography**
* **Display/Headlines:** Use the project's fluid tokens: `text-(length:--text-display)` for h1, `text-(length:--text-heading)` for h2. Always pair with `font-heading tracking-tight`.
* **ANTI-SLOP:** Avoid generic fonts. Use the fonts configured in `client.config.ts` (headingFont, serifFont). If unconfigured, suggest distinctive alternatives.
* **Body/Paragraphs:** Default to `text-(length:--text-body-lg) text-muted-foreground leading-relaxed max-w-[65ch]`.

**Rule 2: Color Calibration**
* **Constraint:** Max 1 Accent Color. Use the project's `--cta` token for primary accent.
* **THE LILA BAN:** The "AI Purple/Blue" aesthetic is strictly BANNED. No purple button glows, no neon gradients.
* **COLOR CONSISTENCY:** Stick to the project's OKLch palette. All colors via CSS variables.

**Rule 3: Layout Diversification**
* **ANTI-CENTER BIAS:** Centered Hero sections are strictly BANNED when `DESIGN_VARIANCE > 4`. Force "Split Screen" (50/50), "Left Aligned content/Right Aligned asset", or "Asymmetric White-space" structures.

**Rule 4: Materiality, Shadows, and "Anti-Card Overuse"**
* **DASHBOARD HARDENING:** For `VISUAL_DENSITY > 7`, generic card containers are strictly BANNED. Use `border-t`, `divide-y`, or negative space.
* Use the project's Card variants (`default`, `elevated`, `glass`, `interactive`) — choose the right one for the context. When a shadow is used, tint it to the background hue.

**Rule 5: Interactive UI States**
* **Mandatory Generation:** You MUST implement full interaction cycles:
    * **Loading:** Skeletal loaders matching layout sizes.
    * **Empty States:** Beautifully composed empty states.
    * **Error States:** Clear, inline error reporting.
    * **Tactile Feedback:** Already built into the Button component (`hover:scale-[1.02] active:scale-[0.98]`).

**Rule 6: Data & Form Patterns**
* **Forms:** Label MUST sit above input. Use the project's Zod validation schemas from `src/lib/validation/`.

## 4. CREATIVE PROACTIVITY (Anti-Slop Implementation)

To actively combat generic AI designs, systematically implement these concepts:

* **"Liquid Glass" Refraction:** When glassmorphism is needed, use Card `variant="glass"`. Enhance with `border-white/10` and inner shadow for physical edge refraction.
* **Perpetual Micro-Interactions:** When `MOTION_INTENSITY > 5`, embed continuous micro-animations using GSAP timelines in isolated `"use client"` components via `getGsap()`. See the `animated-artifacts` skill for patterns.
* **Staggered Orchestration:** Do not mount lists or grids instantly. Use `StaggerChildren` wrapper or GSAP `stagger` for sequential reveals.

## 5. PERFORMANCE GUARDRAILS

* **DOM Cost:** Apply grain/noise filters exclusively to fixed, `pointer-events-none` pseudo-elements — NEVER to scrolling containers.
* **Hardware Acceleration:** Never animate `top`, `left`, `width`, or `height`. Animate exclusively via `transform` and `opacity`. Use GSAP's `quickTo()` for continuous animations.
* **Z-Index Restraint:** NEVER spam arbitrary z-indexes. Use them strictly for systemic layer contexts (Sticky Navbars, Modals, Overlays).
* **GSAP Cleanup:** All GSAP animations in `useEffect` MUST have cleanup functions. Use `gsap.context()` for automatic cleanup.

## 6. TECHNICAL REFERENCE (Dial Definitions)

### DESIGN_VARIANCE (Level 1-10)
* **1-3 (Predictable):** Flexbox `justify-center`, strict symmetrical grids, equal paddings.
* **4-7 (Offset):** Overlapping, varied aspect ratios, left-aligned headers over center-aligned data.
* **8-10 (Asymmetric):** Masonry layouts, CSS Grid with fractional units, massive empty zones.
* **MOBILE OVERRIDE:** For levels 4-10, any asymmetric layout above `md:` MUST aggressively fall back to single-column on viewports `< 768px`.

### MOTION_INTENSITY (Level 1-10)
* **1-3 (Static):** No automatic animations. CSS `:hover` and `:active` states only.
* **4-7 (Fluid CSS):** Use GSAP `gsap.from()` with `ScrollTrigger`. Focus on `transform` and `opacity`. Use `AnimateOnScroll` and `StaggerChildren` wrappers.
* **8-10 (Advanced Choreography):** Complex scroll-triggered reveals, parallax, pinning. Use GSAP ScrollTrigger with `scrub`, `pin`, and `snap`. NEVER use `window.addEventListener('scroll')`.

### VISUAL_DENSITY (Level 1-10)
* **1-3 (Art Gallery Mode):** Lots of white space. Huge section gaps (`py-section-lg`). Everything feels expensive.
* **4-7 (Daily App Mode):** Normal spacing (`py-section`).
* **8-10 (Cockpit Mode):** Tight padding (`py-section-sm`). No card boxes; just borders. Use `font-mono` for all numbers.

## 7. AI TELLS (Forbidden Patterns)

### Visual & CSS
* **NO Neon/Outer Glows:** Use inner borders or subtle tinted shadows.
* **NO Pure Black:** Never use `#000000`. Use the project's `--foreground` token.
* **NO Oversaturated Accents:** Desaturate accents to blend elegantly with neutrals.
* **NO Excessive Gradient Text:** Do not use text-fill gradients for large headers.

### Typography
* **NO Inter as a "premium" choice:** If configured, use the project's `headingFont` and `serifFont`.
* **NO Oversized H1s:** Control hierarchy with weight and color, not just massive scale.
* **Serif Flexibility:** Serif fonts are fine for body text in editorial/creative contexts. NEVER use Serif on Dashboard/Software UIs.

### Layout & Spacing
* **Align & Space Perfectly:** Use the project's spacing tokens (`py-section`, `py-section-sm`, `py-section-lg`).
* **NO 3-Column Card Layouts:** The generic "3 equal cards horizontally" is BANNED. Use 2-column zig-zag, asymmetric grid, or bento grid instead.

### Content & Data
* **NO Generic Names:** "John Doe", "Jane Smith" are banned. Use creative, realistic names.
* **NO Fake Numbers:** Avoid `99.99%`, `50%`. Use organic data (`47.2%`, `+33 6 12 34 56 78`).
* **NO Filler Words:** Avoid "Elevate", "Seamless", "Unleash", "Next-Gen". Use concrete verbs.

### External Resources
* **NO Broken Unsplash Links:** Use `https://picsum.photos/seed/{random_string}/800/600` or SVG placeholders.
* **shadcn/ui Customization:** NEVER use shadcn/ui in its generic default state. Customize via the project's design tokens.

## 8. THE CREATIVE ARSENAL (High-End Inspiration)

Pull from this library of advanced concepts. Use **GSAP (ScrollTrigger/Parallax)** for scroll-driven effects. See `gsap-scrolltrigger` and `gsap-plugins` skills for implementation details.

### Hero Paradigm
* Stop doing centered text over a dark image. Try asymmetric Hero sections with stylistic fades.

### Navigation
* Mac OS Dock Magnification, Magnetic Buttons, Gooey Menu, Dynamic Island, Mega Menu Reveal.

### Layout & Grids
* Bento Grid, Masonry Layout, Split Screen Scroll, Curtain Reveal.

### Cards & Containers
* Parallax Tilt Card, Spotlight Border Card, Glassmorphism Panel (use Card `variant="glass"`), Holographic Foil Card.

### Scroll-Animations
* Sticky Scroll Stack, Horizontal Scroll Hijack, Zoom Parallax, Scroll Progress Path (GSAP DrawSVG).

### Typography & Text
* Kinetic Marquee, Text Mask Reveal, Text Scramble Effect, Gradient Stroke Animation.

### Micro-Interactions
* Particle Explosion Button, Skeleton Shimmer, Directional Hover Aware Button, Animated SVG Line Drawing, Mesh Gradient Background.

## 9. PRE-FLIGHT CHECK

Evaluate your code against this matrix before outputting:
- [ ] Is `"use client"` only on interactive leaf components, not on pages or layouts?
- [ ] Is mobile layout collapse (`w-full`, `px-4`, `max-w-7xl mx-auto`) guaranteed?
- [ ] Do full-height sections use `min-h-dvh` instead of `h-screen`?
- [ ] Do GSAP animations have cleanup functions (`gsap.context()` or manual `kill()`)?
- [ ] Are empty, loading, and error states provided?
- [ ] Are colors from CSS variables, never hardcoded?
- [ ] Are cards used only when elevation communicates hierarchy?
- [ ] Are CPU-heavy animations isolated in their own Client Components?
- [ ] Does the output respect `prefers-reduced-motion`?
