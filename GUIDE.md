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
7. [Catalogue des composants de section](#catalogue-des-composants-de-section)
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

Un template Next.js 16 conçu pour être piloté par Claude Code. Tu configures un fichier, tu lances un script, et tu obtiens un site client complet prêt à itérer.

### Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS 4 + CSS variables (OKLch) |
| UI primitives | shadcn/ui (Radix UI) |
| Animations | GSAP (lazy-loaded) + CSS pour micro-interactions |
| CMS | Abstraction content layer (static ou Sanity) |
| Forms | Server Actions + Zod |
| Déploiement | Vercel |
| Package manager | pnpm |

### Philosophie

1. **Configuration > code** — Le maximum de personnalisation passe par `client.config.ts`, pas par du code
2. **Design tokens > hardcoded values** — Toutes les couleurs, espacements, radius sont des CSS variables
3. **Composants existants > nouveaux composants** — Composer avant de créer
4. **Claude-friendly** — CLAUDE.md, design system files, et skills guident Claude automatiquement

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

# 5. (Optionnel) Générer le design automatiquement
# → Remplir design-system/client-brief.md d'abord
pnpm design

# 6. Lancer le dev
pnpm dev
```

### Temps estimé avant d'avoir un site navigable

Après `pnpm setup` : **immédiat**. Le setup génère une homepage complète avec les sections adaptées au `siteType` choisi.

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

- Si **vide** : le font heading = font body (Inter/Geist)
- Si **rempli** : `pnpm setup` ajoute l'import Google Fonts dans `layout.tsx` et met à jour `--font-heading` dans `globals.css`
- Exemples courants par style :
  - **Élégant/éditorial** : "Playfair Display", "Cormorant Garamond", "Fraunces"
  - **Géométrique/moderne** : "Plus Jakarta Sans", "Outfit", "Sora"
  - **Brutal/brut** : "Space Grotesk", "DM Serif Display"
  - **Friendly/arrondi** : "Nunito", "Quicksand"

#### Locale & CMS

| Champ | Valeurs | Effet |
|-------|---------|-------|
| `locale` | `"fr"` \| `"en"` \| `"fr+en"` | Met `<html lang>`, active/désactive i18n middleware |
| `cms` | `"sanity"` \| `"static"` | Choisit le content provider (static = fichiers TS, sanity = API) |
| `siteType` | `"landing"` \| `"marketing"` \| `"corporate"` \| `"portfolio"` \| `"saas"` \| `"engine"` | **Détermine la structure de la homepage et le template de footer** |

#### Site Types — Ce que chaque type génère

| siteType | Homepage sections | Footer |
|----------|------------------|--------|
| `landing` | Hero centered → Logo cloud → Features grid → Stats → Testimonials → CTA | Minimal (1 ligne) |
| `marketing` | Hero centered → Features grid → Stats → Features alternating → Testimonials → CTA | Marketing (5 colonnes + newsletter) |
| `corporate` | Hero centered → Logo cloud → Features grid → Stats → Process steps → CTA | Minimal |
| `portfolio` | Hero split → Portfolio grid → Stats → Testimonials → CTA | Minimal |
| `saas` | Hero centered + badge → Logo cloud → Features grid → Pricing → Testimonials → FAQ → CTA | Marketing |
| `engine` | Hero centered (diagnostic focus) → Features → Stats → CTA | Minimal |

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

**Conversion couleurs :** Le setup convertit automatiquement les hex en OKLch et génère les variantes dark mode.

#### Pages

Chaque page peut être `true` (activée) ou `false` (désactivée).

| Page | Route | Contenu |
|------|-------|---------|
| `home` | `/` | Homepage générée selon siteType |
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
| `engine` | `/diagnostic` + `/chatbot` | Outils interactifs (diagnostic, chatbot IA) |

**Quand une page est `false` :**
- Le setup supprime le dossier de la page
- Le sitemap exclut la route
- La navbar ne montre pas le lien (les items navbar sont configurés dans `navbar.tsx`)

#### Features

| Feature | Effet quand `true` |
|---------|---------------------|
| `darkMode` | Theme switcher actif, classes `.dark` supportées |
| `newsletter` | Formulaire newsletter dans le footer marketing |
| `cookieConsent` | Bandeau cookies au premier visit |
| `chatbot` | Widget chatbot IA (nécessite page `engine`) |
| `diagnostic` | Outil diagnostic interactif (nécessite page `engine`) |
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

1. **Remplace `[CLIENT_NAME]`** dans tous les fichiers du projet
2. **Met à jour `<html lang>`** selon `locale`
3. **Met à jour CLAUDE.md** avec siteType, locale, CMS
4. **Configure le heading font** dans layout.tsx et globals.css (si `headingFont` non vide)
5. **Copie le template de footer** adapté au siteType
6. **Convertit les couleurs hex → OKLch** et les écrit dans globals.css (light + dark)
7. **Filtre le sitemap** : supprime les pages désactivées et les routes dynamiques inutiles
8. **Supprime les pages désactivées** du système de fichiers
9. **Génère la homepage** avec les sections adaptées au siteType
10. **Supprime les références `engine`** de CLAUDE.md si `pages.engine: false`

### Idempotent

Tu peux relancer `pnpm setup` autant de fois que nécessaire après avoir modifié `client.config.ts`. Il ne crée pas de doublons.

### Quand relancer setup

- Après avoir changé le `name`, `siteType`, `theme`, `headingFont`, ou `pages`
- Après avoir activé/désactivé des features
- Jamais besoin de relancer pour des changements de contenu (texte, images)

---

## pnpm design

### Prérequis

1. `design-system/client-brief.md` doit être rempli (au minimum : industry, brand personality, visual direction)
2. Le skill `ui-ux-pro-max` doit être présent dans `.claude/skills/`

### Ce qu'il fait

1. **Parse le client-brief.md** pour extraire l'industrie, la personnalité, les préférences visuelles
2. **Appelle le skill ui-ux-pro-max 3 fois** :
   - `--domain color` → palette de couleurs recommandée
   - `--domain typography` → pairings de fonts recommandés
   - `--domain style` → direction stylistique (glassmorphism, editorial, etc.)
3. **Affiche une proposition** avec les tokens proposés
4. **Demande validation** (y/n)
5. **Applique si validé** :
   - Couleurs → `globals.css` (hex → OKLch, light + dark)
   - Font → `client.config.ts` headingFont
   - Style decisions → `design-system/decisions.md`

### Détection des éléments verrouillés

Si le brief contient des couleurs ou fonts imposées par le client (marquées 🔒), le script les préserve et n'applique les recommandations que sur les éléments non verrouillés.

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

### Hiérarchie de priorité

```
decisions.md > principles.md > patterns.md > tokens.md
```

Si une décision dans `decisions.md` contredit un pattern dans `patterns.md`, la décision gagne.

---

## Catalogue des composants de section

### Hero (3 variantes)

| Composant | Import | Meilleur pour |
|-----------|--------|---------------|
| `HeroCentered` | `@/components/sections/hero` | Landing pages, marketing. Texte centré, CTAs en ligne |
| `HeroSplit` | `@/components/sections/hero` | Portfolio, produit. Image à gauche ou droite |
| `HeroCinematic` | `@/components/sections/hero` | Premium, agence. Fond plein-écran, typo split (sans bold + serif italic géant), contenu en bas à gauche |

**HeroCinematic — Typo split expliquée :**
- `line1` : font heading, bold, uppercase, tracking-widest, taille modeste (lg → 2xl)
- `line2` : font serif, italic, taille massive (5xl → 8xl)
- Exemple : `line1="La précision est"` / `line2="Notre signature."`

### Features (2 variantes)

| Composant | Meilleur pour |
|-----------|---------------|
| `FeaturesGrid` | 3-6 features avec icône + titre + description |
| `FeaturesAlternating` | Deep-dives avec image/illustration alternée gauche/droite |

### Social Proof (3 composants)

| Composant | Meilleur pour |
|-----------|---------------|
| `LogoCloud` | Logos clients/partenaires — static, pas de carousel |
| `TestimonialsGrid` | Grille de cartes témoignage (2-3 colonnes) |
| `TestimonialCarousel` | Scroll horizontal snap — pour beaucoup de témoignages |

### Stats

| Composant | Variants |
|-----------|----------|
| `StatsBar` | `default` (transparent), `card` (fond card), `dark` (fond dark) |

### Process / Timeline

| Composant | Layouts |
|-----------|---------|
| `ProcessSteps` | `vertical` (ligne de timeline), `horizontal` (connecteurs) |

### Comparison

| Composant | Usage |
|-----------|-------|
| `ComparisonCards` | Cartes côte-à-côte avec Check/X — idéal avant/après ou vs concurrent |

### Gallery

| Composant | Features |
|-----------|----------|
| `GalleryGrid` | Grille images + lightbox Dialog + navigation clavier (←→) |

### Marquee

| Composant | Features |
|-----------|----------|
| `Marquee` | Défilement infini CSS-only. Texte ou images. Configurable : vitesse, direction, pause au hover |

### Pricing (2 variantes)

| Composant | Meilleur pour |
|-----------|---------------|
| `PricingCards` | Grille de plans avec badge "populaire" |
| `PricingToggle` | Toggle mensuel/annuel |

### CTA (2 variantes)

| Composant | Variants |
|-----------|----------|
| `CtaCentered` | `default`, `gradient`, `dark` |
| `CtaNewsletter` | CTA avec formulaire newsletter intégré |

### FAQ

| Composant | Features |
|-----------|----------|
| `FaqSection` | Accordion shadcn/ui + JSON-LD structured data automatique |

### Contact

| Composant | Usage |
|-----------|-------|
| `ContactForm` | Formulaire Zod + Server Action + webhook |
| `ContactInfo` | Infos de contact (email, tel, adresse, carte) |

### Portfolio / Team / Blog

| Composant | Usage |
|-----------|-------|
| `PortfolioGrid` | Grille de projets avec image, tags, stack technique |
| `TeamGrid` | Grille membres équipe avec photo + liens sociaux |

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

---

## Animated Artifacts

### Qu'est-ce que c'est ?

Des micro-UIs animées qui rendent les cartes de features et sections interactives. Elles simulent des interfaces fonctionnelles plutôt que d'afficher du contenu statique.

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
| **ui-ux-pro-max** | Avant de construire n'importe quel UI | `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "creative agency premium" --design-system` |
| **gsap-core** | Quand Claude écrit du code GSAP | Auto — Claude le consulte automatiquement |
| **gsap-react** | Animations dans les composants React/Next.js | Auto |
| **gsap-scrolltrigger** | Animations liées au scroll | Auto |
| **gsap-timeline** | Séquences d'animations multi-étapes | Auto |
| **gsap-plugins** | SplitText, MorphSVG, DrawSVG, Flip, etc. | Auto |
| **gsap-utils** | Helpers mathématiques (clamp, mapRange, snap) | Auto |
| **gsap-performance** | Optimisation des animations | Auto |
| **animated-artifacts** | Générer des micro-UIs animées dans les sections | Quand tu demandes des éléments interactifs |
| **ui-styling** | Composants shadcn/ui et Tailwind patterns | Auto |
| **design-system** | Architecture de tokens et spécifications | Auto |
| **brand** | Voice, identité visuelle, messaging | Quand tu travailles sur le contenu/branding |
| **seo** | Analyse SEO | Quand tu optimises le référencement |

### Commandes ui-ux-pro-max par besoin

| Besoin | Commande |
|--------|----------|
| Direction complète pour un nouveau projet | `--design-system -p "Client Name"` |
| Options de style | `--domain style "glassmorphism editorial dark"` |
| Palette de couleurs | `--domain color "agency premium dark mode"` |
| Pairings de fonts | `--domain typography "elegant serif modern"` |
| Best practices UX | `--domain ux "animation scroll loading forms"` |
| Structure de landing page | `--domain landing "hero social-proof cta saas"` |

---

## Workflows de travail

### Workflow 1 — Nouveau projet de A à Z

```
1. Copier le boilerplate
2. Éditer client.config.ts
   → name, url, tagline
   → siteType (choisir selon le type de site)
   → theme (couleurs du client)
   → headingFont (si le client a un font spécifique)
   → pages (activer/désactiver)
   → features (activer/désactiver)
   → webhooks (URLs Make/n8n)

3. pnpm setup
   → Site navigable avec homepage complète

4. Remplir design-system/client-brief.md
   → Industrie, personnalité, direction visuelle, inspirations

5. pnpm design
   → Proposition de tokens visuels → validation → application

6. Itérer avec Claude :
   → "Change le hero pour un HeroCinematic"
   → "Ajoute une section testimonials après les features"
   → "Rends les feature cards plus interactives"
   → "La couleur CTA est trop claire, propose un ajustement"
```

### Workflow 2 — Adaptation d'une inspiration

```
1. Capture d'écran du site qui t'inspire
2. Envoie le screenshot à Claude avec :
   "Adapte ce layout pour [CLIENT_NAME]. Utilise les tokens du projet, pas les couleurs de l'inspiration."

Claude va :
→ Lire client-brief.md pour comprendre le client
→ Mapper le layout sur les composants de section existants
→ Adapter les couleurs/fonts aux tokens du projet
→ Expliquer ce qu'il a changé et pourquoi
```

### Workflow 3 — Itération de section

```
"Rends le hero plus bold"
"Ajoute un gradient au CTA section"
"Compresse la section features — trop d'espace"
"Essaie une version dark pour la section stats"
```

Claude modifie le composant directement. Si tu demandes une comparaison A/B, il crée une variante `-v2.tsx`.

### Workflow 4 — Ajustement de design tokens

```
"Le primary est trop foncé"
"Les cards ont besoin de plus d'ombre"
"Augmente le radius global — je veux plus arrondi"
"La typo des headings manque de punch"
```

Claude modifie `globals.css` uniquement (light + dark) et liste les composants impactés.

### Workflow 5 — Nouvelle page

```
"Crée une page /case-studies avec une grille de projets et des filtres par catégorie"

Claude va :
1. Lire client-brief.md + patterns.md
2. Créer le route dans src/app/(site)/case-studies/
3. Exporter generateMetadata
4. Composer avec des composants existants
5. Suivre la structure de conversion (Hook → Value → Proof → CTA)
6. Ajouter à sitemap.ts
```

### Workflow 6 — Pre-launch polish

```
"Lance la checklist pré-lancement"

Claude va :
1. Suivre design-system/checklist.md item par item
2. Vérifier accessibilité, performance, SEO, design polish
3. Corriger chaque problème un par un
4. Reporter le statut
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

Deux templates disponibles copiés par setup :
- `footer-marketing.tsx` : 5 colonnes + newsletter (marketing, saas)
- `footer-minimal.tsx` : 1 ligne simple (portfolio, corporate, landing)

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

Puis ajouter l'export dans `src/components/sections/[category]/index.ts` et documenter dans `design-system/components.md`.

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

### Design exploration

```
"Lance pnpm design pour explorer des directions visuelles"
"Propose 3 palettes de couleurs différentes pour une marque de luxe"
"Quel font pairing tu recommandes pour un cabinet d'avocats ?"
```

### Construction de pages

```
"Construis la page Services avec 6 services en grille + section processus en 4 étapes"
"Ajoute une page Case Studies avec filtres par industrie"
"Crée la page Pricing avec 3 plans et un toggle mensuel/annuel"
```

### Itération design

```
"Le hero est trop classique, propose quelque chose de plus cinématique"
"Ajoute des artifacts animés aux feature cards"
"La section testimonials est ennuyeuse, essaie un layout en masonry"
"Mets un marquee de logos entre le hero et les features"
```

### Contenu

```
"Remplace le contenu placeholder de la page About avec le brief du client"
"Génère 6 articles de blog placeholder réalistes pour l'industrie tech"
"Adapte les textes du hero en français formel (vouvoiement)"
```

### Polish

```
"Lance la checklist pré-lancement"
"Optimise les Lighthouse scores"
"Vérifie l'accessibilité clavier sur toutes les pages"
"Les animations sont trop lentes, réduis à 0.4s partout"
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

### Design polish (anti-AI patterns)

- [ ] Pas de pur noir — utiliser off-black
- [ ] Pas de 3 colonnes identiques sans variation
- [ ] Pas de gradient bleu/violet "AI aesthetic"
- [ ] Pas de clichés ("Elevate", "Seamless", "Unleash")
- [ ] Skeleton loaders (pas de spinners)
- [ ] Sentence case pour les headings

---

## Troubleshooting

### "pnpm build échoue avec CssSyntaxError"

→ Vérifier `globals.css` — probablement un bloc `{ }` non fermé. Chaque `@keyframes`, `@theme inline`, `:root`, `.dark` doit avoir sa fermeture.

### "Les animations ne marchent pas"

→ Vérifier :
1. Le composant a bien `"use client"`
2. Il utilise `getGsap()` ou `useGsap` (pas d'import direct de gsap)
3. `prefers-reduced-motion` n'est pas activé dans le système

### "Le heading font ne s'applique pas"

→ Vérifier :
1. `headingFont` est rempli dans `client.config.ts`
2. `pnpm setup` a été relancé après le changement
3. Le font name correspond exactement au nom Google Fonts (avec majuscules)

### "Le formulaire ne soumet pas"

→ Vérifier :
1. L'URL webhook est correcte dans `client.config.ts`
2. Le Server Action retourne bien un résultat
3. Le webhook Make/n8n est activé et en écoute

### "Les images sont lourdes"

→ Vérifier :
1. Toutes les images utilisent `next/image` (pas de `<img>`)
2. La prop `sizes` est définie (évite de charger l'image en pleine résolution)
3. Les images source sont en format moderne (WebP, AVIF) ou Next.js les convertit

### "Le dark mode a des couleurs bizarres"

→ Vérifier `globals.css` dans le bloc `.dark { ... }`. Les couleurs sont en OKLch — ajuster le lightness (premier nombre) pour corriger le contraste.

---

> **Ce guide est vivant.** Mets-le à jour quand tu ajoutes de nouvelles features au boilerplate.
