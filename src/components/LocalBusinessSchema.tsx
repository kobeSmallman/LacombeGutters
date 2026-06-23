import { serviceLocations } from '@/lib/locations';
import { SERVICES, SITE_NAME, SITE_DESCRIPTION, CONTACT_PHONE_ROB, CONTACT_ADDRESS } from '@/lib/constants';

// Stable @id for the business entity so other JSON-LD blocks (Service, Breadcrumb, FAQ, Product)
// can reference one canonical node instead of being disconnected islands.
export const BUSINESS_ID = 'https://www.lacombeguttersltd.com/#business';

interface LocalBusinessSchemaProps {
  // Optional overrides for specific pages
  pageType?: 'HomePage' | 'AboutPage' | 'ContactPage' | 'ServicesPage' | 'LocationPage';
  currentLocation?: string;
}

// Define the schema type to include all possible properties
interface SchemaType {
  '@context': string;
  '@type': string;
  '@id': string;
  name: string;
  alternateName: string[];
  description: string;
  url: string;
  telephone: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo: {
    '@type': string;
    latitude: string;
    longitude: string;
  };
  image: string;
  priceRange: string;
  openingHoursSpecification: {
    '@type': string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  };
  sameAs: string[];
  areaServed: Array<{
    '@type': string;
    name: string;
    containedInPlace: {
      '@type': string;
      name: string;
    };
  }>;
  hasOfferCatalog: {
    '@type': string;
    name: string;
    itemListElement: Array<{
      '@type': string;
      itemOffered: {
        '@type': string;
        name: string;
        areaServed: {
          '@type': string;
          name: string;
        };
      };
    }>;
  };
  mainEntityOfPage?: {
    '@type': string;
    '@id': string;
    name: string;
    description: string;
  };
}

/**
 * Injects LocalBusiness (HomeAndConstructionBusiness) structured data for search engines.
 *
 * This is a SERVER component: the JSON-LD is rendered into the initial HTML via a <script> tag
 * (the same pattern as FAQSchema/Breadcrumbs) so crawlers and AI scrapers reliably see it. It was
 * previously injected client-side in a useEffect, which left it absent from the server HTML.
 *
 * The business carries a stable @id (BUSINESS_ID) and an alternateName array ("also known as"),
 * and areaServed covers every service location — including both Lacombe and Red Deer — so neither
 * city's relevance is de-emphasised.
 */
export default function LocalBusinessSchema({
  pageType = 'HomePage',
  currentLocation,
}: LocalBusinessSchemaProps) {
  const schema: SchemaType = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': BUSINESS_ID,
    'name': SITE_NAME,
    'alternateName': ['Lacombe Gutters Ltd'],
    'description': SITE_DESCRIPTION,
    'url': 'https://www.lacombeguttersltd.com/',
    'telephone': CONTACT_PHONE_ROB,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': CONTACT_ADDRESS.split(',')[0],
      'addressLocality': 'Red Deer',
      'addressRegion': 'AB',
      'addressCountry': 'CA',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '52.269',
      'longitude': '-113.811',
    },
    'image': 'https://www.lacombeguttersltd.com/images/logo.png',
    'priceRange': '$$',
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '08:00',
      'closes': '17:00',
    },
    'sameAs': [
      'https://www.facebook.com/lacombegutters',
    ],
    'areaServed': serviceLocations.map((location) => ({
      '@type': 'City',
      'name': location.name,
      'containedInPlace': {
        '@type': 'AdministrativeArea',
        'name': 'Alberta',
      },
    })),
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Eavestrough & Gutter Services',
      'itemListElement': SERVICES.map((service) => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': service,
          'areaServed': {
            '@type': 'State',
            'name': 'Alberta',
          },
        },
      })),
    },
  };

  // Add location-specific data if we're on a location page
  if (pageType === 'LocationPage' && currentLocation) {
    const location = serviceLocations.find((loc) => loc.slug === currentLocation);
    if (location) {
      schema.mainEntityOfPage = {
        '@type': 'WebPage',
        '@id': `https://www.lacombeguttersltd.com/service-areas/${location.slug}`,
        'name': `Eavestrough & Gutter Services in ${location.name}, Alberta`,
        'description': `Professional eavestrough, gutter, soffit, and fascia services in ${location.name}. 40+ years of combined experience serving ${location.name} and surrounding areas.`,
      };
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
