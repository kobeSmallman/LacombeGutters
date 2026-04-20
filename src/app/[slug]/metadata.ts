import { Metadata } from 'next';

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  // Format the city name for display (e.g., 'red-deer' -> 'Red Deer')
  const cityName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${cityName} Eavestrough & Gutter Services | Lacombe Gutters`,
    description: `Professional eavestrough and gutter installation, cleaning, and repair in ${cityName}, Alberta. Free estimates.`,
    openGraph: {
      title: `${cityName} Eavestrough & Gutter Services | Lacombe Gutters`,
      description: `Professional eavestrough and gutter installation, cleaning, and repair in ${cityName}, Alberta. Free estimates.`,
      type: 'website',
      locale: 'en_CA',
      siteName: 'Lacombe Gutters',
    },
  };
}

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
