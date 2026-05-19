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
// Static placeholder data — realistic web agency context
// ---------------------------------------------------------------------------

const siteSettings: SiteSettings = {
  siteName: "Apex Studio",
  tagline: "We build websites that drive revenue",
  description:
    "Apex Studio is a digital agency specializing in high-performance websites, web applications, and conversion-optimized landing pages.",
  logo: { src: "/images/logo.svg", alt: "Apex Studio logo" },
  logoLight: { src: "/images/logo-light.svg", alt: "Apex Studio logo (light)" },
  contactEmail: "hello@apexstudio.dev",
  contactPhone: "+1 (555) 234-5678",
  address: "123 Innovation Blvd, San Francisco, CA 94107",
  socialLinks: [
    { platform: "linkedin", url: "https://linkedin.com/company/apexstudio" },
    { platform: "twitter", url: "https://twitter.com/apexstudio" },
    { platform: "github", url: "https://github.com/apexstudio" },
    { platform: "instagram", url: "https://instagram.com/apexstudio" },
  ],
};

const authors = {
  sarah: {
    name: "Sarah Chen",
    slug: "sarah-chen",
    image: { src: "/images/team/sarah.jpg", alt: "Sarah Chen" },
    bio: "Lead developer and co-founder of Apex Studio with 10+ years of experience building scalable web applications.",
    role: "Lead Developer",
  },
  marcus: {
    name: "Marcus Rivera",
    slug: "marcus-rivera",
    image: { src: "/images/team/marcus.jpg", alt: "Marcus Rivera" },
    bio: "Design director focused on conversion-driven interfaces and brand systems.",
    role: "Design Director",
  },
  lena: {
    name: "Lena Okafor",
    slug: "lena-okafor",
    image: { src: "/images/team/lena.jpg", alt: "Lena Okafor" },
    bio: "Full-stack engineer specializing in headless CMS architectures and performance optimization.",
    role: "Senior Engineer",
  },
};

const categories: Category[] = [
  {
    title: "Engineering",
    slug: "engineering",
    description: "Deep dives into web development, architecture, and tooling.",
    color: "#3b82f6",
  },
  {
    title: "Design",
    slug: "design",
    description: "UI/UX patterns, design systems, and visual storytelling.",
    color: "#8b5cf6",
  },
  {
    title: "Strategy",
    slug: "strategy",
    description: "Business strategy, growth tactics, and case studies.",
    color: "#10b981",
  },
];

const blogPosts: BlogPost[] = [
  {
    slug: "why-headless-cms-wins",
    title: "Why Headless CMS Is the Right Choice for Growing Startups",
    excerpt:
      "Traditional monolithic CMS platforms create technical debt fast. Here is how a headless approach keeps your stack flexible as you scale.",
    content:
      "<p>Most startups begin with a simple WordPress site and quickly outgrow it. The first bottleneck is usually performance — page loads creep past 3 seconds and conversion rates suffer. The second is developer experience: every feature request turns into a plugin hunt.</p><p>A headless CMS decouples content management from presentation. Your marketing team edits in a familiar dashboard while your engineering team ships a React or Next.js front end optimized for speed. The result is faster pages, happier teams, and a stack that scales with the business.</p><p>We migrated three client sites from WordPress to Sanity + Next.js last quarter. Average Lighthouse performance scores jumped from 42 to 96, and content publishing time dropped by 60%.</p>",
    author: authors.sarah,
    category: categories[0],
    publishedAt: "2025-04-12",
    mainImage: {
      src: "/images/blog/headless-cms.jpg",
      alt: "Diagram showing headless CMS architecture",
      width: 1200,
      height: 630,
    },
    featured: true,
    readingTime: 6,
  },
  {
    slug: "design-system-from-scratch",
    title: "Building a Design System from Scratch in 2025",
    excerpt:
      "A practical guide to creating a component library that designers and developers actually want to use.",
    content:
      "<p>Design systems fail when they are built in isolation. The key is co-creation: designers and developers working in the same Figma file and the same codebase from day one.</p><p>Start with the smallest useful set — typography, color tokens, a button, an input, and a card. Ship those to production, gather feedback, then expand. Trying to design 50 components before shipping any of them is the fastest way to build something nobody uses.</p><p>We use Tailwind CSS for tokens, Radix UI for accessible primitives, and Storybook for documentation. This stack gives us speed without sacrificing accessibility or customization.</p>",
    author: authors.marcus,
    category: categories[1],
    publishedAt: "2025-03-28",
    mainImage: {
      src: "/images/blog/design-system.jpg",
      alt: "Component library showcase",
      width: 1200,
      height: 630,
    },
    featured: false,
    readingTime: 8,
  },
  {
    slug: "conversion-rate-audit-checklist",
    title: "The 15-Point Conversion Rate Audit We Run for Every Client",
    excerpt:
      "Before we redesign anything, we audit. Here is the exact checklist we use to find quick wins.",
    content:
      "<p>Redesigns are expensive. Before proposing one, we run a structured audit that often uncovers improvements worth 20-40% more conversions without touching the visual design at all.</p><p>The checklist covers five categories: page speed, above-the-fold clarity, form friction, trust signals, and mobile experience. Each item is scored 0-3 and the total gives us a prioritized roadmap.</p><p>One SaaS client came to us asking for a full rebrand. After the audit, we made seven small changes — faster hosting, a rewritten headline, a simplified pricing table, and four trust badges — and their trial signups increased 34% in three weeks.</p>",
    author: authors.lena,
    category: categories[2],
    publishedAt: "2025-02-15",
    mainImage: {
      src: "/images/blog/conversion-audit.jpg",
      alt: "Dashboard showing conversion metrics",
      width: 1200,
      height: 630,
    },
    featured: true,
    readingTime: 5,
  },
];

const testimonials: Testimonial[] = [
  {
    name: "David Park",
    role: "CEO",
    company: "Nuvola Health",
    quote:
      "Apex Studio rebuilt our patient portal in 8 weeks. Page speed went from 4.2s to under 1s, and patient engagement doubled within the first month.",
    image: { src: "/images/testimonials/david.jpg", alt: "David Park" },
    rating: 5,
    featured: true,
  },
  {
    name: "Amira Hassan",
    role: "VP of Marketing",
    company: "GreenThread",
    quote:
      "They didn't just build a beautiful site — they built a system our marketing team can actually manage without calling a developer every time we need a change.",
    image: { src: "/images/testimonials/amira.jpg", alt: "Amira Hassan" },
    rating: 5,
    featured: true,
  },
  {
    name: "James Whitfield",
    role: "Founder",
    company: "Stackline Analytics",
    quote:
      "We interviewed five agencies. Apex was the only one that asked about our conversion funnel before showing us design mockups. That told us everything.",
    image: { src: "/images/testimonials/james.jpg", alt: "James Whitfield" },
    rating: 5,
    featured: false,
  },
  {
    name: "Priya Mehta",
    role: "Product Manager",
    company: "Kova Finance",
    quote:
      "The headless CMS setup they recommended cut our content publishing time from days to minutes. Our editors love it.",
    image: { src: "/images/testimonials/priya.jpg", alt: "Priya Mehta" },
    rating: 4,
    featured: true,
  },
];

const teamMembers: TeamMember[] = [
  {
    name: "Sarah Chen",
    role: "Lead Developer & Co-Founder",
    image: { src: "/images/team/sarah.jpg", alt: "Sarah Chen" },
    bio: "10+ years building web applications. Previously senior engineer at Vercel. Obsessed with performance and developer experience.",
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/sarachen" },
      { platform: "github", url: "https://github.com/sarachen" },
    ],
    order: 1,
  },
  {
    name: "Marcus Rivera",
    role: "Design Director & Co-Founder",
    image: { src: "/images/team/marcus.jpg", alt: "Marcus Rivera" },
    bio: "Former design lead at a Y Combinator startup. Specializes in conversion-driven design and brand identity systems.",
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/marcusrivera" },
      { platform: "instagram", url: "https://instagram.com/marcusrivera" },
    ],
    order: 2,
  },
  {
    name: "Lena Okafor",
    role: "Senior Engineer",
    image: { src: "/images/team/lena.jpg", alt: "Lena Okafor" },
    bio: "Full-stack engineer specializing in headless CMS integrations, API design, and cloud infrastructure.",
    socialLinks: [
      { platform: "github", url: "https://github.com/lenaokafor" },
    ],
    order: 3,
  },
];

const services: Service[] = [
  {
    title: "Web Development",
    slug: "web-development",
    description:
      "High-performance websites built with Next.js, React, and modern tooling. Server-rendered, accessible, and optimized for Core Web Vitals.",
    icon: "code",
    features: [
      "Next.js / React applications",
      "Server-side rendering & static generation",
      "API development and integrations",
      "Performance optimization",
      "Headless CMS setup",
    ],
  },
  {
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description:
      "Research-driven design that converts. We create interfaces grounded in user behavior data, not guesswork.",
    icon: "palette",
    features: [
      "User research and testing",
      "Wireframing and prototyping",
      "Design systems and component libraries",
      "Responsive and mobile-first design",
      "Accessibility audits (WCAG 2.2)",
    ],
  },
  {
    title: "Conversion Optimization",
    slug: "conversion-optimization",
    description:
      "Data-driven improvements to your existing site. We find the friction points and fix them with measurable results.",
    icon: "trending-up",
    features: [
      "Conversion rate audits",
      "A/B testing strategy and execution",
      "Landing page optimization",
      "Analytics setup and dashboards",
      "Funnel analysis",
    ],
  },
  {
    title: "CMS & Content Strategy",
    slug: "cms-content-strategy",
    description:
      "Headless CMS implementation and content workflows that let your team publish without developer bottlenecks.",
    icon: "layers",
    features: [
      "Sanity / Contentful / Strapi setup",
      "Content modeling and migration",
      "Editorial workflow design",
      "Multi-language support",
      "Structured content consulting",
    ],
  },
];

const projects: Project[] = [
  {
    title: "Nuvola Health Patient Portal",
    slug: "nuvola-health",
    client: "Nuvola Health",
    category: "Web Application",
    description:
      "A complete rebuild of Nuvola Health's patient-facing portal. Migrated from a legacy PHP stack to Next.js with a headless Sanity CMS for content pages. Achieved a Lighthouse performance score of 98 and reduced average page load to 0.8 seconds.",
    mainImage: {
      src: "/images/projects/nuvola.jpg",
      alt: "Nuvola Health portal dashboard",
      width: 1200,
      height: 800,
    },
    gallery: [
      { src: "/images/projects/nuvola-2.jpg", alt: "Mobile view of the portal" },
      { src: "/images/projects/nuvola-3.jpg", alt: "Appointment booking flow" },
    ],
    technologies: ["Next.js", "TypeScript", "Sanity", "Tailwind CSS", "Vercel"],
    url: "https://portal.nuvolahealth.com",
    featured: true,
    completedAt: "2025-03-01",
  },
  {
    title: "GreenThread E-Commerce Redesign",
    slug: "greenthread",
    client: "GreenThread",
    category: "E-Commerce",
    description:
      "Redesigned and rebuilt GreenThread's Shopify storefront as a custom Next.js application with Shopify's Storefront API. Conversion rate increased 41% in the first quarter after launch.",
    mainImage: {
      src: "/images/projects/greenthread.jpg",
      alt: "GreenThread online store homepage",
      width: 1200,
      height: 800,
    },
    technologies: [
      "Next.js",
      "Shopify Storefront API",
      "Tailwind CSS",
      "Framer Motion",
    ],
    url: "https://greenthread.co",
    featured: true,
    completedAt: "2024-11-15",
  },
  {
    title: "Stackline Analytics Marketing Site",
    slug: "stackline-analytics",
    client: "Stackline Analytics",
    category: "Marketing Site",
    description:
      "A conversion-optimized marketing site for a B2B analytics startup. Includes an interactive ROI calculator, gated content downloads, and CRM integration with HubSpot.",
    mainImage: {
      src: "/images/projects/stackline.jpg",
      alt: "Stackline Analytics landing page",
      width: 1200,
      height: 800,
    },
    technologies: ["Next.js", "TypeScript", "Sanity", "HubSpot API", "Vercel"],
    featured: false,
    completedAt: "2024-08-20",
  },
];

const faqs: FAQ[] = [
  {
    question: "How long does a typical website project take?",
    answer:
      "Most projects take 6 to 12 weeks from kickoff to launch. A simple marketing site is closer to 6 weeks; a complex web application with custom integrations can take 12 or more. We provide a detailed timeline during the proposal phase.",
    group: "general",
    order: 1,
  },
  {
    question: "What technologies do you work with?",
    answer:
      "Our primary stack is Next.js, React, TypeScript, and Tailwind CSS. For content management we recommend Sanity, though we also work with Contentful and Strapi. We deploy on Vercel or AWS depending on project requirements.",
    group: "general",
    order: 2,
  },
  {
    question: "Do you offer ongoing maintenance after launch?",
    answer:
      "Yes. We offer monthly retainer plans that include performance monitoring, security updates, content support, and a set number of development hours for new features or improvements.",
    group: "general",
    order: 3,
  },
  {
    question: "How much does a project cost?",
    answer:
      "Project pricing depends on scope and complexity. Marketing sites typically start at $15,000, web applications at $30,000. We provide a fixed-price quote after a discovery call so there are no surprises.",
    group: "pricing",
    order: 4,
  },
  {
    question: "Can you work with our existing design team?",
    answer:
      "Absolutely. We regularly collaborate with in-house design teams and are comfortable working from Figma files, design tokens, or existing brand guidelines. We can also handle design end-to-end if needed.",
    group: "process",
    order: 5,
  },
];

const changelogEntries: ChangelogEntry[] = [
  {
    title: "Dark mode support",
    date: "2025-05-01",
    type: "feature",
    body: "Added system-aware dark mode with a manual toggle. All components now support light and dark color tokens via CSS custom properties.",
    version: "1.2.0",
  },
  {
    title: "Improved image loading performance",
    date: "2025-04-15",
    type: "improvement",
    body: "Replaced legacy image components with Next.js Image using blur placeholders and responsive srcsets. Largest Contentful Paint improved by 35% on average.",
    version: "1.1.1",
  },
  {
    title: "Fixed mobile navigation overlap",
    date: "2025-04-02",
    type: "fix",
    body: "Resolved an issue where the mobile hamburger menu overlapped with the page content on iOS Safari when the viewport was between 375px and 390px wide.",
    version: "1.1.0",
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
