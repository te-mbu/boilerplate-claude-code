import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "Learn more about who we are, our mission, and the team behind our work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          About Us
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          We help businesses grow with modern web solutions. Our approach
          combines strategic thinking with technical expertise to deliver
          results that matter.
        </p>
        <div className="mt-10 flex flex-col gap-6 text-base leading-relaxed text-muted-foreground">
          <p>
            Founded with the belief that every business deserves a strong digital
            presence, we partner with ambitious companies to design, build, and
            scale their online platforms.
          </p>
          <p>
            Our team brings together diverse skills in design, development, and
            strategy — allowing us to tackle projects from concept to launch with
            a single, cohesive vision.
          </p>
        </div>
      </div>
    </main>
  );
}
