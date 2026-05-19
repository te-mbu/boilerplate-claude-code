/**
 * Client Configuration
 * ====================
 * Fill this file, then run `pnpm setup` to apply it across the project.
 * You can re-run `pnpm setup` at any time after changing values.
 */

import type { ClientConfig } from "./scripts/setup-types";

const config: ClientConfig = {
  // --- Identity ---
  name: "[CLIENT_NAME]",
  slug: "client-slug",
  url: "https://example.com",
  tagline: "Your tagline here",

  // --- Locale & CMS ---
  locale: "fr", // "fr" | "en" | "fr+en"
  cms: "static", // "sanity" | "static"
  siteType: "marketing", // "landing" | "marketing" | "corporate" | "portfolio" | "saas" | "engine"

  // --- Theme ---
  theme: {
    // Brand colors (hex). Run `pnpm setup` to convert to OKLch automatically.
    primary: "#0a0a0a",
    cta: "#2563eb",
    success: "#16a34a",
    destructive: "#dc2626",
    radius: "0.625rem", // base border-radius — all others derive from this
  },

  // --- Pages to enable (unchecked pages will be deleted on setup) ---
  pages: {
    home: true,
    about: true,
    services: true,
    pricing: true,
    features: true,
    portfolio: true,
    team: true,
    blog: true,
    changelog: false,
    contact: true,
    legal: true, // privacy + terms + mentions-legales
    engine: false, // diagnostic + chatbot
  },

  // --- Features ---
  features: {
    darkMode: true,
    newsletter: true,
    cookieConsent: true,
    chatbot: false,
    diagnostic: false,
    i18n: false, // set to true if locale is "fr+en"
    analytics: true, // GTM
  },

  // --- Sanity (only if cms === "sanity") ---
  sanity: {
    projectId: "",
    dataset: "production",
  },

  // --- Webhooks (Make / n8n) ---
  webhooks: {
    contact: "",
    newsletter: "",
    diagnostic: "",
  },

  // --- Analytics ---
  gtmId: "",
};

export default config;
