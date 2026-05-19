import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { getContentProvider } from "@/lib/content";
import { PortfolioGrid } from "@/components/sections/portfolio";

export const metadata: Metadata = createMetadata({
  title: "Portfolio",
  description: "Explore our recent projects and the results we have delivered for our clients.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const content = await getContentProvider();
  const projects = await content.getProjects();

  return (
    <main>
      <div className="px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Work
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A selection of projects we are proud of.
          </p>
        </div>
      </div>
      <PortfolioGrid projects={projects} />
    </main>
  );
}
