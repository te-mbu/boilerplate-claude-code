import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/lib/content/types";

interface BlogArticleProps {
  post: BlogPost;
}

export function BlogArticle({ post }: BlogArticleProps) {
  return (
    <article className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <Badge variant="secondary" className="mb-4">
            {post.category.title}
          </Badge>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              {post.author.image && (
                <Image
                  src={post.author.image.src}
                  alt={post.author.image.alt}
                  width={32}
                  height={32}
                  sizes="32px"
                  className="size-8 rounded-full object-cover"
                />
              )}
              <span className="font-medium text-foreground">
                {post.author.name}
              </span>
            </div>
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>{post.readingTime} min read</span>
          </div>
        </header>

        {/* Main image */}
        <div className="mb-10 overflow-hidden rounded-xl">
          <Image
            src={post.mainImage.src}
            alt={post.mainImage.alt}
            width={post.mainImage.width ?? 1200}
            height={post.mainImage.height ?? 630}
            sizes="(max-width: 768px) 100vw, 768px"
            className="w-full object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div
          className="prose prose-neutral dark:prose-invert mx-auto max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author bio */}
        {post.author.bio && (
          <div className="mt-12 flex items-start gap-4 rounded-xl border border-border bg-muted/50 p-6">
            {post.author.image && (
              <Image
                src={post.author.image.src}
                alt={post.author.image.alt}
                width={56}
                height={56}
                sizes="56px"
                className="size-14 shrink-0 rounded-full object-cover"
              />
            )}
            <div>
              <p className="text-sm font-semibold text-foreground">
                {post.author.name}
              </p>
              {post.author.role && (
                <p className="text-xs text-muted-foreground">
                  {post.author.role}
                </p>
              )}
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {post.author.bio}
              </p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
