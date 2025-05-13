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
      
      // Build a cleaner email body
      const emailBody = `
<div style="font-size: 14pt; font-family: Arial, sans-serif;">
<p>Hello Lacombe Gutters,</p>

<p>I would like to request information on the following service(s):<br/> 
<strong>${formattedServices}</strong></p>

<p>Details about my project:</p>
<p>${message}</p>

<p>My contact information:</p>
<ul>
<li><strong>Name:</strong> ${name}</li>
<li><strong>Phone:</strong> ${phone}</li>
<li><strong>Email:</strong> ${email}</li>
${address ? `<li><strong>Address:</strong> ${address}</li>` : ''}
</ul>

<p>Thank you,<br/>
${name}</p>
</div>
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
        form.reset();
        setIsSubmitting(false);
      }, 1000);
      
      // Open mail client (after a slight delay to ensure user sees the message)
      setTimeout(() => {
        window.open(mailtoLink, '_self');
      }, 1500);
      
    } catch (error) {
      console.error('Error preparing email:', error);
      setSubmitResult({
        success: false,
        message: 'There was an issue preparing your email. Please try again or contact us directly at kobe4smallman@gmail.com.'
      });
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md relative" 
    >
      {/* Construction themed corner elements */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary"></div>
      
      {/* Faux metal strip at the top */}
      <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300"></div>
      <div className="absolute top-1 left-8 w-2 h-2 rounded-full bg-gray-400 border border-gray-500"></div>
      <div className="absolute top-1 right-8 w-2 h-2 rounded-full bg-gray-400 border border-gray-500"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">Name</label>
          <input type="text" id="name" name="name" className="w-full p-3 border border-gray-300 rounded-lg" required />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-2 font-medium">Phone</label>
          <input type="tel" id="phone" name="phone" className="w-full p-3 border border-gray-300 rounded-lg" required />
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block mb-2 font-medium">Email</label>
        <input type="email" id="email" name="email" className="w-full p-3 border border-gray-300 rounded-lg" required />
      </div>
      
      <div>
        <label htmlFor="address" className="block mb-2 font-medium">Project Address</label>
        <input type="text" id="address" name="address" className="w-full p-3 border border-gray-300 rounded-lg" />
      </div>
      
      <div>
        <label className="block mb-2 font-medium">Services Needed (select all that apply)</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-800">
          <label className="flex items-center space-x-2 cursor-pointer hover:bg-primary/10 p-2 rounded transition-colors">
            <input type="checkbox" name="services" value="5-inch-gutters" className="h-4 w-4 text-primary focus:ring-primary" />
            <span className="text-black dark:text-white">5&quot; Gutters</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer hover:bg-primary/10 p-2 rounded transition-colors">
            <input type="checkbox" name="services" value="6-inch-gutters" className="h-4 w-4 text-primary focus:ring-primary" />
            <span className="text-black dark:text-white">6&quot; Gutters</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer hover:bg-primary/10 p-2 rounded transition-colors">
            <input type="checkbox" name="services" value="soffit-fascia" className="h-4 w-4 text-primary focus:ring-primary" />
            <span className="text-black dark:text-white">Soffit &amp; Fascia</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer hover:bg-primary/10 p-2 rounded transition-colors">
            <input type="checkbox" name="services" value="gutter-cleaning" className="h-4 w-4 text-primary focus:ring-primary" />
            <span className="text-black dark:text-white">Gutter Cleaning</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer hover:bg-primary/10 p-2 rounded transition-colors">
            <input type="checkbox" name="services" value="downspouts" className="h-4 w-4 text-primary focus:ring-primary" />
            <span className="text-black dark:text-white">Downspouts</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer hover:bg-primary/10 p-2 rounded transition-colors">
            <input type="checkbox" name="services" value="industrial" className="h-4 w-4 text-primary focus:ring-primary" />
            <span className="text-black dark:text-white">Industrial Eavestrough</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer hover:bg-primary/10 p-2 rounded transition-colors">
            <input type="checkbox" name="services" value="other" className="h-4 w-4 text-primary focus:ring-primary" />
            <span className="text-black dark:text-white">Other (please specify)</span>
          </label>
        </div>
      </div>
      
      <div>
        <label htmlFor="message" className="block mb-2 font-medium">Project Details</label>
        <textarea 
          id="message" 
          name="message" 
          rows={4} 
          className="w-full p-3 border border-gray-300 rounded-lg" 
          placeholder="Please include details about your project, including any specific measurements (if known), requirements, or questions."
          required
        ></textarea>
        <p className="mt-1 text-xs text-gray-500">Approximate measurements (if available) help us provide a more accurate estimate.</p>
      </div>
      
      {/* Photo instructions */}
      <div className="relative border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden p-4">
        {/* Construction theme elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-300"></div>
        <div className="absolute top-1 left-1 w-2 h-2 bg-gray-400 rounded-full"></div>
        <div className="absolute top-1 right-1 w-2 h-2 bg-gray-400 rounded-full"></div>
        
        <div className="flex items-start space-x-3 pt-2">
          <div className="text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-700">
              <strong>Photos Help Us Provide Accurate Estimates</strong><br/>
              When your default email app opens, you&apos;ll be able to attach photos of your existing gutters or project area to help us provide the most accurate estimate.
            </p>
          </div>
        </div>
      </div>
      
      <div className="relative border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden p-4">
        {/* Construction theme elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-300"></div>
        <div className="absolute top-1 left-1 w-2 h-2 bg-gray-400 rounded-full"></div>
        <div className="absolute top-1 right-1 w-2 h-2 bg-gray-400 rounded-full"></div>
        
        <div className="flex items-start space-x-3 pt-2">
          <div className="text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="mt-2 text-xs text-gray-500">
              Note: This form will open your device&apos;s default email application. We will respond to the email address you provided above.
            </p>
          </div>
        </div>
      </div>
      
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
        <div className={`mt-4 p-4 rounded border ${submitResult.success ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'}`}>
          <p className="text-sm font-medium">{submitResult.message}</p>
        </div>
      )}
    </form>
  );
}
