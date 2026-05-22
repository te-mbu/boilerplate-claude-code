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

// --- Color conversion (shared) ---
import { hexToOklch } from "./utils/color.js";

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
// Home page — blank canvas, composed from scratch per client
// =============================================================================
function generateHomePage(): string {
  return `import type { Metadata } from "next";
import { createMetadata, siteConfig } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: \`\${siteConfig.name} — \${siteConfig.description}\`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* Page blanche — compose each section from scratch using impeccable design laws + shadcn/ui primitives. */}
      {/* Run /impeccable teach to set up PRODUCT.md, then read design-system/client-brief.md before building. */}
    </>
  );
}
`;
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

  // --- 1. Update metadata.ts (regex-based for idempotent re-runs) ---
  console.log("📝 Updating metadata...");
  replaceInFile("src/lib/metadata.ts", [
    [/name: "[^"]*"/, `name: "${config.name}"`],
    [/url: "[^"]*"/, `url: "${config.url}"`],
    [/description: "[^"]*"/, `description: "${config.name} — ${config.tagline}"`],
    [/locale: "[^"]*"/, `locale: "${config.locale === "en" ? "en_US" : "fr_FR"}"`],
  ]);

  // --- 1b. Update layout components (regex for idempotent re-runs) ---
  console.log("🧩 Updating layout components...");
  const brandNameRegex: [RegExp, string] = [/brandName = "[^"]*"/, `brandName = "${config.name}"`];
  replaceInFile("src/components/layout/navbar.tsx", [brandNameRegex]);
  for (const footerFile of [
    "src/components/layout/footer.tsx",
    "src/components/layout/footer-marketing.tsx",
    "src/components/layout/footer-minimal.tsx",
  ]) {
    replaceInFile(footerFile, [brandNameRegex]);
  }

  // --- 1c. Update html lang attribute ---
  const htmlLang = config.locale === "en" ? "en" : "fr";
  console.log(`🌐 Setting html lang="${htmlLang}"...`);
  replaceInFile("src/app/layout.tsx", [
    [/lang="[a-z]{2}"/, `lang="${htmlLang}"`],
  ]);

  // --- 2. Update package.json ---
  console.log("📦 Updating package.json...");
  replaceInFile("package.json", [
    [/"name": "[^"]*"/, `"name": "${config.slug}"`],
  ]);

  // --- 3. Update CLAUDE.md (regex for idempotent re-runs) ---
  console.log("📋 Updating CLAUDE.md...");
  replaceInFile("CLAUDE.md", [
    [/^# .+ — Project CLAUDE\.md/m, `# ${config.name} — Project CLAUDE.md`],
    [/You are building a website for .+\. Read/, `You are building a website for ${config.name}. Read`],
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

  // --- 5. Remove disabled pages + clean template pages ---
  // All pages except home are created on demand (page blanche philosophy).
  // Disabled pages are deleted entirely. Enabled pages with TODO content are also
  // deleted — they'll be composed from scratch when the dev is ready.
  console.log("📄 Cleaning up pages...");
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
  };

  for (const [page, dirs] of Object.entries(pageMap)) {
    if (!config.pages[page as keyof typeof config.pages]) {
      // Page disabled — remove entirely
      for (const dir of dirs) {
        removeDir(dir);
      }
    } else {
      // Page enabled — remove template TODO content so it's built from scratch
      for (const dir of dirs) {
        const pagePath = path.join(dir, "page.tsx");
        if (fileExists(pagePath)) {
          const content = readFile(pagePath);
          if (content.includes("[TODO:")) {
            // Remove silently (removeDir logs its own message), then add context
            const full = path.join(ROOT, dir);
            if (fs.existsSync(full)) {
              fs.rmSync(full, { recursive: true });
            }
            console.log(`  🧹 Cleaned ${dir} (template — will be composed from scratch)`);
          }
        }
      }
    }
  }

  // --- 5a. Update navbar links — remove disabled pages ---
  console.log("🧭 Updating navbar links...");
  const navPageHrefMap: Record<string, string> = {
    services: "/services",
    portfolio: "/portfolio",
    blog: "/blog",
    about: "/about",
  };

  if (fileExists("src/components/layout/navbar.tsx")) {
    let navContent = readFile("src/components/layout/navbar.tsx");
    for (const [page, href] of Object.entries(navPageHrefMap)) {
      if (!config.pages[page as keyof typeof config.pages]) {
        // Remove the NavItem line for this page
        const lineRegex = new RegExp(`\\s*\\{[^}]*href:\\s*"${href.replace("/", "\\/")}"[^}]*\\},?\\n`, "g");
        navContent = navContent.replace(lineRegex, "");
        console.log(`  🗑️  Removed ${href} from navbar`);
      }
    }
    writeFile("src/components/layout/navbar.tsx", navContent);
  }

  // --- 5c. Update footer links — remove disabled pages ---
  console.log("🦶 Updating footer links...");
  const footerHrefs: Record<string, string[]> = {
    services: ["/services"],
    portfolio: ["/portfolio"],
    pricing: ["/pricing"],
    features: ["/features"],
    about: ["/about"],
    team: ["/team"],
    blog: ["/blog"],
    contact: ["/contact"],
    changelog: ["/changelog"],
  };

  const footerFiles = [
    "src/components/layout/footer.tsx",
    "src/components/layout/footer-marketing.tsx",
    "src/components/layout/footer-minimal.tsx",
  ];
  for (const footerFile of footerFiles) {
    if (fileExists(footerFile)) {
      let footerContent = readFile(footerFile);
      for (const [page, hrefs] of Object.entries(footerHrefs)) {
        if (!config.pages[page as keyof typeof config.pages]) {
          for (const href of hrefs) {
            const lineRegex = new RegExp(`\\s*\\{[^}]*href:\\s*"${href.replace("/", "\\/")}"[^}]*\\},?\\n`, "g");
            footerContent = footerContent.replace(lineRegex, "");
            if (footerFile === "src/components/layout/footer.tsx") {
              console.log(`  🗑️  Removed ${href} from footer`);
            }
          }
        }
      }
      writeFile(footerFile, footerContent);
    }
  }

  // --- 5d. Toggle SearchAction structured data based on blog ---
  if (fileExists("src/app/(site)/layout.tsx")) {
    if (config.pages.blog) {
      console.log("🔍 Enabling SearchAction structured data for blog...");
      replaceInFile("src/app/(site)/layout.tsx", [
        [
          "websiteSchema()",
          "websiteSchema({ searchUrl: `${siteConfig.url}/blog?q={search_term_string}` })",
        ],
      ]);
    } else {
      console.log("🔍 Removing SearchAction structured data (blog disabled)...");
      replaceInFile("src/app/(site)/layout.tsx", [
        [
          /websiteSchema\(\{[^}]*\}\)/,
          "websiteSchema()",
        ],
      ]);
    }
  }

  // --- 5e. Disable smooth scroll if not wanted ---
  if (!config.features?.smoothScroll) {
    console.log("🎢 Disabling smooth scroll (Lenis)...");
    if (fileExists("src/app/layout.tsx")) {
      let layoutContent = readFile("src/app/layout.tsx");
      // Remove LenisProvider import
      layoutContent = layoutContent.replace(/import\s*\{[^}]*LenisProvider[^}]*\}\s*from\s*"[^"]*";\n?/g, "");
      // Unwrap LenisProvider from children
      layoutContent = layoutContent.replace(/<LenisProvider>\{children\}<\/LenisProvider>/g, "{children}");
      writeFile("src/app/layout.tsx", layoutContent);
    }
    // Remove lenis CSS import
    if (fileExists("src/app/globals.css")) {
      let cssContent = readFile("src/app/globals.css");
      cssContent = cssContent.replace(/@import "lenis\/dist\/lenis\.css";\n?/g, "");
      writeFile("src/app/globals.css", cssContent);
    }
  }

  // --- 6. Global [CLIENT_NAME] replacement in markdown files ---
  console.log("📝 Replacing [CLIENT_NAME] in markdown files...");
  const markdownGlob = [
    "design-system/client-brief.md",
    "design-system/tokens.md",
    "design-system/components.md",
    "design-system/patterns.md",
    "design-system/principles.md",
    "design-system/accessibility.md",
    "design-system/motion.md",
    "design-system/decisions.md",
    "design-system/checklist.md",
    "README.md",
  ];
  for (const mdFile of markdownGlob) {
    if (fileExists(mdFile)) {
      replaceInFile(mdFile, [["[CLIENT_NAME]", config.name]]);
    }
  }

  // --- 6b. Enable middleware for i18n when needed ---
  if (config.features?.i18n && config.locale === "fr+en") {
    console.log("🌐 Enabling next-intl middleware...");
    const middlewareContent = [
      `import createMiddleware from "next-intl/middleware";`,
      `import { routing } from "@/lib/i18n/navigation";`,
      ``,
      `export default createMiddleware(routing);`,
      ``,
      `export const config = {`,
      `  matcher: ["/((?!api|_next|_vercel|.*\\\\..*).*)"],`,
      `};`,
      ``,
    ].join("\n");
    writeFile("middleware.ts", middlewareContent);
  }

  // --- 6c. Delete root src/app/page.tsx if it exists (conflicts with route group) ---
  const rootPage = path.join(ROOT, "src/app/page.tsx");
  if (fs.existsSync(rootPage)) {
    fs.unlinkSync(rootPage);
    console.log("  🗑️  Removed src/app/page.tsx (conflicts with (site) route group)");
  }

  // --- 7. Update theme tokens in globals.css ---
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

  // --- 7b. Configure heading font ---
  if (config.headingFont && fileExists("src/app/layout.tsx")) {
    console.log(`🔤 Configuring heading font: ${config.headingFont}...`);

    // Convert font name to next/font/google import name (e.g. "Playfair Display" → "Playfair_Display")
    const fontImportName = config.headingFont.replace(/\s+/g, "_");
    const fontVarName = `--font-heading-google`;

    let layoutContent = readFile("src/app/layout.tsx");

    // Add font import if not already present
    if (!layoutContent.includes(fontImportName)) {
      // Add import alongside existing Google font imports
      layoutContent = layoutContent.replace(
        /import { Geist, Geist_Mono } from "next\/font\/google";/,
        `import { Geist, Geist_Mono, ${fontImportName} } from "next/font/google";`
      );

      // Add font instance after existing font declarations
      layoutContent = layoutContent.replace(
        /const geistMono = Geist_Mono\(\{[^}]+\}\);/,
        `$&\n\nconst headingFont = ${fontImportName}({\n  variable: "${fontVarName}",\n  subsets: ["latin"],\n});`
      );

      // Add font variable to html className
      layoutContent = layoutContent.replace(
        /\$\{geistSans\.variable\} \$\{geistMono\.variable\}/,
        `\${geistSans.variable} \${geistMono.variable} \${headingFont.variable}`
      );
    }

    writeFile("src/app/layout.tsx", layoutContent);

    // Update globals.css to use the heading font variable
    replaceInFile("src/app/globals.css", [
      [/--font-heading: var\([^)]+\);/, `--font-heading: var(${fontVarName});`],
    ]);
  }

  // --- 7b2. Configure serif font ---
  if (config.serifFont && fileExists("src/app/layout.tsx")) {
    console.log(`🔤 Configuring serif font: ${config.serifFont}...`);

    const fontImportName = config.serifFont.replace(/\s+/g, "_");
    const fontVarName = `--font-serif-google`;

    let layoutContent = readFile("src/app/layout.tsx");

    if (!layoutContent.includes(fontImportName)) {
      // Add import
      const importRegex = /import { ([^}]+) } from "next\/font\/google";/;
      const match = layoutContent.match(importRegex);
      if (match) {
        layoutContent = layoutContent.replace(
          importRegex,
          `import { ${match[1]}, ${fontImportName} } from "next/font/google";`
        );
      }

      // Add font instance after last font declaration
      const lastFontDecl = layoutContent.match(/const \w+ = \w+\(\{[^}]+\}\);(?![\s\S]*const \w+ = \w+\(\{)/);
      if (lastFontDecl) {
        layoutContent = layoutContent.replace(
          lastFontDecl[0],
          `${lastFontDecl[0]}\n\nconst serifFont = ${fontImportName}({\n  variable: "${fontVarName}",\n  subsets: ["latin"],\n});`
        );
      }

      // Add font variable to html className
      const classNameMatch = layoutContent.match(/\$\{geistSans\.variable\} \$\{geistMono\.variable\}([^`]*)/);
      if (classNameMatch) {
        const existing = classNameMatch[0];
        if (!existing.includes("serifFont")) {
          layoutContent = layoutContent.replace(
            /(\$\{geistMono\.variable\})/,
            `$1 \${serifFont.variable}`
          );
        }
      }
    }

    writeFile("src/app/layout.tsx", layoutContent);

    replaceInFile("src/app/globals.css", [
      [/--font-serif: var\([^)]+\);/, `--font-serif: var(${fontVarName});`],
    ]);
  }

  // --- 7c. Update sitemap with enabled pages only ---
  console.log("🗺️  Updating sitemap...");
  if (fileExists("src/app/sitemap.ts")) {
    const sitemapHrefs: Record<string, string[]> = {
      about: ["/about"],
      services: ["/services"],
      pricing: ["/pricing"],
      features: ["/features"],
      portfolio: ["/portfolio"],
      team: ["/team"],
      contact: ["/contact"],
      blog: ["/blog"],
      changelog: ["/changelog"],
    };

    let sitemapContent = readFile("src/app/sitemap.ts");
    for (const [page, hrefs] of Object.entries(sitemapHrefs)) {
      if (!config.pages[page as keyof typeof config.pages]) {
        for (const href of hrefs) {
          // Remove the full sitemap entry line for this path
          const lineRegex = new RegExp(
            `\\s*\\{[^}]*\\/\\$\\{baseUrl\\}${href.replace("/", "\\/")}[^}]*\\},?\\n`,
            "g",
          );
          const oldLen = sitemapContent.length;
          sitemapContent = sitemapContent.replace(lineRegex, "");
          // Fallback: match simpler pattern with template literal
          if (sitemapContent.length === oldLen) {
            const simpleRegex = new RegExp(
              `\\s*\\{[^}]*\\$\\{baseUrl\\}${href.replace("/", "\\/")}["\`'][^}]*\\},?\\n`,
              "g",
            );
            sitemapContent = sitemapContent.replace(simpleRegex, "");
          }
        }
        console.log(`  🗑️  Removed /${page} from sitemap`);
      }
    }

    // Also remove dynamic blog/project sections if those pages are disabled
    if (!config.pages.blog) {
      sitemapContent = sitemapContent.replace(
        /\n\s*\/\/ Dynamic blog posts[\s\S]*?(?=\n\s*\/\/ Dynamic projects|\n\s*\/\/ Dynamic blog categories|\n\s*return)/,
        "\n",
      );
      sitemapContent = sitemapContent.replace(
        /\n\s*\/\/ Dynamic blog categories[\s\S]*?(?=\n\s*\/\/ Dynamic projects|\n\s*return)/,
        "\n",
      );
      // Remove blogPages and categoryPages from the return
      sitemapContent = sitemapContent.replace(/, \.\.\.blogPages/g, "");
      sitemapContent = sitemapContent.replace(/, \.\.\.categoryPages/g, "");
    }
    if (!config.pages.portfolio) {
      sitemapContent = sitemapContent.replace(
        /\n\s*\/\/ Dynamic projects[\s\S]*?(?=\n\s*return)/,
        "\n",
      );
      sitemapContent = sitemapContent.replace(/, \.\.\.projectPages/g, "");
    }

    writeFile("src/app/sitemap.ts", sitemapContent);
  }

  // --- 8. Install Sanity deps if needed ---
  if (config.cms === "sanity") {
    console.log("📦 Sanity CMS selected — installing dependencies...");
    console.log("  Run: pnpm add @sanity/client @sanity/image-url");
    console.log("  Then uncomment the real implementations in:");
    console.log("    src/lib/sanity/client.ts");
    console.log("    src/lib/sanity/image.ts");
  }

  // --- 9. Generate blank home page ---
  console.log("🏠 Generating home page...");
  const homePage = generateHomePage();
  writeFile("src/app/(site)/page.tsx", homePage);

  console.log("");
  console.log("✅ Setup complete!");
  console.log("");
  console.log("Next steps:");
  console.log("  1. Fill design-system/client-brief.md with brand context");
  console.log("  2. Run /impeccable teach     # Creates PRODUCT.md + DESIGN.md");
  console.log("  3. pnpm design               # Generate baseline tokens from brief");
  console.log("  4. pnpm dev                  # Start dev server");
  console.log("  5. Start building page by page with /impeccable craft");
  if (config.cms === "sanity") {
    console.log("");
    console.log("  Sanity CMS:");
    console.log("    pnpm add @sanity/client @sanity/image-url");
    console.log("    Add SANITY_API_TOKEN to .env.local");
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
