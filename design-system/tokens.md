# Design Tokens Reference

> Source of truth: `src/app/globals.css`
> All tokens are defined as CSS custom properties in `:root` and mapped to Tailwind via `@theme inline`.
> Tokens marked `[CLIENT]` are intended to be customized per client project.

---

## Colors — Core

| Variable | Tailwind class | Default (light) | Default (dark) | Usage |
|---|---|---|---|---|
| `--background` | `bg-background` | `oklch(1 0 0)` | `oklch(0.145 0 0)` | Page background `[CLIENT]` |
| `--foreground` | `text-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Default text color `[CLIENT]` |
| `--primary` | `bg-primary`, `text-primary` | `oklch(0.205 0 0)` | `oklch(0.922 0 0)` | Primary brand color, buttons, links `[CLIENT]` |
| `--primary-foreground` | `text-primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` | Text on primary backgrounds `[CLIENT]` |
| `--secondary` | `bg-secondary` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` | Secondary actions, subtle backgrounds `[CLIENT]` |
| `--secondary-foreground` | `text-secondary-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` | Text on secondary backgrounds `[CLIENT]` |
| `--muted` | `bg-muted` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` | Muted backgrounds for de-emphasized content |
| `--muted-foreground` | `text-muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` | Muted text (captions, placeholders) |
| `--accent` | `bg-accent` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` | Accent backgrounds (hover states, highlights) |
| `--accent-foreground` | `text-accent-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` | Text on accent backgrounds |
| `--destructive` | `bg-destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | Error states, delete actions |
| `--border` | `border-border` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` | Default border color |
| `--input` | `border-input` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 15%)` | Input field borders |
| `--ring` | `ring-ring` | `oklch(0.708 0 0)` | `oklch(0.556 0 0)` | Focus ring color |

## Colors — Custom

| Variable | Tailwind class | Default (light) | Default (dark) | Usage |
|---|---|---|---|---|
| `--cta` | `bg-cta`, `text-cta` | `oklch(0.588 0.215 264)` | `oklch(0.65 0.24 264)` | Call-to-action buttons, conversion elements `[CLIENT]` |
| `--success` | `bg-success`, `text-success` | `oklch(0.648 0.2 145)` | `oklch(0.72 0.22 145)` | Form success states, positive feedback `[CLIENT]` |

## Colors — Card & Popover

| Variable | Tailwind class | Default (light) | Default (dark) | Usage |
|---|---|---|---|---|
| `--card` | `bg-card` | `oklch(1 0 0)` | `oklch(0.205 0 0)` | Card surface color |
| `--card-foreground` | `text-card-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Text inside cards |
| `--popover` | `bg-popover` | `oklch(1 0 0)` | `oklch(0.205 0 0)` | Popover/dropdown surface |
| `--popover-foreground` | `text-popover-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Text inside popovers |

## Colors — Charts

| Variable | Tailwind class | Default (light) | Default (dark) | Usage |
|---|---|---|---|---|
| `--chart-1` | `text-chart-1` | `oklch(0.87 0 0)` | `oklch(0.87 0 0)` | Chart series 1 |
| `--chart-2` | `text-chart-2` | `oklch(0.556 0 0)` | `oklch(0.556 0 0)` | Chart series 2 |
| `--chart-3` | `text-chart-3` | `oklch(0.439 0 0)` | `oklch(0.439 0 0)` | Chart series 3 |
| `--chart-4` | `text-chart-4` | `oklch(0.371 0 0)` | `oklch(0.371 0 0)` | Chart series 4 |
| `--chart-5` | `text-chart-5` | `oklch(0.269 0 0)` | `oklch(0.269 0 0)` | Chart series 5 |

## Colors — Sidebar

| Variable | Tailwind class | Default (light) | Default (dark) | Usage |
|---|---|---|---|---|
| `--sidebar` | `bg-sidebar` | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` | Sidebar background |
| `--sidebar-foreground` | `text-sidebar-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Sidebar text |
| `--sidebar-primary` | `bg-sidebar-primary` | `oklch(0.205 0 0)` | `oklch(0.488 0.243 264.376)` | Sidebar active item |
| `--sidebar-primary-foreground` | `text-sidebar-primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.985 0 0)` | Text on sidebar active |
| `--sidebar-accent` | `bg-sidebar-accent` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` | Sidebar hover state |
| `--sidebar-accent-foreground` | `text-sidebar-accent-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` | Text on sidebar hover |
| `--sidebar-border` | `border-sidebar-border` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` | Sidebar borders |
| `--sidebar-ring` | `ring-sidebar-ring` | `oklch(0.708 0 0)` | `oklch(0.556 0 0)` | Sidebar focus ring |

---

## Typography

| Variable | Tailwind class | Default | Usage |
|---|---|---|---|
| `--font-sans` | `font-sans` | System font via `next/font` (Geist Sans) | Body text `[CLIENT]` |
| `--font-mono` | `font-mono` | Geist Mono via `next/font` | Code blocks, technical text |
| `--font-heading` | `font-heading` | Same as `--font-sans` | Headings (override for display fonts) `[CLIENT]` |

---

## Spacing

| Variable | Tailwind class | Default | Usage |
|---|---|---|---|
| `--spacing-section` | `py-section`, `mt-section`, etc. | `5rem` (80px) | Vertical padding between page sections `[CLIENT]` |
| `--spacing-section-lg` | `py-section-lg`, `mt-section-lg`, etc. | `7rem` (112px) | Large vertical padding (hero, footer) `[CLIENT]` |

---

## Border Radius

| Variable | Tailwind class | Default | Usage |
|---|---|---|---|
| `--radius` | (base value) | `0.625rem` (10px) | Base radius — all others derive from this `[CLIENT]` |
| `--radius-sm` | `rounded-sm` | `calc(var(--radius) * 0.6)` = 6px | Small elements (badges, chips) |
| `--radius-md` | `rounded-md` | `calc(var(--radius) * 0.8)` = 8px | Inputs, buttons |
| `--radius-lg` | `rounded-lg` | `var(--radius)` = 10px | Cards, dialogs |
| `--radius-xl` | `rounded-xl` | `calc(var(--radius) * 1.4)` = 14px | Large cards |
| `--radius-2xl` | `rounded-2xl` | `calc(var(--radius) * 1.8)` = 18px | Hero sections |
| `--radius-3xl` | `rounded-3xl` | `calc(var(--radius) * 2.2)` = 22px | Large containers |
| `--radius-4xl` | `rounded-4xl` | `calc(var(--radius) * 2.6)` = 26px | Maximum roundness |

---

## How to Customize for a Client

1. Override CSS variables in `:root` and `.dark` in `globals.css`
2. The `@theme inline` mappings will automatically pick up the new values
3. Focus on tokens marked `[CLIENT]` — those are designed to be swapped
4. Adjust `--radius` alone to change the entire roundness feel
5. Adjust `--spacing-section` to change the overall density of the layout
