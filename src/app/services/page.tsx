import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";


export const metadata = {
  title: "Our Services | Lacombe Gutters",
  description: "Professional gutter, eavestrough, soffit & fascia services in Central Alberta. 40+ years of combined experience. Free estimates. Call today!",
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
      <section className="relative isolate overflow-hidden text-white bg-gradient-to-br from-slate-800 to-slate-900">
        {/* Dotted-node overlay (yellow construction pin-holes) */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#fbbe24 1.5px, transparent 1.6px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Subtle angled plate for depth */}
        <div
          className="absolute -top-32 -right-44 w-[150%] h-[180%] bg-slate-700/30"
          style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}
        />

        <div className="relative z-10 py-24 md:py-32 px-6 md:px-16 text-center space-y-5 md:space-y-6">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight drop-shadow-lg">
            Expert Gutter & Eavestrough Services
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow-sm">
            Serving Central Alberta with 40+ years of combined experience in quality gutter installation and maintenance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact" className="group">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Get Free Estimate
              </Button>
            </Link>
            <Link href="tel:4035989137" className="group">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                <Phone className="w-5 h-5 mr-2" />
                (403) 598-9137
              </Button>
            </Link>
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
                title: "40+ Years Combined Experience",
                description: "Our team brings decades of combined expertise in gutter installation and maintenance across Central Alberta.",
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
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Service Area</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              With over 40 years of experience, we&apos;ve been proudly serving Central Alberta with top-quality gutter solutions.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {[
                { region: 'North', description: 'Leduc' },
                { region: 'South', description: 'Airdrie' },
                { region: 'East', description: 'Stettler' },
                { region: 'West', description: 'Nordegg' },
              ].map((area, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{area.region}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-600">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Not sure if we service your area?
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link 
                  href="/service-areas" 
                  className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:underline"
                >
                  View our detailed service area map
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
                <span className="text-gray-400 dark:text-gray-500 hidden sm:block">or</span>
                <a 
                  href="tel:4035989137" 
                  className="text-white font-medium hover:text-blue-300 transition-colors flex items-center"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  (403) 598-9137
                </a>
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
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact" className="group">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Request Free Estimate
              </Button>
            </Link>
            <Link href="tel:4035989137" className="group">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                <Phone className="w-5 h-5 mr-2" />
                (403) 598-9137
              </Button>
            </Link>
          </div>
        </div>
      </section>


    </main>
  );
}
