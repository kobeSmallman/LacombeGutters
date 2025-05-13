'use client';

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/Button";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{success: boolean; message: string} | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    setIsSubmitting(true);
    setSubmitResult(null);
    
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>
      
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Street address, city"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Services Needed <span className="text-red-500">*</span>
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          required
        ></textarea>
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
