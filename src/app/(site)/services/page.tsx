import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { AnimateOnScroll } from "@/components/animations";

export const metadata: Metadata = createMetadata({
  title: "Services",
  description: "[TODO: Services page description]",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <AnimateOnScroll preset="fade-up">
            <h1 className="font-heading text-(length:--text-heading) font-bold tracking-tight text-foreground sm:text-4xl">
              [TODO: Services heading]
            </h1>
            <p className="mt-4 text-(length:--text-body-lg) text-muted-foreground">
              [TODO: Services subheading]
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Services Grid ── */}
      {/* [TODO: Compose with Card, CardHeader, CardTitle, CardDescription + Lucide icons] */}
      {/* Wrap grid with <StaggerChildren preset="fade-up"> for card-by-card reveal */}
      {/* See examples/sections/features/ for reference patterns */}

      {/* ── CTA ── */}
      {/* [TODO: Add closing CTA section, wrap with <AnimateOnScroll>] */}
    </>
  );
}
