import Link from "next/link";
import Image from "next/image";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export default function Header() {
  return (
    <header className="bg-white shadow-md border-b-4 border-primary">
      <div className="container mx-auto py-4 px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0 relative">
          {/* Hammer icon in top left */}
          <div className="absolute -top-2 -left-2 text-gray-700 transform -rotate-12 hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 12 4-4a1 1 0 0 0-1-1.73L8 2.08a1 1 0 0 0-1 .92v9"/><path d="m18 12-8 8s-1 .5-2 0l-2-2c-.5-1 0-2 0-2l8-8"/><path d="M10 6.13v-.25"/><path d="m14 10.13-.24-.24"/><path d="m10 10.13-.24-.24"/><path d="m14 6.13-.24-.24"/></svg>
          </div>
          
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity relative">
            <Image 
              src="/images/logos/logo.png" 
              alt="Lacombe Gutters Logo" 
              width={50} 
              height={50}
              className="mr-3"
            />
            <span className="text-2xl font-bold text-primary tracking-tight uppercase">Lacombe Gutters</span>
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row items-center">
          <nav className="mb-4 md:mb-0 md:mr-6">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link 
                    href={item.path} 
                    className="nav-link text-neutral-dark hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="md" className="btn-construction">
                Contact Us Now!
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
