import VerticalLanding from '@/components/VerticalLanding';

export const metadata = {
  title: 'For Fleet Operators | Farhand',
  description: 'AI-guided field service for robot and machine fleets. Maximize uptime with on-demand Field Service Engineers who know your equipment.',
};

export default function FleetOperatorsPage() {
  return (
    <VerticalLanding
      machineType="For Fleet Operators"
      headline="One AI platform. Your entire fleet. Every location."
      subheadline="You operate machines across dozens of sites. Our AI learns your fleet and dispatches Field Service Engineers who arrive knowing every unit."
      painPoints={[
        "Managing service across multiple locations is a logistics nightmare",
        "Different techs at different sites means inconsistent service quality",
        "Unplanned downtime at any site costs revenue across the network",
      ]}
      stats={[
        { value: "$1.4T", label: "global unplanned downtime cost annually" },
        { value: "44%", label: "of service costs from failed first visits" },
        { value: "86%", label: "first-time fix rate with AI guidance" },
      ]}
      howItWorks={[
        "Load documentation for every machine type in your fleet. One platform, one source of truth.",
        "Any site, any issue — a Field Service Engineer arrives with AI guidance specific to that unit's model, history, and site context.",
        "Predictive maintenance across the fleet. AI spots patterns before equipment fails at any location.",
        "Centralized visibility into service events, costs, and performance across all sites.",
      ]}
      faqs={[
        {
          q: "Can you service different machine types across our fleet?",
          a: "Yes. Our AI loads documentation per machine model. One platform handles your entire mixed fleet — robots, industrial machines, instruments, and equipment.",
        },
        {
          q: "How do you handle multi-site operations?",
          a: "Every zip code in the US. We dispatch the nearest available Field Service Engineer, pre-loaded with AI context for the specific unit at that specific site.",
        },
        {
          q: "Can we see service data across all our sites?",
          a: "Yes. Every service event is captured. You get fleet-wide visibility into failure patterns, costs, and Field Service Engineer performance.",
        },
        {
          q: "What if we already have internal maintenance staff at some sites?",
          a: "Relay works for your internal team too. Give your staff AI guidance from the same platform. Farhand techs supplement where you don't have coverage.",
        },
      ]}
    />
  );
}
