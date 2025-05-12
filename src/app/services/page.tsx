import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SERVICE_AREA_BOUNDS } from "@/lib/constants";

export const metadata = {
  title: "Our Services",
  description: "Explore our complete range of eavestrough, gutter, soffit, and fascia services for residential and commercial properties.",
};

// Service data with images
const services = [
  {
    slug: "5-inch-gutters",
    name: "5\" Gutters",
    excerpt: "Standard residential gutters for most homes, available in aluminum and steel.",
    hero: "/images/gallery/ModernHouse.png"
  },
  {
    slug: "6-inch-gutters",
    name: "6\" Gutters",
    excerpt: "Larger capacity gutters for homes with steep roofs or high rainfall areas.",
    hero: "/images/gallery/snowyField.png"
  },
  {
    slug: "soffit-fascia",
    name: "Soffit & Fascia",
    excerpt: "Protect and ventilate your roofline with our expert soffit and fascia installation.",
    hero: "/images/gallery/LadderWorker.png"
  },
  {
    slug: "gutter-cleaning",
    name: "Gutter Cleaning",
    excerpt: "Regular maintenance to keep your gutters flowing freely and prevent water damage.",
    hero: "/images/gallery/filledGutter.png"
  },
  {
    slug: "downspouts",
    name: "Downspouts",
    excerpt: "Properly direct water away from your foundation with our downspout installation services.",
    hero: "/images/gallery/Downspout.png"
  },
  {
    slug: "industrial-eavestrough",
    name: "Industrial-scale Eavestrough",
    excerpt: "Heavy-duty gutter solutions for commercial and industrial buildings.",
    hero: "/images/gallery/LacombeGuttersTrailerTruck.png"
  }
];

export default function ServicesPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 relative">
          {/* Replace screws with a light grey background and tool icon */}
          <div className="bg-gray-100 py-8 px-4 rounded-lg relative">
            <div className="absolute top-4 right-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold font-heading mb-4">Our Services</h1>
            <p className="text-xl max-w-3xl mx-auto">
              We offer a complete range of eavestrough, gutter, soffit, and fascia services for both residential and commercial properties.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div key={service.slug} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow relative">
              {/* Small screw in top corners of each card */}
              <div className="screw-corner screw-top-left" style={{ width: "8px", height: "8px" }}></div>
              <div className="screw-corner screw-top-right" style={{ width: "8px", height: "8px" }}></div>
              
              <div className="relative h-48">
                <Image 
                  src={service.hero} 
                  alt={service.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <h2 className="text-xl font-bold text-white p-4">{service.name}</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="mb-4 text-gray-600">{service.excerpt}</p>
                <Link href={`/services/${service.slug}`}>
                  <Button variant="primary">Learn More</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Service Area Section */}
        <div className="bg-primary text-white p-8 rounded-lg mb-16 relative">
          {/* Construction screws in corners */}
          <div className="screw-corner screw-top-left"></div>
          <div className="screw-corner screw-top-right"></div>
          <div className="screw-corner screw-bottom-left"></div>
          <div className="screw-corner screw-bottom-right"></div>
          
          {/* Metal strips at top and bottom */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700"></div>
          
          <h2 className="text-2xl font-bold mb-6 text-center">Our Service Area</h2>
          <p className="text-center mb-8 max-w-3xl mx-auto">
            Based in Red Deer, our service area covers central Alberta. We serve communities from {SERVICE_AREA_BOUNDS.north} in the north to {SERVICE_AREA_BOUNDS.south} in the south, and from {SERVICE_AREA_BOUNDS.west} in the west to {SERVICE_AREA_BOUNDS.east} in the east.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 p-4 rounded text-center">
              <h3 className="font-bold mb-2">North</h3>
              <p>{SERVICE_AREA_BOUNDS.north}</p>
            </div>
            <div className="bg-white/10 p-4 rounded text-center">
              <h3 className="font-bold mb-2">South</h3>
              <p>{SERVICE_AREA_BOUNDS.south}</p>
            </div>
            <div className="bg-white/10 p-4 rounded text-center">
              <h3 className="font-bold mb-2">West</h3>
              <p>{SERVICE_AREA_BOUNDS.west}</p>
            </div>
            <div className="bg-white/10 p-4 rounded text-center">
              <h3 className="font-bold mb-2">East</h3>
              <p>{SERVICE_AREA_BOUNDS.east}</p>
            </div>
          </div>
          
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2869.8803986988144!2d-113.80997392390058!3d52.265711651458474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5374542947119299%3A0x500a9122c7a444f0!2s170%20112%20Queensgate%20Crescent%2C%20Red%20Deer%2C%20AB%20T4P%200R9%2C%20Canada!5e0!3m2!1sen!2sus!4v1683212345678!5m2!1sen!2sus" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Lacombe Gutters Service Area Map"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
        
        <div className="bg-secondary p-8 rounded-lg text-center relative">
          {/* Simple screw elements in corners */}
          <div className="screw-corner screw-top-left"></div>
          <div className="screw-corner screw-top-right"></div>
          <div className="screw-corner screw-bottom-left"></div>
          <div className="screw-corner screw-bottom-right"></div>
          
          {/* Metal strips at top and bottom */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700"></div>
          
          <h2 className="text-2xl font-bold mb-4 text-primary">Not sure which service you need?</h2>
          <p className="mb-6 text-primary/80">
            Contact us today for a free consultation. Our experts will assess your needs and recommend the best solution.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">Get a Free Estimate</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
