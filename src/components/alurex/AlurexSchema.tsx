"use client";

import Script from 'next/script';

export default function AlurexSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Alurex Continuous Hanger Gutter Systems",
    "description": "Professional Alurex continuous hanger and gutter guard installation in Lacombe, Alberta. DoublePro and T-Rex systems with lifetime warranty.",
    "brand": {
      "@type": "Brand",
      "name": "Alurex"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Alurex"
    },
    "category": "Gutter Systems",
    "image": [
      "https://www.lacombeguttersltd.com/images/alurex/Alurex-DoublePro-D11500-WEB.png",
      "https://www.lacombeguttersltd.com/images/alurex/Alurex-Trex-M5200B95-WEB.png",
      "https://www.lacombeguttersltd.com/images/alurex/Alurex-GutterClean-M5300B95-WEB.png"
    ],
    // NOTE: A fabricated aggregateRating (5/25), a fake "Satisfied Customer" review, and a
    // $0/expired Offer were removed here. Self-authored or invented review/rating markup violates
    // Google's structured-data policy and risks a site-wide manual action. Real, consented reviews
    // should be surfaced through the LocalBusiness entity (behind a data flag) once available.
    "hasVariant": [
      {
        "@type": "ProductModel",
        "name": "DoublePro® Microfiltration Continuous Hanger™",
        "description": "Advanced gutter system with dual-layer perforated aluminum and micro-filtration leaf guard",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Load Capacity",
            "value": "425 lb per linear foot"
          },
          {
            "@type": "PropertyValue",
            "name": "Warranty",
            "value": "Lifetime"
          },
          {
            "@type": "PropertyValue",
            "name": "Features",
            "value": "Dual-layer aluminum, Micro-filtration, Continuous hanger"
          }
        ]
      },
      {
        "@type": "ProductModel",
        "name": "T-Rex® Continuous Hanger™",
        "description": "Ultra-durable gutter system with integrated continuous hanger design",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Load Capacity",
            "value": "250 lb per linear foot"
          },
          {
            "@type": "PropertyValue",
            "name": "Warranty",
            "value": "Lifetime"
          },
          {
            "@type": "PropertyValue",
            "name": "Features",
            "value": "Integrated hanger, Lifetime durability, Professional installation"
          }
        ]
      }
    ]
  };

  return (
    <Script
      id="alurex-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  );
}
