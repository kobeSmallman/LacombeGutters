# Lacombe Gutters Website

Professional eavestrough services website built with Next.js 15, featuring winter services, comprehensive contact forms, and advanced spam protection.

## Features

- **Winter Services Section**: Dedicated section highlighting cold-weather gutter services with animated snow background
- **Enhanced Contact Forms**: Two contact entry points (full contact page + sliding widget) with comprehensive validation
- **Advanced Spam Protection**: Multi-layered protection including honeypot fields, Cloudflare Turnstile, and content validation
- **Responsive Design**: Optimized for all device sizes with accessibility features
- **Performance Optimized**: Includes `prefers-reduced-motion` support for animations

## Getting Started

### Development Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables (see [Environment Variables](#environment-variables) section):
```bash
cp .env.example .env.local
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

#### Required for Email Functionality
```bash
# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key
MAIL_FROM=noreply@lacombeguttersltd.com
PROD_EMAIL_TO=your_business_email@domain.com

# Twilio Configuration (for SMS notifications)
TWILIO_SID=your_twilio_account_sid_or_api_key
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_ACCOUNT_SID=your_account_sid_if_using_api_key
TWILIO_FROM=+1234567890
PROD_SMS_TO=+1234567890
```

#### Required for Spam Protection
```bash
# Cloudflare Turnstile (Bot Protection)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
```

#### Development Keys
For local development, you can use Turnstile test keys:
- Site Key: `1x00000000000000000000AA` (always passes)
- Secret Key: `1x0000000000000000000000000000000AA` (always passes)

## Contact Form Protection

The website implements multiple layers of spam protection:

### 1. Client-Side Validation
- Enhanced email format validation
- Minimum content length requirements
- Real-time field validation with user feedback
- Phone number formatting and validation

### 2. Server-Side Protection
- Robust email format validation using RFC-compliant regex
- Honeypot field detection (hidden `company_website` field)
- Content pattern analysis for spam detection
- Rate limiting per IP address
- Input length and format validation

### 3. Cloudflare Turnstile Integration
- Bot protection on both contact forms
- Server-side token verification
- Graceful fallback for verification failures

### Testing Spam Protection

To verify spam protection is working:

1. **Honeypot Test**: Fill the hidden field using browser developer tools
2. **Invalid Email Test**: Submit with malformed email addresses
3. **Content Pattern Test**: Submit messages with suspicious content (URLs, spam keywords)
4. **Turnstile Test**: Block the Turnstile widget and attempt submission

## Winter Services

The Winter Services section appears on:
- **Home page**: Between "Expert Eavestrough Solutions" and the rain animation section
- **Why Us page**: At the bottom, just above the footer
- **Services page**: Enhanced "Gutter Cleaning" card with winter-specific bullets

### Features
- **Realistic snow animation** with actual snowflake emojis (❄) falling continuously
  - **Desktop**: 60 snowflakes (12-24px size)
  - **Mobile**: 35 snowflakes (10-18px size) for better performance
  - **Reduced motion**: 8 static snowflakes with minimal animation
- **Mobile-optimized performance** with hardware acceleration and webkit optimizations
- **Cross-platform compatibility** with proper emoji font rendering
- **Accessibility compliant** - respects user motion preferences and screen sizes
- **Winter visual hints** - decorative ice crystals and frost effects positioned throughout
- Six key winter service offerings with engaging icons and descriptions
- Responsive design with smooth hover effects and mobile-friendly layouts
- Call-to-action buttons for estimates and contact with proper touch targets

## File Structure

```
src/
├── app/
│   ├── page.tsx                 # Home page (includes Winter Services)
│   ├── why-us/page.tsx         # Why Us page (includes Winter Services)
│   ├── services/page.tsx       # Services page (updated Gutter Cleaning)
│   ├── contact/page.tsx        # Full contact page
│   └── api/contact/route.ts    # Contact form API with spam protection
├── components/
│   ├── WinterServicesSection.tsx    # Reusable winter services component
│   ├── CloudflareTurnstile.tsx     # Turnstile integration component
│   ├── ContactForm.tsx             # Main contact form
│   └── QuoteRequestWidget.tsx      # Sliding contact widget
```

## Deployment

### Vercel Deployment

1. Set environment variables in Vercel dashboard
2. Deploy from GitHub repository
3. Configure domain (lacombeguttersltd.com)

### Environment Configuration

Ensure all production environment variables are configured:
- Email service credentials (SendGrid)
- SMS service credentials (Twilio, optional)
- Cloudflare Turnstile keys (required for spam protection)

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # Run TypeScript type checking
```

## Technologies

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Email**: SendGrid
- **SMS**: Twilio (optional)
- **Bot Protection**: Cloudflare Turnstile
- **Forms**: React Hook Form patterns with custom validation
- **TypeScript**: Full type safety

## Support

For technical support or questions about the website:
- Review this documentation
- Check environment variable configuration
- Verify Cloudflare Turnstile setup
- Test email delivery through SendGrid dashboard