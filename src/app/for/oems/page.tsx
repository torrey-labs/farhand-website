import VerticalLanding from '@/components/VerticalLanding';

export const metadata = {
  title: 'For OEMs | Farhand',
  description: 'Scale your field service without scaling headcount. AI-guided Field Service Engineers nationwide for robot and machine OEMs.',
};

export default function OEMsPage() {
  return (
    <VerticalLanding
      machineType="For OEMs"
      headline="Scale field service without scaling headcount."
      subheadline="You built a next-gen machine. Don't run it on last-gen ops. AI-guided Field Service Engineers that service your machines like your own guys — in every zip code."
      painPoints={[
        "Hiring and training field techs doesn't scale with your deployments",
        "Your best tech can't be everywhere at once",
        "Every OEM is building smarter machines and running them on dumber ops",
      ]}
      stats={[
        { value: "50%", label: "operational cost savings" },
        { value: "10x", label: "deployment expansion capacity" },
        { value: "93%", label: "reduction in break/fix calls" },
      ]}
      howItWorks={[
        "Load your complete product documentation into Relay — manuals, SOPs, wiring diagrams, error codes, firmware changelogs.",
        "We deploy AI-guided Field Service Engineers at your customer sites. They arrive knowing your machine — no ramp-up, no training lag.",
        "Your field intelligence feeds back to product. Every repair, every pattern, every failure mode — captured and searchable.",
        "Unlock new revenue — win renewals and expansions through better customer success without building a service org.",
      ]}
      faqs={[
        {
          q: "How is Farhand different from a staffing agency?",
          a: "Staffing sends bodies. We send AI-guided Field Service Engineers who arrive knowing your machine. They train techs. We train AI. Your documentation becomes the teacher.",
        },
        {
          q: "Can you white-label the service under our brand?",
          a: "Yes. Our Field Service Engineers can represent your brand on-site. The service experience feels like your own team — because the AI is trained on your exact documentation.",
        },
        {
          q: "What if we already have some field techs?",
          a: "Relay works for your internal team too. Load your docs, give your techs AI guidance. Boost your bottom 25% to average and save ~17% in service costs.",
        },
        {
          q: "How do you handle product feedback from the field?",
          a: "Every service event captures data — failure modes, common issues, part failures. This intelligence feeds back to your product and engineering teams.",
        },
      ]}
    />
  );
}
