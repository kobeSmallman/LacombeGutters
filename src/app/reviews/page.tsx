import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Customer Reviews",
  description: "Read testimonials from our satisfied customers across central Alberta who have experienced our quality gutter and eavestrough services.",
};

// This would normally come from your testimonials.json
const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Lacombe",
    quote: "Lacombe Gutters did an amazing job installing new gutters on our home. The team was professional, efficient, and left our property spotless. I highly recommend their services!"
  },
  {
    name: "Michael Thompson",
    location: "Red Deer",
    quote: "After years of dealing with water damage from poorly installed gutters, I called Lacombe Gutters. They fixed everything perfectly and at a fair price. Wish I had called them years ago!"
  },
  {
    name: "Jennifer Wilson",
    location: "Blackfalds",
    quote: "The team at Lacombe Gutters was prompt, courteous, and very knowledgeable. They explained everything they were doing and why. Our new gutters look great and work perfectly."
  },
  {
    name: "Robert Anderson",
    location: "Sylvan Lake",
    quote: "I've used Lacombe Gutters for both my home and business. Their industrial-scale work on my warehouse was just as impressive as the detailed work on my house. True professionals."
  },
  {
    name: "Lisa Martinez",
    location: "Stettler",
    quote: "The annual gutter cleaning service from Lacombe Gutters has saved us from so many potential problems. They're always thorough and spot issues before they become expensive repairs."
  },
  {
    name: "David Clark",
    location: "Ponoka",
    quote: "After a severe storm damaged our gutters, Lacombe Gutters came out quickly to assess and repair the damage. Their emergency service was a lifesaver and prevented water damage to our home."
  }
];

export default function ReviewsPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold font-heading mb-4 text-center">Customer Reviews</h1>
        <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
          Don't just take our word for it. Read what our customers have to say about our gutter and eavestrough services.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#215e7d" stroke="none">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="mb-4 italic">{testimonial.quote}</p>
              <div className="mt-auto">
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-neutral-light p-8 rounded-lg mb-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Have You Worked With Us?</h2>
          <p className="mb-6">
            We value your feedback! Share your experience with Lacombe Gutters to help us continue providing top-quality service.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://www.facebook.com/lacombegutters" target="_blank" rel="noopener noreferrer">
              <Button variant="primary">
                Leave a Facebook Review
              </Button>
            </a>
            <a href="mailto:info@lacombegutters.ca?subject=My%20Review%20of%20Lacombe%20Gutters">
              <Button variant="secondary">
                Email Your Feedback
              </Button>
            </a>
          </div>
        </div>
        
        <div className="bg-secondary p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-primary">Join our satisfied customers</h2>
          <p className="mb-6 text-primary/80">
            Experience the quality service that our customers rave about. Contact us today for a free estimate.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">Get a Free Estimate</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
