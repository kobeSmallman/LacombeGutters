'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Search } from 'lucide-react';
import { FAQConfig } from '@/content/faq';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { debounce } from '@/lib/utils';

// This is the component that uses client-side hooks
function SearchInputWithParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Update URL with search query
  const updateSearchParams = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  // Fix the debounce implementation to avoid ESLint warning
  const debouncedUpdate = useCallback((value: string) => {
    const debouncedFn = debounce((searchValue: string) => {
      updateSearchParams(searchValue);
    }, 300);
    debouncedFn(value);
  }, [updateSearchParams]);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedUpdate(value);
  };

  // Set initial value from URL
  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
        <Search className="h-10 w-10 text-primary" />
      </div>
      <Input
        type="search"
        value={searchQuery}
        onChange={handleSearch}
        placeholder={`Search across ${FAQConfig.faq.length} frequently asked questions...`}
        className="pl-20 py-8 text-xl md:text-2xl font-medium bg-white dark:bg-gray-900 border-3 border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-md w-full shadow-lg text-gray-800 dark:text-gray-100"
        style={{ fontSize: '1.5rem', height: 'auto' }}
      />
    </div>
  );
}

// This is the main export that wraps the client component
export default function FAQSearch() {
  return (
    <div className="relative bg-white dark:bg-gray-800 p-8 md:p-12 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-10 w-full max-w-6xl mx-auto">
      {/* Proper screw corners using div implementation */}
      <div className="screw-corner screw-top-left"></div>
      <div className="screw-corner screw-top-right"></div>
      <div className="screw-corner screw-bottom-left"></div>
      <div className="screw-corner screw-bottom-right"></div>
      
      {/* Metal strip at top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary/10"></div>
      
      <SearchInputWithParams />
    </div>
  );
}
