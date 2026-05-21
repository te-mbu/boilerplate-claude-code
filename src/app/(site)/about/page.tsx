import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { AnimateOnScroll } from "@/components/animations";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "[TODO: About page description]",
  path: "/about",
});

export default function AboutPage() {
  return (
    <section className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <AnimateOnScroll preset="fade-up">
          <h1 className="font-heading text-(length:--text-heading) font-bold tracking-tight text-foreground sm:text-4xl">
            [TODO: About heading]
          </h1>
        </AnimateOnScroll>
        <AnimateOnScroll preset="fade-up" delay={0.1}>
          <p className="mt-4 text-(length:--text-body-lg) leading-relaxed text-muted-foreground">
            [TODO: About intro paragraph]
          </p>
        </AnimateOnScroll>
        <div className="mt-10 flex flex-col gap-6 text-base leading-relaxed text-muted-foreground">
          {/* [TODO: Add about content — story, mission, values] */}
          {/* Wrap sections with <AnimateOnScroll preset="fade-up"> */}
          {/* Compose with Card, next/image, or custom layout as needed */}
        </div>
      </div>
    </section>
  );
}
