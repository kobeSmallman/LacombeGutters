'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the FAQContent component with no SSR
const FAQContent = dynamic(() => import('./FAQContent'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="h-16 w-16 bg-amber-200 dark:bg-amber-800 rounded-full mx-auto mb-4"></div>
        <div className="h-8 bg-amber-200 dark:bg-amber-800 rounded w-64 mx-auto mb-4"></div>
        <div className="h-4 bg-amber-200 dark:bg-amber-800 rounded w-96 mx-auto"></div>
      </div>
    </div>
  )
});

export default function FAQPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-16 w-16 bg-amber-200 dark:bg-amber-800 rounded-full mx-auto mb-4"></div>
          <div className="h-8 bg-amber-200 dark:bg-amber-800 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-amber-200 dark:bg-amber-800 rounded w-96 mx-auto"></div>
        </div>
      </div>
    }>
      <FAQContent />
    </Suspense>
  );
}
