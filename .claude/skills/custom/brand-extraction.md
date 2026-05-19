---
name: brand-extraction
description: Extract brand identity from a URL, PDF, or brief and generate design system tokens
---

# Brand Extraction

## Trigger
"extrais la marque de [url/pdf/brief]" or "extract brand from [url/pdf/brief]"

## Steps

1. **Analyze the source:**
   - If URL: fetch the page, capture colors (from CSS/computed styles), fonts (from font-face/Google Fonts), logo, tone of copy
   - If PDF/brief: read the document, extract brand guidelines
   - If text brief: parse the description

2. **Extract tokens:**
   - Primary color (most prominent brand color)
   - Secondary color
   - Accent/CTA color
   - Background colors (light, dark)
   - Text colors (primary, secondary, muted)
   - Typography: heading font, body font, font sizes
   - Border radius style (sharp, rounded, pill)
   - Shadow style (none, subtle, pronounced)
   - Tone of voice (professional, casual, playful, luxury, technical)

3. **Generate outputs:**
   - Update `src/app/globals.css` `:root` variables with extracted colors (convert to oklch)
   - Update `design-system/tokens.md` with the new values
   - Update `design-system/principles.md` if tone of voice changes the principles
   - Report what was extracted and any ambiguities

4. **Verify:**
   - Check contrast ratios (WCAG AA) for text on background combinations
   - Flag any accessibility issues
   - Show a quick preview of the color palette

## Output
- Updated `globals.css` with client-specific tokens
- Updated `design-system/tokens.md`
- Summary report of extracted brand elements
