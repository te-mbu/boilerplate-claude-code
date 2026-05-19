import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/engine/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
