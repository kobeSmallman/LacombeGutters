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
    <div className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden mb-4`}>
      <Button
        onClick={toggleAccordion}
        className={`w-full flex justify-between items-center text-left text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white min-h-[max-content] py-10 px-6 md:py-12 md:px-8`}
        aria-expanded={isOpen}
        variant="ghost"
      >
        <div className="flex-1 pr-4">
          <h3 className="text-base md:text-xl lg:text-2xl font-medium break-words whitespace-normal overflow-wrap-normal leading-relaxed">
            {question.question}
          </h3>
        </div>
        <span className="text-primary flex-shrink-0 ml-2">
          {isOpen ? (
            <ChevronUp className="h-6 w-6" />
          ) : (
            <ChevronDown className="h-6 w-6" />
          )}
        </span>
      </Button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ 
              duration: 0.25,
              ease: "easeOut"
            }}
            className="overflow-hidden"
            style={{ transformOrigin: 'top' }}
          >
            <div className="p-8 md:p-10 pt-0 border-t border-gray-200 dark:border-gray-700 relative">
              {/* Metal strip at bottom - construction theme element */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/10"></div>
              
              <div 
                className="prose dark:prose-invert max-w-none text-sm md:text-lg lg:text-xl pb-4"
                dangerouslySetInnerHTML={{ __html: question.answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
              />
              
              {question.contactPage ? (
                <div className="mt-4">
                  <Link href="/contact" className="inline-flex items-center">
                    <Button className="gap-2">
                      <Mail className="h-4 w-4" />
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
