import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

export const runtime = 'nodejs'; // Ensure this runs as a Node.js function, not an Edge function

// Maximum file size set to 10MB for resumes and supporting documents
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

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('job-name') as string;
    const email = formData.get('job-email') as string;
    const phone = formData.get('job-phone') as string;
    const position = formData.get('position') as string;
    const experience = formData.get('experience') as string;
    
    // For file attachments
    const attachments: AttachmentFile[] = [];
    const files = formData.getAll('resume');
    
    if (files && files.length > 0) {
      // Log number of files being uploaded for debugging
      console.log(`Processing ${files.length} job application documents`);
      
      for (const file of files) {
        if (file instanceof Blob) {
          try {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = file instanceof File ? file.name : 'resume.pdf';
            
            // Log file name and size for debugging
            console.log(`Attaching file: ${filename}, size: ${Math.round(buffer.length / 1024)}KB`);
            
            attachments.push({
              filename,
              content: buffer,
            });
          } catch (fileError) {
            console.error('Error processing file attachment:', fileError);
          }
        }
      }
      
      // Log total number of attachments being sent
      console.log(`Sending job application with ${attachments.length} attachments`);
    }
    
    // Create email HTML content with construction theme
    const emailContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #215e7d; max-width: 600px;">
        <div style="background-color: #215e7d; padding: 15px; margin-bottom: 20px; position: relative;">
          <h2 style="color: white; margin: 0;">New Job Application from LacombeGutters.com</h2>
          <!-- Construction themed elements - screws in corners -->
          <div style="position: absolute; top: 5px; left: 5px; height: 6px; width: 6px; background-color: #888; border-radius: 50%;"></div>
          <div style="position: absolute; top: 5px; right: 5px; height: 6px; width: 6px; background-color: #888; border-radius: 50%;"></div>
        </div>
        
        <div style="background-color: #f5f7f9; padding: 15px; border-left: 4px solid #fbbe24;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Position Applied For:</strong> ${position}</p>
          <p><strong>Experience:</strong></p>
          <div style="padding: 10px; background-color: white; border: 1px solid #ddd;">
            ${experience.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
          <p><em>This message was sent from the job application form on LacombeGutters.com</em></p>
          <p>Sent on: ${new Date().toLocaleString()}</p>
          ${attachments.length ? `<p>Attachments: ${attachments.map(a => a.filename).join(', ')}</p>` : ''}
        </div>
      </div>
    `;
    
    // Log email details
    console.log('=============== JOB APPLICATION EMAIL DETAILS ===============');
    console.log(`To: kobe4smallman@gmail.com`);
    console.log(`From: "Lacombe Gutters Form" <kobe4smallman@gmail.com>`);
    console.log(`ReplyTo: ${name} <${email}>`);
    console.log(`Subject: New Job Application from ${name} - ${position}`);
    console.log(`Attachments: ${attachments.length} files`);
    
    // Send the email using SendGrid
    try {
      const [response] = await sgMail.send({
        from: process.env.MAIL_FROM!,
        to: process.env.PROD_EMAIL_TO!,
        replyTo: `${name} <${email}>`,
        subject: `New Job Application from ${name} - ${position}`,
        html: emailContent,
        attachments: attachments.map(attachment => ({
          filename: attachment.filename,
          content: attachment.content.toString('base64'),
          type: 'application/pdf',
          disposition: 'attachment'
        })),
      });
      
      console.log('Job application email sent successfully!');
      console.log('Status code:', response?.statusCode);
    } catch (emailError) {
      console.error('Error sending job application email:', emailError);
      // Continue with the request even if email fails
    }
    
    return NextResponse.json(
      { success: true, message: 'Your application has been submitted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing job application:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process your application.' },
      { status: 500 }
    );
  }
}
