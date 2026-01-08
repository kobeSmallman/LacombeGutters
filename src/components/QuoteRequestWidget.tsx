'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, X } from 'lucide-react';
import CloudflareTurnstile from './CloudflareTurnstile';

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  services: string[];
  contactMethod: 'email' | 'sms';
  company_website?: string; // Honeypot field
};

type FormErrors = {
  [K in keyof FormData]?: string;
};

const serviceOptions = [
  'Eavestrough Installation',
  'Gutter Cleaning', 
  'Soffit & Fascia',
  'Downspout Installation',
  'Gutter Repair',
  'Industrial/Commercial'
];

const QuoteRequestWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    services: [],
    contactMethod: 'email',
    company_website: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>('');

  // Phone number formatting function
  const formatPhoneNumber = (value: string): string => {
    // Strip all non-numeric characters
    const phoneDigits = value.replace(/\D/g, '');
    
    // Format as 123-456-7890
    if (phoneDigits.length >= 6) {
      return `${phoneDigits.slice(0, 3)}-${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6, 10)}`;
    } else if (phoneDigits.length >= 3) {
      return `${phoneDigits.slice(0, 3)}-${phoneDigits.slice(3)}`;
    } else {
      return phoneDigits;
    }
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phone: formattedPhoneNumber }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Check honeypot field (should be empty)
    if (formData.company_website && formData.company_website.trim() !== '') {
      console.warn('Honeypot field filled, likely spam submission');
      setShowError(true);
      setErrorMessage('Invalid submission detected');
      return false;
    }

    // Check name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Please enter a valid name (at least 2 characters)';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name is too long (maximum 100 characters)';
    }

    // Enhanced email/phone validation
    if (formData.contactMethod === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required when email contact is selected';
      } else {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(formData.email.trim())) {
          newErrors.email = 'Please enter a valid email address';
        } else if (formData.email.trim().length > 254) {
          newErrors.email = 'Email address is too long';
        }
      }
    } else if (formData.contactMethod === 'sms') {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required when phone contact is selected';
      } else if (formData.phone.replace(/\D/g, '').length < 10) {
        newErrors.phone = 'Please enter a valid phone number with at least 10 digits';
      }
    }

    // Enhanced message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide more details (at least 10 characters)';
    } else if (formData.message.trim().length > 2000) {
      newErrors.message = 'Message is too long (maximum 2000 characters)';
    }

    // Check Turnstile token
    if (!turnstileToken) {
      newErrors.message = newErrors.message || 'Please complete the security verification';
      setShowError(true);
      setErrorMessage('Please complete the security verification');
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });
    setAttachments(prev => [...prev, ...validFiles]);
  };

  // Remove attachment
  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });
    setAttachments(prev => [...prev, ...validFiles]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Widget form submission started');
    console.log('📝 Form data:', formData);
    
    if (!validateForm()) {
      console.log('❌ Form validation failed');
      return;
    }

    setIsSubmitting(true);
    setShowError(false);
    console.log('✅ Form validation passed, submitting...');

    try {
      // Create FormData to handle file uploads
      const apiFormData = new FormData();
      
      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item => apiFormData.append(key, item));
        } else {
          apiFormData.append(key, value);
        }
      });
      apiFormData.append('source', 'quote-widget');
      apiFormData.append('formType', 'quote-request');
      apiFormData.append('turnstile-token', turnstileToken);
      
      // Add attachments
      attachments.forEach(file => {
        apiFormData.append('attachments', file);
      });
      
      console.log('📤 Sending request to /api/contact...');
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: apiFormData,
      });

      console.log('📥 Response status:', response.status);
      const result = await response.json();
      console.log('📦 Response data:', result);

      if (response.ok) {
        console.log('✅ Form submitted successfully:', result);
        setShowSuccess(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          message: '',
          services: [],
          contactMethod: 'email',
          company_website: ''
        });
        setAttachments([]);
        setTurnstileToken('');
        // Longer timeout to give user time to read success message
        setTimeout(() => {
          setShowSuccess(false);
          setIsOpen(false);
        }, 5000);
      } else {
        console.log('❌ Form submission failed:', result);
        setShowError(true);
        setErrorMessage(result.error || 'Failed to send request');
      }
    } catch (error) {
      console.error('😱 Error submitting form:', error);
      setShowError(true);
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowSuccess(false);
      setShowError(false);
      setErrors({});
      // Reset Turnstile token when reopening
      setTurnstileToken('');
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formRef]);

  return (
    <>
      {/* Toggle Button - Left side when closed */}
      {!isOpen && (
        <button
          onClick={toggleWidget}
          aria-label="Toggle Contact Form"
          className="fixed left-0 top-1/2 z-50 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white shadow-2xl flex items-center justify-center"
          style={{
            height: window.innerWidth < 768 ? '120px' : '200px',
            width: window.innerWidth < 768 ? '50px' : '70px',
            borderRadius: window.innerWidth < 768 ? '0 15px 15px 0' : '0 20px 20px 0',
            transform: 'translateY(-50%)'
          }}
        >
          <div className="flex items-center justify-center h-full w-full">
            <span
              className={`font-bold tracking-wide ${window.innerWidth < 768 ? 'text-xs' : 'text-base'} uppercase whitespace-nowrap text-center text-white`}
              style={{
                transform: 'rotate(90deg)',
                transformOrigin: 'center',
                width: window.innerWidth < 768 ? '100px' : '180px',
                lineHeight: window.innerWidth < 768 ? '1.1' : '1.2'
              }}
            >
              {window.innerWidth < 768 ? 'Contact' : 'Contact Us Now!'}
            </span>
          </div>
        </button>
      )}

      {/* Full Width Form Sliding from Left */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50" ref={formRef}>
            <motion.div
              className="flex h-full"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Form Panel */}
              <div
                className="bg-white shadow-2xl sm:w-[80vw] md:w-[70vw] lg:w-[60vw]"
                style={{
                  width: '95vw',
                  maxWidth: '800px',
                  minWidth: '320px',
                  height: '100vh',
                }}
              >
                <div className="p-4 pt-2 h-full flex flex-col">
                  {showSuccess ? (
                    <div className="flex flex-col items-center justify-center w-full p-8 space-y-4 bg-white h-full">
                      {/* Simple, professional success message */}
                      <div className="bg-white p-8 rounded-md text-center space-y-4 w-full max-w-md shadow-sm border border-gray-200"> 
                        <div className="bg-green-100 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center">
                          <div className="text-green-600 text-3xl">✓</div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">Request Sent Successfully</h3>
                        <p className="text-base text-gray-600">We&apos;ll contact you via your preferred method within 24 hours.</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-1 text-center">
                        Request a Free Estimate
                      </h2>
                      <form onSubmit={handleSubmit} className="h-full flex flex-col">
                        {/* Honeypot field - hidden from users */}
                        <input
                          type="text"
                          value={formData.company_website || ''}
                          onChange={(e) => handleInputChange('company_website', e.target.value)}
                          style={{ display: 'none' }}
                          tabIndex={-1}
                          autoComplete="off"
                          aria-hidden="true"
                        />
                        <div className="flex-1 overflow-y-auto space-y-3 w-full pb-20" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin', scrollbarColor: '#cbd5e0 transparent' }}>
                        {/* Contact Method Selection */}
                        <div className="space-y-1" style={{ overflow: 'visible', paddingLeft: '8px' }}>
                          <label className="block text-base font-bold text-gray-700">Preferred Contact Method *</label>
                          <div className="flex gap-6" style={{ overflow: 'visible' }}>
                            <label className="flex items-center text-sm">
                              <input
                                type="radio"
                                name="contactMethod"
                                value="email"
                                checked={formData.contactMethod === 'email'}
                                onChange={(e) => handleInputChange('contactMethod', e.target.value as 'email' | 'sms')}
                                className="mr-3 scale-125"
                                style={{ marginLeft: '4px' }}
                              />
                              Email
                            </label>
                            <label className="flex items-center text-sm">
                              <input
                                type="radio"
                                name="contactMethod"
                                value="sms"
                                checked={formData.contactMethod === 'sms'}
                                onChange={(e) => handleInputChange('contactMethod', e.target.value as 'email' | 'sms')}
                                className="mr-3 scale-125"
                                style={{ marginLeft: '4px' }}
                              />
                              Phone
                            </label>
                          </div>
                        </div>

                        {/* Name - First and Last on same line */}
                        <div className="space-y-1">
                          <label className="block text-base font-bold text-gray-700">Full Name *</label>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              value={formData.name.split(' ')[0] || ''}
                              onChange={(e) => {
                                const lastName = formData.name.split(' ').slice(1).join(' ');
                                handleInputChange('name', `${e.target.value} ${lastName}`.trim());
                              }}
                              placeholder="First name"
                              className={`text-sm p-3 h-10 ${errors.name ? 'border-red-500' : ''}`}
                            />
                            <Input
                              value={formData.name.split(' ').slice(1).join(' ') || ''}
                              onChange={(e) => {
                                const firstName = formData.name.split(' ')[0] || '';
                                handleInputChange('name', `${firstName} ${e.target.value}`.trim());
                              }}
                              placeholder="Last name"
                              className={`text-sm p-3 h-10 ${errors.name ? 'border-red-500' : ''}`}
                            />
                          </div>
                          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                        </div>

                        {/* Email and Phone on same line */}
                        <div className="space-y-1">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-base font-bold text-gray-700">
                                Email {formData.contactMethod === 'email' ? '*' : ''}
                              </label>
                              <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="your.email@example.com"
                                className={`text-sm p-3 h-10 ${errors.email ? 'border-red-500' : ''}`}
                              />
                              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                            </div>
                            <div>
                              <label className="block text-base font-bold text-gray-700">
                                Phone {formData.contactMethod === 'sms' ? '*' : ''}
                              </label>
                              <Input
                                type="tel"
                                value={formData.phone}
                                onChange={handlePhoneInput}
                                placeholder="(123) 456-7890"
                                className={`text-sm p-3 h-10 ${errors.phone ? 'border-red-500' : ''}`}
                              />
                              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                            </div>
                          </div>
                          <p className="text-xs text-gray-500">Optional backup contact</p>
                        </div>

                        {/* Property Address */}
                        <div className="space-y-1">
                          <label className="block text-base font-bold text-gray-700">Property Address</label>
                          <Input
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            placeholder="123 Main St, City, Province"
                            className="text-sm p-3 h-10"
                          />
                        </div>

                        {/* Services */}
                        <div className="space-y-1">
                          <label className="block text-base font-bold text-gray-700">Services Needed (optional)</label>
                          <div className="max-h-24 overflow-y-auto space-y-1 border border-gray-200 rounded p-2">
                            {serviceOptions.map((service) => (
                              <div key={service} className="flex items-start space-x-2">
                                <Checkbox
                                  id={service}
                                  checked={formData.services.includes(service)}
                                  onCheckedChange={() => handleServiceToggle(service)}
                                  className="h-4 w-4 min-h-[16px] min-w-[16px] max-h-[16px] max-w-[16px] shrink-0"
                                  style={{ width: '16px', height: '16px', minWidth: '16px', minHeight: '16px' }}
                                />
                                <label htmlFor={service} className="text-sm text-gray-700">
                                  {service}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-1">
                          <label className="block text-base font-bold text-gray-700">What do you need? *</label>
                          <Textarea
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            placeholder="Describe your project or what you need help with..."
                            rows={2}
                            className={`text-sm p-3 ${errors.message ? 'border-red-500' : ''}`}
                          />
                          {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
                        </div>

                        {/* File Upload Section */}
                        <div className="space-y-1">
                          <label className="block text-base font-bold text-gray-700">Photos (Optional)</label>
                          <div 
                            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors"
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnter={(e) => e.preventDefault()}
                          >
                            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-xs text-gray-600 mb-1">
                              <strong>Drag and drop photos here, or </strong>
                              <button 
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="text-blue-600 hover:text-blue-500 underline"
                              >
                                browse
                              </button>
                            </p>
                            <p className="text-xs text-gray-500">
                              JPG, PNG, WebP, PDF (max 10MB each)
                            </p>
                            {formData.contactMethod === 'sms' && (
                              <p className="text-xs text-amber-600 mt-1">
                                ⚠️ Note: Images cannot be sent via SMS. Please choose email as your preferred contact method to receive images.
                              </p>
                            )}
                            <input
                              ref={fileInputRef}
                              type="file"
                              multiple
                              accept=".pdf,.jpg,.jpeg,.png,.webp"
                              onChange={handleFileSelect}
                              className="hidden"
                            />
                          </div>
                          
                          {/* Display selected files */}
                          {attachments.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs font-medium mb-1 text-gray-700">Selected Files:</p>
                              <div className="space-y-1">
                                {attachments.map((file, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border text-xs">
                                    <span className="truncate text-gray-700">{file.name}</span>
                                    <button
                                      type="button"
                                      onClick={() => removeAttachment(index)}
                                      className="text-red-600 hover:text-red-800 ml-2"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Cloudflare Turnstile */}
                        <div className="space-y-1">
                          <CloudflareTurnstile
                            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAACLMknOrovBOqBYa'}
                            onVerify={(token) => {
                              setTurnstileToken(token);
                              setShowError(false);
                              setErrorMessage('');
                            }}
                            onError={() => {
                              setTurnstileToken('');
                              setShowError(true);
                              setErrorMessage('Security verification failed. Please try again.');
                            }}
                            onExpire={() => {
                              setTurnstileToken('');
                              setShowError(true);
                              setErrorMessage('Security verification expired. Please verify again.');
                            }}
                            size="compact"
                          />
                        </div>

                        {/* Error Message */}
                        {showError && (
                          <div className="bg-red-50 border border-red-200 rounded-md p-3">
                            <p className="text-red-700 text-sm">{errorMessage}</p>
                          </div>
                        )}

                          {/* Submit Button - Inside scrollable area */}
                          <div className="mt-6 pt-4 border-t border-gray-200">
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white text-base py-3 h-12 font-bold"
                            >
                              {isSubmitting ? 'Sending...' : 'Send Request'}
                            </Button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>

              {/* Toggle Button - Attached to form when open */}
              <button
                onClick={toggleWidget}
                aria-label="Close Contact Form"
                className="bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white shadow-2xl flex items-center justify-center self-center"
                style={{
                  height: window.innerWidth < 768 ? '120px' : '200px',
                  width: window.innerWidth < 768 ? '50px' : '70px',
                  borderRadius: window.innerWidth < 768 ? '0 15px 15px 0' : '0 20px 20px 0',
                }}
              >
                <div className="flex items-center justify-center h-full w-full">
                  <span
                    className={`font-bold tracking-wide ${window.innerWidth < 768 ? 'text-xs' : 'text-base'} uppercase whitespace-nowrap text-center text-white`}
                    style={{
                      transform: 'rotate(90deg)',
                      transformOrigin: 'center',
                      width: window.innerWidth < 768 ? '100px' : '180px',
                      lineHeight: window.innerWidth < 768 ? '1.1' : '1.2',
                    }}
                  >
                    Close
                  </span>
                </div>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuoteRequestWidget;
