'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Send, Loader2, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Textarea } from './textarea';
import { Label } from './label';
import { serviceLocations } from '@/lib/locations';
import CloudflareTurnstile, { TurnstileHandle } from '@/components/CloudflareTurnstile';
import FormFailureHelp, { buildMessageSummary } from '@/components/FormFailureHelp';
import { useFormDraft } from '@/hooks/useFormDraft';
import { newSubmissionReference, submitContactForm, SubmitFailureKind } from '@/lib/submitForm';

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

type ContactFields = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const EMPTY_FIELDS: ContactFields = { name: '', email: '', phone: '', message: '' };

type CityDraft = ContactFields & { city: string; services: string[] };

export function QuoteRequestWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'location' | 'details' | 'success'>('location');
  const [city, setCity] = useState('');
  const [locationStatus, setLocationStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [locationMessage, setLocationMessage] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef<TurnstileHandle>(null);
  // Controlled so a failed send never wipes what the customer typed
  const [fields, setFields] = useState<ContactFields>(EMPTY_FIELDS);
  const [failure, setFailure] = useState<{ kind: SubmitFailureKind; message: string; summary: string } | null>(null);
  // Same reference across retries of one filled-in form; new one after a success.
  const [reference, setReference] = useState(newSubmissionReference);
  const [successReference, setSuccessReference] = useState('');
  const draft = useFormDraft<CityDraft>('city-widget');

  // Restore an unsent draft (e.g. after a refresh) and reopen where they left off
  useEffect(() => {
    const saved = draft.load();
    if (!saved) return;
    const { city: savedCity, services, ...savedFields } = saved.values;
    setCity(savedCity || '');
    setSelectedServices(services || []);
    setFields({ ...EMPTY_FIELDS, ...savedFields });
    if (savedCity && Object.values(savedFields).some(value => value?.trim())) {
      setLocationStatus('valid');
      setStep('details');
      setIsExpanded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Only the details step is worth restoring; the city alone is quick to retype.
    if (step === 'details') draft.save({ ...fields, city, services: selectedServices });
  }, [draft, step, fields, city, selectedServices]);

  const updateField = (field: keyof ContactFields, value: string) => {
    setFields(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

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
    if (validationErrors.services) {
      setValidationErrors(prev => ({ ...prev, services: '' }));
    }
  };

  // Handle form submission
  const submitQuoteRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};

    if (!fields.name.trim()) errors.name = 'Name is required';
    if (!fields.email.trim()) errors.email = 'Email is required';
    if (!fields.phone.trim()) errors.phone = 'Phone is required';
    if (selectedServices.length === 0) errors.services = 'Please select at least one service';
    if (!fields.message.trim()) errors.message = 'Please describe your project';
    else if (fields.message.trim().length < 10) errors.message = 'Please provide more detail (at least 10 characters)';
    if (!turnstileToken) errors.turnstile = 'Please complete the security verification';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setFailure(null);
    setIsSubmitting(true);

    const serviceLabels = selectedServices.map(id => SERVICE_OPTIONS.find(s => s.id === id)?.label || id);

    try {
      const formData = new FormData();
      formData.append('name', fields.name);
      formData.append('email', fields.email);
      formData.append('phone', fields.phone);
      formData.append('address', city);
      formData.append('message', fields.message);
      formData.append('contactMethod', 'email');
      formData.append('source', 'city-page-widget');
      formData.append('formType', 'quote-request');
      formData.append('turnstile-token', turnstileToken);
      serviceLabels.forEach(label => formData.append('services', label));

      const result = await submitContactForm(formData, reference);

      if (result.ok) {
        setSuccessReference(result.reference);
        setReference(newSubmissionReference());
        draft.clear();
        setStep('success');
      } else {
        setFailure({
          kind: result.kind,
          message: result.message,
          summary: buildMessageSummary({
            Name: fields.name,
            Phone: fields.phone,
            Email: fields.email,
            City: city,
            Services: serviceLabels,
          }, fields.message),
        });
      }
    } finally {
      // Tokens are single-use — get a fresh one so the next Send works without a reload.
      setTurnstileToken('');
      turnstileRef.current?.reset();
      setIsSubmitting(false);
    }
  };

  // Reset the form
  const resetForm = () => {
    setCity('');
    setLocationStatus('idle');
    setLocationMessage('');
    setSelectedServices([]);
    setValidationErrors({});
    setTurnstileToken('');
    setFailure(null);
    setFields(EMPTY_FIELDS);
    setStep('location');
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
                <div className="space-y-1">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={fields.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className={validationErrors.name ? 'border-red-500' : ''}
                  />
                  {validationErrors.name && <p className="text-xs text-red-600">{validationErrors.name}</p>}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={fields.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className={validationErrors.phone ? 'border-red-500' : ''}
                  />
                  {validationErrors.phone && <p className="text-xs text-red-600">{validationErrors.phone}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={validationErrors.email ? 'border-red-500' : ''}
                />
                {validationErrors.email && <p className="text-xs text-red-600">{validationErrors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-base">Services Needed *</Label>
                <div className={`grid grid-cols-1 gap-2 sm:grid-cols-2 ${validationErrors.services ? 'border border-red-500 rounded p-2' : ''}`}>
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
                {validationErrors.services && <p className="text-xs text-red-600">{validationErrors.services}</p>}
              </div>

              <div className="space-y-1">
                <Label htmlFor="message">Project Details *</Label>
                <Textarea
                  id="message"
                  value={fields.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder="Tell us more about your project..."
                  className={`min-h-[100px] ${validationErrors.message ? 'border-red-500' : ''}`}
                />
                {validationErrors.message && <p className="text-xs text-red-600">{validationErrors.message}</p>}
              </div>

              <CloudflareTurnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAACLMknOrovBOqBYa'}
                onVerify={(token) => {
                  setTurnstileToken(token);
                  setValidationErrors(prev => ({ ...prev, turnstile: '' }));
                }}
                onError={() => setTurnstileToken('')}
                onExpire={() => setTurnstileToken('')}
                size="normal"
              />
              {validationErrors.turnstile && <p className="text-xs text-red-600">{validationErrors.turnstile}</p>}

              {failure && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <div className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-gray-800">{failure.message}</p>
                  </div>
                  {failure.kind !== 'verification' && (
                    <FormFailureHelp summary={failure.summary} subject={`Quote request from the website${city ? ` (${city})` : ''}`} />
                  )}
                </div>
              )}

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep('location')}>
                  Back
                </Button>
                <Button type="submit" disabled={isSubmitting}>
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
              {successReference && (
                <p className="text-sm text-gray-500">Reference: {successReference}</p>
              )}
              <Button onClick={resetForm}>Submit Another Request</Button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
