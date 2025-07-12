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
    "offers": {
      "@type": "Offer",
      "priceCurrency": "CAD",
      "price": "0",
      "priceValidUntil": "2024-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Lacombe Gutters Ltd",
        "url": "https://www.lacombeguttersltd.com",
        "telephone": "+1-403-598-9137",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "170 112 Queensgate crescent",
          "addressLocality": "Red Deer",
          "addressRegion": "AB",
          "postalCode": "T4R 0L8",
          "addressCountry": "CA"
        }
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "25"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Satisfied Customer"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Excellent Alurex continuous hanger installation. The system is incredibly strong and the leaf guard works perfectly."
      }
    ],
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
