// Gmail SMTP Format Test - This tries different password formats
import nodemailer from 'nodemailer';

// Use existing app password - trying different format variations
const password = "cesr dihi bmcw gnxr"; // Your existing password
console.log('Testing with existing password:', password);

// Try 6 different formats of the same password
const passwordFormats = [
  password,                    // Original with spaces
  password.replace(/\s+/g, ''), // No spaces
  `"${password}"`,             // With quotes
  password.trim(),             // Trimmed
  Buffer.from(password).toString('base64'), // Base64 encoded
  password.replace(/\s+/g, '+') // Replace spaces with +
];

async function testAllFormats() {
  console.log('==============================================');
  console.log('GMAIL PASSWORD FORMAT TEST');
  console.log('==============================================');
  console.log('Testing 6 different formats of your password');
  console.log('Email: kobe4smallman@gmail.com');
  
  for (let i = 0; i < passwordFormats.length; i++) {
    const currentFormat = passwordFormats[i];
    console.log(`\n\nTEST #${i+1}: ${currentFormat.includes(password) ? 'With spaces' : 'Without spaces'}`);
    
    // Create transporter with current password format
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'kobe4smallman@gmail.com',
        pass: currentFormat
      }
    });
    
    try {
      // Verify connection only - don't send emails yet
      const isVerified = await transporter.verify();
      console.log(`✅ FORMAT #${i+1} WORKS! Password format: ${currentFormat}`);
      console.log('\nUse this in your .env.local:');
      console.log(`SMTP_PASS=${currentFormat}`);
      
      // Return the working format
      return currentFormat;
    } catch (error) {
      console.log(`❌ Format #${i+1} failed: ${error.message}`);
    }
  }
  
  // If we got here, all formats failed
  console.error('\n❌ All password formats failed.');
  console.error('This suggests the issue might not be with the password format.');
  console.error('Alternative approach: Try using OAuth2 authentication instead.');
  
  return null;
}

// Run the tests
testAllFormats()
  .then(workingFormat => {
    if (workingFormat) {
      console.log('\n✅ SUCCESS! Found a working password format.');
      console.log('Update your .env.local file with this working format.');
    } else {
      console.log('\nTrying alternative port...');
      // Try port 587 as a last resort
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'kobe4smallman@gmail.com',
          pass: password
        }
      });
      
      return transporter.verify().then(() => {
        console.log('✅ PORT 587 WORKS!');
        console.log('Update your .env.local with:');
        console.log('SMTP_PORT=587');
        console.log('And make sure secure: false is set in mailer.ts');
      });
    }
  })
  .catch(error => {
    console.error('Final error:', error);
    console.log('Consider using SendGrid or other email service that has better documentation.');
  });
