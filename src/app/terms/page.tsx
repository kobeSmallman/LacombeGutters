import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Lacombe Gutters Ltd',
  description: 'Terms of service and conditions for Lacombe Gutters Ltd services in Central Alberta.',
  keywords: 'terms of service, conditions, Lacombe Gutters Ltd, Alberta gutter services',
  openGraph: {
    title: 'Terms of Service | Lacombe Gutters Ltd',
    description: 'Terms of service and conditions for Lacombe Gutters Ltd services in Central Alberta.',
    url: 'https://www.lacombeguttersltd.com/terms',
    siteName: 'Lacombe Gutters Ltd',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lacombe Gutters Ltd Terms of Service',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | Lacombe Gutters Ltd',
    description: 'Terms of service and conditions for Lacombe Gutters Ltd services in Central Alberta.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.lacombeguttersltd.com/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Services</h2>
            <p className="mb-6 text-gray-700">
              Lacombe Gutters Ltd provides professional eavestrough and gutter services throughout Central Alberta, 
              including installation, repair, cleaning, and maintenance of residential and commercial properties.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Estimates and Pricing</h2>
            <p className="mb-6 text-gray-700">
              All estimates are provided free of charge and are valid for 30 days unless otherwise specified. 
              Final pricing may vary based on site conditions discovered during the work process.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Payment Terms</h2>
            <p className="mb-6 text-gray-700">
              Payment is due upon completion of work unless other arrangements have been made in writing. 
              We accept cash, check, and major credit cards.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Warranty</h2>
            <p className="mb-6 text-gray-700">
              We provide a warranty on our workmanship. Material warranties are provided by the manufacturer. 
              Specific warranty terms will be discussed during the estimate process.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Liability</h2>
            <p className="mb-6 text-gray-700">
              Lacombe Gutters Ltd is fully insured and bonded. We are not responsible for pre-existing damage 
              or conditions not disclosed at the time of estimate.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Cancellation Policy</h2>
            <p className="mb-6 text-gray-700">
              Work orders may be cancelled up to 24 hours before the scheduled start time without penalty. 
              Cancellations with less than 24 hours notice may be subject to a service charge.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Information</h2>
            <p className="mb-6 text-gray-700">
              For questions about these terms of service, please contact us at:
            </p>
            <ul className="list-disc list-inside mb-6 text-gray-700">
              <li>Phone: (403) 598-9137</li>
              <li>Email: lacombegutters@gmail.com</li>
              <li>Address: 170 112 Queensgate crescent Red Deer, AB, Canada</li>
            </ul>

            <p className="text-sm text-gray-600 mt-8">
              These terms of service are effective as of the date of service and may be updated from time to time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
