import VerticalLanding from '@/components/VerticalLanding';

export const metadata = {
  title: 'Equipment Field Service | Farhand',
  description: 'AI-guided field service for commercial and industrial equipment. On-demand Field Service Engineers with full documentation context.',
};

export default function EquipmentPage() {
  return (
    <VerticalLanding
      machineType="Equipment"
      headline="Every OEM is building smarter equipment. Run it on smarter ops."
      subheadline="On-demand Field Service Engineers guided by AI to install, maintain, and repair your equipment at customer sites — like your own guys, everywhere."
      painPoints={[
        "Travelling or regional Field Service Engineers don't scale",
        "Outsourced service contracts are slow and expensive",
        "Failed visits cost 44% of total service costs for bottom performers",
      ]}
      stats={[
        { value: "68%", label: "of service leaders plan AI workflows" },
        { value: "1 in 3", label: "queries resolved without a truck roll" },
        { value: "87%", label: "employee retention at top companies" },
      ]}
      howItWorks={[
        "Load your equipment docs — installation guides, troubleshooting trees, parts catalogs, service bulletins.",
        "Field Service Engineer shows up with AI-powered, step-by-step guidance built from your own documentation.",
        "Faster onboarding — new tech performs like a 10-year veteran on day one.",
        "Parts optimization — smarter diagnostics means fewer unnecessary replacements.",
      ]}
      faqs={[
        {
          q: "What kinds of equipment do you service?",
          a: "Any commercial or industrial equipment with service documentation — HVAC systems, power generation, water treatment, food processing, packaging, printing, and more.",
        },
        {
          q: "How is this different from a staffing agency?",
          a: "Staffing sends bodies. We send AI-guided Field Service Engineers who arrive knowing your equipment. The AI loads your full manual — no chunking, no retrieval errors.",
        },
        {
          q: "Can you handle installations as well as repairs?",
          a: "Yes. Installation, commissioning, preventive maintenance, break/fix, and decommissioning. The AI guides every stage with your specific procedures.",
        },
        {
          q: "How do you ensure quality?",
          a: "Every tech follows AI-guided steps from your documentation. After every job, the AI improves by debrief. Your knowledge compounds — quality only goes up.",
        },
      ]}
    />
  );
}
