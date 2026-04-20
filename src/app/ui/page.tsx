import { HelpCircle, Wrench, Infinity } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FAQSection from '@/components/FAQSection';
import {
  SectionHeader,
  PainPointGrid,
  StatsRow,
  FeatureGrid,
  StepsList,
  CalloutBox,
  CTABlock,
} from '@/components/sections';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'UI Sandbox',
  description: 'Component library for Farhand — reusable sections and primitives.',
  robots: { index: false, follow: false },
};

export default function UISandbox() {
  return (
    <main className="bg-background min-h-screen">
      <Navigation />

      <section className="pt-32 md:pt-40 pb-8 text-center">
        <div className="container">
          <p className="text-sm text-accent font-medium uppercase tracking-wider mb-4">
            Internal • Not indexed
          </p>
          <h1 className="mb-4">UI Sandbox</h1>
          <h2 className="max-w-[700px] mx-auto">
            Every reusable section and primitive. Copy the import, pass props, ship a page.
          </h2>
        </div>
      </section>

      <div className="container py-8">
        <Separator />
      </div>

      {/* SectionHeader example */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="container">
          <code className="text-accent text-sm block mb-6">
            {`<SectionHeader eyebrow="Eyebrow" title="Title" subtitle="Optional subtitle" />`}
          </code>
          <SectionHeader
            eyebrow="Section Header"
            title="This is the title"
            subtitle="And this is an optional subtitle that gives more context."
          />
        </div>
      </section>

      <div className="container">
        <Separator />
      </div>

      {/* PainPointGrid */}
      <div>
        <div className="container pt-16">
          <code className="text-accent text-sm block mb-4">
            {`<PainPointGrid title="Sound familiar?" items={["Pain 1", "Pain 2", "Pain 3"]} />`}
          </code>
        </div>
        <PainPointGrid
          title="Sound familiar?"
          items={[
            "Travelling techs don't scale",
            "Outsourced contracts are slow and expensive",
            "Only your senior guy knows some repairs",
          ]}
        />
      </div>

      <div className="container">
        <Separator />
      </div>

      {/* StatsRow */}
      <div>
        <div className="container pt-16">
          <code className="text-accent text-sm block mb-4">
            {`<StatsRow stats={[{value: "39%", label: "..."}]} />`}
          </code>
        </div>
        <StatsRow
          stats={[
            { value: '39%', label: 'faster resolution with AI' },
            { value: '86%', label: 'first-time fix rate' },
            { value: '1 in 3', label: 'issues resolved remotely' },
          ]}
        />
      </div>

      <div className="container">
        <Separator />
      </div>

      {/* FeatureGrid */}
      <div>
        <div className="container pt-16">
          <code className="text-accent text-sm block mb-4">
            {`<FeatureGrid title="Farhand Relay™" features={[{title, desc, icon}]} />`}
          </code>
        </div>
        <FeatureGrid
          title="Farhand Relay™"
          subtitle="Our AI platform that becomes your senior Field Service Engineer."
          features={[
            { title: 'Learns', desc: 'your documentation', icon: <HelpCircle size={20} /> },
            { title: 'Guides', desc: 'Field Service Engineers during repairs', icon: <Wrench size={20} /> },
            { title: 'Improves', desc: 'by text and voice debriefs', icon: <Infinity size={20} /> },
          ]}
        />
      </div>

      <div className="container">
        <Separator />
      </div>

      {/* StepsList */}
      <div>
        <div className="container pt-16">
          <code className="text-accent text-sm block mb-4">
            {`<StepsList title="How it works" steps={["Step 1", "Step 2", ...]} />`}
          </code>
        </div>
        <StepsList
          title="How it works"
          subtitle="Four steps from first call to resolution."
          steps={[
            'Upload your documentation — manuals, SOPs, error codes, firmware changelogs.',
            'A Field Service Engineer arrives guided by AI that knows your machine.',
            'Remote triage first — 1 in 3 issues resolved without rolling a truck.',
            'Every repair improves the AI. Your knowledge compounds.',
          ]}
        />
      </div>

      <div className="container">
        <Separator />
      </div>

      {/* CalloutBox */}
      <div>
        <div className="container pt-16">
          <code className="text-accent text-sm block mb-4">
            {`<CalloutBox eyebrow="..." title="..." footer="..." />`}
          </code>
        </div>
        <CalloutBox
          eyebrow="There's a better model"
          title="On-demand Field Service Engineers guided by AI to service your machines like your own guys"
          footer="Every zip code in the US"
        />
      </div>

      <div className="container">
        <Separator />
      </div>

      {/* CTABlock */}
      <div>
        <div className="container pt-16">
          <code className="text-accent text-sm block mb-4">
            {`<CTABlock title="..." subtitle="..." buttonText="Schedule a call" />`}
          </code>
        </div>
        <CTABlock
          title="Ready to modernize your field service?"
          subtitle="Schedule a call with our team — we'll set up your Relay instance in days."
        />
      </div>

      <div className="container">
        <Separator />
      </div>

      {/* FAQSection */}
      <div>
        <div className="container pt-16">
          <code className="text-accent text-sm block mb-4">
            {`<FAQSection title="..." faqs={[{q, a}]} />`}
          </code>
        </div>
        <FAQSection
          faqs={[
            { q: 'Is this a real question?', a: 'Yes, and this is the answer.' },
            { q: 'Does the accordion animate?', a: 'Click me to find out.' },
            { q: 'Can I have multiple FAQ sections on a page?', a: 'Yes, but the homepage already has one so pick a distinct title.' },
          ]}
          includeSchema={false}
        />
      </div>

      <div className="container">
        <Separator />
      </div>

      {/* Primitives: Button */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="container">
          <SectionHeader eyebrow="Primitives" title="Buttons" align="left" />
          <div className="flex flex-wrap gap-4 mb-12">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="dark">Dark</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>
      </section>

      <div className="container">
        <Separator />
      </div>

      {/* Primitives: Card */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="container">
          <SectionHeader eyebrow="Primitives" title="Cards" align="left" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <h4 className="mb-2">Card title</h4>
              <p>This is a card. It uses the glass background and has hover lift.</p>
            </Card>
            <Card>
              <div className="w-10 h-10 rounded-full border border-accent flex items-center justify-center text-accent mb-4">
                <HelpCircle size={18} />
              </div>
              <h4 className="mb-2">Card with icon</h4>
              <p>Add any content inside — icons, images, buttons.</p>
            </Card>
            <Card>
              <h4 className="mb-2">Third card</h4>
              <p>Cards auto-fill a grid. Use the grid classes from Tailwind.</p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
