import { notFound, redirect } from 'next/navigation';
import { cities } from '@/data/cities';

// Disable static generation for this page
export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    city: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ params }: PageProps) {
  // Handle case where params or params.city is undefined during build
  if (!params?.city) {
    notFound();
  }
  
  try {
    // Convert the URL-encoded city name to a format that matches our slugs
    const citySlug = params.city.toLowerCase().replace(/-gutters$/, '');
    
    // Find the matching city
    const city = cities.find(c => c.slug === citySlug);
    
    if (!city) {
      notFound();
    }
    
    // Redirect to the canonical URL format using the city's slug
    redirect(`/${city.slug}`);
  } catch (error) {
    console.error('Error processing city page:', error);
    notFound();
  }
}