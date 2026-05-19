import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { getContentProvider } from "@/lib/content";
import { ChangelogList } from "@/components/sections/changelog";

export const metadata: Metadata = createMetadata({
  title: "Changelog",
  description: "See what's new — latest features, improvements, and fixes.",
  path: "/changelog",
});

export default async function ChangelogPage() {
  const content = await getContentProvider();
  const entries = await content.getChangelogEntries();

  return (
    <main className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Changelog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Latest features, improvements, and fixes.
          </p>
        </div>

        {entries.length > 0 ? (
          <ChangelogList entries={entries} />
        ) : (
          <p className="text-center text-muted-foreground">
            No updates yet. Check back soon!
          </p>
        )}
      </div>
    </main>
  );
}
