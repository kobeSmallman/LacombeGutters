"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-md border-b-4 border-primary">
      <div className="container mx-auto py-4 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center relative">
            {/* Logo and Text */}
            <Link href="/" className="flex items-center hover:opacity-90 transition-opacity relative">
              <Image 
                src="/images/logos/logo.png" 
                alt="Lacombe Gutters Logo" 
                width={50} 
                height={50}
                className="mr-3"
              />
              <span className="text-xl md:text-2xl font-bold text-primary tracking-tight uppercase">Lacombe Gutters</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden border border-gray-300 p-2 rounded-md"
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
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center">
            <nav className="mr-6">
              <ul className="flex gap-x-6">
                {NAVIGATION_ITEMS.map((item) => (
                  <li key={item.path}>
                    <Link 
                      href={item.path} 
                      className="nav-link text-neutral-dark hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="flex items-center">
              <Link href="/contact">
                <Button variant="primary" size="md" className="btn-construction">
                  Contact Us Now!
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="pt-4 pb-3 border-t border-gray-200 md:hidden">
            <nav className="mb-4">
              <ul className="flex flex-col gap-y-3">
                {NAVIGATION_ITEMS.map((item) => (
                  <li key={item.path}>
                    <Link 
                      href={item.path} 
                      className="block py-2 text-neutral-dark hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="mt-3">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="btn-construction w-full">
                  Contact Us Now!
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
