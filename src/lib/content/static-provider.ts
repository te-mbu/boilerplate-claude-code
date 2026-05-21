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
} from "./types";

// ---------------------------------------------------------------------------
// Static placeholder data — minimal stubs for new projects
// Replace with client data after running `pnpm setup`
// ---------------------------------------------------------------------------

const siteSettings: SiteSettings = {
  siteName: "[CLIENT_NAME]", // Replace with client name
  tagline: "Your tagline here",
  description: "Brief description of the client's business.",
  logo: { src: "/images/logo.svg", alt: "[CLIENT_NAME] logo" },
  logoLight: { src: "/images/logo-light.svg", alt: "[CLIENT_NAME] logo (light)" },
  contactEmail: "hello@example.com",
  socialLinks: [],
};

const authors = {
  default: {
    name: "Author Name",
    slug: "author-name",
    bio: "Author bio.",
    role: "Role",
  },
};

const categories: Category[] = [
  {
    title: "General",
    slug: "general",
    description: "General articles.",
  },
];

const blogPosts: BlogPost[] = [
  {
    slug: "first-post",
    title: "First Blog Post",
    excerpt: "Replace with real content.",
    content: "<p>Replace with real content.</p>",
    author: authors.default,
    category: categories[0],
    publishedAt: "2025-01-01",
    mainImage: {
      src: "/placeholders/project.svg",
      alt: "Blog post image",
      width: 800,
      height: 600,
    },
    featured: true,
    readingTime: 3,
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Client Name",
    role: "CEO",
    company: "Company",
    quote: "Replace with real testimonial.",
    featured: true,
  },
];

const teamMembers: TeamMember[] = [
  {
    name: "Team Member",
    role: "Founder",
    image: { src: "/placeholders/avatar.svg", alt: "Team member" },
    bio: "Replace with real bio.",
    order: 1,
  },
];

const services: Service[] = [
  {
    title: "Service Name",
    slug: "service-name",
    description: "Replace with real service description.",
    icon: "code",
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
];

const projects: Project[] = [
  {
    title: "Project Name",
    slug: "project-name",
    client: "Client",
    category: "Web",
    description: "Replace with real project description.",
    mainImage: {
      src: "/placeholders/project.svg",
      alt: "Project screenshot",
      width: 800,
      height: 600,
    },
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
    completedAt: "2025-01-01",
  },
];

const faqs: FAQ[] = [
  {
    question: "Replace with a real question?",
    answer: "Replace with a real answer.",
    group: "general",
    order: 1,
  },
];

const changelogEntries: ChangelogEntry[] = [
  {
    title: "Initial release",
    date: "2025-01-01",
    type: "feature",
    body: "First version of the site.",
    version: "1.0.0",
  },
];

// ---------------------------------------------------------------------------
// Static content provider implementation
// ---------------------------------------------------------------------------

export class StaticContentProvider implements ContentProvider {
  async getSiteSettings(): Promise<SiteSettings> {
    return siteSettings;
  }

  async getBlogPosts(options?: {
    category?: string;
    featured?: boolean;
    limit?: number;
  }): Promise<BlogPost[]> {
    let posts = [...blogPosts];

    if (options?.category) {
      posts = posts.filter((p) => p.category.slug === options.category);
    }
    if (options?.featured !== undefined) {
      posts = posts.filter((p) => p.featured === options.featured);
    }

    // Sort by date descending
    posts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    if (options?.limit) {
      posts = posts.slice(0, options.limit);
    }

    return posts;
  }

  async getBlogPost(slug: string): Promise<BlogPost | null> {
    return blogPosts.find((p) => p.slug === slug) ?? null;
  }

  async getCategories(): Promise<Category[]> {
    return categories;
  }

  async getTestimonials(options?: {
    featured?: boolean;
  }): Promise<Testimonial[]> {
    if (options?.featured !== undefined) {
      return testimonials.filter((t) => t.featured === options.featured);
    }
    return testimonials;
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return [...teamMembers].sort((a, b) => a.order - b.order);
  }

  async getServices(): Promise<Service[]> {
    return services;
  }

  async getProjects(options?: {
    featured?: boolean;
    category?: string;
  }): Promise<Project[]> {
    let result = [...projects];

    if (options?.featured !== undefined) {
      result = result.filter((p) => p.featured === options.featured);
    }
    if (options?.category) {
      result = result.filter((p) => p.category === options.category);
    }

    // Sort by completedAt descending
    result.sort(
      (a, b) =>
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );

    return result;
  }

  async getProject(slug: string): Promise<Project | null> {
    return projects.find((p) => p.slug === slug) ?? null;
  }

  async getFAQs(group?: string): Promise<FAQ[]> {
    let result = [...faqs];
    if (group) {
      result = result.filter((f) => f.group === group);
    }
    return result.sort((a, b) => a.order - b.order);
  }

  async getChangelogEntries(): Promise<ChangelogEntry[]> {
    return [...changelogEntries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
}
