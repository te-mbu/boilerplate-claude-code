import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { getContentProvider } from "@/lib/content";
import { TeamGrid } from "@/components/sections/team";

export const metadata: Metadata = createMetadata({
  title: "Team",
  description: "Meet the people behind our work.",
  path: "/team",
});

export default async function TeamPage() {
  const content = await getContentProvider();
  const members = await content.getTeamMembers();

  return (
    <main>
      <div className="px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Team
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            The talented people who make it all happen.
          </p>
        </div>
      </div>
      <TeamGrid members={members} />
    </main>
  );
}
