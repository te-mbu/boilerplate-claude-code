import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { AnimateOnScroll } from "@/components/animations";

export const metadata: Metadata = createMetadata({
  title: "Pricing",
  description: "[TODO: Pricing page description]",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <AnimateOnScroll preset="fade-up">
            <h1 className="font-heading text-(length:--text-heading) font-bold tracking-tight text-foreground sm:text-4xl">
              [TODO: Pricing heading]
            </h1>
            <p className="mt-4 text-(length:--text-body-lg) text-muted-foreground">
              [TODO: Pricing subheading]
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      {/* [TODO: Compose with Card variants + Badge for "popular" + Button CTA] */}
      {/* Wrap with <StaggerChildren preset="scale-up"> for card reveal */}
      {/* See examples/sections/pricing/ for reference patterns */}

      {/* ── FAQ ── */}
      {/* [TODO: Add FAQ with Accordion component, wrap with <AnimateOnScroll>] */}
    </>
  );
}
