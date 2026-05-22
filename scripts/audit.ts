#!/usr/bin/env tsx
/**
 * Project Audit Script
 * ====================
 * Scans the codebase against the project's design system rules,
 * impeccable anti-patterns, and CLAUDE.md conventions.
 *
 * Usage: pnpm audit:project
 */

import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "src");

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Severity = "error" | "warning" | "info";

interface Violation {
  code: string;
  severity: Severity;
  file: string;
  line?: number;
  message: string;
}

const violations: Violation[] = [];
let codeCounter = { error: 0, warning: 0, info: 0 };

function addViolation(
  severity: Severity,
  file: string,
  message: string,
  line?: number,
) {
  codeCounter[severity]++;
  const prefix = severity === "error" ? "E" : severity === "warning" ? "W" : "I";
  const code = `${prefix}${String(codeCounter[severity]).padStart(3, "0")}`;
  violations.push({ code, severity, file: path.relative(ROOT, file), line, message });
}

// ---------------------------------------------------------------------------
// File scanning helpers
// ---------------------------------------------------------------------------
function walkFiles(dir: string, ext: string[]): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip node_modules, .next, examples
      if (["node_modules", ".next", "examples"].includes(entry.name)) continue;
      results.push(...walkFiles(full, ext));
    } else if (ext.some((e) => entry.name.endsWith(e))) {
      results.push(full);
    }
  }
  return results;
}

function scanLines(
  filePath: string,
  callback: (line: string, lineNum: number, allLines: string[]) => void,
) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  lines.forEach((line, i) => callback(line, i + 1, lines));
}

// ---------------------------------------------------------------------------
// Check: Design Tokens
// ---------------------------------------------------------------------------
// Hardcoded hex/rgb colors in className (not in CSS files, not in config)
const HARDCODED_COLOR_RE =
  /className=.*(?:bg|text|border|ring|shadow|from|to|via)-(?:#[0-9a-fA-F]{3,8}|(?:red|blue|green|yellow|purple|pink|orange|teal|cyan|indigo|violet|fuchsia|rose|emerald|lime|amber|sky|slate|gray|stone|zinc|neutral)-\d{2,3})/;

// Hardcoded section spacing (only on <section> elements, not inner components)
const HARDCODED_SECTION_SPACING_RE =
  /<section[^>]*className=[^>]*\bpy-(?:\d{2,}|\[\d+(?:px|rem)\])/;

// Raw h-screen
const H_SCREEN_RE = /className=.*\bh-screen\b/;

// Dark mode color literals
const DARK_LITERAL_RE = /className=.*dark:(?:bg|text|border)-(?:gray|slate|zinc|neutral|stone)-\d+/;

function checkDesignTokens(file: string) {
  scanLines(file, (line, num) => {
    // Skip comments and imports
    if (line.trim().startsWith("//") || line.trim().startsWith("*") || line.trim().startsWith("import")) return;

    if (HARDCODED_COLOR_RE.test(line)) {
      addViolation("error", file, `Hardcoded color in className — use CSS variable tokens`, num);
    }
    if (HARDCODED_SECTION_SPACING_RE.test(line)) {
      addViolation("error", file, `Hardcoded section spacing — use \`py-section\` or \`py-section-lg\``, num);
    }
    if (H_SCREEN_RE.test(line)) {
      addViolation("error", file, `\`h-screen\` detected — use \`min-h-dvh\` instead`, num);
    }
    if (DARK_LITERAL_RE.test(line)) {
      addViolation("error", file, `Dark mode color literal — use semantic tokens (bg-card, text-foreground)`, num);
    }
  });
}

// ---------------------------------------------------------------------------
// Check: Component Compliance
// ---------------------------------------------------------------------------
function checkComponentCompliance(file: string) {
  const content = fs.readFileSync(file, "utf-8");
  const lines = content.split("\n");
  const isPage = file.includes("/app/") && file.endsWith("page.tsx");

  // Raw <button> (not inside a component definition)
  if (!file.includes("/components/ui/")) {
    lines.forEach((line, i) => {
      if (/<button\b/.test(line) && !line.includes("data-action") && !line.includes("data-cell")) {
        addViolation("error", file, `Raw \`<button>\` — use \`Button\` component or \`buttonVariants()\``, i + 1);
      }
    });
  }

  // Raw <img>
  lines.forEach((line, i) => {
    if (/<img\b/.test(line) && !line.trim().startsWith("//") && !line.trim().startsWith("*")) {
      addViolation("error", file, `Raw \`<img>\` — use \`next/image\` with \`sizes\` prop`, i + 1);
    }
  });

  // next/image without sizes
  if (content.includes("<Image") && !content.includes("sizes=") && !file.includes("og-image")) {
    addViolation("warning", file, `\`next/image\` used without \`sizes\` prop`);
  }

  // Page without generateMetadata
  if (isPage && !content.includes("generateMetadata") && !content.includes("export const metadata")) {
    addViolation("error", file, `Page missing \`generateMetadata\` or \`metadata\` export`);
  }

  // asChild usage on Button (not supported on base-ui Button)
  // Allow asChild on other components like DrawerClose, DialogClose, etc.
  lines.forEach((line, i) => {
    if (/<Button[^>]*asChild/.test(line)) {
      addViolation("error", file, `\`asChild\` not supported on base-ui Button — use \`buttonVariants() + Link\``, i + 1);
    }
  });

  // Direct fetch in page components
  if (isPage && /\bfetch\(/.test(content) && !file.includes("/api/")) {
    addViolation("warning", file, `Direct \`fetch()\` in page — use content layer abstraction`);
  }
}

// ---------------------------------------------------------------------------
// Check: Taste Skill Anti-Patterns
// ---------------------------------------------------------------------------
const AI_CLICHES = [
  "elevate", "seamless", "unleash", "next-gen", "game-changer",
  "delve", "cutting-edge", "leverage", "synergy", "holistic",
];

const PLACEHOLDER_NAMES = [
  "John Doe", "Jane Smith", "Jane Doe", "John Smith", "Acme Corp",
  "Lorem ipsum",
];

function checkTasteAntiPatterns(file: string) {
  scanLines(file, (line, num) => {
    const trimmed = line.trim();
    // Skip comments and imports
    if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("import")) return;

    // Emoji in visible text (inside JSX)
    const emojiRe = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    if (emojiRe.test(line) && !line.includes("dangerouslySetInnerHTML") && !line.includes("console.")) {
      addViolation("error", file, `Emoji in code — remove per anti-emoji policy`, num);
    }

    // AI cliche words in visible text (not in comments, not in code identifiers)
    if (!trimmed.startsWith("{/*") && !trimmed.startsWith("/*") && !file.includes("/components/ui/")) {
      const lower = line.toLowerCase();
      for (const cliche of AI_CLICHES) {
        // Match word boundary to avoid false positives on variant names like "elevated"
        const re = new RegExp(`\\b${cliche}\\b`, "i");
        if (re.test(line) && !trimmed.startsWith("//") && !trimmed.startsWith("import")) {
          addViolation("warning", file, `AI cliche word: "${cliche}" — use concrete language`, num);
          break;
        }
      }
    }

    // Placeholder names
    for (const name of PLACEHOLDER_NAMES) {
      if (line.includes(name)) {
        addViolation("warning", file, `Placeholder name: "${name}" — use realistic names`, num);
        break;
      }
    }

    // Purple AI aesthetic
    if (/(?:text|bg|border|from|to)-(?:purple|violet|fuchsia)-\d+/.test(line)) {
      addViolation("warning", file, `Purple/violet color — AI aesthetic banned by impeccable design laws`, num);
    }
  });
}

// ---------------------------------------------------------------------------
// Check: Architecture
// ---------------------------------------------------------------------------
function checkArchitecture(file: string) {
  const content = fs.readFileSync(file, "utf-8");
  const lines = content.split("\n");
  const isPage = file.includes("/app/") && file.endsWith("page.tsx");
  const isLayout = file.includes("/app/") && file.endsWith("layout.tsx");

  // "use client" on pages/layouts
  if ((isPage || isLayout) && lines[0]?.trim() === '"use client"') {
    addViolation("error", file, `\`"use client"\` on a page/layout — extract interactivity to leaf components`);
  }

  // GSAP without cleanup in useEffect
  if (content.includes("gsap") && content.includes("useEffect")) {
    const useEffectBlocks = content.match(/useEffect\(\s*\(\)\s*=>\s*\{[\s\S]*?\n\s*\},/g) || [];
    for (const block of useEffectBlocks) {
      if (block.includes("gsap") && !block.includes("return") && !block.includes("cleanup")) {
        addViolation("warning", file, `GSAP in \`useEffect\` without cleanup — add return function to kill tweens`);
      }
    }
  }

  // Import from examples/
  lines.forEach((line, i) => {
    if (/from\s+["'].*examples\//.test(line)) {
      addViolation("error", file, `Import from \`examples/\` — compose from scratch, never import examples`, i + 1);
    }
  });

  // [TODO: placeholders
  lines.forEach((line, i) => {
    if (/\[TODO:/.test(line) && !line.trim().startsWith("//") && !line.trim().startsWith("*") && !line.trim().startsWith("{/*")) {
      addViolation("warning", file, `Unresolved \`[TODO:\` placeholder in visible content`, i + 1);
    }
  });

  // [CLIENT_NAME] remaining
  lines.forEach((line, i) => {
    if (/\[CLIENT_NAME\]/.test(line)) {
      addViolation("error", file, `\`[CLIENT_NAME]\` not replaced — run \`pnpm setup\``, i + 1);
    }
  });
}

// ---------------------------------------------------------------------------
// Check: Performance
// ---------------------------------------------------------------------------
const LAYOUT_ANIMATE_RE = /gsap\.(?:to|from|fromTo)\([^)]*(?:top|left|width|height)\s*:/;

function checkPerformance(file: string) {
  const content = fs.readFileSync(file, "utf-8");

  // Animate layout properties
  if (LAYOUT_ANIMATE_RE.test(content)) {
    addViolation("warning", file, `GSAP animates layout property (top/left/width/height) — use transform instead`);
  }

  // Arbitrary z-index
  const lines = content.split("\n");
  lines.forEach((line, i) => {
    if (/z-\[\d{3,}\]/.test(line)) {
      addViolation("info", file, `Arbitrary z-index — use semantic layer values`, i + 1);
    }
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  console.log("");
  console.log("=== PROJECT AUDIT ===");
  console.log("");

  const tsxFiles = walkFiles(SRC, [".tsx", ".ts"]);
  console.log(`Scanning ${tsxFiles.length} files...\n`);

  for (const file of tsxFiles) {
    // Skip non-component files
    if (file.endsWith(".d.ts") || file.includes("__tests__")) continue;

    const isTsx = file.endsWith(".tsx");
    const isComponent = isTsx && !file.includes("/lib/") || file.includes("/components/");

    if (isTsx) {
      checkDesignTokens(file);
      checkComponentCompliance(file);
      checkTasteAntiPatterns(file);
      checkArchitecture(file);
      checkPerformance(file);
    }
  }

  // Also scan design-system markdown files for [CLIENT_NAME]
  const dsDir = path.join(ROOT, "design-system");
  if (fs.existsSync(dsDir)) {
    const mdFiles = walkFiles(dsDir, [".md"]);
    for (const file of mdFiles) {
      scanLines(file, (line, num) => {
        if (/\[CLIENT_NAME\]/.test(line)) {
          addViolation("error", file, `\`[CLIENT_NAME]\` not replaced — run \`pnpm setup\``, num);
        }
      });
    }
  }

  // --- Output ---
  const errors = violations.filter((v) => v.severity === "error");
  const warnings = violations.filter((v) => v.severity === "warning");
  const infos = violations.filter((v) => v.severity === "info");

  if (errors.length > 0) {
    console.log("ERRORS (must fix):");
    for (const v of errors) {
      const loc = v.line ? `:${v.line}` : "";
      console.log(`  [${v.code}] ${v.file}${loc} — ${v.message}`);
    }
    console.log("");
  }

  if (warnings.length > 0) {
    console.log("WARNINGS (should fix):");
    for (const v of warnings) {
      const loc = v.line ? `:${v.line}` : "";
      console.log(`  [${v.code}] ${v.file}${loc} — ${v.message}`);
    }
    console.log("");
  }

  if (infos.length > 0) {
    console.log("INFO (review manually):");
    for (const v of infos) {
      const loc = v.line ? `:${v.line}` : "";
      console.log(`  [${v.code}] ${v.file}${loc} — ${v.message}`);
    }
    console.log("");
  }

  // Score
  const score = Math.max(0, 100 - errors.length * 5 - warnings.length * 2);
  const verdict =
    score >= 95 ? "Ready to ship"
    : score >= 80 ? "Good — fix errors before launch"
    : score >= 60 ? "Needs work — multiple violations"
    : "Major issues — review design system compliance";

  console.log("---");
  console.log(`Summary: ${errors.length} errors, ${warnings.length} warnings, ${infos.length} info`);
  console.log(`Score: ${score}/100 — ${verdict}`);
  console.log("");

  // Exit code 1 if errors found
  if (errors.length > 0) {
    process.exit(1);
  }
}

main();
