'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import AnimateOnScroll from '@/components/ui/animate-on-scroll';
import RainEffect from '@/components/ui/rain-effect';

export default function HomepageCTA() {
  const [isSunny, setIsSunny] = useState(false);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden text-white min-h-[90vh] flex items-center justify-center">
      {/* Rainy backdrop (default) */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-gray-900 to-blue-900 transition-opacity duration-[900ms] ease-out ${
          isSunny ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      />

      {/* Sunny backdrop (revealed on button hover) */}
      <div
        className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${
          isSunny ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'linear-gradient(to bottom, #7ec5e8 0%, #b9deef 45%, #f4d98a 90%, #f5b942 100%)',
        }}
        aria-hidden="true"
      />

      {/* Sun — appears when sunny, positioned beyond the glass card */}
      <div
        className={`hidden md:block absolute top-16 right-12 lg:right-24 w-32 h-32 lg:w-40 lg:h-40 rounded-full transition-all duration-[900ms] ease-out ${
          isSunny ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
        style={{
          background: 'radial-gradient(circle, #fff8d6 0%, #ffd34a 55%, #ffb928 100%)',
          boxShadow:
            '0 0 80px 20px rgba(255, 200, 60, 0.55), 0 0 200px 60px rgba(255, 220, 120, 0.3)',
        }}
        aria-hidden="true"
      />

      {/* Rain effect — fades out when sunny */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-[900ms] ease-out ${
          isSunny ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <RainEffect />
      </div>

      {/* Outer vignette — softens (but doesn't disappear) when sunny so the dark panel still pops */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="relative w-full max-w-5xl mx-auto">
          <div
            className="absolute inset-0 mx-4 rounded-xl transition-[box-shadow] duration-[900ms] ease-out"
            style={{
              boxShadow: isSunny
                ? '0 0 0 100vmax rgba(0,0,0,0.18)'
                : '0 0 0 100vmax rgba(0,0,0,0.5)',
              clipPath: 'inset(0 0 0 0 round 1rem)',
            }}
          />
        </div>
      </div>

      {/* Glass pane content */}
      <div className="container mx-auto px-4 relative z-20 py-16">
        <AnimateOnScroll type="fadeIn" delay={0.2} className="text-center">
          <div className="relative max-w-4xl mx-auto bg-white/20 backdrop-blur-sm rounded-xl border-2 border-white/30 shadow-lg overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5"
              style={{
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
            />
            <div className="absolute inset-0 bg-primary opacity-80" />

            <div className="relative z-10 p-8 lg:p-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Professional Gutter Protection
              </h2>
              <p className="text-xl md:text-2xl text-gray-100 mb-6 max-w-3xl mx-auto leading-relaxed">
                Keep your home safe from water damage with our expert gutter solutions. Our
                team&apos;s 40+ years of combined experience means your home gets the best
                protection against the elements.
              </p>
              <p className="text-lg text-white font-medium mb-8">
                Free estimates &amp; guaranteed workmanship
              </p>
              <div
                className="flex flex-col sm:flex-row items-center justify-center w-full gap-6"
                onPointerEnter={() => setIsSunny(true)}
                onPointerLeave={() => setIsSunny(false)}
              >
                <Link href="/contact" className="group w-full sm:w-auto text-center">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    GET YOUR FREE ESTIMATE
                  </Button>
                </Link>
                <Link href="tel:+14035989137" className="group w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
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
  );
}
