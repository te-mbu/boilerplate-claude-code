export interface ClientConfig {
  name: string;
  slug: string;
  url: string;
  tagline: string;

  headingFont: string;
  serifFont: string;
  locale: "fr" | "en" | "fr+en";
  cms: "sanity" | "static";
  siteType: "landing" | "marketing" | "corporate" | "portfolio" | "saas";

  theme: {
    primary: string;
    cta: string;
    success: string;
    destructive: string;
    radius: string;
  };

  pages: {
    home: boolean;
    about: boolean;
    services: boolean;
    pricing: boolean;
    features: boolean;
    portfolio: boolean;
    team: boolean;
    blog: boolean;
    changelog: boolean;
    contact: boolean;
    legal: boolean;
  };

  features: {
    darkMode: boolean;
    newsletter: boolean;
    cookieConsent: boolean;
    chatbot: boolean;
    diagnostic: boolean;
    smoothScroll: boolean;
    i18n: boolean;
    analytics: boolean;
  };

  sanity: {
    projectId: string;
    dataset: string;
  };

  webhooks: {
    contact: string;
    newsletter: string;
    diagnostic: string;
  };

  gtmId: string;
}
