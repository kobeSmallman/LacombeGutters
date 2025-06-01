'use client';

import React from 'react';
import Link from 'next/link';

const CITIES = [
  { name: 'Red Deer', distance: '25 min', slug: 'red-deer' },
  { name: 'Lacombe', distance: '15 min', slug: 'lacombe' },
  { name: 'Blackfalds', distance: '20 min', slug: 'blackfalds' },
  { name: 'Sylvan Lake', distance: '30 min', slug: 'sylvan-lake' },
  { name: 'Bentley', distance: '30 min', slug: 'bentley' },
  { name: 'Ponoka', distance: '35 min', slug: 'ponoka' },
] as const;

export default function NewServiceAreasPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <header className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Our Service Areas
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Serving Central Alberta with 40+ years of combined experience
        </p>
      </header>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CITIES.map((city) => (
            <div 
              key={city.slug}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {city.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {city.distance} from our location
                </p>
                <Link
                  href={`/${city.slug}`}
                  className="inline-flex items-center mt-4 text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
                >
                  View services in {city.name}
                  <svg 
                    className="w-4 h-4 ml-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>Need service in another area? Contact us to see if we can help!</p>
        </div>
      </footer>
    </div>
  );
}
