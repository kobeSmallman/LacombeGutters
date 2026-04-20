import sgMail from '@sendgrid/mail';
import twilio, { Twilio } from 'twilio';

export interface ContactRequest {
  name: string;
  email?: string;
  phone?: string;
  city?: string;
  address?: string;
  message?: string;
  description?: string;
  services?: string[];
  contactMethod?: 'email' | 'sms';
  position?: string;
  experience?: string;
  source?: string;
  formType?: string;
  attachments?: {
    filename: string;
    content: Buffer;
    contentType: string;
  }[];
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export let twilioClient: Twilio | null = null;
if (process.env.TWILIO_SID && process.env.TWILIO_AUTH_TOKEN) {
  try {
    if (process.env.TWILIO_SID.startsWith('SK')) {
      if (process.env.TWILIO_ACCOUNT_SID) {
        twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN, {
          accountSid: process.env.TWILIO_ACCOUNT_SID
        });
      } else {
        console.error('TWILIO_SID appears to be an API Key but TWILIO_ACCOUNT_SID is missing');
      }
    } else {
      twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
    }
  } catch (error) {
    console.error('Failed to initialize Twilio client:', error);
    twilioClient = null;
  }
}

export async function sendEmail(data: ContactRequest): Promise<void> {
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

  const attachments = data.attachments?.map(attachment => ({
    filename: attachment.filename,
    content: attachment.content.toString('base64'),
    type: attachment.contentType,
    disposition: 'attachment'
  })) || [];

  const msg = {
    to: toEmail,
    from: fromEmail,
    subject: emailSubject,
    html: emailBody,
    attachments,
  };

  try {
    await sgMail.send(msg);
    console.log('Business notification email sent successfully to:', toEmail);
  } catch (error) {
    console.error('Failed to send business notification email:', error);
    throw error;
  }
}

export async function sendSMS(data: ContactRequest): Promise<void> {
  if (!twilioClient) {
    console.log('SMS sending skipped - Twilio client not configured');
    return;
  }

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

export async function sendClientConfirmation(data: ContactRequest): Promise<void> {
  if (data.contactMethod === 'sms') {
    await sendClientSMSConfirmation(data);
  } else {
    await sendClientEmailConfirmation(data);
  }
}

async function sendClientEmailConfirmation(data: ContactRequest): Promise<void> {
  if (!data.email) {
    console.log('Skipping client email confirmation - no email provided');
    return;
  }

  const fromEmail = process.env.MAIL_FROM || 'noreply@lacombeguttersltd.com';
  const servicesList = data.services?.length ? data.services.join(', ') : 'None specified';
  const contactMethod = data.contactMethod === 'sms' ? 'SMS' : 'email';
  const isJobApplication = data.source === 'job-application';

  if (isJobApplication) {
    const confirmationContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; background-color: #ffffff;">
        <div style="padding: 0 0 20px 0; border-bottom: 1px solid #ddd;">
          <h2 style="color: #000000; margin: 0;">
            Application Received - Lacombe Gutters Ltd
          </h2>
        </div>

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

        <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 4px; font-size: 12px; color: #6c757d; text-align: center;">
          <p style="margin: 0;"><strong>Lacombe Gutters Ltd</strong></p>
          <p style="margin: 5px 0 0 0;">Professional Eavestrough Services | lacombeguttersltd.com</p>
        </div>
      </div>
    `;

    await sgMail.send({
      to: data.email,
      from: fromEmail,
      subject: 'Application Received - Lacombe Gutters Ltd',
      html: confirmationContent,
    });
    console.log('Job application confirmation email sent successfully');
    return;
  }

  const confirmationContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; background-color: #ffffff;">
      <div style="padding: 0 0 20px 0; border-bottom: 1px solid #ddd;">
        <h2 style="color: #000000; margin: 0;">
          Thank You - Lacombe Gutters Ltd
        </h2>
      </div>

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

      <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 4px; font-size: 12px; color: #6c757d; text-align: center;">
        <p style="margin: 0;"><strong>Lacombe Gutters Ltd</strong></p>
        <p style="margin: 5px 0 0 0;">Professional Eavestrough Services | lacombeguttersltd.com</p>
      </div>
    </div>
  `;

  await sgMail.send({
    to: data.email,
    from: fromEmail,
    subject: 'Thank You - Lacombe Gutters Ltd',
    html: confirmationContent,
  });
  console.log('Client confirmation email sent successfully');
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
