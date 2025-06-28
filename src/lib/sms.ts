import twilio from 'twilio';

/**
 * Wrapper for SMS functionality using Twilio
 */
export class SMSService {
  private client: ReturnType<typeof twilio>;
  private readonly from: string;
  private readonly testMode: boolean;
  
  constructor() {
    const accountSid = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_TOKEN;
    
    if (!accountSid || !authToken) {
      throw new Error('TWILIO_SID and TWILIO_TOKEN environment variables are required');
    }
    
    this.client = twilio(accountSid, authToken);
    this.from = process.env.TWILIO_FROM || '';
    this.testMode = process.env.NODE_ENV !== 'production';
  }
  
  /**
   * Send an SMS using Twilio
   */
  async sendSMS({
    to,
    body
  }: {
    to: string;
    body: string;
  }) {
    // In test mode, always send to the test phone number
    const recipient = this.testMode
      ? process.env.PROD_SMS_TO || to
      : process.env.PROD_SMS_TO || to;
    
    try {
      const message = await this.client.messages.create({
        body,
        from: this.from,
        to: recipient
      });
      
      return {
        success: true,
        sid: message.sid,
        error: null
      };
    } catch (error) {
      console.error('SMS sending error:', error);
      return {
        success: false,
        sid: null,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
  
  /**
   * Send a quote notification SMS
   */
  async sendQuoteNotification({
    customerName,
    city,
    serviceTypes
  }: {
    customerName: string;
    city: string;
    serviceTypes: string[];
  }) {
    const body = `New quote request from ${customerName} in ${city} for ${serviceTypes.join(', ')}. Check your email for details.`;
    
    return this.sendSMS({
      to: this.testMode
        ? process.env.PROD_SMS_TO || ''
        : process.env.PROD_SMS_TO || '',
      body
    });
  }
}

// Export a singleton instance
export const smsService = new SMSService();
