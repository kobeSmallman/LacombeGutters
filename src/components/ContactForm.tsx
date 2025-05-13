'use client';

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/Button";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{success: boolean; message: string} | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  const validateForm = (formData: FormData): boolean => {
    const errors: {[key: string]: string} = {};
    
    // Check name
    const name = formData.get('name') as string;
    if (!name || name.trim() === '') {
      errors['name'] = 'Please enter your name';
    }
    
    // Check phone - ensure it has at least 10 digits
    const phone = formData.get('phone') as string;
    if (!phone || phone.trim() === '') {
      errors['phone'] = 'Please enter your phone number';
    } else if (phone.replace(/\D/g, '').length < 10) {
      errors['phone'] = 'Please enter a valid phone number with at least 10 digits';
    }
    
    // Check email
    const email = formData.get('email') as string;
    if (!email || email.trim() === '') {
      errors['email'] = 'Please enter your email address';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors['email'] = 'Please enter a valid email address';
    }
    
    // Check address
    const address = formData.get('address') as string;
    if (!address || address.trim() === '') {
      errors['address'] = 'Please enter your address';
    }
    
    // Check if at least one service is selected
    const services = formData.getAll('services') as string[];
    if (services.length === 0) {
      errors['services'] = 'Please select at least one service';
    }
    
    // Check project details
    const message = formData.get('message') as string;
    if (!message || message.trim() === '') {
      errors['message'] = 'Please enter project details';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      
      // Get form data
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      // Extract values for mailto link
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const phone = formData.get('phone') as string;
      const address = formData.get('address') as string;
      const message = formData.get('message') as string;
      const services = formData.getAll('services') as string[];
      
      // Log the services selected for debugging
      console.log('Selected services:', services);
      
      // Format services for email - clean presentation
      const formattedServices = services.map(service => 
        service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      ).join(', ');
      
      // Build a cleaner email body with PLAIN TEXT formatting (no HTML)
      const emailBody = `
Hello Lacombe Gutters,

I would like to request information on the following service(s): 
${formattedServices}

Details about my project:
${message}

My contact information:
- Name: ${name}
- Phone: ${phone}
- Email: ${email}${address ? `\n- Address: ${address}` : ''}

Thank you,
${name}
      `.trim();
      
      // Create a mailto link with all form data
      const mailtoLink = `mailto:kobe4smallman@gmail.com?subject=Gutter Estimate Request - ${encodeURIComponent(name)}&body=${encodeURIComponent(emailBody)}`;
      
      // Show alert with custom styling
      setSubmitResult({
        success: true,
        message: 'Opening your default email app... Please review and attach any relevant photos if needed.'
      });
      
      // Reset form after a short delay
      setTimeout(() => {
        setIsSubmitting(false);
        
        // Open the mailto link
        window.location.href = mailtoLink;
      }, 1000);
      
    } catch (error) {
      console.error('Error preparing email:', error);
      setIsSubmitting(false);
      setSubmitResult({
        success: false,
        message: 'There was a problem preparing your email. Please try again or contact us directly.'
      });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
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
            <p className="mt-1 text-sm text-red-600">{validationErrors['name']}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`w-full px-3 py-2 border ${validationErrors['phone'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
            required
            data-error={!!validationErrors['phone']}
          />
          {validationErrors['phone'] && (
            <p className="mt-1 text-sm text-red-600">{validationErrors['phone']}</p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={`w-full px-3 py-2 border ${validationErrors['email'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          required
          data-error={!!validationErrors['email']}
        />
        {validationErrors['email'] && (
          <p className="mt-1 text-sm text-red-600">{validationErrors['email']}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
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
          <p className="mt-1 text-sm text-red-600">{validationErrors['address']}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Services Needed <span className="text-red-500">*</span>
        </label>
        
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 ${validationErrors['services'] ? 'border border-red-500 bg-red-50 p-2 rounded-md' : ''}`} data-error={!!validationErrors['services']}>
          <label className="flex items-center space-x-2 p-2 border border-gray-200 rounded hover:bg-gray-50">
            <input type="checkbox" name="services" value="5-inch-gutters" className="h-4 w-4 text-primary" />
            <span>5-Inch Gutters</span>
          </label>
          
          <label className="flex items-center space-x-2 p-2 border border-gray-200 rounded hover:bg-gray-50">
            <input type="checkbox" name="services" value="6-inch-gutters" className="h-4 w-4 text-primary" />
            <span>6-Inch Gutters</span>
          </label>
          
          <label className="flex items-center space-x-2 p-2 border border-gray-200 rounded hover:bg-gray-50">
            <input type="checkbox" name="services" value="soffit-fascia" className="h-4 w-4 text-primary" />
            <span>Soffit & Fascia</span>
          </label>
          
          <label className="flex items-center space-x-2 p-2 border border-gray-200 rounded hover:bg-gray-50">
            <input type="checkbox" name="services" value="downspouts" className="h-4 w-4 text-primary" />
            <span>Downspouts</span>
          </label>
          
          <label className="flex items-center space-x-2 p-2 border border-gray-200 rounded hover:bg-gray-50">
            <input type="checkbox" name="services" value="gutter-cleaning" className="h-4 w-4 text-primary" />
            <span>Gutter Cleaning</span>
          </label>
          
          <label className="flex items-center space-x-2 p-2 border border-gray-200 rounded hover:bg-gray-50">
            <input type="checkbox" name="services" value="other" className="h-4 w-4 text-primary" />
            <span>Other</span>
          </label>
        </div>
        {validationErrors['services'] && (
          <p className="mt-1 text-sm text-red-600">{validationErrors['services']}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
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
          <p className="mt-1 text-sm text-red-600">{validationErrors['message']}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">Approximate measurements (if available) help us provide a more accurate estimate.</p>
      </div>
      
      <div className="bg-gray-50 border-l-4 border-primary p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm">
              <strong>Photos Help Us Provide Accurate Estimates</strong> - When your default email app opens, you&apos;ll be able to attach photos of your existing gutters or project area.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Note: This form will open your device&apos;s default email application. We will respond to the email address you provided above.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <Button 
          type="submit" 
          variant="primary" 
          size="lg"
          className={`w-full sm:w-auto transition-colors ${isSubmitting ? 'bg-green-600 hover:bg-green-700' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Form Info Ready...' : 'Prepare Email'}
        </Button>
        
        {submitResult && (
          <div className={`text-sm px-4 py-2 rounded-md ${submitResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {submitResult.message}
          </div>
        )}
      </div>
    </form>
  );
}
