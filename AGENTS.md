<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Agent Coordination

### Available Agents
- **SEO Agent** (`/seo [command] [url]`) — Full site SEO audits, E-E-A-T analysis, Core Web Vitals, AI search optimization. See `.claude/skills/seo/SKILL.md`
- **Blog Agent** (`/blog [command]`) — Content lifecycle: write, rewrite, analyze, strategy, calendar. See `.claude/skills/blog/SKILL.md`
- **Frontend Design Agent** — Distinctive UI, anti-AI-slop aesthetics. See `.claude/skills/frontend-design.md`

### Delegation Rules
- SEO tasks → delegate to SEO agent
- Content creation/strategy → delegate to Blog agent
- All agents read CLAUDE.md + design-system/ before acting
- Agent outputs are markdown files placed in project root or relevant directories
- One agent does not modify files owned by another without validation

### Shared Context
All agents share access to:
- `design-system/` — tokens, components, patterns, principles
- `CLAUDE.md` — project identity and rules
- `src/lib/content/` — content layer (data source)
