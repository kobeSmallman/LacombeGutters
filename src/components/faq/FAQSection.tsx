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
        // Opening: First unscrew one screw, then swing down
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
      <div className="relative">
        {/* Normal Header (visible when collapsed) */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div 
              className={`relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-1 mb-4 ${collapsible ? 'cursor-pointer' : ''}`}
              onClick={toggleSection}
              initial={{ opacity: 0, rotateZ: 90 }}
              animate={{ opacity: 1, rotateZ: 0 }}
              exit={{ opacity: 0, rotateZ: 90 }}
              transition={{ 
                type: "spring", 
                stiffness: 60, 
                damping: 12,
                duration: 0.6 
              }}
              style={{ transformOrigin: "top left" }}
            >
              <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-6 relative overflow-visible">
                {/* Both screws when normal */}
                <div className="screw-corner screw-top-left z-10"></div>
                <div className="screw-corner screw-top-right"></div>
                
                {/* Metal strip at top */}
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/10"></div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {icon && <div className="flex-shrink-0">{icon}</div>}
                    <h2 className="text-2xl font-bold text-primary">{category}</h2>
                  </div>
                  
                  {collapsible && (
                    <div className="text-primary">
                      <ChevronDown className="h-6 w-6" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Expanded State with Sideways Header and Content */}
        <AnimatePresence>
          {isExpanded && (
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-start`}>
              {/* Sideways header - displays differently on mobile */}
              {isMobile ? (
                // Mobile view - regular header instead of sideways
                <motion.div 
                  className="w-full mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div 
                    className={`relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-1 ${collapsible ? 'cursor-pointer' : ''}`}
                    onClick={toggleSection}
                  >
                    <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-3 md:p-4 relative">
                      <div className="screw-corner screw-top-left z-10"></div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-3">
                          {icon && <div className="flex-shrink-0">{icon}</div>}
                          <h2 className="text-lg md:text-xl font-bold text-primary break-words">{category}</h2>
                        </div>
                        
                        {collapsible && (
                          <div className="text-primary flex-shrink-0 ml-2">
                            <ChevronUp className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                // Desktop view - sideways header
                <motion.div 
                  className="relative mr-4 md:mr-6"
                  style={{ width: '95px', minWidth: '95px', height: '595px' }}
                >
                  <motion.div 
                    className={`absolute bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-1 ${collapsible ? 'cursor-pointer' : ''}`}
                    onClick={toggleSection}
                    style={{ 
                      transformOrigin: "top left",
                      width: 'auto',
                      height: 'auto',
                      top: '0',
                      left: '0'
                    }}
                    initial={{ opacity: 0, rotateZ: 0 }}
                    animate={{ opacity: 1, rotateZ: 90 }}
                    exit={{ opacity: 0, rotateZ: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 40, 
                      damping: 12,
                      duration: 0.8 
                    }}
                  >
                    <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-6 relative overflow-visible" style={{ width: '595px' }}>
                      {/* Only left screw in sideways position */}
                      <div className="screw-corner screw-top-left z-10"></div>
                      
                      {/* Metal strip at top */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-primary/10"></div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {icon && <div className="flex-shrink-0">{icon}</div>}
                          <h2 className="text-2xl font-bold text-primary">{category}</h2>
                        </div>
                        
                        {collapsible && (
                          <div className="text-primary">
                            <ChevronUp className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
              
              {/* Content when expanded */}
              <div className={`${isMobile ? 'w-full' : 'flex-1'}`}>
                <div className="space-y-3 md:space-y-6">
                  {filteredQuestions.map(q => (
                    <div key={q.id} 
                      className={`${searchQuery && 
                        (q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         q.answer.toLowerCase().includes(searchQuery.toLowerCase())) 
                        ? 'ring-2 ring-primary/50 rounded-lg' : ''}`}
                    >
                      <FAQItem question={q} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
