import type { BlogPost } from "@/lib/content/types";
import { BlogCard } from "./blog-card";

interface BlogListProps {
  posts: BlogPost[];
  columns?: 2 | 3;
}

export function BlogList({ posts, columns = 3 }: BlogListProps) {
  const gridCols =
    columns === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-6 ${gridCols}`}>
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
