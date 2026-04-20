import VerticalLanding from '@/components/VerticalLanding';

export const metadata = {
  title: 'Robot Field Service | Farhand',
  description: 'AI-guided Field Service Engineers for robot maintenance, repair, and field support. On-demand service across every zip code in the US.',
};

export default function RobotsPage() {
  return (
    <VerticalLanding
      machineType="Robots"
      headline="Your robots deployed. Our techs keep them running."
      subheadline="AI-guided Field Service Engineers that show up knowing your robot — SOPs, wiring diagrams, error codes, firmware changelogs, repair history."
      painPoints={[
        "When a unit goes down, it takes days to get someone who knows the system",
        "Only your senior guy knows some repairs",
        "1 in 7 onsite service visits is completely unnecessary",
      ]}
      stats={[
        { value: "4.66M", label: "robots in operation worldwide" },
        { value: "39%", label: "faster resolution with AI" },
        { value: "86%", label: "first-time fix rate, top teams" },
      ]}
      howItWorks={[
        "Upload your documentation — manuals, SOPs, wiring diagrams, error codes. The AI loads the full manual into context. No chunking. No retrieval errors.",
        "A Field Service Engineer arrives on-site guided by AI that knows your robot. Step-by-step repair guidance from your own documentation.",
        "After every job, the AI improves by text and voice debriefs. Your knowledge compounds over time.",
        "1 in 3 issues resolved without rolling a truck. AI + phone = fixed.",
      ]}
      faqs={[
        {
          q: "What types of robots do you service?",
          a: "We service all commercial and industrial robots — collaborative robots (cobots), autonomous mobile robots (AMRs), robotic arms, AGVs, and custom robotic platforms. Our AI learns your specific robot model.",
        },
        {
          q: "How does AI-guided service work?",
          a: "We load your complete documentation into our Relay platform. When a Field Service Engineer arrives, they have AI-powered step-by-step guidance specific to your robot, its history, and its current state.",
        },
        {
          q: "What areas do you cover?",
          a: "Every zip code in the US. We have on-demand Field Service Engineers nationwide, guided by our AI platform so they perform like your best senior tech.",
        },
        {
          q: "How fast can you respond?",
          a: "For critical issues, we can have a Field Service Engineer on-site within hours. Many issues are resolved remotely first — 1 in 3 service queries can be resolved without sending anyone.",
        },
      ]}
    />
  );
}
