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

### Spam Protection (Cloudflare Turnstile) - NEW
```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key_here
TURNSTILE_SECRET_KEY=your_turnstile_secret_key_here
```

**For Development/Testing**, you can use these test keys:
```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
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
2. **Spam Protection (NEW)**: 
   - Honeypot field detection (hidden field that bots might fill)
   - Cloudflare Turnstile verification (bot protection)
   - Enhanced server-side validation with pattern detection
   - Rate limiting per IP address
3. **Business Notifications**: 
   - Email notifications are always sent to the business (if configured)
   - SMS notifications are sent to the business only if the customer chose SMS
4. **Customer Confirmations**: Sent via the customer's preferred method (email or SMS)
5. **File Attachments**: Supported in email notifications (images and PDFs up to 10MB each)

## Testing vs Production

- When `NODE_ENV !== 'production'`, the system uses `TEST_EMAIL_TO` and `TEST_SMS_TO`
- In production, it uses `PROD_EMAIL_TO` and `PROD_SMS_TO`
- This allows safe testing without sending messages to real customers

## File Attachment Support

- **Email**: Full support for attachments via SendGrid
- **SMS**: Limited support - Twilio MMS can handle images up to 5MB, but this is not implemented yet
- **Supported formats**: JPG, PNG, GIF, WebP, PDF
- **Size limit**: 10MB per file for email attachments

## New Features Added (Winter 2024)

### Winter Services Section
- Added to Home page (between Expert Eavestrough Solutions and rain section)
- Added to Why Us page (at the bottom)
- Updated Gutter Cleaning service card with winter-specific bullets
- **Functional snow animation features**:
  - **Working snowfall animation**: Actual ❄ emoji snowflakes falling from top to bottom
  - **Responsive design**: 
    - Desktop: 60 snowflakes (12-24px size)
    - Mobile: 35 snowflakes (10-18px size) for optimal performance
    - Very small screens (<480px): Minimum 8px snowflake size
  - **Natural movement**: Horizontal drift and sway patterns with varied timing
  - **Mobile optimizations**: 
    - Hardware acceleration with `transform3d` and `backface-visibility`
    - WebKit-specific optimizations for iOS devices
    - Reduced visual effects on mobile for better battery life
  - **Performance optimized**: Efficient CSS keyframe animations, no JavaScript animation loops
  - **Accessibility compliance**: 
    - Reduces to 8 static snowflakes for `prefers-reduced-motion` users
    - Removes visual effects for users with motion sensitivity
  - **Cross-platform compatibility**: System emoji fonts with fallbacks
  - **Section-scoped**: Animation only appears within Winter Services section bounds
  - **Winter atmosphere**: Decorative ice crystal emojis positioned throughout section

### Enhanced Spam Protection
- **Honeypot fields**: Hidden form fields that detect automated submissions
- **Cloudflare Turnstile**: Advanced bot protection with visual challenges
- **Enhanced validation**: Server-side pattern detection for spam content
- **Rate limiting**: IP-based submission limits to prevent abuse

### How to Test Spam Protection

1. **Test Honeypot**: Use browser developer tools to fill the hidden `company_website` field
2. **Test Turnstile**: Block the Turnstile widget script and try to submit
3. **Test Validation**: Submit forms with invalid data (malformed emails, suspicious content)
4. **Test Rate Limiting**: Submit multiple forms rapidly from the same IP

All spam attempts are logged and rejected with appropriate user-friendly error messages.
