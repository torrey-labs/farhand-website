import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RelayDiagram from '@/components/RelayDiagram';
import RelayCapabilities from '@/components/RelayCapabilities';

export const metadata: Metadata = {
  title: 'Relay — AI agent for your robot fleet',
  description:
    'Farhand Relay turns your tribal knowledge into an AI agent that guides every repair, SSHes into robots, and documents every action. Custom per OEM. One agent per customer.',
  alternates: { canonical: '/relay' },
  openGraph: {
    title: 'Farhand Relay — AI agent trained to be your senior engineer',
    description:
      'Your docs in. AI-guided SOPs, autonomous diagnostics, and closed-loop learning out. Custom per OEM.',
    url: 'https://farhand.live/relay',
    siteName: 'Farhand',
    type: 'website',
  },
};

export default function RelayPage() {
  return (
    <main className="bg-background min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="container text-center max-w-[900px]">
          <p className="text-accent text-sm tracking-[0.2em] uppercase mb-5">
            AI Platform
          </p>
          <h1
            className="mb-6"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              letterSpacing: '-0.025em',
            }}
          >
            Your senior engineer, on every robot.
          </h1>
          <p className="text-light-gray text-lg md:text-xl leading-relaxed max-w-[720px] mx-auto">
            Your tribal knowledge → an AI agent. <span className="text-foreground">One per customer.</span>{' '}
            It guides every repair, SSHs into your robots, and logs every action.
          </p>
        </div>
      </section>

      {/* Diagram */}
      <section className="pb-16 md:pb-24">
        <div className="container">
          <RelayDiagram />
        </div>
      </section>

      {/* Capabilities */}
      <RelayCapabilities />

      {/* Three differentiators */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="container max-w-[1100px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <div className="text-accent text-sm tracking-[0.15em] uppercase mb-4">01</div>
              <h3 className="mb-3 font-light" style={{ fontSize: 'clamp(1.5rem, 3vw, 1.875rem)' }}>
                For your own team, too.
              </h3>
              <p className="text-light-gray leading-relaxed">
                Not just Farhand-facing. Give Relay to your internal service team.
                Yesterday&apos;s enterprise FSM — built for robots.
              </p>
            </div>
            <div>
              <div className="text-accent text-sm tracking-[0.15em] uppercase mb-4">02</div>
              <h3 className="mb-3 font-light" style={{ fontSize: 'clamp(1.5rem, 3vw, 1.875rem)' }}>
                Custom per OEM.
              </h3>
              <p className="text-light-gray leading-relaxed">
                We build bespoke debugging tools around your stack. Your model, your
                sensors, your error codes — your own AI.
              </p>
            </div>
            <div>
              <div className="text-accent text-sm tracking-[0.15em] uppercase mb-4">03</div>
              <h3 className="mb-3 font-light" style={{ fontSize: 'clamp(1.5rem, 3vw, 1.875rem)' }}>
                Democratized knowledge.
              </h3>
              <p className="text-light-gray leading-relaxed">
                Tribal knowledge → searchable institutional docs. Every junior
                tech performs like your senior one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data & Security */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="container max-w-[900px] text-center">
          <div className="inline-flex items-center gap-2 text-accent text-sm tracking-[0.2em] uppercase mb-5">
            <span aria-hidden="true">🛡</span> Data &amp; Security
          </div>
          <p className="text-foreground text-lg md:text-xl leading-relaxed">
            One AI agent per customer. Hosted on our servers.
            <br className="hidden md:block" />
            <span className="text-light-gray">
              No data leaked to LLM providers. No cross-org data. No shared models.
            </span>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="container max-w-[820px] text-center">
          <h2 className="mb-6 font-light">
            See Relay on <em className="text-accent italic not-italic">your</em> documentation.
          </h2>
          <p className="text-light-gray text-base md:text-lg mb-10 max-w-[600px] mx-auto">
            15-minute call. Upload your docs. We&apos;ll show you the agent.
          </p>
          <a
            href="/#schedule"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-background font-semibold text-base md:text-lg hover:opacity-90 transition-opacity"
          >
            Schedule a call
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
