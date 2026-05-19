import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { getContentProvider } from "@/lib/content";
import { BlogList } from "@/components/sections/content";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description: "Insights, tutorials, and updates from our team.",
  path: "/blog",
});

export default async function BlogPage() {
  const content = await getContentProvider();
  const [posts, categories] = await Promise.all([
    content.getBlogPosts(),
    content.getCategories(),
  ]);

  return (
    <main className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Insights, tutorials, and updates from our team.
          </p>
        </div>

        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            <Link href="/blog">
              <Badge variant="secondary">All</Badge>
            </Link>
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/blog/category/${cat.slug}`}>
                <Badge variant="outline">{cat.title}</Badge>
              </Link>
            ))}
          </div>
        )}

        {posts.length > 0 ? (
          <BlogList posts={posts} />
        ) : (
          <p className="text-center text-muted-foreground">
            No posts published yet. Check back soon!
          </p>
        )}
      </div>
    </main>
  );
}
