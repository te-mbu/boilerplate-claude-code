import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { FeaturesAlternating } from "@/components/sections/features";

export const metadata: Metadata = createMetadata({
  title: "Features",
  description: "Discover the features and capabilities that set us apart.",
  path: "/features",
});

const features = [
  {
    title: "Lightning-Fast Performance",
    description:
      "Every site we build is optimized for speed. From lazy-loaded images to edge caching, your visitors get a seamless experience on any device.",
    image: { src: "/images/placeholder-1.jpg", alt: "Performance dashboard" },
    bullets: [
      "Core Web Vitals optimized",
      "Edge-cached globally",
      "Sub-second load times",
    ],
  },
  {
    title: "Built for Growth",
    description:
      "Our architecture scales with your business. Add pages, products, or entire sections without rebuilding from scratch.",
    image: { src: "/images/placeholder-2.jpg", alt: "Scalable architecture" },
    bullets: [
      "Modular component system",
      "CMS-driven content",
      "API-first integrations",
    ],
  },
  {
    title: "SEO That Delivers",
    description:
      "Structured data, semantic HTML, and automated sitemaps — your site is discoverable from day one.",
    image: { src: "/images/placeholder-3.jpg", alt: "SEO analytics" },
    bullets: [
      "Schema markup built-in",
      "Automated meta tags",
      "Performance-first indexing",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <main>
      <div className="px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Features
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to build a high-performing digital presence.
          </p>
        </div>
      </div>
      <FeaturesAlternating features={features} />
    </main>
  );
}
