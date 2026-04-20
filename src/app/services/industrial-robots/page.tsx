import VerticalLanding from '@/components/VerticalLanding';

export const metadata = {
  title: 'Industrial Robot Service | Farhand',
  description: 'AI-guided field service for industrial robotic arms, welding systems, and assembly automation. Nationwide coverage.',
};

export default function IndustrialRobotsPage() {
  return (
    <VerticalLanding
      machineType="Industrial Robots"
      headline="Keep your production line moving."
      subheadline="AI-guided Field Service Engineers for robotic arms, welding systems, packaging automation, and assembly lines — with full manual context on every visit."
      painPoints={[
        "A failed first visit adds 2 more visits and 14 extra days",
        "Bottom-performing techs cost 97% more than top performers",
        "The skills gap between your best and worst techs is costing you millions",
      ]}
      stats={[
        { value: "$1.4T", label: "in unplanned downtime annually" },
        { value: "21%", label: "accuracy increase with AI guidance" },
        { value: "1 in 7", label: "truck rolls are avoidable" },
      ]}
      howItWorks={[
        "Paste your manuals — SOPs, wiring diagrams, error codes, firmware changelogs. The agent builds a visual workflow your techs can follow.",
        "A Field Service Engineer arrives guided by AI that knows your industrial robot. Right diagnosis, right parts, first visit.",
        "Knowledge preservation — capture what your senior techs know before they retire. Make it searchable.",
        "New tech performs like a 10-year veteran on day one.",
      ]}
      faqs={[
        {
          q: "Which industrial robot brands do you support?",
          a: "Our AI platform is brand-agnostic. We load your specific documentation — whether it's for robotic arms, CNC machines, welding cells, or packaging systems. The AI learns your exact model.",
        },
        {
          q: "Can you handle emergency breakdowns?",
          a: "Yes. For production-critical downtime, we dispatch Field Service Engineers with full AI-guided context. Many issues are triaged remotely first to speed resolution.",
        },
        {
          q: "How does this compare to an OEM service contract?",
          a: "OEM contracts are slow and expensive. We provide the same technical depth — your full documentation loaded into AI — with faster response times and on-demand flexibility.",
        },
        {
          q: "Do you offer preventive maintenance?",
          a: "Yes. Our AI spots patterns before equipment fails and recommends preventive actions. Smarter diagnostics means fewer unnecessary replacements.",
        },
      ]}
    />
  );
}
