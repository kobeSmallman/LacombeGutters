import { FAQConfig } from "@/content/faq";

export default function FAQSchema() {
  const { faq } = FAQConfig;
  
  // Format FAQ items for JSON-LD (limit to 25 as per recommendation)
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.slice(0, 25).map(item => ({
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
