'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface CityFAQSectionProps {
  faqs: FAQItem[];
  cityName: string;
}

export default function CityFAQSection({ faqs, cityName }: CityFAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.replace(/\*\*(.*?)\*\*/g, '$1'),
      },
    })),
  };

  return (
    <section className="relative py-20 bg-white bg-[url('/images/textures/paper-fiber.png')] bg-white/95">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-4">
              <span className="h-1 w-12 bg-secondary mr-3" />
              <span className="text-sm font-semibold tracking-wider text-primary uppercase">FAQ</span>
              <span className="h-1 w-12 bg-secondary ml-3" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-primary">
              Common Questions From {cityName} Homeowners
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold font-heading text-gray-900 pr-4 text-lg">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
