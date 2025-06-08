"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, Search, Check, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SERVICE_POLYGON } from "@/components/ServiceAreaMap";

const ServiceAreaMapDynamic = dynamic(() => import("@/components/ServiceAreaMap"), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full bg-neutral-100 animate-pulse" />,
});

function pointInPolygon([lat, lon]: [number, number], poly: [number, number][]) {
  const x = lon, y = lat;
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [yi, xi] = poly[i];
    const [yj, xj] = poly[j];
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

export default function ServiceAreaContent() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<'idle'|'loading'|'done'>("idle");
  const [inside, setInside] = useState<boolean|null>(null);
  const [searchedLocation, setSearchedLocation] = useState<[number, number] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Array(8).fill(0).forEach(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 200 + 100}%`,
      animationDuration: `${Math.random() * 40 + 40}s`,
      animationDelay: `-${Math.random() * 20}s`,
      opacity: 0.7
    }));
    
    Array(15).fill(0).forEach(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animation: `pulsePin ${Math.random() * 3 + 2}s ease-in-out infinite`,
      animationDelay: `-${Math.random() * 5}s`
    }));
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setStatus('loading');
    setError('');
    
    try {
      const hasRegion = /\b(?:AB|Alberta|Canada|,\s*[A-Za-z\s]+)$/i.test(query);
      const searchQuery = hasRegion ? query : `${query} Alberta`;
      
      let res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      
      if (!res.ok) throw new Error("Failed to fetch location");
      
      let data = await res.json();
      
      // If no results with Alberta, try without it
      if (!data.length && !hasRegion) {
        res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
        );
        if (res.ok) {
          data = await res.json();
        }
      }
      
      if (!data.length) throw new Error("Location not found. Please try a different address or be more specific (e.g., include city and province).");

      const { lat, lon, display_name } = data[0];
      // Verify the location is in Alberta
      if (!display_name.match(/Alberta|AB(?:\s*,\s*Canada)?$/i)) {
        throw new Error("We currently only service locations in Alberta, Canada. Please try an Alberta address.");
      }
      
      const location: [number, number] = [parseFloat(lat), parseFloat(lon)];
      const inArea = pointInPolygon(location, SERVICE_POLYGON);

      setSearchedLocation(location);
      setInside(inArea);
      setStatus('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden text-white bg-gradient-to-br from-slate-800 to-slate-900">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(#fbbe24 1.5px, transparent 1.6px)', backgroundSize: '28px 28px' }}
        />
        <div
          className="absolute -top-32 -right-44 w-[150%] h-[180%] bg-slate-700/30"
          style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}
        />
        <div className="relative z-10 py-24 md:py-32 px-6 md:px-16 text-center space-y-5 md:space-y-6">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight drop-shadow-lg">
            Central Alberta Service Area
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow-sm">
            Professional Gutter Installation & Maintenance Since 2009
          </p>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-28 sm:pr-32 py-4 sm:py-6 text-base sm:text-lg rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="Enter your address or city"
                disabled={status === 'loading'}
              />
              <Button
                type="submit"
                variant="primary"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-10 sm:h-12 px-3 sm:px-6 rounded-lg text-sm sm:text-base whitespace-nowrap"
                disabled={status === 'loading' || !query.trim()}
              >
                {status === 'loading' ? 'Checking...' : 'Check'}
              </Button>
            </div>
          </form>
          
          {error && (
            <p className="mt-4 text-red-400">{error}</p>
          )}
          
          {status === 'done' && searchedLocation && (
            <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg max-w-2xl mx-auto">
              <div className={`flex items-center justify-center space-x-3 text-lg ${inside ? 'text-green-300' : 'text-amber-300'}`}>
                {inside ? (
                  <>
                    <Check className="h-6 w-6" />
                    <span>Great news! We service your area.</span>
                  </>
                ) : (
                  <>
                    <MapPin className="h-6 w-6" />
                    <span>We don&apos;t currently service your area, but we&apos;re expanding!</span>
                  </>
                )}
              </div>
              {!inside && (
                <p className="mt-4 text-blue-100">
                  Contact us to be notified when we expand to your area.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Map Section with Animated Wave Background */}
      <section className="relative py-20 overflow-hidden min-h-[80vh] flex items-center">
        {/* Animated Wave Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-900/5"></div>
          
          {/* Bottom Waves - Double width for seamless looping */}
          <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden">
            {/* Wave Layer 1 - Slowest, Deepest */}
            <div className="absolute -bottom-1/4 left-0 w-[400%] h-[250%] wave-animation-slow">
              <svg 
                className="w-full h-full" 
                viewBox="0 0 1200 400" 
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M0,400C0,400,0,200,0,200C0,200,100,300,300,300C500,300,600,100,800,100C1000,100,1100,300,1300,300C1500,300,1600,100,1800,100C2000,100,2100,300,2300,300C2500,300,2500,100,2700,50C2900,0,3000,100,3000,100L3000,400L0,400Z"
                  className="fill-blue-200/30 dark:fill-blue-900/20"
                />
              </svg>
            </div>
            
            {/* Wave Layer 2 - Medium Speed */}
            <div className="absolute -bottom-1/4 left-0 w-[400%] h-[220%] wave-animation-medium">
              <svg 
                className="w-full h-full" 
                viewBox="0 0 1200 400" 
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M0,400C0,400,0,200,0,200C0,200,150,300,300,300C450,300,600,200,900,200C1200,200,1200,300,1500,300C1800,300,1800,200,2100,150C2400,100,2400,0,2700,0C3000,0,3000,100,3000,100L3000,400L0,400Z"
                  className="fill-blue-300/40 dark:fill-blue-800/30"
                />
              </svg>
            </div>
            
            {/* Wave Layer 3 - Fastest, Closest */}
            <div className="absolute -bottom-1/4 left-0 w-[400%] h-[200%] wave-animation-fast">
              <svg 
                className="w-full h-full" 
                viewBox="0 0 1200 400" 
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M0,400C0,400,0,200,0,200C0,200,100,300,200,300C300,300,400,200,600,250C800,300,1000,400,1200,400C1400,400,1600,300,1800,250C2000,200,2200,200,2400,200C2600,200,2800,200,3000,200C3200,200,3200,200,3200,200L3200,400L0,400Z"
                  className="fill-blue-400/50 dark:fill-blue-700/40"
                />
              </svg>
            </div>
          </div>

          {/* Top Waves (Mirrored) - Double width for seamless looping */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rotate-180">
            {/* Wave Layer 1 - Slowest, Deepest */}
            <div className="absolute -bottom-1/4 left-0 w-[400%] h-[250%] wave-animation-slow">
              <svg 
                className="w-full h-full" 
                viewBox="0 0 1200 400" 
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M0,400C0,400,0,200,0,200C0,200,100,300,300,300C500,300,600,100,800,100C1000,100,1100,300,1300,300C1500,300,1600,100,1800,100C2000,100,2100,300,2300,300C2500,300,2500,100,2700,50C2900,0,3000,100,3000,100L3000,400L0,400Z"
                  className="fill-blue-200/20 dark:fill-blue-900/15"
                />
              </svg>
            </div>
            
            {/* Wave Layer 2 - Medium Speed */}
            <div className="absolute -bottom-1/4 left-0 w-[400%] h-[220%] wave-animation-medium">
              <svg 
                className="w-full h-full" 
                viewBox="0 0 1200 400" 
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M0,400C0,400,0,200,0,200C0,200,150,300,300,300C450,300,600,200,900,200C1200,200,1200,300,1500,300C1800,300,1800,200,2100,150C2400,100,2400,0,2700,0C3000,0,3000,100,3000,100L3000,400L0,400Z"
                  className="fill-blue-300/30 dark:fill-blue-800/20"
                />
              </svg>
            </div>
            
            {/* Wave Layer 3 - Fastest, Closest */}
            <div className="absolute -bottom-1/4 left-0 w-[400%] h-[200%] wave-animation-fast">
              <svg 
                className="w-full h-full" 
                viewBox="0 0 1200 400" 
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M0,400C0,400,0,200,0,200C0,200,100,300,200,300C300,300,400,200,600,250C800,300,1000,400,1200,400C1400,400,1600,300,1800,250C2000,200,2200,200,2400,200C2600,200,2800,200,3000,200C3200,200,3200,200,3200,200L3200,400L0,400Z"
                  className="fill-blue-400/40 dark:fill-blue-700/25"
                />
              </svg>
            </div>
          </div>
          
          {/* Center Content Mask */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-20% via-transparent via-50% to-transparent to-80%" />
          
          {/* Subtle grid overlay */}
          <div 
            className="absolute inset-0 opacity-30 dark:opacity-10" 
            style={{
              backgroundImage: 'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)',
              transform: 'translateZ(0)'
            }}
          />
        </div>
        
        {/* Map Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/30 dark:border-gray-700/50">
              <ServiceAreaMapDynamic highlight={searchedLocation} />
            </div>
          </div>
        </div>
        
        {/* Animation keyframes are defined in globals.css */}
      </section>

      {/* Coverage Areas Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/construction-pattern.png')] opacity-30" style={{ backgroundSize: 'cover' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-800/80" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1 text-sm font-semibold text-yellow-400 bg-yellow-400/10 rounded-full mb-4">
              Service Coverage
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Coverage Area
            </h2>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We proudly serve the following areas in Central Alberta:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* North Card */}
            <div className="group relative bg-gray-800/90 p-8 rounded-xl border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/10 hover:-translate-y-1">
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-lg shadow-lg transform group-hover:scale-110 transition-transform duration-300">N</div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-4 pb-3 border-b border-gray-700/50">North Boundary</h3>
              <ul className="space-y-2">
                {['Edmonton', 'St. Albert', 'Spruce Grove'].map((city, i) => (
                  <li key={i} className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2.5"></span>
                    {city}
                  </li>
                ))}
              </ul>
            </div>

            {/* Central Card */}
            <div className="group relative bg-gray-800/80 p-8 rounded-lg border border-gray-700/50 hover:border-blue-400/50 transition-colors hover:shadow-lg hover:shadow-blue-400/10 hover:-translate-y-1">
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transform group-hover:scale-110 transition-transform duration-300">C</div>
              <h3 className="text-xl font-semibold text-blue-400 mb-4 pb-3 border-b border-gray-700/50">Central Region</h3>
              <ul className="space-y-2">
                {['Lacombe', 'Red Deer', 'Blackfalds'].map((city, i) => (
                  <li key={i} className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2.5"></span>
                    {city}
                  </li>
                ))}
              </ul>
            </div>

            {/* South Card */}
            <div className="group relative bg-gray-800/80 p-8 rounded-lg border border-gray-700/50 hover:border-green-400/50 transition-colors hover:shadow-lg hover:shadow-green-400/10 hover:-translate-y-1">
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transform group-hover:scale-110 transition-transform duration-300">S</div>
              <h3 className="text-xl font-semibold text-green-400 mb-4 pb-3 border-b border-gray-700/50">South Boundary</h3>
              <ul className="space-y-2">
                {['Ponoka', 'Wetaskiwin', 'Leduc'].map((city, i) => (
                  <li key={i} className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2.5"></span>
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Button asChild variant="secondary" size="lg" className="group bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                <Link href="/contact" className="flex items-center gap-2">
                  <Phone className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Request a Free Estimate
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="group border-gray-600 hover:border-yellow-400 hover:bg-gray-700/50">
                <Link href="/contact?subject=Special%20Service%20Request" className="flex items-center gap-2 text-white">
                  <span>Special Request</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </Button>
            </div>
            
            <p className="mt-6 text-gray-400">
              We&apos;re currently expanding our service area. Contact us to see if we serve your neighborhood!
            </p>
          </div>
        </div>
      </section>

      {/* Global Keyframes */}
      <style jsx global>{`
        @keyframes panTexture {
          0% { background-position: 0 0; }
          100% { background-position: 400px 400px; }
        }
        @keyframes panGrid {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
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
        @keyframes panDiagonal {
          0% { background-position: 0 0; }
          100% { background-position: 400px 400px; }
        }
        @keyframes pulsePin {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.8;
          }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.15; }
        }
        .animate-panDiagonal {
          animation: panDiagonal 160s linear infinite;
        }
        .animate-panDiagonalReverse {
          animation: panDiagonalReverse 160s linear infinite;
        }
        .animate-pulseGlow {
          animation: pulseGlow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
