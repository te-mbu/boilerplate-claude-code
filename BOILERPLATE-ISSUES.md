# Boilerplate Issues — Retour d'expérience complet

## Purpose

Ce fichier documente **tous** les problèmes rencontrés en utilisant le boilerplate `terence-nextjs-boilerplate` pour le projet TrajectoireDroit. Il sert de spec pour corriger le boilerplate source avant le prochain projet.

**Boilerplate source :** `~/Desktop/terence-nextjs-boilerplate/`

---

## Status

| # | Issue | Priorité | Status |
|---|-------|----------|--------|
| **BUILD BLOCKERS** | | | |
| 1 | .npmrc manquant — pnpm strict mode | P0 | ✅ FIXED |
| 2 | Sanity en dep obligatoire même en mode static | P1 | ✅ FIXED |
| 3 | shadcn CLI en dependencies au lieu de devDependencies | P1 | ✅ FIXED |
| 4 | @ts-expect-error obsolète dans contact-form.tsx | P0 | ✅ FIXED |
| 9 | src/app/page.tsx du starter Next.js non supprimé | P0 | ✅ FIXED |
| **SETUP / CONFIG** | | | |
| 5 | Defaults client.config.ts incohérents avec CLAUDE.md | P3 | ✅ FIXED |
| 6 | Liens orphelins après setup (navbar/footer → pages désactivées) | P2 | ✅ FIXED |
| 7 | Layout components pas adaptés au siteType | P2 | ✅ FIXED |
| 8 | Placeholders [CLIENT_NAME] restants après setup | P2 | ✅ FIXED |
| 20 | --font-heading pas documenté dans le setup | P2 | ✅ FIXED |
| 28 | pnpm setup ne câble pas les animations dans les sections | P0 | ⬜ |
| 34 | Setup navbar regex fragile — casse sur NavItem multi-ligne | P2 | ⬜ NEW |
| 35 | siteType "engine" existe dans les types mais pas de template home | P3 | ⬜ NEW |
| 36 | Setup home generators ignorent la moitié des sections disponibles | P2 | ⬜ NEW |
| **PERFORMANCE** | | | |
| 11 | Middleware next-intl actif sur site monolingue | P1 | ✅ FIXED |
| 12 | GSAP + ScrollTrigger importés statiquement (~50KB) | P1 | ✅ FIXED |
| 13 | useMediaQuery cause CLS (useState au lieu de useSyncExternalStore) | P2 | ✅ FIXED |
| 14 | Navbar scroll listener → re-renders à chaque pixel | P2 | ✅ FIXED |
| 15 | NavbarMobile chargé même sur desktop | P2 | ✅ FIXED |
| 16 | Composants below-fold non code-split | P2 | ⬜ Doc only |
| **DESIGN SYSTEM — ARCHITECTURE (le vrai problème)** | | | |
| 32 | Composants section preset empêchent tout design custom | **P0** | ⬜ |
| 33 | Skill ui-ux-pro-max jamais consulté automatiquement | P1 | ⬜ |
| 29 | pnpm design ne touche que les tokens, pas les composants | P2 | ⬜ |
| 37 | Pas de pont entre la sortie du skill et les composants | P1 | ⬜ NEW |
| **DESIGN SYSTEM — TOKENS** | | | |
| 22 | Cards shadcn sans profondeur (ring-1 au lieu de shadow) | P0 | ⬜ |
| 23 | Typographie uniforme — pas de tokens fluides clamp() | P1 | ⬜ |
| 24 | Spacing uniforme entre sections — aucun rythme | P1 | ⬜ |
| 25 | Boutons sans feedback interactif (scale, icon animation) | P2 | ⬜ |
| 38 | globals.css n'a pas --text-display/heading/body-lg ni --spacing-section-sm | P1 | ⬜ NEW |
| **DESIGN SYSTEM — COMPOSANTS** | | | |
| 21 | Animations scroll existantes mais jamais câblées | P0 | ⬜ |
| 27 | Navbar sans indicateur actif (usePathname absent) | P2 | ⬜ |
| 39 | contact-form.tsx submission est un stub (no-op console.log) | P2 | ⬜ NEW |
| 40 | LenisProvider absent du layout malgré CSS importé | P2 | ⬜ NEW |
| 41 | frontend-design.md est un fichier nu dans .claude/skills/, pas un skill | P3 | ⬜ NEW |
| **CODE QUALITY** | | | |
| 10 | Pas de skill UI/UX design pré-installé | P2 | ✅ FIXED |
| 17 | Pas de LenisProvider + GSAP sync | P2 | ✅ FIXED |
| 18 | static-provider rempli de 600 lignes de données fictives | P1 | ✅ FIXED |
| 19 | Structured data SearchAction pointe vers /blog même sans blog | P2 | ✅ FIXED |
| 42 | design.ts duplique hexToOklch de setup.ts verbatim | P3 | ⬜ NEW |
| 43 | design.ts applique les couleurs à :root mais jamais à .dark | P1 | ⬜ NEW |
| 44 | Button utilise Base UI render prop, pas shadcn asChild — non documenté | P2 | ⬜ NEW |

---

## Issues détaillées

---

### 1. pnpm strict mode — .npmrc manquant ✅ FIXED

**Symptôme :** 31 erreurs `Module not found` au premier `pnpm build`.

**Cause :** pnpm en mode strict ne hoiste pas les sous-dépendances de `@base-ui/react`.

**Fix :** Inclure `.npmrc` avec `shamefully-hoist=true`.

---

### 2. @sanity/client en dépendance obligatoire ✅ FIXED

**Symptôme :** Turbopack analyse `sanity-provider.ts` même quand `CONTENT_PROVIDER !== "sanity"`.

**Fix :** Ne pas inclure `@sanity/client` par défaut. Le script setup installe quand `cms: "sanity"`.

---

### 3. shadcn CLI en dependencies ✅ FIXED

**Fix :** Déplacer `shadcn` dans `devDependencies`.

---

### 4. @ts-expect-error obsolète ✅ FIXED

**Fix :** Supprimer le directive ou vérifier le build clean avant chaque release.

---

### 5. Defaults incohérents ✅ FIXED

**Fix :** Aligner les defaults de `client.config.ts` avec les placeholders CLAUDE.md.

---

### 6. Liens orphelins après setup ✅ FIXED

**Fix :** Nav items et footer links générés dynamiquement depuis `client.config.ts`.

---

### 7. Layout pas adapté au siteType ✅ FIXED

**Fix :** 2 templates navbar/footer par siteType, copiés par le setup.

---

### 8. Placeholders non remplacés ✅ FIXED

**Fix :** Find-and-replace global de `[CLIENT_NAME]` dans tous les .md.

---

### 9. page.tsx starter non supprimé ✅ FIXED

**Fix :** Ne pas inclure `src/app/page.tsx` dans le template.

---

### 10. Pas de skill UI/UX design ✅ FIXED

**Fix :** `ui-ux-pro-max` pré-installé dans `.claude/skills/`.

---

### 11. Middleware next-intl actif en monolingue ✅ FIXED

**Fix :** Middleware désactivé par défaut, activé par `pnpm setup` quand `i18n: true`.

---

### 12. GSAP importé statiquement ✅ FIXED

**Fix :** Pattern lazy-loading (`getGsap()`) par défaut.

---

### 13. useMediaQuery cause CLS ✅ FIXED

**Fix :** `useSyncExternalStore` au lieu de `useState + useEffect`.

---

### 14. Navbar scroll re-renders ✅ FIXED

**Fix :** Comparaison booléenne avant `setState`.

---

### 15. NavbarMobile chargé sur desktop ✅ FIXED

**Fix :** `React.lazy` + rendu conditionnel.

---

### 16. Composants below-fold non code-split

**Symptôme :** Bundle JS initial lourd — tous les composants client dans le même chunk.

**Fix recommandé :** Documenter le pattern `next/dynamic` pour les sections below-fold.

---

### 17. LenisProvider + GSAP sync ✅ FIXED

**Fix :** `lenis-provider.tsx` avec `autoRaf: false` + `gsap.ticker.add()`.

---

### 18. static-provider données fictives ✅ FIXED

**Fix :** Stubs minimaux + génération depuis `client.config.ts`.

---

### 19. SearchAction pointe vers /blog ✅ FIXED

**Fix :** Conditionner à `features.blog: true`.

---

### 20. --font-heading pas documenté ✅ FIXED

**Fix :** `headingFont` dans `client.config.ts`, appliqué par le setup.

---

### 21. Animations scroll existantes mais jamais câblées — CRITIQUE

**Symptôme :** `AnimateOnScroll`, `StaggerChildren`, `CountUp` existent dans `src/components/animations/` et fonctionnent parfaitement. Mais **aucune section ni aucune page ne les importe**. Tout le contenu apparaît d'un coup — zéro animation de reveal.

**Cause :** Les composants d'animation et les composants de section ont été développés indépendamment. Personne n'a fermé la boucle.

**Fix recommandé :**
- Si on garde des sections (Option B de #32) : chaque section wrapping layout devrait accepter un prop `animated` et utiliser les wrappers en interne
- Si on compose à la main (Option A de #32) : le CLAUDE.md doit explicitement dire "wrap chaque section et chaque grid dans AnimateOnScroll/StaggerChildren"
- Le script setup devrait pré-câbler les animations dans les pages générées

---

### 22. Cards shadcn sans profondeur — CRITIQUE

**Symptôme :** `card.tsx` applique `ring-1 ring-foreground/10`. Pas de shadow, pas de hover state. Toutes les cards sont identiques.

**Fix recommandé :**
```tsx
// Remplacer dans card.tsx :
// AVANT: ring-1 ring-foreground/10
// APRÈS:
"border border-border/50 shadow-sm transition-shadow duration-300 hover:shadow-md"
```
- Ajouter un prop `variant` : `default | elevated | glass | interactive`
- `elevated` → `shadow-md hover:shadow-lg hover:-translate-y-0.5`
- `glass` → `bg-white/80 backdrop-blur-sm border-white/20`
- `interactive` → `hover:shadow-cta/10 hover:border-cta/20`

---

### 23. Typographie uniforme — pas de tokens fluides

**Symptôme :** Tous les h2 = `text-3xl font-bold tracking-tight sm:text-4xl`. Hero h1 trop proche en taille. Aucun fluid sizing.

**Fix recommandé — ajouter dans globals.css `@theme inline` :**
```css
--text-display: clamp(2.5rem, 5vw + 1rem, 4.5rem);
--text-heading: clamp(1.75rem, 3vw + 0.5rem, 2.5rem);
--text-body-lg: clamp(1.05rem, 1vw + 0.5rem, 1.25rem);
```
Usage Tailwind v4 : `text-display`, `text-heading`, `text-body-lg` (noms automatiquement déduits des variables).

---

### 24. Spacing uniforme — aucun rythme

**Symptôme :** Chaque section = `py-12 md:py-20` ou `py-16 md:py-24`. Pile de blocs identiques.

**Fix recommandé — ajouter dans globals.css `@theme inline` :**
```css
--spacing-section-sm: clamp(2.5rem, 4vw, 3.5rem);   /* stats, logos, dividers */
--spacing-section: clamp(4rem, 7vw, 6rem);            /* features, FAQ, témoignages */
--spacing-section-lg: clamp(5rem, 10vw, 8rem);        /* hero, CTA final */
```
Usage Tailwind v4 : `py-section-sm`, `py-section`, `py-section-lg`.

---

### 25. Boutons sans feedback interactif

**Symptôme :** Seul hover = changement d'opacité du background. Pas de scale, pas de mouvement d'icône.

**Fix recommandé — ajouter au base cva dans button.tsx :**
```
hover:scale-[1.02] active:scale-[0.98]
[&_svg]:transition-transform [&_svg]:duration-200
hover:[&_svg:last-child]:translate-x-0.5
```
Nouvelle variante `cta` :
```
bg-cta text-cta-foreground shadow-lg shadow-cta/25 hover:shadow-xl hover:shadow-cta/30 font-semibold
```

---

### 27. Navbar sans indicateur actif

**Symptôme :** Pas de `usePathname()`. Pas de visual diff entre page courante et autres liens. Hover = `hover:bg-muted` (pill muted).

**Fix recommandé :**
- Importer `usePathname()` dans la navbar (→ "use client")
- Active link : underline via `::after` avec `scaleX(1)` quand `pathname === href`
- Hover : underline animé `scaleX(0) → scaleX(1)` au lieu du bg-muted

---

### 28. pnpm setup ne câble pas les animations

**Symptôme :** Setup personnalise routes, navbar, footer, meta. Mais les pages générées sont 100% statiques — aucune animation wrappée.

**Fix recommandé :** Les home page generators dans `setup.ts` (`homeMarketing`, etc.) doivent :
- Importer `AnimateOnScroll`, `StaggerChildren` depuis `@/components/animations`
- Wrapper chaque section avec `<AnimateOnScroll preset="fade-up">`
- Wrapper les grids avec `<StaggerChildren>`

---

### 29. pnpm design ne touche que les tokens

**Symptôme :** `pnpm design` écrit les couleurs/typo/radius dans `globals.css`. Les composants ne changent pas. Le style "Liquid Glass" recommandé ne se traduit jamais en `backdrop-blur` sur les cards.

**Fix recommandé :** Après les tokens, `pnpm design` devrait :
- Mettre à jour le `variant` du Card dans `card.tsx` selon le style (glass/elevated/solid)
- Mettre à jour les section backgrounds (gradient/solid/none)
- Mettre à jour les shadow depths

---

### 32. Composants section preset empêchent tout design custom — **LE PROBLÈME PRINCIPAL**

**Symptôme :** Le skill recommande "Liquid Glass" (backdrop-blur, translucence, morphing, animations 400-600ms). Les composants `FeaturesGrid`, `StatsBar`, `TestimonialsGrid`, etc. sont des **boîtes fermées** qui encapsulent layout + spacing + markup + styling. Impossible d'appliquer les recommandations sans tout réécrire.

**Cause profonde :** Architecture "preset réutilisable" : on passe des props et le composant décide de tout. C'est l'opposé du design custom.

**Conséquences :**
1. Glass cards avec `backdrop-filter: blur(15px)` → impossible, le preset force `bg-card`
2. Animations par élément 400-600ms → impossible, le preset rend une grille monolithique
3. Layouts variés (full-width, asymétrique, overlap) → impossible, le preset force `max-w-6xl mx-auto grid gap-6`
4. Même squelette partout (heading + subheading + grid) → monotonie structurelle
5. `AnimateOnScroll` autour d'un preset anime le bloc entier, pas les éléments → grossier
6. Résultat immédiatement identifiable comme "template IA"

**Fix recommandé — restructuration du boilerplate :**

**Option A (recommandée pour premium) — Supprimer les presets, composer avec primitives.**
- Supprimer tout `src/components/sections/`
- Garder : `src/components/ui/` (shadcn), `src/components/animations/`, `src/components/layout/`
- Chaque page compose ses sections en JSX avec Card, Badge, Button, etc.
- Le skill ui-ux-pro-max guide la composition via le CLAUDE.md
- Les animations sont appliquées élément par élément
- Plus de code par page, mais chaque page est unique

**Option B (recommandée comme défaut) — Transformer les presets en layouts flexibles.**
- Les sections exposent uniquement la **structure** via `children` slots
- Pas de style, pas de contenu — juste le squelette
- Exemple : `<SectionGrid columns={3}>{children}</SectionGrid>` au lieu de `<FeaturesGrid features={data} />`
- Le contenu et le style viennent de la page

**Action concrète :**
- Déplacer les presets actuels dans `examples/sections/` pour référence
- Le boilerplate par défaut utilise Option B (layouts)
- Le CLAUDE.md documente les deux approches et quand utiliser chacune

---

### 33. Skill ui-ux-pro-max jamais consulté automatiquement

**Symptôme :** Le skill retourne des recommandations précises mais aucun composant n'en est conscient. Les recommandations sont manuelles.

**Fix recommandé :**
- `pnpm design` devrait générer `design-system/style-config.ts` exportant les variables de style (card variant, shadow depth, animation timing, section backgrounds)
- Le CLAUDE.md devrait dire : "AVANT de coder une section, lance `python3 .claude/skills/ui-ux-pro-max/scripts/search.py` avec le bon domaine"
- Les pages sont composées à la main (Option A/B), le skill guide la direction

---

### 34. Setup navbar regex fragile — NEW

**Symptôme :** `setup.ts` ligne ~635 : le regex pour supprimer un NavItem (`\{[^}]*href:\s*"${href}"[^}]*\}`) ne matche que les objets sur une seule ligne. Un NavItem formatté sur plusieurs lignes ne sera pas supprimé.

**Fix recommandé :** Utiliser un parser AST (ts-morph) ou un regex multi-ligne plus robuste.

---

### 35. siteType "engine" sans template home — NEW

**Symptôme :** `setup-types.ts` liste `"engine"` comme siteType valide. Mais `setup.ts` le mappe silencieusement vers `homeMarketing()`. Aucune indication que le type "engine" n'a pas de template dédié.

**Fix recommandé :** Soit créer `homeEngine()`, soit supprimer `"engine"` des types valides.

---

### 36. Setup home generators ignorent la moitié des sections — NEW

**Symptôme :** Les 5 generators home (`homeMarketing`, `homePortfolio`, etc.) n'utilisent que ~8 sections sur les 17 disponibles. `ProcessSteps`, `Marquee`, `GalleryGrid`, `ComparisonCards`, `ChangelogList`, `TestimonialCarousel`, `FeaturesAlternating` ne sont jamais scaffoldés.

**Fix recommandé :** Soit les generators utilisent plus de variété de sections, soit (mieux) les presets sont supprimés au profit de la composition directe (#32).

---

### 37. Pas de pont entre le skill et les design tokens — NEW

**Symptôme :** Le skill `ui-ux-pro-max` retourne : style (Liquid Glass), palette (hex), typography (font pair), effects (backdrop-filter, morphing, 400-600ms). Mais il n'y a aucun fichier, aucun script, aucune automation qui traduit cette sortie en CSS variables ou en classes Tailwind.

**Flux actuel :** skill → terminal output → développeur lit → copie manuellement dans globals.css.

**Fix recommandé :**
- `pnpm design` devrait parser la sortie du skill et écrire automatiquement :
  - Couleurs → `:root` + `.dark` dans globals.css (déjà fait pour les couleurs)
  - Style → `design-system/style-config.ts` (card variant, shadow depth, animation easing)
  - Typography → `client.config.ts` headingFont + layout.tsx import
  - Effects → utility classes dans globals.css (`.glass-card`, `.glow-cta`, etc.)

---

### 38. globals.css manque les tokens fluides — NEW

**Symptôme :** Le boilerplate source (`terence-nextjs-boilerplate`) ne définit PAS :
- `--text-display`, `--text-heading`, `--text-body-lg` (typographie fluide)
- `--spacing-section-sm` (seuls `--spacing-section` et `--spacing-section-lg` existent)

Ces tokens ont été ajoutés manuellement pendant le projet TrajectoireDroit. Sans eux, la typographie et le spacing sont flat par défaut.

**Fix recommandé :** Ajouter dans le `@theme inline` du boilerplate :
```css
/* Typography: fluid sizes */
--text-display: clamp(2.5rem, 5vw + 1rem, 4.5rem);
--text-heading: clamp(1.75rem, 3vw + 0.5rem, 2.5rem);
--text-body-lg: clamp(1.05rem, 1vw + 0.5rem, 1.25rem);

/* Spacing: 3 tiers */
--spacing-section-sm: clamp(2.5rem, 4vw, 3.5rem);
--spacing-section: clamp(4rem, 7vw, 6rem);
--spacing-section-lg: clamp(5rem, 10vw, 8rem);
```

---

### 39. contact-form.tsx submission est un stub — NEW

**Symptôme :** `contact-form.tsx` utilise `react-hook-form` + zod mais la soumission est un `console.log`. Il n'y a pas de Server Action, pas de webhook, pas d'API route câblée.

**Cause :** Le form est conçu comme une démo, pas comme un composant fonctionnel.

**Fix recommandé :**
- Câbler par défaut vers un Server Action (`src/app/actions/contact.ts`)
- Le Server Action envoie à un webhook configurable dans `client.config.ts` (`webhookUrl`)
- Fallback : envoie un email via API route si pas de webhook

---

### 40. LenisProvider absent du layout malgré CSS importé — NEW

**Symptôme :** `globals.css` importe `@import "lenis/dist/lenis.css"`. Le provider `lenis-provider.tsx` existe. Mais `src/app/(site)/layout.tsx` ne l'utilise pas. Lenis est CSS-ready mais jamais initialisé.

**Fix recommandé :**
- `layout.tsx` devrait inclure `<LenisProvider>` wrappant le contenu
- Conditionné par `client.config.ts` `features.smoothScroll`
- Le setup devrait câbler ou décâbler le provider automatiquement

---

### 41. frontend-design.md dans .claude/skills/ n'est pas un skill — NEW

**Symptôme :** Tous les autres entrées de `.claude/skills/` sont des dossiers avec `SKILL.md` + `scripts/`. `frontend-design.md` est un fichier markdown seul — pas un skill invocable.

**Fix recommandé :** Soit le convertir en skill directory, soit le déplacer dans `design-system/` ou le supprimer.

---

### 42. design.ts duplique hexToOklch de setup.ts — NEW

**Symptôme :** La fonction `hexToOklch` (~35 lignes) est copiée verbatim dans `scripts/setup.ts` et `scripts/design.ts`.

**Fix recommandé :** Extraire dans `scripts/utils/color.ts` et importer dans les deux scripts.

---

### 43. design.ts applique les couleurs à :root mais pas à .dark — NEW

**Symptôme :** `pnpm design` met à jour `--primary`, `--cta`, `--radius` dans `:root`. Le bloc `.dark` n'est jamais touché. Après `pnpm design`, light et dark divergent sur les couleurs primary/cta.

**Fix recommandé :**
- `design.ts` doit aussi mettre à jour le bloc `.dark` avec des variantes appropriées (lighter primary, brighter cta)
- Ou générer automatiquement les dark variants depuis les light values (luminance inversée en oklch)

---

### 44. Button utilise Base UI render prop, pas shadcn asChild — NEW

**Symptôme :** `button.tsx` importe depuis `@base-ui/react/button`, pas depuis Radix. Les sections utilisent `<Button render={<Link>}>` au lieu du pattern shadcn standard `<Button asChild><Link>`. C'est non documenté — un développeur qui installe un composant shadcn standard (qui attend Radix) aura des conflits.

**Fix recommandé :**
- Documenter clairement dans CLAUDE.md : "Ce boilerplate utilise Base UI pour Button, pas Radix"
- Documenter le pattern `render={<Link>}` + `nativeButton={false}` pour les liens
- Ou bien revenir à shadcn/Radix standard pour éviter la confusion

---

## Résumé par priorité

### P0 — CRITIQUE (bloque la qualité ou le build)

| # | Issue | Impact |
|---|-------|--------|
| 1 | .npmrc manquant | Build cassé ✅ |
| 4 | @ts-expect-error obsolète | Build cassé ✅ |
| 9 | page.tsx starter non supprimé | Home invisible ✅ |
| 21 | Animations jamais câblées | Site mort visuellement |
| 22 | Cards sans profondeur | Tout est plat |
| 28 | Setup ne câble pas les animations | Chaque projet doit refaire |
| **32** | **Composants preset = design générique** | **Cause racine de tout** |

### P1 — ÉLEVÉ (dégrade significativement le résultat)

| # | Issue | Impact |
|---|-------|--------|
| 2 | Sanity dep obligatoire | Dev lent ✅ |
| 3 | shadcn en dependencies | Bundle pollué ✅ |
| 11 | Middleware next-intl | Latence ✅ |
| 12 | GSAP statique | +50KB ✅ |
| 18 | static-provider 600 lignes | Bruit ✅ |
| 23 | Typo uniforme | Pas de hiérarchie |
| 24 | Spacing sans rythme | Blocs empilés |
| 33 | Skill jamais consulté auto | Recommandations ignorées |
| 37 | Pas de pont skill → tokens | Direction design perdue |
| 38 | Tokens fluides absents de globals.css | Typo/spacing flat par défaut |
| 43 | design.ts ignore .dark | Dark mode cassé après pnpm design |

### P2 — MOYEN (friction notable, workaround possible)

| # | Issue | Impact |
|---|-------|--------|
| 6 | Liens orphelins | UX cassée ✅ |
| 7 | Layout pas adapté au siteType | Réécriture ✅ |
| 8 | Placeholders | Polish ✅ |
| 10 | Pas de skill UI/UX | Design générique ✅ |
| 13 | useMediaQuery CLS | Flash visible ✅ |
| 14 | Navbar re-renders | Main thread ✅ |
| 15 | NavbarMobile sur desktop | Bundle pollué ✅ |
| 16 | Below-fold non code-split | Bundle lourd |
| 17 | LenisProvider absent | Smooth scroll à recréer ✅ |
| 19 | SearchAction → /blog | 404 ✅ |
| 20 | --font-heading | Setup oubli ✅ |
| 25 | Boutons sans feedback | Hover invisible |
| 27 | Navbar sans indicateur actif | UX nav pauvre |
| 29 | pnpm design tokens only | Style jamais appliqué |
| 34 | Regex navbar fragile | NavItems pas supprimés |
| 36 | Generators ignorent la moitié des sections | Contenu sous-utilisé |
| 39 | Contact form stub | Formulaire non fonctionnel |
| 40 | LenisProvider pas dans layout | Smooth scroll silencieusement mort |
| 44 | Button Base UI non documenté | Confusion shadcn/Base UI |

### P3 — FAIBLE (cosmétique ou edge case)

| # | Issue | Impact |
|---|-------|--------|
| 5 | Defaults incohérents | Confusion mineure ✅ |
| 35 | siteType "engine" fantôme | Type mort |
| 41 | frontend-design.md n'est pas un skill | Fichier orphelin |
| 42 | hexToOklch dupliqué | Maintenance |

---

## Recommandation globale — La refonte nécessaire

Le problème #32 est la **cause racine** de tous les problèmes de design (#21-25, #27-29, #33). Tant que le boilerplate utilise des composants section preset, le résultat sera générique quel que soit le skill, le brief, ou les tokens.

**Plan d'action pour le boilerplate :**

1. **Supprimer `src/components/sections/`** — déplacer dans `examples/sections/` pour référence
2. **Garder les primitives** : `src/components/ui/` (shadcn), `src/components/animations/`, `src/components/layout/`, `src/components/shared/`
3. **Ajouter les tokens fluides** (#38) dans `globals.css` par défaut
4. **Upgrader card.tsx** (#22) et **button.tsx** (#25) avec profondeur et feedback
5. **Câbler le LenisProvider** (#40) dans `layout.tsx`
6. **Câbler le contact form** (#39) vers un Server Action
7. **Fixer design.ts** (#43) pour toucher aussi `.dark`
8. **Documenter** le pattern Base UI (#44) dans CLAUDE.md
9. **Mettre à jour le CLAUDE.md** pour guider la composition directe au lieu des presets
10. **Mettre à jour `pnpm setup`** pour que les pages générées utilisent des animations (#28) et composent avec les primitives
