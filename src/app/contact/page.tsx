import { 
  CONTACT_PHONE_ROB, 
  CONTACT_PHONE_RYAN, 
  CONTACT_EMAIL, 
  CONTACT_ADDRESS,
  SERVICE_AREA_BOUNDS
} from "@/lib/constants";
import ContactForm from "@/components/ContactForm";
import JobApplicationForm from "@/components/JobApplicationForm";

export const metadata = {
  title: "Contact Lacombe Gutters | Free Estimate & Inquiries",
  description: "Get in touch with Lacombe Gutters for a free, no-obligation estimate on eavestrough services. Call, email, or visit our Lacombe location for professional gutter solutions in Central Alberta.",
  keywords: [
    'contact Lacombe Gutters',
    'free gutter estimate',
    'eavestrough service near me',
    'gutter repair contact',
    'Central Alberta gutter services',
    'emergency gutter repair',
    'gutter installation quote',
    'Lacombe gutter specialists',
    'gutter maintenance contact',
    'roofing services contact'
  ],
  openGraph: {
    title: 'Contact Lacombe Gutters | Free Estimate & Inquiries',
    description: "Contact Lacombe Gutters today for professional eavestrough services. Get a free quote, schedule service, or ask about our gutter solutions in Central Alberta.",
    url: 'https://www.lacombeguttersltd.com/contact',
    type: 'website',
    images: [
      {
        url: '/images/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Lacombe Gutters - Professional Eavestrough Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Lacombe Gutters | Free Estimate & Inquiries',
    description: "Get in touch for professional eavestrough services in Central Alberta. Free estimates available for all gutter and roofing needs.",
    images: ['/images/og-contact.jpg'],
  },
  alternates: {
    canonical: 'https://www.lacombeguttersltd.com/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 relative">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden text-white bg-gradient-to-br from-slate-800 to-slate-900">
        {/* Dotted-node overlay (yellow construction pin-holes) */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#fbbe24 1.5px, transparent 1.6px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Subtle angled plate for depth */}
        <div
          className="absolute -top-32 -right-44 w-[150%] h-[180%] bg-slate-700/30"
          style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}
        />

        <div className="relative z-10 py-16 md:py-24 px-6 md:px-16 text-center space-y-5 md:space-y-6">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight drop-shadow-lg">
            Contact Us
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-xl text-white/90 font-medium drop-shadow-sm">
            Get in touch with our team for expert advice and free estimates on all your gutter needs.
          </p>
        </div>
      </section>
      
      {/* Main Content with Services Background */}
      <div className="py-16 md:py-24 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-950/50">
        <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-heading mb-4" style={{color: "black"}}>Contact Us</h1>
          <div className="w-24 h-2 bg-amber-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg max-w-2xl mx-auto" style={{color: "black"}}>
            Get in touch with our team for expert advice and free estimates on all your gutter needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16 bg-white/95 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700">
          {/* Contact Info - 2 columns */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md relative overflow-hidden">
            {/* Construction screws in corners */}
            <div className="screw-corner screw-top-left"></div>
            <div className="screw-corner screw-top-right"></div>
            <div className="screw-corner screw-bottom-left"></div>
            <div className="screw-corner screw-bottom-right"></div>
            
            {/* Metal strips at top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
            
            <h2 className="text-2xl font-bold mb-6" style={{color: "black", position: "relative", zIndex: 10}}>Get In Touch</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="font-bold" style={{color: "black"}}>Phone</p>
                  <p className="mb-1">Rob: <a href={`tel:${CONTACT_PHONE_ROB.replace(/-/g, '')}`} className="text-primary hover:underline">{CONTACT_PHONE_ROB}</a></p>
                  <p>Ryan: <a href={`tel:${CONTACT_PHONE_RYAN.replace(/-/g, '')}`} className="text-primary hover:underline">{CONTACT_PHONE_RYAN}</a></p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-bold" style={{color: "black"}}>Email</p>
                  <p><a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a></p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-bold" style={{color: "black"}}>Address</p>
                  <p>{CONTACT_ADDRESS}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2" style={{color: "black"}}>Hours of Operation</h3>
              <p className="mb-1">Monday - Friday: 7:00 AM - 6:00 PM</p>
              <p>Saturday: By appointment</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-2" style={{color: "black"}}>Service Area</h3>
              <p>{SERVICE_AREA_BOUNDS.description}</p>
            </div>
          </div>
          
          {/* Contact Form - 3 columns */}
          <div className="lg:col-span-3 bg-white p-8 rounded-lg shadow-md relative overflow-hidden">
            {/* Construction screws in corners */}
            <div className="screw-corner screw-top-left"></div>
            <div className="screw-corner screw-top-right"></div>
            <div className="screw-corner screw-bottom-left"></div>
            <div className="screw-corner screw-bottom-right"></div>
            
            {/* Metal strips at top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
            
            <h2 className="text-2xl font-bold mb-6" style={{color: "black", position: "relative", zIndex: 10}}>Get a Free Estimate</h2>
            <ContactForm />
          </div>
        </div>
        
        {/* Careers/Job Application Section */}
        <div className="bg-gradient-to-br from-secondary to-secondary/80 p-8 rounded-lg shadow-lg mb-12 relative border border-amber-300 overflow-hidden">
          {/* Construction screws in corners */}
          <div className="screw-corner screw-top-left"></div>
          <div className="screw-corner screw-top-right"></div>
          <div className="screw-corner screw-bottom-left"></div>
          <div className="screw-corner screw-bottom-right"></div>
          
          {/* Metal strips at top and bottom */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700"></div>
          
          <div className="text-center mb-8 relative z-10">
            <h2 className="text-3xl font-bold font-heading mb-4" style={{color: "#215e7d"}}>Join Our Team</h2>
            <div className="w-24 h-1.5 bg-white/80 mx-auto mb-5 rounded-full"></div>
            <p className="text-xl max-w-3xl mx-auto" style={{color: "#215e7d"}}>
              Looking to work with a professional team in the gutter and eavestrough industry? 
              We&apos;re always looking for skilled, motivated individuals to join our crew.
            </p>
          </div>
          

          
          {/* Metal construction texture overlay */}
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none" 
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 10px)',
              backgroundSize: '12px 12px',
              mixBlendMode: 'multiply'
            }}
          ></div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-inner border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-6" style={{color: "black"}}>Apply Now</h3>
            <JobApplicationForm />
          </div>
        </div>
        </div>
      </div>
    </main>
  );
}
