import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: "What does Farhand do?",
    a: "Farhand provides AI-guided Field Service Engineers for robots, industrial machinery, medical equipment, and other complex machines. Our AI platform learns your documentation and guides Field Service Engineers during repairs — so they perform like your best senior tech, everywhere.",
  },
  {
    q: "How does the AI-guided service work?",
    a: "You upload your documentation — manuals, SOPs, wiring diagrams, error codes, firmware changelogs. Our Relay platform loads the full manual into context. When a Field Service Engineer arrives, they have AI-powered step-by-step guidance specific to your machine, its history, and its current state.",
  },
  {
    q: "What types of machines do you service?",
    a: "Robots (collaborative, industrial, autonomous mobile), industrial machinery (CNC, packaging, assembly lines), medical equipment (surgical robots, imaging systems), precision instruments, aviation ground equipment, and any commercial or industrial equipment with service documentation.",
  },
  {
    q: "What areas do you cover?",
    a: "Every zip code in the United States. We have on-demand Field Service Engineers nationwide, guided by our AI platform.",
  },
  {
    q: "How fast can you respond to an issue?",
    a: "Remote triage begins immediately. On-site Field Service Engineers can be dispatched same-day for critical issues. Many issues are resolved remotely first — 1 in 3 service queries can be resolved without sending anyone.",
  },
  {
    q: "How is Farhand different from a staffing agency?",
    a: "Staffing sends bodies. We send AI-guided Field Service Engineers who arrive knowing your machine. They train techs. We train AI. Your documentation becomes the teacher — so every tech performs like a 10-year veteran on day one.",
  },
  {
    q: "How is this different from an OEM service contract?",
    a: "OEM contracts are slow and expensive. We provide the same technical depth — your full documentation loaded into AI — with faster response times and on-demand flexibility. No long-term contracts required.",
  },
  {
    q: "What is Farhand Relay?",
    a: "Relay is our AI platform that becomes your senior Field Service Engineer. It learns your documentation, guides Field Service Engineers during repairs, and improves by text and voice debriefs. Full manual loaded into context — no chunking, no retrieval errors, no missed context.",
  },
  {
    q: "Can I use Relay for my own internal team?",
    a: "Yes. Relay works for your internal Field Service Engineers too. Load your docs, give your team AI guidance from the same platform. Boost your bottom performers to average and save ~17% in service costs.",
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
    <main className="bg-background min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navigation />

      <section className="pt-32 md:pt-40 lg:pt-48 pb-12 md:pb-16 lg:pb-20">
        <div className="container max-w-[800px] text-center">
          <h1 className="mb-4">Frequently asked questions</h1>
          <h2 className="max-w-[600px] mx-auto">
            Everything you need to know about Farhand and AI-guided field service.
          </h2>
        </div>
      </section>

      <section className="pb-16 md:pb-24 lg:pb-32">
        <div className="container max-w-[800px]">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-lg sm:text-xl">{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </main>
  );
}
