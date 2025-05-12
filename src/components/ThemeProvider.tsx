'use client';

import { useState, useEffect } from 'react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Only run client-side
  useEffect(() => {
    setMounted(true);
    
    // Check for saved preference or user's system preference
    const savedPreference = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Use saved preference if it exists, otherwise use system preference
    const shouldBeDark = savedPreference !== null 
      ? savedPreference === 'true'
      : prefersDark;
      
    setDarkMode(shouldBeDark);
    
    // Apply dark mode class to body
    if (shouldBeDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);
  
  // Handle dark mode toggle
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    // Apply changes to DOM immediately for better UX
    if (newMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Save preference
    localStorage.setItem('darkMode', newMode.toString());
  };
  
  // Only show toggle after component mounts to avoid hydration mismatch
  if (!mounted) return <>{children}</>;
  
  return (
    <>
      {children}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleDarkMode} 
          className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-colors ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-300 text-gray-800'}`}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
