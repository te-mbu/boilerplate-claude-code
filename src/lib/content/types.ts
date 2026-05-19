// Content types used across the app

export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  logo: ImageAsset;
  logoLight?: ImageAsset;
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  socialLinks: SocialLink[];
}

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface SocialLink {
  platform:
    | "linkedin"
    | "twitter"
    | "github"
    | "instagram"
    | "youtube"
    | "facebook";
  url: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML string (rendered from portable text or markdown)
  author: Author;
  category: Category;
  publishedAt: string;
  mainImage: ImageAsset;
  featured: boolean;
  readingTime: number;
}

export interface Author {
  name: string;
  slug: string;
  image?: ImageAsset;
  bio?: string;
  role?: string;
}

export interface Category {
  title: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  image?: ImageAsset;
  rating?: number;
  featured: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  image: ImageAsset;
  bio?: string;
  socialLinks?: SocialLink[];
  order: number;
}

export interface Service {
  title: string;
  slug: string;
  description: string;
  icon?: string;
  features?: string[];
}

export interface Project {
  title: string;
  slug: string;
  client: string;
  category: string;
  description: string;
  mainImage: ImageAsset;
  gallery?: ImageAsset[];
  technologies?: string[];
  url?: string;
  featured: boolean;
  completedAt: string;
}

export interface FAQ {
  question: string;
  answer: string;
  group?: string;
  order: number;
}

export interface ChangelogEntry {
  title: string;
  date: string;
  type: "feature" | "improvement" | "fix";
  body: string;
  version?: string;
}

// The content provider interface
export interface ContentProvider {
  getSiteSettings(): Promise<SiteSettings>;
  getBlogPosts(options?: {
    category?: string;
    featured?: boolean;
    limit?: number;
  }): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | null>;
  getCategories(): Promise<Category[]>;
  getTestimonials(options?: { featured?: boolean }): Promise<Testimonial[]>;
  getTeamMembers(): Promise<TeamMember[]>;
  getServices(): Promise<Service[]>;
  getProjects(options?: {
    featured?: boolean;
    category?: string;
  }): Promise<Project[]>;
  getProject(slug: string): Promise<Project | null>;
  getFAQs(group?: string): Promise<FAQ[]>;
  getChangelogEntries(): Promise<ChangelogEntry[]>;
}
