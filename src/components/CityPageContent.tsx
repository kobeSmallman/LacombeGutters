'use client';

import { useParams } from 'next/navigation';
import CityPageTemplate from '@/components/CityPageTemplate';

// City data with unique details for each location
const cityData = [
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
  // ... other city data remains the same ...
];

export default function CityPageContent() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const city = cityData.find(c => c.slug === slug);

  if (!city) {
    return <div>City not found</div>;
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
      features={{
        majorRoads: city.features.majorRoads,
        distanceFromLacombe: city.features.distanceFromLacombe,
        localLandmarks: city.features.localLandmarks
      }}
    />
  );
}
