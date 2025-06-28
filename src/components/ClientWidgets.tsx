'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Client-side only wrapper for widgets that need browser APIs
const QuoteRequestWidget = dynamic(() => import('./QuoteRequestWidget'), {
  ssr: false,
});

export default function ClientWidgets() {
  return <QuoteRequestWidget />;
}
