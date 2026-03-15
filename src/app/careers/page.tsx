import { Metadata } from 'next';
import JobApplicationForm from '@/components/JobApplicationForm';

export const metadata: Metadata = {
  title: 'Careers | Lacombe Gutters',
  description: 'Join the Lacombe Gutters team. Apply for open positions in gutter installation, maintenance, and eavestrough services across Central Alberta.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden text-white bg-gradient-to-br from-slate-800 to-slate-900">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#fbbe24 1.5px, transparent 1.6px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div
          className="absolute -top-32 -right-44 w-[150%] h-[180%] bg-slate-700/30"
          style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}
        />
        <div className="relative z-10 py-16 md:py-24 px-6 md:px-16 text-center space-y-5 md:space-y-6">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight drop-shadow-lg">
            Join Our Team
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-xl text-white/90 font-medium drop-shadow-sm">
            We&apos;re looking for skilled, motivated individuals to join our crew in the gutter and eavestrough industry.
          </p>
        </div>
      </section>

      {/* Application Form */}
      <div className="py-16 md:py-24 bg-gradient-to-br from-amber-50 to-amber-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Apply Now</h2>
            <JobApplicationForm />
          </div>
        </div>
      </div>
    </main>
  );
}
