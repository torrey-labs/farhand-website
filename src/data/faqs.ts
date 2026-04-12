/**
 * Shared FAQ data for the Farhand website.
 * Used on homepage, blog index, and /faq page.
 *
 * Only the most conversion-relevant questions — the ones buyers actually ask.
 */

export interface FAQItem {
  q: string;
  a: string;
}

export const coreFaqs: FAQItem[] = [
  {
    q: 'How does AI-guided field service work?',
    a: 'You upload your documentation — manuals, SOPs, wiring diagrams, error codes, firmware changelogs. Our Relay platform loads the full manual into context. When a technician arrives, they have AI-powered step-by-step guidance specific to your machine, its history, and its current state. No chunking. No retrieval errors. No missed context.',
  },
  {
    q: 'What types of machines do you service?',
    a: 'Robots (collaborative, industrial, autonomous mobile), industrial machinery, medical equipment, precision instruments, and aviation ground equipment. Our AI adapts to any machine with service documentation — we scope to your specific model.',
  },
  {
    q: 'What areas do you cover?',
    a: 'Every zip code in the United States. We dispatch on-demand technicians nationwide, all guided by the same AI platform so service quality is consistent from coast to coast.',
  },
  {
    q: 'How fast can you respond to an issue?',
    a: 'Remote triage begins immediately — 1 in 3 service queries can be resolved without sending anyone. For issues that need boots on the ground, we dispatch same-day for critical problems.',
  },
  {
    q: 'How is this different from a staffing agency or OEM service contract?',
    a: 'Staffing sends bodies. OEM contracts are slow and expensive. We send AI-guided technicians who arrive knowing your machine — your full documentation loaded into AI, so every tech performs like your best senior expert. No long-term contracts required.',
  },
  {
    q: 'Is my documentation secure?',
    a: 'Yes. Your documentation stays private and is scoped only to your equipment — never shared with a generic database or other customers. Full audit trails on every service event.',
  },
  {
    q: 'How do I get started and what does it cost?',
    a: 'Schedule a call with our team. Share your equipment documentation and we set up your Relay instance in days, not months. Pricing varies by volume and equipment complexity — most companies find it cheaper than building an internal service team or relying on OEM contracts.',
  },
];
