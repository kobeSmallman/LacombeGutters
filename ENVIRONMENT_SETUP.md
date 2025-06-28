# Environment Variables Setup for Lacombe Gutters

## Required Environment Variables for Testing

Create a `.env.local` file in the root directory with the following variables:

### Email Configuration (SendGrid)
```
SENDGRID_API_KEY=your_sendgrid_api_key_here
MAIL_FROM=noreply@lacombeguttersltd.com
```

### SMS Configuration (Twilio)
```
TWILIO_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_FROM=+1234567890
```

### Test Recipients (for development/testing)
```
TEST_EMAIL_TO=your_test_email@example.com
TEST_SMS_TO=+1234567890
```

### Production Recipients (for production deployment)
```
PROD_EMAIL_TO=lacombegutters@gmail.com
PROD_SMS_TO=+1234567890
```

## How the System Works

1. **Contact Method Selection**: Users choose either email or SMS as their preferred contact method
2. **Business Notifications**: 
   - Email notifications are always sent to the business (if configured)
   - SMS notifications are sent to the business only if the customer chose SMS
3. **Customer Confirmations**: Sent via the customer's preferred method (email or SMS)
4. **File Attachments**: Supported in email notifications (images and PDFs up to 10MB each)

## Testing vs Production

- When `NODE_ENV !== 'production'`, the system uses `TEST_EMAIL_TO` and `TEST_SMS_TO`
- In production, it uses `PROD_EMAIL_TO` and `PROD_SMS_TO`
- This allows safe testing without sending messages to real customers

## File Attachment Support

- **Email**: Full support for attachments via SendGrid
- **SMS**: Limited support - Twilio MMS can handle images up to 5MB, but this is not implemented yet
- **Supported formats**: JPG, PNG, GIF, WebP, PDF
- **Size limit**: 10MB per file for email attachments
