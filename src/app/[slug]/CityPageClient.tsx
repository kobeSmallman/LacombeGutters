'use client';

import { notFound } from 'next/navigation';
import CityPageTemplate from '@/components/CityPageTemplate';

const cityData = [
  // Your existing city data here
  {
    slug: 'lacombe',
    name: 'Lacombe',
    metaDescription: 'Professional gutter installation and repair services in Lacombe, AB',
    intro: 'Serving the Lacombe community since 2013, we specialize in high-quality gutter solutions for both residential and commercial properties.',
    commitment: 'Our team is committed to providing exceptional service and workmanship to protect your home from water damage.',
    serving: 'We serve all of Lacombe and surrounding areas, including Blackfalds and Bentley.',
    nearbyCities: ['Blackfalds (15 min)', 'Bentley (30 min)', 'Red Deer (25 min)'],
    features: {
      majorRoads: ['Hwy 2A', 'Hwy 12', 'Hwy 20'],
      distanceFromLacombe: '0 km',
      localLandmarks: ['Lacombe Memorial Centre', 'Lacombe Golf & Country Club', 'Lacombe Lake']
    },
    province: 'AB',
    specialNote: 'Free estimates available for all Lacombe residents.'
  },
  // Add other cities here...
];

function getCityData(slug: string) {
  return cityData.find(city => city.slug === slug);
}

export default function CityPageClient({ slug }: { slug: string }) {
  const city = getCityData(slug);
  
  if (!city) {
    notFound();
  }

  return (
    <CityPageTemplate
      city={city.name}
      province={city.province}
      metaDescription={city.metaDescription}
      introParagraph={city.intro}
      commitmentParagraph={city.commitment}
      servingParagraph={city.serving}
      nearbyCities={city.nearbyCities}
      features={city.features}
    />
  );
}
