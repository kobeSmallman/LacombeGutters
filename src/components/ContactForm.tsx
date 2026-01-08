'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Upload, X } from "lucide-react";
import CloudflareTurnstile from './CloudflareTurnstile';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{success: boolean; message: string} | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [contactMethod, setContactMethod] = useState<'email' | 'sms'>('email');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [turnstileKey, setTurnstileKey] = useState(0);

  // Function to format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Strip all non-numeric characters
    const phoneDigits = value.replace(/\D/g, '');
    
    // Format based on length
    if (phoneDigits.length <= 3) {
      return phoneDigits;
    } else if (phoneDigits.length <= 6) {
      return `${phoneDigits.slice(0, 3)}-${phoneDigits.slice(3)}`;
    } else {
      return `${phoneDigits.slice(0, 3)}-${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6, 10)}`;
    }
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const formattedValue = formatPhoneNumber(input.value);
    input.value = formattedValue;
    
    // Trigger a change event to update any controlled components
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
  };

  // Map service names from services page to checkbox values
  const mapServiceNameToValue = (serviceName: string): string => {
    const mapping: {[key: string]: string} = {
      '5" Gutters': '5-inch-gutters',
      '6" Gutters': '6-inch-gutters', 
      'Soffit & Fascia': 'soffit-fascia',
      'Gutter Cleaning': 'gutter-cleaning',
      'Downspouts': 'downspouts',
      'Commercial Eavestrough': 'other'
    };
    
    return mapping[serviceName] || 'other';
  };

  // Check for preselected service from sessionStorage
  useEffect(() => {
    const selectedService = sessionStorage.getItem('selectedService');
    if (selectedService) {
      const mappedService = mapServiceNameToValue(selectedService);
      setSelectedServices([mappedService]);
      // Clear the sessionStorage after using it
      sessionStorage.removeItem('selectedService');
    }
  }, []);

  // Handle service checkbox changes
  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setSelectedServices(prev => [...prev, service]);
    } else {
      setSelectedServices(prev => prev.filter(s => s !== service));
    }
  };

  const validateForm = (formData: FormData): boolean => {
    const errors: {[key: string]: string} = {};
    
    // Check honeypot field (should be empty)
    const honeypot = formData.get('company_website') as string;
    if (honeypot && honeypot.trim() !== '') {
      console.warn('Honeypot field filled, likely spam submission');
      errors['honeypot'] = 'Invalid submission detected';
      setValidationErrors(errors);
      return false;
    }
    
    // Check name
    const name = formData.get('name') as string;
    if (!name || name.trim() === '') {
      errors['name'] = 'Please enter your name';
    } else if (name.trim().length < 2) {
      errors['name'] = 'Please enter a valid name (at least 2 characters)';
    } else if (name.trim().length > 100) {
      errors['name'] = 'Name is too long (maximum 100 characters)';
    }
    
    // Check phone - ensure it has at least 10 digits
    const phone = formData.get('phone') as string;
    if (!phone || phone.trim() === '') {
      errors['phone'] = 'Please enter your phone number';
    } else if (phone.replace(/\D/g, '').length < 10) {
      errors['phone'] = 'Please enter a valid phone number with at least 10 digits';
    }
    
    // Enhanced email validation
    const email = formData.get('email') as string;
    if (!email || email.trim() === '') {
      errors['email'] = 'Please enter your email address';
    } else {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!emailRegex.test(email.trim())) {
        errors['email'] = 'Please enter a valid email address';
      } else if (email.trim().length > 254) {
        errors['email'] = 'Email address is too long';
      }
    }
    
    // Check address
    const address = formData.get('address') as string;
    if (!address || address.trim() === '') {
      errors['address'] = 'Please enter your address';
    } else if (address.trim().length < 5) {
      errors['address'] = 'Please enter a more complete address';
    }
    
    // Check if at least one service is selected
    if (selectedServices.length === 0) {
      errors['services'] = 'Please select at least one service';
    }
    
    // Check project details
    const message = formData.get('message') as string;
    if (!message || message.trim() === '') {
      errors['message'] = 'Please enter project details';
    } else if (message.trim().length < 10) {
      errors['message'] = 'Please provide more details (at least 10 characters)';
    } else if (message.trim().length > 2000) {
      errors['message'] = 'Message is too long (maximum 2000 characters)';
    }

    // Check Turnstile token
    if (!turnstileToken) {
      errors['turnstile'] = 'Please complete the security verification';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle file attachment
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      // Allow common image formats and PDFs
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
      const maxSize = 10 * 1024 * 1024; // 10MB limit
      
      if (!allowedTypes.includes(file.type)) {
        alert(`File ${file.name} is not a supported format. Please use JPG, PNG, GIF, WebP, or PDF.`);
        return false;
      }
      
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Please use files under 10MB.`);
        return false;
      }
      
      return true;
    });
    
    setAttachments(prev => [...prev, ...validFiles]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };





  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('ContactForm handleSubmit called');
    e.preventDefault();
    
    if (!formRef.current) return;
    
    // Clear previous validation errors and results
    setValidationErrors({});
    setSubmitResult(null);
    
    // Get form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Validate form
    if (!validateForm(formData)) {
      // Scroll to the first error
      const firstErrorField = document.querySelector('[data-error="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('Starting form submission...');
      
      // Create FormData for file upload support
      const apiFormData = new FormData();
      
      // Add form fields
      apiFormData.append('name', formData.get('name') as string);
      apiFormData.append('email', formData.get('email') as string);
      apiFormData.append('phone', formData.get('phone') as string);
      apiFormData.append('address', formData.get('address') as string);
      apiFormData.append('message', formData.get('message') as string);
      apiFormData.append('contactMethod', contactMethod);
      apiFormData.append('source', 'contact-page');
      apiFormData.append('formType', 'contact-form');
      apiFormData.append('turnstile-token', turnstileToken);
      
      // Add services
      selectedServices.forEach(service => {
        apiFormData.append('services', service);
      });
      
      // Add attachments
      attachments.forEach(file => {
        apiFormData.append('attachments', file);
      });
      
      console.log('Submitting form with', selectedServices.length, 'services and', attachments.length, 'attachments');
      
      // Send data to API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: apiFormData, // Use FormData instead of JSON
      });
      
      const result = await response.json();
      
      if (response.ok) {
        console.log('Form submitted successfully:', result);
        setSubmitResult({
          success: true,
          message: 'Your request has been sent successfully! We will contact you via your preferred method within 24 hours.'
        });
        
        // Reset form
        form.reset();
        setContactMethod('email');
        setAttachments([]);
        setSelectedServices([]);
        setTurnstileToken('');
        setTurnstileKey(prev => prev + 1); // Force Turnstile reset
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        console.error('API error:', result);
        setSubmitResult({
          success: false,
          message: result.message || 'Something went wrong. Please try again or contact us directly.'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitResult({
        success: false,
        message: 'Network error. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} method="POST" className="space-y-6">
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="company_website"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      
      {/* Preferred Contact Method - Moved to top */}
      <div className="mb-6" style={{ overflow: 'visible', paddingLeft: '12px' }}>
        <h3 className="font-bold text-lg mb-3">Preferred Contact Method *</h3>
        <div className="flex gap-6" style={{ paddingLeft: '0px', overflow: 'visible', minWidth: '100%' }}>
          <label className="flex items-center text-sm" style={{ paddingLeft: '4px' }}>
            <input
              type="radio"
              name="contactMethod"
              value="email"
              checked={contactMethod === 'email'}
              onChange={() => setContactMethod('email')}
              className="mr-3 scale-125"
              style={{ marginLeft: '0px', marginRight: '12px', transform: 'translateX(8px)' }}
            />
            Email
          </label>
          <label className="flex items-center text-sm" style={{ paddingLeft: '4px' }}>
            <input
              type="radio"
              name="contactMethod"
              value="sms"
              checked={contactMethod === 'sms'}
              onChange={() => setContactMethod('sms')}
              className="mr-3 scale-125"
              style={{ marginLeft: '0px', marginRight: '12px', transform: 'translateX(8px)' }}
            />
            Text Message/SMS
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`w-full px-3 py-2 border ${validationErrors['name'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
            required
            data-error={!!validationErrors['name']}
          />
          {validationErrors['name'] && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors['name']}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
            Phone {contactMethod === 'sms' ? <span className="text-red-500">*</span> : ''}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`w-full px-3 py-2 border ${validationErrors['phone'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="123-456-7890"
            onChange={handlePhoneInput}
            maxLength={12}
            required={contactMethod === 'sms'}
            data-error={!!validationErrors['phone']}
          />
          {validationErrors['phone'] && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors['phone']}</p>
          )}
          {contactMethod !== 'sms' && (
            <p className="mt-1 text-xs text-gray-500">Optional backup contact</p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
          Email {contactMethod === 'email' ? <span className="text-red-500">*</span> : ''}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={`w-full px-3 py-2 border ${validationErrors['email'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          required={contactMethod === 'email'}
          data-error={!!validationErrors['email']}
        />
        {validationErrors['email'] && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors['email']}</p>
        )}
        {contactMethod !== 'email' && (
          <p className="mt-1 text-xs text-gray-500">Optional backup contact</p>
        )}
      </div>
      
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
          Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className={`w-full px-3 py-2 border ${validationErrors['address'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          placeholder="Street address, city"
          required
          data-error={!!validationErrors['address']}
        />
        {validationErrors['address'] && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors['address']}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
          Services Needed <span className="text-red-500">*</span>
        </label>
        
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 ${validationErrors['services'] ? 'border border-red-500 bg-red-50 p-2 rounded-md' : ''}`} data-error={!!validationErrors['services']}>
          <label className="flex items-center space-x-2 p-2 border border-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <input 
              type="checkbox" 
              name="services" 
              value="5-inch-gutters" 
              className="h-4 w-4 text-primary"
              checked={selectedServices.includes('5-inch-gutters')}
              onChange={(e) => handleServiceChange('5-inch-gutters', e.target.checked)}
            />
            <span className="text-black dark:text-white">5-Inch Gutters</span>
          </label>
          
          <label className="flex items-center space-x-2 p-2 border border-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <input 
              type="checkbox" 
              name="services" 
              value="6-inch-gutters" 
              className="h-4 w-4 text-primary"
              checked={selectedServices.includes('6-inch-gutters')}
              onChange={(e) => handleServiceChange('6-inch-gutters', e.target.checked)}
            />
            <span className="text-black dark:text-white">6-Inch Gutters</span>
          </label>
          
          <label className="flex items-center space-x-2 p-2 border border-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <input 
              type="checkbox" 
              name="services" 
              value="soffit-fascia" 
              className="h-4 w-4 text-primary"
              checked={selectedServices.includes('soffit-fascia')}
              onChange={(e) => handleServiceChange('soffit-fascia', e.target.checked)}
            />
            <span className="text-black dark:text-white">Soffit & Fascia</span>
          </label>
          
          <label className="flex items-center space-x-2 p-2 border border-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <input 
              type="checkbox" 
              name="services" 
              value="downspouts" 
              className="h-4 w-4 text-primary"
              checked={selectedServices.includes('downspouts')}
              onChange={(e) => handleServiceChange('downspouts', e.target.checked)}
            />
            <span className="text-black dark:text-white">Downspouts</span>
          </label>
          
          <label className="flex items-center space-x-2 p-2 border border-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <input 
              type="checkbox" 
              name="services" 
              value="gutter-cleaning" 
              className="h-4 w-4 text-primary"
              checked={selectedServices.includes('gutter-cleaning')}
              onChange={(e) => handleServiceChange('gutter-cleaning', e.target.checked)}
            />
            <span className="text-black dark:text-white">Gutter Cleaning</span>
          </label>
          
          <label className="flex items-center space-x-2 p-2 border border-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <input 
              type="checkbox" 
              name="services" 
              value="other" 
              className="h-4 w-4 text-primary"
              checked={selectedServices.includes('other')}
              onChange={(e) => handleServiceChange('other', e.target.checked)}
            />
            <span className="text-black dark:text-white">Other</span>
          </label>
        </div>
        {validationErrors['services'] && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors['services']}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
          Project Details <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Please describe your project and provide approximate measurements if possible."
          className={`w-full px-3 py-2 border ${validationErrors['message'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          required
          data-error={!!validationErrors['message']}
        ></textarea>
        {validationErrors['message'] && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{validationErrors['message']}</p>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-300">Approximate measurements (if available) help us provide a more accurate estimate.</p>
      </div>
      
      {/* File Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
          Photos (Optional)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="space-y-2">
            <p className="text-sm text-gray-600" style={{color: "black"}}>
              <strong>Upload photos to help us provide accurate estimates</strong>
            </p>
            <p className="text-xs text-gray-500" style={{color: "black"}}>
              JPG, PNG, GIF, WebP, or PDF files up to 10MB each
            </p>
            {contactMethod === 'sms' && (
              <p className="text-xs text-amber-600 mt-2">
                ⚠️ Note: Images cannot be sent via SMS. Please choose email as your preferred contact method to receive images.
              </p>
            )}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              Choose Files
            </Button>
          </div>
        </div>
        
        {/* Show selected files */}
        {attachments.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="text-sm font-medium text-gray-700" style={{color: "black"}}>
              Selected files ({attachments.length}):
            </p>
            {attachments.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                <span className="text-sm text-gray-700 truncate" style={{color: "black"}}>
                  {file.name} ({(file.size / 1024 / 1024).toFixed(1)}MB)
                </span>
                <button
                  type="button"
                  onClick={() => removeAttachment(index)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Cloudflare Turnstile */}
      <div>
        <CloudflareTurnstile
          key={turnstileKey}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onVerify={(token) => {
            setTurnstileToken(token);
            setValidationErrors(prev => {
              const newErrors = { ...prev };
              delete newErrors.turnstile;
              return newErrors;
            });
          }}
          onError={() => {
            setTurnstileToken('');
            setValidationErrors(prev => ({
              ...prev,
              turnstile: 'Security verification failed. Please try again.'
            }));
          }}
          onExpire={() => {
            setTurnstileToken('');
            setValidationErrors(prev => ({
              ...prev,
              turnstile: 'Security verification expired. Please verify again.'
            }));
          }}
        />
        {validationErrors['turnstile'] && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{validationErrors['turnstile']}</p>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <Button 
          type="submit" 
          size="lg"
          className={`w-full sm:w-auto bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-bold transition-colors ${isSubmitting ? 'bg-gray-400' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Submit Request'}
        </Button>
      </div>
      
      {/* Show success or error message */}
      {submitResult && (
        <div className={`p-6 rounded-md mb-6 ${submitResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          {submitResult.success ? (
            <div className="flex flex-col items-center w-full">
              <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
              <p className="text-lg font-medium text-center mb-4" style={{color: "black"}}>{submitResult.message}</p>
              {contactMethod === 'email' && (
                <p className="text-sm text-center text-gray-600 mb-4" style={{color: "black"}}>
                  <strong>Note:</strong> Please check your spam/junk folder if you don&apos;t see our confirmation email.
                </p>
              )}
              <Button 
                className="mt-4"
                onClick={() => setSubmitResult(null)}
                variant="outline"
              >
                Submit Another Request
              </Button>
            </div>
          ) : (
            <div className="flex items-start">
              <AlertCircle className="text-red-500 h-6 w-6 mr-3 flex-shrink-0" />
              <p className="text-gray-700" style={{color: "black"}}>{submitResult.message}</p>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
