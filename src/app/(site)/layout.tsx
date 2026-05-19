import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/metadata";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipToContent />
      <Navbar />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationSchema(),
            websiteSchema({ searchUrl: `${siteConfig.url}/blog?q={search_term_string}` }),
          ]),
        }}
      />
    </>
  );
}
