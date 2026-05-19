import { sanityClient as client } from "@/lib/sanity/client";
import type {
  ContentProvider,
  SiteSettings,
  BlogPost,
  Category,
  Testimonial,
  TeamMember,
  Service,
  Project,
  FAQ,
  ChangelogEntry,
  ImageAsset,
} from "./types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Map a Sanity image object to the app's ImageAsset type. */
function mapImage(img: Record<string, unknown> | null | undefined): ImageAsset {
  if (!img) return { src: "/images/placeholder.jpg", alt: "" };
  return {
    src: (img.url as string) ?? "",
    alt: (img.alt as string) ?? "",
    width: (img.width as number) ?? undefined,
    height: (img.height as number) ?? undefined,
    blurDataURL: (img.lqip as string) ?? undefined,
  };
}

// ---------------------------------------------------------------------------
// Sanity content provider implementation
// ---------------------------------------------------------------------------

export class SanityContentProvider implements ContentProvider {
  // Requires Sanity schema: siteSettings
  async getSiteSettings(): Promise<SiteSettings> {
    const query = `*[_type == "siteSettings"][0]{
      siteName,
      tagline,
      description,
      "logo": logo{
        "url": asset->url,
        "alt": alt,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        "lqip": asset->metadata.lqip
      },
      "logoLight": logoLight{
        "url": asset->url,
        "alt": alt,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        "lqip": asset->metadata.lqip
      },
      contactEmail,
      contactPhone,
      address,
      socialLinks[]{
        platform,
        url
      }
    }`;

    const data = await client.fetch(query);

    return {
      ...data,
      logo: mapImage(data.logo),
      logoLight: data.logoLight ? mapImage(data.logoLight) : undefined,
    };
  }

  // Requires Sanity schema: post, author, category
  async getBlogPosts(options?: {
    category?: string;
    featured?: boolean;
    limit?: number;
  }): Promise<BlogPost[]> {
    const filters: string[] = ['_type == "post"'];
    if (options?.category) filters.push(`category->slug.current == "${options.category}"`);
    if (options?.featured !== undefined) filters.push(`featured == ${options.featured}`);

    const limitClause = options?.limit ? `[0...${options.limit}]` : "";

    const query = `*[${filters.join(" && ")}] | order(publishedAt desc) ${limitClause} {
      "slug": slug.current,
      title,
      excerpt,
      "content": pt::text(body),
      "author": author->{
        name,
        "slug": slug.current,
        "image": image{
          "url": asset->url,
          "alt": alt,
          "lqip": asset->metadata.lqip
        },
        bio,
        role
      },
      "category": category->{
        title,
        "slug": slug.current,
        description,
        color
      },
      publishedAt,
      "mainImage": mainImage{
        "url": asset->url,
        "alt": alt,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        "lqip": asset->metadata.lqip
      },
      featured,
      "readingTime": round(length(pt::text(body)) / 5 / 200)
    }`;

    const data = await client.fetch(query);

    return (data ?? []).map((post: Record<string, unknown>) => ({
      ...post,
      author: {
        ...(post.author as Record<string, unknown>),
        image: mapImage((post.author as Record<string, unknown>)?.image as Record<string, unknown>),
      },
      mainImage: mapImage(post.mainImage as Record<string, unknown>),
    }));
  }

  // Requires Sanity schema: post, author, category
  async getBlogPost(slug: string): Promise<BlogPost | null> {
    const query = `*[_type == "post" && slug.current == $slug][0]{
      "slug": slug.current,
      title,
      excerpt,
      "content": pt::text(body),
      "author": author->{
        name,
        "slug": slug.current,
        "image": image{
          "url": asset->url,
          "alt": alt,
          "lqip": asset->metadata.lqip
        },
        bio,
        role
      },
      "category": category->{
        title,
        "slug": slug.current,
        description,
        color
      },
      publishedAt,
      "mainImage": mainImage{
        "url": asset->url,
        "alt": alt,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        "lqip": asset->metadata.lqip
      },
      featured,
      "readingTime": round(length(pt::text(body)) / 5 / 200)
    }`;

    const data = await client.fetch(query, { slug });
    if (!data) return null;

    return {
      ...data,
      author: {
        ...data.author,
        image: mapImage(data.author?.image),
      },
      mainImage: mapImage(data.mainImage),
    };
  }

  // Requires Sanity schema: category
  async getCategories(): Promise<Category[]> {
    const query = `*[_type == "category"] | order(title asc) {
      title,
      "slug": slug.current,
      description,
      color
    }`;

    return client.fetch(query);
  }

  // Requires Sanity schema: testimonial
  async getTestimonials(options?: { featured?: boolean }): Promise<Testimonial[]> {
    const filters: string[] = ['_type == "testimonial"'];
    if (options?.featured !== undefined) filters.push(`featured == ${options.featured}`);

    const query = `*[${filters.join(" && ")}] | order(_createdAt desc) {
      name,
      role,
      company,
      quote,
      "image": image{
        "url": asset->url,
        "alt": alt,
        "lqip": asset->metadata.lqip
      },
      rating,
      featured
    }`;

    const data = await client.fetch(query);

    return (data ?? []).map((t: Record<string, unknown>) => ({
      ...t,
      image: mapImage(t.image as Record<string, unknown>),
    }));
  }

  // Requires Sanity schema: teamMember
  async getTeamMembers(): Promise<TeamMember[]> {
    const query = `*[_type == "teamMember"] | order(order asc) {
      name,
      role,
      "image": image{
        "url": asset->url,
        "alt": alt,
        "lqip": asset->metadata.lqip
      },
      bio,
      socialLinks[]{
        platform,
        url
      },
      order
    }`;

    const data = await client.fetch(query);

    return (data ?? []).map((m: Record<string, unknown>) => ({
      ...m,
      image: mapImage(m.image as Record<string, unknown>),
    }));
  }

  // Requires Sanity schema: service
  async getServices(): Promise<Service[]> {
    const query = `*[_type == "service"] | order(order asc) {
      title,
      "slug": slug.current,
      description,
      icon,
      features
    }`;

    return client.fetch(query);
  }

  // Requires Sanity schema: project
  async getProjects(options?: {
    featured?: boolean;
    category?: string;
  }): Promise<Project[]> {
    const filters: string[] = ['_type == "project"'];
    if (options?.featured !== undefined) filters.push(`featured == ${options.featured}`);
    if (options?.category) filters.push(`category == "${options.category}"`);

    const query = `*[${filters.join(" && ")}] | order(completedAt desc) {
      title,
      "slug": slug.current,
      client,
      category,
      description,
      "mainImage": mainImage{
        "url": asset->url,
        "alt": alt,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        "lqip": asset->metadata.lqip
      },
      "gallery": gallery[]{
        "url": asset->url,
        "alt": alt,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        "lqip": asset->metadata.lqip
      },
      technologies,
      url,
      featured,
      completedAt
    }`;

    const data = await client.fetch(query);

    return (data ?? []).map((p: Record<string, unknown>) => ({
      ...p,
      mainImage: mapImage(p.mainImage as Record<string, unknown>),
      gallery: ((p.gallery as Record<string, unknown>[]) ?? []).map(mapImage),
    }));
  }

  // Requires Sanity schema: project
  async getProject(slug: string): Promise<Project | null> {
    const query = `*[_type == "project" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      client,
      category,
      description,
      "mainImage": mainImage{
        "url": asset->url,
        "alt": alt,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        "lqip": asset->metadata.lqip
      },
      "gallery": gallery[]{
        "url": asset->url,
        "alt": alt,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        "lqip": asset->metadata.lqip
      },
      technologies,
      url,
      featured,
      completedAt
    }`;

    const data = await client.fetch(query, { slug });
    if (!data) return null;

    return {
      ...data,
      mainImage: mapImage(data.mainImage),
      gallery: (data.gallery ?? []).map(mapImage),
    };
  }

  // Requires Sanity schema: faq
  async getFAQs(group?: string): Promise<FAQ[]> {
    const filters: string[] = ['_type == "faq"'];
    if (group) filters.push(`group == "${group}"`);

    const query = `*[${filters.join(" && ")}] | order(order asc) {
      question,
      answer,
      group,
      order
    }`;

    return client.fetch(query);
  }

  // Requires Sanity schema: changelogEntry
  async getChangelogEntries(): Promise<ChangelogEntry[]> {
    const query = `*[_type == "changelogEntry"] | order(date desc) {
      title,
      date,
      type,
      body,
      version
    }`;

    return client.fetch(query);
  }
}
