import VerticalLanding from '@/components/VerticalLanding';

export const metadata = {
  title: 'Field Service for Chinese OEMs in the US',
  description: 'US field service for Chinese industrial equipment OEMs — SANY, Estun, Siasun, and more. AI-guided Field Service Engineers across every American zip code.',
};

export default function ChineseOEMsPage() {
  return (
    <VerticalLanding
      machineType="For Chinese OEMs"
      headline="Entering the US market is hard. Servicing it from Shanghai is harder."
      subheadline="AI-guided US Field Service Engineers who know your equipment before they arrive — so your American customers get the same service quality as your best team in China."
      painPoints={[
        "Building a US service org from scratch costs $2M+ in year one — and takes 18 months to ramp",
        "Trade tensions make hiring and visa sponsorship for Chinese engineers politically complex",
        "US customers will not buy equipment without a credible US-based service commitment",
      ]}
      stats={[
        { value: '$2M+', label: 'to build a US service team from scratch' },
        { value: '18mo', label: 'ramp time for a new service org' },
        { value: '86%', label: 'first-time fix rate with AI guidance' },
      ]}
      howItWorks={[
        "Upload your complete product documentation — Mandarin, English, or mixed. Manuals, SOPs, wiring diagrams, error codes, PLC programs, firmware changelogs.",
        "We deploy US-based Field Service Engineers at your customer sites. They arrive guided by AI that has read every page of your documentation. No visa requirements, no language barriers on-site.",
        "Remote triage handles routine issues without a truck roll. Your engineers in China can supervise complex repairs in real-time through the Relay platform.",
        "Your US service capability becomes a competitive advantage. Win deals against domestic competitors by offering same-day response in markets where you previously had no presence.",
      ]}
      faqs={[
        {
          q: 'How does this work if our documentation is only in Chinese?',
          a: 'Our AI reads documentation in any language, including simplified and traditional Chinese. Field Service Engineers receive English guidance derived from your original documentation. We recommend including bilingual labels for critical safety procedures.',
        },
        {
          q: 'Can we control what technical information the Field Service Engineers see?',
          a: 'Yes. You define what documentation is loaded into Relay and what access levels Field Service Engineers have. Trade secrets, proprietary PLC code, and sensitive IP can be gated behind approval workflows.',
        },
        {
          q: 'What if a US customer has concerns about a Chinese equipment supplier?',
          a: 'Having a US-based service partner with American Field Service Engineers and AI-guided quality standards directly addresses those concerns. Your customers deal with a local team — backed by your engineering excellence.',
        },
        {
          q: 'Do you handle installation as well as service?',
          a: 'Yes. Our Field Service Engineers handle installation, commissioning, training, and ongoing service. Your engineers can supervise the installation remotely and the AI ensures every step follows your factory procedures.',
        },
      ]}
    />
  );
}
