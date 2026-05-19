---
name: deploy
description: Build, audit, and deploy the site to Vercel
---

# Deploy

## Trigger
"deploie" or "deploy" or "deploy to production"

## Steps

1. **Pre-flight checks:**
   - `pnpm lint` -- fix any lint errors
   - `pnpm build` -- ensure build succeeds
   - Check for console.log statements in production code
   - Check .env variables are set

2. **Quality gates:**
   - Run Lighthouse audit on localhost (if available)
   - Check: Performance >= 90, Accessibility >= 90, SEO >= 90
   - If any score below 90, report issues and ask before proceeding

3. **Deploy:**
   - `vercel --prod` for production
   - `vercel` for preview deployment
   - Report deployment URL

4. **Post-deploy:**
   - Verify the deployed URL loads correctly
   - Check that OG images work (fetch the URL and check meta tags)
   - Report success with URL

## Output
Deployment URL and quality report
