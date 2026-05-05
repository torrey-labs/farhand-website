import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { CalloutBox, CTABlock, SectionHeader } from '@/components/sections';

export const metadata: Metadata = {
  title: 'Partners',
  description:
    'Farhand partners with industry organizations, equipment OEMs, and integrators to keep US factories running. Our partners, certifications, and the directories we contribute to.',
  alternates: { canonical: 'https://farhand.ai/partners' },
  openGraph: {
    title: 'Farhand — Partners & Industry Affiliations',
    description:
      'ARM Institute member. Conference partners. Robot OEM affiliations. Where Farhand shows up in the industrial-robotics ecosystem.',
    url: 'https://farhand.ai/partners',
    type: 'website',
  },
};

type Partner = {
  name: string;
  description: string;
  url: string;
  category:
    | 'Industry Body'
    | 'Conference'
    | 'OEM Ecosystem'
    | 'Press / Directory'
    | 'Tooling'
    | 'Customer'
    | 'Investor';
  status?: 'active' | 'planned';
};

// Living source of truth for who we partner with + which directories we
// list in. Each entry is a potential reciprocal-link target — every active
// partner can drop a link back to farhand.ai in their member directory.
const partners: Partner[] = [
  {
    name: 'ARM Institute',
    description:
      'Member of the Advanced Robotics for Manufacturing Institute, the US national institute for robotics in manufacturing. Members get directory placement at arminstitute.org.',
    url: 'https://www.arminstitute.org/',
    category: 'Industry Body',
    status: 'active',
  },
  {
    name: 'Field Service Next West',
    description:
      'Worldwide Business Research conference; we presented our AI-guided debugging tools track. Listed in their 2026 exhibitor directory.',
    url: 'https://fieldserviceusa.wbresearch.com/',
    category: 'Conference',
    status: 'active',
  },
  {
    name: 'A3 (Association for Advancing Automation)',
    description:
      'Trade body for robotics, vision, motion, and AI in North America. Pursuing certified-integrator listing.',
    url: 'https://www.automate.org/',
    category: 'Industry Body',
    status: 'planned',
  },
  {
    name: 'Robotics Business Review',
    description:
      'Industry directory for robotics companies. RBR50 listing pursued for our AI-guided service tooling.',
    url: 'https://www.roboticsbusinessreview.com/',
    category: 'Press / Directory',
    status: 'planned',
  },
  {
    name: 'IEEE RAS',
    description:
      'IEEE Robotics and Automation Society. Industry partner program for affiliated companies.',
    url: 'https://www.ieee-ras.org/',
    category: 'Industry Body',
    status: 'planned',
  },
  {
    name: 'Crunchbase',
    description: 'Public company profile listing.',
    url: 'https://www.crunchbase.com/organization/farhand',
    category: 'Press / Directory',
    status: 'planned',
  },
  {
    name: 'Product Hunt',
    description: 'Launch listing for Farhand Relay™ AI platform.',
    url: 'https://www.producthunt.com/products/farhand',
    category: 'Press / Directory',
    status: 'planned',
  },
  {
    name: 'F6S',
    description: 'Global startup directory + investor matching.',
    url: 'https://www.f6s.com/farhand',
    category: 'Press / Directory',
    status: 'planned',
  },
  {
    name: 'BetaList',
    description: 'Early-stage startup discovery.',
    url: 'https://betalist.com/',
    category: 'Press / Directory',
    status: 'planned',
  },
];

const groups: { title: string; category: Partner['category']; subtitle: string }[] = [
  {
    title: 'Industry bodies',
    category: 'Industry Body',
    subtitle: 'National institutes and trade associations.',
  },
  {
    title: 'Conferences',
    category: 'Conference',
    subtitle: 'Where we present, exhibit, or sponsor.',
  },
  {
    title: 'Press & directories',
    category: 'Press / Directory',
    subtitle: 'Industry directories and discovery platforms.',
  },
];

export default function PartnersPage() {
  return (
    <main className="bg-background min-h-screen">
      <Navigation />

      <section className="pt-32 md:pt-40 lg:pt-48 pb-12 md:pb-16">
        <div className="container max-w-[900px] text-center">
          <h1 className="mb-6">Partners &amp; affiliations</h1>
          <h2 className="max-w-[680px] mx-auto font-normal">
            Farhand works with industry organizations, OEMs, and integrators to keep
            US factories running. If you&apos;d like to partner, list us, or join
            forces — get in touch.
          </h2>
        </div>
      </section>

      {groups.map((group) => {
        const items = partners.filter((p) => p.category === group.category);
        if (items.length === 0) return null;
        return (
          <section key={group.category} className="py-10 md:py-14">
            <div className="container max-w-[1100px]">
              <SectionHeader title={group.title} subtitle={group.subtitle} align="left" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mt-8 md:mt-10">
                {items.map((p) => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener"
                    className="block bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-accent/40 rounded-2xl p-6 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl font-medium text-foreground m-0">{p.name}</h3>
                      {p.status === 'active' && (
                        <span className="text-[11px] uppercase tracking-wider text-accent shrink-0">
                          Active
                        </span>
                      )}
                      {p.status === 'planned' && (
                        <span className="text-[11px] uppercase tracking-wider text-light-gray/50 shrink-0">
                          Planned
                        </span>
                      )}
                    </div>
                    <p className="text-base text-light-gray/80 leading-relaxed m-0">
                      {p.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="py-10 md:py-14">
        <div className="container max-w-[900px]">
          <CalloutBox
            eyebrow="Want to partner?"
            title="If your organization works with US robotics, machinery, or factory operators — we want to talk."
            footer="Email aaryan@farhand.live with a one-line context and a link to your org."
          />
        </div>
      </section>

      <CTABlock
        title="Looking for service or onboarding instead?"
        subtitle="If you have a robot down or are an OEM evaluating coverage, schedule a call directly."
      />

      <Footer />
    </main>
  );
}
