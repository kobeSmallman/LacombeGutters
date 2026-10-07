'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Upload, X } from "lucide-react";
import CloudflareTurnstile, { TurnstileHandle } from './CloudflareTurnstile';
import FormFailureHelp, { buildMessageSummary } from './FormFailureHelp';
import { useAttachments } from '@/hooks/useAttachments';
import { useFormDraft } from '@/hooks/useFormDraft';
import { newSubmissionReference, submitContactForm, SubmitFailureKind } from '@/lib/submitForm';

type SubmitResultState =
  | { success: true; message: string }
  | { success: false; message: string; kind: SubmitFailureKind; summary: string };

type JobFormData = {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  contactMethod: 'email' | 'sms';
};

const EMPTY_FORM: JobFormData = {
  name: '',
  email: '',
  phone: '',
  position: '',
  experience: '',
  contactMethod: 'email'
};

export default function JobApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResultState | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const { attachments, rejected, isProcessing, add: addFiles, remove: removeAttachment, clear: clearAttachments, budgetLabel } = useAttachments();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const turnstileRef = useRef<TurnstileHandle>(null);
  // Same reference across retries of one filled-in form; new one after a success.
  const [reference, setReference] = useState(newSubmissionReference);
  const [reattachNotice, setReattachNotice] = useState(false);
  const draft = useFormDraft<JobFormData>('job-application', ['contactMethod']);

  const [formData, setFormData] = useState<JobFormData>(EMPTY_FORM);

  // Restore an unsent draft (e.g. after a refresh)
  useEffect(() => {
    const saved = draft.load();
    if (saved) {
      setFormData({ ...EMPTY_FORM, ...saved.values });
      setReattachNotice(saved.attachmentCount > 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    draft.save(formData, attachments.length);
  }, [draft, formData, attachments.length]);

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

    if (!turnstileToken) {
      errors['turnstile'] = 'Please complete the security verification';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle file selection — photos are shrunk in the browser to fit the upload limit
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // Clear so picking the same file again still fires onChange
    e.target.value = '';
    setReattachNotice(false);
    addFiles(files);
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setReattachNotice(false);
    addFiles(e.dataTransfer.files);
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
      // Create FormData to handle file uploads
      const apiFormData = new FormData();
      
      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        apiFormData.append(key, value);
      });
      apiFormData.append('source', 'job-application');
      apiFormData.append('turnstile-token', turnstileToken);

      // Add attachments
      attachments.forEach(file => {
        apiFormData.append('attachments', file);
      });
      
      const result = await submitContactForm(apiFormData, reference);

      if (result.ok) {
        // Show success message
        setSubmitResult({
          success: true,
          message: `Thank you for your application (ref ${result.reference})! We have received your submission and will respond ASAP, usually within 24 hours.`
        });

        // Reset form
        setFormData(EMPTY_FORM);
        clearAttachments();
        setReference(newSubmissionReference());
        draft.clear();

        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        setSubmitResult({
          success: false,
          kind: result.kind,
          message: result.message,
          summary: buildMessageSummary({
            Name: formData.name,
            Phone: formData.phone,
            Email: formData.email,
            Position: formData.position,
          }, formData.experience),
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div>
        <h2 className="text-2xl font-bold text-center mb-6" style={{color: "black"}}>
          Join Our Team
        </h2>
        
        {submitResult?.success ? (
          <div className="p-6 rounded-md mb-4 flex flex-col items-center bg-green-50 border border-green-200">
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
                  name="name"
                  autoComplete="name"
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
                  name="email"
                  autoComplete="email"
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
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
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
                    PDF or photos, up to 6 files. Large photos are resized automatically.
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
                    accept="image/*,.pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
                
                {isProcessing && (
                  <p className="mt-2 text-sm text-gray-600">Optimizing photos…</p>
                )}

                {reattachNotice && attachments.length === 0 && (
                  <p className="mt-2 text-sm text-amber-700">
                    We kept your application, but files can&apos;t be saved — please re-attach them.
                  </p>
                )}

                {rejected.length > 0 && (
                  <ul className="mt-2 space-y-1 text-sm text-red-600">
                    {rejected.map((item, index) => (
                      <li key={index}><strong>{item.name}:</strong> {item.reason}</li>
                    ))}
                  </ul>
                )}

                {/* Display selected files */}
                {attachments.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2" style={{color: "black"}}>Selected Files ({budgetLabel}):</p>
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
            
            <div className="mb-4">
              <CloudflareTurnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAACLMknOrovBOqBYa'}
                onVerify={(token) => setTurnstileToken(token)}
                onError={() => setTurnstileToken('')}
                onExpire={() => setTurnstileToken('')}
              />
              {validationErrors['turnstile'] && (
                <p className="mt-1 text-sm text-red-600">{validationErrors['turnstile']}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-bold"
              disabled={isSubmitting || isProcessing}
            >
              {isSubmitting ? 'Sending...' : isProcessing ? 'Preparing files...' : 'Submit Application'}
            </Button>

            {submitResult && !submitResult.success && (
              <div className="mt-4 p-4 rounded-md bg-red-50 border border-red-200">
                <div className="flex items-start">
                  <AlertCircle className="text-red-500 h-6 w-6 mr-3 flex-shrink-0" />
                  <p className="text-gray-700" style={{color: "black"}}>{submitResult.message}</p>
                </div>
                {submitResult.kind !== 'verification' && (
                  <FormFailureHelp summary={submitResult.summary} subject="Job application from the website" />
                )}
              </div>
            )}
</form>
        )}
        

      </div>
    </div>
  );
}