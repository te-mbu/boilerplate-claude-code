import type { Metadata } from "next";
import { createMetadata, siteConfig } from "@/lib/metadata";
import { HeroCentered } from "@/components/sections/hero";
import { LogoCloud } from "@/components/sections/social-proof";
import { FeaturesGrid } from "@/components/sections/features";
import { TestimonialsGrid } from "@/components/sections/social-proof";
import { CtaCentered } from "@/components/sections/cta";

export const metadata: Metadata = createMetadata({
  title: `${siteConfig.name} — ${siteConfig.description}`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <main>
      <HeroCentered
        heading="[TODO: Main value proposition]"
        subheading="[TODO: Supporting statement — what you do, who it's for, why it matters]"
        primaryCta={{ label: "[TODO: Primary CTA]", href: "/contact" }}
        secondaryCta={{ label: "[TODO: Secondary CTA]", href: "/services" }}
      />

      <LogoCloud
        heading="[TODO: Trusted by industry leaders]"
        logos={[
          // TODO: Add client/partner logos
          // { src: "/logos/company.svg", alt: "Company Name" },
        ]}
      />

      <FeaturesGrid
        heading="[TODO: Why choose us]"
        subheading="[TODO: Brief intro to your key differentiators]"
        features={[
          // TODO: Replace with real features/services
          { icon: "Zap", title: "[Feature 1]", description: "[TODO: Description]" },
          { icon: "Shield", title: "[Feature 2]", description: "[TODO: Description]" },
          { icon: "BarChart3", title: "[Feature 3]", description: "[TODO: Description]" },
        ]}
        columns={3}
      />

      <TestimonialsGrid
        heading="What Our Clients Say"
        testimonials={[
          // TODO: Replace with real testimonials or fetch from content provider
          // { name: "Client Name", role: "CEO", company: "Company", quote: "...", featured: true },
        ]}
      />

      <CtaCentered
        heading="[TODO: Ready to get started?]"
        description="[TODO: Short persuasive closing statement]"
        primaryCta={{ label: "[TODO: Get started]", href: "/contact" }}
        secondaryCta={{ label: "[TODO: Learn more]", href: "/about" }}
        variant="gradient"
      />
    </main>
  );
}
