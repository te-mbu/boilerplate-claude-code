import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { FeaturesGrid } from "@/components/sections/features";

export const metadata: Metadata = createMetadata({
  title: "Services",
  description: "Explore our services — from web design and development to strategy and optimization.",
  path: "/services",
});

const services = [
  {
    icon: "Globe",
    title: "Web Design & Development",
    description:
      "Custom websites built with modern technologies, optimized for performance and conversion.",
  },
  {
    icon: "Search",
    title: "SEO & Content Strategy",
    description:
      "Data-driven strategies to improve your visibility and attract the right audience.",
  },
  {
    icon: "BarChart3",
    title: "Analytics & Optimization",
    description:
      "Continuous improvement through data analysis, A/B testing, and conversion optimization.",
  },
  {
    icon: "Palette",
    title: "Brand Identity",
    description:
      "Cohesive visual identities that communicate your values and resonate with your audience.",
  },
  {
    icon: "Zap",
    title: "Automation & Integration",
    description:
      "Streamline your workflows with custom automations and third-party integrations.",
  },
  {
    icon: "HeadphonesIcon",
    title: "Ongoing Support",
    description:
      "Dedicated support and maintenance to keep your digital presence running smoothly.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <div className="px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Services
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            End-to-end solutions to build, grow, and optimize your digital presence.
          </p>
        </div>
      </div>
      <FeaturesGrid features={services} columns={3} />
    </main>
  );
}
