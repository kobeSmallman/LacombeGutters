'use client';

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/Button";

export default function JobApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{success: boolean; message: string} | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

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
    const formattedValue = formatPhoneNumber(e.target.value);
    e.target.value = formattedValue;
  };

  const validateForm = (formData: FormData): boolean => {
    const errors: {[key: string]: string} = {};
    
    // Check name
    const name = formData.get('job-name') as string;
    if (!name || name.trim() === '') {
      errors['job-name'] = 'Please enter your name';
    }
    
    // Check phone - ensure it has at least 10 digits
    const phone = formData.get('job-phone') as string;
    if (!phone || phone.trim() === '') {
      errors['job-phone'] = 'Please enter your phone number';
    } else if (phone.replace(/\D/g, '').length < 10) {
      errors['job-phone'] = 'Please enter a valid phone number with at least 10 digits';
    }
    
    // Check email
    const email = formData.get('job-email') as string;
    if (!email || email.trim() === '') {
      errors['job-email'] = 'Please enter your email address';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors['job-email'] = 'Please enter a valid email address';
    }
    
    // Check position
    const position = formData.get('position') as string;
    if (!position || position.trim() === '') {
      errors['position'] = 'Please select a position';
    }
    
    // Check experience
    const experience = formData.get('experience') as string;
    if (!experience || experience.trim() === '') {
      errors['experience'] = 'Please describe your experience and skills';
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
      console.log('Starting job application submission...');
      
      // Get form data
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      // Extract values for mailto link
      const name = formData.get('job-name') as string;
      const email = formData.get('job-email') as string;
      const phone = formData.get('job-phone') as string;
      const position = formData.get('position') as string;
      const experience = formData.get('experience') as string;
      
      // Build email body with plain text formatting (no HTML)
      const emailBody = `
Hello Lacombe Gutters,

I would like to apply for the position of: ${position}

About me:
- Name: ${name}
- Phone: ${phone}
- Email: ${email}

Experience and Skills:
${experience}

Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experience can benefit your team.

Best regards,
${name}
      `.trim();
      
      // Create a mailto link with all form data
      const mailtoLink = `mailto:kobe4smallman@gmail.com?subject=Job Application - ${encodeURIComponent(position)} Position - ${encodeURIComponent(name)}&body=${encodeURIComponent(emailBody)}`;
      
      // Show alert with custom styling
      setSubmitResult({
        success: true,
        message: 'Opening your default email app... Please attach your resume before sending.'
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
      console.error('Error preparing job application email:', error);
      setSubmitResult({
        success: false,
        message: 'There was an issue preparing your application. Please try again or contact us directly at kobe4smallman@gmail.com.'
      });
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 sm:p-8 rounded-lg border shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="job-name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="job-name" 
            name="job-name" 
            className={`w-full p-3 border ${validationErrors['job-name'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-primary`}
            required 
            data-error={!!validationErrors['job-name']}
          />
          {validationErrors['job-name'] && (
            <p className="mt-1 text-sm text-red-600">{validationErrors['job-name']}</p>
          )}
        </div>
        <div>
          <label htmlFor="job-phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input 
            type="tel" 
            id="job-phone" 
            name="job-phone" 
            className={`w-full p-3 border ${validationErrors['job-phone'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-primary`}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="123-456-7890"
            onInput={handlePhoneInput}
            maxLength={12}
            required 
            data-error={!!validationErrors['job-phone']}
          />
          {validationErrors['job-phone'] && (
            <p className="mt-1 text-sm text-red-600">{validationErrors['job-phone']}</p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="job-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input 
          type="email" 
          id="job-email" 
          name="job-email" 
          className={`w-full p-3 border ${validationErrors['job-email'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-primary`}
          required 
          data-error={!!validationErrors['job-email']}
        />
        {validationErrors['job-email'] && (
          <p className="mt-1 text-sm text-red-600">{validationErrors['job-email']}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
          Position <span className="text-red-500">*</span>
        </label>
        <select 
          id="position" 
          name="position" 
          className={`w-full p-3 border ${validationErrors['position'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-primary`}
          required
          data-error={!!validationErrors['position']}
        >
          <option value="">Select a position...</option>
          <option value="Gutter Installer">Gutter Installer</option>
          <option value="Soffit and Fascia Installer">Soffit and Fascia Installer</option>
          <option value="Estimator">Estimator</option>
          <option value="General Labor">General Labor</option>
          <option value="Office Admin">Office Admin</option>
          <option value="Other">Other</option>
        </select>
        {validationErrors['position'] && (
          <p className="mt-1 text-sm text-red-600">{validationErrors['position']}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
          Experience <span className="text-red-500">*</span>
        </label>
        <textarea 
          id="experience" 
          name="experience" 
          rows={5} 
          className={`w-full p-3 border ${validationErrors['experience'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-primary`}
          placeholder="Please describe your relevant experience, skills, and why you're interested in working with us."
          required
          data-error={!!validationErrors['experience']}
        ></textarea>
        {validationErrors['experience'] && (
          <p className="mt-1 text-sm text-red-600">{validationErrors['experience']}</p>
        )}
      </div>
      
      {/* Resume instructions */}
      <div className="relative border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden p-4">
        {/* Construction theme elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-300"></div>
        <div className="absolute top-1 left-1 w-2 h-2 bg-gray-400 rounded-full"></div>
        <div className="absolute top-1 right-1 w-2 h-2 bg-gray-400 rounded-full"></div>
        
        <div className="flex items-start space-x-3 pt-2">
          <div className="text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-700">
              <strong>Resume & Qualifications</strong><br/>
              When your default email app opens, please attach your resume and any relevant qualification documents to help us assess your application.
            </p>
            <p className="mt-2 text-xs text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
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
        {isSubmitting ? 'Form Info Ready...' : 'Prepare Application Email'}
      </Button>
      
      {submitResult && (
        <div className={`mt-4 p-4 rounded border ${submitResult.success ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'}`}>
          <p className="text-sm font-medium">{submitResult.message}</p>
        </div>
      )}
    </form>
  );
}
