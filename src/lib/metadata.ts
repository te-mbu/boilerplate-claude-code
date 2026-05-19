import type { Metadata } from "next";

const siteConfig = {
  name: "[CLIENT_NAME]",
  url: "https://example.com",
  description: "[CLIENT_NAME] — [tagline]",
  ogImage: "/og-default.jpg",
  locale: "fr_FR",
};

interface CreateMetadataOptions {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
  path?: string;
}

export function createMetadata({
  title,
  description,
  image,
  noIndex = false,
  path = "",
}: CreateMetadataOptions): Metadata {
  const ogImage = image ?? siteConfig.ogImage;
  const url = `${siteConfig.url}${path}`;

  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export { siteConfig };
