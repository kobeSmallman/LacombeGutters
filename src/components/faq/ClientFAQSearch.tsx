'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Search } from 'lucide-react';
import { FAQConfig } from '../../content/faq';
import { useSearchParams, usePathname } from 'next/navigation';
import { Input } from '../ui/input';

// Complete client component with search functionality
export default function ClientFAQSearch() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle search input change with debounce
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Update URL immediately for better UX
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }
    window.history.replaceState({}, '', `${pathname}?${params.toString()}`);
  }, [pathname, searchParams]);

  // Only update the search query when initialQuery changes
  useEffect(() => {
    if (searchQuery !== initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery, searchQuery]);

  return (
    <div className="relative bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-12 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-10 w-full max-w-6xl mx-auto">
      {/* Screw corners */}
      <div className="screw-corner screw-top-left"></div>
      <div className="screw-corner screw-top-right"></div>
      <div className="screw-corner screw-bottom-left"></div>
      <div className="screw-corner screw-bottom-right"></div>
      
      {/* Metal strip at top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary/10"></div>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
          <Search className="h-10 w-10 text-primary" />
        </div>
        <Input
          type="search"
          value={searchQuery}
          onChange={handleSearch}
          placeholder={isMobile ? "Search FAQs..." : `Search across ${FAQConfig.faq.length} frequently asked questions...`}
          className="pl-20 py-8 text-xl md:text-2xl font-medium bg-white dark:bg-gray-900 border-3 border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-md w-full shadow-lg text-gray-800 dark:text-gray-100"
          style={{ height: 'auto' }}
          aria-label="Search FAQs"
        />
      </div>
    </div>
  );
}
