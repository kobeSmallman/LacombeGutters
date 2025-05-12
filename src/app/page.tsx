import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import dynamic from "next/dynamic"

// Using direct import to resolve the TypeScript error
const TypingTestimonials = dynamic(() => import("../components/ui/TypingTestimonials"), {
  ssr: true,
})

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 md:py-32">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/images/banners/truck.png" 
            alt="Lacombe Gutters Truck" 
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl relative">
            {/* Steel plate with border and texture */}
            <div className="absolute inset-0 -m-4 bg-gradient-to-b from-gray-700/10 to-gray-900/10 border-2 border-gray-600/20 rounded-sm z-[-1]"></div>
            
            <div className="mb-8">
              <Image 
                src="/images/logos/logo.png" 
                alt="Lacombe Gutters Logo" 
                width={200} 
                height={200}
                className="mb-6"
              />
              <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
                Professional Eavestrough Services
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-8">
              Serving central Alberta since 2009 with 50+ years of combined experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Get Free Estimate
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="ghost" size="lg" className="border-2 border-white">
                  Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 dark:bg-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 relative">
            {/* Tool icon instead of screws */}
            <div className="absolute top-0 right-1/2 translate-x-32 md:translate-x-48">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V3z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11h.01" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a complete range of professional eavestrough and gutter services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 5" Eavestrough */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-52">
                {/* Add screws in corners */}
                <div className="screw-corner screw-top-left"></div>
                <div className="screw-corner screw-top-right"></div>
                <div className="screw-corner screw-bottom-left"></div>
                <div className="screw-corner screw-bottom-right"></div>
                
                <Image 
                  src="/images/gallery/09_gutter_install_two_workers.png" 
                  alt="5-inch Conventional Gutters" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">5&quot; Conventional Gutters</h3>
                <p className="text-gray-600 mb-4">
                  Our standard 5&quot; gutters are perfect for most residential applications, offering excellent water flow capacity.
                </p>
                <Link href="/services/5-inch-gutters">
                  <Button variant="primary" size="sm">Learn More</Button>
                </Link>
              </div>
            </div>
            
            {/* 6" Gutters */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-52">
                {/* Add screws in corners */}
                <div className="screw-corner screw-top-left"></div>
                <div className="screw-corner screw-top-right"></div>
                <div className="screw-corner screw-bottom-left"></div>
                <div className="screw-corner screw-bottom-right"></div>
                
                <Image 
                  src="/images/gallery/04_long_gutter_summer.png" 
                  alt="6-inch Steel Gutters" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">6&quot; Steel Gutters</h3>
                <p className="text-gray-600 mb-4">
                  Larger capacity 6&quot; gutters for areas with heavy rainfall or larger roof surfaces, ensuring proper drainage.
                </p>
                <Link href="/services/6-inch-gutters">
                  <Button variant="primary" size="sm">Learn More</Button>
                </Link>
              </div>
            </div>
            
            {/* Soffit & Fascia */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-52">
                {/* Add screws in corners */}
                <div className="screw-corner screw-top-left"></div>
                <div className="screw-corner screw-top-right"></div>
                <div className="screw-corner screw-bottom-left"></div>
                <div className="screw-corner screw-bottom-right"></div>
                
                <Image 
                  src="/images/gallery/LadderWorker.png" 
                  alt="Soffit & Fascia" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Soffit & Fascia</h3>
                <p className="text-gray-600 mb-4">
                  Complete your roofline with our quality soffit and fascia installation, providing ventilation and protection.
                </p>
                <Link href="/services/soffit-fascia">
                  <Button variant="primary" size="sm">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/services">
              <Button variant="primary" size="lg">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section - NEW */}
      <section className="py-16 bg-gray-100 dark:bg-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 relative">
            {/* Tool icon instead of screws */}
            <div className="absolute top-0 right-1/2 translate-x-64 md:translate-x-80">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V3z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11h.01" />
              </svg>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our clients trust us with their homes for a reason
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-100 relative">
            {/* Metal strips at top and bottom */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700"></div>
            
            {/* Screws in corners */}
            <div className="screw-corner screw-top-left"></div>
            <div className="screw-corner screw-top-right"></div>
            <div className="screw-corner screw-bottom-left"></div>
            <div className="screw-corner screw-bottom-right"></div>
            
            <TypingTestimonials />
            
            <div className="mt-8 text-center">
              <a 
                href="https://www.facebook.com/lacombegutters" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Leave us a review on Facebook →
              </a>
            </div>
          </div>
        </div>
      </section>

        {/* Yellow Banner Section - exact match to services page */}
   <section className="py-8 mb-8">
        <div className="container mx-auto px-4">
          <div className="bg-secondary p-8 rounded-lg text-center relative">
            {/* Simple dots in corners */}
            <div className="absolute top-4 left-4 w-2 h-2 bg-gray-700 rounded-full"></div>
            <div className="absolute top-4 right-4 w-2 h-2 bg-gray-700 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-gray-700 rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-gray-700 rounded-full"></div>
            
            {/* Metal strips at top and bottom */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700"></div>
            
            <h2 className="text-2xl font-bold mb-4 text-primary">Ready to get started?</h2>
            <p className="mb-6 text-primary/80">
            Contact us today for a free estimate on your gutter installation or repair project.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">GET A FREE ESTIMATE</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
