import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { getContentProvider } from "@/lib/content";
import { AnimateOnScroll } from "@/components/animations";

export const metadata: Metadata = createMetadata({
  title: "Team",
  description: "[TODO: Team page description]",
  path: "/team",
});

export default async function TeamPage() {
  const content = await getContentProvider();
  const members = await content.getTeamMembers();

  return (
    <>
      {/* ── Header ── */}
      <section className="px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <AnimateOnScroll preset="fade-up">
            <h1 className="font-heading text-(length:--text-heading) font-bold tracking-tight text-foreground sm:text-4xl">
              [TODO: Team heading]
            </h1>
            <p className="mt-4 text-(length:--text-body-lg) text-muted-foreground">
              [TODO: Team subheading]
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Team Grid ── */}
      {/* [TODO: Compose with Card + Avatar + next/image] */}
      {/* Wrap grid with <StaggerChildren preset="fade-up"> for member-by-member reveal */}
      {/* Data available in `members` variable from content provider */}
      {/* See examples/sections/team/ for reference */}

      {members.length === 0 && (
        <p className="px-4 pb-20 text-center text-muted-foreground">
          No team members added yet.
        </p>
      )}
    </>
  );
}
