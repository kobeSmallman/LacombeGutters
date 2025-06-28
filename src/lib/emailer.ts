import { Resend } from 'resend';

/**
 * Wrapper for email functionality using Resend
 */
export class EmailService {
  private resend: Resend;
  private readonly from: string;
  private readonly testMode: boolean;
  
  constructor() {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is required');
    }
    
    this.resend = new Resend(process.env.RESEND_API_KEY);
    this.from = process.env.MAIL_FROM || 'kobe4smallman@gmail.com';
    this.testMode = process.env.NODE_ENV !== 'production';
  }
  
  /**
   * Send an email using Resend
   */
  async sendEmail({
    to,
    subject,
    html,
    replyTo,
    attachments = []
  }: {
    to: string | string[];
    subject: string;
    html: string;
    replyTo?: string;
    attachments?: Array<{ filename: string; content: Buffer }>;
  }) {
    // In test mode, always send to the test email
    const recipient = this.testMode 
      ? process.env.PROD_EMAIL_TO || to
      : process.env.PROD_EMAIL_TO || to;
    
    try {
      const result = await this.resend.emails.send({
        from: this.from,
        to: recipient,
        subject,
        html,
        reply_to: replyTo,
        attachments: attachments.map(att => ({
          filename: att.filename,
          content: att.content.toString('base64')
        }))
      });
      
      return {
        success: true,
        messageId: result.data?.id || 'unknown',
        error: null
      };
    } catch (error) {
      console.error('Email sending error:', error);
      return {
        success: false,
        messageId: null,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
  
  /**
   * Send a quote request email
   */
  async sendQuoteRequest({
    customerName,
    customerEmail,
    customerPhone,
    city,
    serviceTypes,
    message,
    attachments = []
  }: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    city: string;
    serviceTypes: string[];
    message: string;
    attachments?: Array<{ filename: string; content: Buffer }>;
  }) {
    const subject = `New Quote Request from ${customerName} - ${city}`;
    
    // Create construction-themed HTML content (matching existing styles)
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #215e7d; max-width: 600px;">
        <div style="background-color: #215e7d; padding: 15px; margin-bottom: 20px; position: relative;">
          <h2 style="color: white; margin: 0;">New Quote Request from LacombeGutters.com</h2>
          <!-- Construction themed elements - screws in corners -->
          <div style="position: absolute; top: 5px; left: 5px; height: 6px; width: 6px; background-color: #888; border-radius: 50%;"></div>
          <div style="position: absolute; top: 5px; right: 5px; height: 6px; width: 6px; background-color: #888; border-radius: 50%;"></div>
        </div>
        <div style="background-color: #f6f6f6; padding: 20px; border-left: 4px solid #fbbe24;">
          <p><strong>Customer:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>Phone:</strong> ${customerPhone}</p>
          <p><strong>Location:</strong> ${city}</p>
          <p><strong>Services Requested:</strong> ${serviceTypes.join(', ')}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
        <div style="margin-top: 20px; color: #666; font-size: 12px;">
          <p>This request was submitted through the quote form on LacombeGutters.com</p>
        </div>
      </div>
    `;
    
    return this.sendEmail({
      to: this.testMode 
        ? process.env.PROD_EMAIL_TO || 'lacombegutters@gmail.com'
        : process.env.PROD_EMAIL_TO || 'alyssasinclair127@hotmail.ca',
      subject,
      html,
      replyTo: customerEmail,
      attachments
    });
  }
}

// Export a singleton instance
export const emailService = new EmailService();
