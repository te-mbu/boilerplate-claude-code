import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: "Our privacy policy explains how we collect, use, and protect your personal data.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="px-4 py-12 md:py-20">
      <div className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl">
        <h1>Privacy Policy</h1>
        <p className="lead">Last updated: {new Date().toISOString().slice(0, 10)}</p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly, such as when you fill out
          a contact form, subscribe to our newsletter, or request a diagnostic.
          This may include your name, email address, company name, and phone
          number.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect to respond to your inquiries,
          provide our services, send you updates (if you opted in), and improve
          our website.
        </p>

        <h2>3. Data Sharing</h2>
        <p>
          We do not sell your personal information. We may share data with
          trusted service providers who help us operate our business, subject to
          strict confidentiality obligations.
        </p>

        <h2>4. Cookies</h2>
        <p>
          We use cookies and similar technologies to analyze traffic and improve
          your experience. You can manage your cookie preferences at any time.
        </p>

        <h2>5. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal data.
          Contact us at the email below to exercise these rights.
        </p>

        <h2>6. Contact</h2>
        <p>
          For questions about this policy, contact us at{" "}
          <a href="mailto:privacy@example.com">privacy@example.com</a>.
        </p>
      </div>
    </main>
  );
}
