#!/usr/bin/env tsx
/**
 * Design Tokens Generator
 * =======================
 * Reads design-system/client-brief.md, generates design token proposals
 * based on the brief, and applies them after user validation.
 *
 * Usage: pnpm design
 * Re-runnable: yes (idempotent)
 */

import fs from "fs";
import path from "path";
import readline from "readline";
import { hexToOklch, isLight } from "./utils/color.js";

const ROOT = path.resolve(import.meta.dirname, "..");
const BRIEF_PATH = path.join(ROOT, "design-system/client-brief.md");
const GLOBALS_CSS = path.join(ROOT, "src/app/globals.css");
const DECISIONS_MD = path.join(ROOT, "design-system/decisions.md");
const CLIENT_CONFIG = path.join(ROOT, "client.config.ts");

// =============================================================================
// Types
// =============================================================================
interface BriefData {
  clientName: string;
  industry: string;
  brandPersonality: string[];
  colorMood: string;
  colorAvoid: string;
  headingFeel: string;
  bodyFeel: string;
  spacing: string;
  cornerRadius: string;
  lockedFont: string | null;
  lockedColors: string[];
}

interface ColorPalette {
  primary: string;
  cta: string;
  success: string;
  destructive: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  notes: string;
}

interface TypographyRec {
  pairingName: string;
  headingFont: string;
  bodyFont: string;
  mood: string;
  googleFontsUrl: string;
}

interface StyleRec {
  category: string;
  keywords: string;
  effects: string;
  designSystemVars: string;
}

interface DesignProposal {
  styleDirection: string;
  colors: ColorPalette;
  typography: TypographyRec;
  radius: string;
  spacing: string;
  shadows: string;
  styleKeywords: string;
  lockedFont: string | null;
  lockedColors: string[];
}

// =============================================================================
// Brief parser
// =============================================================================
function parseBrief(): BriefData {
  if (!fs.existsSync(BRIEF_PATH)) {
    console.error("❌ design-system/client-brief.md not found.");
    console.error("   Fill the brief first, then run pnpm design.");
    process.exit(1);
  }

  const content = fs.readFileSync(BRIEF_PATH, "utf-8");

  const extract = (label: string): string => {
    const regex = new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+)`, "i");
    const match = content.match(regex);
    return match?.[1]?.trim().replace(/^\[.*\]$/, "") ?? "";
  };

  // Extract brand personality adjectives (numbered list after "Brand Personality")
  const personalitySection = content.match(
    /## Brand Personality[\s\S]*?\n([\s\S]*?)(?=\n##|\n---)/
  );
  const personalityLines = personalitySection?.[1]
    ?.split("\n")
    .map((l) => l.replace(/^\d+\.\s*/, "").trim())
    .filter((l) => l.length > 0 && !l.startsWith("<!--")) ?? [];

  // Detect locked font (existing brand)
  const existingAssets = extract("Existing brand assets");
  let lockedFont: string | null = null;
  const fontMatch = existingAssets.match(/font[:\s]+([^,]+)/i);
  if (fontMatch) {
    lockedFont = fontMatch[1].trim();
  }
  // Also check heading feel for explicit font name
  const headingFeel = extract("Heading feel");
  const explicitFont = headingFeel.match(/^([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)\s*[-—]/);
  if (explicitFont) {
    lockedFont = explicitFont[1].trim();
  }

  // Detect locked colors
  const lockedColors: string[] = [];
  const colorMood = extract("Primary mood");
  const hexMatches = colorMood.match(/#[0-9a-fA-F]{6}/g);
  if (hexMatches) {
    lockedColors.push(...hexMatches);
  }

  return {
    clientName: extract("Company name"),
    industry: extract("Industry"),
    brandPersonality: personalityLines,
    colorMood,
    colorAvoid: extract("Avoid"),
    headingFeel,
    bodyFeel: extract("Body feel"),
    spacing: extract("Spacing"),
    cornerRadius: extract("Corner radius"),
    lockedFont,
    lockedColors,
  };
}

// =============================================================================
// Recommendation builders (baseline defaults — Claude refines via impeccable)
// =============================================================================
function getColorRecommendation(_brief: BriefData): ColorPalette {
  return {
    primary: "#0a0a0a",
    cta: "#2563eb",
    success: "#16a34a",
    destructive: "#dc2626",
    background: "#ffffff",
    foreground: "#0a0a0a",
    muted: "#f5f5f5",
    border: "#e5e5e5",
    notes: "Baseline palette — customize via client.config.ts or ask Claude to refine",
  };
}

function getTypographyRecommendation(_brief: BriefData): TypographyRec {
  return {
    pairingName: "Default",
    headingFont: "",
    bodyFont: "",
    mood: "",
    googleFontsUrl: "",
  };
}

function getStyleRecommendation(_brief: BriefData): StyleRec {
  // kept inline to preserve compatibility with the rest of the script
  const best: Record<string, string> = {};
  return {
    category: best["Style Category"] ?? "",
    keywords: best["Keywords"] ?? "",
    effects: best["Effects & Animation"] ?? "",
    designSystemVars: best["Design System Variables"] ?? "",
  };
}

// =============================================================================
// Map brief keywords to concrete values
// =============================================================================
function mapRadius(brief: BriefData): string {
  const val = brief.cornerRadius.toLowerCase();
  if (val.includes("sharp") || val.includes("square")) return "0rem";
  if (val.includes("slightly") || val.includes("subtle")) return "0.375rem";
  if (val.includes("pill") || val.includes("fully")) return "1rem";
  // Default: balanced
  return "0.625rem";
}

function mapSpacing(brief: BriefData): string {
  const val = brief.spacing.toLowerCase();
  if (val.includes("airy") || val.includes("generous")) return "relaxed";
  if (val.includes("compact") || val.includes("dense")) return "compact";
  return "balanced";
}

function mapShadows(style: StyleRec): string {
  const keywords = style.keywords.toLowerCase();
  if (keywords.includes("flat") || keywords.includes("minimal")) return "none";
  if (keywords.includes("brutalism") || keywords.includes("hard shadow")) return "hard";
  if (keywords.includes("glass") || keywords.includes("glow")) return "elevated";
  return "subtle";
}

function spacingValues(level: string): { section: string; sectionLg: string } {
  switch (level) {
    case "compact": return { section: "3.5rem", sectionLg: "5rem" };
    case "relaxed": return { section: "6rem", sectionLg: "8rem" };
    default: return { section: "5rem", sectionLg: "7rem" };
  }
}

// Derive dark mode variant: lighten for dark backgrounds, darken for light
function deriveDarkVariant(hex: string, isBackground: boolean): string {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  if (isBackground) {
    // Dark bg: use a very dark version
    r = Math.round(r * 0.15);
    g = Math.round(g * 0.15);
    b = Math.round(b * 0.15);
  } else {
    // Dark foreground/text: lighten significantly
    r = Math.min(255, Math.round(r + (255 - r) * 0.8));
    g = Math.min(255, Math.round(g + (255 - g) * 0.8));
    b = Math.min(255, Math.round(b + (255 - b) * 0.8));
  }

  const newHex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  return hexToOklch(newHex);
}

// =============================================================================
// Build proposal
// =============================================================================
function buildProposal(brief: BriefData): DesignProposal {
  console.log("🔍 Analyzing brief...");
  console.log(`   Client: ${brief.clientName} (${brief.industry})`);
  console.log("");

  const colors = getColorRecommendation(brief);
  const typography = getTypographyRecommendation(brief);
  const style = getStyleRecommendation(brief);
  const radius = mapRadius(brief);
  const spacing = mapSpacing(brief);
  const shadows = mapShadows(style);

  // Apply locked colors if any
  if (brief.lockedColors.length > 0) {
    colors.primary = brief.lockedColors[0];
    if (brief.lockedColors.length > 1) {
      colors.cta = brief.lockedColors[1];
    }
  }

  return {
    styleDirection: style.category,
    colors,
    typography,
    radius,
    spacing,
    shadows,
    styleKeywords: style.keywords,
    lockedFont: brief.lockedFont,
    lockedColors: brief.lockedColors,
  };
}

// =============================================================================
// Display proposal
// =============================================================================
function displayProposal(proposal: DesignProposal, clientName: string): void {
  const line = "━".repeat(50);

  console.log("");
  console.log(`🎨 Design tokens proposal for ${clientName || "[CLIENT_NAME]"}`);
  console.log(line);
  console.log("");

  console.log(`Style direction: ${proposal.styleDirection}`);
  console.log("");

  console.log("Colors:");
  const colorEntries = [
    ["--primary", proposal.colors.primary],
    ["--cta", proposal.colors.cta],
    ["--success", proposal.colors.success],
    ["--destructive", proposal.colors.destructive],
    ["--background", proposal.colors.background],
    ["--foreground", proposal.colors.foreground],
    ["--muted", proposal.colors.muted],
    ["--border", proposal.colors.border],
  ] as const;

  for (const [name, value] of colorEntries) {
    const locked = proposal.lockedColors.includes(value) ? " 🔒" : "";
    console.log(`  ${name.padEnd(18)} ${value}${locked}`);
  }
  if (proposal.colors.notes) {
    console.log(`  Notes: ${proposal.colors.notes}`);
  }
  console.log("");

  console.log("Typography:");
  if (proposal.lockedFont) {
    console.log(`  Heading font:   ${proposal.lockedFont} 🔒 (from client brand)`);
  } else {
    console.log(`  Heading font:   ${proposal.typography.headingFont || "(same as body)"}`);
  }
  console.log(`  Body font:      ${proposal.typography.bodyFont || "system default (Geist)"}`);
  console.log(`  Pairing:        ${proposal.typography.pairingName}`);
  console.log(`  Mood:           ${proposal.typography.mood}`);
  console.log("");

  console.log(`Radius:           ${proposal.radius}`);

  const sp = spacingValues(proposal.spacing);
  console.log(`Spacing:          ${proposal.spacing} (section: ${sp.section}, section-lg: ${sp.sectionLg})`);
  console.log(`Shadows:          ${proposal.shadows}`);
  console.log("");

  if (proposal.styleKeywords) {
    console.log(`Style keywords:   ${proposal.styleKeywords}`);
    console.log("");
  }

  console.log(line);
}

// =============================================================================
// Apply proposal
// =============================================================================
function applyProposal(proposal: DesignProposal): void {
  console.log("");
  console.log("⚙️  Applying tokens...");

  // --- 1. Update globals.css colors (light mode) ---
  let css = fs.readFileSync(GLOBALS_CSS, "utf-8");

  const lightReplacements: [RegExp, string][] = [
    [/--primary: oklch\([^)]+\);/, `--primary: ${hexToOklch(proposal.colors.primary)};`],
    [/--primary-foreground: oklch\([^)]+\);/, `--primary-foreground: ${hexToOklch(isLight(proposal.colors.primary) ? "#0a0a0a" : "#fafafa")};`],
    [/--destructive: oklch\([^)]+\);(\s*\/\*[^*]*\*\/)?/, `--destructive: ${hexToOklch(proposal.colors.destructive)};`],
    [/--cta: oklch\([^)]+\);/, `--cta: ${hexToOklch(proposal.colors.cta)};`],
    [/--radius: [^;]+;/, `--radius: ${proposal.radius};`],
  ];

  // Background & foreground
  if (proposal.colors.background !== "#ffffff") {
    lightReplacements.push(
      [/(--background: )oklch\([^)]+\);/, `$1${hexToOklch(proposal.colors.background)};`],
    );
  }
  if (proposal.colors.foreground !== "#0a0a0a") {
    lightReplacements.push(
      [/(--foreground: )oklch\([^)]+\);/, `$1${hexToOklch(proposal.colors.foreground)};`],
    );
  }

  // Apply light mode replacements (only in :root block)
  for (const [search, replace] of lightReplacements) {
    css = css.replace(search, replace);
  }

  // Spacing tokens
  const sp = spacingValues(proposal.spacing);
  css = css.replace(/--spacing-section: [^;]+;/, `--spacing-section: ${sp.section};`);
  css = css.replace(/--spacing-section-lg: [^;]+;/, `--spacing-section-lg: ${sp.sectionLg};`);

  // --- 1b. Update globals.css colors (dark mode) ---
  // Find .dark block and update CTA + destructive with brighter variants
  const darkCta = deriveDarkVariant(proposal.colors.cta, false);
  const darkDestructive = deriveDarkVariant(proposal.colors.destructive, false);

  // Replace within the .dark block only (after ".dark {")
  const darkBlockStart = css.indexOf(".dark {");
  if (darkBlockStart !== -1) {
    const darkBlockEnd = css.indexOf("}", css.indexOf("/* Custom tokens */", darkBlockStart));
    if (darkBlockEnd !== -1) {
      let darkBlock = css.slice(darkBlockStart, darkBlockEnd + 1);
      darkBlock = darkBlock.replace(/--cta: oklch\([^)]+\);/, `--cta: ${darkCta};`);
      darkBlock = darkBlock.replace(/--destructive: oklch\([^)]+\);/, `--destructive: ${darkDestructive};`);
      css = css.slice(0, darkBlockStart) + darkBlock + css.slice(darkBlockEnd + 1);
    }
  }

  fs.writeFileSync(GLOBALS_CSS, css, "utf-8");
  console.log("  ✅ Updated globals.css (colors light + dark, radius, spacing)");

  // --- 2. Update client.config.ts headingFont ---
  const headingFont = proposal.lockedFont ?? proposal.typography.headingFont;
  if (headingFont) {
    let configContent = fs.readFileSync(CLIENT_CONFIG, "utf-8");
    configContent = configContent.replace(
      /headingFont:\s*"[^"]*"/,
      `headingFont: "${headingFont}"`,
    );

    // Also update theme colors in client.config.ts
    configContent = configContent.replace(
      /primary:\s*"[^"]*"/,
      `primary: "${proposal.colors.primary}"`,
    );
    configContent = configContent.replace(
      /cta:\s*"[^"]*"/,
      `cta: "${proposal.colors.cta}"`,
    );

    fs.writeFileSync(CLIENT_CONFIG, configContent, "utf-8");
    console.log(`  ✅ Updated client.config.ts (headingFont: "${headingFont}", colors)`);
  }

  // --- 3. Record decisions in decisions.md ---
  const decisionsEntry = `
### Design Tokens — Generated from Brief
- **Rule:** All design tokens below were generated by \`pnpm design\` based on the client brief.
- **When:** Project kickoff — these are the baseline tokens to iterate from.
- **Style direction:** ${proposal.styleDirection}
- **Color palette:** primary ${proposal.colors.primary}, CTA ${proposal.colors.cta} — ${proposal.colors.notes}
- **Typography:** ${headingFont || "system default"} (heading) — ${proposal.typography.mood}
- **Radius:** ${proposal.radius} | **Spacing:** ${proposal.spacing} | **Shadows:** ${proposal.shadows}
- **Locked from client brand:** ${proposal.lockedFont ? `font: ${proposal.lockedFont}` : "none"}${proposal.lockedColors.length > 0 ? `, colors: ${proposal.lockedColors.join(", ")}` : ""}
- **Why added:** Auto-generated baseline from client brief + impeccable. Iterate from here.
`;

  let decisions = fs.readFileSync(DECISIONS_MD, "utf-8");
  // Remove previous generated entry if re-running
  decisions = decisions.replace(
    /\n### Design Tokens — Generated from Brief[\s\S]*?(?=\n### |\n$|$)/,
    "",
  );
  decisions = decisions.trimEnd() + "\n" + decisionsEntry;
  fs.writeFileSync(DECISIONS_MD, decisions, "utf-8");
  console.log("  ✅ Updated design-system/decisions.md");

  console.log("");
  console.log("📋 Next steps:");
  console.log("  pnpm setup          # Apply headingFont to layout.tsx");
  console.log("  pnpm dev            # Preview the result");
  console.log("");
}


function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

// =============================================================================
// Main
// =============================================================================
async function main() {
  console.log("");
  console.log("🎨 Design Token Generator");
  console.log("=".repeat(40));
  console.log("");

  // Step 1 — Parse brief
  const brief = parseBrief();

  if (!brief.industry && brief.brandPersonality.length === 0) {
    console.error("❌ Brief is mostly empty. Fill at least:");
    console.error("   - Industry");
    console.error("   - Brand Personality (3-5 adjectives)");
    console.error("   in design-system/client-brief.md");
    process.exit(1);
  }

  console.log(`📄 Brief parsed for: ${brief.clientName || "[not set]"}`);
  console.log(`   Industry: ${brief.industry || "[not set]"}`);
  console.log(`   Personality: ${brief.brandPersonality.join(", ") || "[not set]"}`);
  if (brief.lockedFont) {
    console.log(`   🔒 Locked font: ${brief.lockedFont}`);
  }
  if (brief.lockedColors.length > 0) {
    console.log(`   🔒 Locked colors: ${brief.lockedColors.join(", ")}`);
  }
  console.log("");

  // Step 2 — Build proposal
  const proposal = buildProposal(brief);

  // Step 3 — Display
  displayProposal(proposal, brief.clientName);

  // Step 4 — Ask for validation
  const answer = await prompt("Apply these tokens? [y/n] ");

  if (answer === "y" || answer === "yes" || answer === "o" || answer === "oui") {
    applyProposal(proposal);
  } else {
    console.log("");
    console.log("❌ Cancelled. No changes made.");
    console.log("   Adjust the brief and run pnpm design again.");
    console.log("");
  }
}

main().catch((err) => {
  console.error("❌ Design generation failed:", err);
  process.exit(1);
});
