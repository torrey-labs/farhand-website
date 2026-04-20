import VerticalLanding from '@/components/VerticalLanding';

export const metadata = {
  title: 'Industrial Machinery Service | Farhand',
  description: 'AI-guided field service for industrial machinery, CNC machines, and manufacturing equipment. On-demand Field Service Engineers nationwide.',
};

export default function IndustrialMachineryPage() {
  return (
    <VerticalLanding
      machineType="Industrial Machinery"
      headline="Your machines are smart. Your service should be too."
      subheadline="On-demand Field Service Engineers guided by AI to service your industrial machinery — CNC systems, production lines, and factory automation."
      painPoints={[
        "Outsourced service contracts are slow and expensive",
        "Travelling or regional Field Service Engineers don't scale",
        "When a unit goes down, it takes days to get someone who knows the system",
      ]}
      stats={[
        { value: "$22B", label: "preventive maintenance market by 2035" },
        { value: "26%", label: "service cost savings with AI" },
        { value: "53%", label: "first-time fix for bottom teams vs 86% for top" },
      ]}
      howItWorks={[
        "Upload your machinery documentation. Full manual loaded into context — no chunking, no retrieval errors, no missed context.",
        "On-site Field Service Engineer arrives with AI-powered diagnostics specific to your machine model and its repair history.",
        "Remote resolution first — 1 in 3 issues solvable without rolling a truck.",
        "Every repair improves the AI. Your knowledge compounds, your costs decrease.",
      ]}
      faqs={[
        {
          q: "What types of industrial machinery do you cover?",
          a: "CNC machines, lathes, mills, presses, injection molding, packaging lines, conveyor systems, and custom manufacturing equipment. Our AI adapts to any machine with documentation.",
        },
        {
          q: "How do you handle proprietary equipment?",
          a: "We scope to your specific machine model. Your documentation stays private and secure. The AI learns only your equipment — not a generic database.",
        },
        {
          q: "What's the typical response time?",
          a: "Remote triage begins immediately. On-site Field Service Engineers can be dispatched same-day for critical issues, with nationwide coverage across every US zip code.",
        },
        {
          q: "Can this replace our internal service team?",
          a: "It can supplement or replace. Many OEMs use Farhand to scale field service without hiring — AI + on-demand techs instead of a permanent headcount.",
        },
      ]}
    />
  );
}
