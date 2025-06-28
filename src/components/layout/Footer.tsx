"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  SITE_NAME, 
  CONTACT_PHONE_ROB,
  CONTACT_PHONE_RYAN,
  CONTACT_EMAIL, 
  CONTACT_ADDRESS,
  FACEBOOK_URL,
  SERVICES,
  NAVIGATION_ITEMS,
  FOOTER_ADDITIONAL_ITEMS
} from "@/lib/constants";

interface NavigationItem {
  path: string;
  label: string;
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white pt-16 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* About Column */}
          <div className="md:col-span-4">
            <div className="mb-6">
              <Link href="/" className="inline-flex items-center group">
                <div className="mr-3 transition-transform group-hover:scale-105">
                  <Image 
                    src="/images/logos/logo.png" 
                    alt="Lacombe Gutters Logo" 
                    width={48} 
                    height={48}
                  />
                </div>
                <span className="text-2xl font-bold text-white dark:text-gray-100">Lacombe Gutters</span>
              </Link>
            </div>
            <p className="text-gray-300 dark:text-gray-500 mb-6">
              Providing top-quality eavestrough, soffit, fascia, and gutter services across central Alberta 
              with over 40 years of combined experience in the industry.
            </p>
            <div className="flex space-x-4">
              <a 
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6 text-gray-400 hover:text-amber-400 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div className="md:col-span-2 lg:col-span-2 md:col-start-6">
            <h3 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {/* Show both main nav items and additional footer links */}
              {[...NAVIGATION_ITEMS, ...FOOTER_ADDITIONAL_ITEMS].map((item: NavigationItem) => (
                <li key={item.path}>
                  <Link 
                    href={item.path}
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services Column */}
          <div className="md:col-span-3 lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider">Our Services</h3>
            <ul className="space-y-3">
              {SERVICES.filter(service => service !== "Free Estimates").map((service, index) => (
                <li key={index}>
                  <Link 
                    href="/services" 
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Column */}
          <div className="md:col-span-4 lg:col-span-4">
            <h3 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider">Contact Info</h3>
            <address className="not-italic space-y-4">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-amber-400 dark:text-amber-300 mt-0.5 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-400">{CONTACT_ADDRESS}</span>
              </div>
              
              <div className="flex items-center">
                <svg className="h-5 w-5 text-amber-400 dark:text-amber-300 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div>
                  <p className="text-gray-400">Rob: <a href={`tel:${CONTACT_PHONE_ROB.replace(/-/g, '')}`} className="text-white hover:text-amber-400 transition-colors">{CONTACT_PHONE_ROB}</a></p>
                  <p className="text-gray-400">Ryan: <a href={`tel:${CONTACT_PHONE_RYAN.replace(/-/g, '')}`} className="text-white hover:text-amber-400 transition-colors">{CONTACT_PHONE_RYAN}</a></p>
                </div>
              </div>
              
              <div className="flex items-center">
                <svg className="h-5 w-5 text-amber-400 dark:text-amber-300 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-white hover:text-amber-400 transition-colors">{CONTACT_EMAIL}</a>
              </div>
            </address>
            
            <div className="mt-6">
              <Link 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 transition-colors"
              >
                Get a Free Estimate
                <svg className="ml-2 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="text-gray-500 hover:text-amber-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-amber-400 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
