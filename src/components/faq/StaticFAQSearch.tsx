'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { FAQConfig } from '../../content/faq';
import { Input } from '../ui/input';

export default function StaticFAQSearch() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Only enable interactive features after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!mounted) return;
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 p-8 md:p-12 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-10 w-full max-w-6xl mx-auto">
      {/* Proper screw corners using div implementation */}
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
          onChange={handleChange}
          placeholder={`Search across ${FAQConfig.faq.length} frequently asked questions...`}
          className="pl-20 py-8 text-xl md:text-2xl font-medium bg-white dark:bg-gray-900 border-3 border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-md w-full shadow-lg text-gray-800 dark:text-gray-100"
          style={{ fontSize: '1.5rem', height: 'auto' }}
        />
      </div>
    </div>
  );
}
