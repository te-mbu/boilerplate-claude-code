import { siteConfig } from "./metadata";

interface OrganizationSchemaOptions {
  name?: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
}

export function organizationSchema(
  options: OrganizationSchemaOptions = {}
) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: options.name ?? siteConfig.name,
    url: options.url ?? siteConfig.url,
    logo: options.logo
      ? `${siteConfig.url}${options.logo}`
      : undefined,
    sameAs: options.sameAs ?? [],
  };
}

interface WebsiteSchemaOptions {
  name?: string;
  url?: string;
  searchUrl?: string;
}

export function websiteSchema(options: WebsiteSchemaOptions = {}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: options.name ?? siteConfig.name,
    url: options.url ?? siteConfig.url,
  };

  if (options.searchUrl) {
    schema.potentialAction = {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: options.searchUrl,
      },
      "query-input": "required name=search_term_string",
    };
  }

  return schema;
}

interface ArticleSchemaOptions {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  publisherName?: string;
  publisherLogo?: string;
}

export function articleSchema(options: ArticleSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.title,
    description: options.description,
    url: options.url,
    image: options.image,
    datePublished: options.datePublished,
    dateModified: options.dateModified ?? options.datePublished,
    author: {
      "@type": "Person",
      name: options.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: options.publisherName ?? siteConfig.name,
      logo: options.publisherLogo
        ? { "@type": "ImageObject", url: options.publisherLogo }
        : undefined,
    },
  };
}

interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
