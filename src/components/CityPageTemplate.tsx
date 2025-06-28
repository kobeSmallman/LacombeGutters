import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { MapPin, HardHat, Shield, Wrench, Phone } from 'lucide-react';
import { QuoteRequestWidget } from '@/components/ui/quote-request-widget';

// Metal strip component for section dividers
const MetalStrip = ({ className = '' }) => (
  <div className={`h-2 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 border-t border-b border-gray-800 ${className}`}>
    <div className="h-full w-full bg-[linear-gradient(90deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)]"></div>
  </div>
);

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
  nearbyCities = []
}) => {
  const pageTitle = `Gutter Installation in ${city}, ${province} | Lacombe Gutters`;
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(city + ', ' + province)}&zoom=12`;

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
        <section className="mb-16 relative bg-white dark:bg-white rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5 dark:opacity-[0.05]"></div>
          <div className="screw-corner screw-top-left"></div>
          <div className="screw-corner screw-top-right"></div>
          <div className="screw-corner screw-bottom-left"></div>
          <div className="screw-corner screw-bottom-right"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Professional Gutter Services in {city}, {province}
            </h1>
            <div className="prose lg:prose-xl max-w-4xl text-gray-800">
              {introParagraph}
            </div>
          </div>
        </section>

        <MetalStrip className="my-12" />
        
        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900 relative">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5 dark:opacity-[0.02]"></div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose Lacombe Gutters in {city}
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto"></div>
            </div>
            
            <div className="relative bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="screw-corner screw-top-left"></div>
              <div className="screw-corner screw-top-right"></div>
              <div className="screw-corner screw-bottom-left"></div>
              <div className="screw-corner screw-bottom-right"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { text: '40+ years of combined experience', icon: '👷' },
                  { text: 'Fully insured & safety certified', icon: '📋' },
                  { text: 'Central Alberta-based, not a chain', icon: '🏠' },
                  { text: 'Fast service from a local crew', icon: '⚡' },
                  { text: 'Custom-fit gutters for your home', icon: '📏' },
                  { text: 'Free, no-obligation estimates', icon: '💰' },
                  { text: 'Quality materials & workmanship', icon: '🔧' },
                  { text: 'Satisfaction guaranteed', icon: '✅' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="text-gray-700 dark:text-gray-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <MetalStrip className="my-12" />
        
        {/* Services Section */}
        <section className="mb-16 relative">
          <div className="container mx-auto px-4">
            <div className="relative bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="screw-corner screw-top-left"></div>
              <div className="screw-corner screw-top-right"></div>
              <div className="screw-corner screw-bottom-left"></div>
              <div className="screw-corner screw-bottom-right"></div>
              
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-1 rounded-full font-bold text-sm z-10">
                OUR SERVICES
              </div>
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
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
                  <div key={index} className="relative bg-gray-100/80 dark:bg-gray-700/80 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all transform hover:-translate-y-1 group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <MetalStrip className="my-12" />
        
        {/* Commitment Section */}
        <section className="mb-16 relative">
          <div className="container mx-auto px-4">
            <div className="relative bg-white dark:bg-gray-800/80 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="absolute top-4 right-4 text-primary">
                <Shield className="h-12 w-12 opacity-20" />
              </div>
              <div className="screw-corner screw-top-left"></div>
              <div className="screw-corner screw-top-right"></div>
              <div className="screw-corner screw-bottom-left"></div>
              <div className="screw-corner screw-bottom-right"></div>
              
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Our Commitment to {city} Homeowners
              </h2>
              <div className="prose lg:prose-xl max-w-4xl text-gray-700 dark:text-gray-300">
                {commitmentParagraph}
              </div>
            </div>
          </div>
        </section>

        <MetalStrip className="my-12" />
        
        {/* Service Area Section */}
        <section className="mb-16 relative">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-1 overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Screw corners */}
            <div className="screw-corner screw-top-left"></div>
            <div className="screw-corner screw-top-right"></div>
            <div className="screw-corner screw-bottom-left"></div>
            <div className="screw-corner screw-bottom-right"></div>
            
            <div className="p-6 md:p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center bg-primary/10 dark:bg-primary/20 px-6 py-2 rounded-full mb-4">
                  <MapPin className="h-5 w-5 text-primary dark:text-primary-300 mr-2" />
                  <span className="font-bold text-primary dark:text-primary-100">SERVICE AREA</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Serving {city} and Central Alberta with Pride
                </h2>
                <div className="w-24 h-1 bg-primary dark:bg-primary-400 mx-auto my-4 rounded-full"></div>
              </div>
              
              <div className="prose dark:prose-invert max-w-4xl mx-auto mb-8">
                {servingParagraph}
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Our Service Area Includes:
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[...nearbyCities, city].map((area, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-2 w-2 rounded-full bg-primary dark:bg-primary-400 mt-2"></div>
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">{area}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6">
                    <Link 
                      href="/service-areas" 
                      className="inline-flex items-center text-primary dark:text-primary-300 font-medium hover:underline"
                    >
                      View detailed service area map
                      <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
                
                {/* Map */}
                <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600 shadow-inner h-64 md:h-80">
                  <div className="relative w-full h-full rounded-md overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={mapUrl}
                      allowFullScreen
                      loading="lazy"
                      title={`Map of ${city}, ${province}`}
                      className="rounded-md"
                    />
                  </div>
                </div>
              </div>
              
              {/* Nearby Cities */}
              {nearbyCities.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                    We Also Serve These Nearby Communities:
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                    {nearbyCities.map((nearbyCity, index) => (
                      <Link 
                        key={index} 
                        href={`/${nearbyCity.toLowerCase().replace(/\s+/g, '-')}-gutters`}
                        className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-full text-sm font-medium transition-colors shadow-sm"
                      >
                        <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary dark:text-primary-300" />
                        {nearbyCity}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <MetalStrip className="my-12" />
        
        {/* Quote Request Widget */}
        <div className="relative bg-gray-100 p-1 rounded-2xl mb-12">
          {/* Outer grey box with screws */}
          <div className="screw-corner screw-top-left"></div>
          <div className="screw-corner screw-top-right"></div>
          <div className="screw-corner screw-bottom-left"></div>
          <div className="screw-corner screw-bottom-right"></div>
          
          <section className="bg-white dark:bg-gray-800 rounded-xl p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                Request a Free Quote in {city}
              </h2>
              <div style={{color: "black"}} className="mb-6 text-center text-gray-700">
                <p style={{color: "black"}}>
                  Fill out this short form for a no-obligation quote for your {city} property
                </p>
              </div>
              <QuoteRequestWidget />
            </div>
          </section>
        </div>
        
        {/* CTA Section */}
        <div className="relative bg-gray-100 p-1 rounded-2xl mt-12">
          {/* Outer grey box with screws */}
          <div className="screw-corner screw-top-left"></div>
          <div className="screw-corner screw-top-right"></div>
          <div className="screw-corner screw-bottom-left"></div>
          <div className="screw-corner screw-bottom-right"></div>
          
          <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-.895-3-2-3-3 1.343-3 3 1.343 3 2 3zm63 31c1.657 0 3-1.343 3-3s-.895-3-2-3-3 1.343-3 3 1.343 3 2 3zM34 90c1.657 0 3-1.343 3-3s-.895-3-2-3-3 1.343-3 3 1.343 3 2 3zm56-76c1.657 0 3-1.343 3-3s-.895-3-2-3-3 1.343-3 3 1.343 3 2 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%239C92AC\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                backgroundSize: '100px 100px',
                backgroundPosition: '0 0, 50px 50px',
                backgroundRepeat: 'repeat',
                filter: 'contrast(1.2) brightness(1.2)'
              }}></div>
            </div>
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary/10 rounded-full"></div>
            <div className="absolute -left-12 -top-12 w-64 h-64 bg-primary/5 rounded-full"></div>
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary/10 rounded-full"></div>
            <div className="absolute -left-12 -top-12 w-64 h-64 bg-primary/5 rounded-full"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center bg-primary/20 px-6 py-2 rounded-full mb-6">
                <HardHat className="h-6 w-6 mr-2" />
                <span className="font-bold">LOCAL GUTTER EXPERTS</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Protect Your <span className="text-primary">{city}</span> Home?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Book your free quote in {city} today — no pressure, no gimmicks.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Link 
                  href="/contact" 
                  className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  <Wrench className="h-5 w-5 transition-transform group-hover:rotate-12" />
                  <span>Get Your Free Quote</span>
                </Link>
                <Link 
                  href="tel:+14035989137" 
                  className="bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 group"
                >
                  <Phone className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span>(403) 598-9137</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default CityPageTemplate;
