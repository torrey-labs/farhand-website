import VerticalLanding from '@/components/VerticalLanding';

export const metadata = {
  title: 'For Facilities | Farhand',
  description: 'AI-guided field service for facilities with installed equipment. On-demand Field Service Engineers who know your machines.',
};

export default function FacilitiesPage() {
  return (
    <VerticalLanding
      machineType="For Facilities"
      headline="Your facility runs on machines. We keep them running."
      subheadline="Hospitals, factories, warehouses, labs — any facility with installed equipment gets AI-guided Field Service Engineers who arrive knowing your exact systems."
      painPoints={[
        "Equipment vendors each have their own service contracts and response times",
        "Your maintenance team can't specialize in every machine brand",
        "When something breaks at 2am, there's nobody to call who knows the system",
      ]}
      stats={[
        { value: "1 in 3", label: "issues resolved remotely, no visit needed" },
        { value: "39%", label: "faster resolution with AI guidance" },
        { value: "26%", label: "service cost savings" },
      ]}
      howItWorks={[
        "We load documentation for every machine in your facility — regardless of brand or vendor.",
        "One number to call. One platform that knows all your equipment. AI dispatches the right Field Service Engineer with the right context.",
        "Remote resolution first — many issues are solved by phone with AI guidance before a truck ever rolls.",
        "Preventive recommendations based on your equipment's actual usage and service history.",
      ]}
      faqs={[
        {
          q: "Can you replace all our individual vendor service contracts?",
          a: "In many cases, yes. One Farhand relationship can cover multi-vendor equipment. The AI learns each machine individually from its own documentation.",
        },
        {
          q: "What types of facilities do you serve?",
          a: "Manufacturing plants, hospitals, warehouses, research labs, data centers, food processing facilities — any facility with installed machines that need service.",
        },
        {
          q: "How quickly can you respond?",
          a: "Remote triage begins immediately. On-site Field Service Engineers dispatched same-day for critical issues. We cover every zip code in the US.",
        },
        {
          q: "Do your Field Service Engineers need facility access training?",
          a: "Your access procedures and safety protocols are loaded into the AI. Field Service Engineers arrive briefed on site-specific requirements before they walk through the door.",
        },
      ]}
    />
  );
}
