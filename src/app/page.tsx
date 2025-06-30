import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";
import TestimonialsSection from "@/components/ui/testimonials-section";
import RainEffect from "@/components/ui/rain-effect";
import "@/styles/rain-bg.css";
import "./mobile-styles.css";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative text-white py-24 md:py-44 lg:py-52 overflow-hidden hero-section">
        {/* Background image */}
        <Image 
          src="/images/gallery/ModernHouse.png" 
          alt="Professional eavestrough installation on modern house" 
          fill
          className="object-cover md:object-center object-left hero-background-truck"
          style={{ objectPosition: '80% center' }}
          priority
        />
        
        {/* Simple overlay for text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimateOnScroll 
            type="slideLeft" 
            className="max-w-6xl relative"
            duration={1.5}
            delay={0.2}
          >
            <div className="relative text-center md:text-left pt-8 md:pt-0 h-[650px] md:h-[525px]">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Logo - Hidden on mobile, shown on md and up */}
                <div className="hidden md:block relative">
                  <Image 
                    src="/images/logos/logo.png" 
                    alt="Lacombe Gutters Logo" 
                    width={100}
                    height={100}
                    className="rounded-lg shadow-xl border-4 border-white/20 mt  -2"
                  />
                </div>
                
                {/* Title with description below on desktop */}
                <div className="relative">
                  <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-2 sm:mb-4">
                    <AnimateOnScroll type="fadeIn" duration={1.5} delay={0.4} className="block">
                      <span className="homepage-heading">Expert Eavestrough</span>
                    </AnimateOnScroll>
                    <AnimateOnScroll type="fadeIn" duration={1.5} delay={0.7}>
                      <span className="text-secondary homepage-heading-solutions">Solutions</span>
                    </AnimateOnScroll>
                  </h1>
                  {/* Description - Only visible on desktop */}
                  <div className="hidden md:block mt-8">
                    <AnimateOnScroll type="fadeIn" duration={1.5} delay={1.0}>
                      <p className="text-2xl lg:text-3xl text-gray-200 max-w-3xl leading-relaxed">
                        Professional installation, maintenance, and repair services with <span className="font-bold text-white">40+ years</span> of combined expertise
                      </p>
                    </AnimateOnScroll>
                  </div>
                </div>
              </div>
              
              {/* Description text - ONLY visible on mobile devices */}
              <div className="absolute md:hidden" style={{top: '180px'}}>
                <AnimateOnScroll type="fadeIn" duration={1.5} delay={1.0}>
                  <p className="text-xl sm:text-2xl text-center text-gray-200 max-w-3xl mx-auto px-4 sm:px-6 leading-relaxed">
                    Professional installation, maintenance, and repair services with <span className="font-bold text-white">40+ years</span> of combined expertise
                  </p>
                </AnimateOnScroll>
              </div>
              
              {/* Buttons - Position low for mobile, with more space on desktop */}
              <div className="absolute w-full" style={{bottom: '50px'}}>
                <AnimateOnScroll type="fadeIn" duration={1.5} delay={1.3}>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center md:justify-start md:mt-16 md:ml-[132px]">
                    <Link href="/contact" className="group w-full sm:w-auto">
                      <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white !px-4 sm:!px-8 !py-2 sm:!py-4 !text-sm sm:!text-lg font-semibold transition-all duration-300 transform hover:scale-105" style={{fontSize: '0.875rem', padding: '0.4rem 0.75rem'}}>
                        GET A FREE ESTIMATE
                      </Button>
                    </Link>
                    <Link href="/services" className="group w-full sm:w-auto">
                      <Button variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 !px-4 sm:!px-8 !py-2 sm:!py-4 !text-sm sm:!text-lg font-semibold transition-all duration-300 transform hover:scale-105" style={{fontSize: '0.875rem', padding: '0.4rem 0.75rem'}}>
                        VIEW OUR SERVICES
                      </Button>
                    </Link>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Testimonials Section - Moved right after hero */}
      <section className="cta-bg py-16 md:py-20">
        <div className="container mx-auto px-4 relative z-10">
          <AnimateOnScroll type="fadeIn" className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
              Why Choose Lacombe Gutters
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-12">
              {[
                { value: '40+', label: 'Years of Combined Experience', className: 'h-32' },
                { value: '3,000+', label: 'Completed Projects', className: 'h-32' },
                { value: '4.8★', label: 'Customer Rating', className: 'h-32' },
                { value: 'Free', label: 'Estimates', className: 'h-32' }
              ].map((item, index) => (
                <AnimateOnScroll 
                  key={index} 
                  type="fadeIn" 
                  delay={0.3 + (index * 0.1)} 
                  className="group h-full"
                >
                  <div className={`bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 transition-all duration-300 hover:bg-white/20 hover:border-secondary/50 hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-center h-full ${item.className || ''}`}>
                    <div className="text-3xl font-bold text-secondary mb-2 group-hover:scale-110 transition-transform min-h-[2.5rem] flex items-center">
                      {item.value}
                    </div>
                    <div className="text-base font-medium text-gray-200 uppercase tracking-wider text-center">
                      {item.label}
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
        
        <div className="relative z-10 pt-8">
          <TestimonialsSection />
        </div>
      </section>

      {/* Services Section */}
      <section className="relative pt-0 pb-20 overflow-hidden bg-white bg-[url('/images/textures/paper-fiber.png')] bg-white/95 dark:bg-[#1f1f1f] dark:bg-opacity-90">
        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600"></div>
        
        {/* Decorative corner elements - bottom only */}
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-secondary/20 rounded-br-2xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimateOnScroll type="fadeIn" className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-4">
              <span className="h-1 w-12 bg-secondary mr-3"></span>
              <span className="text-sm font-semibold tracking-wider text-primary uppercase">Our Services</span>
              <span className="h-1 w-12 bg-secondary ml-3"></span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-primary">
              Expert Eavestrough Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              Professional installation, maintenance, and repair services with 40+ years of combined expertise
            </p>
            <div className="flex justify-center items-center mt-2 mb-6">
              <Link href="/gallery" className="group inline-flex items-center text-primary hover:text-secondary transition-colors bg-primary/5 hover:bg-primary/10 px-5 py-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                Check out our project gallery
                <svg className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </AnimateOnScroll>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* 5" Eavestrough */}
            <AnimateOnScroll type="zoomIn" delay={0.2} className="h-full">
              <div className="group h-full flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
                {/* Card Top Decoration */}
                <div className="h-1.5 bg-gradient-to-r from-secondary to-primary"></div>
                
                {/* Card Content */}
                <div className="relative overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <Image 
                      src="/images/gallery/residential_backyard_view.png" 
                      alt="5-inch Conventional Gutters" 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-white rounded-full">
                        Residential & Commercial
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8">
                    <div className="flex items-center mb-4">
                      <div className="bg-primary/10 p-2 rounded-lg mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">5&quot; Conventional Gutters</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Our standard 5&quot; aluminum gutters provide reliable water management for most residential properties, combining durability with a clean, modern look.
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">Standard residential size</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">Seamless installation</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">Multiple color options</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Link href="/services/5-inch-gutters" className="group flex items-center text-primary font-medium hover:text-secondary transition-colors">
                        Learn more
                        <svg className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      <Link href="/contact">
                        <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                          Get Quote
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
            
            {/* 6" Oversized Gutters */}
            <AnimateOnScroll type="zoomIn" delay={0.3} className="h-full">
              <div className="group h-full flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
                {/* Card Top Decoration */}
                <div className="h-1.5 bg-gradient-to-r from-primary to-secondary"></div>
                
                {/* Card Content */}
                <div className="relative overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <Image 
                      src="/images/gallery/06_ladders_on_building.png" 
                      alt="6-inch Oversized Gutters" 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-white rounded-full">
                        Heavy Rainfall Areas
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8">
                    <div className="flex items-center mb-4">
                      <div className="bg-primary/10 p-2 rounded-lg mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">6&quot; Oversized Gutters</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Designed for larger roofs and heavy rainfall areas, our 6&quot; oversized gutters provide superior water handling capacity to protect your home&apos;s foundation.
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">36% more capacity than standard</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">Ideal for large roof areas</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">Reduces overflow risk</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Link href="/services/6-inch-gutters" className="group flex items-center text-primary font-medium hover:text-secondary transition-colors">
                        Learn more
                        <svg className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      <Link href="/contact">
                        <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                          Get Quote
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
            
            {/* Soffit & Fascia */}
            <AnimateOnScroll type="zoomIn" delay={0.4} className="h-full">
              <div className="group h-full flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
                {/* Card Top Decoration */}
                <div className="h-1.5 bg-gradient-to-r from-secondary to-primary"></div>
                
                {/* Card Content */}
                <div className="relative overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <Image 
                      src="/images/gallery/08_log_frame_tyvek.png" 
                      alt="Soffit & Fascia Installation" 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-white rounded-full">
                        Complete Roofline Solutions
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8">
                    <div className="flex items-center mb-4">
                      <div className="bg-primary/10 p-2 rounded-lg mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Soffit &amp; Fascia</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Complete soffit and fascia solutions to protect and enhance your roofline with durable, low-maintenance materials that resist warping and rot.
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">Ventilated for proper airflow</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">Custom color matching</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">Long-lasting protection</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Link href="/services/soffit-fascia" className="group flex items-center text-primary font-medium hover:text-secondary transition-colors">
                        Learn more
                        <svg className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      <Link href="/contact">
                        <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                          Get Quote
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* CTA Section with Rain */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-gray-900 to-blue-900 text-white min-h-[90vh] flex items-center justify-center">
        {/* Rain Effect - Full viewport */}
        <div className="absolute inset-0 z-0">
          <RainEffect />
        </div>
        
        {/* Back Panel with subtle shadow */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="relative w-full max-w-5xl mx-auto">
            <div className="absolute inset-0 mx-4 rounded-xl" style={{
              boxShadow: '0 0 0 100vmax rgba(0,0,0,0.5)',
              clipPath: 'inset(0 0 0 0 round 1rem)',
              pointerEvents: 'none'
            }}></div>
          </div>
        </div>
        
        {/* Content Container - Glass Pane */}
        <div className="container mx-auto px-4 relative z-20 py-16">
          <AnimateOnScroll type="fadeIn" delay={0.2} className="text-center">
            <div className="relative max-w-4xl mx-auto bg-white/20 backdrop-blur-sm rounded-xl border-2 border-white/30 shadow-lg overflow-hidden">
              {/* Glass overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5" style={{
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)'
              }}></div>
              
              {/* Background fallback for iOS devices */}
              <div className="absolute inset-0 bg-primary opacity-80"></div>
              
              {/* Content */}
              <div className="relative z-10 p-8 lg:p-12">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{color: "#ffffff !important"}}>
                  Professional Gutter Protection
                </h3>
                <p className="text-xl md:text-2xl text-gray-100 mb-6 max-w-3xl mx-auto leading-relaxed" style={{color: "#ffffff !important"}}>
                  Keep your home safe from water damage with our expert gutter solutions. Our team&apos;s 40+ years of combined experience means your home gets the best protection against the elements.
                </p>
                <p className="text-lg text-white font-medium mb-8" style={{color: "#ffffff !important"}}>
                  Free estimates & guaranteed workmanship
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-6">
                  <Link href="/contact" className="group w-full sm:w-auto text-center">
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                      GET YOUR FREE ESTIMATE
                    </Button>
                  </Link>
                  <Link href="tel:+14035989137" className="group w-full sm:w-auto">
                    <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                      <Phone className="w-5 h-5 mr-2" />
                      Call or Text
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  )
}
