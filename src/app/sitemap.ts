import { MetadataRoute } from 'next';
import { serviceLocations } from '@/lib/locations';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.lacombeguttersltd.com';
  
  // Define services for individual service pages
  const services = [
    '5-inch-gutters',
    '6-inch-gutters', 
    'soffit-fascia',
    'gutter-cleaning',
    'downspouts',
    'industrial-eavestrough'
  ];

  // Priority service area cities that get custom content and higher SEO priority
  const priorityServiceAreas = [
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
  
  // Base pages
  const basePages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/service-areas`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9, // High priority for local SEO
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/why-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/alurex-gutter-systems`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];
  
  // Individual service pages
  const servicePages = services.map(service => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Only P1 and P2 service area pages (exclude P3 from sitemap)
  // P2 cities that have unique researched content
  const p2Cities = ['beaumont', 'stony-plain', 'morinville'];
  
  const indexableServiceAreaPages = serviceLocations
    .filter(location => {
      // Include P1 (priority cities) and P2 (researched content)
      return priorityServiceAreas.includes(location.slug) || p2Cities.includes(location.slug);
    })
    .map(location => ({
      url: `${baseUrl}/service-areas/${location.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: priorityServiceAreas.includes(location.slug) ? 0.8 : 0.7, // P1=0.8, P2=0.7
    }));


  
  return [...basePages, ...servicePages, ...indexableServiceAreaPages];
}
