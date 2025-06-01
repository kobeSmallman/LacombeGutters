import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import AnimateOnScroll from "@/components/ui/animate-on-scroll";
import TestimonialsSection from "@/components/ui/testimonials-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-28 md:py-40 overflow-hidden">
        {/* Background image without any wrapper div that might cause a visible box */}
        <Image 
          src="/images/banners/truck.png" 
          alt="Lacombe Gutters Truck" 
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimateOnScroll type="zoomIn" className="max-w-3xl relative">
            {/* Steel plate with border and texture - maintaining construction theme */}
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
            
            <AnimateOnScroll type="fadeIn" delay={0.3}>
              <p className="text-xl md:text-2xl mb-8">
                Serving central Alberta since 2009 with 40+ years of combined experience.
              </p>
            </AnimateOnScroll>
            
            <AnimateOnScroll type="slideUp" delay={0.4} className="flex flex-col sm:flex-row gap-4">
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
            </AnimateOnScroll>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 dark:bg-transparent">
        <div className="container mx-auto px-4">
          <AnimateOnScroll type="fadeIn" className="text-center mb-12 relative">
            {/* Tool icon instead of screws - maintaining industrial theme */}
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
          </AnimateOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 5" Eavestrough - Slide Up */}
            <AnimateOnScroll type="slideUp" delay={0.1}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden service-card-left h-full">
                <div className="relative h-52">
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
                  <Link href="/services">
                    <Button variant="primary" size="sm">Learn More</Button>
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
            
            {/* 6" Gutters - Slide Left */}
            <AnimateOnScroll type="slideLeft" delay={0.2}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden service-card-center h-full">
                <div className="relative h-52">
                  <Image 
                    src="/images/gallery/04_long_gutter_summer.png" 
                    alt="6-inch Oversized Gutters" 
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">6&quot; Oversized Gutters</h3>
                  <p className="text-gray-600 mb-4">
                    Ideal for homes with large roof areas or heavy rainfall, our 6&quot; gutters provide superior water handling.
                  </p>
                  <Link href="/services">
                    <Button variant="primary" size="sm">Learn More</Button>
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
            
            {/* Soffit & Fascia - Slide Right */}
            <AnimateOnScroll type="slideRight" delay={0.3}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden service-card-right h-full">
                <div className="relative h-52">
                  <Image 
                    src="/images/gallery/LadderWorker.png" 
                    alt="Soffit & Fascia Installation" 
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Soffit &amp; Fascia</h3>
                  <p className="text-gray-600 mb-4">
                    Complete soffit and fascia solutions to protect and enhance your roofline with durable, low-maintenance materials.
                  </p>
                  <Link href="/services/soffit-fascia">
                    <Button variant="primary" size="sm">Learn More</Button>
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100 dark:bg-transparent">
        <TestimonialsSection />
      </section>
      
      {/* Yellow Banner Section */}
      <section className="py-8 mb-8">
        <div className="container mx-auto px-4">
          <AnimateOnScroll type="slideUp" delay={0.3} className="bg-secondary p-8 rounded-lg text-center relative">
            {/* Screws in corners - construction theme */}
            <div className="screw-corner screw-top-left"></div>
            <div className="screw-corner screw-top-right"></div>
            <div className="screw-corner screw-bottom-left"></div>
            <div className="screw-corner screw-bottom-right"></div>
            
            <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">Ready to transform your property?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Contact us today to discuss your project and get a free estimate.
            </p>
            
            <div className="flex justify-center">
              <Link href="/contact">
                <Button variant="primary" size="lg">GET A FREE ESTIMATE</Button>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  )
}
