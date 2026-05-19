#!/usr/bin/env tsx
/**
 * Project Setup Script
 * ====================
 * Reads client.config.ts and applies it across the project:
 * - Replaces placeholders in metadata, CLAUDE.md, package.json
 * - Updates .env.local
 * - Removes disabled pages
 * - Updates theme tokens in globals.css
 *
 * Usage: pnpm setup
 * Re-runnable: yes (idempotent)
 */

import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");

// --- Load config ---
async function loadConfig() {
  const configPath = path.join(ROOT, "client.config.ts");
  if (!fs.existsSync(configPath)) {
    console.error("❌ client.config.ts not found. Copy the template first.");
    process.exit(1);
  }
  const mod = await import(configPath);
  return mod.default;
}

// --- Hex to OKLch (approximate conversion) ---
function hexToOklch(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  // sRGB to linear
  const toLinear = (c: number) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const lr = toLinear(r);
  const lg = toLinear(g);
  const lb = toLinear(b);

  // Linear sRGB to OKLAB
  const l_ = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m_ = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s_ = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const l_cbrt = Math.cbrt(l_);
  const m_cbrt = Math.cbrt(m_);
  const s_cbrt = Math.cbrt(s_);

  const L = 0.2104542553 * l_cbrt + 0.793617785 * m_cbrt - 0.0040720468 * s_cbrt;
  const a = 1.9779984951 * l_cbrt - 2.428592205 * m_cbrt + 0.4505937099 * s_cbrt;
  const bOk = 0.0259040371 * l_cbrt + 0.7827717662 * m_cbrt - 0.808675766 * s_cbrt;

  const C = Math.sqrt(a * a + bOk * bOk);
  let h = (Math.atan2(bOk, a) * 180) / Math.PI;
  if (h < 0) h += 360;

  const Lr = Math.round(L * 1000) / 1000;
  const Cr = Math.round(C * 1000) / 1000;
  const hr = Math.round(h * 1000) / 1000;

  if (Cr < 0.002) return `oklch(${Lr} 0 0)`;
  return `oklch(${Lr} ${Cr} ${hr})`;
}

// --- File helpers ---
function readFile(relativePath: string): string {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf-8");
}

function writeFile(relativePath: string, content: string): void {
  fs.writeFileSync(path.join(ROOT, relativePath), content, "utf-8");
}

function fileExists(relativePath: string): boolean {
  return fs.existsSync(path.join(ROOT, relativePath));
}

function removeDir(relativePath: string): void {
  const full = path.join(ROOT, relativePath);
  if (fs.existsSync(full)) {
    fs.rmSync(full, { recursive: true });
    console.log(`  🗑️  Removed ${relativePath}`);
  }
}

function replaceInFile(relativePath: string, replacements: [string | RegExp, string][]): void {
  if (!fileExists(relativePath)) return;
  let content = readFile(relativePath);
  for (const [search, replace] of replacements) {
    if (typeof search === "string") {
      content = content.split(search).join(replace);
    } else {
      content = content.replace(search, replace);
    }
  }
  writeFile(relativePath, content);
}

// =============================================================================
// Main
// =============================================================================
async function main() {
  const config = await loadConfig();

  console.log("");
  console.log(`🏗️  Setting up project: ${config.name}`);
  console.log(`   Slug: ${config.slug}`);
  console.log(`   URL: ${config.url}`);
  console.log(`   Locale: ${config.locale}`);
  console.log(`   CMS: ${config.cms}`);
  console.log(`   Site type: ${config.siteType}`);
  console.log("");

  // --- 1. Update metadata.ts ---
  console.log("📝 Updating metadata...");
  replaceInFile("src/lib/metadata.ts", [
    ['"[CLIENT_NAME]"', `"${config.name}"`],
    [`"[CLIENT_NAME]"`, `"${config.name}"`],
    ['"https://example.com"', `"${config.url}"`],
    [`"https://example.com"`, `"${config.url}"`],
    ['"[CLIENT_NAME] — [tagline]"', `"${config.name} — ${config.tagline}"`],
    [`"[CLIENT_NAME] — [tagline]"`, `"${config.name} — ${config.tagline}"`],
    [/locale: "fr_FR"/, `locale: "${config.locale === "en" ? "en_US" : "fr_FR"}"`],
  ]);

  // --- 1b. Update layout components ---
  console.log("🧩 Updating layout components...");
  replaceInFile("src/components/layout/navbar.tsx", [
    ['"[CLIENT_NAME]"', `"${config.name}"`],
    [`"[CLIENT_NAME]"`, `"${config.name}"`],
  ]);
  replaceInFile("src/components/layout/footer.tsx", [
    ['"[CLIENT_NAME]"', `"${config.name}"`],
    [`"[CLIENT_NAME]"`, `"${config.name}"`],
  ]);

  // --- 2. Update package.json ---
  console.log("📦 Updating package.json...");
  replaceInFile("package.json", [
    ["terence-nextjs-boilerplate", config.slug],
  ]);

  // --- 3. Update CLAUDE.md ---
  console.log("📋 Updating CLAUDE.md...");
  replaceInFile("CLAUDE.md", [
    ["[CLIENT_NAME]", config.name],
    [/## Site Type:.*/, `## Site Type: ${config.siteType}`],
    [/## Locale:.*/, `## Locale: ${config.locale}`],
    [/## CMS:.*/, `## CMS: ${config.cms}`],
  ]);

  // --- 4. Setup .env.local ---
  console.log("🔐 Setting up .env.local...");
  const envContent = [
    `# Content Provider`,
    `CONTENT_PROVIDER=${config.cms}`,
    ``,
    `# Site`,
    `NEXT_PUBLIC_SITE_URL=${config.url}`,
    `NEXT_PUBLIC_SITE_NAME="${config.name}"`,
    ``,
    `# Sanity (only if CONTENT_PROVIDER=sanity)`,
    `NEXT_PUBLIC_SANITY_PROJECT_ID=${config.sanity.projectId}`,
    `NEXT_PUBLIC_SANITY_DATASET=${config.sanity.dataset}`,
    `SANITY_API_TOKEN=`,
    ``,
    `# Webhooks (Make/n8n)`,
    `WEBHOOK_CONTACT=${config.webhooks.contact}`,
    `WEBHOOK_DIAGNOSTIC=${config.webhooks.diagnostic}`,
    `WEBHOOK_NEWSLETTER=${config.webhooks.newsletter}`,
    ``,
    `# Analytics`,
    `NEXT_PUBLIC_GTM_ID=${config.gtmId}`,
    ``,
    `# i18n`,
    `NEXT_PUBLIC_DEFAULT_LOCALE=${config.locale === "en" ? "en" : "fr"}`,
  ].join("\n") + "\n";
  writeFile(".env.local", envContent);

  // --- 5. Remove disabled pages ---
  console.log("📄 Cleaning up disabled pages...");
  const pageMap: Record<string, string[]> = {
    about: ["src/app/(site)/about"],
    services: ["src/app/(site)/services"],
    pricing: ["src/app/(site)/pricing"],
    features: ["src/app/(site)/features"],
    portfolio: ["src/app/(site)/portfolio"],
    team: ["src/app/(site)/team"],
    blog: ["src/app/(site)/blog"],
    changelog: ["src/app/(site)/changelog"],
    contact: ["src/app/(site)/contact"],
    legal: [
      "src/app/(site)/legal",
    ],
    engine: [
      "src/app/(site)/engine",
      "src/components/engine",
    ],
  };

  for (const [page, dirs] of Object.entries(pageMap)) {
    if (!config.pages[page as keyof typeof config.pages]) {
      for (const dir of dirs) {
        removeDir(dir);
      }
    }
  }

  // --- 6. Update theme tokens in globals.css ---
  console.log("🎨 Updating theme tokens...");
  if (config.theme) {
    const replacements: [RegExp, string][] = [];

    if (config.theme.primary) {
      const oklch = hexToOklch(config.theme.primary);
      replacements.push([/--primary: oklch\([^)]+\);/, `--primary: ${oklch};`]);
    }
    if (config.theme.cta) {
      const oklch = hexToOklch(config.theme.cta);
      replacements.push([/--cta: oklch\([^)]+\);/, `--cta: ${oklch};`]);
    }
    if (config.theme.success) {
      const oklch = hexToOklch(config.theme.success);
      replacements.push([/--success: oklch\([^)]+\);/, `--success: ${oklch};`]);
    }
    if (config.theme.destructive) {
      const oklch = hexToOklch(config.theme.destructive);
      replacements.push([/--destructive: oklch\([^)]+\);/, `--destructive: ${oklch};`]);
    }
    if (config.theme.radius) {
      replacements.push([/--radius: [^;]+;/, `--radius: ${config.theme.radius};`]);
    }

    if (replacements.length > 0) {
      replaceInFile("src/app/globals.css", replacements);
    }
  }

  // --- 7. Update sitemap with enabled pages only ---
  console.log("🗺️  Updating sitemap...");
  // Sitemap reads from content provider, static pages are hardcoded — we leave them
  // as the developer can adjust. The disabled page directories are already removed.

  console.log("");
  console.log("✅ Setup complete!");
  console.log("");
  console.log("Next steps:");
  console.log("  pnpm dev                    # Start dev server");
  console.log("  pnpm build                  # Verify build");
  if (config.cms === "sanity") {
    console.log("  # Add SANITY_API_TOKEN to .env.local");
  }
  console.log("");
  console.log("To re-run after changing client.config.ts:");
  console.log("  pnpm setup");
  console.log("");
}

main().catch((err) => {
  console.error("❌ Setup failed:", err);
  process.exit(1);
});
