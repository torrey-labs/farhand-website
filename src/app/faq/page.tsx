import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const faqs = [
  {
    q: "What does Farhand do?",
    a: "Farhand provides AI-guided field service technicians for robots, industrial machinery, medical equipment, and other complex machines. Our AI platform learns your documentation and guides technicians during repairs — so they perform like your best senior tech, everywhere.",
  },
  {
    q: "How does the AI-guided service work?",
    a: "You upload your documentation — manuals, SOPs, wiring diagrams, error codes, firmware changelogs. Our Relay platform loads the full manual into context. When a technician arrives, they have AI-powered step-by-step guidance specific to your machine, its history, and its current state.",
  },
  {
    q: "What types of machines do you service?",
    a: "Robots (collaborative, industrial, autonomous mobile), industrial machinery (CNC, packaging, assembly lines), medical equipment (surgical robots, imaging systems), precision instruments, aviation ground equipment, and any commercial or industrial equipment with service documentation.",
  },
  {
    q: "What areas do you cover?",
    a: "Every zip code in the United States. We have on-demand technicians nationwide, guided by our AI platform.",
  },
  {
    q: "How fast can you respond to an issue?",
    a: "Remote triage begins immediately. On-site technicians can be dispatched same-day for critical issues. Many issues are resolved remotely first — 1 in 3 service queries can be resolved without sending anyone.",
  },
  {
    q: "How is Farhand different from a staffing agency?",
    a: "Staffing sends bodies. We send AI-guided technicians who arrive knowing your machine. They train techs. We train AI. Your documentation becomes the teacher — so every tech performs like a 10-year veteran on day one.",
  },
  {
    q: "How is this different from an OEM service contract?",
    a: "OEM contracts are slow and expensive. We provide the same technical depth — your full documentation loaded into AI — with faster response times and on-demand flexibility. No long-term contracts required.",
  },
  {
    q: "What is Farhand Relay?",
    a: "Relay is our AI platform that becomes your senior technician. It learns your documentation, guides technicians during repairs, and improves by text and voice debriefs. Full manual loaded into context — no chunking, no retrieval errors, no missed context.",
  },
  {
    q: "Can I use Relay for my own internal team?",
    a: "Yes. Relay works for your internal technicians too. Load your docs, give your team AI guidance from the same platform. Boost your bottom performers to average and save ~17% in service costs.",
  },
  {
    q: "Is my documentation secure?",
    a: "Yes. Your documentation stays private and secure. The AI learns only your equipment — it's scoped to your specific machine model, not a generic database.",
  },
  {
    q: "How do I get started?",
    a: "Schedule a call with our team. Share your equipment documentation and we set up your Relay instance. The process takes days, not months.",
  },
  {
    q: "What does it cost?",
    a: "Pricing varies by volume and equipment complexity. Most companies find it far cheaper than building an internal service team or relying on OEM contracts. Schedule a call to discuss your specific needs.",
  },
];

export const metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Farhand AI-guided field service for robots, industrial machinery, and equipment.',
};

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <main style={{ background: '#000', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navigation />

      <section style={{ padding: 'clamp(8rem, 15vw, 12rem) 0 clamp(3rem, 8vw, 5rem)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h1 style={{ marginBottom: '1rem' }}>Frequently asked questions</h1>
          <h2 style={{ maxWidth: '600px', margin: '0 auto' }}>
            Everything you need to know about Farhand and AI-guided field service.
          </h2>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(4rem, 10vw, 8rem)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                padding: '1.5rem 0',
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              <h4 style={{ fontSize: 'clamp(17px, 2vw, 20px)', fontWeight: 500, color: 'var(--foreground)', marginBottom: '0.75rem' }}>
                {faq.q}
              </h4>
              <p style={{ fontSize: '16px', color: 'var(--light-gray)', lineHeight: 1.6, margin: 0, opacity: 0.9 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
