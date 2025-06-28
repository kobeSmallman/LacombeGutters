import { SITE_NAME, CONTACT_PHONE_ROB, CONTACT_EMAIL, FACEBOOK_URL } from '@/lib/constants';
import type { LocationData } from '@/lib/location-utils';

interface LocalBusinessSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  image: string[];
  description: string;
  telephone: string;
  email: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo?: {
    "@type": string;
    latitude: number;
    longitude: number;
  };
  areaServed: {
    "@type": string;
    name: string;
  }[];
  sameAs: string[];
  openingHours: string[];
  priceRange: string;
  serviceType: string[];
}

/**
 * Build LocalBusiness JSON-LD schema
 */
export function buildLocalBusinessSchema(location?: LocationData): LocalBusinessSchema {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://www.lacombegutters.com' 
    : 'http://localhost:3000';

  const schema: LocalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: location ? `${SITE_NAME} - ${location.name}` : SITE_NAME,
    url: location ? `${baseUrl}/service-areas/${location.slug}` : baseUrl,
    logo: `${baseUrl}/images/logos/logo.png`,
    image: [
      `${baseUrl}/images/gallery/ModernHouse.png`,
      `${baseUrl}/images/gallery/LadderWorker.png`,
      `${baseUrl}/images/banners/truck.png`
    ],
    description: location 
      ? location.description
      : "Professional eavestrough, soffit, fascia, and gutter services across central Alberta. 40+ years of combined experience.",
    telephone: CONTACT_PHONE_ROB,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "170 112 Queensgate crescent",
      addressLocality: "Red Deer",
      addressRegion: "AB",
      addressCountry: "CA"
    },
    areaServed: [
      { "@type": "City", name: "Red Deer" },
      { "@type": "City", name: "Lacombe" },
      { "@type": "City", name: "Blackfalds" },
      { "@type": "City", name: "Sylvan Lake" },
      { "@type": "City", name: "Spruce Grove" },
      { "@type": "City", name: "Leduc" },
      { "@type": "City", name: "Beaumont" },
      { "@type": "City", name: "St. Albert" },
      { "@type": "City", name: "Sherwood Park" },
      { "@type": "City", name: "Fort Saskatchewan" }
    ],
    sameAs: [FACEBOOK_URL],
    openingHours: [
      "Mo-Fr 08:00-17:00",
      "Sa 09:00-15:00"
    ],
    priceRange: "$$",
    serviceType: [
      "Eavestrough Installation",
      "Gutter Cleaning",
      "Soffit and Fascia",
      "Downspout Installation",
      "Gutter Repair"
    ]
  };

  // Add geo coordinates if location is provided
  if (location?.coordinates) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng
    };
  }

  return schema;
}

/**
 * Build FAQ JSON-LD schema
 */
export function buildFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What areas do you service?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We provide eavestrough and gutter services throughout central Alberta, including Red Deer, Lacombe, Blackfalds, Sylvan Lake, Spruce Grove, Leduc, Beaumont, St. Albert, Sherwood Park, and Fort Saskatchewan."
        }
      },
      {
        "@type": "Question", 
        name: "Do you provide free estimates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide free estimates for all our eavestrough and gutter services. Contact us by phone or through our website to schedule your free consultation."
        }
      },
      {
        "@type": "Question",
        name: "What services do you offer?",
        acceptedAnswer: {
          "@type": "Answer", 
          text: "We offer complete eavestrough services including 5\" and 6\" gutters (aluminum & steel), downspouts, soffit & fascia installation, gutter cleaning, and industrial-scale eavestrough systems."
        }
      }
    ]
  };
}
