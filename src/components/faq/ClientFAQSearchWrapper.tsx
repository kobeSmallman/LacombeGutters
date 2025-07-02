'use client';

import dynamic from 'next/dynamic';

// Client-side wrapper for FAQ search - separate from main SSR content
const ClientFAQSearch = dynamic(() => import('@/components/faq/ClientFAQSearch'), {
  ssr: false,
  loading: () => (
    <div className="h-16 bg-white/50 rounded-lg border border-gray-200 animate-pulse"></div>
  )
});

export default function ClientFAQSearchWrapper() {
  return <ClientFAQSearch />;
}
