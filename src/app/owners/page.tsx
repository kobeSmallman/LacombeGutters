import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Our Team",
  description: "Meet the experienced team behind Lacombe Gutters, delivering quality eavestrough services across central Alberta.",
};

// This would normally come from your team.json
const team = [
  {
    name: "John Lacombe",
    role: "Co-Owner & Master Installer",
    bio: "John has been installing gutters and eavestroughs for over 30 years. His attention to detail and commitment to quality have made him one of the most respected gutter professionals in Central Alberta. John personally oversees every installation project to ensure it meets our high standards.",
    image: "/images/team/john-lacombe.jpg"
  },
  {
    name: "Mike Peterson",
    role: "Co-Owner & Operations Manager",
    bio: "With 25 years in the industry, Mike brings extensive knowledge of materials, techniques, and project management to every job. He handles the day-to-day operations of the company and ensures that every customer receives exceptional service from start to finish.",
    image: "/images/team/mike-peterson.jpg"
  }
];

export default function OwnersPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold font-heading mb-4 text-center">Our Team</h1>
        <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
          Meet the experienced professionals who make Lacombe Gutters the trusted choice for eavestrough services in central Alberta.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <div className="relative h-72">
                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                  <Image
                    src="/images/logos/logo-icon.png"
                    alt="Lacombe Gutters Logo"
                    width={80}
                    height={80}
                    className="opacity-30"
                  />
                </div>
                {/* This would be the actual image if available */}
                {/* <Image 
                  src={member.image} 
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                /> */}
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-1">{member.name}</h2>
                <p className="text-primary mb-4">{member.role}</p>
                <p className="mb-4">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-secondary p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-primary">Work with our expert team</h2>
          <p className="mb-6 text-primary/80">
            Contact us today to discuss your gutter and eavestrough needs with our experienced professionals.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">Get a Free Estimate</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
