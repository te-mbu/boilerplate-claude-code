import type { Metadata } from "next";
import { createMetadata, siteConfig } from "@/lib/metadata";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = createMetadata({
  title: `${siteConfig.name} — ${siteConfig.description}`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        {siteConfig.name}
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        {siteConfig.description}
      </p>
      <div className="flex gap-4">
        <Button size="lg">Get Started</Button>
        <Button variant="outline" size="lg">Learn More</Button>
      </div>
    </section>
  );
}
