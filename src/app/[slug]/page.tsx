import { notFound } from 'next/navigation';
import { cities } from '@/data/cities';
import CityPageTemplate from '@/components/CityPageTemplate';

// Disable static generation for this page
export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static params at build time
export async function generateStaticParams() {
  try {
    return cities.map((city) => ({
      slug: city.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function Page({ params }: PageProps) {
  // Handle case where params or params.slug is undefined
  if (!params?.slug) {
    notFound();
  }

  try {
    const city = cities.find((c) => c.slug === params.slug);

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
  } catch (error) {
    console.error('Error rendering city page:', error);
    notFound();
  }
}
