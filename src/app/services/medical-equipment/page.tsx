import VerticalLanding from '@/components/VerticalLanding';

export const metadata = {
  title: 'Medical Equipment Service | Farhand',
  description: 'AI-guided field service for medical devices, surgical systems, and pharmacy automation. Compliance-ready Field Service Engineers nationwide.',
};

export default function MedicalEquipmentPage() {
  return (
    <VerticalLanding
      machineType="Medical Equipment"
      headline="Patient care can't wait for a service call."
      subheadline="AI-guided Field Service Engineers for medical devices, surgical robots, imaging systems, and pharmacy automation — with full documentation context on every visit."
      painPoints={[
        "Medical equipment downtime directly impacts patient outcomes",
        "Compliance and regulatory requirements make repairs complex",
        "Specialized techs are scarce and expensive to keep on staff",
      ]}
      stats={[
        { value: "96%", label: "AI accuracy in guided troubleshooting" },
        { value: "20%", label: "reduction in service escalations" },
        { value: "3x", label: "ROI within first year" },
      ]}
      howItWorks={[
        "Load your device documentation — service manuals, compliance protocols, calibration procedures, error code databases.",
        "Field Service Engineers arrive with AI context covering your exact device model, its maintenance history, and regulatory requirements.",
        "Remote diagnostics resolve issues before they become emergencies. Predictive maintenance reduces unplanned downtime.",
        "Full audit trail on every service event for regulatory compliance.",
      ]}
      faqs={[
        {
          q: "Do your Field Service Engineers have medical device certifications?",
          a: "Our Field Service Engineers are guided by AI loaded with your specific compliance and service protocols. We match Field Service Engineers with relevant certifications to your equipment type.",
        },
        {
          q: "How do you handle HIPAA and compliance?",
          a: "All documentation is stored securely. Our platform maintains audit trails for every service interaction. We follow your compliance requirements as loaded into the AI.",
        },
        {
          q: "What medical equipment do you service?",
          a: "Surgical robots, imaging systems (MRI, CT, X-ray), pharmacy automation, lab automation, patient monitoring systems, and any medical device with serviceable documentation.",
        },
        {
          q: "Can you provide preventive maintenance schedules?",
          a: "Yes. Our AI recommends maintenance based on manufacturer specs, usage patterns, and repair history — helping you stay compliant and avoid unexpected failures.",
        },
      ]}
    />
  );
}
