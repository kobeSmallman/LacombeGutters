import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import twilio, { Twilio } from 'twilio';

export const runtime = 'nodejs';

// Initialize services
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// Initialize Twilio client
let twilioClient: Twilio | null = null;
if (process.env.TWILIO_SID && process.env.TWILIO_AUTH_TOKEN) {
  try {
    // Check if TWILIO_SID is an API Key (starts with SK) or Account SID (starts with AC)
    if (process.env.TWILIO_SID.startsWith('SK')) {
      // Using API Key - need to provide Account SID separately
      if (process.env.TWILIO_ACCOUNT_SID) {
        twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN, {
          accountSid: process.env.TWILIO_ACCOUNT_SID
        });
      } else {
        console.error('TWILIO_SID appears to be an API Key but TWILIO_ACCOUNT_SID is missing');
      }
    } else {
      // Using Account SID directly
      twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
    }
  } catch (error) {
    console.error('Failed to initialize Twilio client:', error);
    twilioClient = null;
  }
}

// Rate limiting storage (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 requests per minute per IP
};

interface ContactRequest {
  // Basic fields
  name: string;
  email?: string;
  phone?: string;
  city?: string;
  address?: string;
  message?: string;
  description?: string;
  
  // Service-specific fields
  services?: string[];
  contactMethod?: 'email' | 'sms';
  
  // Job application specific fields
  position?: string;
  experience?: string;
  
  // Source tracking
  source?: string; // 'contact-form', 'quote-widget', 'job-application', etc.
  formType?: string;
  
  // Files (for contact form)
  attachments?: {
    filename: string;
    content: Buffer;
    contentType: string;
  }[];
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT.maxRequests) {
    return false;
  }

  userLimit.count++;
  return true;
}

function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');
  const connecting = request.headers.get('x-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (real) {
    return real.trim();
  }
  if (connecting) {
    return connecting.trim();
  }
  
  return 'unknown';
}

async function sendEmail(data: ContactRequest): Promise<void> {
  // Determine the recipient email based on environment
  const toEmail = process.env.PROD_EMAIL_TO;
  const fromEmail = process.env.MAIL_FROM;
  
  if (!toEmail || !fromEmail) {
    console.error('Email configuration missing:', { toEmail: !!toEmail, fromEmail: !!fromEmail });
    throw new Error('Email configuration missing');
  }

  const servicesList = data.services?.length ? data.services.join(', ') : 'None specified';
  const formTypeLabel = data.source === 'quote-widget' ? 'Quote Request' : 
                        data.source === 'job-application' ? 'Job Application' : 'Contact Inquiry';

  const messageContent = data.message || data.description;
  const emailSubject = `${formTypeLabel} - ${data.name}`;
  
  const emailBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f7f9;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div style="border-bottom: 3px solid #215e7d; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #215e7d; margin: 0; font-size: 24px;">${formTypeLabel}</h1>
          <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">lacombeguttersltd.com</p>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h2 style="color: #215e7d; font-size: 18px; margin-bottom: 15px;">${data.source === 'job-application' ? 'Applicant Information' : 'Customer Information'}</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #333; width: 120px;">Name:</td><td style="padding: 8px 0; color: #666;">${data.name}</td></tr>
            ${data.email ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td><td style="padding: 8px 0; color: #666;">${data.email}</td></tr>` : ''}
            ${data.phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Phone:</td><td style="padding: 8px 0; color: #666;">${data.phone}</td></tr>` : ''}
            ${data.address ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Address:</td><td style="padding: 8px 0; color: #666;">${data.address}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Preferred Contact:</td><td style="padding: 8px 0; color: #666;">${data.contactMethod === 'sms' ? 'SMS/Text Message' : 'Email'}</td></tr>
          </table>
        </div>
        
        ${data.source === 'job-application' && data.position ? `
        <div style="margin-bottom: 25px;">
          <h2 style="color: #215e7d; font-size: 18px; margin-bottom: 15px;">Position Applied For</h2>
          <p style="color: #666; margin: 0; padding: 12px; background-color: #f8f9fa; border-radius: 4px;">${data.position}</p>
        </div>
        ` : ''}
        
        ${data.source === 'job-application' && data.experience ? `
        <div style="margin-bottom: 25px;">
          <h2 style="color: #215e7d; font-size: 18px; margin-bottom: 15px;">Additional Experience & Skills</h2>
          <div style="color: #666; padding: 15px; background-color: #f8f9fa; border-radius: 4px; border-left: 4px solid #215e7d;">
            ${data.experience.replace(/\n/g, '<br>')}
          </div>
        </div>
        ` : ''}
        
        ${data.services?.length ? `
        <div style="margin-bottom: 25px;">
          <h2 style="color: #215e7d; font-size: 18px; margin-bottom: 15px;">Services Requested</h2>
          <p style="color: #666; margin: 0; padding: 12px; background-color: #f8f9fa; border-radius: 4px;">${servicesList}</p>
        </div>
        ` : ''}
        
        ${messageContent ? `
        <div style="margin-bottom: 25px;">
          <h2 style="color: #215e7d; font-size: 18px; margin-bottom: 15px;">Message</h2>
          <div style="color: #666; padding: 15px; background-color: #f8f9fa; border-radius: 4px; border-left: 4px solid #215e7d;">
            ${messageContent.replace(/\n/g, '<br>')}
          </div>
        </div>
        ` : ''}
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">Please respond to the customer via their preferred contact method above.</p>
        </div>
      </div>
    </div>
  `;

  // Prepare attachments for email
  console.log('Preparing email attachments:', data.attachments?.length || 0, 'files');
  
  const attachments = data.attachments?.map(attachment => {
    console.log(`Preparing email attachment: ${attachment.filename}, type: ${attachment.contentType}, size: ${attachment.content.length}`);
    return {
      filename: attachment.filename,
      content: attachment.content.toString('base64'),
      type: attachment.contentType,
      disposition: 'attachment'
    };
  }) || [];
  
  console.log('Email attachments prepared:', attachments.length, 'files');

  const msg = {
    to: toEmail,
    from: fromEmail,
    subject: emailSubject,
    html: emailBody,
    attachments: attachments
  };

  try {
    await sgMail.send(msg);
    console.log('Business notification email sent successfully to:', toEmail);
  } catch (error) {
    console.error('Failed to send business notification email:', error);
    throw error;
  }
}

async function sendSMS(data: ContactRequest) {
  // Skip SMS sending if Twilio client is disabled
  if (!twilioClient) {
    console.log('SMS sending skipped - Twilio client not configured');
    console.log('Twilio environment check:', {
      hasSID: !!process.env.TWILIO_SID,
      hasAuthToken: !!process.env.TWILIO_AUTH_TOKEN,
      hasFromNumber: !!process.env.TWILIO_FROM
    });
    return;
  }

  // Determine the recipient phone number based on environment
  const toPhone = process.env.PROD_SMS_TO;
  const fromPhone = process.env.TWILIO_FROM;
  
  if (!toPhone || !fromPhone) {
    console.error('SMS configuration missing:', { toPhone: !!toPhone, fromPhone: !!fromPhone });
    throw new Error('SMS configuration missing');
  }

  const servicesList = data.services?.length ? data.services.join(', ') : 'None specified';
  const formTypeLabel = data.source === 'quote-widget' ? 'Quote Request' : 
                        data.source === 'job-application' ? 'Job Application' : 'Contact Inquiry';

  const messageContent = data.message || data.description;
  const message = `${formTypeLabel} - Lacombe Gutters

👤 ${data.name}
${data.email ? `📧 ${data.email}\n` : ''}${data.phone ? `📱 ${data.phone}\n` : ''}${data.address ? `📍 ${data.address}\n` : ''}🔧 Services: ${servicesList}
${messageContent ? `\n💬 "${messageContent.substring(0, 150)}${messageContent.length > 150 ? '...' : ''}"` : ''}

✅ Preferred contact: ${data.contactMethod === 'sms' ? 'SMS/Text' : 'Email'}

⚠️ Note: Images cannot be sent via SMS - check email for attachments if any.`;

  try {
    await twilioClient.messages.create({
      body: message,
      from: fromPhone,
      to: toPhone,
    });
    console.log('SMS sent successfully to:', toPhone);
  } catch (error) {
    console.error('Failed to send SMS:', error);
    throw error;
  }
}

async function sendClientConfirmation(data: ContactRequest): Promise<void> {
  console.log('🔄 sendClientConfirmation called with:', {
    contactMethod: data.contactMethod,
    hasEmail: !!data.email,
    hasPhone: !!data.phone
  });
  
  // Send confirmation via the customer's preferred method
  if (data.contactMethod === 'sms') {
    console.log('📱 Sending SMS confirmation...');
    await sendClientSMSConfirmation(data);
  } else {
    console.log('📧 Sending email confirmation...');
    await sendClientEmailConfirmation(data);
  }
  
  console.log('✅ Client confirmation completed');
}

async function sendClientEmailConfirmation(data: ContactRequest): Promise<void> {
  if (!data.email) {
    console.log('Skipping client email confirmation - no email provided');
    return;
  }
  
  console.log('🔍 CLIENT EMAIL DEBUG - Starting confirmation email to:', data.email);

  const fromEmail = process.env.MAIL_FROM || 'noreply@lacombeguttersltd.com';
  const servicesList = data.services?.length ? data.services.join(', ') : 'None specified';
  const contactMethod = data.contactMethod === 'sms' ? 'SMS' : 'email';
  const isJobApplication = data.source === 'job-application';

  // Job Application specific content
  if (isJobApplication) {
    const confirmationContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; background-color: #ffffff;">
        <!-- Header -->
        <div style="padding: 0 0 20px 0; border-bottom: 1px solid #ddd;">
          <h2 style="color: #000000; margin: 0;">
            Application Received - Lacombe Gutters Ltd
          </h2>
        </div>
        
        <!-- Content -->
        <div style="padding: 20px;">
          <h3 style="color: #000000; margin-top: 0;">Hi ${data.name},</h3>
          <p>Thank you for your interest in joining our team! We have received your job application and will respond ASAP, usually within 24 hours via <strong>${contactMethod}</strong>.</p>
          
          <h4 style="color: #000000;">Your Application Summary:</h4>
          <p><strong>Position:</strong> ${data.position || 'Not specified'}</p>
          <p><strong>Preferred Contact Method:</strong> ${contactMethod === 'SMS' ? data.phone : data.email}</p>
          
          ${data.experience ? `
            <h4 style="color: #215e7d;">Additional Experience & Skills:</h4>
            <div style="background-color: #f8f9fa; padding: 15px; border: 1px solid #e9ecef; border-radius: 4px;">
              ${data.experience.replace(/\n/g, '<br>')}
            </div>
          ` : ''}
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-left: 4px solid #215e7d;">
            <h4 style="color: #215e7d; margin-top: 0;">Why Work with Lacombe Gutters?</h4>
            <ul style="margin: 0; padding-left: 20px;">
              <li>40+ years of combined expertise</li>
              <li>Professional work environment</li>
              <li>Competitive compensation</li>
              <li>Growth opportunities</li>
            </ul>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 4px; font-size: 12px; color: #6c757d; text-align: center;">
          <p style="margin: 0;"><strong>Lacombe Gutters Ltd</strong></p>
          <p style="margin: 5px 0 0 0;">Professional Eavestrough Services | lacombeguttersltd.com</p>
        </div>
      </div>
    `;
    
    try {
      await sgMail.send({
        to: data.email,
        from: fromEmail,
        subject: 'Application Received - Lacombe Gutters Ltd',
        html: confirmationContent,
      });
      
      console.log('Job application confirmation email sent successfully');
    } catch (error) {
      console.error('Failed to send job application confirmation email:', error);
      throw error;
    }
    return;
  }

  // Regular contact/quote confirmation content
  const confirmationContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; background-color: #ffffff;">
      <!-- Header -->
      <div style="padding: 0 0 20px 0; border-bottom: 1px solid #ddd;">
        <h2 style="color: #000000; margin: 0;">
          Thank You - Lacombe Gutters Ltd
        </h2>
      </div>
      
      <!-- Content -->
      <div style="padding: 20px;">
        <h3 style="color: #000000; margin-top: 0;">Hi ${data.name},</h3>
        <p>Thank you for your interest in our services! We have received your request and will respond ASAP, usually within 24 hours via <strong>${contactMethod}</strong>.</p>
        
        <h4 style="color: #000000;">Your Request Summary:</h4>
        <p><strong>Services:</strong> ${servicesList}</p>
        ${data.address ? `<p><strong>Property Address:</strong> ${data.address}</p>` : ''}
        <p><strong>Preferred Contact Method:</strong> ${contactMethod === 'SMS' ? data.phone : data.email}</p>
        
        ${data.message ? `
          <h4 style="color: #215e7d;">Your Message:</h4>
          <div style="background-color: #f8f9fa; padding: 15px; border: 1px solid #e9ecef; border-radius: 4px;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
        ` : ''}
        
        <div style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-left: 4px solid #215e7d;">
          <h4 style="color: #215e7d; margin-top: 0;">Why Choose Lacombe Gutters?</h4>
          <ul style="margin: 0; padding-left: 20px;">
            <li>40+ years of combined expertise</li>
            <li>Professional installation & maintenance</li>
            <li>Free estimates & competitive pricing</li>
            <li>Fully licensed & insured</li>
          </ul>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 4px; font-size: 12px; color: #6c757d; text-align: center;">
        <p style="margin: 0;"><strong>Lacombe Gutters Ltd</strong></p>
        <p style="margin: 5px 0 0 0;">Professional Eavestrough Services | lacombeguttersltd.com</p>
      </div>
    </div>
  `;

  try {
    await sgMail.send({
      to: data.email,
      from: fromEmail,
      subject: 'Thank You - Lacombe Gutters Ltd',
      html: confirmationContent,
    });
    
    console.log('Client confirmation email sent successfully');
  } catch (error) {
    console.error('Failed to send client confirmation email:', error);
    throw error;
  }
}

async function sendClientSMSConfirmation(data: ContactRequest): Promise<void> {
  if (!data.phone || !twilioClient) {
    console.log('Skipping client SMS confirmation - no phone or Twilio not configured');
    return;
  }

  const fromPhone = process.env.TWILIO_FROM;
  
  if (!fromPhone) {
    console.error('TWILIO_FROM not configured');
    return;
  }

  const isJobApplication = data.source === 'job-application';
  
  let confirmationMessage: string;
  
  if (isJobApplication) {
    confirmationMessage = `Hi ${data.name}, thank you for your job application with Lacombe Gutters! We received your application for ${data.position || 'the position'}. We'll respond ASAP, usually within 24 hours via your preferred method. This is an automated message - please do not reply to this number. - Lacombe Gutters Ltd`;
  } else {
    const servicesList = data.services?.length ? data.services.join(', ') : 'your inquiry';
    confirmationMessage = `Hi ${data.name}, thank you for contacting Lacombe Gutters! We received your request for ${servicesList}. We'll respond ASAP, usually within 24 hours via your preferred method. This is an automated message - please do not reply to this number. - Lacombe Gutters Ltd`;
  }

  try {
    await twilioClient.messages.create({
      body: confirmationMessage,
      from: fromPhone,
      to: data.phone,
    });
    console.log('Client SMS confirmation sent successfully');
  } catch (error) {
    console.error('Failed to send client SMS confirmation:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    // Check rate limiting
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request data
    let data: ContactRequest;
    const contentType = request.headers.get('content-type') || '';
    
    try {
      if (contentType.includes('application/json')) {
        data = await request.json();
      } else {
        // Handle FormData (for file uploads)
        const formData = await request.formData();
        
        // Extract basic fields
        data = {
          name: formData.get('name') as string || '',
          email: formData.get('email') as string || '',
          phone: formData.get('phone') as string || '',
          address: formData.get('address') as string || '',
          message: formData.get('message') as string || '',
          contactMethod: (formData.get('contactMethod') as 'email' | 'sms') || 'email',
          source: formData.get('source') as string || 'contact-form',
          formType: formData.get('formType') as string || 'contact',
          services: formData.getAll('services') as string[]
        };
        
        // Handle file attachments
        const attachmentFiles = formData.getAll('attachments') as File[];
        console.log('Processing attachments:', attachmentFiles.length, 'files');
        
        if (attachmentFiles.length > 0 && attachmentFiles[0].size > 0) {
          console.log('Attachment details:', attachmentFiles.map(f => ({ name: f.name, type: f.type, size: f.size })));
          
          data.attachments = await Promise.all(
            attachmentFiles.map(async (file) => {
              console.log(`Processing file: ${file.name}, type: ${file.type}, size: ${file.size}`);
              try {
                const buffer = Buffer.from(await file.arrayBuffer());
                console.log(`Successfully processed ${file.name}, buffer size: ${buffer.length}`);
                return {
                  filename: file.name,
                  content: buffer,
                  contentType: file.type
                };
              } catch (error) {
                console.error(`Error processing file ${file.name}:`, error);
                throw error;
              }
            })
          );
          
          console.log('All attachments processed successfully');
        }
      }
    } catch (parseError) {
      console.error('Error parsing request data:', parseError);
      return NextResponse.json(
        { success: false, message: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!data.name?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Name is required.' },
        { status: 400 }
      );
    }

    if (data.contactMethod === 'email' && !data.email?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Email is required when email contact method is selected.' },
        { status: 400 }
      );
    }

    if (data.contactMethod === 'sms' && !data.phone?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Phone number is required when SMS contact method is selected.' },
        { status: 400 }
      );
    }

    // Send notifications based on contact method and configuration
    console.log('Starting notification sending process...');
    console.log('Contact data:', { name: data.name, email: data.email, phone: data.phone, contactMethod: data.contactMethod, source: data.source, attachments: data.attachments?.length || 0 });
    
    const promises: Promise<void>[] = [];

    // Always send email notification to business (if configured)
    if (process.env.SENDGRID_API_KEY) {
      console.log('Adding business email to promises...');
      promises.push(sendEmail(data));
    } else {
      console.log('Skipping business email - SENDGRID_API_KEY not configured');
    }

    // Send SMS to business if SMS contact method is selected and Twilio is configured
    if (data.contactMethod === 'sms' && twilioClient) {
      console.log('Adding business SMS to promises...');
      promises.push(sendSMS(data));
    } else {
      console.log('Skipping business SMS - either not SMS contact method or Twilio not configured');
    }

    // Send confirmation to client
    console.log('Adding client confirmation to promises...');
    console.log('Client confirmation data:', {
      email: data.email,
      phone: data.phone,
      contactMethod: data.contactMethod,
      source: data.source
    });
    promises.push(sendClientConfirmation(data));

    // Send notifications
    console.log('Sending all notifications...');
    const results = await Promise.allSettled(promises);
    
    // Log detailed results
    results.forEach((result, index) => {
      const notificationType = index === 0 ? 'business email' : 
                             index === 1 ? 'business SMS' : 'client confirmation';
      if (result.status === 'rejected') {
        console.error(`❌ Failed to send ${notificationType}:`, result.reason);
      } else {
        console.log(`✅ Successfully sent ${notificationType}`);
      }
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you! Your request has been submitted. We\'ll contact you soon via your preferred method.' 
      },
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
