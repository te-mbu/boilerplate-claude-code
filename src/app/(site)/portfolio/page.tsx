import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { getContentProvider } from "@/lib/content";
import { AnimateOnScroll } from "@/components/animations";

export const metadata: Metadata = createMetadata({
  title: "Portfolio",
  description: "[TODO: Portfolio page description]",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const content = await getContentProvider();
  const projects = await content.getProjects();

  return (
    <>
      {/* ── Header ── */}
      <section className="px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <AnimateOnScroll preset="fade-up">
            <h1 className="font-heading text-(length:--text-heading) font-bold tracking-tight text-foreground sm:text-4xl">
              [TODO: Portfolio heading]
            </h1>
            <p className="mt-4 text-(length:--text-body-lg) text-muted-foreground">
              [TODO: Portfolio subheading]
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Projects Grid ── */}
      {/* [TODO: Compose with Card variant="interactive" + next/image + Badge for tags] */}
      {/* Wrap grid with <StaggerChildren preset="fade-up"> for card-by-card reveal */}
      {/* Data available in `projects` variable from content provider */}
      {/* See examples/sections/portfolio/ for reference */}

      {projects.length === 0 && (
        <p className="px-4 pb-20 text-center text-muted-foreground">
          No projects published yet.
        </p>
      )}
    </>
  );
}
