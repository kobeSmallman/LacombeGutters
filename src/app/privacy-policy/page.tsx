import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Lacombe Gutters Ltd',
  description: 'Privacy policy for Lacombe Gutters Ltd - how we collect, use, and protect your personal information.',
  keywords: 'privacy policy, data protection, Lacombe Gutters Ltd, personal information',
  openGraph: {
    title: 'Privacy Policy | Lacombe Gutters Ltd',
    description: 'Privacy policy for Lacombe Gutters Ltd - how we collect, use, and protect your personal information.',
    url: 'https://www.lacombeguttersltd.com/privacy-policy',
    siteName: 'Lacombe Gutters Ltd',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lacombe Gutters Ltd Privacy Policy',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Lacombe Gutters Ltd',
    description: 'Privacy policy for Lacombe Gutters Ltd - how we collect, use, and protect your personal information.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.lacombeguttersltd.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6 text-gray-700">
              Effective Date: January 1, 2024
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
            <p className="mb-4 text-gray-700">We collect information you provide directly to us, including:</p>
            <ul className="list-disc list-inside mb-6 text-gray-700">
              <li>Contact information (name, email, phone number, address)</li>
              <li>Property details for service estimates</li>
              <li>Payment information for completed services</li>
              <li>Communication preferences</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4 text-gray-700">We use the information we collect to:</p>
            <ul className="list-disc list-inside mb-6 text-gray-700">
              <li>Provide estimates and complete requested services</li>
              <li>Communicate with you about your service requests</li>
              <li>Send service reminders and maintenance notifications</li>
              <li>Process payments and maintain business records</li>
              <li>Improve our services and customer experience</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Information Sharing</h2>
            <p className="mb-6 text-gray-700">
              We do not sell, trade, or rent your personal information to third parties. We may share information only:
            </p>
            <ul className="list-disc list-inside mb-6 text-gray-700">
              <li>With service providers who assist in our business operations</li>
              <li>When required by law or legal process</li>
              <li>To protect our rights, property, or safety</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
            <p className="mb-6 text-gray-700">
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Retention</h2>
            <p className="mb-6 text-gray-700">
              We retain your personal information for as long as necessary to provide services and comply with legal 
              obligations. Business records are typically maintained for 7 years as required by law.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
            <p className="mb-4 text-gray-700">You have the right to:</p>
            <ul className="list-disc list-inside mb-6 text-gray-700">
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate information</li>
              <li>Request deletion of your information (where legally permissible)</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Cookies and Website Analytics</h2>
            <p className="mb-6 text-gray-700">
              Our website may use cookies to improve user experience and analyze website traffic. You can control 
              cookie settings through your browser preferences.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Us</h2>
            <p className="mb-4 text-gray-700">
              If you have questions about this privacy policy or wish to exercise your rights, please contact us:
            </p>
            <ul className="list-disc list-inside mb-6 text-gray-700">
              <li>Phone: (403) 598-9137</li>
              <li>Email: lacombegutters@gmail.com</li>
              <li>Address: 170 112 Queensgate crescent Red Deer, AB, Canada</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Changes to This Policy</h2>
            <p className="mb-6 text-gray-700">
              We may update this privacy policy from time to time. We will notify you of any material changes by 
              posting the new policy on our website with an updated effective date.
            </p>

            <p className="text-sm text-gray-600 mt-8">
              This privacy policy was last updated on January 1, 2024.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
