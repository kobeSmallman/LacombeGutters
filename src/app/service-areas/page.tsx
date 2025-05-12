import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SERVICE_AREA_BOUNDS } from "@/lib/constants";

export const metadata = {
  title: "Service Areas",
  description: "Lacombe Gutters provides eavestrough services throughout central Alberta, including Lacombe, Red Deer, Blackfalds, and surrounding communities.",
};

export default function ServiceAreasPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold font-heading mb-4 text-center">Service Areas</h1>
        <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
          We proudly serve communities throughout central Alberta, providing high-quality gutter and eavestrough services.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Service Boundaries</h2>
            <p className="mb-6">
              Based in central Alberta, we provide our services to residential and commercial clients within
              these approximate boundaries:
            </p>
            
            <div className="bg-neutral-light p-6 rounded-lg mb-8">
              <h3 className="font-bold mb-4">Coverage Area</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3">N</span>
                  <div>
                    <span className="font-bold">North:</span> Up to {SERVICE_AREA_BOUNDS.north}
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3">S</span>
                  <div>
                    <span className="font-bold">South:</span> Down to {SERVICE_AREA_BOUNDS.south}
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3">E</span>
                  <div>
                    <span className="font-bold">East:</span> As far as {SERVICE_AREA_BOUNDS.east}
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3">W</span>
                  <div>
                    <span className="font-bold">West:</span> Out to {SERVICE_AREA_BOUNDS.west}
                  </div>
                </li>
              </ul>
            </div>
            
            <p className="mb-6">
              Our central location allows us to efficiently serve a wide area of central Alberta. If you're 
              not sure if your location is within our service area, please contact us for confirmation.
            </p>
            
            <Link href="/contact">
              <Button variant="primary" size="lg">Contact Us</Button>
            </Link>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Service Area Map</h2>
            <div className="aspect-square overflow-hidden rounded-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2437088.6070133!2d-116.52918156249997!3d52.28259799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5374542247bedddd%3A0x5251bbfce9df4f3e!2sLacombe%2C%20AB!5e0!3m2!1sen!2sca!4v1650465123456!5m2!1sen!2sca" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              This map shows our service area with Lacombe at the center. 
              We serve all communities within the boundaries of {SERVICE_AREA_BOUNDS.north} (North), 
              {SERVICE_AREA_BOUNDS.south} (South), {SERVICE_AREA_BOUNDS.east} (East), and 
              {SERVICE_AREA_BOUNDS.west} (West).
            </p>
          </div>
        </div>
        
        <div className="bg-secondary p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-primary">Ready to get started?</h2>
          <p className="mb-6 text-primary/80">
            Contact us today for a free estimate on your gutter installation or repair project.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">Get a Free Estimate</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
