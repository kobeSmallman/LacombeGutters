'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";
import { Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SnowflakeProps {
  delay: number;
  duration: number;
  size: number;
  startX: number;
}

const Snowflake = ({ delay, duration, size, startX }: SnowflakeProps) => {
  // Use deterministic values based on position to avoid hydration mismatch
  const opacity = 0.6 + ((startX * 7) % 40) / 100; // Deterministic opacity between 0.6-1.0
  const swayAmount = 20 + ((startX * 3) % 30); // Deterministic sway amount
  
  return (
    <div
      className="snowflake absolute pointer-events-none select-none text-white"
      style={{
        left: `${startX}%`,
        top: '-30px',
        fontSize: `${size >= 8 ? size : 8}px`, // Ensure minimum size of 8px
        opacity,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        animationName: 'snowfall',
        '--sway-amount': `${swayAmount}px`,
        lineHeight: 1,
        fontFamily: 'system-ui, -apple-system, sans-serif', // Ensure emoji renders properly
      } as React.CSSProperties & { '--sway-amount': string }}
    >
      ❄
    </div>
  );
};

const WinterServicesSection = () => {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check initial screen size
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    
    // Listen for window resize
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      mediaQuery.removeEventListener('change', handler);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Generate deterministic snowflakes data to avoid hydration mismatch
  const snowflakeCount = prefersReducedMotion ? 8 : (isMobile ? 35 : 60);
  const baseSize = isMobile ? 10 : 12; // Smaller base size on mobile
  const sizeVariation = isMobile ? 8 : 12; // Less size variation on mobile
  
  // Use deterministic values to prevent hydration mismatch
  const snowflakes = mounted ? Array.from({ length: snowflakeCount }, (_, i) => ({
    id: i,
    delay: (i * 0.8) % 15, // Deterministic delay pattern
    duration: 8 + (i % 8), // Deterministic duration (8-16 seconds)
    size: baseSize + (i % sizeVariation), // Deterministic size variation
    startX: (i * 7.3) % 100, // Deterministic starting position
  })) : [];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-blue-800 to-slate-800 text-white min-h-[90vh] flex items-center winter-section">
      {/* Snow animation background - clipped to section bounds */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {snowflakes.map((snowflake) => (
            <Snowflake 
              key={snowflake.id} 
              delay={snowflake.delay}
              duration={snowflake.duration}
              size={snowflake.size}
              startX={snowflake.startX}
            />
          ))}
        </div>
      )}

      {/* Winter frost effect overlay for atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-slate-900/20"></div>
      
      {/* Winter decorative elements */}
      <div className="absolute top-8 right-8 text-4xl text-white/30 animate-pulse">
        ❄️
      </div>
      <div className="absolute bottom-8 left-8 text-3xl text-white/25 animate-pulse" style={{ animationDelay: '1s' }}>
        🌨️
      </div>
      <div className="absolute top-1/4 left-12 text-2xl text-white/20 animate-pulse" style={{ animationDelay: '2s' }}>
        ❄️
      </div>
      <div className="absolute bottom-1/4 right-16 text-xl text-white/15 animate-pulse" style={{ animationDelay: '3s' }}>
        🌨️
      </div>
      
      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-20">
        <AnimateOnScroll type="fadeIn" delay={0.2} className="text-center">
          <div className="relative max-w-5xl mx-auto">
            {/* Winter badge */}
            <div className="inline-flex items-center bg-blue-900/30 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-blue-400/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="font-bold text-blue-100">Winter Services Available</span>
            </div>

            {/* Main heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Winter Eavestrough Services
            </h2>
            
            {/* Subtext */}
            <p className="text-xl md:text-2xl text-blue-50 font-medium max-w-4xl mx-auto mb-12 leading-relaxed">
              We provide full installations in winter and fix common cold-weather issues like ice dams, ice blockages, and winter leaks.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: "🔧",
                  title: "Full eavestrough installations in winter",
                  desc: "Complete gutter system installation even during cold months"
                },
                {
                  icon: "🧊",
                  title: "Ice dam removal & trouble-spot fixes",
                  desc: "Eliminate dangerous ice dams and repair problem areas"
                },
                {
                  icon: "❄️",
                  title: "Ice blockages / frozen downspouts cleared",
                  desc: "Restore proper water flow during freeze-thaw cycles"
                },
                {
                  icon: "💧",
                  title: "Leak repairs caused by winter backup",
                  desc: "Fix leaks and damage from ice and snow accumulation"
                },
                {
                  icon: "🏠",
                  title: "Sagging / separated sections from ice weight",
                  desc: "Repair structural damage from heavy ice loads"
                },
                {
                  icon: "🌨️",
                  title: "Targeted cleanouts to restore winter flow",
                  desc: "Remove debris and blockages affecting winter drainage"
                }
              ].map((item, index) => (
                <AnimateOnScroll
                  key={index}
                  type="fadeIn"
                  delay={0.4 + (index * 0.1)}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 transition-all duration-300 hover:bg-white/15 hover:border-blue-300/30 hover:-translate-y-1 h-full">
                    <div className="text-4xl mb-4 text-center">{item.icon}</div>
                    <h3 className="text-lg font-bold mb-3 text-white text-center leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-blue-100 text-sm leading-relaxed text-center">
                      {item.desc}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            {/* CTA buttons */}
            <AnimateOnScroll type="fadeIn" delay={1.0}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/contact" className="group w-full sm:w-auto text-center">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    Get Free Estimate
                  </Button>
                </Link>
                <Link href="tel:+14035989137" className="group w-full sm:w-auto">
                  <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    <Phone className="w-5 h-5 mr-2" />
                    Call or Text
                  </Button>
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </AnimateOnScroll>
      </div>

      {/* CSS for working snowfall animation with mobile optimization */}
      <style jsx>{`
        .winter-section {
          position: relative;
          overflow: hidden;
          /* Hardware acceleration for better mobile performance */
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
        }
        
        .snowflake {
          user-select: none;
          pointer-events: none;
          position: absolute;
          z-index: 1;
          /* Optimize for mobile performance */
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        @keyframes snowfall {
          0% {
            transform: translateY(-50px) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh + 100px)) translateX(var(--sway-amount));
            opacity: 0;
          }
        }
        
        /* Varied timing functions for natural movement */
        .snowflake:nth-child(2n) {
          animation-timing-function: ease-in-out;
        }
        
        .snowflake:nth-child(3n) {
          animation-timing-function: linear;
        }
        
        .snowflake:nth-child(4n) {
          animation-timing-function: ease-out;
        }
        
        /* Enhanced visibility for all screen sizes */
        .snowflake {
          color: white !important;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.4);
          filter: drop-shadow(0 0 3px rgba(255,255,255,0.6));
          -webkit-filter: drop-shadow(0 0 3px rgba(255,255,255,0.6));
        }
        
        /* Mobile-specific optimizations */
        @media (max-width: 767px) {
          .snowflake {
            /* Reduce visual effects on mobile for better performance */
            text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
            filter: drop-shadow(0 0 2px rgba(255,255,255,0.4));
            -webkit-filter: drop-shadow(0 0 2px rgba(255,255,255,0.4));
          }
          
          .winter-section {
            /* Ensure proper clipping on mobile */
            -webkit-overflow-scrolling: touch;
          }
        }
        
        /* Reduced motion styles */
        @media (prefers-reduced-motion: reduce) {
          .snowflake {
            animation-duration: 20s !important;
            opacity: 0.3 !important;
            transform: translateY(0) !important;
            filter: none !important;
            -webkit-filter: none !important;
          }
        }
        
        /* Very small screens - further optimization */
        @media (max-width: 480px) {
          .snowflake {
            font-size: 10px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WinterServicesSection;