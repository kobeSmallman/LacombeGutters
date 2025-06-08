'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import FAQItem from '@/components/faq/FAQItem';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type FAQItemType = {
  id: number;
  question: string;
  answer: string;
  needsEmail?: boolean;
  contactPage?: boolean;
  category?: string;
};

type FAQSectionProps = {
  category: string;
  questions: FAQItemType[];
  icon?: React.ReactNode;
  collapsible?: boolean;
};

export default function FAQSection({ category, questions, icon, collapsible = false }: FAQSectionProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const [isExpanded, setIsExpanded] = useState(!collapsible || !!searchQuery);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Filter questions based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredQuestions(questions);
      return;
    }
    
    const filtered = questions.filter(
      q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredQuestions(filtered);
    
    // Auto-expand when search is active
    if (filtered.length > 0) {
      setIsExpanded(true);
    }
  }, [searchQuery, questions]);

  // If no questions match search, don't render the section
  if (filteredQuestions.length === 0) {
    return null;
  }

  const toggleSection = () => {
    if (collapsible && !isAnimating) {
      setIsAnimating(true);
      
      if (!isExpanded) {
        // Opening: First unscrew the screw, then swing down
        setTimeout(() => setIsExpanded(true), 300);
        setTimeout(() => setIsAnimating(false), 1300);
      } else {
        // Closing: Just swing back up
        setIsExpanded(false);
        setTimeout(() => setIsAnimating(false), 1000);
      }
    }
  };

  return (
    <section id={category.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-24 mb-24">
      {/* Only show category headers when not searching */}
      {!searchQuery && (
        <div className="relative">
          {/* Normal Header (visible when collapsed) */}
          <div 
            className={`relative rounded-lg shadow-lg p-1 mb-4 transition-opacity duration-300 ${collapsible ? 'cursor-pointer' : ''} ${isExpanded ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}
            onClick={toggleSection}
          >
            <div className="relative bg-amber-200 dark:bg-amber-950 rounded-lg py-16 px-8 border-2 border-amber-400/50 dark:border-amber-800/50 shadow-inner transition-colors duration-300 overflow-visible">
              {/* Wood texture background */}
              <div className="absolute inset-0 bg-[url('/images/textures/wood-texture-light.jpg')] dark:bg-[url('/images/textures/wood-texture-dark.jpg')] bg-cover bg-center opacity-80 dark:opacity-90"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200/40 to-amber-300/30 dark:from-amber-900/60 dark:to-amber-950/70"></div>
              
              {/* Left screw */}
              <div className="screw-corner screw-top-left"></div>
                
              {/* Right screw with animation */}
              <motion.div 
                className="screw-corner screw-top-right"
                animate={{ rotate: isAnimating && !isExpanded ? 180 : 0 }}
                transition={{ 
                  duration: 0.3,
                  ease: "easeInOut"
                }}
              ></motion.div>
                
              {/* Metal strip at top */}
              <div className="absolute top-0 left-0 w-full h-1 bg-primary/10"></div>
                
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 relative z-10">
                  {icon && <div className="flex-shrink-0 text-3xl text-amber-900 dark:text-amber-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">{icon}</div>}
                  <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-800 to-amber-900 dark:from-amber-100 dark:to-amber-300">
                      {category}
                    </span>
                  </h2>
                </div>
                  
                {collapsible && (
                  <div className="text-primary">
                    <ChevronDown className="h-8 w-8" />
                  </div>
                )}
              </div>
            </div>
          </div>
            
          {/* Expanded State with Sideways Header and Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-start`}>
                  {/* Sideways header - displays differently on mobile */}
                  {!searchQuery && (isMobile ? (
                    // Mobile view - regular header instead of sideways
                    <div className="w-full mb-4">
                      <div 
                        className={`relative rounded-lg shadow-lg p-1 ${collapsible ? 'cursor-pointer' : ''}`}
                        onClick={toggleSection}
                      >
                        <div className="bg-amber-200 dark:bg-amber-900 bg-[url('/images/textures/wood-texture-light.png')] dark:bg-[url('/images/textures/wood-texture-dark.png')] bg-cover bg-center rounded-lg py-6 px-4 md:py-8 md:px-6 relative border-2 border-amber-400 dark:border-amber-800 shadow-inner transition-colors duration-300">
                          <div className="screw-corner screw-top-left"></div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 md:gap-4">
                              {icon && <div className="flex-shrink-0 text-amber-900 dark:text-amber-100">{icon}</div>}
                              <h2 className="text-lg md:text-xl font-bold text-amber-900 dark:text-amber-100 break-words drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-800 to-amber-900 dark:from-amber-100 dark:to-amber-300">
                                  {category}
                                </span>
                              </h2>
                            </div>
                            
                            {collapsible && (
                              <div className="text-primary flex-shrink-0 ml-2">
                                <ChevronUp className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Desktop view - sideways header with swing animation and fixed container
                    <div className="flex-shrink-0 mr-6" style={{ width: '95px' }}>
                      <div className="h-[200px] relative">
                        <motion.div
                          className="absolute top-0 left-0 origin-top-left"
                          initial={{ rotateZ: 0 }}
                          animate={{ rotateZ: 90 }}
                          exit={{ rotateZ: 0 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 60, 
                            damping: 12,
                            duration: 0.6 
                          }}
                        >
                          <div
                            className="rounded-lg shadow-lg p-1 cursor-pointer"
                            onClick={toggleSection}
                          >
                            <div className="bg-amber-200 dark:bg-amber-900 bg-[url('/images/textures/wood-texture-light.png')] dark:bg-[url('/images/textures/wood-texture-dark.png')] bg-cover bg-center rounded-lg py-16 px-8 relative border-2 border-amber-400 dark:border-amber-800 shadow-inner transition-colors duration-300" style={{ width: '500px' }}>
                              <div className="screw-corner screw-top-left"></div>
                              <div className="absolute top-0 left-0 w-full h-1 bg-primary/10"></div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  {icon && <div className="flex-shrink-0 text-3xl">{icon}</div>}
                                  <h2 className="text-3xl font-bold text-amber-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-100 to-amber-300">
                                    {category}
                                  </span>
                                </h2>
                                </div>
                                
                                {collapsible && (
                                  <div className="text-primary">
                                    <ChevronUp className="h-8 w-8" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Content when expanded - add top padding on desktop */}
                  <div className={`${isMobile ? 'w-full' : 'flex-1 pt-6'}`}>
                    <div className="space-y-3 md:space-y-6">
                      {filteredQuestions.map((faq) => {
                        const isHighlighted = searchQuery && 
                          (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));
                        
                        return (
                          <div 
                            key={faq.id}
                            className={`${isHighlighted ? 'ring-2 ring-primary/50' : ''} rounded-lg`}
                          >
                            <FAQItem 
                              question={faq} 
                              isSearchResult={!!searchQuery} 
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      
      {/* Show questions directly when searching */}
      {searchQuery && filteredQuestions.length > 0 && (
        <div className="space-y-3 md:space-y-6">
          {filteredQuestions.map((faq) => (
            <div 
              key={faq.id}
              className="ring-2 ring-primary/50 rounded-lg"
            >
              <FAQItem 
                question={faq} 
                isSearchResult={true} 
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
