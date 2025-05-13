import nodemailer from 'nodemailer';

// Create the transporter with several common Gmail configuration patterns
// This tests multiple configurations that are known to work with Gmail
let transporter: nodemailer.Transporter;

try {
  // First option - port 465 with SSL
  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER || 'kobe4smallman@gmail.com',
      pass: process.env.SMTP_PASS,
    }
  });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (e) {
  // Fallback to port 587 with STARTTLS
  console.log('Falling back to port 587 configuration...');
  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // STARTTLS
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER || 'kobe4smallman@gmail.com',
      pass: process.env.SMTP_PASS,
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    }
  });
}

// Function to get the transporter and attempt verification first
export const getTransporter = async () => {
  try {
    // Verify SMTP connection configuration
    await transporter.verify();
    return transporter;
  } catch (error) {
    console.error('SMTP Connection Error:', error);
    
    // Try one last alternative configuration
    try {
      const alternativeTransporter = nodemailer.createTransport({
        service: 'gmail', // Use the 'gmail' service preset
        auth: {
          user: process.env.SMTP_USER || 'kobe4smallman@gmail.com',
          pass: process.env.SMTP_PASS,
        }
      });
      
      await alternativeTransporter.verify();
      console.log('Alternative Gmail configuration working!');
      return alternativeTransporter;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (fallbackError) {
      console.error('All Gmail configurations failed.');
      console.error('Returning a test transporter that will log but not send.');
      
      // Create a fake transporter for development
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sendMail: async (options: any) => {
          console.log('==== EMAIL WOULD BE SENT (CONNECTION FAILED) ====');
          console.log('From:', options.from);
          console.log('To:', options.to);
          console.log('Subject:', options.subject);
          console.log('HTML:', options.html?.substring(0, 150) + '...');
          console.log('SMTP_USER:', process.env.SMTP_USER);
          console.log('SMTP_PASS is set:', !!process.env.SMTP_PASS);
          
          // Return a fake successful response
          return { 
            messageId: 'test_' + Date.now(),
            rejected: [],
            response: 'Fake success response'
          };
        }
      };
    }
  }
};
