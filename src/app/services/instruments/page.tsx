import VerticalLanding from '@/components/VerticalLanding';

export const metadata = {
  title: 'Instrument Service & Calibration | Farhand',
  description: 'AI-guided field service for precision instruments, test equipment, and calibration systems. Nationwide Field Service Engineer coverage.',
};

export default function InstrumentsPage() {
  return (
    <VerticalLanding
      machineType="Instruments"
      headline="Precision instruments deserve precision service."
      subheadline="AI-guided Field Service Engineers for calibration, maintenance, and repair of your precision instruments and test equipment — with full technical context on every visit."
      painPoints={[
        "Instrument calibration requires techs who know the exact model and procedures",
        "Sending instruments back to the manufacturer takes weeks",
        "One miscalibrated instrument can invalidate an entire batch or study",
      ]}
      stats={[
        { value: "96%", label: "AI accuracy in guided troubleshooting" },
        { value: "13%", label: "more work orders resolved without parts" },
        { value: "39%", label: "faster resolution time" },
      ]}
      howItWorks={[
        "Upload calibration procedures, service manuals, tolerance specs, and compliance requirements into the AI platform.",
        "Field Service Engineer arrives on-site with AI guidance specific to your instrument model, its calibration history, and certification requirements.",
        "Remote diagnostics first — many calibration drift issues can be identified and guided through remotely.",
        "Full documentation trail for every service event — audit-ready compliance records.",
      ]}
      faqs={[
        {
          q: "What types of instruments do you service?",
          a: "Test and measurement equipment, analytical instruments, lab automation, environmental monitoring, spectroscopy, chromatography systems, and any precision instrument with service documentation.",
        },
        {
          q: "Can you handle ISO-compliant calibration?",
          a: "Our AI loads your exact calibration procedures and compliance requirements. Field Service Engineers follow them step-by-step, with full audit trails for ISO and regulatory documentation.",
        },
        {
          q: "Do you service instruments in the field or do they need to be sent in?",
          a: "Field service is our specialty. Field Service Engineers come to you — no shipping delays, no weeks without your equipment.",
        },
        {
          q: "How do you handle instruments from different manufacturers?",
          a: "We scope to your specific instrument. Your documentation is loaded into the AI, so the Field Service Engineer has brand-specific, model-specific guidance regardless of manufacturer.",
        },
      ]}
    />
  );
}
