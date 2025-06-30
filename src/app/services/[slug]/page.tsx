import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Complete services data matching the main services page
const services = [
  {
    slug: '5-inch-gutters',
    name: '5" Gutters',
    excerpt: 'Standard residential gutters for most homes with excellent water flow capacity.',
    description: 'Our 5-inch gutter systems are the perfect solution for most residential properties in Central Alberta. Made from high-quality aluminum and steel materials with professional installation, these gutters provide reliable water management year-round.',
    features: [
      'Available in aluminum and steel',
      'Ideal for typical residential applications', 
      '5-inch K-style profile',
      'Seamless installation',
      'Multiple color options available',
      'Professional installation included'
    ],
    hero: '/images/gallery/ModernHouse.png',
    benefits: [
      'Protects your foundation from water damage',
      'Prevents basement flooding',
      'Maintains proper drainage around your home',
      'Long-lasting construction',
      'Cost-effective solution for most homes'
    ]
  },
  {
    slug: '6-inch-gutters',
    name: '6" Gutters',
    excerpt: 'Heavy-duty gutters for properties with large roof areas or heavy rainfall.',
    description: 'Our 6-inch gutter systems are designed for properties that need extra water handling capacity. Perfect for large homes, steep roofs, commercial properties, or areas that experience heavy rainfall.',
    features: [
      'Handles 40% more water than 5" gutters',
      'Ideal for steep roofs',
      'Commercial-grade durability',
      'Reduced cleaning frequency',
      'Superior water flow capacity',
      'Built for Alberta\'s harsh weather conditions'
    ],
    hero: '/images/gallery/snowyField.png',
    benefits: [
      'Superior water management for large properties',
      'Reduced overflow during heavy rainfall',
      'Less frequent maintenance required',
      'Perfect for commercial and large residential properties',
      'Enhanced durability for harsh weather conditions'
    ]
  },
  {
    slug: 'soffit-fascia',
    name: 'Soffit & Fascia',
    excerpt: 'Complete roofline solutions that protect and enhance your home\'s exterior.',
    description: 'Soffit and fascia are crucial components of your home\'s roofline system. They provide essential ventilation, protection from pests, and aesthetic appeal while working seamlessly with your eavestrough system.',
    features: [
      'Improved ventilation',
      'Pest protection',
      'Enhanced curb appeal',
      'Moisture resistance',
      'Multiple color and material options',
      'Professional installation with warranty'
    ],
    hero: '/images/gallery/LadderWorker.png',
    benefits: [
      'Prevents moisture buildup in attic spaces',
      'Keeps pests and rodents out of your home',
      'Improves energy efficiency',
      'Enhances your home\'s appearance and value',
      'Protects roof structure from weather damage'
    ]
  },
  {
    slug: 'gutter-cleaning',
    name: 'Gutter Cleaning',
    excerpt: 'Professional cleaning to prevent water damage and extend gutter life.',
    description: 'Regular professional gutter cleaning is essential for maintaining proper water flow and preventing costly damage to your property. Our comprehensive cleaning service keeps your gutters functioning optimally year-round.',
    features: [
      'Debris removal',
      'Downspout flushing',
      'Leak inspection',
      'Full system check',
      'Safety equipment and full insurance',
      'Detailed service reports'
    ],
    hero: '/images/gallery/filledGutter.png',
    benefits: [
      'Prevents water damage to your foundation',
      'Extends the life of your gutter system',
      'Maintains proper water flow and drainage',
      'Identifies potential issues before they become costly',
      'Keeps your property looking professional'
    ]
  },
  {
    slug: 'downspouts',
    name: 'Downspouts',
    excerpt: 'Proper water drainage solutions to protect your foundation.',
    description: 'Downspouts are critical for directing water away from your foundation and preventing water damage. Our custom downspout solutions ensure proper drainage and foundation protection for your property.',
    features: [
      'Custom sizing',
      'Multiple material options',
      'Foundation protection',
      'Custom extensions available',
      'Professional installation',
      'Seamless integration with gutter systems'
    ],
    hero: '/images/gallery/Downspout.png',
    benefits: [
      'Protects foundation from water damage',
      'Prevents basement flooding',
      'Reduces soil erosion around your home',
      'Custom solutions for any property layout',
      'Long-lasting materials and installation'
    ]
  },
  {
    slug: 'industrial-eavestrough',
    name: 'Commercial Eavestrough',
    excerpt: 'Heavy-duty solutions for commercial and industrial properties.',
    description: 'Our commercial and industrial eavestrough systems are designed to handle the demanding requirements of large-scale properties. Built with heavy-duty materials and engineered for maximum performance.',
    features: [
      'High-capacity systems',
      'Commercial-grade materials',
      'Custom designs',
      'Minimal maintenance',
      'Industrial-strength construction',
      'Professional project management'
    ],
    hero: '/images/gallery/LacombeGuttersTrailerTruck.png',
    benefits: [
      'Handles large-scale water management needs',
      'Built to withstand commercial use',
      'Reduces long-term maintenance costs',
      'Custom engineering for each project',
      'Professional installation and service'
    ]
  }
];

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static params at build time
export async function generateStaticParams() {
  try {
    return services.map((service) => ({
      slug: service.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for services:', error);
    return [];
  }
}

// Generate metadata for each service page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = services.find(s => s.slug === resolvedParams.slug);
  
  if (!service) {
    return {
      title: 'Service Not Found | Lacombe Gutters Ltd',
    };
  }

  return {
    title: `${service.name} | Lacombe Gutters Ltd`,
    description: service.excerpt,
    keywords: `${service.name}, ${service.slug}, gutters, eavestrough, Lacombe, Alberta, Central Alberta`,
    openGraph: {
      title: `${service.name} | Lacombe Gutters Ltd`,
      description: service.excerpt,
      url: `https://www.lacombeguttersltd.com/services/${service.slug}`,
      siteName: 'Lacombe Gutters Ltd',
      images: [
        {
          url: service.hero,
          width: 1200,
          height: 630,
          alt: service.name,
        },
      ],
      locale: 'en_CA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.name} | Lacombe Gutters Ltd`,
      description: service.excerpt,
      images: [service.hero],
    },
    alternates: {
      canonical: `https://www.lacombeguttersltd.com/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const resolvedParams = await params;
  // Handle case where params or params.slug is undefined
  if (!resolvedParams?.slug) {
    notFound();
  }

  const service = services.find(s => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white relative">
      {/* Hero Section - Matching site theme */}
      <section className="relative isolate overflow-hidden text-white bg-gradient-to-br from-slate-800 to-slate-900">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={service.hero}
            alt={service.name}
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        
        {/* Dotted overlay matching site theme */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#fbbe24 1.5px, transparent 1.6px)',
            backgroundSize: '28px 28px',
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 py-24 md:py-32 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/services" 
              className="inline-flex items-center text-white/80 hover:text-secondary mb-6 transition-colors font-medium"
            >
              ← Back to All Services
            </Link>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 drop-shadow-lg">
              {service.name}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow-sm max-w-3xl">
              {service.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="space-y-12">
            {/* Service Description - Full width */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About This Service</h2>
              <p className="text-lg text-gray-700 mb-10 leading-relaxed">{service.description}</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <div className="w-1 h-6 bg-primary mr-3"></div>
                    Key Features
                  </h3>
                  <ul className="space-y-4">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <div className="w-1 h-6 bg-secondary mr-3"></div>
                    Benefits
                  </h3>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Your Free Estimate</h3>
                <p className="text-gray-600 mb-6">
                  Ready for professional {service.name.toLowerCase()} services? Get your free, no-obligation estimate today.
                </p>
                <p className="text-lg font-semibold text-blue-700">
                  Click the widget to contact us!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
