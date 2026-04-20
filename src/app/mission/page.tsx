import type { Metadata } from 'next';
import {
  StatsRow,
  CalloutBox,
  CTABlock,
} from '@/components/sections';

export const metadata: Metadata = {
  title: 'Farhand — Mission: Reindustrialize the US',
  description:
    'Farhand is the deployment layer for American reindustrialization — an AI-guided field service network that keeps US factories running and trains the workforce that owns them.',
  alternates: { canonical: 'https://farhand.live/mission' },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Farhand',
  alternateName: 'Farhand Robotics',
  legalName: 'XEngineering, LLC',
  url: 'https://farhand.live',
  logo: 'https://farhand.live/logo-w-type-light-on-dark.png',
  description:
    'Farhand is the deployment layer for American reindustrialization — an AI-guided field service network that keeps every robot in a US factory running, and trains the workforce that owns them.',
  foundingDate: '2026',
  foundingLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '16192 Coastal Highway',
      addressLocality: 'Lewes',
      addressRegion: 'DE',
      postalCode: '19958',
      addressCountry: 'US',
    },
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '16192 Coastal Highway',
    addressLocality: 'Lewes',
    addressRegion: 'DE',
    postalCode: '19958',
    addressCountry: 'US',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'aaryan@farhand.live',
      telephone: '+1-857-498-9778',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'grants and partnerships',
      email: 'aaryan@farhand.live',
      telephone: '+1-857-498-9778',
    },
  ],
  sameAs: [
    'https://linkedin.com/company/farhand-robotics',
    'https://x.com/far__hand',
  ],
  knowsAbout: [
    'Industrial robotics',
    'Field service engineering',
    'AI-assisted manufacturing',
    'Registered Apprenticeship',
    'PLC programming',
    'Controls engineering',
    'Workforce development',
    'US reindustrialization',
  ],
};

export default function MissionPage() {
  return (
    <main className="bg-background min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
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

      <section className="pt-8 pb-12 md:pb-16">
        <div className="container max-w-[900px]">
          <p className="text-accent text-sm tracking-wider uppercase mb-4">Our thesis</p>
          <h1 className="mb-6">Reindustrialize the US. Train the workforce that runs the robots coming.</h1>
          <h2 className="max-w-[780px] font-normal mb-8 text-light-gray">
            4.66 million industrial robots are installed worldwide today. US factories are absorbing a rising share of them, and the trade-school pipeline for the technicians who keep them running shrank for thirty years. Farhand closes that gap.
          </h2>
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <div className="container max-w-[900px]">
          <h3 className="mb-6 font-normal">The problem</h3>
          <p className="text-light-gray leading-relaxed mb-4 max-w-[750px]">
            Automation is outrunning the workforce. OEMs can&apos;t staff enough Field Service Engineers to commission the robots they sell. Mid-market factories buy automation they can&apos;t operate reliably. Knowledge that should compound across every repair evaporates inside one technician&apos;s head.
          </p>
          <p className="text-light-gray leading-relaxed mb-4 max-w-[750px]">
            The bill: <strong className="text-foreground">$1.4 trillion a year in unplanned downtime</strong> (Siemens 2024). A preventive-maintenance market projected to grow from <strong className="text-foreground">$8.2B to $22B by 2035</strong>. BLS projects <strong className="text-foreground">13% growth in industrial machinery mechanic demand through 2033</strong> against declining trade-school enrollment. The CHIPS Act and IRA have committed <strong className="text-foreground">$1.2T+ in factory construction</strong> — none of which runs without technicians to commission and service it.
          </p>
          <p className="text-light-gray leading-relaxed max-w-[750px]">
            If this gap isn&apos;t closed, reshoring stalls. The robots get installed but don&apos;t run. Production lines go down and stay down. American industrial capacity gets capped by the shortage of hands on the floor.
          </p>
        </div>
      </section>

      <StatsRow
        stats={[
          { value: '4.66M', label: 'industrial robots installed worldwide (IFR 2024)' },
          { value: '$1.4T', label: 'annual unplanned downtime cost (Siemens 2024)' },
          { value: '$8.2B → $22B', label: 'preventive maintenance market to 2035' },
          { value: '+13%', label: 'BLS growth in mechanic demand through 2033' },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="container max-w-[900px]">
          <h3 className="mb-6 font-normal">What Farhand does</h3>
          <p className="text-light-gray leading-relaxed mb-4 max-w-[750px]">
            Farhand is a deployment company, not a staffing agency. We combine three assets that together make US industrial capacity actually operate:
          </p>
          <ol className="text-light-gray leading-relaxed max-w-[750px] space-y-4 list-decimal list-inside">
            <li>
              <strong className="text-foreground">A nationwide technician network.</strong> 1,700+ sourced Field Service Engineers across all 50 states, classified by OEM skill (FANUC, ABB, KUKA, Yaskawa, Universal Robots, Rockwell, Siemens, Allen-Bradley), trade, and geography. Contract-based per-job pricing.
            </li>
            <li>
              <strong className="text-foreground">Relay™ — an AI engineer on every job.</strong> Ingests OEM manuals, repair tickets, sensor traces, and commissioning procedures. Becomes the senior engineer in the technician&apos;s pocket. $189/seat/month SaaS.
            </li>
            <li>
              <strong className="text-foreground">An upskilling loop.</strong> Every service call generates training data. Electricians, mechanics, and ex-military move into PLC, robotics, and controls careers. The workforce compounds instead of depleting.
            </li>
          </ol>
        </div>
      </section>

      <CalloutBox
        eyebrow="Why this matters for national policy"
        title="Farhand is not a labor-displacement story. We are an inverse-automation company: the more robots deploy in the US, the more technicians we train, place, and upskill."
        footer="Our outcome metric is robots running and technicians qualified — not headcount reduced. We are building the human layer that makes American reindustrialization possible."
      />

      <section className="py-12 md:py-16">
        <div className="container max-w-[900px]">
          <h3 className="mb-6 font-normal">How federal programs fit</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-white/10 rounded-2xl p-6">
              <p className="text-accent text-sm tracking-wider uppercase mb-2">Workforce development</p>
              <h4 className="font-normal mb-2">DOL ETA</h4>
              <p className="text-light-gray text-sm leading-relaxed">
                Farhand is a ready-made employer partner for Registered Apprenticeship in emerging AI-and-robotics trades. We commit to hiring graduates and contributing Relay™ as the assessment platform.
              </p>
            </div>
            <div className="border border-white/10 rounded-2xl p-6">
              <p className="text-accent text-sm tracking-wider uppercase mb-2">Industrial competitiveness</p>
              <h4 className="font-normal mb-2">NSF · DoD ManTech · DOE</h4>
              <p className="text-light-gray text-sm leading-relaxed">
                Relay™ is the technical bridge that lets US factories operate modern equipment. Three open research problems — cross-OEM schema, safety-constrained procedure grounding, edge inference — map cleanly to SBIR and ManTech project calls.
              </p>
            </div>
            <div className="border border-white/10 rounded-2xl p-6">
              <p className="text-accent text-sm tracking-wider uppercase mb-2">Reshoring</p>
              <h4 className="font-normal mb-2">CHIPS · IRA · Commerce</h4>
              <p className="text-light-gray text-sm leading-relaxed">
                Incentivizing factory construction is worthless without the commissioning and service capacity to run the equipment. We are that commissioning layer.
              </p>
            </div>
            <div className="border border-white/10 rounded-2xl p-6">
              <p className="text-accent text-sm tracking-wider uppercase mb-2">Manufacturing institutes</p>
              <h4 className="font-normal mb-2">ARM · MxD · LIFT</h4>
              <p className="text-light-gray text-sm leading-relaxed">
                Farhand contributes to Manufacturing Innovation Institute project calls as a small-business member. Our training corpus (8,000+ work orders across 15 clients in 40+ countries) accelerates member research.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container max-w-[900px]">
          <h3 className="mb-6 font-normal">Traction</h3>
          <ul className="text-light-gray leading-relaxed max-w-[750px] space-y-2">
            <li>• LOI signed covering 1,200+ robots</li>
            <li>• 1,700+ Field Service Engineers sourced and vetted across all 50 states</li>
            <li>• 6 pilot customers closing — named: Boschert USA, CU-Profi</li>
            <li>• First revenue validated</li>
            <li>• Aggregate team history: 8,000+ work orders across 15 clients in 40+ countries</li>
            <li>• Founding team: CEO previously Engineer #1 at Verne Robotics (YC S25); Board member Amayr Babar as Primary Technical Supervisor</li>
          </ul>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container max-w-[900px] text-center">
          <h3 className="mb-4 font-light italic">
            The robots are coming either way. The question is whether Americans own them or just watch them arrive.
          </h3>
          <p className="text-light-gray text-lg">
            Farhand is the company making sure Americans own them.
          </p>
        </div>
      </section>

      <CTABlock
        title="Get in touch."
        subtitle="Grant program officers, journalists, investors, partners — we reply within a business day."
        buttonText="Email aaryan@farhand.live"
        buttonHref="mailto:aaryan@farhand.live"
      />

      <footer className="py-12 px-6 border-t border-border">
        <div className="container max-w-[900px] flex flex-col sm:flex-row justify-between items-start gap-6">
          <div>
            <p className="text-foreground font-medium">Farhand</p>
            <p className="text-light-gray text-sm mt-1">
              XEngineering, LLC · 16192 Coastal Highway, Lewes, DE 19958
            </p>
          </div>
          <div className="text-sm text-light-gray text-right">
            <p>
              <a href="mailto:aaryan@farhand.live" className="text-accent">
                aaryan@farhand.live
              </a>
            </p>
            <p className="mt-1">(857) 498-9778</p>
            <p className="mt-1">
              <a href="https://farhand.live" className="text-accent">
                farhand.live
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
