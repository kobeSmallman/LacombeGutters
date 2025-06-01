"use client";

import { useState } from "react";
import dynamic  from "next/dynamic";
import Link     from "next/link";
import { MapPin, Search, Check, Hammer, Ruler } from "lucide-react";

import { SERVICE_POLYGON } from "@/components/ServiceAreaMap";
import { Button } from "@/components/ui/Button";
import { Input  } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent }
  from "@/components/ui/card";

const ServiceAreaMap = dynamic(() => import("@/components/ServiceAreaMap"), {
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
  const [query, setQuery]   = useState("");
  const [status, setStatus] = useState<'idle'|'loading'|'done'>("idle");
  const [inside, setInside] = useState<boolean|null>(null);
  const [searchedLocation, setSearchedLocation] = useState<[number, number] | null>(null);
  const [error, setError]   = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    
    setStatus("loading");
    setError("");
    
    try {
      // Check if the query already includes a province/state/country
      const hasRegion = /\b(?:AB|Alberta|Canada|,\s*[A-Za-z\s]+)$/i.test(query);
      const searchQuery = hasRegion ? query : `${query} Alberta`;
      
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      if (!res.ok) throw new Error("Failed to fetch location");
      
      let data = await res.json();
      
      // If no results with Alberta, try without it
      if (!data.length && !hasRegion) {
        const retryRes = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
        );
        if (retryRes.ok) {
          data = await retryRes.json();
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
  }

  return (
    <section className="space-y-24">
      {/* ── Hero banner ─────────────────────────────────────────── */}
      <header className="relative isolate overflow-hidden text-white bg-gradient-to-br from-slate-800 to-slate-900">
        {/* Dotted-node overlay (yellow construction pin-holes) */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(#fbbe24 1.5px, transparent 1.6px)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Subtle angled plate for depth */}
        <div
          className="absolute -top-32 -right-44 w-[150%] h-[180%] bg-slate-700/30"
          style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)" }}
        />

        <div className="relative z-10 py-24 md:py-32 px-6 md:px-16 text-center space-y-5 md:space-y-6">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight drop-shadow-lg">
            Central Alberta Service Area
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow-sm">
            Professional Gutter Installation &amp; Maintenance Since&nbsp;2009
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-6 md:pt-8">
            <Button
              asChild
              size="xl"
              variant="constructionYellow"
              className="text-lg shadow-xl hover:scale-105 active:scale-95 transition-transform"
            >
              <Link href="/contact" className="px-6 py-3">
                Free Estimate
              </Link>
            </Button>

            <Button
              asChild
              size="xl"
              variant="outline"
              className="text-lg text-white border-white/60 hover:bg-white/10 shadow-xl hover:scale-105 active:scale-95 transition-transform"
            >
              <Link href="tel:+14035989137" className="px-6 py-3">
                Call (403) 598-9137
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ── Map & Search ───────────────────────────────────────── */}
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: Search Panel */}
            <div className="p-8 md:p-10 bg-white border-b md:border-b-0 md:border-r border-gray-200">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Check Your Location
                  </h2>
                  <p className="text-gray-600">
                    Enter your Alberta address to verify coverage in your area. Include city name for best results.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Enter your street address"
                      className="pl-10 w-full text-base h-12"
                      disabled={status === 'loading'}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Checking...
                      </span>
                    ) : 'Check Coverage'}
                  </Button>
                </form>

                {error && (
                  <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {status === 'done' && (
                  <Card className="mt-6 overflow-hidden border border-gray-200 shadow-sm">
                    <CardHeader className={`pb-3 ${inside ? 'bg-green-50' : 'bg-blue-50'} border-b`}>
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full ${inside ? 'bg-green-100' : 'bg-blue-100'} mr-3`}>
                          <Check className={`h-5 w-5 ${inside ? 'text-green-600' : 'text-blue-600'}`} />
                        </div>
                        <CardTitle className={`text-lg ${inside ? 'text-green-800' : 'text-blue-800'}`}>
                          {inside ? 'We Service Your Area!' : 'Service Not Available'}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className={`mb-4 ${inside ? 'text-green-700' : 'text-blue-700'}`}>
                        {inside ? (
                          'Great news! We provide gutter services in your area.'
                        ) : (
                          'We currently do not service this area, but we may be able to make exceptions. Contact us to discuss your needs.'
                        )}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button 
                          asChild 
                          variant={inside ? 'primary' : 'outline'}
                          size="sm"
                          className="flex-1"
                        >
                          <Link href="/contact">
                            {inside ? 'Get a Free Estimate' : 'Contact Us'}
                          </Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-gray-300"
                        >
                          <a href="tel:+14035989137" className="flex items-center justify-center">
                            <MapPin className="mr-2 h-4 w-4" />
                            (403) 598-9137
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Right: Map */}
            <div className="h-[500px] md:h-auto bg-gray-100">
              <ServiceAreaMap highlight={searchedLocation} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Service Area Details ──────────────────────────────── */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Coverage Area</h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ruler className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">North Boundary</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Edmonton</li>
                  <li>• Leduc</li>
                  <li>• Beaumont</li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Hammer className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Central Area</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Lacombe</li>
                  <li>• Red Deer</li>
                  <li>• Blackfalds</li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">South Boundary</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Airdrie</li>
                  <li>• Calgary</li>
                  <li>• Okotoks</li>
                </ul>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Don&apos;t see your city?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We don&apos;t service your area yet? We&apos;re expanding our coverage and would love to hear from you! Send us a message and let us know where you&apos;re located.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact?subject=Service%20Area%20Request">
                    Request Service in Your Area
                  </Link>
                </Button>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800/50">
                <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">Special Request?</h3>
                <p className="text-blue-800 dark:text-blue-200 mb-4">
                  Need service outside our regular coverage area? Contact us for special arrangements.
                </p>
                <Button asChild variant="primary" className="w-full">
                  <Link href="/contact?subject=Special%20Service%20Request">
                    Send Special Request
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Don&apos;t see your city listed?
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                    <p>
                      We&apos;re constantly expanding our service area! If you don&apos;t see your location in our coverage map, please send us a message through our <Link href="/contact" className="font-medium underline text-yellow-800 dark:text-yellow-200 hover:text-yellow-600 dark:hover:text-yellow-400">contact page</Link> with your address. We&apos;ll let you know if we can accommodate your area or add it to our expansion plans.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
