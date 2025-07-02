import { Suspense } from 'react';
import FAQContent from './FAQContent';

// Import metadata for SEO
export { metadata } from './metadata';

export default function FAQPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-16 w-16 bg-blue-200 rounded-full mx-auto mb-4"></div>
          <div className="h-8 bg-blue-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-blue-200 rounded w-96 mx-auto"></div>
        </div>
      </div>
    }>
      <FAQContent />
    </Suspense>
  );
}
