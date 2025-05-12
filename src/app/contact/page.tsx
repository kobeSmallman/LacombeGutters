import { 
  CONTACT_PHONE_ROB, 
  CONTACT_PHONE_RYAN, 
  CONTACT_EMAIL, 
  CONTACT_ADDRESS
} from "@/lib/constants";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Lacombe Gutters for a free estimate or to discuss your project needs.",
};

export default function ContactPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold font-heading mb-8 text-center">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {/* Contact Info - 2 columns */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md relative">
            {/* Construction screws in corners */}
            <div className="screw-corner screw-top-left"></div>
            <div className="screw-corner screw-top-right"></div>
            <div className="screw-corner screw-bottom-left"></div>
            <div className="screw-corner screw-bottom-right"></div>
            
            {/* Metal strips at top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
            
            <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="font-bold">Phone</p>
                  <p className="mb-1">Rob: <a href={`tel:${CONTACT_PHONE_ROB.replace(/-/g, '')}`} className="text-primary hover:underline">{CONTACT_PHONE_ROB}</a></p>
                  <p>Ryan: <a href={`tel:${CONTACT_PHONE_RYAN.replace(/-/g, '')}`} className="text-primary hover:underline">{CONTACT_PHONE_RYAN}</a></p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-bold">Email</p>
                  <p><a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a></p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-bold">Address</p>
                  <p>{CONTACT_ADDRESS}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Hours of Operation</h3>
              <p className="mb-1">Monday - Friday: 7:00 AM - 6:00 PM</p>
              <p>Saturday: By appointment</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-2">Service Area</h3>
              <p>Central Alberta, including St. Albert, Okotoks, Hinton, and Wainwright.</p>
            </div>
          </div>
          
          {/* Contact Form - 3 columns */}
          <div className="lg:col-span-3 bg-white p-8 rounded-lg shadow-md relative">
            {/* Construction screws in corners */}
            <div className="screw-corner screw-top-left"></div>
            <div className="screw-corner screw-top-right"></div>
            <div className="screw-corner screw-bottom-left"></div>
            <div className="screw-corner screw-bottom-right"></div>
            
            {/* Metal strips at top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
            
            <h2 className="text-2xl font-bold mb-6">Get a Free Estimate</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                  <input type="text" id="name" className="w-full p-3 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 font-medium">Phone</label>
                  <input type="tel" id="phone" className="w-full p-3 border border-gray-300 rounded-lg" required />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                <input type="email" id="email" className="w-full p-3 border border-gray-300 rounded-lg" required />
              </div>
              
              <div>
                <label htmlFor="address" className="block mb-2 font-medium">Project Address</label>
                <input type="text" id="address" className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>
              
              <div>
                <label htmlFor="service" className="block mb-2 font-medium">Service Needed</label>
                <select id="service" className="w-full p-3 border border-gray-300 rounded-lg" required>
                  <option value="">Select a service</option>
                  <option value="5-inch-gutters">5&quot; Gutters</option>
                  <option value="6-inch-gutters">6&quot; Gutters</option>
                  <option value="soffit-fascia">Soffit &amp; Fascia</option>
                  <option value="gutter-cleaning">Gutter Cleaning</option>
                  <option value="downspouts">Downspouts</option>
                  <option value="industrial">Industrial Eavestrough</option>
                  <option value="other">Other (please specify)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">Project Details</label>
                <textarea id="message" rows={4} className="w-full p-3 border border-gray-300 rounded-lg" 
                  placeholder="Please include details about your project, including any specific requirements or questions."
                  required
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="attachment" className="block mb-2 font-medium">
                  Attachment (optional) - Upload images of your project (Max 3MB)
                </label>
                <input type="file" id="attachment" className="w-full p-3 border border-gray-300 rounded-lg" 
                  accept="image/*" 
                  multiple
                />
                <p className="text-sm text-gray-500 mt-1">You can attach photos of your current gutters or project area to help us provide a more accurate estimate.</p>
              </div>
              
              <button 
                type="submit" 
                className="bg-primary text-white py-3 px-6 rounded-lg font-bold hover:bg-primary/90 transition-colors relative btn-construction"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
        
        {/* Careers/Job Application Section */}
        <div className="bg-secondary p-8 rounded-lg shadow-md mb-12 relative">
          {/* Construction screws in corners */}
          <div className="screw-corner screw-top-left"></div>
          <div className="screw-corner screw-top-right"></div>
          <div className="screw-corner screw-bottom-left"></div>
          <div className="screw-corner screw-bottom-right"></div>
          
          {/* Metal strips at top and bottom */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700"></div>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-heading mb-4 text-primary">Join Our Team</h2>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">
              Looking to work with a professional team in the gutter and eavestrough industry? 
              We&apos;re always looking for skilled, motivated individuals to join our crew.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6">Apply Now</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="job-name" className="block mb-2 font-medium">Full Name</label>
                  <input type="text" id="job-name" className="w-full p-3 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                  <label htmlFor="job-phone" className="block mb-2 font-medium">Phone Number</label>
                  <input type="tel" id="job-phone" className="w-full p-3 border border-gray-300 rounded-lg" required />
                </div>
              </div>
              
              <div>
                <label htmlFor="job-email" className="block mb-2 font-medium">Email</label>
                <input type="email" id="job-email" className="w-full p-3 border border-gray-300 rounded-lg" required />
              </div>
              
              <div>
                <label htmlFor="position" className="block mb-2 font-medium">Position</label>
                <select id="position" className="w-full p-3 border border-gray-300 rounded-lg" required>
                  <option value="">Select a position</option>
                  <option value="installer">Gutter Installer</option>
                  <option value="helper">Installation Helper</option>
                  <option value="driver">Driver (Class 5 License)</option>
                  <option value="other">Other (please specify)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="experience" className="block mb-2 font-medium">Experience</label>
                <textarea id="experience" rows={3} className="w-full p-3 border border-gray-300 rounded-lg" 
                  placeholder="Please describe your relevant experience, skills, and qualifications."
                  required
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="resume" className="block mb-2 font-medium">
                  Resume (PDF format preferred)
                </label>
                <input type="file" id="resume" className="w-full p-3 border border-gray-300 rounded-lg" 
                  accept=".pdf,.doc,.docx" 
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="bg-primary text-white py-3 px-6 rounded-lg font-bold hover:bg-primary/90 transition-colors btn-construction"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
