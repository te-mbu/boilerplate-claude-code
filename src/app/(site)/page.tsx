import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createMetadata, siteConfig } from "@/lib/metadata";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimateOnScroll } from "@/components/animations";

export const metadata: Metadata = createMetadata({
  title: `${siteConfig.name} — ${siteConfig.description}`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-20 text-center">
        <AnimateOnScroll preset="fade-up">
          <h1 className="font-heading text-(length:--text-display) font-bold leading-[1.1] tracking-tight text-foreground">
            [TODO: Main value proposition]
          </h1>
        </AnimateOnScroll>
        <AnimateOnScroll preset="fade-up" delay={0.15}>
          <p className="mt-6 max-w-2xl text-(length:--text-body-lg) text-muted-foreground">
            [TODO: Supporting statement — what you do, who it&apos;s for, why it matters]
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll preset="fade-up" delay={0.3}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className={cn(buttonVariants({ variant: "cta", size: "lg" }))}>
              [TODO: Primary CTA] <ArrowRight />
            </Link>
            <Link href="/services" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              [TODO: Secondary CTA]
            </Link>
          </div>
        </AnimateOnScroll>
      </section>

      {/* [TODO: Social proof — logo cloud with flex/grid + next/image] */}
      {/* Wrap with <StaggerChildren preset="fade-in"> */}
      {/* See examples/sections/social-proof/logo-cloud.tsx for reference */}

      {/* [TODO: Features/services grid — compose with Card, CardHeader, CardTitle, CardDescription] */}
      {/* Wrap grid with <StaggerChildren preset="fade-up"> for card-by-card reveal */}
      {/* See examples/sections/features/ for reference */}

      {/* [TODO: Testimonials — compose with Card + blockquote] */}
      {/* Wrap with <AnimateOnScroll preset="fade-up"> */}
      {/* See examples/sections/social-proof/ for reference */}

      {/* ── CTA ── */}
      <AnimateOnScroll preset="fade-up">
        <section className="bg-muted/50 px-4 py-section">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-(length:--text-heading) font-bold tracking-tight text-foreground">
              [TODO: Ready to get started?]
            </h2>
            <p className="mt-4 text-muted-foreground">
              [TODO: Short persuasive closing statement]
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className={cn(buttonVariants({ variant: "cta", size: "lg" }))}>
                [TODO: Get started]
              </Link>
              <Link href="/services" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                [TODO: Learn more]
              </Link>
            </div>
          </div>
        </section>
      </AnimateOnScroll>
    </>
  );
}
