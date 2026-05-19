import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { FAQ } from "@/lib/content/types";

interface FaqSectionProps {
  faqs: FAQ[];
  heading?: string;
  subheading?: string;
}

export function FaqSection({ faqs, heading, subheading }: FaqSectionProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="px-4 py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        {(heading || subheading) && (
          <div className="mb-10 text-center">
            {heading && (
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-3 text-base text-muted-foreground">
                {subheading}
              </p>
            )}
          </div>
        )}
        <Accordion>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
