# Boilerplate Issues — Retour d'expérience projet client

## Purpose

Ce fichier documente les frictions rencontrées en démarrant un projet client à partir du boilerplate `terence-nextjs-boilerplate`. Il sert de **feedback loop** : chaque problème rencontré ici doit être corrigé dans le boilerplate source pour que les prochains projets démarrent sans friction.

**Comment l'utiliser :**
- Quand tu démarres un nouveau projet client depuis le boilerplate et que tu rencontres un problème, ajoute-le ici avec le format ci-dessous (Symptôme → Cause → Fix appliqué → Fix recommandé)
- Quand tu as le temps, applique les fixes dans le boilerplate source (`terence-nextjs-boilerplate/`)
- Marque les issues comme ✅ FIXED une fois corrigées dans le boilerplate
- Ce fichier est lu par Claude Code au début de chaque session — il sait quoi éviter

**Boilerplate source :** `~/Desktop/terence-nextjs-boilerplate/`

---

## Status

| # | Issue | Status |
|---|-------|--------|
| 1 | .npmrc manquant | ✅ FIXED |
| 2 | Sanity en dep obligatoire | ✅ FIXED |
| 3 | shadcn en dependencies | ✅ FIXED |
| 4 | @ts-expect-error obsolète | ✅ FIXED |
| 5 | Defaults incohérents | ✅ FIXED (aligned in client.config.ts) |
| 6 | Liens orphelins après setup | ✅ FIXED |
| 7 | Layout components (navbar/footer) pas adaptés au siteType | ✅ FIXED |
| 8 | Placeholders non remplacés | ✅ FIXED |
| 9 | page.tsx starter non supprimé | ✅ FIXED |
| 10 | Pas de skill UI/UX design | ⬜ Manual (install uipro-cli per project) |
| 11 | Middleware next-intl actif | ✅ FIXED |
| 12 | GSAP importé statiquement | ✅ FIXED |
| 13 | useMediaQuery cause CLS | ✅ FIXED |
| 14 | Navbar scroll re-renders | ✅ FIXED |
| 15 | NavbarMobile chargé sur desktop | ✅ FIXED |
| 16 | Composants below-fold non code-split | ⬜ Documented (pattern in CLAUDE.md) |
| 17 | Pas de LenisProvider + GSAP sync | ✅ FIXED |
| 18 | static-provider rempli de données fictives | ✅ FIXED |
| 19 | Structured data blog même sans blog | ✅ FIXED |
| 20 | --font-heading pas documenté dans le setup | ✅ FIXED |

---

## 1. pnpm strict mode — dépendances non résolues

**Symptôme :** 31 erreurs `Module not found` au premier `pnpm build` — `@base-ui/utils/empty`, `@floating-ui/utils/dom`, `@radix-ui/react-dialog`, `scheduler`, etc.

**Cause :** pnpm en mode strict ne hoiste pas les sous-dépendances. `@base-ui/react` dépend de `@base-ui/utils` mais ce dernier n'est pas accessible depuis `node_modules/` racine.

**Fix appliqué :** Ajout de `.npmrc` avec `shamefully-hoist=true`.

**Fix recommandé pour le boilerplate :** Inclure `.npmrc` avec `shamefully-hoist=true` dans le template, ou tester le build avec un `node_modules` frais avant chaque release du boilerplate.

---

## 2. @sanity/client en dépendance obligatoire (même en mode static)

**Symptôme :** Turbopack analyse `sanity-provider.ts` et ses imports même quand `CONTENT_PROVIDER !== "sanity"`. Ça tire `rxjs`, `get-it`, `@sanity/eventsource` et des dizaines de sous-deps → build lent, mémoire élevée en dev.

**Cause :** L'import dynamique dans `content/index.ts` (`await import("./sanity-provider")`) n'empêche pas Turbopack de résoudre le graphe de dépendances à la compilation.

**Fix appliqué :** Supprimé `@sanity/client` et `@sanity/image-url` de `package.json`, stubbé `sanity-provider.ts` et `sanity/client.ts`.

**Fix recommandé pour le boilerplate :**
- Ne pas inclure `@sanity/client` et `@sanity/image-url` dans `package.json` par défaut
- Le script `pnpm setup` devrait les installer automatiquement quand `cms: "sanity"` est choisi dans `client.config.ts`
- `sanity-provider.ts` devrait être un stub par défaut, avec le vrai code dans un fichier séparé (e.g. `sanity-provider.full.ts`) que le setup copie

---

## 3. `shadcn` CLI en dependencies au lieu de devDependencies

**Symptôme :** Le package `shadcn` (CLI pour générer des composants) est dans `dependencies`, donc il est résolu et analysé par Turbopack au runtime.

**Cause :** Erreur de placement dans `package.json`.

**Fix recommandé :** Déplacer `"shadcn"` dans `devDependencies`.

---

## 4. `@ts-expect-error` obsolète dans contact-form.tsx

**Symptôme :** Erreur TypeScript `Unused '@ts-expect-error' directive` qui bloque le build.

**Cause :** Un commentaire `// @ts-expect-error -- zod v4 type mismatch with @hookform/resolvers` qui n'est plus nécessaire car le type mismatch a été résolu entre les versions.

**Fix recommandé :** Supprimer le `@ts-expect-error` ou vérifier que le build passe clean avant de publier une nouvelle version du boilerplate.

---

## 5. `client.config.ts` — valeurs par défaut incohérentes avec CLAUDE.md

**Symptôme :** `client.config.ts` a `locale: "fr"` et `siteType: "marketing"` par défaut, mais le `CLAUDE.md` généré par le setup montre `## Site Type: portfolio` et `## Locale: en` — les placeholders dans CLAUDE.md ne reflètent pas les valeurs par défaut du config.

**Fix recommandé :** Soit aligner les defaults (`locale: "en"`, `siteType: "portfolio"` comme valeurs les plus courantes), soit s'assurer que `pnpm setup` écrase toujours les placeholders CLAUDE.md avec les vraies valeurs de `client.config.ts`.

---

## 6. Le setup ne supprime pas les fichiers orphelins des pages désactivées dans les composants

**Symptôme :** Après `pnpm setup` avec `blog: false`, `pricing: false`, etc., les pages sont supprimées mais le footer et la navbar gardent des liens vers `/blog`, `/pricing`, `/team`, `/changelog`, `/engine/diagnostic`.

**Cause :** Le script `setup.ts` supprime les fichiers de pages mais ne met pas à jour les liens de navigation dans `navbar.tsx`, `navbar-mobile.tsx`, et `footer.tsx`.

**Fix recommandé :** Le script setup devrait :
- Mettre à jour `NAV_ITEMS` dans `navbar.tsx` pour ne garder que les pages activées
- Mettre à jour `FOOTER_COLUMNS` dans `footer.tsx` pour ne référencer que les pages existantes
- Ou mieux : les nav items devraient être générés dynamiquement à partir de `client.config.ts`

---

## 7. Layout components (navbar/footer) pas adaptés au `siteType`

**Symptôme :** La navbar et le footer sont conçus pour un SaaS/marketing — navbar avec un seul variant pour toutes les pages, footer 5 colonnes avec newsletter et liens GitHub/Twitter. Sur un portfolio créatif, il faut restructurer la navbar (variant transparent pour hero vidéo vs default pour les autres pages) et réécrire entièrement le footer (minimaliste : logo, nav links, contact, copyright).

**Cause :** Le boilerplate fournit un seul template de navbar et un seul de footer, sans tenir compte du `siteType` configuré dans `client.config.ts`.

**Fix recommandé pour le boilerplate :**
- Proposer 2 templates de navbar et footer basés sur le `siteType` :
  - `marketing` / `saas` : navbar fixe mono-variant + footer 5 cols avec newsletter
  - `portfolio` / `corporate` : navbar per-page (chaque page importe et choisit son variant) + footer minimaliste
- Le script `pnpm setup` copie le bon template selon `siteType`
- Les nav items et footer links devraient être générés dynamiquement à partir de `client.config.ts` (pages activées uniquement)

---

## 8. Placeholders `[CLIENT_NAME]` restants après setup

**Symptôme :** Après `pnpm setup`, certains fichiers gardent `[CLIENT_NAME]` au lieu du vrai nom du client — notamment dans `design-system/client-brief.md`.

**Fix recommandé :** Le script setup devrait faire un find-and-replace global de `[CLIENT_NAME]` dans tous les fichiers markdown du projet.

---

## 9. `src/app/page.tsx` du starter Next.js non supprimé

**Symptôme :** Après `pnpm setup`, la page d'accueil affiche toujours le starter Next.js ("To get started, edit the page.tsx file" + logo NEXT.js + boutons Deploy Now / Documentation) au lieu de la vraie home page du projet.

**Cause :** Le boilerplate utilise un route group `(site)` pour les pages (`src/app/(site)/page.tsx`), mais le fichier `src/app/page.tsx` original de `create-next-app` n'est pas supprimé. Next.js donne la priorité à `src/app/page.tsx` sur `src/app/(site)/page.tsx` pour la route `/`.

**Fix appliqué :** Suppression manuelle de `src/app/page.tsx`.

**Fix recommandé pour le boilerplate :**
- Ne pas inclure `src/app/page.tsx` dans le template — seul `src/app/(site)/page.tsx` doit exister
- Ou bien, le script `pnpm setup` devrait supprimer `src/app/page.tsx` s'il existe
- Ajouter un check dans le script setup qui vérifie qu'il n'y a pas de conflit de routes entre la racine et le route group

---

## 10. Pas de skill UI/UX design inclus dans le boilerplate

**Symptôme :** Les pages générées par le boilerplate ont un design générique sans direction visuelle cohérente — pas de guidance sur les styles UI, palettes de couleurs adaptées au type de projet, typographie, ou patterns de layout.

**Cause :** Le boilerplate ne fournit aucun skill d'intelligence design à l'assistant IA. Le développeur doit manuellement guider chaque décision visuelle.

**Fix appliqué :** Installation du skill `ui-ux-pro-max` via `uipro init --ai claude` (CLI : `npm install -g uipro-cli`).

**Fix recommandé pour le boilerplate :**
- Inclure le skill `ui-ux-pro-max` pré-installé dans `.claude/skills/`
- Ou ajouter `uipro init --ai claude` comme étape du script `pnpm setup`
- Source : https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- Prérequis : `npm install -g uipro-cli`, Python 3.x pour le script de recherche

---

## 11. Middleware next-intl actif sur un site monolingue

**Symptôme :** Chaque navigation entre pages est lente — le middleware `next-intl` s'exécute sur chaque requête même quand le site est monolingue (English only).

**Cause :** Le middleware dans `middleware.ts` appelle `createMiddleware(routing)` de `next-intl` sur toutes les routes (`/((?!api|_next|_vercel|.*\\..*).*)`) sans condition. Même quand `CONTENT_PROVIDER !== "i18n"` ou que le site n'a qu'une seule locale, le middleware parse les headers `Accept-Language`, résout la locale, et peut potentiellement redirect.

**Fix appliqué :** Remplacement du middleware par un passthrough (`NextResponse.next()`) avec un commentaire pour réactiver quand l'i18n est nécessaire.

**Fix recommandé pour le boilerplate :**
- Le script `pnpm setup` devrait désactiver le middleware quand `i18n: false` ou quand une seule locale est configurée
- Le middleware ne devrait s'activer que si `client.config.ts` a `features.i18n: true` ET que `locales.length > 1`
- Par défaut, le middleware devrait être un passthrough

---

## 12. GSAP + ScrollTrigger importés statiquement (~50KB gzippés dans le bundle initial)

**Symptôme :** Le JavaScript initial de chaque page avec animations est anormalement lourd. GSAP core (~30KB) + ScrollTrigger (~20KB) sont dans le bundle même si l'utilisateur n'a pas encore scrollé.

**Cause :** `gsap-config.ts` fait un `import { gsap } from "gsap"` et `import { ScrollTrigger } from "gsap/ScrollTrigger"` statiquement. Tous les composants qui importent `use-gsap.ts` tirent ces modules dans leur chunk.

**Fix appliqué :** Réécriture de `gsap-config.ts` avec un pattern de lazy-loading (`async function getGsap()` + `Promise.all([import("gsap"), import("gsap/ScrollTrigger")])`). Le hook `use-gsap.ts` et `use-scroll-trigger.ts` appellent `getGsap()` de manière asynchrone. GSAP ne se charge que quand un composant animé monte.

**Fix recommandé pour le boilerplate :**
- `gsap-config.ts` devrait utiliser le pattern lazy par défaut
- `use-gsap.ts` devrait appeler `getGsap()` async et vérifier `element.isConnected` avant d'animer
- Documenter ce pattern dans les conventions du projet

---

## 13. useMediaQuery provoque un layout shift (CLS)

**Symptôme :** Sur mobile, le hero affiche brièvement la version desktop (vidéo) avant de basculer vers la version mobile (poster) — flash visible lors du chargement.

**Cause :** `useMediaQuery` utilise `useState(false)` → le serveur rend `isMobile = false`, le client hydrate avec `false`, puis `useEffect` détecte `true` et re-rend. Ce flip `false → true` cause un CLS.

**Fix appliqué :** Réécriture avec `useSyncExternalStore` (React 18+) — gère nativement la différence serveur/client sans layout shift.

**Fix recommandé pour le boilerplate :**
- Remplacer le pattern `useState + useEffect` par `useSyncExternalStore` dans `use-media-query.ts`
- C'est le pattern officiel React 18 pour les external stores (matchMedia, localStorage, etc.)

---

## 14. Scroll listener dans la Navbar cause des re-renders à chaque pixel

**Symptôme :** La Navbar re-render à chaque événement scroll (60+ fois/seconde en scrollant) même quand l'état `scrolled` ne change pas.

**Cause :** Le handler `setScrolled(window.scrollY > 16)` appelle setState à chaque événement scroll. Même si la valeur booléenne ne change pas, React compare l'ancienne et la nouvelle valeur et skip le render — mais le handler tourne quand même et crée une micro-pression sur le main thread.

**Fix appliqué :** Ajout d'une variable `prev` qui compare le booléen avant d'appeler `setScrolled` — setState n'est appelé que quand le seuil est effectivement franchi.

**Fix recommandé pour le boilerplate :** Appliquer ce pattern dans le composant Navbar par défaut.

---

## 15. NavbarMobile chargé même sur desktop

**Symptôme :** Le composant Drawer (vaul + Radix Dialog) est dans le bundle initial de chaque page même si le menu mobile n'est jamais ouvert sur desktop.

**Cause :** `NavbarMobile` est importé statiquement dans `navbar.tsx` et toujours rendu dans le DOM (avec `open={false}`).

**Fix appliqué :** Import lazy avec `React.lazy()` + rendu conditionnel (`{mobileOpen && <Suspense><NavbarMobile /></Suspense>}`). Le chunk Drawer ne se télécharge que quand l'utilisateur clique sur le menu mobile.

**Fix recommandé pour le boilerplate :** Utiliser `React.lazy` + rendu conditionnel pour le drawer mobile par défaut.

---

## 16. Composants below-the-fold importés statiquement sur la Home page

**Symptôme :** Le bundle JS initial de la Home page est lourd car tous les composants client (SelectedWork avec video refs, ServicesOverview avec GSAP ScrollTrigger) sont dans le même chunk.

**Cause :** Tous les composants sont importés avec des `import` statiques dans `page.tsx`.

**Fix appliqué :** Utilisation de `next/dynamic` pour `SelectedWork` et `ServicesOverview` avec `{ ssr: true }` — le HTML est toujours généré côté serveur, mais le JavaScript client est code-split en chunks séparés.

**Fix recommandé pour le boilerplate :**
- Documenter le pattern `next/dynamic` pour les composants below-the-fold
- Les sections qui utilisent GSAP ou des refs vidéo devraient être lazy-loadées par défaut

---

## 17. Pas de LenisProvider + synchronisation GSAP

**Symptôme :** Chaque projet premium a besoin de smooth scroll. Le boilerplate inclut déjà GSAP mais pas Lenis — il faut créer le provider, le pattern de sync (`autoRaf: false` + `gsap.ticker.add()`), importer le CSS, et câbler le tout dans le layout. Le pattern est toujours identique.

**Cause :** Le boilerplate fournit GSAP (lazy-loaded) mais n'inclut pas la couche smooth scroll. Lenis + GSAP est le combo standard pour les sites Awwwards-level, et le pattern d'intégration ne varie jamais.

**Fix appliqué :** Création de `src/components/providers/lenis-provider.tsx` avec `ReactLenis` (`lenis/react`), `autoRaf: false`, composant `LenisGsapSync` qui synchro via `gsap.ticker.add((time) => lenis.raf(time * 1000))`. Ajout de `@import "lenis/dist/lenis.css"` dans `globals.css`.

**Fix recommandé pour le boilerplate :**
- Inclure `lenis` dans `package.json`
- Fournir `lenis-provider.tsx` prêt à l'emploi avec le sync GSAP
- Ajouter `@import "lenis/dist/lenis.css"` dans `globals.css`
- Le provider devrait être activé/désactivé via un flag dans `client.config.ts` (e.g. `features.smoothScroll: true`)

---

## 18. `static-provider.ts` rempli de 600 lignes de données fictives "Apex Studio"

**Symptôme :** Au démarrage d'un projet client, la première chose à faire est de purger ~600 lignes de contenu fictif (testimonials, blog posts, team members, projects) écrits pour une agence dev générique "Apex Studio". C'est du bruit qui ralentit la compréhension du code et qui n'a rien à voir avec le client.

**Cause :** Le static provider est conçu comme une démo plutôt que comme un point de départ. Le contenu devrait venir du brief client, pas d'un placeholder.

**Fix recommandé pour le boilerplate :**
- Le static provider devrait contenir des stubs minimaux (1 projet, 1 testimonial, 1 team member) avec des commentaires `// Replace with client data`
- Ou mieux : le script `pnpm setup` devrait générer le contenu initial à partir des informations dans `client.config.ts` (nom du client, services, etc.)
- Le contenu de démo détaillé peut vivre dans un fichier séparé (`static-provider.demo.ts`) pour référence

---

## 19. Structured data `SearchAction` pointe vers `/blog` même quand blog désactivé

**Symptôme :** Le layout injecte un schema `WebSite` avec `"target": ".../blog?q={search_term_string}"` dans le JSON-LD de chaque page, même quand `features.blog: false` dans le config. Sur Basanto, le blog a été supprimé → le `SearchAction` pointe vers un 404.

**Cause :** Le structured data dans `layout.tsx` est statique et ne tient pas compte des feature flags de `client.config.ts`.

**Fix recommandé pour le boilerplate :**
- Conditionner l'injection du `SearchAction` à `features.blog: true` (ou à l'existence de la route `/blog`)
- Plus généralement, le structured data devrait être généré dynamiquement à partir de `client.config.ts`

---

## 20. `--font-heading` non documenté comme étape du setup

**Symptôme :** Le boilerplate définit `--font-heading: var(--font-sans)` dans le thème — heading et body utilisent la même police. Chaque projet nécessite une heading font distincte (ex: Fraunces pour Basanto), mais rien dans le setup flow, CLAUDE.md, ou le README ne mentionne cette étape. Le développeur découvre le problème en voyant que tous les headings ressemblent au body text.

**Cause :** La variable CSS existe mais n'est pas intégrée dans le workflow de configuration du projet.

**Fix recommandé pour le boilerplate :**
- Ajouter `headingFont` dans `client.config.ts` (à côté du nom et des couleurs)
- Le script `pnpm setup` devrait configurer `--font-heading` dans `globals.css` et importer la Google Font dans `layout.tsx`
- À minima, ajouter un commentaire visible dans `globals.css` : `/* TODO: Replace with project heading font — see layout.tsx */`
- Documenter l'étape dans le README / CLAUDE.md section "First-time setup"

---

## Résumé par priorité

| Priorité | Issue | Impact |
|----------|-------|--------|
| **P0** | #1 — .npmrc manquant | Build cassé dès le départ |
| **P0** | #4 — @ts-expect-error obsolète | Build cassé |
| **P0** | #9 — page.tsx starter non supprimé | Home page invisible (affiche le starter Next.js) |
| **P1** | #2 — Sanity en dep obligatoire | Dev server lent, mémoire élevée |
| **P1** | #3 — shadcn en dependencies | Bundle pollué |
| **P1** | #11 — Middleware next-intl actif en monolingue | Latence sur chaque navigation |
| **P1** | #12 — GSAP importé statiquement | +50KB gzippés dans le bundle initial |
| **P1** | #18 — static-provider rempli de données fictives | 600 lignes de bruit à purger avant de commencer |
| **P2** | #6 — Liens orphelins après setup | UX cassée (404) |
| **P2** | #7 — Layout components pas adaptés au siteType | Navbar/footer à réécrire à chaque projet |
| **P2** | #8 — Placeholders non remplacés | Polish |
| **P2** | #10 — Pas de skill UI/UX design | Design générique sans guidance visuelle |
| **P2** | #13 — useMediaQuery cause CLS | Flash desktop→mobile visible |
| **P2** | #14 — Navbar scroll re-renders | Pression inutile sur main thread |
| **P2** | #15 — NavbarMobile chargé sur desktop | Bundle pollué par Drawer inutilisé |
| **P2** | #16 — Composants below-fold non code-split | Bundle initial trop lourd |
| **P2** | #17 — Pas de LenisProvider + GSAP sync | Smooth scroll à recréer from scratch |
| **P2** | #19 — Structured data blog même sans blog | SearchAction pointe vers 404 |
| **P2** | #20 — --font-heading pas documenté | Heading font oubliée au setup |
| **P3** | #5 — Defaults incohérents | Confusion mineure |
