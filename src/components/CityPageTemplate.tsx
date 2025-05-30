import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

interface CityPageTemplateProps {
  city: string;
  province?: string;
  metaDescription: string;
  introParagraph: React.ReactNode;
  commitmentParagraph: React.ReactNode;
  servingParagraph: React.ReactNode;
  nearbyCities: string[];
  features: {
    majorRoads: string[];
    distanceFromLacombe: string;
    localLandmarks: string[];
  };
}

const CityPageTemplate: React.FC<CityPageTemplateProps> = ({
  city,
  province = 'Alberta',
  metaDescription,
  introParagraph,
  commitmentParagraph,
  servingParagraph,
  nearbyCities = [],
  features
}) => {
  const pageTitle = `Gutter Installation in ${city}, ${province} | Lacombe Gutters`;
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(city + ', ' + province)}&zoom=12`;

  // Rotating CTA phrases
  const ctaPhrases = [
    `Book your free quote in ${city} today — no pressure, no gimmicks.`,
    `Need new gutters in ${city}? We're fast, friendly, and fully insured.`,
    `Reach out now for gutter help in ${city} — 40+ years of experience at your service.`,
    `Serving ${city} with pride — call for your free gutter assessment today.`,
    `Your ${city} home deserves the best gutters. Get your free estimate now.`
  ];
  
  const randomCta = ctaPhrases[Math.floor(Math.random() * ctaPhrases.length)];

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${city} gutter installation, ${city} gutter repair, ${city} gutter cleaning, eavestrough ${city}, gutter services ${province}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Professional Gutter Services in {city}, {province}
          </h1>
          <div className="prose lg:prose-xl max-w-4xl">
            {introParagraph}
          </div>
          {features.distanceFromLacombe && (
            <div className="mt-4 text-sm text-gray-600">
              <p>Approximately {features.distanceFromLacombe} from Lacombe</p>
              {features.majorRoads.length > 0 && (
                <p>Near: {features.majorRoads.join(', ')}</p>
              )}
            </div>
          )}
        </section>

        {/* Why Choose Us */}
        <section className="mb-16 bg-gray-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Why Choose Lacombe Gutters in {city}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              '40+ years of combined experience',
              'Fully insured & safety certified',
              'Central Alberta-based, not a chain',
              'Fast service from a local crew',
              'Custom-fit gutters for your home',
              'Free, no-obligation estimates',
              'Quality materials & workmanship',
              'Satisfaction guaranteed'
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 h-6 w-6 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <p className="text-lg">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">
            Gutter Services in {city}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Seamless Gutter Installation',
                description: 'Custom-fit, seamless gutters designed specifically for your home.'
              },
              {
                title: 'Gutter Cleaning & Maintenance',
                description: 'Keep your gutters flowing freely with our professional cleaning services.'
              },
              {
                title: 'Downspout Solutions',
                description: 'Properly directed downspouts to protect your foundation.'
              },
              {
                title: 'Soffit & Fascia Work',
                description: 'Complete protection for your roofline with quality materials.'
              },
              {
                title: 'Seasonal Inspections',
                description: 'Preventative maintenance to catch issues before they become problems.'
              },
              {
                title: 'Emergency Repairs',
                description: '24/7 service for urgent gutter issues that can\'t wait.'
              }
            ].map((service, index) => (
              <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Commitment Section */}
        <section className="mb-16 bg-primary/5 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6">
            Our Commitment to {city} Homeowners
          </h2>
          <div className="prose lg:prose-xl max-w-4xl">
            {commitmentParagraph}
          </div>
        </section>

        {/* Serving Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">
            Serving {city} and Central Alberta with Pride
          </h2>
          <div className="prose lg:prose-xl max-w-4xl mb-8">
            {servingParagraph}
          </div>
          
          {/* Map */}
          <div className="mt-12 h-96 w-full rounded-xl overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={mapUrl}
              allowFullScreen
              loading="lazy"
              title={`Map of ${city}, ${province}`}
            />
          </div>
          
          {/* Nearby Cities */}
          {nearbyCities.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">
                Also Serving These Nearby Communities:
              </h3>
              <div className="flex flex-wrap gap-3">
                {nearbyCities.map((nearbyCity, index) => (
                  <Link 
                    key={index} 
                    href={`/${nearbyCity.toLowerCase().replace(/\s+/g, '-')}-gutters`}
                    className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors"
                  >
                    {nearbyCity}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Protect Your {city} Home?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {randomCta}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="tel:403-598-9137" 
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-colors inline-flex items-center justify-center"
            >
              Call Now: 403-598-9137
            </a>
            <a 
              href="mailto:info@lacombeguttersltd.com" 
              className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg transition-colors inline-flex items-center justify-center"
            >
              Email for Quote
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default CityPageTemplate;
