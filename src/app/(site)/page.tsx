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
      {/* Page blanche — compose each section from scratch using the taste skill + shadcn/ui primitives. */}
      {/* Read .claude/skills/taste/SKILL.md and design-system/client-brief.md before building. */}
    </>
  );
}
