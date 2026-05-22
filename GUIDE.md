# Guide d'Utilisation du Boilerplate — Référence Complète

> Ce document est la référence exhaustive pour utiliser ce boilerplate avec Claude Code.
> Il couvre chaque étape, chaque option de customisation, et chaque workflow.

---

## Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Démarrage rapide (5 min)](#démarrage-rapide)
3. [Configuration détaillée — client.config.ts](#configuration-détaillée)
4. [pnpm setup — Ce qu'il fait exactement](#pnpm-setup)
5. [pnpm design — Design automatisé](#pnpm-design)
6. [Le design system — Fichiers et rôle de chacun](#le-design-system)
7. [Exemples de sections (inspiration)](#exemples-de-sections)
8. [Catalogue des animations](#catalogue-des-animations)
9. [Animated Artifacts — Micro-UIs interactives](#animated-artifacts)
10. [Skills disponibles — Quand et comment les utiliser](#skills-disponibles)
11. [Workflows de travail avec Claude](#workflows-de-travail)
12. [Options de customisation avancées](#options-de-customisation-avancées)
13. [Prompts types par situation](#prompts-types-par-situation)
14. [Checklist pré-lancement](#checklist-pré-lancement)
15. [Troubleshooting](#troubleshooting)

---

## Vue d'ensemble

### Qu'est-ce que c'est ?

Un template Next.js 16 conçu pour être piloté par Claude Code. Tu configures un fichier, tu lances un script, et tu obtiens un projet prêt à construire — page blanche, pas de sections pré-faites.

### Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS 4 + CSS variables (OKLch) |
| UI primitives | shadcn/ui (base-ui) |
| Design intelligence | impeccable skill (23 commandes design) |
| Animations | GSAP (lazy-loaded) + Lenis smooth scroll |
| CMS | Abstraction content layer (static ou Sanity) |
| Forms | API Routes + Zod validation + webhooks |
| Déploiement | Vercel |
| Package manager | pnpm |

### Philosophie — "Page Blanche"

1. **Chaque section est composée from scratch** — pas de templates, pas de copier-coller depuis `examples/`
2. **Design tokens > hardcoded values** — toutes les couleurs, espacements, radius sont des CSS variables
3. **Composants shadcn/ui existants > nouveaux composants** — composer avant de créer
4. **Impeccable + shadcn/ui** — impeccable fournit les design laws, shadcn fournit les primitives accessibles
5. **Claude-friendly** — CLAUDE.md, PRODUCT.md, DESIGN.md, design system files, et skills guident Claude automatiquement

---

## Démarrage rapide

### Pour un nouveau projet client

```bash
# 1. Copier le boilerplate
cp -r terence-nextjs-boilerplate/ client-project/
cd client-project/
git init

# 2. Installer les dépendances
pnpm install

# 3. Configurer le projet
# → Éditer client.config.ts (voir section suivante)

# 4. Appliquer la configuration
pnpm setup

# 5. Remplir le brief client
# → Éditer design-system/client-brief.md

# 6. Créer le contexte design (impeccable)
# → /impeccable teach (crée PRODUCT.md + DESIGN.md)

# 7. Générer les tokens baseline
pnpm design

# 8. Lancer le dev
pnpm dev

# 9. Construire page par page
# → /impeccable craft [section]
```

### Ce qu'on obtient après `pnpm setup`

Une **page blanche** : home page avec metadata configurée, zéro section. Chaque section est composée from scratch quand on est prêt, guidée par le brief client + impeccable + shadcn/ui.

### À partir d'un site existant (redesign)

Si le client a déjà un site, tu peux démarrer à partir de son URL :

```
"Analyse le site example.com et propose un redesign avec le boilerplate"
```

Claude va :
1. **Crawler** les pages clés du site (home, about, services, contact, pricing, etc.)
2. **Extraire** tout le contenu : services, testimonials, équipe, stats, CTAs, ton, couleurs
3. **Synthétiser** un Business Profile complet
4. **Pré-remplir** `client.config.ts` + `client-brief.md` avec les données réelles
5. **Proposer** une structure de redesign avant de toucher au code

Tu valides la proposition, puis Claude applique la config et commence à construire avec du vrai contenu.

**Gratuit, zéro setup** — utilise le skill `site-analyzer` avec WebFetch intégré.

---

## Configuration détaillée

### client.config.ts — Chaque champ expliqué

```typescript
const config: ClientConfig = {
```

#### Identité

| Champ | Type | Effet |
|-------|------|-------|
| `name` | string | Remplace `[CLIENT_NAME]` partout (navbar, footer, metadata, CLAUDE.md) |
| `slug` | string | Utilisé pour les URLs et identifiants techniques |
| `url` | string | URL de production — utilisé dans sitemap, OG images, JSON-LD |
| `tagline` | string | Sous-titre — utilisé dans le footer et les metadata par défaut |

#### Heading Font

| Champ | Type | Effet |
|-------|------|-------|
| `headingFont` | string | Nom Google Fonts (ex: `"Fraunces"`, `"Playfair Display"`) |
| `serifFont` | string | Font serif pour accents éditoriaux (ex: `"Cormorant Garamond"`) |

- Si **vide** : le font heading = font body (Geist)
- Si **rempli** : `pnpm setup` ajoute l'import Google Fonts dans `layout.tsx` et met à jour `--font-heading` dans `globals.css`

#### Locale & CMS

| Champ | Valeurs | Effet |
|-------|---------|-------|
| `locale` | `"fr"` \| `"en"` \| `"fr+en"` | Met `<html lang>`, active/désactive i18n middleware |
| `cms` | `"sanity"` \| `"static"` | Choisit le content provider (static = fichiers TS, sanity = API) |
| `siteType` | `"landing"` \| `"marketing"` \| `"corporate"` \| `"portfolio"` \| `"saas"` | Sert de contexte dans CLAUDE.md — n'affecte plus la génération de sections |

#### Theme

| Champ | Type | Effet |
|-------|------|-------|
| `theme.primary` | hex | Couleur principale (texte, accents). Convertie en OKLch par setup |
| `theme.cta` | hex | Couleur call-to-action (boutons principaux). Convertie en OKLch |
| `theme.success` | hex | Couleur succès (confirmations). Convertie en OKLch |
| `theme.destructive` | hex | Couleur erreur/danger. Convertie en OKLch |
| `theme.radius` | string | Rayon de base (ex: `"0.625rem"`). Tous les radius en dérivent |

**Système de radius dérivés :**
```
--radius-sm: base × 0.6
--radius-md: base × 0.8
--radius-lg: base (= la valeur configurée)
--radius-xl: base × 1.4
--radius-2xl: base × 1.8
--radius-3xl: base × 2.2
--radius-4xl: base × 2.6
```

#### Pages

Chaque page peut être `true` (activée) ou `false` (désactivée).

| Page | Route | Contenu |
|------|-------|---------|
| `home` | `/` | Homepage — page blanche, composée from scratch |
| `about` | `/about` | Page À propos |
| `services` | `/services` | Page Services |
| `pricing` | `/pricing` | Page Tarifs |
| `features` | `/features` | Page Fonctionnalités |
| `portfolio` | `/portfolio` | Page Portfolio/Projets |
| `team` | `/team` | Page Équipe |
| `blog` | `/blog` + `/blog/[slug]` | Blog avec listing + pages individuelles |
| `changelog` | `/changelog` | Journal des mises à jour |
| `contact` | `/contact` | Formulaire de contact |
| `legal` | `/legal/*` | Privacy + Terms + Mentions légales |

**Quand une page est `false` :**
- Le setup supprime le dossier de la page
- Le sitemap exclut la route
- La navbar et le footer ne montrent pas le lien

**Quand une page est `true` :**
- Si elle contient du contenu `[TODO:]`, elle est supprimée (sera composée from scratch quand on en a besoin)
- Si elle existe déjà avec du vrai contenu, elle est préservée

#### Features

| Feature | Effet quand `true` |
|---------|---------------------|
| `darkMode` | Theme switcher actif, classes `.dark` supportées |
| `newsletter` | Formulaire newsletter dans le footer marketing |
| `cookieConsent` | Bandeau cookies au premier visit |
| `smoothScroll` | Lenis smooth scroll + sync GSAP ScrollTrigger |
| `i18n` | next-intl activé dans le middleware (pour `locale: "fr+en"`) |
| `analytics` | Google Tag Manager injecté |

#### Webhooks

| Champ | Destination |
|-------|-------------|
| `webhooks.contact` | URL Make/n8n qui reçoit les soumissions du formulaire contact |
| `webhooks.newsletter` | URL pour les inscriptions newsletter |
| `webhooks.diagnostic` | URL pour les résultats de diagnostic |

Format attendu : URL complète (ex: `https://hook.eu2.make.com/xxx`)

#### Sanity (si `cms: "sanity"`)

| Champ | Valeur |
|-------|--------|
| `sanity.projectId` | ID du projet Sanity (ex: `"abc123de"`) |
| `sanity.dataset` | Dataset name (ex: `"production"`) |

#### Analytics

| Champ | Valeur |
|-------|--------|
| `gtmId` | Google Tag Manager container ID (ex: `"GTM-XXXXXXX"`) |

---

## pnpm setup

### Ce qu'il fait exactement (dans l'ordre)

1. **Met à jour les metadata** (name, url, description, locale)
2. **Met à jour les composants layout** (navbar, footer — brand name)
3. **Met à jour `<html lang>`** selon locale
4. **Met à jour package.json** (slug)
5. **Met à jour CLAUDE.md** (name, siteType, locale, CMS)
6. **Génère `.env.local`** avec toutes les variables d'environnement
7. **Nettoie les pages** : supprime les désactivées, supprime les templates `[TODO:]`
8. **Met à jour navbar et footer** : supprime les liens des pages désactivées
9. **Configure SearchAction** structured data si blog activé
10. **Désactive Lenis** si `smoothScroll: false`
11. **Remplace `[CLIENT_NAME]`** dans tous les markdown du design system
12. **Active i18n middleware** si `locale: "fr+en"`
13. **Convertit les couleurs hex → OKLch** et les écrit dans globals.css
14. **Configure le heading font et serif font** si renseignés
15. **Met à jour le sitemap** : supprime les pages désactivées
16. **Génère la homepage** — page blanche avec metadata, zéro section

### Idempotent

Tu peux relancer `pnpm setup` autant de fois que nécessaire après avoir modifié `client.config.ts`. Il ne crée pas de doublons — tous les remplacements utilisent des regex.

### Quand relancer setup

- Après avoir changé le `name`, `siteType`, `theme`, `headingFont`, ou `pages`
- Après avoir activé/désactivé des features
- Jamais besoin de relancer pour des changements de contenu (texte, images)

---

## pnpm design

### Prérequis

1. `design-system/client-brief.md` doit être rempli (au minimum : industry, brand personality, visual direction)
2. Le skill `impeccable` doit être présent dans `.claude/skills/impeccable/`

### Ce qu'il fait

1. **Parse le client-brief.md** pour extraire l'industrie, la personnalité, les préférences visuelles
2. **Génère des tokens baseline** (couleurs, typography, style) à partir du brief
3. **Affiche une proposition** avec les tokens proposés
4. **Demande validation** (y/n)
5. **Applique si validé** :
   - Couleurs → `globals.css` (hex → OKLch, light + dark)
   - Font → `client.config.ts` headingFont
   - Style decisions → `design-system/decisions.md`

### Détection des éléments verrouillés

Si le brief contient des couleurs ou fonts imposées par le client, le script les préserve et n'applique les recommandations que sur les éléments non verrouillés.

### Quand l'utiliser

- **Au démarrage** : après avoir rempli le brief, avant de commencer le design
- **Exploration** : pour tester différentes directions visuelles (relancer plusieurs fois)
- **Changement de direction** : si le client change d'avis sur le style

---

## Le design system

### Fichiers et rôle de chacun

| Fichier | Rôle | Quand le lire | Quand le modifier |
|---------|------|---------------|-------------------|
| `client-brief.md` | Identité client, personnalité, direction visuelle | Au début de chaque session de travail | Au kickoff, quand le client clarifie sa vision |
| `tokens.md` | Référence des tokens (couleurs, spacing, typo) | Pour comprendre les valeurs disponibles | Rarement — les tokens viennent de globals.css |
| `components.md` | Inventaire de tous les composants avec props | Avant de construire une page | Quand un nouveau composant est créé |
| `patterns.md` | Layouts, grilles, structure de conversion | Avant d'organiser les sections d'une page | Quand un nouveau pattern est validé |
| `principles.md` | Principes de design (lisibilité, hiérarchie, etc.) | Pour arbitrer une décision de design | Rarement |
| `accessibility.md` | Règles WCAG 2.1 AA | Avant chaque review d'accessibilité | Si des règles spécifiques au client s'ajoutent |
| `motion.md` | Règles d'animation GSAP | Avant d'ajouter des animations | Si on établit de nouvelles conventions |
| `decisions.md` | **PRIORITÉ MAXIMALE** — Décisions passées de design reviews | Toujours — Claude le lit automatiquement | Après chaque review de design récurrente |
| `checklist.md` | Checklist pré-lancement | Avant chaque mise en production | Si on ajoute des critères qualité |

### Fichiers impeccable (racine du projet)

| Fichier | Rôle | Créé par |
|---------|------|----------|
| `PRODUCT.md` | Register, users, brand personality, anti-references, design principles | `/impeccable teach` |
| `DESIGN.md` | Couleurs, typo, components, layout — format Google Stitch | `/impeccable document` |

### Hiérarchie de priorité

```
decisions.md > PRODUCT.md > principles.md > patterns.md > tokens.md
```

Si une décision dans `decisions.md` contredit un pattern dans `patterns.md`, la décision gagne.

---

## Exemples de sections

Le dossier `examples/sections/` contient des exemples d'inspiration pour les patterns de section courants. **Ils ne sont jamais importés directement** — chaque section est composée from scratch avec shadcn/ui, guidée par ces exemples comme point de départ créatif.

### Patterns disponibles

| Catégorie | Exemples | Usage typique |
|-----------|----------|---------------|
| **Hero** | `hero-centered`, `hero-split`, `hero-cinematic` | Point d'entrée de la page — hook |
| **Features** | `features-grid`, `features-alternating` | Proposition de valeur |
| **Social proof** | `logo-cloud`, `testimonials-grid`, `testimonial-carousel` | Crédibilité |
| **Stats** | `stats-bar` | Chiffres clés |
| **Timeline** | `process-steps` | Process, méthodologie |
| **Comparison** | `comparison-cards` | Avant/après, vs concurrent |
| **Gallery** | `gallery-grid` | Portfolio, réalisations |
| **Marquee** | `marquee` | Défilement infini (logos, texte) |
| **Pricing** | `pricing-cards`, `pricing-toggle` | Grille tarifaire |
| **CTA** | `cta-centered`, `cta-newsletter` | Conversion finale |
| **FAQ** | `faq-section` | Questions fréquentes (avec JSON-LD) |
| **Contact** | `contact-form`, `contact-info` | Formulaire + infos |
| **Portfolio/Team** | `portfolio-grid`, `team-grid` | Grille projets/équipe |
| **Changelog** | `changelog-list` | Journal des mises à jour |

### Comment les utiliser

```
"Compose un hero pour Basanto Studio — inspire-toi du style hero-cinematic mais adapté à leur identité"
"Crée une section features avec 4 services — regarde features-alternating pour le layout"
```

Claude lit l'exemple, comprend le pattern, puis compose une version unique pour le client.

---

## Catalogue des animations

### Wrappers (composants React)

| Composant | Presets disponibles | Usage |
|-----------|---------------------|-------|
| `AnimateOnScroll` | `fade-up`, `fade-in`, `slide-left`, `slide-right`, `scale-up` | Wrapper autour de n'importe quel élément |
| `StaggerChildren` | `fade-up`, `fade-in`, `scale-up` | Wrapper autour d'un groupe (grille, liste) |
| `CountUp` | — | Anime un nombre de 0 → valeur au scroll |

### Utilisation

```tsx
import { AnimateOnScroll, StaggerChildren, CountUp } from "@/components/animations";

// Élément individuel
<AnimateOnScroll preset="fade-up">
  <Card>...</Card>
</AnimateOnScroll>

// Groupe avec stagger
<StaggerChildren preset="fade-up" stagger={0.1}>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</StaggerChildren>

// Compteur animé
<CountUp value={1247} suffix="+" duration={2} />
```

### Effets globaux

| Effet | Fichier | Customisation |
|-------|---------|---------------|
| **Noise overlay** | `globals.css` (`body::after`) | `--noise-opacity` (défaut: 0.04). Mettre à 0 pour désactiver |
| **Smooth scroll** | Lenis (activé si `features.smoothScroll: true`) | — |
| **Navbar morphing** | `navbar.tsx` | Transparent → frosted glass au scroll (seuil: 48px) |

### Règles d'animation

- **Toujours** respecter `prefers-reduced-motion`
- **Durée max** : 0.6s pour les entrées, 0.3s pour les transitions de page
- **Easing** : `power2.out` pour les entrées, `power2.inOut` pour les morphs
- **Trigger** : `top 80%` pour les ScrollTriggers
- **Once** : `once: true` — pas de ré-animation au scroll up
- **GPU only** : animer uniquement `transform` et `opacity`
- **GSAP only** : utiliser `useGSAP()` hook, jamais `useEffect` pour les animations

---

## Animated Artifacts

### Qu'est-ce que c'est ?

Des micro-UIs animées qui rendent les sections interactives. Elles simulent des interfaces fonctionnelles plutôt que d'afficher du contenu statique.

### Catalogue des 7 patterns

| Pattern | Effet visuel | Meilleur pour |
|---------|-------------|---------------|
| `TypewriterFeed` | Texte monospace qui s'écrit caractère par caractère + curseur clignotant | Real-time, monitoring, IA, tech |
| `CardShuffler` | Cartes empilées qui tournent avec spring bounce | Catégories, plans, features multiples |
| `Waveform` | Ligne SVG EKG/audio avec stroke-dashoffset | Santé, audio, signaux, data |
| `GeometricMotif` | Motifs SVG qui tournent lentement (concentric, radial, helix) | Tech, précision, ingénierie, abstrait |
| `CursorProtocol` | Curseur SVG qui navigue, clique, active des éléments | Scheduling, workflows, UX demos |
| `PulseIndicator` | Point status avec rings pulsants | Status, uptime, trust signals |
| `OrbitalDiagram` | Orbites concentriques avec dots à vitesses différentes | Écosystème, intégrations, plateforme |

### Comment les demander à Claude

```
"Ajoute un typewriter feed dans la card Analytics"
"Mets un orbital diagram dans la section Intégrations"
"Rends les feature cards interactives avec des artifacts animés"
```

Claude choisit automatiquement le pattern adapté au contenu de chaque card.

---

## Skills disponibles

### Skills installés et leur rôle

| Skill | Quand l'utiliser | Commande type |
|-------|------------------|---------------|
| **impeccable** | Pour tout design — build, évaluer, affiner, enrichir | `/impeccable craft`, `/impeccable critique`, `/impeccable polish`, `/impeccable bolder` |
| **audit** | Scan de conformité design system + qualité | `/audit` |
| **gsap-core** | Quand Claude écrit du code GSAP | Auto |
| **gsap-react** | Animations dans les composants React/Next.js | Auto |
| **gsap-scrolltrigger** | Animations liées au scroll | Auto |
| **gsap-timeline** | Séquences d'animations multi-étapes | Auto |
| **gsap-plugins** | SplitText, MorphSVG, DrawSVG, Flip, etc. | Auto |
| **gsap-utils** | Helpers mathématiques (clamp, mapRange, snap) | Auto |
| **gsap-performance** | Optimisation des animations | Auto |
| **animated-artifacts** | Générer des micro-UIs animées dans les sections | Quand tu demandes des éléments interactifs |
| **ui-styling** | Composants shadcn/ui et Tailwind patterns | Auto |
| **brand** | Voice, identité visuelle, messaging | Quand tu travailles sur le contenu/branding |
| **site-analyzer** | Crawler un site existant pour un redesign | `"Analyse le site example.com"` |
| **seo** | Analyse SEO | Quand tu optimises le référencement |

### Impeccable — 23 commandes design

| Catégorie | Commandes | Usage |
|-----------|-----------|-------|
| **Build** | `craft`, `shape`, `teach`, `document`, `extract` | Construire et planifier |
| **Evaluate** | `critique`, `audit` | Évaluer la qualité |
| **Refine** | `polish`, `bolder`, `quieter`, `distill`, `harden`, `onboard` | Affiner le design |
| **Enhance** | `animate`, `colorize`, `typeset`, `layout`, `delight`, `overdrive` | Enrichir |
| **Fix** | `clarify`, `adapt`, `optimize` | Corriger |
| **Iterate** | `live` | Itération visuelle en live dans le browser |

---

## Workflows de travail

### Workflow 1 — Nouveau projet de A à Z

```
1. Copier le boilerplate, pnpm install
2. Éditer client.config.ts (name, url, theme, pages, features)
3. pnpm setup → projet configuré, page blanche prête
4. Remplir design-system/client-brief.md
5. /impeccable teach → crée PRODUCT.md + DESIGN.md
6. pnpm design → propose et applique les tokens visuels
7. /impeccable craft [première section] → composition from scratch
8. Itérer section par section dans le browser
```

### Workflow 2 — Redesign à partir d'un site existant

```
1. Le client a déjà un site → tu as juste l'URL
2. Demande à Claude :
   "Analyse le site https://client-actuel.com et propose un redesign"

Claude va (skill site-analyzer) :
→ Crawler 5-9 pages clés
→ Extraire tout le contenu
→ Pré-remplir client.config.ts + client-brief.md
→ Proposer une structure de redesign

3. Tu valides la proposition
4. pnpm setup → /impeccable teach → pnpm design
5. /impeccable craft — construire avec du vrai contenu dès le jour 1
```

### Workflow 3 — Adaptation d'une inspiration visuelle

```
1. Screenshot d'un site qui t'inspire
2. Envoie à Claude avec :
   "Adapte ce layout pour [CLIENT_NAME]. Utilise les tokens du projet."

Claude va :
→ Lire PRODUCT.md et client-brief.md
→ Composer from scratch avec shadcn/ui, en s'inspirant du screenshot
→ Adapter au design system du client (jamais copier les couleurs/fonts)
→ Expliquer ce qu'il a changé et pourquoi
```

### Workflow 4 — Itération de section

```
"Rends le hero plus bold"               → /impeccable bolder hero
"Calme cette section, c'est trop"       → /impeccable quieter [section]
"Ajoute un gradient au CTA"             → modification directe
"Les cards sont trop génériques"         → /impeccable critique [section]
```

Claude modifie le composant directement. Si tu demandes une comparaison A/B, il crée une variante `-v2.tsx`.

### Workflow 5 — Ajustement de design tokens

```
"Le primary est trop foncé"
"Les cards ont besoin de plus d'ombre"
"Augmente le radius global — je veux plus arrondi"
```

Claude modifie `globals.css` uniquement (light + dark) et liste les composants impactés.

### Workflow 6 — Nouvelle page

```
"Crée une page /case-studies avec une grille de projets et des filtres"

Claude va :
1. Lire PRODUCT.md + client-brief.md + patterns.md
2. Créer le route dans src/app/(site)/case-studies/
3. Exporter generateMetadata
4. /impeccable shape → planifier le UX avant de coder
5. Composer chaque section from scratch avec shadcn/ui
6. Suivre la structure de conversion (Hook → Value → Proof → CTA)
7. Ajouter à sitemap.ts
```

### Workflow 7 — Pre-launch polish

```
"Lance le polish pré-lancement"

Claude va :
1. /impeccable polish → quality pass final
2. /impeccable audit → checks techniques (a11y, perf, responsive)
3. /audit → scan conformité design system (9 catégories)
4. design-system/checklist.md → item par item
5. Corriger chaque problème un par un
```

---

## Options de customisation avancées

### Customiser le noise overlay

Dans `globals.css`, ajuster `--noise-opacity` :
- `0` = désactivé
- `0.02` = très subtil
- `0.04` = défaut (subtil grain premium)
- `0.08` = prononcé (style brutalist)
- Ou retirer entièrement le bloc `body::after`

### Customiser le navbar

Dans `navbar.tsx` :
- `variant="default"` : fond solide dès le départ
- `variant="transparent"` : transparent puis frosted glass au scroll
- Seuil de scroll : changer `48` dans `window.scrollY > 48`
- Items : modifier le tableau `NAV_ITEMS`
- Ajouter un logo : remplacer `<span>{brandName}</span>` par `<Image />`

### Customiser le footer

Deux templates disponibles :
- `footer-marketing.tsx` : 5 colonnes + newsletter
- `footer-minimal.tsx` : 1 ligne simple

### Ajouter un nouveau composant de section

```bash
# Créer le fichier
src/components/sections/[category]/[component-name].tsx

# Pattern à suivre :
# - Typed props interface
# - Server component par défaut (pas de "use client" sauf si interaction)
# - Responsive (mobile-first)
# - CSS variables pour les couleurs
# - next/image avec sizes + alt
```

Puis documenter dans `design-system/components.md`.

### Customiser les couleurs dark mode

Dans `globals.css`, le bloc `.dark { ... }` contient toutes les variables dark. Le setup génère des variantes dark automatiquement, mais tu peux les ajuster manuellement :
- Plus de contraste : augmenter la différence lightness entre `--background` et `--foreground`
- Couleurs plus saturées en dark : augmenter le chroma dans les valeurs OKLch

### Ajouter un font personnalisé (non Google Fonts)

1. Placer les fichiers font dans `public/fonts/`
2. Ajouter `@font-face` dans `globals.css`
3. Mettre à jour `--font-heading` ou `--font-sans` dans `@theme inline`
4. Ne pas utiliser `headingFont` dans `client.config.ts` (c'est pour Google Fonts)

### Customiser les breakpoints de section

Dans `globals.css` :
```css
--spacing-section: 5rem;     /* Standard (80px) */
--spacing-section-lg: 7rem;  /* Hero, CTA final (112px) */
```

### Intégrer Sanity CMS

1. Mettre `cms: "sanity"` dans `client.config.ts`
2. Remplir `sanity.projectId` et `sanity.dataset`
3. Créer les schemas Sanity correspondant aux types dans `src/lib/content/types.ts`
4. Le content provider switch automatiquement via `CONTENT_PROVIDER=sanity` dans `.env`

### Ajouter l'internationalisation

1. Mettre `locale: "fr+en"` dans `client.config.ts`
2. Mettre `features.i18n: true`
3. `pnpm setup` active le middleware next-intl
4. Créer les fichiers de messages dans `messages/fr.json` et `messages/en.json`

---

## Prompts types par situation

### Démarrage

```
"Configure ce projet pour [CLIENT]. C'est une agence de design basée à Paris.
siteType: marketing, couleur principale: #1a1a2e, CTA: #e94560, heading font: Fraunces"
```

### Design context

```
"/impeccable teach"
"/impeccable document"
"Lance pnpm design pour explorer des directions visuelles"
```

### Construction de pages

```
"/impeccable craft hero pour Basanto Studio"
"/impeccable shape page services — 6 services + section processus"
"Crée la page Pricing avec 3 plans et un toggle mensuel/annuel"
```

### Itération design

```
"/impeccable bolder hero — c'est trop sage"
"/impeccable quieter section features — trop agressif"
"Ajoute des artifacts animés aux feature cards"
"/impeccable critique page about"
```

### Contenu

```
"Remplace le contenu placeholder de la page About avec le brief du client"
"Génère 6 articles de blog placeholder réalistes pour l'industrie tech"
"Adapte les textes du hero en français formel (vouvoiement)"
```

### Polish

```
"/impeccable polish"
"/impeccable audit"
"/audit"
"Optimise les Lighthouse scores"
"Vérifie l'accessibilité clavier sur toutes les pages"
```

### Debug

```
"Le build échoue avec cette erreur : [coller l'erreur]"
"Le formulaire contact ne soumet pas — vérifie le webhook"
"Les images sont trop lourdes en production"
```

---

## Checklist pré-lancement

Référence rapide — le détail complet est dans `design-system/checklist.md`.

### Critique (bloquant)

- [ ] `pnpm build` réussit sans erreur
- [ ] Tous les `[CLIENT_NAME]` remplacés
- [ ] Metadata unique sur chaque page
- [ ] Formulaire contact fonctionne (webhook fire)
- [ ] Lighthouse > 90 sur les 4 scores
- [ ] Pas de scroll horizontal sur mobile
- [ ] Accessibilité clavier complète

### Important (à corriger avant la mise en ligne)

- [ ] Sitemap + robots.txt corrects
- [ ] OG images rendues
- [ ] JSON-LD schema sur la homepage
- [ ] Dark mode cohérent
- [ ] Pas de contenu placeholder restant
- [ ] Cookie consent fonctionnel

### Design polish (impeccable absolute bans)

- [ ] Pas de pur noir/blanc — utiliser off-black/off-white
- [ ] Pas de card grids identiques sans variation
- [ ] Pas de gradient text
- [ ] Pas de side-stripe borders
- [ ] Pas de glassmorphism décoratif
- [ ] Pas de clichés ("Elevate", "Seamless", "Unleash")
- [ ] Pas de hero-metric template (big number + small label)
- [ ] Skeleton loaders (pas de spinners)

---

## Troubleshooting

### "pnpm build échoue avec CssSyntaxError"

→ Vérifier `globals.css` — probablement un bloc `{ }` non fermé. Chaque `@keyframes`, `@theme inline`, `:root`, `.dark` doit avoir sa fermeture.

### "Les animations ne marchent pas"

→ Vérifier :
1. Le composant a bien `"use client"`
2. Il utilise `useGSAP()` hook (pas `useEffect` pour les animations)
3. `getGsap()` est utilisé pour le lazy-loading (pas d'import direct de gsap)
4. `prefers-reduced-motion` n'est pas activé dans le système

### "Le heading font ne s'applique pas"

→ Vérifier :
1. `headingFont` est rempli dans `client.config.ts`
2. `pnpm setup` a été relancé après le changement
3. Le font name correspond exactement au nom Google Fonts (avec majuscules)

### "Le formulaire ne soumet pas"

→ Vérifier :
1. L'URL webhook est correcte dans `client.config.ts`
2. L'API route `/api/contact` fonctionne
3. Le webhook Make/n8n est activé et en écoute

### "Les images sont lourdes"

→ Vérifier :
1. Toutes les images utilisent `next/image` (pas de `<img>`)
2. La prop `sizes` est définie (évite de charger l'image en pleine résolution)
3. Les images source sont en format moderne (WebP, AVIF) ou Next.js les convertit

### "Le dark mode a des couleurs bizarres"

→ Vérifier `globals.css` dans le bloc `.dark { ... }`. Les couleurs sont en OKLch — ajuster le lightness (premier nombre) pour corriger le contraste.

### "PRODUCT.md ou DESIGN.md manquant"

→ Lancer `/impeccable teach` pour créer PRODUCT.md, puis `/impeccable document` pour DESIGN.md. Ces fichiers sont créés per-projet, pas inclus dans le boilerplate.

---

> **Ce guide est vivant.** Mets-le à jour quand tu ajoutes de nouvelles features au boilerplate.
