'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from 'react';
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

// Gallery data with real images
const galleryItems = [
  { 
    category: "Residential", 
    title: "5\" Conventional Gutters", 
    location: "Lacombe",
    image: "/images/gallery/05_shocked_cat_winter.png"
  },
  { 
    category: "Residential", 
    title: "Soffit & Fascia Replacement", 
    location: "Red Deer",
    image: "/images/gallery/08_log_frame_tyvek.png" 
  },
  { 
    category: "Commercial", 
    title: "Industrial Eavestrough System", 
    location: "Blackfalds",
    image: "/images/gallery/01_lacombe_trailer_snow.png"
  },
  { 
    category: "Residential", 
    title: "6\" Steel Gutters", 
    location: "Sylvan Lake",
    image: "/images/gallery/04_long_gutter_summer.png"
  },
  { 
    category: "Residential", 
    title: "Complete Gutter System", 
    location: "Ponoka",
    image: "/images/gallery/09_gutter_install_two_workers.png"
  },
  { 
    category: "Commercial", 
    title: "Warehouse Drainage Solution", 
    location: "Red Deer",
    image: "/images/gallery/03_truck_and_trailer.png"
  },
  { 
    category: "Residential", 
    title: "Custom Downspout Configuration", 
    location: "Stettler",
    image: "/images/gallery/02_cat_on_roof.png"
  },
  { 
    category: "Residential", 
    title: "Gutter Cleaning & Guards", 
    location: "Lacombe",
    image: "/images/gallery/07_gutterguard_closeup.png"
  },
  { 
    category: "Commercial", 
    title: "Office Building Eavestrough", 
    location: "Wetaskiwin",
    image: "/images/gallery/06_ladders_on_building.png"
  }
];

export default function GalleryClient() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [mounted, setMounted] = useState(false);
  
  // Only run on client-side
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Filter gallery items based on selected category
  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);
  
  if (!mounted) {
    // Return a static version for SSR to avoid hydration mismatch
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gray-100 py-8 px-4 rounded-lg relative mb-12">
            <h1 className="text-4xl font-bold font-heading mb-4 text-center">Project Gallery</h1>
            <p className="text-xl text-center mb-6 max-w-3xl mx-auto">
              Browse our portfolio of completed projects to see examples of our quality workmanship.
            </p>
          </div>
          {/* Loading state */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-200 animate-pulse h-80 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <AnimateOnScroll type="fadeIn" duration={0.9}>
          <div className="bg-gray-100 py-8 px-4 rounded-lg relative mb-12">
            {/* Tool icon instead of screws */}
            <div className="absolute top-4 right-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold font-heading mb-4 text-center">Project Gallery</h1>
            <p className="text-xl text-center mb-6 max-w-3xl mx-auto">
              Browse our portfolio of completed projects to see examples of our quality workmanship.
            </p>
          </div>
        </AnimateOnScroll>
        
        <AnimateOnScroll type="slideUp" duration={0.9}>
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button 
                type="button" 
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${activeFilter === 'All' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-200`}
                onClick={() => setActiveFilter('All')}
              >
                All
              </button>
              <button 
                type="button" 
                className={`px-4 py-2 text-sm font-medium ${activeFilter === 'Residential' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border-t border-b border-gray-200`}
                onClick={() => setActiveFilter('Residential')}
              >
                Residential
              </button>
              <button 
                type="button" 
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${activeFilter === 'Commercial' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-200`}
                onClick={() => setActiveFilter('Commercial')}
              >
                Commercial
              </button>
            </div>
          </div>
        </AnimateOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredItems.map((item, index) => (
            <AnimateOnScroll 
              key={index} 
              type={
                index % 3 === 0 ? "slideRight" : 
                index % 3 === 1 ? "slideUp" : "slideLeft"
              }
              delay={0.1 * index}
              duration={0.9}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-colors duration-300">
                <div className="relative h-60">
                  {/* Metal strip at top */}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-300 z-10"></div>
                  
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs font-semibold text-primary mb-1">{item.category}</div>
                  <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.location}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
             
        {/* Yellow Banner Section - exact match to services page */}
        <AnimateOnScroll type="zoomIn" duration={0.9}>
          <section className="py-8 mb-8">
            <div className="container mx-auto px-4">
              <div className="bg-secondary p-8 rounded-lg text-center relative">
                {/* Screws in corners with improved design */}
                <div className="screw-corner screw-top-left"></div>
                <div className="screw-corner screw-top-right"></div>
                <div className="screw-corner screw-bottom-left"></div>
                <div className="screw-corner screw-bottom-right"></div>
                
                {/* Metal strips at top and bottom */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700"></div>
                
                <h2 className="text-2xl font-bold mb-4 text-primary">Ready to transform your property?</h2>
                <p className="mb-6 text-primary/80">
                  Contact us today to discuss your project and get a free estimate.
                </p>
                <Link href="/contact">
                  <Button variant="primary" size="lg">GET A FREE ESTIMATE</Button>
                </Link>
              </div>
            </div>
          </section>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
