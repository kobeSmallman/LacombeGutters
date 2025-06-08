'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Mail, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CONTACT_EMAIL } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import * as React from 'react';

type FAQItemProps = {
  question: {
    id: number;
    question: string;
    answer: string;
    needsEmail?: boolean;
    contactPage?: boolean;
  };
  isSearchResult?: boolean;
};

export default function FAQItem({ question, isSearchResult = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showCopyOptions, setShowCopyOptions] = useState(false);
  const [emailData, setEmailData] = useState({
    recipient: CONTACT_EMAIL,
    subject: `Question regarding: ${question.question}`,
    body: `Hello Lacombe Gutters,\n\nI'm inquiring about the following question from your FAQ:\n\n"${question.question}"\n\nThank you for your assistance.`
  });

  useEffect(() => {
    if (isSearchResult) {
      setIsOpen(false);
    }
  }, [isSearchResult]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handlePrepareEmail = () => {
    setShowEmailForm(true);
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(emailData.subject);
    const body = encodeURIComponent(emailData.body);
    
    try {
      window.location.href = `mailto:${emailData.recipient}?subject=${subject}&body=${body}`;
      setTimeout(() => {
        setShowCopyOptions(true);
      }, 500);
    } catch {
      // Handle error silently and show copy options anyway
      setShowCopyOptions(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmailData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="relative mb-4 transition-all duration-300 hover:shadow-lg rounded-xl border border-gray-200/80 dark:border-gray-700/50 bg-white/80 dark:bg-transparent backdrop-blur-sm hover:border-amber-400/50 dark:hover:border-amber-500/30">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-amber-100/10 dark:from-amber-900/20 dark:to-amber-950/30"></div>
      
      {/* Inner container for better border radius handling */}
      <div className="relative">
        <Button
          onClick={toggleAccordion}
          className="w-full h-auto min-h-0 flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center text-left text-gray-800 dark:text-gray-100 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 py-4 px-5 transition-all duration-300 group"
          aria-expanded={isOpen}
          variant="ghost"
        >
          <div className="flex-1 pr-4 w-full">
            <h3 className="text-lg md:text-xl lg:text-xl font-medium break-words whitespace-normal text-pretty leading-relaxed text-gray-800 dark:text-gray-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-300 w-full">
              {question.question}
            </h3>
          </div>
          <span className="flex-shrink-0 mt-2 sm:mt-0 sm:ml-3 text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors duration-300">
            {isOpen ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </span>
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              duration: 0.25,
              ease: "easeOut"
            }}
            className="relative overflow-hidden"
          >
            {/* Subtle gradient overlay for the answer section */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 to-amber-100/20 dark:from-gray-800/90 dark:to-gray-900/90"></div>
            
            {/* Decorative accent line */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400/50 via-amber-500/50 to-amber-400/50"></div>
            
            <div className="p-5 md:p-6 relative text-gray-700 dark:text-gray-300">
              {/* Subtle decorative element at bottom */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-200/50 via-amber-300/30 to-transparent dark:from-amber-900/30 dark:via-amber-800/20"></div>
              
              <div 
                className="prose dark:prose-invert max-w-none text-base md:text-lg pb-3 leading-relaxed text-gray-700 dark:text-gray-300 break-words overflow-visible"
                style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
                dangerouslySetInnerHTML={{ __html: question.answer.replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber-700 dark:text-amber-400">$1</strong>') }}
              />
              
              {question.contactPage ? (
                <div className="mt-5 pt-4 border-t border-amber-100 dark:border-amber-900/50">
                  <Link href="/contact" className="inline-flex items-center group">
                    <Button className="gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white border border-amber-700 dark:border-amber-800 dark:from-amber-700 dark:to-amber-800 dark:hover:from-amber-600 dark:hover:to-amber-700 shadow-sm hover:shadow-md transition-all duration-300">
                      <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
                      Request Custom Quote
                    </Button>
                  </Link>
                </div>
              ) : question.needsEmail ? (
                <div className="mt-4">
                  {!showEmailForm ? (
                    <Button className="gap-2" onClick={handlePrepareEmail}>
                      <Mail className="h-4 w-4" />
                      Prepare Email
                    </Button>
                  ) : (
                    <div className="mt-2 p-2 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-md relative">
                      <div className="absolute right-1 sm:right-2 top-1 sm:top-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => setShowEmailForm(false)}
                          className="p-1 h-auto"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <h4 className="text-md font-medium mb-2 sm:mb-3 text-gray-800 dark:text-gray-100 pr-8">
                        Prepare Your Email
                      </h4>
                      
                      <div className="space-y-2 sm:space-y-3">
                        <div>
                          <div className="text-xs sm:text-sm mb-1 text-gray-700 dark:text-gray-300">Recipient:</div>
                          <input 
                            type="text" 
                            name="recipient"
                            value={emailData.recipient} 
                            onChange={handleInputChange}
                            className="w-full text-xs sm:text-sm p-1.5 sm:p-2 border border-gray-300 dark:border-gray-600 rounded text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800"
                          />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm mb-1 text-gray-700 dark:text-gray-300">Subject:</div>
                          <input
                            type="text"
                            name="subject"
                            value={emailData.subject} 
                            onChange={handleInputChange}
                            className="w-full text-xs sm:text-sm p-1.5 sm:p-2 border border-gray-300 dark:border-gray-600 rounded text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800"
                          />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm mb-1 text-gray-700 dark:text-gray-300">Message:</div>
                          <textarea 
                            name="body"
                            value={emailData.body} 
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full text-xs sm:text-sm p-1.5 sm:p-2 border border-gray-300 dark:border-gray-600 rounded text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800"
                          />
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
                          <Button 
                            className="gap-1 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 h-auto" 
                            onClick={handleSendEmail}
                          >
                            <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                            Open in Email App
                          </Button>
                          
                          {showCopyOptions && (
                            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                              <Button 
                                variant="outline" 
                                className="text-xs sm:text-sm px-2 py-1 h-auto flex-grow sm:flex-grow-0" 
                                onClick={() => {
                                  copyToClipboard(emailData.recipient);
                                }}
                              >
                                Copy Email
                              </Button>
                              <Button 
                                variant="outline" 
                                className="text-xs sm:text-sm px-2 py-1 h-auto flex-grow sm:flex-grow-0" 
                                onClick={() => {
                                  copyToClipboard(emailData.subject);
                                }}
                              >
                                Copy Subject
                              </Button>
                              <Button 
                                variant="outline" 
                                className="text-xs sm:text-sm px-2 py-1 h-auto flex-grow sm:flex-grow-0" 
                                onClick={() => {
                                  copyToClipboard(emailData.body);
                                }}
                              >
                                Copy Message
                              </Button>
                            </div>
                          )}
                          
                          {!showCopyOptions && (
                            <div>
                              <p style={{ color: "currentColor" }} className="text-black dark:text-white text-sm">
                                <strong style={{ color: "currentColor" }} className="text-black dark:text-white">Photos Help Us Provide Accurate Estimates</strong>
                                <span style={{ color: "currentColor" }} className="text-black dark:text-white"> - When your default email app opens, please consider attaching photos of your gutters or project area.</span>
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {!showCopyOptions && (
                          <Button 
                            variant="ghost" 
                            className="text-sm mt-2" 
                            onClick={() => setShowCopyOptions(true)}
                          >
                            Show copy options
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
