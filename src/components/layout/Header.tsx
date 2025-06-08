"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { NAVIGATION_ITEMS } from "@/lib/constants";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg border-b-2 border-amber-500 dark:border-amber-600 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">

        {/* Main Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <Image 
                  src="/images/logos/logo.png" 
                  alt="Lacombe Gutters Logo" 
                  width={60} 
                  height={60}
                  className="transition-transform group-hover:scale-105"
                />
              </div>
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-amber-400 transition-colors">Lacombe Gutters</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Professional Eavestrough Services</p>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAVIGATION_ITEMS.map((item) => (
              <Link 
                key={item.path}
                href={item.path}
                className="px-4 py-2 text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-amber-400 font-medium text-sm uppercase tracking-wider transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 dark:bg-amber-400 transition-all group-hover:w-full"></span>
              </Link>
            ))}
            <Link 
              href="/contact" 
              className="ml-4 px-6 py-2.5 bg-primary dark:bg-amber-600 text-white font-medium text-sm uppercase tracking-wider rounded-md hover:bg-amber-600 dark:hover:bg-amber-500 transition-colors shadow-md hover:shadow-lg"
            >
              Contact Us Now!
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 px-4">
            <nav className="flex flex-col space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 px-4 py-3 bg-primary dark:bg-amber-600 text-white font-medium text-center rounded-md hover:bg-amber-600 dark:hover:bg-amber-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us Now!
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
