'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CityData } from '@/data/cities';
import CityPageTemplate from '@/components/CityPageTemplate';

export default function CityPageContent() {
  const searchParams = useSearchParams();
  const [city, setCity] = useState<CityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the slug from the URL
    const slug = window.location.pathname.split('/').pop() || '';
    
    // Fetch city data
    const fetchCityData = async () => {
      try {
        const response = await fetch(`/api/cities/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setCity(data);
        } else {
          console.error('City not found');
        }
      } catch (error) {
        console.error('Error fetching city data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">City Not Found</h1>
          <p className="text-gray-600">The requested city could not be found.</p>
        </div>
      </div>
    );
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
}
