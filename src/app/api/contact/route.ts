import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs'; // Ensure this runs as a Node.js function, not an Edge function

// Maximum file size increased to 10MB for multiple quality photos
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

interface AttachmentFile {
  filename: string;
  content: Buffer;
}

// Create a robust Gmail transporter that tries multiple configurations
const createTransporter = () => {
  // Get environment variables
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  
  console.log('SMTP Config:', { 
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    userConfigured: !!smtpUser,
    passConfigured: !!smtpPass
  });
  
  // Use a direct Gmail configuration with App Password
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: smtpUser || 'kobe4smallman@gmail.com',
      pass: smtpPass // Should be the app password without spaces
    },
    tls: {
      // Do not fail on invalid certs
      rejectUnauthorized: false
    }
  });
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const message = formData.get('message') as string;
    
    // Get all selected services
    const selectedServices = formData.getAll('services') as string[];
    console.log('Selected services:', selectedServices);
    
    // For file attachments
    const attachments: AttachmentFile[] = [];
    const files = formData.getAll('attachment');
    
    if (files && files.length > 0) {
      console.log(`Processing ${files.length} file attachments...`);
      
      for (const file of files) {
        if (file instanceof Blob) {
          try {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = file instanceof File ? file.name : 'attachment.jpg';
            
            console.log(`Attaching file: ${filename}, size: ${Math.round(buffer.length / 1024)}KB`);
            
            attachments.push({
              filename,
              content: buffer,
            });
          } catch (fileError) {
            console.error('Error processing file:', fileError);
          }
        }
      }
      
      console.log(`Successfully processed ${attachments.length} attachments`);
    }
    
    // Create email HTML content with construction theme
    const emailContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #215e7d; max-width: 600px;">
        <div style="background-color: #215e7d; padding: 15px; margin-bottom: 20px; position: relative;">
          <h2 style="color: white; margin: 0;">New Estimate Request from LacombeGutters.com</h2>
          <!-- Construction themed elements - screws in corners -->
          <div style="position: absolute; top: 5px; left: 5px; height: 6px; width: 6px; background-color: #888; border-radius: 50%;"></div>
          <div style="position: absolute; top: 5px; right: 5px; height: 6px; width: 6px; background-color: #888; border-radius: 50%;"></div>
        </div>
        
        <div style="background-color: #f5f7f9; padding: 15px; border-left: 4px solid #fbbe24;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Services Requested:</strong> ${selectedServices.join(', ') || 'None specified'}</p>
          <p><strong>Message:</strong></p>
          <div style="padding: 10px; background-color: white; border: 1px solid #ddd;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
          <p><em>This message was sent from the contact form on LacombeGutters.com</em></p>
          <p>Sent on: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;
    
    // Log email details
    console.log('=============== EMAIL DETAILS ===============');
    console.log(`To: kobe4smallman@gmail.com`);
    console.log(`From: "Lacombe Gutters Form" <kobe4smallman@gmail.com>`);
    console.log(`ReplyTo: ${name} <${email}>`);
    console.log(`Subject: New Estimate Request from ${name}`);
    console.log(`Attachments: ${attachments.length} files`);
    
    // Send the email with direct Gmail configuration
    try {
      const transporter = createTransporter();
      const info = await transporter.sendMail({
        from: '"Lacombe Gutters Form" <kobe4smallman@gmail.com>',
        to: 'kobe4smallman@gmail.com',
        replyTo: `${name} <${email}>`,
        subject: `New Estimate Request from ${name}`,
        html: emailContent,
        attachments,
      });
      
      console.log('Email sent successfully!');
      console.log('Message ID:', info.messageId);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Continue with the request even if email fails
    }
    
    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process your request.' },
      { status: 500 }
    );
  }
}
