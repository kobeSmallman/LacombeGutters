'use client';

export type FAQItem = {
  id: number;
  question: string;
  answer: string;
  needsEmail?: boolean;
  contactPage?: boolean;
  category?: string;
};

export interface FAQJsonLdProps {
  faqItems: FAQItem[];
}

export default function FAQJsonLd({ faqItems }: FAQJsonLdProps) {
  // Format FAQ items for JSON-LD
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer.replace(/\*\*(.*?)\*\*/g, '$1')
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
    />
  );
}
