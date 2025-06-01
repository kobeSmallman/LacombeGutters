'use client';

import { useEffect } from 'react';
import { serviceLocations } from '@/lib/locations';
import { SERVICES, SITE_NAME, SITE_DESCRIPTION, CONTACT_PHONE_ROB, CONTACT_ADDRESS } from '@/lib/constants';

interface LocalBusinessSchemaProps {
  // Optional overrides for specific pages
  pageType?: 'HomePage' | 'AboutPage' | 'ContactPage' | 'ServicesPage' | 'LocationPage';
  currentLocation?: string;
}

// Define the schema type to include all possible properties
interface SchemaType {
  '@context': string;
  '@type': string;
  name: string;
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
 * This component injects structured data for search engines without affecting visual design
 * It helps with local SEO across all 100+ service locations
 * 
 * This is a legitimate SEO technique recommended by Google called "Structured Data Markup"
 * It won't get your site penalized as it's following schema.org standards
 */
export default function LocalBusinessSchema({ 
  pageType = 'HomePage',
  currentLocation
}: LocalBusinessSchemaProps) {
  
  useEffect(() => {
    // Create the JSON-LD schema data
    const schema: SchemaType = {
      '@context': 'https://schema.org',
      '@type': 'HomeAndConstructionBusiness',
      'name': SITE_NAME,
      'description': SITE_DESCRIPTION,
      'url': 'https://www.lacombeguttersltd.com/',
      'telephone': CONTACT_PHONE_ROB,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': CONTACT_ADDRESS.split(',')[0],
        'addressLocality': 'Red Deer',
        'addressRegion': 'Alberta',
        'addressCountry': 'CA'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': '52.269',
        'longitude': '-113.811'
      },
      'image': 'https://www.lacombeguttersltd.com/images/logo.png',
      'priceRange': '$$',
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
        ],
        'opens': '08:00',
        'closes': '17:00'
      },
      'sameAs': [
        'https://www.facebook.com/lacombegutters',
      ],
      'areaServed': serviceLocations.map(location => ({
        '@type': 'City',
        'name': location.name,
        'containedInPlace': {
          '@type': 'AdministrativeArea',
          'name': 'Alberta'
        }
      })),
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Gutter Services',
        'itemListElement': SERVICES.map(service => ({
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': service,
            'areaServed': {
              '@type': 'State',
              'name': 'Alberta'
            }
          }
        }))
      }
    };

    // Add location-specific data if we're on a location page
    if (pageType === 'LocationPage' && currentLocation) {
      const location = serviceLocations.find(loc => loc.slug === currentLocation);
      if (location) {
        schema.mainEntityOfPage = {
          '@type': 'WebPage',
          '@id': `https://www.lacombeguttersltd.com/locations/${location.slug}`,
          'name': `Eavestrough & Gutter Services in ${location.name}, Alberta`,
          'description': `Professional eavestrough, gutter, soffit, and fascia services in ${location.name}. 40+ years of combined experience serving ${location.name} and surrounding areas.`
        };
      }
    }

    // Insert the schema into the document head
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      // Clean up
      document.head.removeChild(script);
    };
  }, [pageType, currentLocation]);

  // This component doesn't render anything visible
  return null;
}
