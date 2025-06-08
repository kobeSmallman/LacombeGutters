'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { Button } from './ui/button';
import { GalleryItem } from '../types/gallery';
import Link from 'next/link';
import Image from 'next/image';

interface GalleryClientProps {
  galleryItems: GalleryItem[];
}

// Animation variants for carousel - keeping for future use
// const carouselVariants = {
//   enter: (direction: number) => ({
//     x: direction > 0 ? 1000 : -1000,
//     opacity: 0
//   }),
//   center: {
//     x: 0,
//     opacity: 1
//   },
//   exit: (direction: number) => ({
//     x: direction < 0 ? 1000 : -1000,
//     opacity: 0
//   })
// };

// const swipeConfidenceThreshold = 10000;
// const swipePower = (offset: number, velocity: number) => {
export default function GalleryClient({ galleryItems = [] }: GalleryClientProps) {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  // Gallery state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const categories = useMemo(() => {
    const cats = new Set(galleryItems.map(item => item.category));
    return ['All', ...Array.from(cats)];
  }, [galleryItems]);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return galleryItems;
    return galleryItems.filter(item => item.category === activeFilter);
  }, [galleryItems, activeFilter]);

  // Update selected index when selectedItem changes
  useEffect(() => {
    if (!selectedItem || !galleryItems?.length) return;
    const idx = galleryItems.findIndex(item => item?.id === selectedItem.id);
    if (idx >= 0) {
      setSelectedIndex(idx);
      setCurrentIndex(idx);
    }
  }, [selectedItem, galleryItems]);

  const openLightbox = useCallback((item: GalleryItem) => {
    const idx = galleryItems.findIndex(i => i.id === item.id);
    if (idx >= 0) {
      setCurrentIndex(idx);
      setSelectedItem(item);
      setIsLightboxOpen(true);
      if (isAutoRotating) {
        setIsAutoRotating(false);
      }
    }
  }, [galleryItems, isAutoRotating]);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const toggleAutoRotate = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAutoRotating(prev => !prev);
  }, []);

  const navigateLightbox = useCallback((dir: 'prev' | 'next') => {
    if (!galleryItems?.length) return;
    
    let newIndex = 0;
    if (dir === 'next') {
      newIndex = (currentIndex + 1) % galleryItems.length;
    } else {
      newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    }
    
    setCurrentIndex(newIndex);
    setSelectedItem(galleryItems[newIndex]);
  }, [galleryItems, currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % filteredItems.length);
  }, [filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeLightbox]);

  useEffect(() => {
    if (!isAutoRotating || filteredItems.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % filteredItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoRotating, filteredItems.length]);

  useEffect(() => {
    if (!isAutoRotating || filteredItems.length <= 1) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [isAutoRotating, handleNext, filteredItems.length]);
  
  // Set up mounted state for SSR
  useEffect(() => {
    setMounted(true);
  }, []);
    
  if (!mounted) {
    // Return a static version for SSR to avoid hydration mismatch
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-lg mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i: number) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden h-80 animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative">
      <style jsx global>
        {`
          @keyframes moveLines {
            from { background-position: 0 0; }
            to { background-position: 0 40px; }
          }
          @keyframes moveGrid {
            from { background-position: 0 0; }
            to { background-position: 60px 60px; }
          }
          @keyframes float-slow {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(1deg); }
          }
          @keyframes float-medium {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(-1deg); }
          }
        `}
      </style>
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
              Our Work Gallery
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow-sm">
              Explore our portfolio of gutter installations, repairs, and maintenance projects
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-950/50">
          {/* Animated background pattern */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Moving diagonal lines */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'linear-gradient(45deg, #fbbe24 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                animation: 'moveLines 30s linear infinite',
                backgroundPosition: '0 0',
              }}
            ></div>
            
            {/* Moving grid */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'linear-gradient(to right, #fbbe24 1px, transparent 1px), linear-gradient(to bottom, #fbbe24 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                animation: 'moveGrid 20s linear infinite',
              }}
            ></div>

            {/* Floating construction elements */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={`float-${i}`}
                  className="absolute opacity-5 dark:opacity-[0.03]"
                  style={{
                    left: `${10 + (i * 12)}%`,
                    top: `${10 + (i * 8) % 80}%`,
                    width: '40px',
                    height: '40px',
                    animation: `float-${i % 2 === 0 ? 'slow' : 'medium'} ${15 + (i * 2)}s ease-in-out infinite`,
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    {i % 3 === 0 ? (
                      <path d="M3 4h18v3h-1v8h1v3h-6v-2h-2v2H8v-2H6v2H3v-3h1V7H3V4z" fill="currentColor"/>
                    ) : i % 3 === 1 ? (
                      <path d="M12 2c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18c-1.1 0-2-.9-2-2v-1c0-1.1.9-2 2-2s2 .9 2 2v1c0 1.1-.9 2-2 2z" fill="currentColor"/>
                    ) : (
                      <path d="M19 5h-4V3H9v2H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2z" fill="currentColor"/>
                    )}
                  </svg>
                </div>
              ))}
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
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Project Gallery</h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Browse through our collection of completed projects showcasing our quality workmanship
              </p>
            </div>
            
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeFilter === category
                        ? 'bg-amber-500 text-white'
                        : 'bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div 
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col h-full"
                  onClick={() => openLightbox(item)}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAExgJ5l0Vk0AAAAABJRU5ErkJggg=="
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white text-xl font-bold">{item.title}</h3>
                      </div>
                    </div>
                    {item.category && (
                      <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{item.description}</p>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{item.year}</span>
                      <button className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 text-sm font-medium transition-colors">
                        View Project
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          {/* No results message */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-inner mb-4">
                <svg 
                  className="w-8 h-8 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No projects found</h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                We couldn&apos;t find any projects matching your filter. Try selecting a different category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && selectedItem && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors z-10"
              aria-label="Close lightbox"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateLightbox('prev')}
              disabled={selectedIndex === 0}
              className={`absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors ${
                selectedIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Main Image */}
            <div className="relative max-w-4xl w-full max-h-[80vh] flex items-center justify-center">
              <motion.img
                key={selectedItem.id}
                src={selectedItem.image}
                alt={selectedItem.title}
                className="max-w-full max-h-[80vh] object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <button
              onClick={() => navigateLightbox('next')}
              disabled={selectedIndex === galleryItems.length - 1}
              className={`absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors ${
                selectedIndex === galleryItems.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Image Info */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg max-w-2xl w-full mx-4">
              <h3 className="text-lg font-semibold text-center">{selectedItem.title}</h3>
              {selectedItem.description && (
                <p className="text-sm text-center text-gray-200 mt-1">{selectedItem.description}</p>
              )}
            </div>

            {/* Auto-rotate Toggle */}
            <button
              onClick={toggleAutoRotate}
              className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label={isAutoRotating ? 'Pause auto-rotation' : 'Play auto-rotation'}
            >
              {isAutoRotating ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>
          </div>
        )}
      </AnimatePresence>

      {/* Service Area CTA */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 text-white">
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

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block px-4 py-1 text-sm font-semibold text-yellow-400 bg-yellow-400/10 rounded-full mb-4">
            Service Coverage
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Serving Central Alberta</h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
            We proudly serve Lacombe and surrounding areas with top-quality gutter services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                Get a Free Estimate
              </Button>
            </Link>
            <Link href="/service-areas">
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:border-white/50">
                View Service Areas
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
