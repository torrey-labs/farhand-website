/**
 * Machine type definitions for Farhand programmatic SEO landing pages.
 *
 * Each entry powers one service vertical at /services/SLUG and all of its
 * city-level permutations at /services/SLUG/CITY. Content is consolidated
 * from the existing src/app/services/SLUG/page.tsx files so both the
 * canonical vertical page and the programmatic pages can share one source
 * of truth.
 */

export interface MachineTypeStat {
  value: string;
  label: string;
}

export interface MachineTypeFAQ {
  q: string;
  a: string;
}

export interface MachineType {
  /** URL slug — matches the existing services folder names like "robots" or "instruments" */
  slug: string;
  /** Display name used in headings and metadata */
  displayName: string;
  /** One-line pitch used in listings and meta descriptions */
  shortDescription: string;
  /** Three machine-specific pain points */
  painPoints: string[];
  /** Three headline stats (Aquant / Siemens benchmarks) */
  stats: MachineTypeStat[];
  /** Four-step Farhand Relay walkthrough */
  howItWorks: string[];
  /** Four FAQ pairs */
  faqs: MachineTypeFAQ[];
}

export const machineTypes: MachineType[] = [
  {
    slug: 'robots',
    displayName: 'Robots',
    shortDescription:
      'AI-guided Field Service Engineers for robot maintenance, repair, and field support. On-demand service across every zip code in the US.',
    painPoints: [
      'When a unit goes down, it takes days to get someone who knows the system',
      'Only your senior guy knows some repairs',
      '1 in 7 onsite service visits is completely unnecessary',
    ],
    stats: [
      { value: '4.66M', label: 'robots in operation worldwide' },
      { value: '39%', label: 'faster resolution with AI' },
      { value: '86%', label: 'first-time fix rate, top teams' },
    ],
    howItWorks: [
      'Upload your documentation — manuals, SOPs, wiring diagrams, error codes. The AI loads the full manual into context. No chunking. No retrieval errors.',
      'A Field Service Engineer arrives on-site guided by AI that knows your robot. Step-by-step repair guidance from your own documentation.',
      'After every job, the AI improves by text and voice debriefs. Your knowledge compounds over time.',
      '1 in 3 issues resolved without rolling a truck. AI + phone = fixed.',
    ],
    faqs: [
      {
        q: 'What types of robots do you service?',
        a: 'We service all commercial and industrial robots — collaborative robots (cobots), autonomous mobile robots (AMRs), robotic arms, AGVs, and custom robotic platforms. Our AI learns your specific robot model.',
      },
      {
        q: 'How does AI-guided service work?',
        a: 'We load your complete documentation into our Relay platform. When a Field Service Engineer arrives, they have AI-powered step-by-step guidance specific to your robot, its history, and its current state.',
      },
      {
        q: 'What areas do you cover?',
        a: 'Every zip code in the US. We have on-demand Field Service Engineers nationwide, guided by our AI platform so they perform like your best senior tech.',
      },
      {
        q: 'How fast can you respond?',
        a: 'For critical issues, we can have a Field Service Engineer on-site within hours. Many issues are resolved remotely first — 1 in 3 service queries can be resolved without sending anyone.',
      },
    ],
  },
  {
    slug: 'industrial-robots',
    displayName: 'Industrial Robots',
    shortDescription:
      'AI-guided field service for industrial robotic arms, welding systems, and assembly automation. Nationwide coverage.',
    painPoints: [
      'A failed first visit adds 2 more visits and 14 extra days',
      'Bottom-performing techs cost 97% more than top performers',
      'The skills gap between your best and worst techs is costing you millions',
    ],
    stats: [
      { value: '$1.4T', label: 'in unplanned downtime annually' },
      { value: '21%', label: 'accuracy increase with AI guidance' },
      { value: '1 in 7', label: 'truck rolls are avoidable' },
    ],
    howItWorks: [
      'Paste your manuals — SOPs, wiring diagrams, error codes, firmware changelogs. The agent builds a visual workflow your techs can follow.',
      'A Field Service Engineer arrives guided by AI that knows your industrial robot. Right diagnosis, right parts, first visit.',
      'Knowledge preservation — capture what your senior techs know before they retire. Make it searchable.',
      'New tech performs like a 10-year veteran on day one.',
    ],
    faqs: [
      {
        q: 'Which industrial robot brands do you support?',
        a: 'Our AI platform is brand-agnostic. We load your specific documentation — whether it\'s for robotic arms, CNC machines, welding cells, or packaging systems. The AI learns your exact model.',
      },
      {
        q: 'Can you handle emergency breakdowns?',
        a: 'Yes. For production-critical downtime, we dispatch Field Service Engineers with full AI-guided context. Many issues are triaged remotely first to speed resolution.',
      },
      {
        q: 'How does this compare to an OEM service contract?',
        a: 'OEM contracts are slow and expensive. We provide the same technical depth — your full documentation loaded into AI — with faster response times and on-demand flexibility.',
      },
      {
        q: 'Do you offer preventive maintenance?',
        a: 'Yes. Our AI spots patterns before equipment fails and recommends preventive actions. Smarter diagnostics means fewer unnecessary replacements.',
      },
    ],
  },
  {
    slug: 'industrial-machinery',
    displayName: 'Industrial Machinery',
    shortDescription:
      'AI-guided field service for industrial machinery, CNC machines, and manufacturing equipment. On-demand Field Service Engineers nationwide.',
    painPoints: [
      'Outsourced service contracts are slow and expensive',
      "Travelling or regional Field Service Engineers don't scale",
      'When a unit goes down, it takes days to get someone who knows the system',
    ],
    stats: [
      { value: '$22B', label: 'preventive maintenance market by 2035' },
      { value: '26%', label: 'service cost savings with AI' },
      { value: '53%', label: 'first-time fix for bottom teams vs 86% for top' },
    ],
    howItWorks: [
      'Upload your machinery documentation. Full manual loaded into context — no chunking, no retrieval errors, no missed context.',
      'On-site Field Service Engineer arrives with AI-powered diagnostics specific to your machine model and its repair history.',
      'Remote resolution first — 1 in 3 issues solvable without rolling a truck.',
      'Every repair improves the AI. Your knowledge compounds, your costs decrease.',
    ],
    faqs: [
      {
        q: 'What types of industrial machinery do you cover?',
        a: 'CNC machines, lathes, mills, presses, injection molding, packaging lines, conveyor systems, and custom manufacturing equipment. Our AI adapts to any machine with documentation.',
      },
      {
        q: 'How do you handle proprietary equipment?',
        a: 'We scope to your specific machine model. Your documentation stays private and secure. The AI learns only your equipment — not a generic database.',
      },
      {
        q: "What's the typical response time?",
        a: 'Remote triage begins immediately. On-site Field Service Engineers can be dispatched same-day for critical issues, with nationwide coverage across every US zip code.',
      },
      {
        q: 'Can this replace our internal service team?',
        a: 'It can supplement or replace. Many OEMs use Farhand to scale field service without hiring — AI + on-demand techs instead of a permanent headcount.',
      },
    ],
  },
  {
    slug: 'instruments',
    displayName: 'Instruments',
    shortDescription:
      'AI-guided field service for precision instruments, test equipment, and calibration systems. Nationwide Field Service Engineer coverage.',
    painPoints: [
      'Instrument calibration requires techs who know the exact model and procedures',
      'Sending instruments back to the manufacturer takes weeks',
      'One miscalibrated instrument can invalidate an entire batch or study',
    ],
    stats: [
      { value: '96%', label: 'AI accuracy in guided troubleshooting' },
      { value: '13%', label: 'more work orders resolved without parts' },
      { value: '39%', label: 'faster resolution time' },
    ],
    howItWorks: [
      'Upload calibration procedures, service manuals, tolerance specs, and compliance requirements into the AI platform.',
      'Field Service Engineer arrives on-site with AI guidance specific to your instrument model, its calibration history, and certification requirements.',
      'Remote diagnostics first — many calibration drift issues can be identified and guided through remotely.',
      'Full documentation trail for every service event — audit-ready compliance records.',
    ],
    faqs: [
      {
        q: 'What types of instruments do you service?',
        a: 'Test and measurement equipment, analytical instruments, lab automation, environmental monitoring, spectroscopy, chromatography systems, and any precision instrument with service documentation.',
      },
      {
        q: 'Can you handle ISO-compliant calibration?',
        a: 'Our AI loads your exact calibration procedures and compliance requirements. Field Service Engineers follow them step-by-step, with full audit trails for ISO and regulatory documentation.',
      },
      {
        q: 'Do you service instruments in the field or do they need to be sent in?',
        a: 'Field service is our specialty. Field Service Engineers come to you — no shipping delays, no weeks without your equipment.',
      },
      {
        q: 'How do you handle instruments from different manufacturers?',
        a: 'We scope to your specific instrument. Your documentation is loaded into the AI, so the Field Service Engineer has brand-specific, model-specific guidance regardless of manufacturer.',
      },
    ],
  },
  {
    slug: 'equipment',
    displayName: 'Equipment',
    shortDescription:
      'AI-guided field service for commercial and industrial equipment. On-demand Field Service Engineers with full documentation context.',
    painPoints: [
      "Travelling or regional Field Service Engineers don't scale",
      'Outsourced service contracts are slow and expensive',
      'Failed visits cost 44% of total service costs for bottom performers',
    ],
    stats: [
      { value: '68%', label: 'of service leaders plan AI workflows' },
      { value: '1 in 3', label: 'queries resolved without a truck roll' },
      { value: '87%', label: 'employee retention at top companies' },
    ],
    howItWorks: [
      'Load your equipment docs — installation guides, troubleshooting trees, parts catalogs, service bulletins.',
      'Field Service Engineer shows up with AI-powered, step-by-step guidance built from your own documentation.',
      'Faster onboarding — new tech performs like a 10-year veteran on day one.',
      'Parts optimization — smarter diagnostics means fewer unnecessary replacements.',
    ],
    faqs: [
      {
        q: 'What kinds of equipment do you service?',
        a: 'Any commercial or industrial equipment with service documentation — HVAC systems, power generation, water treatment, food processing, packaging, printing, and more.',
      },
      {
        q: 'How is this different from a staffing agency?',
        a: 'Staffing sends bodies. We send AI-guided Field Service Engineers who arrive knowing your equipment. The AI loads your full manual — no chunking, no retrieval errors.',
      },
      {
        q: 'Can you handle installations as well as repairs?',
        a: 'Yes. Installation, commissioning, preventive maintenance, break/fix, and decommissioning. The AI guides every stage with your specific procedures.',
      },
      {
        q: 'How do you ensure quality?',
        a: 'Every tech follows AI-guided steps from your documentation. After every job, the AI improves by debrief. Your knowledge compounds — quality only goes up.',
      },
    ],
  },
  {
    slug: 'medical-equipment',
    displayName: 'Medical Equipment',
    shortDescription:
      'AI-guided field service for medical devices, surgical systems, and pharmacy automation. Compliance-ready Field Service Engineers nationwide.',
    painPoints: [
      'Medical equipment downtime directly impacts patient outcomes',
      'Compliance and regulatory requirements make repairs complex',
      'Specialized techs are scarce and expensive to keep on staff',
    ],
    stats: [
      { value: '96%', label: 'AI accuracy in guided troubleshooting' },
      { value: '20%', label: 'reduction in service escalations' },
      { value: '3x', label: 'ROI within first year' },
    ],
    howItWorks: [
      'Load your device documentation — service manuals, compliance protocols, calibration procedures, error code databases.',
      'Field Service Engineers arrive with AI context covering your exact device model, its maintenance history, and regulatory requirements.',
      'Remote diagnostics resolve issues before they become emergencies. Predictive maintenance reduces unplanned downtime.',
      'Full audit trail on every service event for regulatory compliance.',
    ],
    faqs: [
      {
        q: 'Do your Field Service Engineers have medical device certifications?',
        a: 'Our Field Service Engineers are guided by AI loaded with your specific compliance and service protocols. We match Field Service Engineers with relevant certifications to your equipment type.',
      },
      {
        q: 'How do you handle HIPAA and compliance?',
        a: 'All documentation is stored securely. Our platform maintains audit trails for every service interaction. We follow your compliance requirements as loaded into the AI.',
      },
      {
        q: 'What medical equipment do you service?',
        a: 'Surgical robots, imaging systems (MRI, CT, X-ray), pharmacy automation, lab automation, patient monitoring systems, and any medical device with serviceable documentation.',
      },
      {
        q: 'Can you provide preventive maintenance schedules?',
        a: 'Yes. Our AI recommends maintenance based on manufacturer specs, usage patterns, and repair history — helping you stay compliant and avoid unexpected failures.',
      },
    ],
  },
  {
    slug: 'general-aviation',
    displayName: 'General Aviation',
    shortDescription:
      'AI-guided field service for aviation ground equipment, avionics, and aircraft systems. Nationwide Field Service Engineer network.',
    painPoints: [
      'Aviation equipment failures cause cascading delays and safety risks',
      'FAA-compliant repairs require Field Service Engineers who know the exact system',
      'Specialized aviation techs are concentrated in major hubs, not where you need them',
    ],
    stats: [
      { value: '39%', label: 'faster resolution with AI guidance' },
      { value: '14%', label: 'of truck rolls are avoidable' },
      { value: '17%', label: 'service cost savings by leveling skills' },
    ],
    howItWorks: [
      'Upload aviation technical manuals, maintenance procedures, airworthiness directives, and service bulletins into the AI platform.',
      'Field Service Engineers arrive with full context — knowing your exact equipment, its service history, and applicable compliance requirements.',
      'Remote triage identifies whether a ground visit is needed. Many issues are diagnosed and resolved without dispatching.',
      'Every service event is documented for compliance and continuous improvement.',
    ],
    faqs: [
      {
        q: 'What aviation equipment do you service?',
        a: 'Ground support equipment (GSE), avionics test equipment, aircraft maintenance tools, hangar automation, and aviation-specific industrial systems. Our AI adapts to any documented equipment.',
      },
      {
        q: 'Are your Field Service Engineers aviation-certified?',
        a: 'We match Field Service Engineers with relevant certifications to your equipment. The AI ensures every tech follows your exact procedures and compliance requirements regardless of their prior experience.',
      },
      {
        q: 'How do you handle compliance documentation?',
        a: 'Full audit trails on every service event. Your compliance procedures are loaded into the AI, ensuring Field Service Engineers follow them step-by-step with no shortcuts.',
      },
      {
        q: "What's your coverage for remote airports?",
        a: 'Every zip code in the US. Our on-demand model means Field Service Engineers are available even in underserved areas — guided by AI so they perform like your best specialist.',
      },
    ],
  },
];

/** Lookup a machine type by its URL slug. Returns undefined if not found. */
export function getMachineTypeBySlug(slug: string): MachineType | undefined {
  return machineTypes.find((m) => m.slug === slug);
}
