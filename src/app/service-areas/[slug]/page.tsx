import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { serviceLocations } from '@/lib/locations';
import ServiceAreaPageContent from './ServiceAreaPageContent';

// Priority cities that get custom content and should be indexed
const PRIORITY_CITIES = [
  // P1 cities - main service areas
  'edmonton',
  'red-deer',
  'lacombe', 
  'blackfalds',
  'st-albert',
  'spruce-grove',
  'airdrie',
  'leduc',
  'calgary',
  'penhold',
  'stettler',
  'camrose',
  'wetaskiwin',
  'olds',
  'ponoka',
  'sylvan-lake',
  'nordegg',
  'innisfail',
  // P2 cities - secondary areas with unique content that should be indexed
  'beaumont',
  'stony-plain',
  'morinville'
];

interface Props {
  params: { slug: string };
}

// Generate static params for all service locations
export async function generateStaticParams() {
  return serviceLocations.map((location) => ({
    slug: location.slug,
  }));
}

// Generate metadata for each service area
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = serviceLocations.find(loc => loc.slug === slug);
  
  if (!location) {
    return {
      title: 'Service Area Not Found | Lacombe Gutters',
      description: 'The requested service area could not be found.',
    };
  }

  const isPriority = PRIORITY_CITIES.includes(location.slug);
  const cityName = location.name;
  
  if (isPriority) {
    // Custom SEO for priority cities
    return {
      title: `${cityName} Eavestrough & Gutter Services | Lacombe Gutters`,
      description: `Expert eavestrough and gutter services in ${cityName}, Alberta — installation, cleaning & repairs. 40+ years combined experience. Free estimates, call (403) 598-9137.`,
      keywords: `${cityName} gutters, gutter installation ${cityName}, gutter repair ${cityName}, eavestrough ${cityName}, gutter cleaning ${cityName}, Alberta gutters`,
      openGraph: {
        title: `${cityName} Eavestrough & Gutter Services | Lacombe Gutters`,
        description: `Expert eavestrough and gutter services in ${cityName}. Installation, cleaning & repairs with free estimates.`,
        url: `https://www.lacombeguttersltd.com/service-areas/${slug}`,
        siteName: 'Lacombe Gutters',
        type: 'website',
        images: [
          {
            url: '/images/og-image.jpg',
            width: 1200,
            height: 630,
            alt: `${cityName} Eavestrough & Gutter Services`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${cityName} Eavestrough & Gutter Services | Lacombe Gutters`,
        description: `Expert eavestrough and gutter services in ${cityName}. Installation, cleaning & repairs with free estimates.`,
        images: ['/images/og-image.jpg'],
      },
      alternates: {
        canonical: `https://www.lacombeguttersltd.com/service-areas/${slug}`,
      },
    };
  } else {
    // P3 pages - noindex,follow for thin content
    return {
      title: `${cityName} Gutter Services | Lacombe Gutters`,
      description: `Professional gutter installation and repair services in ${cityName}, Alberta. Serving Central Alberta with 40+ years experience. Free estimates available.`,
      robots: {
        index: false,
        follow: true,
      },
      keywords: `${cityName} gutters, gutter services ${cityName}, eavestrough ${cityName}, Alberta gutters`,
      openGraph: {
        title: `${cityName} Gutter Services | Lacombe Gutters`,
        description: `Professional gutter services in ${cityName}, Alberta. Free estimates available.`,
        url: `https://www.lacombeguttersltd.com/service-areas/${slug}`,
        siteName: 'Lacombe Gutters',
        type: 'website',
      },
      alternates: {
        canonical: `https://www.lacombeguttersltd.com/service-areas/${slug}`,
      },
    };
  }
}

export default async function ServiceAreaPage({ params }: Props) {
  const { slug } = await params;
  const location = serviceLocations.find(loc => loc.slug === slug);
  
  if (!location) {
    notFound();
  }

  const isPriority = PRIORITY_CITIES.includes(location.slug);

  return (
    <ServiceAreaPageContent 
      location={location}
      isPriority={isPriority}
    />
  );
}
