import type { Metadata } from 'next';
import OemLeadForm from './OemLeadForm';

export const metadata: Metadata = {
  title: 'For Robotics & Machinery OEMs',
  description: 'Farhand is the field service partner for robotics and machinery OEMs. Tell us your company and we\'ll show you how we can help.',
  robots: { index: false, follow: false },
};

export default function OEMLandingPage() {
  return (
    <main className="bg-background min-h-screen flex items-center justify-center px-6 py-16">
      <div className="container max-w-[720px] text-center">
        <p className="text-sm text-accent font-medium uppercase tracking-wider mb-6">
          For robotics &amp; machinery OEMs
        </p>

        <h1 className="mb-6">
          Your machines.<br />Serviced everywhere.
        </h1>

        <h2 className="max-w-[560px] mx-auto mb-12 font-normal">
          AI-guided Field Service Engineers install &amp; repair your equipment at every client site — without you building a field team.
        </h2>

        <OemLeadForm />
      </div>
    </main>
  );
}
