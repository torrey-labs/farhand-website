import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Connect with Farhand',
  description: 'Schedule a call, email, or connect on LinkedIn with the Farhand team.',
  robots: { index: false, follow: false },
};

export default function ConnectPage() {
  return (
    <main className="bg-background min-h-screen flex items-center justify-center px-6 py-16">
      <div className="container max-w-[480px] text-center">
        {/* Avatar placeholder */}
        <div className="w-24 h-24 rounded-full border-2 border-accent mx-auto mb-6 flex items-center justify-center text-accent text-3xl font-serif">
          AA
        </div>

        <h1 className="text-3xl mb-2" style={{ fontSize: '32px' }}>Aaryan Agrawal</h1>
        <p className="text-accent text-sm font-medium uppercase tracking-wider mb-2">
          Co-founder, Farhand
        </p>
        <p className="text-light-gray mb-10 leading-relaxed">
          AI-guided field service for robotics &amp; machinery OEMs. On-demand Field Service Engineers in every US zip code.
        </p>

        <div className="flex flex-col gap-3">
          <Button asChild size="lg" className="w-full">
            <a href="/#schedule">Schedule a Call</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <a href="mailto:aaryan@farhand.live">Email Me</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <a href="https://www.linkedin.com/in/aaryan-agrawal/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg" className="w-full">
            <a href="tel:+18574989778">(857) 498-9778</a>
          </Button>
        </div>

        <p className="text-xs text-light-gray/50 mt-10">
          <a href="https://farhand.live" className="text-accent/60">farhand.live</a>
        </p>
      </div>
    </main>
  );
}
