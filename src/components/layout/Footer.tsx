import Link from "next/link";
import { 
  SITE_NAME, 
  CONTACT_PHONE_ROB,
  CONTACT_PHONE_RYAN,
  CONTACT_EMAIL, 
  CONTACT_ADDRESS,
  FACEBOOK_URL,
  SERVICES
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="mb-4">
              Lacombe Gutters provides residential & commercial eavestrough, 
              soffit, fascia, and gutter services across central Alberta. 
              Our co-owners bring 40+ years of combined experience.
            </p>
            <div className="flex items-center mt-4">
              <a 
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {SERVICES.map((service, index) => (
                <li key={index}>
                  <Link 
                    href={service === "Free Estimates" ? "/contact" : "/services"} 
                    className="hover:text-secondary transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p className="mb-2">{CONTACT_ADDRESS}</p>
              <p className="mb-2">
                Rob: <a href={`tel:${CONTACT_PHONE_ROB.replace(/-/g, '')}`} className="hover:text-secondary transition-colors">
                  {CONTACT_PHONE_ROB}
                </a>
              </p>
              <p className="mb-2">
                Ryan: <a href={`tel:${CONTACT_PHONE_RYAN.replace(/-/g, '')}`} className="hover:text-secondary transition-colors">
                  {CONTACT_PHONE_RYAN}
                </a>
              </p>
              <p className="mb-2">
                Email: <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-secondary transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 mt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
