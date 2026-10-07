'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Upload, X } from "lucide-react";
import CloudflareTurnstile, { TurnstileHandle } from './CloudflareTurnstile';
import { formatBytes } from '@/lib/attachments';
import FormFailureHelp, { buildMessageSummary } from './FormFailureHelp';
import { useAttachments } from '@/hooks/useAttachments';
import { useFormDraft } from '@/hooks/useFormDraft';
import { newSubmissionReference, submitContactForm, SubmitFailureKind } from '@/lib/submitForm';

type ContactDraft = {
  name: string;
  phone: string;
  email: string;
  address: string;
  message: string;
  services: string[];
  contactMethod: 'email' | 'sms';
};

const TEXT_FIELDS = ['name', 'phone', 'email', 'address', 'message'] as const;

type SubmitResultState =
  | { success: true; message: string }
  | { success: false; message: string; kind: SubmitFailureKind; summary: string };

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResultState | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [contactMethod, setContactMethod] = useState<'email' | 'sms'>('email');
  const { attachments, rejected, isProcessing, add: addFiles, remove: removeAttachment, clear: clearAttachments, budgetLabel } = useAttachments();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const turnstileRef = useRef<TurnstileHandle>(null);
  // Same reference across retries of one filled-in form; new one after a success.
  const [reference, setReference] = useState(newSubmissionReference);
  const [reattachNotice, setReattachNotice] = useState(false);
  const draft = useFormDraft<ContactDraft>('contact-page', ['contactMethod']);

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

  // Restore an unsent draft (e.g. after a refresh), otherwise check for a
  // preselected service from the services page.
  useEffect(() => {
    const saved = draft.load();
    const selectedService = sessionStorage.getItem('selectedService');
    if (selectedService) {
      // Clear the sessionStorage after using it
      sessionStorage.removeItem('selectedService');
    }

    if (saved && formRef.current) {
      const { values } = saved;
      TEXT_FIELDS.forEach(field => {
        const input = formRef.current?.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement | null;
        if (input && values[field]) input.value = values[field];
      });
      setSelectedServices(values.services || []);
      setContactMethod(values.contactMethod || 'email');
      setReattachNotice(saved.attachmentCount > 0);
    } else if (selectedService) {
      setSelectedServices([mapServiceNameToValue(selectedService)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const readDraftValues = (): ContactDraft => {
    const formData = formRef.current ? new FormData(formRef.current) : new FormData();
    const text = (field: string) => (formData.get(field) as string) || '';
    return {
      name: text('name'),
      phone: text('phone'),
      email: text('email'),
      address: text('address'),
      message: text('message'),
      services: selectedServices,
      contactMethod,
    };
  };

  const saveDraft = () => draft.save(readDraftValues(), attachments.length);

  // Services, contact method and attachments live in React state, so save when they change too.
  useEffect(() => {
    saveDraft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedServices, contactMethod, attachments.length]);

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
    
    // Check phone - required for SMS, optional for email
    const phone = formData.get('phone') as string;
    if (contactMethod === 'sms') {
      if (!phone || phone.trim() === '') {
        errors['phone'] = 'Please enter your phone number';
      } else if (phone.replace(/\D/g, '').length < 10) {
        errors['phone'] = 'Please enter a valid phone number with at least 10 digits';
      }
    } else if (phone && phone.trim() !== '' && phone.replace(/\D/g, '').length < 10) {
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

  // Handle file attachment — photos are shrunk in the browser to fit the upload limit
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // Clear so picking the same file again still fires onChange
    e.target.value = '';
    setReattachNotice(false);
    addFiles(files);
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

      const result = await submitContactForm(apiFormData, reference);

      if (result.ok) {
        setSubmitResult({
          success: true,
          message: `Your request has been sent successfully (ref ${result.reference}). We will contact you via your preferred method within 24 hours.`
        });

        // Reset form
        form.reset();
        setContactMethod('email');
        clearAttachments();
        setSelectedServices([]);
        setReference(newSubmissionReference());
        draft.clear();
      } else {
        const values = readDraftValues();
        setSubmitResult({
          success: false,
          kind: result.kind,
          message: result.message,
          summary: buildMessageSummary({
            Name: values.name,
            Phone: values.phone,
            Email: values.email,
            Address: values.address,
            Services: values.services,
            'Preferred contact': values.contactMethod === 'sms' ? 'Text message' : 'Email',
          }, values.message),
        });
      }
    } finally {
      // Tokens are single-use — get a fresh one so the next Send works without a reload.
      setTurnstileToken('');
      turnstileRef.current?.reset();
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} onInput={saveDraft} method="POST" className="space-y-6">
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
      <div className="mb-6 pl-3">
        <h3 className="font-bold text-lg mb-3">Preferred Contact Method *</h3>
        <div className="flex gap-4">
          <label className="flex items-center text-sm p-3 min-h-[44px] rounded hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              name="contactMethod"
              value="email"
              checked={contactMethod === 'email'}
              onChange={() => setContactMethod('email')}
              className="h-5 w-5 mr-3"
            />
            Email
          </label>
          <label className="flex items-center text-sm p-3 min-h-[44px] rounded hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              name="contactMethod"
              value="sms"
              checked={contactMethod === 'sms'}
              onChange={() => setContactMethod('sms')}
              className="h-5 w-5 mr-3"
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
            autoComplete="name"
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
            autoComplete="tel"
            inputMode="tel"
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
          autoComplete="email"
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
          autoComplete="street-address"
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
          <label className="flex items-center space-x-3 p-3 min-h-[44px] cursor-pointer border border-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <input
              type="checkbox"
              name="services"
              value="5-inch-gutters"
              className="h-5 w-5 text-primary"
              checked={selectedServices.includes('5-inch-gutters')}
              onChange={(e) => handleServiceChange('5-inch-gutters', e.target.checked)}
            />
            <span className="text-black dark:text-white">5-Inch Gutters</span>
          </label>

          <label className="flex items-center space-x-3 p-3 min-h-[44px] cursor-pointer border border-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <input
              type="checkbox"
              name="services"
              value="6-inch-gutters"
              className="h-5 w-5 text-primary"
              checked={selectedServices.includes('6-inch-gutters')}
              onChange={(e) => handleServiceChange('6-inch-gutters', e.target.checked)}
            />
            <span className="text-black dark:text-white">6-Inch Gutters</span>
          </label>

          <label className="flex items-center space-x-3 p-3 min-h-[44px] cursor-pointer border border-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <input
              type="checkbox"
              name="services"
              value="soffit-fascia"
              className="h-5 w-5 text-primary"
              checked={selectedServices.includes('soffit-fascia')}
              onChange={(e) => handleServiceChange('soffit-fascia', e.target.checked)}
            />
            <span className="text-black dark:text-white">Soffit & Fascia</span>
          </label>

          <label className="flex items-center space-x-3 p-3 min-h-[44px] cursor-pointer border border-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <input
              type="checkbox"
              name="services"
              value="downspouts"
              className="h-5 w-5 text-primary"
              checked={selectedServices.includes('downspouts')}
              onChange={(e) => handleServiceChange('downspouts', e.target.checked)}
            />
            <span className="text-black dark:text-white">Downspouts</span>
          </label>

          <label className="flex items-center space-x-3 p-3 min-h-[44px] cursor-pointer border border-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <input
              type="checkbox"
              name="services"
              value="gutter-cleaning"
              className="h-5 w-5 text-primary"
              checked={selectedServices.includes('gutter-cleaning')}
              onChange={(e) => handleServiceChange('gutter-cleaning', e.target.checked)}
            />
            <span className="text-black dark:text-white">Gutter Cleaning</span>
          </label>

          <label className="flex items-center space-x-3 p-3 min-h-[44px] cursor-pointer border border-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <input
              type="checkbox"
              name="services"
              value="other"
              className="h-5 w-5 text-primary"
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
              Photos or PDF files, up to 6. Large photos are resized automatically.
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
              disabled={isProcessing}
            >
              {isProcessing ? 'Optimizing photos…' : 'Choose Files'}
            </Button>
          </div>
        </div>
        
        {reattachNotice && attachments.length === 0 && (
          <p className="mt-2 text-sm text-amber-700">
            We kept your message, but photos can&apos;t be saved — please re-attach them.
          </p>
        )}

        {rejected.length > 0 && (
          <ul className="mt-2 space-y-1 text-sm text-red-600">
            {rejected.map((item, index) => (
              <li key={index}><strong>{item.name}:</strong> {item.reason}</li>
            ))}
          </ul>
        )}

        {/* Show selected files */}
        {attachments.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="text-sm font-medium text-gray-700" style={{color: "black"}}>
              Selected files ({budgetLabel}):
            </p>
            {attachments.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                <span className="text-sm text-gray-700 truncate" style={{color: "black"}}>
                  {file.name} ({formatBytes(file.size)})
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
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAACLMknOrovBOqBYa'}
          onVerify={(token) => {
            setTurnstileToken(token);
          }}
          onError={() => {
            setTurnstileToken('');
            console.error('Turnstile verification failed');
          }}
          onExpire={() => {
            setTurnstileToken('');
            console.log('Turnstile expired');
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
          disabled={isSubmitting || isProcessing}
        >
          {isSubmitting ? 'Sending...' : isProcessing ? 'Preparing photos...' : 'Submit Request'}
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
            <div>
              <div className="flex items-start">
                <AlertCircle className="text-red-500 h-6 w-6 mr-3 flex-shrink-0" />
                <p className="text-gray-700" style={{color: "black"}}>{submitResult.message}</p>
              </div>
              {submitResult.kind !== 'verification' && (
                <FormFailureHelp summary={submitResult.summary} subject="Estimate request from the website" />
              )}
            </div>
          )}
        </div>
      )}
    </form>
  );
}
