import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs'; // Ensure this runs as a Node.js function, not an Edge function

// Create a direct Gmail transporter with hardcoded credentials for testing
const createTestTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kobe4smallman@gmail.com',
      pass: 'cesr dihi bmcw gnxr' // Your existing app password
    }
  });
};

export async function GET() {
  console.log('======== EMAIL TEST WITH INDUSTRIAL THEME ========');
  console.log('Time:', new Date().toLocaleString());
  
  try {
    // Create transporter directly with hardcoded values
    console.log('Creating Gmail transporter with direct credentials...');
    const transporter = createTestTransporter();
    
    console.log('Creating construction-themed test email...');
    const testEmail = {
      from: '"Lacombe Gutters" <kobe4smallman@gmail.com>',
      to: 'kobe4smallman@gmail.com',
      subject: 'Construction-Themed Test - ' + new Date().toLocaleString(),
      text: 'If you see this, email sending is working correctly!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #215e7d; max-width: 600px;">
          <div style="background-color: #215e7d; padding: 15px; margin-bottom: 20px; position: relative;">
            <h2 style="color: white; margin: 0;">Lacombe Gutters Email Test</h2>
            <!-- Construction themed elements - screws in corners -->
            <div style="position: absolute; top: 5px; left: 5px; height: 6px; width: 6px; background-color: #888; border-radius: 50%;"></div>
            <div style="position: absolute; top: 5px; right: 5px; height: 6px; width: 6px; background-color: #888; border-radius: 50%;"></div>
          </div>
          
          <div style="background-color: #f5f7f9; padding: 15px; border-left: 4px solid #fbbe24;">
            <p>This test email includes the construction theme with:</p>
            <ul>
              <li>Metal-like header in steel blue (#215e7d)</li>
              <li>Sun-yellow accent strip (#fbbe24)</li>
              <li>Industrial screw design elements in corners</li>
              <li>Overall construction aesthetic matching the site</li>
            </ul>
            <p>If you're seeing this, your email configuration is working! 🎉</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
            <p>This is an automated test message from the Lacombe Gutters website.</p>
            <p>Time sent: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };
    
    console.log('Sending test email to kobe4smallman@gmail.com...');
    const info = await transporter.sendMail(testEmail);
    
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
    
    return NextResponse.json({ 
      ok: true, 
      message: 'Test email sent successfully! Check your inbox at kobe4smallman@gmail.com',
      details: {
        messageId: info.messageId,
        time: new Date().toLocaleString()
      }
    });
  } catch (error) {
    console.error('======== ERROR SENDING TEST EMAIL ========');
    console.error('Error details:', error);
    
    return NextResponse.json({ 
      ok: false, 
      error: error.message,
      message: 'Failed to send test email. Check server logs for details.',
    }, { 
      status: 500 
    });
  }
}
