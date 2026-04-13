# Component Library

This is a guide to every reusable component in the Farhand website. Use this when creating new pages.

**Live examples:** Visit [`/ui`](http://localhost:3000/ui) to see every component rendered with sample data.

---

## Quick Start: Creating a New Page

A typical marketing page is a Navigation + a few sections + Footer. Here's the pattern:

```tsx
// src/app/services/my-new-page/page.tsx
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FAQSection from '@/components/FAQSection';
import {
  PainPointGrid,
  StatsRow,
  FeatureGrid,
  StepsList,
  CalloutBox,
  CTABlock,
} from '@/components/sections';
import { coreFaqs } from '@/data/faqs';

export const metadata = {
  title: 'My New Page',
  description: 'Short description for SEO.',
};

export default function MyNewPage() {
  return (
    <main className="bg-background min-h-screen">
      <Navigation />

      {/* Hero section — custom per page */}
      <section className="pt-32 md:pt-40 pb-16 text-center">
        <div className="container max-w-[900px]">
          <h1 className="mb-6">Your headline here</h1>
          <h2 className="max-w-[750px] mx-auto mb-10">Your subheadline.</h2>
        </div>
      </section>

      <PainPointGrid
        title="The problem"
        items={['Pain 1', 'Pain 2', 'Pain 3']}
      />

      <StatsRow
        stats={[
          { value: '39%', label: 'faster resolution' },
          { value: '86%', label: 'first-time fix rate' },
          { value: '3x', label: 'ROI in year one' },
        ]}
      />

      <FeatureGrid
        title="How it works"
        features={[
          { title: 'Step 1', desc: 'Short description.' },
          { title: 'Step 2', desc: 'Short description.' },
          { title: 'Step 3', desc: 'Short description.' },
        ]}
      />

      <CTABlock
        title="Ready to get started?"
        subtitle="Schedule a call with our team."
      />

      <FAQSection faqs={coreFaqs} />

      <Footer />
    </main>
  );
}
```

**That's it.** Compose sections, pass props, ship.

---

## Section Components (`src/components/sections/`)

These are the pre-built sections. Import from `@/components/sections`.

### `SectionHeader`
Reusable title block with eyebrow + title + subtitle. Used inside other sections.

```tsx
<SectionHeader
  eyebrow="Our platform"
  title="Meet Farhand Relay"
  subtitle="The AI that becomes your senior technician."
  align="center" // or "left"
/>
```

### `PainPointGrid`
3-column glass cards with centered text. Perfect for listing problems.

```tsx
<PainPointGrid
  title="Sound familiar?"
  items={[
    "Travelling techs don't scale",
    "Outsourced contracts are slow and expensive",
    "Only your senior guy knows some repairs",
  ]}
/>
```

- **Props:** `eyebrow?`, `title?`, `subtitle?`, `items: string[]`
- Always renders 3 items in a grid. Don't pass more than 3 or they'll wrap awkwardly.

### `StatsRow`
Horizontal row of 3-4 big number stats. No cards — just centered numbers with labels.

```tsx
<StatsRow
  stats={[
    { value: '39%', label: 'faster resolution' },
    { value: '86%', label: 'first-time fix rate' },
    { value: '1 in 3', label: 'resolved remotely' },
  ]}
/>
```

- **Props:** `stats: { value: string; label: string }[]`
- Use percentages, ratios, or short phrases. Keep labels ≤6 words.

### `FeatureGrid`
3-column glass cards with optional icon, title, and description. Good for "how it works" sections.

```tsx
import { HelpCircle, Wrench, Infinity } from 'lucide-react';

<FeatureGrid
  title="Farhand Relay™"
  subtitle="Our AI platform that becomes your senior technician."
  features={[
    { title: 'Learns', desc: 'your documentation', icon: <HelpCircle size={20} /> },
    { title: 'Guides', desc: 'technicians during repairs', icon: <Wrench size={20} /> },
    { title: 'Improves', desc: 'by text and voice debriefs', icon: <Infinity size={20} /> },
  ]}
/>
```

- **Props:** `eyebrow?`, `title?`, `subtitle?`, `features: { title, desc, icon? }[]`
- Icons are optional but make cards feel more finished.
- Use Lucide React icons (already installed).

### `StepsList`
Numbered vertical list of steps. Each step gets an "01", "02" etc. on the left.

```tsx
<StepsList
  title="How it works"
  subtitle="Four steps from first call to resolution."
  steps={[
    'Upload your documentation — manuals, SOPs, error codes.',
    'A technician arrives guided by AI that knows your machine.',
    'Remote triage first — 1 in 3 issues resolved without a truck.',
    'Every repair improves the AI.',
  ]}
/>
```

- **Props:** `eyebrow?`, `title?`, `subtitle?`, `steps: string[]`
- Works best with 3-6 steps. Each step should be a full sentence.

### `CalloutBox`
Bordered container with centered title and optional eyebrow/footer. Used for hero-sized statements.

```tsx
<CalloutBox
  eyebrow="There's a better model"
  title="On-demand technicians guided by AI to service your machines like your own guys"
  footer="Every zip code in the US"
/>
```

- **Props:** `eyebrow?`, `title: string`, `footer?`
- Title should be the dramatic statement. Eyebrow and footer are short supporting lines.

### `CTABlock`
Centered CTA with heading + optional subtitle + button. Use at the end of pages.

```tsx
<CTABlock
  title="Ready to modernize your field service?"
  subtitle="Schedule a call — we'll set up Relay in days, not months."
  buttonText="Schedule a call" // default: "Schedule a call"
  buttonHref="/#schedule"      // default: "/#schedule"
/>
```

---

## FAQ Component (`src/components/FAQSection.tsx`)

Animated accordion built on shadcn + Radix. Emits Schema.org FAQ JSON-LD for rich snippets.

```tsx
import FAQSection from '@/components/FAQSection';
import { coreFaqs } from '@/data/faqs'; // shared FAQs

<FAQSection faqs={coreFaqs} />

// Or with custom FAQs
<FAQSection
  title="Custom FAQ title"
  subtitle="Optional subtitle"
  faqs={[
    { q: 'Question?', a: 'Answer.' },
  ]}
  includeSchema={true} // default; set false for non-canonical FAQs (like /ui sandbox)
/>
```

---

## UI Primitives (`src/components/ui/`)

Shadcn-style primitives. Import directly from `@/components/ui/*`.

### `Button`
```tsx
import { Button } from '@/components/ui/button';

<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="dark">Dark</Button>
<Button variant="link">Link</Button>

<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>

// With href (renders as <a>)
<Button asChild>
  <a href="/contact">Contact us</a>
</Button>
```

### `Card`
```tsx
import { Card } from '@/components/ui/card';

<Card>
  <h4>Card title</h4>
  <p>Card content. Has glass bg + hover lift built in.</p>
</Card>
```

### `Accordion`
```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

<Accordion type="single" collapsible defaultValue="item-0">
  <AccordionItem value="item-0">
    <AccordionTrigger>Question?</AccordionTrigger>
    <AccordionContent>Answer.</AccordionContent>
  </AccordionItem>
</Accordion>
```

Most pages should use `<FAQSection>` instead — it wraps this with schema markup and proper styling.

### `Separator`
```tsx
import { Separator } from '@/components/ui/separator';

<Separator />                        // horizontal
<Separator orientation="vertical" /> // vertical
```

---

## Shared Components (`src/components/`)

These are full page chrome — always include them.

- **`Navigation`** — fixed top nav with logo + Schedule a Call. Always include.
- **`Footer`** — full footer with CTA heading, email form, Cal.com embed, US map, links. Always include.
- **`VerticalLanding`** — pre-composed template for service/stakeholder pages. Takes machineType, headline, subheadline, painPoints, stats, howItWorks, faqs. Used by all `/services/*` and `/for/*` pages.
- **`BlogPost`** — wrapper for individual blog post pages. Takes title, date, category, children.

---

## Data Layer (`src/data/`)

Shared data to keep pages consistent.

- **`src/data/faqs.ts`** — `coreFaqs` array (7 most-conversion-relevant questions). Use on any page that needs FAQs.
- **`src/data/cities.ts`** — 75 US cities for programmatic SEO.
- **`src/data/machineTypes.ts`** — 7 machine types with pain points, stats, how-it-works, FAQs.

---

## Design Tokens (Tailwind v4 `@theme` in `src/app/globals.css`)

| Token | Value | Usage |
|-------|-------|-------|
| `bg-background` | `#000` | Every page background |
| `text-foreground` | `#f5f5f5` | Primary text |
| `text-light-gray` | `#d5d5d5` | Secondary text |
| `text-accent` | `#1aff67` | Green accent, CTAs, links |
| `border-border` | `rgba(255,255,255,0.08)` | Subtle borders |
| `font-serif` | Playfair Display | H1 headlines (italic) |
| `font-sans` | DM Sans | Everything else |

### Typography classes (from `globals.css`)
- `h1` — italic serif, huge, clamp 2.5rem–68px
- `h2` — sans-serif, 32px max
- `h3` — sans-serif, 34px max, light weight
- `h4` — sans-serif, 32px max
- `p` — 18px max, light-gray

Don't override these on landing pages — they're consistent by design.

### Spacing classes
Use Tailwind spacing utilities:
- Section padding: `py-12 md:py-16 lg:py-24` (standard)
- Hero top: `pt-24 md:pt-32 lg:pt-40`
- Blog top: `pt-32 md:pt-40 lg:pt-48`

Avoid arbitrary `[clamp(...)]` values — Tailwind v4 doesn't parse commas reliably.

---

## Patterns to Follow

1. **Always include `Navigation` + `Footer`** on top-level pages.
2. **Use `<main className="bg-background min-h-screen">`** as the root wrapper.
3. **Wrap page content in `<section>` blocks** so the section component styles flow naturally.
4. **Use the `container` class** (max-width 1100px, responsive padding) for text content.
5. **Import sections from the barrel:** `import { PainPointGrid, StatsRow } from '@/components/sections'`.
6. **Put shared data in `src/data/`**, not inline, so other pages can reuse it.
7. **Set `metadata`** on every page for SEO (title, description).
8. **Internal link liberally** to `/services/*`, `/for/*`, `/blog/*` — boosts SEO and user flow.

## Patterns to Avoid

- ❌ Don't write custom `style={{...}}` inline unless there's no Tailwind class.
- ❌ Don't use `clamp()` in Tailwind arbitrary values — use `md:` / `lg:` responsive classes.
- ❌ Don't duplicate FAQs — use `coreFaqs` from `src/data/faqs.ts`.
- ❌ Don't modify `Navigation`, `Footer`, or `globals.css` without a good reason.
- ❌ Don't create new `components/ui/*` files unless you're adding a shadcn primitive. Section-level components go in `components/sections/`.
