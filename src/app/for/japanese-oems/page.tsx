import VerticalLanding from '@/components/VerticalLanding';

export const metadata = {
  title: 'Field Service for Japanese OEMs in the US',
  description: 'US-based, AI-guided Field Service Engineers for FANUC, Yaskawa, Mitsubishi, Mazak, and Keyence equipment. Stop flying FSEs from Tokyo — we are already there.',
};

export default function JapaneseOEMsPage() {
  return (
    <VerticalLanding
      machineType="For Japanese OEMs"
      headline="Your machines are in America. Your service team shouldn't fly from Tokyo."
      subheadline="AI-guided Field Service Engineers across every US zip code who already know your FANUC, Yaskawa, Mitsubishi, or Mazak equipment — manuals, SOPs, and error codes loaded before they arrive."
      painPoints={[
        "Flying FSEs from Japan costs $5k+ per trip with a 14-hour timezone gap",
        "Your US customers expect 4-hour SLA response, not 48-hour international dispatch",
        "Knowledge stays in Osaka — when your senior engineer retires, the US installed base suffers",
      ]}
      stats={[
        { value: '$5k+', label: 'cost per international dispatch' },
        { value: '14h', label: 'timezone gap Japan → US' },
        { value: '86%', label: 'first-time fix rate with AI guidance' },
      ]}
      howItWorks={[
        "Upload your complete product documentation — Japanese and English manuals, SOPs, wiring diagrams, error codes, firmware changelogs.",
        "We deploy US-based Field Service Engineers at your customer sites, guided by AI that has read every page of your documentation. No ramp-up, no training lag.",
        "Your field intelligence flows back to Japan. Every repair, every failure mode, every pattern — captured in English and structured for your engineering team.",
        "Scale your US installed base without scaling headcount. Win renewals and expansions without building a US service org from scratch.",
      ]}
      faqs={[
        {
          q: 'Can your Field Service Engineers read Japanese documentation?',
          a: 'Our AI ingests documentation in any language — Japanese, English, mixed. The Field Service Engineer receives guidance in English, informed by your original Japanese manuals. Nothing is lost in translation because the AI reads the source directly.',
        },
        {
          q: 'How do you handle parts that ship from Japan?',
          a: 'We coordinate with your parts logistics. For common components, we pre-stage in US regional hubs. For specialty parts, we align the visit with your shipping timeline so the tech and the part arrive together.',
        },
        {
          q: 'What if our equipment requires factory-certified Field Service Engineers?',
          a: 'We work with your team to define certification requirements. Your engineers can train our Field Service Engineers remotely via the Relay platform, and AI guidance ensures every procedure matches your factory standards.',
        },
        {
          q: 'Can we white-label this under our brand?',
          a: 'Yes. Our Field Service Engineers represent your brand on-site. Your US customers experience what feels like your own service team — because the AI is trained on your exact documentation and procedures.',
        },
      ]}
    />
  );
}
