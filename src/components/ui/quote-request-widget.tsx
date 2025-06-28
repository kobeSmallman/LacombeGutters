'use client';

import { useState, useRef } from 'react';
import { ChevronDown, ChevronUp, Send, Loader2, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Textarea } from './textarea';
import { Label } from './label';
import { serviceLocations } from '@/lib/locations';

// Simple checkbox component for service selection
const Checkbox = ({ id, checked, onCheckedChange }: { id: string; checked: boolean; onCheckedChange: () => void }) => (
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={onCheckedChange}
    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary"
  />
);

interface ServiceOption {
  id: string;
  label: string;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  { id: 'gutters', label: '5" Seamless Gutters' },
  { id: 'soffit', label: 'Soffit & Fascia' },
  { id: 'cleaning', label: 'Gutter Cleaning' },
  { id: 'guards', label: 'Gutter Guards' },
  { id: 'repair', label: 'Repairs' },
];

export function QuoteRequestWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'location' | 'details' | 'success' | 'error'>('location');
  const [city, setCity] = useState('');
  const [locationStatus, setLocationStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [locationMessage, setLocationMessage] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  
  // Form fields
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  
  // Handle location check
  const checkServiceArea = async () => {
    if (!city.trim()) return;
    
    setLocationStatus('checking');
    
    try {
      const response = await fetch('/api/checkServiceArea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city }),
      });
      
      const data = await response.json();
      
      if (data.inServiceArea) {
        setLocationStatus('valid');
        setLocationMessage(data.message);
        // Proceed to next step after short delay
        setTimeout(() => setStep('details'), 1000);
      } else {
        setLocationStatus('invalid');
        setLocationMessage(data.message);
      }
    } catch {
      setLocationStatus('invalid');
      setLocationMessage('Error checking service area. Please try again.');
    }
  };
  
  // Toggle service selection
  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id) 
        : [...prev, id]
    );
  };
  
  // Handle form submission
  const submitQuoteRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nameRef.current?.value || !emailRef.current?.value || !phoneRef.current?.value || selectedServices.length === 0) {
      return; // Form validation failed
    }
    
    setIsSubmitting(true);
    
    try {
      const formData = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        city: city,
        services: selectedServices.map(id => SERVICE_OPTIONS.find(s => s.id === id)?.label || id),
        message: messageRef.current?.value || ''
      };
      
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStep('success');
      } else {
        setStep('error');
      }
    } catch {
      setStep('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Reset the form
  const resetForm = () => {
    setCity('');
    setLocationStatus('idle');
    setLocationMessage('');
    setSelectedServices([]);
    setStep('location');
    
    if (nameRef.current) nameRef.current.value = '';
    if (emailRef.current) emailRef.current.value = '';
    if (phoneRef.current) phoneRef.current.value = '';
    if (messageRef.current) messageRef.current.value = '';
  };
  
  return (
    <div className="w-full max-w-lg mx-auto border-2 border-primary rounded-md bg-white shadow-lg overflow-hidden">
      {/* Widget Header */}
      <button
        onClick={() => setIsExpanded(prev => !prev)}
        className="w-full bg-primary text-white p-4 flex justify-between items-center"
      >
        <span className="text-xl font-bold">Get a Free Quote</span>
        {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
      
      {/* Widget Content */}
      {isExpanded && (
        <div className="p-5 border-t border-gray-200">
          {/* Location Step */}
          {step === 'location' && (
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="city">What city are you located in?</Label>
                <div className="flex space-x-2">
                  <Input
                    id="city"
                    placeholder="Enter your city"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      setLocationStatus('idle');
                    }}
                    className="flex-1"
                    list="city-options"
                  />
                  <datalist id="city-options">
                    {serviceLocations.map(loc => (
                      <option key={loc.slug} value={loc.name} />
                    ))}
                  </datalist>
                  <Button
                    onClick={checkServiceArea}
                    disabled={!city.trim() || locationStatus === 'checking'}
                  >
                    {locationStatus === 'checking' ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <MapPin className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              {/* Location Status */}
              {locationStatus === 'valid' && (
                <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                  <span>{locationMessage}</span>
                </div>
              )}
              
              {locationStatus === 'invalid' && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start">
                  <XCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                  <span>{locationMessage}</span>
                </div>
              )}
            </div>
          )}
          
          {/* Details Step */}
          {step === 'details' && (
            <form onSubmit={submitQuoteRequest} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" ref={nameRef} required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" ref={phoneRef} required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" ref={emailRef} required />
              </div>
              
              <div className="space-y-2">
                <Label className="text-base">Services Needed (select all that apply)</Label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {SERVICE_OPTIONS.map((service) => (
                    <div key={service.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`service-${service.id}`}
                        checked={selectedServices.includes(service.id)}
                        onCheckedChange={() => toggleService(service.id)}
                      />
                      <Label htmlFor={`service-${service.id}`} className="cursor-pointer">
                        {service.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Additional Details</Label>
                <Textarea
                  id="message"
                  ref={messageRef}
                  placeholder="Tell us more about your project..."
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep('location')}>
                  Back
                </Button>
                <Button type="submit" disabled={isSubmitting || selectedServices.length === 0}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Request Quote
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
          
          {/* Success Step */}
          {step === 'success' && (
            <div className="text-center space-y-4">
              <div className="inline-flex h-14 w-14 rounded-full bg-green-100 items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Quote Request Submitted!</h3>
              <p className="text-gray-500">
                Thank you! We&apos;ve received your request and will contact you shortly.
              </p>
              <Button onClick={resetForm}>Submit Another Request</Button>
            </div>
          )}
          
          {/* Error Step */}
          {step === 'error' && (
            <div className="text-center space-y-4">
              <div className="inline-flex h-14 w-14 rounded-full bg-red-100 items-center justify-center mx-auto">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Something Went Wrong</h3>
              <p className="text-gray-500">
                Sorry, we encountered an error processing your request. Please try again.
              </p>
              <div className="flex space-x-2 justify-center">
                <Button onClick={resetForm} variant="outline">Reset Form</Button>
                <Button onClick={() => setIsSubmitting(false)}>Try Again</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
