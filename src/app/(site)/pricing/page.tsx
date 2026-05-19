import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { PricingCards } from "@/components/sections/pricing";

export const metadata: Metadata = createMetadata({
  title: "Pricing",
  description: "Transparent pricing plans designed to fit businesses of every size.",
  path: "/pricing",
});

const plans = [
  {
    name: "Starter",
    price: "$990",
    period: "project",
    description: "Perfect for small businesses getting started online.",
    features: [
      "Custom landing page",
      "Mobile responsive design",
      "Basic SEO setup",
      "Contact form integration",
      "1 round of revisions",
    ],
    cta: { label: "Get started", href: "/contact" },
  },
  {
    name: "Professional",
    price: "$2,990",
    period: "project",
    description: "For growing businesses that need a full website.",
    features: [
      "Up to 10 pages",
      "CMS integration",
      "Advanced SEO optimization",
      "Analytics dashboard",
      "3 rounds of revisions",
      "30 days of support",
    ],
    cta: { label: "Get started", href: "/contact" },
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "project",
    description: "Tailored solutions for complex requirements.",
    features: [
      "Unlimited pages",
      "Custom integrations",
      "Performance optimization",
      "Priority support",
      "Dedicated project manager",
      "SLA guarantee",
    ],
    cta: { label: "Contact us", href: "/contact" },
  },
];

export default function PricingPage() {
  return (
    <main>
      <div className="px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Simple, transparent pricing. No hidden fees.
          </p>
        </div>
      </div>
      <PricingCards plans={plans} />
    </main>
  );
}
