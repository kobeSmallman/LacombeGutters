// Gmail SMTP Direct Test
// Run with: node gmail-direct-test.mjs <your-app-password>
// Example: node gmail-direct-test.mjs "abcd efgh ijkl mnop"

import nodemailer from 'nodemailer';

// Get app password from command line argument
const appPassword = process.argv[2];

if (!appPassword) {
  console.error('ERROR: App password required');
  console.error('Usage: node gmail-direct-test.mjs "your app password with spaces"');
  process.exit(1);
}

console.log('==============================================');
console.log('LACOMBE GUTTERS GMAIL SMTP TEST');
console.log('==============================================');
console.log('Time:', new Date().toLocaleString());
console.log('Gmail Account: kobe4smallman@gmail.com');
console.log('Testing with provided App Password');
console.log('\n');

// STEP 1: Create a transporter with your Gmail credentials
console.log('STEP 1: Creating SMTP transporter...');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'kobe4smallman@gmail.com',
    pass: appPassword // Using password from command line
  },
  debug: true // Enable debug output
});

// STEP 2: Verify connection
console.log('STEP 2: Verifying SMTP connection...');
transporter.verify()
  .then(success => {
    console.log('✅ Connection verified successfully!');
    
    // STEP 3: Setup email data
    console.log('STEP 3: Preparing test email...');
    const mailOptions = {
      from: '"Lacombe Gutters Test" <kobe4smallman@gmail.com>',
      to: 'kobe4smallman@gmail.com',
      subject: 'GMAIL SMTP Test - ' + new Date().toLocaleString(),
      text: 'If you see this, your Gmail SMTP is working correctly!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #215e7d; max-width: 600px;">
          <div style="background-color: #215e7d; padding: 15px; margin-bottom: 20px;">
            <h2 style="color: white; margin: 0;">Lacombe Gutters Gmail Test</h2>
          </div>
          
          <div style="background-color: #f5f7f9; padding: 15px; border-left: 4px solid #fbbe24;">
            <p>This is a <strong>direct test</strong> of Gmail SMTP settings.</p>
            <p>If you're seeing this, your Gmail credentials are correct! 🎉</p>
            <p>Your app password is working properly.</p>
          </div>
        </div>
      `
    };
    
    // STEP 4: Send email
    console.log('STEP 4: Sending test email...');
    return transporter.sendMail(mailOptions);
  })
  .then(info => {
    console.log('\n✅ EMAIL SENT SUCCESSFULLY!');
    console.log('Message ID:', info.messageId);
    console.log('Full response:', JSON.stringify(info, null, 2));
    console.log('\nCheck your inbox at kobe4smallman@gmail.com');
    console.log('==============================================');
    
    // Add a permanent success instruction
    console.log('\nTO ADD TO YOUR .env.local FILE:');
    console.log('SMTP_PASS=' + appPassword);
    console.log('\nThis is the working app password you just used.');
  })
  .catch(error => {
    console.error('\n❌ ERROR OCCURRED:');
    console.error(`Stage: ${error.stage || 'Unknown'}`);
    console.error(`Message: ${error.message}`);
    
    if (error.code === 'EAUTH') {
      console.error('\n👉 AUTHENTICATION PROBLEM:');
      console.error('1. Verify you have enabled 2-Step Verification for your Google account');
      console.error('2. Generate a new App Password at https://myaccount.google.com/apppasswords');
      console.error('3. When creating the App Password, select "Other" as the app and name it "Lacombe Gutters"');
      console.error('4. Copy the 16-character password (with spaces) exactly as shown');
      console.error('5. Run this test again with the new password: node gmail-direct-test.mjs "new app password"');
    } else if (error.code === 'ESOCKET') {
      console.error('\n👉 CONNECTION PROBLEM:');
      console.error('1. Check your internet connection');
      console.error('2. Verify that port 465 is not blocked by your firewall');
      console.error('3. Try using port 587 instead with secure:false');
    }
    
    console.error('\nFull error details:', error);
    console.error('==============================================');
  });
