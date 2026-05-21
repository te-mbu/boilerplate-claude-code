import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { AnimateOnScroll } from "@/components/animations";

export const metadata: Metadata = createMetadata({
  title: "Features",
  description: "[TODO: Features page description]",
  path: "/features",
});

export default function FeaturesPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <AnimateOnScroll preset="fade-up">
            <h1 className="font-heading text-(length:--text-heading) font-bold tracking-tight text-foreground sm:text-4xl">
              [TODO: Features heading]
            </h1>
            <p className="mt-4 text-(length:--text-body-lg) text-muted-foreground">
              [TODO: Features subheading]
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Features Alternating ── */}
      {/* [TODO: Compose alternating text+image rows with grid + next/image] */}
      {/* Wrap each row with <AnimateOnScroll preset="slide-left"> / <AnimateOnScroll preset="slide-right"> */}
      {/* See examples/sections/features/features-alternating.tsx for reference */}

      {/* ── CTA ── */}
      {/* [TODO: Add closing CTA section, wrap with <AnimateOnScroll>] */}
    </>
  );
}
