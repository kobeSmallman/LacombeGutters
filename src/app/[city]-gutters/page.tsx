import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CityPageTemplate from '@/components/CityPageTemplate';
import { cityData } from '@/data/cityData';

// Generate metadata for each city page
export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const citySlug = `${params.city}-gutters`;
  const city = cityData.find(c => c.slug === citySlug);
  
  if (!city) {
    return {
      title: 'Page Not Found',
      description: 'The requested city page does not exist.'
    };
  }
  
  return {
    title: `Gutter Installation in ${city.name} | Lacombe Gutters`,
    description: city.metaDescription,
    openGraph: {
      title: `Gutter Installation in ${city.name} | Lacombe Gutters`,
      description: city.metaDescription,
      type: 'website',
    }
  };
}

// Pre-render all city pages at build time
export async function generateStaticParams() {
  return cityData.map(city => ({
    city: city.slug.replace('-gutters', '')
  }));
}

export default async function CityPage({ params }: { params: { city: string } }) {
  const citySlug = `${params.city}-gutters`;
  const city = cityData.find(c => c.slug === citySlug);
  
  // If city not found, show 404
  if (!city) {
    notFound();
  }
  
  return (
    <CityPageTemplate
      city={city.name}
      province={city.province}
      metaDescription={city.metaDescription}
      introParagraph={<div dangerouslySetInnerHTML={{ __html: city.intro }} />}
      commitmentParagraph={<div dangerouslySetInnerHTML={{ __html: city.commitment }} />}
      servingParagraph={<div dangerouslySetInnerHTML={{ __html: city.serving }} />}
      nearbyCities={city.nearbyCities}
      features={{
        majorRoads: city.features.majorRoads,
        distanceFromLacombe: city.features.distanceFromLacombe,
        localLandmarks: city.features.localLandmarks
      }}
    />
  );
}
