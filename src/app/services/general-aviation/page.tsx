import VerticalLanding from '@/components/VerticalLanding';

export const metadata = {
  title: 'General Aviation Equipment Service | Farhand',
  description: 'AI-guided field service for aviation ground equipment, avionics, and aircraft systems. Nationwide Field Service Engineer network.',
};

export default function GeneralAviationPage() {
  return (
    <VerticalLanding
      machineType="General Aviation"
      headline="Ground support that keeps you in the air."
      subheadline="AI-guided Field Service Engineers for aviation ground equipment, avionics systems, and aircraft support infrastructure — with complete technical documentation on every dispatch."
      painPoints={[
        "Aviation equipment failures cause cascading delays and safety risks",
        "FAA-compliant repairs require Field Service Engineers who know the exact system",
        "Specialized aviation techs are concentrated in major hubs, not where you need them",
      ]}
      stats={[
        { value: "39%", label: "faster resolution with AI guidance" },
        { value: "14%", label: "of truck rolls are avoidable" },
        { value: "17%", label: "service cost savings by leveling skills" },
      ]}
      howItWorks={[
        "Upload aviation technical manuals, maintenance procedures, airworthiness directives, and service bulletins into the AI platform.",
        "Field Service Engineers arrive with full context — knowing your exact equipment, its service history, and applicable compliance requirements.",
        "Remote triage identifies whether a ground visit is needed. Many issues are diagnosed and resolved without dispatching.",
        "Every service event is documented for compliance and continuous improvement.",
      ]}
      faqs={[
        {
          q: "What aviation equipment do you service?",
          a: "Ground support equipment (GSE), avionics test equipment, aircraft maintenance tools, hangar automation, and aviation-specific industrial systems. Our AI adapts to any documented equipment.",
        },
        {
          q: "Are your Field Service Engineers aviation-certified?",
          a: "We match Field Service Engineers with relevant certifications to your equipment. The AI ensures every tech follows your exact procedures and compliance requirements regardless of their prior experience.",
        },
        {
          q: "How do you handle compliance documentation?",
          a: "Full audit trails on every service event. Your compliance procedures are loaded into the AI, ensuring Field Service Engineers follow them step-by-step with no shortcuts.",
        },
        {
          q: "What's your coverage for remote airports?",
          a: "Every zip code in the US. Our on-demand model means Field Service Engineers are available even in underserved areas — guided by AI so they perform like your best specialist.",
        },
      ]}
    />
  );
}
