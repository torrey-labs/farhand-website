import VerticalLanding from '@/components/VerticalLanding';

export const metadata = {
  title: 'For Distributors | Farhand',
  description: 'Offer AI-guided field service to your equipment customers. Add service revenue without building a service team.',
};

export default function DistributorsPage() {
  return (
    <VerticalLanding
      machineType="For Distributors"
      headline="Add field service to your offering. Without building a team."
      subheadline="Your customers need service after the sale. Farhand gives you AI-guided Field Service Engineers nationwide — so you can offer service without the overhead."
      painPoints={[
        "Customers expect service, but building a team is expensive",
        "Third-party service contracts are slow and don't know your products",
        "Losing customers to competitors who bundle service with equipment",
      ]}
      stats={[
        { value: "3x", label: "ROI within first year" },
        { value: "18%", label: "increase in service level" },
        { value: "20%", label: "reduction in escalations" },
      ]}
      howItWorks={[
        "Share equipment documentation for the products you distribute. Our AI learns every model in your catalog.",
        "When your customers need service, we dispatch AI-guided Field Service Engineers who know the exact equipment.",
        "You offer a complete solution — equipment + service — without hiring a single Field Service Engineer.",
        "Customer satisfaction drives renewals and referrals. Service becomes a revenue center, not a cost center.",
      ]}
      faqs={[
        {
          q: "Can we brand the service as our own?",
          a: "Yes. Field Service Engineers can represent your brand. Your customers see seamless service from the company they bought from.",
        },
        {
          q: "We distribute equipment from multiple manufacturers. Can you handle that?",
          a: "Absolutely. Our AI loads documentation per equipment model. One platform covers your entire product catalog.",
        },
        {
          q: "How do we get started?",
          a: "Share your equipment documentation and we set up your Relay instance. Schedule a call to walk through the process — it takes days, not months.",
        },
        {
          q: "What does it cost?",
          a: "Pricing varies by volume and equipment complexity. Most distributors find it far cheaper than building an internal service team. Schedule a call to discuss your specific needs.",
        },
      ]}
    />
  );
}
