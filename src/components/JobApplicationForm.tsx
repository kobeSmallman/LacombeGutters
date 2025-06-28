'use client';

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Upload, X } from "lucide-react";

type JobFormData = {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  contactMethod: 'email' | 'sms';
};

export default function JobApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{success: boolean; message: string} | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<JobFormData>({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    contactMethod: 'email'
  });
  
  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      });
    }
  };

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
    handleInputChange('phone', formattedValue);
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    // Check name
    if (!formData.name || formData.name.trim() === '') {
      errors['name'] = 'Please enter your name';
    }
    
    // Check phone - ensure it has at least 10 digits
    if (!formData.phone || formData.phone.trim() === '') {
      errors['phone'] = 'Please enter your phone number';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errors['phone'] = 'Please enter a valid phone number with at least 10 digits';
    }
    
    // Check email
    if (!formData.email || formData.email.trim() === '') {
      errors['email'] = 'Please enter your email address';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors['email'] = 'Please enter a valid email address';
    }
    
    // Check position
    if (!formData.position || formData.position.trim() === '') {
      errors['position'] = 'Please select a position';
    }
    
    // Experience is now optional - no validation needed
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
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



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear previous validation errors and results
    setValidationErrors({});
    setSubmitResult(null);
    
    // Validate form
    if (!validateForm()) {
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
      
      // Create FormData to handle file uploads
      const apiFormData = new FormData();
      
      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        apiFormData.append(key, value);
      });
      apiFormData.append('source', 'job-application');
      
      // Add attachments
      attachments.forEach(file => {
        apiFormData.append('attachments', file);
      });
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: apiFormData,
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      // Show success message
      setSubmitResult({
        success: true,
        message: 'Thank you for your application! We have received your submission and will respond ASAP, usually within 24 hours.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        contactMethod: 'email'
      });
      
      if (formRef.current) {
        formRef.current.reset();
      }
      
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitResult({
        success: false,
        message: 'There was a problem submitting your application. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div>
        <h2 className="text-2xl font-bold text-center mb-6" style={{color: "black"}}>
          Join Our Team
        </h2>
        
        {submitResult ? (
          <div className={`p-6 rounded-md mb-4 flex flex-col items-center ${
            submitResult.success 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            {submitResult.success ? (
              <div className="flex flex-col items-center w-full">
                <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                <p className="text-lg font-medium text-center mb-4" style={{color: "black"}}>{submitResult.message}</p>
                {formData.contactMethod === 'email' && (
                  <p className="text-sm text-center text-gray-600 mb-4" style={{color: "black"}}>
                    <strong>Note:</strong> Please check your spam/junk folder if you don&apos;t see our confirmation email.
                  </p>
                )}
                <Button 
                  className="mt-4"
                  onClick={() => setSubmitResult(null)}
                  variant="outline"
                >
                  Submit Another Application
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                <p className="text-lg font-medium text-center" style={{color: "black"}}>{submitResult.message}</p>
                <Button 
                  className="mt-6"
                  onClick={() => setSubmitResult(null)}
                  variant="outline"
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="space-y-4 mb-8">


              {/* Name field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium" style={{color: "black"}}>
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`mt-1 block w-full rounded-md shadow-sm p-2.5 border ${validationErrors['name'] ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Your full name" 
                  data-error={!!validationErrors['name']}
                  required 
                />
                {validationErrors['name'] && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors['name']}</p>
                )}
              </div>
              
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium" style={{color: "black"}}>
                  Email <span className="text-red-600">*</span>
                </label>
                <input 
                  type="email" 
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`mt-1 block w-full rounded-md shadow-sm p-2.5 border ${validationErrors['email'] ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="your.email@example.com" 
                  data-error={!!validationErrors['email']}
                  required 
                />
                {validationErrors['email'] && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors['email']}</p>
                )}
              </div>
              
              {/* Phone field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium" style={{color: "black"}}>
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input 
                  type="tel" 
                  id="phone"
                  value={formData.phone}
                  onChange={handlePhoneInput}
                  className={`mt-1 block w-full rounded-md shadow-sm p-2.5 border ${validationErrors['phone'] ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="123-456-7890" 
                  data-error={!!validationErrors['phone']}
                  required 
                />
                {validationErrors['phone'] && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors['phone']}</p>
                )}
              </div>
              

              
              {/* Position field */}
              <div>
                <label htmlFor="position" className="block text-sm font-medium" style={{color: "black"}}>
                  Position Applying For <span className="text-red-600">*</span>
                </label>
                <select 
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className={`mt-1 block w-full rounded-md shadow-sm p-2.5 border ${validationErrors['position'] ? 'border-red-500' : 'border-gray-300'}`}
                  data-error={!!validationErrors['position']}
                  required
                >
                  <option value="">Select a position</option>
                  <option value="Installer">Installer</option>
                  <option value="Helper">Helper</option>
                  <option value="Sales Representative">Sales Representative</option>
                  <option value="Office Admin">Office Admin</option>
                  <option value="Other">Other</option>
                </select>
                {validationErrors['position'] && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors['position']}</p>
                )}
              </div>
              
              {/* Experience field */}
              <div>
                <label htmlFor="experience" className="block text-sm font-medium" style={{color: "black"}}>
                  Additional Experience & Skills
                </label>
                <textarea 
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  rows={4}
                  className={`mt-1 block w-full rounded-md shadow-sm p-2.5 border ${validationErrors['experience'] ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Please describe your relevant experience and skills (optional)..." 
                  data-error={!!validationErrors['experience']}
                ></textarea>
                {validationErrors['experience'] && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors['experience']}</p>
                )}
              </div>

              {/* File Upload Section */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: "black"}}>
                  Resume & Cover Letter (Optional)
                </label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={(e) => e.preventDefault()}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 mb-2" style={{color: "black"}}>
                    <strong>Drag and drop files here, or </strong>
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-600 hover:text-blue-500 underline"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-xs text-gray-500" style={{color: "black"}}>
                    Accepted formats: PDF, JPG, PNG, WebP (max 10MB each)
                  </p>
                  {formData.contactMethod === 'sms' && (
                    <p className="text-xs text-amber-600 mt-2">
                      ⚠️ Note: Files cannot be sent via SMS. Please choose email as your preferred contact method to receive files.
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
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2" style={{color: "black"}}>Selected Files:</p>
                    <div className="space-y-2">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                          <span className="text-sm truncate" style={{color: "black"}}>{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="text-red-600 hover:text-red-800 ml-2"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-bold" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Submit Application'}
            </Button>
          </form>
        )}
        

      </div>
    </div>
  );
}