import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";
import { getContentProvider } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const content = await getContentProvider();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/features`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/changelog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.4 },
    { url: `${baseUrl}/legal/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/legal/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/legal/mentions-legales`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];

  // Dynamic blog posts
  const posts = await content.getBlogPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic blog categories
  const categories = await content.getCategories();
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/blog/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  // Dynamic projects
  const projects = await content.getProjects();
  const projectPages: MetadataRoute.Sitemap = projects
    .filter((p) => p.slug)
    .map((project) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: new Date(project.completedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticPages, ...blogPages, ...categoryPages, ...projectPages];
}
