import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description: "Our terms of service govern your use of our website and services.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <main className="px-4 py-12 md:py-20">
      <div className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl">
        <h1>Terms of Service</h1>
        <p className="lead">Last updated: {new Date().toISOString().slice(0, 10)}</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using this website, you accept and agree to be bound
          by these terms. If you do not agree, please do not use our services.
        </p>

        <h2>2. Services</h2>
        <p>
          We provide web design, development, and related digital services. The
          scope, timeline, and deliverables for each project are defined in a
          separate proposal or contract.
        </p>

        <h2>3. Intellectual Property</h2>
        <p>
          All content on this website, including text, graphics, logos, and code,
          is our property or used with permission. You may not reproduce or
          distribute it without written consent.
        </p>

        <h2>4. Limitation of Liability</h2>
        <p>
          We provide our services &quot;as is&quot; and make no warranties,
          express or implied. We are not liable for any indirect, incidental, or
          consequential damages arising from use of our services.
        </p>

        <h2>5. Governing Law</h2>
        <p>
          These terms are governed by the laws of the applicable jurisdiction.
          Any disputes shall be resolved in the competent courts of that
          jurisdiction.
        </p>

        <h2>6. Contact</h2>
        <p>
          For questions about these terms, contact us at{" "}
          <a href="mailto:legal@example.com">legal@example.com</a>.
        </p>
      </div>
    </main>
  );
}
