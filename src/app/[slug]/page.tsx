import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Use dynamic import for the template to avoid SSR issues
const CityPageTemplate = dynamic(
  () => import('@/components/CityPageTemplate'),
  { ssr: false }
);

// Generate metadata for each city page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { getCityData } = await import('@/data/cityData');
  const city = getCityData(params.slug);
  
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
  const { cityData } = await import('@/data/cityData');
  return cityData.map(city => ({
    slug: city.slug
  }));
}

export default async function CityPage({ params }: { params: { slug: string } }) {
  const { getCityData } = await import('@/data/cityData');
  const city = getCityData(params.slug);
  
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
