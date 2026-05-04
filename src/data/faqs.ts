/**
 * Shared FAQ data for the Farhand homepage + blog index.
 *
 * Only the most conversion-relevant questions — the ones buyers actually
 * ask. Tight phrasing optimised for skim-reading on a marketing page.
 *
 * NOTE: /faq page (src/app/faq/page.tsx) has its own 12-question array
 * with longer, more thorough answers. They're intentionally separate
 * because the contexts are different — a marketing page rewards
 * brevity, a dedicated FAQ page rewards completeness. If a question
 * exists in both places, keep the wording divergent on purpose.
 */

export interface FAQItem {
  q: string;
  a: string;
}

export const coreFaqs: FAQItem[] = [
  {
    q: 'How does AI-guided field service work?',
    a: 'Every Field Service Engineer performs like your senior engineer. Knows your machine. Knows your process. Knows the history. Calls close faster. First-time-fix rates up.',
  },
  {
    q: 'What types of machines do you service?',
    a: 'Robots and Automation Systems. Industrial machinery. Medical equipment. Precision instruments. Consumer Equipment.',
  },
  {
    q: 'What areas do you cover?',
    a: 'Every US zip code. Service Engineers available within a short drive. Same service quality everywhere.',
  },
  {
    q: 'How fast can you respond to an issue?',
    a: 'Remote triage starts immediately. 1 in 3 issues resolved without anyone onsite. Same-day dispatch when needed.',
  },
  {
    q: 'How is this different from a staffing agency or OEM service contract?',
    a: 'Staffing sends bodies that you have to manage. OEMs are slow and expensive. We send Field Service Engineers who arrive knowing your machine. No long-term contracts.',
  },
  {
    q: 'How do you price?',
    a: 'You only pay for usage. Pay for our engineers\u2019 time on your client sites. Insurance and travel comes with, on us.',
  },
  {
    q: 'Is my documentation secure?',
    a: 'Yes. Private and scoped to your equipment. Never shared. Full audit trails on every call.',
  },
  {
    q: 'How do I get started?',
    a: 'Book a call. We take two weeks to onboard our AI and show you how it works. Then you pay only for usage!',
  },
];
