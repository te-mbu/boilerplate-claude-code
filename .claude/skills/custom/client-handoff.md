---
name: client-handoff
description: Generate client handoff documentation including CMS access, DNS config, and usage guide
---

# Client Handoff

## Trigger
"prepare la livraison [client]" or "client handoff for [client]"

## Steps

1. **Generate technical documentation:**
   - Site architecture overview
   - Tech stack summary
   - Environment variables list (without values)
   - Deployment process
   - How to trigger a new build

2. **CMS Guide (if Sanity is used):**
   - How to log into Sanity Studio
   - How to create/edit blog posts
   - How to update team members
   - How to modify testimonials
   - How to update site settings (logo, social links, etc.)
   - Image size recommendations
   - Content publishing workflow

3. **DNS Configuration:**
   - Vercel domain setup instructions
   - DNS records to add (A record, CNAME)
   - SSL certificate (automatic via Vercel)
   - Email DNS records if needed (MX, SPF, DKIM)

4. **Maintenance Guide:**
   - How to request changes
   - What's included in the maintenance plan
   - Response times
   - Emergency contact

5. **Transfer Checklist:**
   - [ ] Client has Sanity Studio access
   - [ ] Client has Vercel project access (if applicable)
   - [ ] DNS is configured and propagated
   - [ ] SSL certificate is active
   - [ ] Analytics is tracking
   - [ ] Cookie consent is working
   - [ ] All forms are connected to client's email/CRM
   - [ ] Client has received the usage guide
   - [ ] Training call scheduled/completed

## Output
`handoff-[client-name]-[date].md` with all documentation
