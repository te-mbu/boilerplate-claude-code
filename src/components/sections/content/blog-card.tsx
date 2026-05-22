import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/lib/content/types";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="h-full transition-shadow hover:shadow-md">
        <div className="relative aspect-video overflow-hidden rounded-t-xl">
          <Image
            src={post.mainImage.src}
            alt={post.mainImage.alt}
            width={post.mainImage.width ?? 600}
            height={post.mainImage.height ?? 340}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="size-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {post.category.title}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {post.readingTime} min read
            </span>
          </div>
          <h3 className="font-heading text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {post.excerpt}
          </p>
          <div className="mt-auto flex items-center gap-2 pt-2">
            {post.author.image && (
              <Image
                src={post.author.image.src}
                alt={post.author.image.alt}
                width={24}
                height={24}
                sizes="24px"
                className="size-6 rounded-full object-cover"
              />
            )}
            <span className="text-xs font-medium text-foreground">
              {post.author.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
