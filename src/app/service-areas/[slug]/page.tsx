import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { serviceLocations } from '@/lib/locations';
import ServiceAreaPageContent from './ServiceAreaPageContent';

// Priority cities that get custom content
const PRIORITY_CITIES = [
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
  'innisfail'
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
      title: `${cityName} Gutter Installation & Repair | Lacombe Gutters`,
      description: `Professional gutter installation, repair & cleaning services in ${cityName}, Alberta. Free estimates, 40+ years experience. Call (403) 598-9137 today!`,
      keywords: `${cityName} gutters, gutter installation ${cityName}, gutter repair ${cityName}, eavestrough ${cityName}, gutter cleaning ${cityName}, Alberta gutters`,
      openGraph: {
        title: `${cityName} Gutter Services | Lacombe Gutters`,
        description: `Expert gutter installation and repair in ${cityName}. Free estimates and professional service.`,
        url: `https://www.lacombeguttersltd.com/service-areas/${slug}`,
        siteName: 'Lacombe Gutters',
        type: 'website',
        images: [
          {
            url: '/images/og-image.jpg',
            width: 1200,
            height: 630,
            alt: `${cityName} Gutter Services`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${cityName} Gutter Services | Lacombe Gutters`,
        description: `Expert gutter installation and repair in ${cityName}. Free estimates and professional service.`,
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
