import { NextResponse } from 'next/server';
import { sendEmail, sendSMS, sendClientConfirmation, twilioClient, ContactRequest } from '@/lib/contactNotifications';

export const runtime = 'nodejs';

function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');
  const connecting = request.headers.get('x-connecting-ip');

  if (forwarded) return forwarded.split(',')[0].trim();
  if (real) return real.trim();
  if (connecting) return connecting.trim();
  return 'unknown';
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData().catch(() => null);
    if (!formData) {
      return NextResponse.json(
        { success: false, message: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Honeypot check
    const honeypot = formData.get('company_website') as string;
    if (honeypot && honeypot.trim() !== '') {
      console.warn('Honeypot field filled, likely spam submission');
      return NextResponse.json(
        { success: false, message: 'Invalid submission detected.' },
        { status: 400 }
      );
    }

    // Turnstile verification
    const turnstileToken = formData.get('turnstile-token') as string;
    if (turnstileToken && process.env.TURNSTILE_SECRET_KEY) {
      try {
        const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: turnstileToken,
            remoteip: getClientIP(request),
          }),
        });
        const turnstileResult = await turnstileResponse.json();
        if (!turnstileResult.success) {
          console.warn('Turnstile verification failed:', turnstileResult['error-codes']);
          return NextResponse.json(
            { success: false, message: 'Security verification failed. Please try again.' },
            { status: 400 }
          );
        }
        console.log('Turnstile verification successful');
      } catch (error) {
        console.error('Error verifying Turnstile token:', error);
        return NextResponse.json(
          { success: false, message: 'Security verification error. Please try again.' },
          { status: 500 }
        );
      }
    } else if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { success: false, message: 'Security verification is required.' },
        { status: 400 }
      );
    }

    // Parse fields
    const data: ContactRequest = {
      name: formData.get('name') as string || '',
      email: formData.get('email') as string || '',
      phone: formData.get('phone') as string || '',
      address: formData.get('address') as string || '',
      message: formData.get('message') as string || '',
      position: formData.get('position') as string || undefined,
      experience: formData.get('experience') as string || undefined,
      contactMethod: (formData.get('contactMethod') as 'email' | 'sms') || 'email',
      source: formData.get('source') as string || 'contact-form',
      formType: formData.get('formType') as string || 'contact',
      services: formData.getAll('services') as string[],
    };

    // Handle file attachments
    const attachmentFiles = formData.getAll('attachments') as File[];
    if (attachmentFiles.length > 0 && attachmentFiles[0].size > 0) {
      data.attachments = await Promise.all(
        attachmentFiles.map(async (file) => ({
          filename: file.name,
          content: Buffer.from(await file.arrayBuffer()),
          contentType: file.type,
        }))
      );
    }

    // Validation
    const errors: string[] = [];

    if (!data.name?.trim()) {
      errors.push('Name is required.');
    } else if (data.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long.');
    } else if (data.name.trim().length > 100) {
      errors.push('Name must not exceed 100 characters.');
    }

    if (data.contactMethod === 'email') {
      if (!data.email?.trim()) {
        errors.push('Email is required when email contact method is selected.');
      } else {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(data.email.trim())) {
          errors.push('Please provide a valid email address.');
        } else if (data.email.trim().length > 254) {
          errors.push('Email address is too long.');
        }
      }
    }

    if (data.contactMethod === 'sms') {
      if (!data.phone?.trim()) {
        errors.push('Phone number is required when SMS contact method is selected.');
      } else {
        const phoneDigits = data.phone.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
          errors.push('Please provide a valid phone number with at least 10 digits.');
        }
      }
    }

    if (data.source !== 'job-application') {
      if (!data.message?.trim()) {
        errors.push('Message is required.');
      } else if (data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long.');
      } else if (data.message.trim().length > 2000) {
        errors.push('Message must not exceed 2000 characters.');
      }
    }

    const suspiciousPatterns = [
      /https?:\/\/[^\s]+/g,
      /\b(?:viagra|cialis|loan|casino|poker|sex|xxx)\b/i,
      /[A-Z]{10,}/,
      /(.)\1{5,}/,
    ];

    if (data.message?.trim()) {
      for (const pattern of suspiciousPatterns) {
        if (pattern.test(data.message.trim())) {
          console.warn('Suspicious content detected in message');
          errors.push('Message contains invalid content.');
          break;
        }
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: errors.join(' ') },
        { status: 400 }
      );
    }

    // Send business email — fail the request if this fails
    await sendEmail(data);

    // Send SMS and client confirmation — non-critical, log failures only
    const secondary: Promise<void>[] = [];
    if (data.contactMethod === 'sms' && twilioClient) {
      secondary.push(sendSMS(data));
    }
    secondary.push(sendClientConfirmation(data));

    const results = await Promise.allSettled(secondary);
    results.forEach((result, i) => {
      if (result.status === 'rejected') {
        console.error(`❌ Secondary notification ${i} failed:`, result.reason);
      }
    });

    return NextResponse.json(
      { success: true, message: "Thank you! Your request has been submitted. We'll contact you soon via your preferred method." },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, message: 'Sorry, there was an error processing your request. Please try calling us directly.' },
      { status: 500 }
    );
  }
}
