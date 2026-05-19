# Next.js Skills

Skills from [wsimmonds/claude-nextjs-skills](https://github.com/wsimmonds/claude-nextjs-skills) (MIT, 94 stars)

## Install

Clone the skill files from the repo above into this directory:

```bash
git clone https://github.com/wsimmonds/claude-nextjs-skills.git /tmp/nextjs-skills
cp /tmp/nextjs-skills/skills/*/*.md .claude/skills/nextjs/
rm -rf /tmp/nextjs-skills
```

## Available Skills

| Skill | What Claude Learns |
|-------|-------------------|
| `app-router-fundamentals` | File conventions, metadata, layouts, route groups, `generateStaticParams` |
| `server-client-components` | Decision tree Server vs Client, `await searchParams` (Next 15+), composition patterns |
| `advanced-routing` | Server Actions (MUST return void), `useActionState`, parallel/intercepting routes, streaming |
| `anti-patterns` | 6 categories of common mistakes to avoid |
| `pathname-id-fetch` | Dynamic params as Promise in Next.js 15+ |
| `client-cookie-pattern` | Two-file pattern: client component + Server Action for cookies |
| `dynamic-routes-params` | Catch-all, nested resources, params Server vs Client |
| `server-navigation` | Link, `redirect()`, Server Actions — don't add `'use client'` just for navigation |
| `use-search-params-suspense` | `useSearchParams` REQUIRES `'use client'` + Suspense boundary |
| `vercel-ai-sdk` | AI SDK v5 guide: `useChat`, `generateText`, `streamText`, tool calling |

## Impact
These skills improve Claude's Next.js eval pass rate from **32% to 78%**.
