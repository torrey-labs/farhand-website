import VerticalLanding from '@/components/VerticalLanding';

export const metadata = {
  title: 'Field Service for European OEMs in the US',
  description: 'US-nationwide field service for KUKA, ABB, Siemens, DMG MORI, Trumpf, Universal Robots, and Stäubli equipment. AI-guided Field Service Engineers in every zip code.',
};

export default function EuropeanOEMsPage() {
  return (
    <VerticalLanding
      machineType="For European OEMs"
      headline="You built it in Munich. We service it in Milwaukee."
      subheadline="AI-guided Field Service Engineers across every US zip code who know your KUKA, ABB, Siemens, or DMG MORI equipment — full documentation loaded before they arrive on site."
      painPoints={[
        "Your US service is centralized in 2-3 hubs — you can't cover 50 states from Detroit and Charlotte alone",
        "European engineers flying to the US costs €4k+ per trip and burns 2 days in transit",
        "US customers defect to local competitors when SLA response exceeds 24 hours",
      ]}
      stats={[
        { value: '€4k+', label: 'per transatlantic dispatch' },
        { value: '2-3', label: 'US hubs covering 50 states (not enough)' },
        { value: '39%', label: 'faster resolution with AI guidance' },
      ]}
      howItWorks={[
        "Upload your complete product documentation — German, English, or mixed. Manuals, SOPs, wiring diagrams, error codes, CE compliance docs, firmware changelogs.",
        "We deploy US-based Field Service Engineers at your customer sites. They arrive guided by AI that has read your full documentation — no ramp-up period, no six-month training lag.",
        "Field intelligence flows back to your European engineering team. Every repair, every failure mode, every customer environment — captured and structured.",
        "Expand your US installed base without expanding your US headcount. Win multi-year service contracts that previously required a local team you couldn't staff.",
      ]}
      faqs={[
        {
          q: 'How do you handle CE-marked equipment with strict service protocols?',
          a: 'Our AI enforces your service procedures step-by-step. If your CE documentation specifies a particular test sequence or lockout procedure, the Field Service Engineer cannot skip it. Every step is logged for audit compliance.',
        },
        {
          q: 'Can your Field Service Engineers work alongside our existing US team?',
          a: 'Absolutely. Many European OEMs have 5-10 US-based engineers covering a 50-state territory. We augment that team — handling overflow, nights/weekends, and geographic gaps your hubs cannot reach.',
        },
        {
          q: 'What about warranty and liability?',
          a: 'We operate under your service protocols and quality standards. Our Field Service Engineers are insured, and every service event is documented to your specifications. The warranty relationship between you and your customer stays intact.',
        },
        {
          q: 'Do you support multiple European brands or just one?',
          a: 'Our Field Service Engineers are AI-guided, not brand-specialized. Each job loads the specific OEM documentation for that equipment. One Field Service Engineer can service KUKA on Monday and ABB on Tuesday — the AI handles the context switching.',
        },
      ]}
    />
  );
}
