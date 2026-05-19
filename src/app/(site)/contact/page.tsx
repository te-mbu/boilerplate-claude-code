import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { ContactForm, ContactInfo } from "@/components/sections/contact";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: "Get in touch with us. We would love to hear about your project.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a project in mind? Let&apos;s talk about how we can help.
          </p>
        </div>
        <div className="grid gap-12 md:grid-cols-[1fr_300px]">
          <ContactForm />
          <aside>
            <ContactInfo
              email="hello@example.com"
              phone="+1 (555) 000-0000"
              address="123 Main Street, City, Country"
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
