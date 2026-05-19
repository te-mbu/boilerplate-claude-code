import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { getContentProvider } from "@/lib/content";
import { BlogArticle } from "@/components/sections/content";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContentProvider();
  const post = await content.getBlogPost(slug);

  if (!post) {
    return createMetadata({
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    image: post.mainImage.src,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const content = await getContentProvider();
  const post = await content.getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <BlogArticle post={post} />
    </main>
  );
}
