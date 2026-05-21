import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { ContactForm } from "@/components/sections/contact";
import { ContactInfo } from "@/components/sections/contact";
import { AnimateOnScroll } from "@/components/animations";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: "[TODO: Contact page description]",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimateOnScroll preset="fade-up">
          <div className="mb-12 text-center">
            <h1 className="font-heading text-(length:--text-heading) font-bold tracking-tight text-foreground sm:text-4xl">
              [TODO: Contact heading]
            </h1>
            <p className="mt-4 text-(length:--text-body-lg) text-muted-foreground">
              [TODO: Contact subheading]
            </p>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll preset="fade-up" delay={0.15}>
          <div className="grid gap-12 md:grid-cols-[1fr_300px]">
            <ContactForm />
            <aside>
              <ContactInfo
                email="[TODO: email]"
                phone="[TODO: phone]"
                address="[TODO: address]"
              />
            </aside>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
