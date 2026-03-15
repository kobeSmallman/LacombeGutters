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

// Cities demoted to noindex — pages still render but Google doesn't index them
const NOINDEX_OVERRIDES = ['spruce-grove', 'st-albert'];

// City-specific metadata for unique titles and descriptions
const CITY_META: Record<string, { title: string; description: string }> = {
  'red-deer': {
    title: "Red Deer Eavestrough & Gutter Services — Installation, Cleaning & Repair | Lacombe Gutters",
    description: "Central Alberta's full-service gutter company based in Red Deer. Seamless 5\" and 6\" installation, cleaning, hail damage repair, and emergency service. Free estimates — call (403) 598-9137.",
  },
  'edmonton': {
    title: "Edmonton Eavestrough Installation, Cleaning & Repair | Lacombe Gutters",
    description: "Specialized gutter systems for Edmonton homes — heritage rooflines, multi-storey installs, and extreme winter solutions. Fully insured, 5-year warranty. Free estimates.",
  },
  'calgary': {
    title: "Calgary Gutter Services — Hail Damage Repair & Installation | Lacombe Gutters",
    description: "Hail damage gutter replacement and insurance claim support for Calgary homeowners. Steel and aluminum systems built for Alberta's hail capital. Free estimates.",
  },
  'airdrie': {
    title: "Airdrie Gutter Installation — New Builds & Upgrades | Lacombe Gutters",
    description: "Gutter installation for Airdrie's new subdivisions and upgrades for established homes. Builder coordination, colour matching, and seamless eavestrough. Free estimates.",
  },
  'leduc': {
    title: "Leduc Gutter Services — Foundation Protection & Drainage | Lacombe Gutters",
    description: "Gutter and downspout solutions designed for Leduc's flat terrain and clay soil. Proper drainage routing to protect your foundation. Free estimates — call (403) 598-9137.",
  },
  'lacombe': {
    title: "Lacombe Eavestrough & Gutter Services — Your Local Experts | Lacombe Gutters",
    description: "Lacombe's hometown gutter company. Same-day availability, personal service, and the fastest response times in our service area. Free estimates — call (403) 598-9137.",
  },
  'sylvan-lake': {
    title: "Sylvan Lake Gutter Services — Lakefront & Residential | Lacombe Gutters",
    description: "Gutter systems built for Sylvan Lake's lakeside conditions — moisture exposure, wind-driven rain, and seasonal demand. Free estimates, no distance charges.",
  },
  'camrose': {
    title: "Camrose Gutter Installation, Cleaning & Repair | Lacombe Gutters",
    description: "Upgrading aging gutter systems and maintaining established Camrose homes. Assessment, replacement, and cleaning services. Free estimates available.",
  },
};

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

  const isPriority = PRIORITY_CITIES.includes(location.slug) && !NOINDEX_OVERRIDES.includes(location.slug);
  const isNoindexOverride = NOINDEX_OVERRIDES.includes(location.slug);
  const cityName = location.name;
  const cityMeta = CITY_META[location.slug];

  if (isPriority) {
    const title = cityMeta?.title || `${cityName} Eavestrough & Gutter Services | Lacombe Gutters`;
    const description = cityMeta?.description || `Expert eavestrough and gutter services in ${cityName}, Alberta — installation, cleaning & repairs. 40+ years combined experience. Free estimates, call (403) 598-9137.`;

    return {
      title,
      description,
      keywords: `${cityName} gutters, gutter installation ${cityName}, gutter repair ${cityName}, eavestrough ${cityName}, gutter cleaning ${cityName}, Alberta gutters`,
      openGraph: {
        title,
        description,
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
        title,
        description,
        images: ['/images/og-image.jpg'],
      },
      alternates: {
        canonical: `https://www.lacombeguttersltd.com/service-areas/${slug}`,
      },
    };
  } else {
    // P3 pages and noindex overrides — noindex,follow
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
        canonical: isNoindexOverride ? undefined : `https://www.lacombeguttersltd.com/service-areas/${slug}`,
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

  const isPriority = PRIORITY_CITIES.includes(location.slug) && !NOINDEX_OVERRIDES.includes(location.slug);

  return (
    <ServiceAreaPageContent
      location={location}
      isPriority={isPriority}
    />
  );
}
