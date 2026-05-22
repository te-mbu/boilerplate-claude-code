# Boilerplate — Contexte Projet

---

## Toi

- **Nom :** Terence MBU
- **Role :** Fondateur d'une agence de sites web generee par IA. Tu es le dev, le directeur creatif, et le point de contact client. Claude Code est ton co-equipier technique.
- **Clients types :** Startups, PME, agences — des clients qui ont besoin d'un site pro rapidement, sans avoir une equipe tech interne.
- **Niveau tech :** Senior web dev. Tu comprends l'architecture, tu prends les decisions techniques, mais tu delegues l'implementation a Claude Code autant que possible.
- **Outils quotidiens :** VS Code + Claude Code. Pas de Figma — le design se fait directement dans le code, guide par le design system et des screenshots d'inspiration.

---

## Le boilerplate — Vision

**En une phrase :** Tu recois un brief client, et en quelques minutes t'as un projet pret a construire — pas un projet vide, un projet qui comprend deja qui est le client, quel type de site c'est, et comment le construire.

**Pourquoi il existe :**
- Ne jamais repartir de zero. Chaque decision technique deja prise (stack, conventions, design system, instructions IA) est capitalisee.
- Claude Code ouvre le projet et sait deja comment travailler — quelles regles suivre, quel design system respecter, quels patterns utiliser.
- C'est un multiplicateur de toi : tu gardes le controle creatif et la direction, mais toute la mise en place, la structure, les best practices sont automatisees.
- Le boilerplate transforme Claude Code d'un outil generique en un assistant qui connait tes standards.

**Frequence d'utilisation :** Chaque nouveau projet client demarre depuis ce boilerplate.

**Objectif a terme :** Outil interne de l'agence. Chaque projet client l'ameliore (feedback loop via BOILERPLATE-ISSUES.md).

**Public cible :** Toi + Claude Code. Le boilerplate est concu pour que l'IA soit productive immediatement grace au CLAUDE.md, au design system, et aux conventions documentees.

---

## Types de projets

| # | Type | Frequence |
|---|------|-----------|
| 1 | Portfolio creatif (agence, studio, photographe) | Le plus frequent |
| 2 | Site vitrine / corporate | Frequent |
| 3 | Landing page produit / SaaS | Regulier |
| 4 | Site marketing multi-pages | Regulier |
| 5 | Blog / media | Occasionnel |
| 6 | E-commerce (headless) | Rare |

Premier projet client depuis le boilerplate : **Basanto Studio** (portfolio agence creative).

---

## Stack & preferences

- **CMS :** Static par defaut. Sanity quand le client a besoin d'editer son contenu lui-meme.
- **Hosting :** Vercel, toujours.
- **Design :** Pas de Figma. Le design se fait dans le code, guide par le design system (`design-system/`) et des screenshots d'inspiration que tu envoies a Claude Code. Workflow : screenshot + "adapte ca pour le client".
- **Animations :** GSAP + Lenis pour le smooth scroll. Niveau Awwwards — les sites doivent avoir du polish, des transitions soignees, du scroll-driven. Pas sobre.
- **i18n :** Rare. La plupart des projets sont monolingues (FR ou EN). FR+EN occasionnel.

---

## Workflow typique — Du brief au deploy

1. **Brief client** — Tu recois les infos : nom, secteur, services, direction visuelle
2. **Clone + config** — `client.config.ts` avec les infos client, `pnpm setup`
3. **Design system** — Remplir `design-system/client-brief.md`, choisir les tokens (couleurs, typo, spacing)
4. **Build page par page** — Tu travailles avec Claude Code section par section. Tu envoies des screenshots d'inspi, Claude Code adapte au design system du client.
5. **Iterations** — "plus bold", "plus compact", "ajoute un gradient" — modifications directes sur les composants
6. **Pre-launch** — Checklist (`design-system/checklist.md`), Lighthouse, accessibilite, responsive
7. **Deploy** — Vercel, domaine client

Le boilerplate doit rendre les etapes 1-3 quasi-instantanees pour que tu passes le maximum de temps sur 4-5 (la ou la valeur est).

---

## Priorites pour le boilerplate

1. **Demarrage rapide** — < 30 min du clone au premier build fonctionnel. C'est non-negociable.
2. **Design quality** — Awwwards-level par defaut. Les sites doivent impressionner visuellement.
3. **Qualite du code genere par Claude Code** — Le CLAUDE.md, le design system, et les conventions doivent guider Claude Code pour produire du code propre sans supervision constante.
4. **Performance** — Lighthouse 95+. Lazy-loading, code-splitting, optimisation des assets.
5. **DX** — Scripts, conventions, docs. Tout ce qui fait que tu perds moins de temps en setup et plus en creation.
6. **SEO out-of-the-box** — Metadata, structured data, sitemap — tout doit etre la par defaut.
7. **Flexibilite** — S'adapte aux differents types de projets via `client.config.ts` et le setup script.

---

## Ce que Claude Code doit savoir

- **Langue :** Communique en francais. Le code et les commentaires sont en anglais.
- **Ton :** Direct, pas de blabla. Montre le resultat, pas l'explication.
- **Design d'abord :** Toujours lire `design-system/client-brief.md` avant de coder. Ne jamais copier les couleurs/fonts d'un screenshot d'inspi — adapter au design system du projet.
- **Pas de over-engineering :** Pas de refactor non demande, pas d'abstraction prematuree, pas de features speculatives.
- **Composants existants :** Utiliser shadcn/ui en priorite. Ne jamais creer de doublon.
- **Animations :** GSAP lazy-loaded via `getGsap()`. Respecter `prefers-reduced-motion`. Le smooth scroll est via Lenis.
- **1-3 taches a la fois :** Montrer le resultat avant de continuer. Pas de batches de 10 changements.
- **Conventions CSS :** Variables CSS de `globals.css` pour tout. Jamais de couleurs hardcodees.

---

## Philosophie de creation — "Page Blanche"

Le boilerplate ne contient PAS de sections pre-faites a assembler. Chaque section de chaque site est composee from scratch, guidee par :

1. **Le brief client** (`design-system/client-brief.md`) — qui est le client, quelle personnalite, quel objectif
2. **Les design tokens** (`globals.css`) — couleurs, typo, spacing, radius calibres pour le client
3. **Le taste skill** (`.claude/skills/taste/SKILL.md`) — regles de design engineering, anti-patterns, arsenal creatif
4. **Les primitives shadcn/ui** — Button, Card, Badge, Separator, Accordion... comme briques de base

Le dossier `examples/sections/` existe comme inspiration lointaine, mais on n'importe jamais, on ne copie-colle jamais. Chaque section est une reponse unique au client.

**Pourquoi :** Les templates generiques produisent des sites generiques. L'avantage de l'agence c'est que chaque livrable est sur mesure — meme si le process est rapide grace au boilerplate.

---

## Le taste skill — Moteur creatif

Le taste skill a 3 dials qui pilotent toutes les decisions visuelles :

| Dial | Baseline | Effet |
|------|----------|-------|
| DESIGN_VARIANCE (1-10) | 8 | 1=symetrique/previsible, 10=asymetrique/masonry/chaos |
| MOTION_INTENSITY (1-10) | 6 | 1=statique, 10=choreographie scroll complexe |
| VISUAL_DENSITY (1-10) | 4 | 1=art gallery/aerien, 10=cockpit/dense |

**Ajustement par type de projet :**

| Type | VARIANCE | MOTION | DENSITY | Vibe |
|------|----------|--------|---------|------|
| Portfolio creatif | 9 | 8 | 3 | Awwwards, art direction, mouvement |
| Site vitrine | 7 | 5 | 4 | Pro, elegant, pas ennuyeux |
| Landing page | 6 | 6 | 5 | Focus conversion, preuves, urgence |
| Corporate | 5 | 4 | 5 | Sobre, credible, structure |
| Blog / media | 6 | 3 | 6 | Lisible, fonctionnel, typographie |

Ces valeurs sont un point de depart — le dev les ajuste selon le brief.

---

## Animated Artifacts

Les artifacts sont des micro-UIs animees qui donnent vie aux sections. Ils transforment un site marketing en quelque chose qui "respire" — pas une brochure PDF statique.

**Quand les utiliser :**
- Hero sections — remplacer l'image placeholder par un artefact contextuel
- Feature cards — illustrer chaque feature avec une mini-demo animee
- Sections "proof" — stats animees, indicateurs live, timelines

**Catalogue disponible :**
- TypewriterFeed — texte qui se tape (tech, AI, monitoring)
- GeometricMotif — SVG rotatif abstrait (branding, precision)
- PulseIndicator — dot pulsant (status, confiance)
- CardShuffler — cartes empilees qui rotent (plans, features)
- Waveform — signal EKG/audio (sante, signal)
- CursorProtocol — curseur anime qui clique (UX, demo produit)
- OrbitalDiagram — orbites animees (ecosysteme, plateforme)

**Regle :** Le contenu des artifacts est toujours derive du contexte business du client, jamais generique.

---

## Process d'iteration visuelle

Le design se fait en live dans le browser. Pas de Figma, pas de maquettes pre-approuvees. Le cycle :

1. **Claude Code compose** une section from scratch (taste skill + tokens + brief)
2. **Le dev regarde** dans le browser (localhost)
3. **Le dev donne du feedback** en langage naturel : "plus bold", "decale a gauche", "ajoute du mouvement ici", "les cards sont trop generiques"
4. **Claude Code ajuste** directement le code — pas de nouveau fichier, modification in-place
5. **Repeat** jusqu'a satisfaction

Ce cycle doit etre rapide (< 30 sec entre feedback et resultat visible). C'est pourquoi :
- Le dev server est toujours lance
- Les modifications sont chirurgicales (pas de refactor)
- On montre le resultat AVANT de passer a autre chose

**Screenshots d'inspiration :** Le dev envoie parfois un screenshot d'un autre site pour donner une direction. Claude Code ne copie JAMAIS — il adapte l'intention au design system du client.

---

## Niveau d'ambition par type de projet

| Type | Ambition visuelle | Reference |
|------|-------------------|-----------|
| Portfolio creatif | Awwwards-level. Animations complexes, layouts asymetriques, micro-interactions. Le site EST le portfolio. | Studios comme Locomotive, Resn, Active Theory |
| Site vitrine | Elegant et memorable. Pas boring, mais pas showoff. Le contenu prime. | Stripe, Linear, Vercel |
| Landing page | Conversion-first. Chaque pixel sert un objectif business. Design au service du message. | Basecamp, Carrd pro, Loom |
| Corporate | Credible, structure, premium feel sans exces. La confiance se lit dans la sobriete. | McKinsey, Bain, mais en moderne |
| Blog / media | Typographie soignee, lisibilite, hierarchy claire. Le contenu est roi. | Substack pro, Medium, iA Writer |

---

## Notes libres

- Le `BOILERPLATE-ISSUES.md` est le feedback loop : chaque friction rencontree sur un projet client y est documentee, puis corrigee dans le boilerplate source.
- Le boilerplate n'est pas un produit a vendre — c'est l'avantage competitif de l'agence. C'est ce qui te permet de livrer plus vite et mieux que si tu partais de zero.
- Basanto Studio est le premier projet client. Les 20 issues documentees dans `BOILERPLATE-ISSUES.md` viennent de cette experience.
