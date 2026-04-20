import VerticalLanding from '@/components/VerticalLanding';

export const metadata = {
  title: 'Field Service for Taiwanese OEMs in the US',
  description: 'US field service for Taiwanese equipment OEMs — TSMC suppliers, Delta, Hiwin, Foxconn. AI-guided Field Service Engineers supporting the US fab expansion.',
};

export default function TaiwaneseOEMsPage() {
  return (
    <VerticalLanding
      machineType="For Taiwanese OEMs"
      headline="Your equipment powers American fabs. Your service shouldn't fly from Hsinchu."
      subheadline="AI-guided Field Service Engineers across the US who already know your equipment — documentation, error codes, and procedures loaded before they step into the cleanroom."
      painPoints={[
        "Arizona, Ohio, and Texas fab expansions need immediate US-based service — flying engineers from Taiwan takes 3+ days",
        "CHIPS Act timelines are aggressive — your US customers cannot wait for international dispatch on break-fix",
        "Only 2-3 of your engineers know the US-installed tool variants, and they are already oversubscribed",
      ]}
      stats={[
        { value: '$8M+', label: 'per hour of fab line downtime' },
        { value: '3+ days', label: 'round-trip Taiwan → US dispatch' },
        { value: '1 in 3', label: 'issues resolved remotely with AI' },
      ]}
      howItWorks={[
        "Upload your complete product documentation — Mandarin, English, or mixed. Manuals, SOPs, SECS/GEM specs, error codes, firmware changelogs, cleanroom protocols.",
        "We deploy US-based Field Service Engineers at your customer fabs. They arrive guided by AI that has read your full documentation — including the tool variants your US customers operate.",
        "Remote triage first. Our AI correlates fault codes with probable causes in under a minute — a 3-hour OEM call compressed to 60 seconds. One-in-three tickets resolved without a site visit.",
        "Every service event feeds data back to your engineering team in Taiwan. Failure patterns, environmental conditions, customer-specific configurations — structured and searchable.",
      ]}
      faqs={[
        {
          q: 'Can your Field Service Engineers work in cleanroom environments?',
          a: 'Yes. Our Field Service Engineers are cleanroom-certified and trained in gowning, ESD protocols, and contamination control procedures specific to semiconductor environments.',
        },
        {
          q: 'How do you handle ITAR or export-controlled equipment?',
          a: 'We work with your compliance team to ensure all Field Service Engineers have appropriate clearances and that no controlled technical data is shared beyond authorized channels. Our AI processes documentation on-premise when required.',
        },
        {
          q: 'What about the CHIPS Act service requirements?',
          a: 'CHIPS Act recipients need to demonstrate domestic service capability. Having a US-based, AI-guided service network strengthens your customers\' compliance posture and your value proposition as an equipment supplier.',
        },
        {
          q: 'Can your AI read Mandarin documentation?',
          a: 'Yes. Our AI ingests documentation in any language. The Field Service Engineer receives guidance in English, informed by your original Mandarin manuals and specifications.',
        },
      ]}
    />
  );
}
