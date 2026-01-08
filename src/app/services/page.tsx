'use client';

import Link from 'next/link';
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Phone, ArrowRight } from 'lucide-react';
import styles from './wood-texture.module.css';

// Define the Service interface
interface Service {
  slug: string;
  name: string;
  excerpt: string;
  features: string[];
  hero: string;
}


// Services data
const servicesData: Service[] = [
  {
    slug: '5-inch-gutters',
    name: '5\" Gutters',
    excerpt: 'Standard residential gutters for most homes with excellent water flow capacity.',
    features: [
      'Available in aluminum and steel',
      'Ideal for typical residential applications',
      '5-inch K-style profile',
      'Seamless installation'
    ],
    hero: '/images/gallery/ModernHouse.png'
  },
  {
    slug: '6-inch-gutters',
    name: '6\" Gutters',
    excerpt: 'Heavy-duty gutters for properties with large roof areas or heavy rainfall.',
    features: [
      'Handles 40% more water than 5" gutters',
      'Ideal for steep roofs',
      'Commercial-grade durability',
      'Reduced cleaning frequency'
    ],
    hero: '/images/gallery/snowyField.png'
  },
  {
    slug: 'soffit-fascia',
    name: 'Soffit & Fascia',
    excerpt: 'Complete roofline solutions that protect and enhance your home\'s exterior.',
    features: [
      'Improved ventilation',
      'Pest protection',
      'Enhanced curb appeal',
      'Moisture resistance'
    ],
    hero: '/images/gallery/LadderWorker.png'
  },
  {
    slug: 'gutter-cleaning',
    name: 'Gutter Cleaning',
    excerpt: 'Professional cleaning to prevent water damage and extend gutter life.',
    features: [
      'Debris removal',
      'Downspout flushing',
      'Leak inspection',
      'Full system check',
      'Ice dam removal & winter blockages',
      'Frozen downspout clearing',
      'Winter damage repair'
    ],
    hero: '/images/gallery/filledGutter.png'
  },
  {
    slug: 'downspouts',
    name: 'Downspouts',
    excerpt: 'Proper water drainage solutions to protect your foundation.',
    features: [
      'Custom sizing',
      'Multiple material options',
      'Foundation protection',
      'Custom extensions available'
    ],
    hero: '/images/gallery/Downspout.png'
  },
  {
    slug: 'industrial-eavestrough',
    name: 'Commercial Eavestrough',
    excerpt: 'Heavy-duty solutions for commercial and industrial properties.',
    features: [
      'High-capacity systems',
      'Commercial-grade materials',
      'Custom designs',
      'Minimal maintenance'
    ],
    hero: '/images/gallery/LacombeGuttersTrailerTruck.png'
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white relative">
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
          <div className="flex flex-col items-center sm:items-stretch sm:flex-row justify-center gap-4 sm:gap-6 w-full max-w-xs sm:max-w-none mx-auto">
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Get a Free Estimate
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

      <style jsx global>{`
        /* Construction Icons Animation */
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(10px, -15px) rotate(1deg); }
          66% { transform: translate(-10px, 10px) rotate(-1deg); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-1deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 20s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 25s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 30s linear infinite; }
        
        /* Service Area Grid Animation */
        @keyframes moveGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        @keyframes moveLines {
          0% { background-position: 0 0; }
          100% { background-position: 100% 100%; }
        }
        @keyframes moveLine {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100vw) rotate(45deg); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      {/* Services Grid with enhanced construction-themed background */}
      <section className="services-section py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100">
        {/* Enhanced Background with Construction Elements */}
        <div className="absolute inset-0">
          {/* Base Wood Grain */}
          <div className={styles.woodGrain}></div>
          
          {/* Animated Construction Symbols */}
          <div className="absolute inset-0 opacity-5 overflow-hidden">
            {/* Gutter Symbol */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-30 animate-float-slow">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path d="M3 4h18v3h-1v8h1v3h-6v-2h-2v2H8v-2H6v2H3v-3h1V7H3V4z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"/>
              </svg>
            </div>
            {/* Roof Symbol */}
            <div className="absolute top-1/3 right-1/4 w-40 h-40 opacity-20 animate-float-medium">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path d="M12 3l-10 9h20l-10-9z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </svg>
            </div>
            {/* Screw Symbol */}
            <div className="absolute bottom-1/4 left-1/3 w-16 h-16 opacity-25 animate-spin-slow">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path d="M12 2c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18c-1.1 0-2-.9-2-2v-1c0-1.1.9-2 2-2s2 .9 2 2v1c0 1.1-.9 2-2 2z" fill="currentColor"/>
              </svg>
            </div>
            {/* Ladder Symbol */}
            <div className="absolute top-1/2 right-1/3 w-20 h-32 opacity-20 animate-float-slower">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path d="M14 1v2h4v2h-4v2h-4V5H6V3h4V1h4zM6 7h12v2h-2v12h-2V9H8v12H6V7z" fill="currentColor"/>
              </svg>
            </div>
            {/* Toolbox Symbol */}
            <div className="absolute bottom-1/3 left-1/4 w-36 h-24 opacity-25 animate-float-medium">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path d="M19 5h-4V3H9v2H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zM9 12H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" fill="currentColor"/>
              </svg>
            </div>
          </div>
          
          {/* Metal Strip Decoration - Top and Bottom with Rivets */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-700/30 to-transparent border-t border-amber-800/20"></div>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-700/30 to-transparent border-b border-amber-800/20"></div>
          
          {/* Decorative Rivets */}
          {[...Array(6)].map((_, i) => (
            <div key={`top-${i}`} className={`absolute top-1 w-1.5 h-1.5 rounded-full bg-amber-700/30 border border-amber-800/30`} style={{left: `${(i + 1) * (100/7)}%`}}></div>
          ))}
          {[...Array(6)].map((_, i) => (
            <div key={`bottom-${i}`} className={`absolute bottom-1 w-1.5 h-1.5 rounded-full bg-amber-700/30 border border-amber-800/30`} style={{left: `${(i + 1) * (100/7)}%`}}></div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Expert Services</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional gutter solutions tailored to protect your property from water damage and enhance its curb appeal.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service: Service) => (
              <div 
                key={service.slug}
                className="group bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-amber-100 flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden flex-shrink-0">
                  <Image 
                    src={service.hero} 
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <h3 className="absolute bottom-0 left-0 right-0 p-6 text-2xl font-bold text-white">
                    {service.name}
                  </h3>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-gray-700 mb-4">
                    {service.excerpt}
                  </p>
                  
                  <div className="space-y-3 mb-6 flex-grow">
                    <h4 className="font-semibold text-gray-800">Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    {/* Learn More Button */}
                    <Link 
                      href={`/services/${service.slug}`}
                      className="block w-full text-center px-6 py-3 text-sm font-semibold text-blue-700 bg-transparent border-2 border-blue-700 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-600 hover:text-white hover:border-transparent rounded-full transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 inline transition-transform group-hover:translate-x-1" />
                    </Link>
                    
                    {/* Get Estimate Button */}
                    <div className="relative group w-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          sessionStorage.setItem('selectedService', service.name);
                          // Trigger the leaf animation
                          const leafContainer = document.querySelector('.leaf-pile-container') as HTMLElement & { blowAwayLeaves?: () => void };
                          if (leafContainer?.blowAwayLeaves) {
                            leafContainer.blowAwayLeaves();
                          } else {
                            // Fallback in case the animation doesn't trigger
                            window.location.href = '/contact';
                          }
                        }}
                        className="relative w-full flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-amber-600 to-amber-700 rounded-full border border-amber-700 hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        Get a Free Estimate
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Section - Modern Theme */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 text-white min-h-screen flex items-center">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(251, 190, 36, 0.3) 1px, transparent 0)',
              backgroundSize: '30px 30px',
            }}
          ></div>
        </div>
        
        {/* Subtle gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-blue-900/10"
          style={{
            animation: 'gradientShift 15s ease infinite',
            backgroundSize: '200% 200%'
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1 text-sm font-semibold text-yellow-400 bg-yellow-400/10 rounded-full mb-4">
              Service Coverage
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Service Area
            </h2>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We proudly serve the following areas in Central Alberta:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* North Boundary Card */}
            <div className="group relative bg-gray-800/90 p-8 rounded-xl border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/10 hover:-translate-y-1">
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-lg shadow-lg transform group-hover:scale-110 transition-transform duration-300">N</div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-4 pb-3 border-b border-gray-700/50">North Boundary</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2.5"></span>
                  <Link href="/service-areas/edmonton" className="hover:text-yellow-400 transition-colors">
                    Edmonton
                  </Link>
                </li>
                <li className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2.5"></span>
                  <Link href="/service-areas/st-albert" className="hover:text-yellow-400 transition-colors">
                    St. Albert
                  </Link>
                </li>
                <li className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2.5"></span>
                  <Link href="/service-areas/spruce-grove" className="hover:text-yellow-400 transition-colors">
                    Spruce Grove
                  </Link>
                </li>
                <li className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2.5"></span>
                  <Link href="/service-areas/leduc" className="hover:text-yellow-400 transition-colors">
                    Leduc
                  </Link>
                </li>
                <li className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2.5"></span>
                  <Link href="/service-areas/wetaskiwin" className="hover:text-yellow-400 transition-colors">
                    Wetaskiwin
                  </Link>
                </li>
              </ul>
            </div>

            {/* Central Region Card */}
            <div className="group relative bg-gray-800/90 p-8 rounded-xl border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/10 hover:-translate-y-1">
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-lg shadow-lg transform group-hover:scale-110 transition-transform duration-300">C</div>
              <h3 className="text-xl font-semibold text-blue-400 mb-4 pb-3 border-b border-gray-700/50">Central Region</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2.5"></span>
                  <Link href="/service-areas/lacombe" className="hover:text-blue-400 transition-colors">
                    Lacombe
                  </Link>
                </li>
                <li className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2.5"></span>
                  <Link href="/service-areas/red-deer" className="hover:text-blue-400 transition-colors">
                    Red Deer
                  </Link>
                </li>
                <li className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2.5"></span>
                  <Link href="/service-areas/stettler" className="hover:text-blue-400 transition-colors">
                    Stettler
                  </Link>
                </li>
                <li className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2.5"></span>
                  <Link href="/service-areas/sylvan-lake" className="hover:text-blue-400 transition-colors">
                    Sylvan Lake
                  </Link>
                </li>
                <li className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2.5"></span>
                  <Link href="/service-areas/ponoka" className="hover:text-blue-400 transition-colors">
                    Ponoka
                  </Link>
                </li>
              </ul>
            </div>

            {/* South Boundary Card */}
            <div className="group relative bg-gray-800/90 p-8 rounded-xl border border-gray-700/50 hover:border-green-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/10 hover:-translate-y-1">
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-lg shadow-lg transform group-hover:scale-110 transition-transform duration-300">S</div>
              <h3 className="text-xl font-semibold text-green-400 mb-4 pb-3 border-b border-gray-700/50">South Boundary</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2.5"></span>
                  <Link href="/service-areas/airdrie" className="hover:text-green-400 transition-colors">
                    Airdrie
                  </Link>
                </li>
                <li className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2.5"></span>
                  <Link href="/service-areas/calgary" className="hover:text-green-400 transition-colors">
                    Calgary
                  </Link>
                </li>
                <li className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2.5"></span>
                  <Link href="/service-areas/olds" className="hover:text-green-400 transition-colors">
                    Olds
                  </Link>
                </li>
                <li className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2.5"></span>
                  <Link href="/service-areas/penhold" className="hover:text-green-400 transition-colors">
                    Penhold
                  </Link>
                </li>
                <li className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2.5"></span>
                  <Link href="/service-areas/innisfail" className="hover:text-green-400 transition-colors">
                    Innisfail
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-800">
            <div className="relative bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full filter blur-3xl"></div>
              
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-amber-400 rounded-full"></div>
              <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-amber-400 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-amber-400 rounded-full"></div>
              
              <div className="text-center">
                <p className="text-xl font-medium text-white mb-6">
                  Not sure if we service your area?
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link 
                    href="/service-areas" 
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-lg font-medium flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/20"
                  >
                    View Service Area Map <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  
                  <span className="text-gray-300 text-sm">or</span>
                  
                  <a 
                    href="tel:4035989137" 
                    className="px-6 py-2.5 bg-gray-700/50 hover:bg-gray-600/70 text-white rounded-lg font-medium flex items-center transition-all duration-300 border border-gray-600/50 hover:border-amber-400/30"
                  >
                    <Phone className="h-4 w-4 mr-2" /> (403) 598-9137
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




    </main>
  );
}
