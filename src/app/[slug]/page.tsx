import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const CityPageContent = dynamic(() => import('@/components/CityPageContent'), {
  ssr: false,
});

export async function generateStaticParams() {
  const citySlugs = [
    'lacombe', 'red-deer', 'blackfalds', 'sylvan-lake', 'ponoka',
    'rimbey', 'bentley', 'alix', 'stettler', 'didsbury',
    'olds', 'innisfail', 'sundre', 'carstairs', 'three-hills',
    'trochu', 'crossfield', 'acme', 'airdrie'
  ];
  
  return citySlugs.map(slug => ({
    slug,
  }));
}

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  // Format the city name for display (e.g., 'red-deer' -> 'Red Deer')
  const cityName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `Gutter Services in ${cityName} | Lacombe Gutters`,
    description: `Professional gutter installation and repair services in ${cityName}, Alberta`,
    openGraph: {
      title: `Gutter Services in ${cityName} | Lacombe Gutters`,
      description: `Professional gutter installation and repair services in ${cityName}, Alberta`,
      type: 'website',
      locale: 'en_CA',
      siteName: 'Lacombe Gutters',
    },
  };
}

export default function CityPage() {
  return <CityPageContent />;
}
