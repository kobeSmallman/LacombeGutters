import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SERVICE_AREA_BOUNDS } from "@/lib/constants";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";


export const metadata = {
  title: "Our Services | Lacombe Gutters",
  description: "Professional gutter, eavestrough, soffit & fascia services in Central Alberta. 40+ years experience. Free estimates. Call today!",
};

const services = [
  {
    slug: "5-inch-gutters",
    name: "5\" Gutters",
    excerpt: "Standard residential gutters for most homes with excellent water flow capacity.",
    features: [
      "Available in aluminum and steel",
      "Ideal for typical residential applications",
      "5-inch K-style profile",
      "Seamless installation"
    ],
    hero: "/images/gallery/ModernHouse.png"
  },
  {
    slug: "6-inch-gutters",
    name: "6\" Gutters",
    excerpt: "Heavy-duty gutters for properties with large roof areas or heavy rainfall.",
    features: [
      "Handles 40% more water than 5\" gutters",
      "Ideal for steep roofs",
      "Commercial-grade durability",
      "Reduced cleaning frequency"
    ],
    hero: "/images/gallery/snowyField.png"
  },
  {
    slug: "soffit-fascia",
    name: "Soffit & Fascia",
    excerpt: "Complete roofline solutions that protect and enhance your home's exterior.",
    features: [
      "Improved ventilation",
      "Pest protection",
      "Enhanced curb appeal",
      "Moisture resistance"
    ],
    hero: "/images/gallery/LadderWorker.png"
  },
  {
    slug: "gutter-cleaning",
    name: "Gutter Cleaning",
    excerpt: "Professional cleaning to prevent water damage and extend gutter life.",
    features: [
      "Debris removal",
      "Downspout flushing",
      "Leak inspection",
      "Full system check"
    ],
    hero: "/images/gallery/filledGutter.png"
  },
  {
    slug: "downspouts",
    name: "Downspouts",
    excerpt: "Proper water drainage solutions to protect your foundation.",
    features: [
      "Custom sizing",
      "Multiple material options",
      "Foundation protection",
      "Custom extensions available"
    ],
    hero: "/images/gallery/Downspout.png"
  },
  {
    slug: "industrial-eavestrough",
    name: "Commercial Eavestrough",
    excerpt: "Heavy-duty solutions for commercial and industrial properties.",
    features: [
      "High-capacity systems",
      "Commercial-grade materials",
      "Custom designs",
      "Minimal maintenance"
    ],
    hero: "/images/gallery/LacombeGuttersTrailerTruck.png"
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/gutters-hero.jpg"
            alt="Professional gutter installation"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Expert Gutter & Eavestrough Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto mb-8">
              Serving Central Alberta with 40+ years of combined experience in quality gutter installation and maintenance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="inline-flex">
                <Button variant="secondary" size="lg" className="text-lg px-8 py-6 rounded-lg">
                  Get Free Estimate
                </Button>
              </Link>
              <Link href="tel:4035989137" className="inline-flex">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-lg border-2 border-white/20 hover:bg-white/10 text-white">
                  <Phone className="w-5 h-5 mr-2" />
                  (403) 598-9137
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Quality Service You Can Trust
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "40+ Years Experience",
                description: "Decades of expertise in gutter installation and maintenance across Central Alberta.",
                icon: "👷"
              },
              {
                title: "Quality Materials",
                description: "We use only the highest quality materials from trusted manufacturers.",
                icon: "🏆"
              },
              {
                title: "Free Estimates",
                description: "Get a detailed, no-obligation quote for your gutter needs.",
                icon: "📝"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full mb-4">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Comprehensive Gutter Solutions
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From installation to maintenance, we provide complete gutter solutions for residential and commercial properties.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.slug}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image 
                    src={service.hero} 
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">{service.name}</h3>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{service.excerpt}</p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href={`/services/${service.slug}`} 
                    className="mt-auto inline-flex items-center text-primary dark:text-primary-300 font-medium hover:text-primary/80 transition-colors"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 text-sm font-semibold text-white/80 bg-white/10 rounded-full mb-4">
              Service Area
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Proudly Serving Central Alberta
            </h2>
            <div className="w-24 h-1 bg-white/30 mx-auto mb-8"></div>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              We provide professional gutter services throughout Central Alberta and surrounding areas.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-10 lg:p-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Coverage Area</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  With over 40 years of experience, we&apos;ve been proudly serving Central Alberta with top-quality gutter solutions. Our service area includes:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { region: 'North', description: SERVICE_AREA_BOUNDS.north },
                    { region: 'South', description: SERVICE_AREA_BOUNDS.south },
                    { region: 'East', description: SERVICE_AREA_BOUNDS.east },
                    { region: 'West', description: SERVICE_AREA_BOUNDS.west },
                  ].map((area, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {area.region}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{area.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    <span className="font-semibold">Not sure if we service your area?</span> Give us a call at (403) 598-9137 to check our current service range.
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 h-64 md:h-auto">
                <div className="h-full w-full relative">
                  <Image
                    src="/images/maps/alberta-map.jpg"
                    alt="Central Alberta service area map"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Protect Your Home?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Get a free, no-obligation estimate for your gutter needs. Our team is ready to help you find the perfect solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="inline-flex">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-6 rounded-lg">
                Request Free Estimate
              </Button>
            </Link>
            <Link href="tel:4035989137" className="inline-flex">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-lg border-2 border-white/20 hover:bg-white/10">
                <Phone className="w-5 h-5 mr-2" />
                (403) 598-9137
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Protect Your Home?</h2>
          <p className="text-xl mb-8 text-primary-100 max-w-3xl mx-auto">
            Get a free, no-obligation estimate for your gutter or eavestrough project today.
            Our team is ready to provide expert service you can trust.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="inline-flex">
              <Button variant="secondary" size="lg">Request Free Estimate</Button>
            </Link>
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Available 7 days a week</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
