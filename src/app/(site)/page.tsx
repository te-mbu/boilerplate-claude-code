import type { Metadata } from "next";
import { createMetadata, siteConfig } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: `${siteConfig.name} — ${siteConfig.description}`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* Page blanche — compose each section from scratch using impeccable design laws + shadcn/ui primitives. */}
      {/* Run /impeccable teach to set up PRODUCT.md, then read design-system/client-brief.md before building. */}
    </>
  );
}
