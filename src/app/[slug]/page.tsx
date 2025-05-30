'use client';

import dynamic from 'next/dynamic';

// Dynamically import the client component
const CityPageContent = dynamic(() => import('@/components/CityPageContent'));

export { generateMetadata, generateStaticParams } from './metadata';

export default function CityPage() {
  return <CityPageContent />;
}
