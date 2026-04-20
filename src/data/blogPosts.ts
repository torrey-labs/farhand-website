export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
};

export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'kuka-robot-service-us',
    title: 'KUKA Robot Service in the US: What European OEMs Need to Know',
    excerpt: '30,000+ KUKA robots in North America, serviced from a handful of hubs. The coverage gap and how AI-guided Field Service Engineers close it.',
    date: '2026-04-15',
    category: 'Industry',
  },
  {
    slug: 'yaskawa-robot-maintenance-us',
    title: 'Yaskawa Robot Maintenance: US Field Service Challenges',
    excerpt: 'Motoman robots are everywhere in US manufacturing. Maintaining them from Miamisburg alone doesn\'t scale. The AI-guided alternative.',
    date: '2026-04-15',
    category: 'Technical',
  },
  {
    slug: 'tsmc-supplier-equipment-service',
    title: 'TSMC Supplier Equipment Service: Scaling with US Fab Expansion',
    excerpt: 'TSMC Arizona needs Taiwanese equipment OEMs to provide US-based service. The CHIPS Act timeline and how AI-guided Field Service Engineers solve it.',
    date: '2026-04-15',
    category: 'Industry',
  },
  {
    slug: 'siemens-industrial-service-us',
    title: 'Siemens Industrial Equipment Service in the US',
    excerpt: 'SINUMERIK, SIMATIC, SINAMICS — Siemens covers metros well but leaves gaps. How to augment with AI-guided Field Service Engineers.',
    date: '2026-04-15',
    category: 'Industry',
  },
  {
    slug: 'semiconductor-equipment-field-service-benchmarks',
    title: 'Semiconductor Equipment Field Service: 2026 Benchmarks and the Downtime Economics',
    excerpt: 'Fab downtime costs hit $3–10M per hour. Service benchmarks for ASML, Applied, Lam, TEL, KLA. Why MTTR under 2 hours is the only number that matters.',
    date: '2026-04-14',
    category: 'Insights',
  },
  {
    slug: 'medical-device-field-service-fda-compliance',
    title: 'Medical Device Field Service: FDA 21 CFR 820 Compliance Guide',
    excerpt: 'Every service visit is a regulatory event. What 21 CFR 820 requires, how to stay audit-ready, and why AI-guided workflows cut 483 risk to zero.',
    date: '2026-04-14',
    category: 'Technical',
  },
  {
    slug: 'field-service-kpis-that-matter-2026',
    title: 'Field Service KPIs That Actually Matter in 2026',
    excerpt: 'Most dashboards track 20+ metrics. Only 8 predict customer retention and margin. The leading indicators, the lagging ones, and a scorecard template.',
    date: '2026-04-14',
    category: 'Insights',
  },
  {
    slug: 'field-service-roi-calculator',
    title: 'How to Calculate Field Service ROI in 2026',
    excerpt: 'A practical framework: truck roll costs, first-time fix multipliers, downtime savings, and the AI compounding effect. Build a defensible ROI model.',
    date: '2026-04-12',
    category: 'Insights',
  },
  {
    slug: 'fanuc-robot-maintenance-checklist',
    title: 'FANUC Robot Maintenance: A Complete Service Checklist',
    excerpt: 'Daily, monthly, and annual service tasks for FANUC robots. Battery replacement, grease intervals, encoder calibration, and the failures you avoid.',
    date: '2026-04-12',
    category: 'Technical',
  },
  {
    slug: 'industrial-robot-downtime-cost',
    title: 'The True Cost of Downtime for Industrial Robots',
    excerpt: 'Unplanned downtime costs $1.4T globally. Per-hour losses hit $2.3M in automotive. The iceberg beneath truck rolls and why MTTR is the only lever.',
    date: '2026-04-12',
    category: 'Insights',
  },
  {
    slug: 'predictive-vs-preventive-maintenance',
    title: 'Predictive Maintenance vs Preventive Maintenance: Which Wins?',
    excerpt: 'The data, the tradeoffs, and the hybrid that actually works. Why neither approach alone closes the first-time fix gap — and what does.',
    date: '2026-04-12',
    category: 'Technology',
  },
  {
    slug: 'remote-diagnostics-field-service',
    title: 'Remote Diagnostics: The $14B Opportunity in Field Service',
    excerpt: '1 in 3 tickets can be resolved remotely. The global market is projected at $14B by 2030. Three-tier triage and who captures the upside.',
    date: '2026-04-12',
    category: 'Industry',
  },
  {
    slug: 'oem-field-service-scaling',
    title: "Why OEMs Can't Scale Internal Service Teams",
    excerpt: 'Hiring bottlenecks, geographic sprawl, knowledge loss, SLA traps. Why the W-2-only service org ends, and what replaces it.',
    date: '2026-04-12',
    category: 'Industry',
  },
  {
    slug: 'field-service-knowledge-management',
    title: 'Knowledge Management for Field Service Teams',
    excerpt: 'Why SharePoint and Confluence fail service techs at the point of repair. How AI-guided workflows finally fix the retrieval problem.',
    date: '2026-04-12',
    category: 'Insights',
  },
  {
    slug: 'reduce-truck-rolls-ai',
    title: 'How AI Reduces Truck Rolls by 40%',
    excerpt: 'Dispatcher calculus flips when AI gives remote triage full context. 30-40% truck roll reduction is the new benchmark. Here is the math.',
    date: '2026-04-12',
    category: 'Technology',
  },
  {
    slug: 'field-service-trends-2026',
    title: 'The Future of Field Service: 2026 and Beyond',
    excerpt: 'Seven trends reshaping the category: AI-guided workflows, remote-first triage, outcome-based contracts, the skills cliff, and more.',
    date: '2026-04-12',
    category: 'Industry',
  },
  {
    slug: 'cobot-maintenance-guide',
    title: 'Cobot Maintenance Guide: Collaborative Robot Service Best Practices',
    excerpt: 'Daily checks, joint intervals, safety validation, and the failure modes unique to UR, FANUC CRX, Doosan, and Techman cobots.',
    date: '2026-04-12',
    category: 'Technical',
  },
  {
    slug: 'ai-guided-field-service-robots',
    title: 'AI-Guided Field Service for Robots: Why the Old Model is Broken',
    excerpt: '1 in 7 onsite service visits is completely unnecessary. A failed first visit adds 2 more visits and 14 extra days. AI changes everything.',
    date: '2026-04-10',
    category: 'Industry',
  },
  {
    slug: 'field-service-skills-gap',
    title: 'The Field Service Skills Gap Is Costing You Millions',
    excerpt: 'Bottom-performing techs cost 97% more than top performers. The skills gap between your best and worst techs is the biggest hidden cost in field service.',
    date: '2026-04-09',
    category: 'Insights',
  },
  {
    slug: 'remote-resolution-field-service',
    title: '1 in 3 Service Issues Can Be Resolved Without Sending Anyone',
    excerpt: "1 in 5 cases could be resolved remotely but still get a truck roll. AI + phone = fixed. Here's how remote resolution works.",
    date: '2026-04-08',
    category: 'Technology',
  },
  {
    slug: 'knowledge-preservation-field-service',
    title: 'Your Senior Tech Is Retiring. Is Their Knowledge Retiring Too?',
    excerpt: 'Capture what your senior techs know before they leave. Make it searchable. New tech performs like a 10-year veteran on day one.',
    date: '2026-04-07',
    category: 'Insights',
  },
  {
    slug: 'first-time-fix-rate-ai',
    title: 'How AI Pushes First-Time Fix Rates from 53% to 86%',
    excerpt: 'Top teams achieve 86% first-time fix rate. Bottom teams: 53%. The difference is knowledge access. AI closes the gap.',
    date: '2026-04-06',
    category: 'Technology',
  },
];
