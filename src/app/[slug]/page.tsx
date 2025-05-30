'use client';

import dynamic from 'next/dynamic';

// Dynamically import the client component
const CityPageContent = dynamic(() => import('@/components/CityPageContent'));

export default function CityPage() {
  return <CityPageContent />;
}
