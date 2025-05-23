'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the search component with client-side only rendering
const FAQSearch = dynamic(() => import('./FAQSearch'), {
  ssr: false,
  loading: () => (
    <div className="relative bg-white dark:bg-gray-800 p-8 md:p-12 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-10 w-full max-w-6xl mx-auto">
      <div className="h-[120px] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
    </div>
  )
});

// Client component wrapper
export default function ClientFAQSearch() {
  return <FAQSearch />;
}
