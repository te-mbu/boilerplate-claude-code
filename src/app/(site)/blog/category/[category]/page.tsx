import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { getContentProvider } from "@/lib/content";
import { BlogList } from "@/components/sections/content";
import { Badge } from "@/components/ui/badge";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const formatted = category.replace(/-/g, " ");

  return createMetadata({
    title: `${formatted.charAt(0).toUpperCase() + formatted.slice(1)} — Blog`,
    description: `Browse our blog posts in the ${formatted} category.`,
    path: `/blog/category/${category}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const content = await getContentProvider();
  const [posts, categories] = await Promise.all([
    content.getBlogPosts({ category }),
    content.getCategories(),
  ]);

  const currentCategory = categories.find((c) => c.slug === category);
  const title = currentCategory?.title ?? category.replace(/-/g, " ");

  return (
    <main className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Posts in the {title.toLowerCase()} category.
          </p>
        </div>

        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            <Link href="/blog">
              <Badge variant="outline">All</Badge>
            </Link>
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/blog/category/${cat.slug}`}>
                <Badge
                  variant={cat.slug === category ? "secondary" : "outline"}
                >
                  {cat.title}
                </Badge>
              </Link>
            ))}
          </div>
        )}

        {posts.length > 0 ? (
          <BlogList posts={posts} />
        ) : (
          <p className="text-center text-muted-foreground">
            No posts in this category yet.
          </p>
        )}
      </div>
    </main>
  );
}
