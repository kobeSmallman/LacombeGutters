// Basic email test script outside of Next.js
// Run with: node email-test.mjs

import nodemailer from 'nodemailer';

// Start with a message
console.log('==============================================');
console.log('LACOMBE GUTTERS DIRECT EMAIL TEST');
console.log('==============================================');
console.log('Time:', new Date().toLocaleString());
console.log('\n');

// Create a transporter with your exact credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'kobe4smallman@gmail.com',
    pass: 'cesr dihi bmcw gnxr'  // Your new App Password for "Lacombe Gutters"
  }
});

// Basic test email with construction theme
const mailOptions = {
  from: '"Lacombe Gutters Test" <kobe4smallman@gmail.com>',
  to: 'kobe4smallman@gmail.com',
  subject: 'DIRECT SMTP Test - ' + new Date().toLocaleString(),
  text: 'If you see this, your Gmail SMTP is working correctly!',
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #215e7d; max-width: 600px;">
      <div style="background-color: #215e7d; padding: 15px; margin-bottom: 20px;">
        <h2 style="color: white; margin: 0;">Lacombe Gutters Direct Email Test</h2>
      </div>
      
      <div style="background-color: #f5f7f9; padding: 15px; border-left: 4px solid #fbbe24;">
        <p>This is a <strong>direct test</strong> email sent outside of Next.js.</p>
        <p>If you're seeing this, your Gmail credentials are correct! 🎉</p>
      </div>
      
      <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
        <p>This is an automated test message from the direct Node.js script.</p>
        <p>Time sent: ${new Date().toLocaleString()}</p>
      </div>
    </div>
  `
};

// Send the test email
console.log('Attempting to send direct test email...');
console.log('From:', mailOptions.from);
console.log('To:', mailOptions.to);
console.log('Using Gmail SMTP with App Password');

// Send and report results
transporter.sendMail(mailOptions)
  .then(info => {
    console.log('\n✅ EMAIL SENT SUCCESSFULLY!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    console.log('\nCheck your inbox at kobe4smallman@gmail.com');
    console.log('==============================================');
  })
  .catch(error => {
    console.error('\n❌ EMAIL SENDING FAILED!');
    console.error('Error:', error.message);
    
    // Provide specific troubleshooting advice
    if (error.message.includes('Invalid login')) {
      console.error('\nPOSSIBLE SOLUTION:');
      console.error('1. Your Gmail App Password appears to be incorrect');
      console.error('2. Make sure you copied "cesr dihi bmcw gnxr" exactly, with spaces');
      console.error('3. Verify 2-factor authentication is enabled on your Google account');
      console.error('4. Generate a new App Password from Google Account settings');
    } else if (error.message.includes('Timeout')) {
      console.error('\nPOSSIBLE SOLUTION:');
      console.error('1. Check your internet connection');
      console.error('2. Ensure your firewall isn\'t blocking SMTP connections to Gmail');
    } else {
      console.error('\nPOSSIBLE SOLUTIONS:');
      console.error('1. Double-check your Gmail App Password');
      console.error('2. Try generating a new App Password');
      console.error('3. Ensure less secure app access is disabled (it should be)');
      console.error('4. Check if your Gmail account has any security blocks');
    }
    
    console.error('\nFull error details:', error);
    console.error('==============================================');
  });
