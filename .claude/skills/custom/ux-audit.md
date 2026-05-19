---
name: ux-audit
description: Audit a website's UX and generate a prioritized recommendation report
---

# UX Audit

## Trigger
"audite [url]" or "ux audit [url]"

## Steps

1. **Fetch and analyze the site** (use web fetch or Playwright if available)

2. **Evaluate these dimensions:**
   - **Visual Hierarchy:** Is the most important content the most prominent? Clear heading hierarchy?
   - **Conversion Flow:** Is there a clear path from landing to CTA? How many clicks to convert?
   - **Mobile Experience:** Is it responsive? Touch targets adequate (min 44px)? Content readable without zoom?
   - **Loading Performance:** Page size, number of requests, LCP estimate
   - **Accessibility:** Color contrast, alt text, keyboard navigation, focus states
   - **Content Clarity:** Is the value proposition clear within 5 seconds? Is copy scannable?
   - **Trust Signals:** Testimonials, logos, certifications, security indicators
   - **Navigation:** Is it intuitive? Can users find what they need in 3 clicks?

3. **Score each dimension** (1-5) and calculate overall score

4. **Generate report** with:
   - Executive summary (2-3 sentences)
   - Scores table
   - Top 5 priority fixes (with expected impact)
   - Screenshots/descriptions of issues
   - Comparison with best practices

## Output
Markdown report at `ux-audit-[domain]-[date].md`
