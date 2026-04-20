import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import VerticalLanding from '@/components/VerticalLanding';
import { cities, getCityBySlug } from '@/data/cities';
import { getMachineTypeBySlug, machineTypes } from '@/data/machineTypes';
import { productSchema, breadcrumbSchema } from '@/lib/schema';

type RouteParams = { machine: string; city: string };

/**
 * Pre-render every (machine x city) combination at build time so each
 * URL ships as a static HTML page with its own title, meta description,
 * and city-specific copy.
 */
export function generateStaticParams(): RouteParams[] {
  const params: RouteParams[] = [];
  for (const machine of machineTypes) {
    for (const city of cities) {
      params.push({ machine: machine.slug, city: city.slug });
    }
  }
  return params;
}

/**
 * Only serve the combinations we listed above. Anything else 404s
 * so Google never indexes accidental URL shapes.
 */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { machine: machineSlug, city: citySlug } = await params;
  const machine = getMachineTypeBySlug(machineSlug);
  const city = getCityBySlug(citySlug);

  if (!machine || !city) {
    return {
      title: 'Page not found | Farhand',
    };
  }

  // Note: the root layout applies the "%s | Farhand" title template, so we
  // omit the " | Farhand" suffix here to avoid duplicating it in the <title>.
  const title = `${machine.displayName} Field Service in ${city.name}, ${city.state}`;
  const description = `On-demand, AI-guided ${machine.displayName.toLowerCase()} field service in ${city.name}, ${city.stateName}. Farhand dispatches Field Service Engineers across the ${city.metroArea} with your full documentation loaded into context.`;
  const canonicalPath = `/services/${machine.slug}/${city.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function MachineCityPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { machine: machineSlug, city: citySlug } = await params;
  const machine = getMachineTypeBySlug(machineSlug);
  const city = getCityBySlug(citySlug);

  if (!machine || !city) {
    notFound();
  }

  const headline = `${machine.displayName} service in ${city.name}, ${city.state}.`;
  const subheadline = `On-demand Field Service Engineers across the ${city.metroArea}, guided by AI that already knows your ${machine.displayName.toLowerCase()} — manuals, SOPs, wiring diagrams, and repair history loaded into context before they arrive on site.`;

  const url = `https://farhand.live/services/${machine.slug}/${city.slug}`;
  const serviceLd = productSchema({
    name: `${machine.displayName} Field Service in ${city.name}, ${city.state}`,
    description: `On-demand, AI-guided ${machine.displayName.toLowerCase()} field service in ${city.name}, ${city.stateName}. Farhand dispatches Field Service Engineers across the ${city.metroArea}.`,
    url,
    category: machine.displayName,
  });
  const crumbLd = breadcrumbSchema([
    { name: 'Home', url: 'https://farhand.live' },
    { name: 'Services', url: `https://farhand.live/services/${machine.slug}` },
    { name: `${city.name}, ${city.state}`, url },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }}
      />
      <VerticalLanding
      machineType={machine.displayName}
      headline={headline}
      subheadline={subheadline}
      painPoints={machine.painPoints}
      stats={machine.stats}
      howItWorks={machine.howItWorks}
      faqs={machine.faqs}
    />
    </>
  );
}
