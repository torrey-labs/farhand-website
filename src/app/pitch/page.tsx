import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import {
  StatsRow,
  StepsList,
  CalloutBox,
  CTABlock,
} from '@/components/sections';

export const metadata: Metadata = {
  title: 'Farhand — Executive Summary',
  description: 'AI-guided field service for robotics and machinery OEMs. On-demand Field Service Engineers in every US zip code.',
  robots: { index: false, follow: false },
};

export default function PitchPage() {
  return (
    <main className="bg-background min-h-screen">
      {/* Minimal header — no full nav, just logo linking home */}
      <header className="py-8 px-6">
        <div className="container max-w-[900px]">
          <a
            href="/"
            className="text-accent font-medium text-sm tracking-wider hover:opacity-80 transition-opacity"
          >
            Farhand
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-8 pb-12 md:pb-16">
        <div className="container max-w-[900px]">
          <h1 className="mb-6">Your field service partner.</h1>
          <h2 className="max-w-[750px] font-normal mb-8">
            On-demand Field Service Engineers guided by AI to install and service your robots &amp; machinery at client sites — without you building a field team.
          </h2>
          <p className="text-light-gray leading-relaxed mb-6 max-w-[700px]">
            Farhand dispatches AI-guided Field Service Engineers who arrive knowing your equipment. We load your full documentation — manuals, SOPs, wiring diagrams, error codes — into our Relay™ platform. The Field Service Engineer gets real-time, context-aware guidance. Your customer gets same-day response. You get field intelligence back.
          </p>
          <p className="text-light-gray leading-relaxed mb-6 max-w-[700px]">
            We cover every zip code in the US. No regional hubs, no travel surcharges, no 48-hour dispatch windows. Robots, industrial machinery, medical equipment, instruments — if it needs a Field Service Engineer, we send one who already knows your machine.
          </p>
          <p className="text-light-gray leading-relaxed max-w-[700px]">
            The result: 39% faster resolution, 86% first-time fix rate, and a service cost structure that scales with your deployments — not your headcount.
          </p>
        </div>
      </section>

      <StatsRow
        stats={[
          { value: '39%', label: 'faster resolution with AI guidance' },
          { value: '86%', label: 'first-time fix rate' },
          { value: '1 in 3', label: 'issues resolved remotely' },
          { value: '50 states', label: 'coverage area' },
        ]}
      />

      <StepsList
        title="How it works"
        subtitle="Four steps from first call to full coverage."
        steps={[
          'Upload your documentation — manuals, SOPs, error codes, firmware changelogs. Any language.',
          'A Field Service Engineer arrives guided by AI that knows your machine. No ramp-up, no training lag.',
          'Remote triage first — 1 in 3 issues resolved without rolling a truck.',
          'Every repair improves the AI. Your knowledge compounds across every site.',
        ]}
      />

      <CalloutBox
        eyebrow="Why this matters"
        title="The robots coming to American factories are US-made. The people running them should be too."
        footer="Farhand is the upskilling layer for US reindustrialization — a national bench of Field Service Engineers pulled from electrical, mechanical, and ex-military trades, paired with the AI that turns every repair into training data."
      />

      <CTABlock
        title="See how it works for your equipment."
        subtitle="15-minute call. We'll show you Relay on your documentation."
        buttonText="Schedule a call"
        buttonHref="/#schedule"
      />

      {/* Minimal footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container max-w-[900px] flex flex-col sm:flex-row justify-between items-start gap-6">
          <div>
            <p className="text-foreground font-medium">Farhand</p>
            <p className="text-light-gray text-sm mt-1">AI-guided field service for robotics &amp; machinery</p>
          </div>
          <div className="text-sm text-light-gray text-right">
            <p><a href="mailto:aaryan@farhand.live" className="text-accent">aaryan@farhand.live</a></p>
            <p className="mt-1">(857) 498-9778</p>
            <p className="mt-1"><a href="https://farhand.live" className="text-accent">farhand.live</a></p>
          </div>
        </div>
      </footer>
    </main>
  );
}
