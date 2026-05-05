import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { cities, getCityBySlug } from '@/data/cities';
import { cityCoords } from '@/data/cityCoords';
import { machineTypes } from '@/data/machineTypes';
import { localBusinessSchema, breadcrumbSchema } from '@/lib/schema';

type RouteParams = { city: string };

/**
 * Pre-render every city as a local hub page. Distinct from
 * /services/[machine]/[city] — those target service-keyword
 * + city queries. /locations/[city] targets local-pack queries
 * ("field service near me", "robot service in Chicago").
 *
 * One page per city. Renders LocalBusiness JSON-LD with the city's
 * geo, all 7 machine-type cross-links, and a per-city CTA.
 */
export function generateStaticParams(): RouteParams[] {
  return cities.map((city) => ({ city: city.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return { title: 'Page not found' };

  const title = `${city.name} Field Service — Robots & Industrial Machinery`;
  const description = `On-demand, AI-guided field service across the ${city.metroArea}. Robots, industrial machinery, medical equipment, instruments — every brand, every visit guided by AI that already knows your machine.`;
  const canonicalPath = `/locations/${city.slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
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

export default async function LocationPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const url = `https://farhand.ai/locations/${city.slug}`;
  const coords = cityCoords[city.slug];

  const localBizLd = localBusinessSchema({
    cityName: city.name,
    state: city.state,
    metroArea: city.metroArea,
    ...(coords ? { lat: coords.lat, lng: coords.lng } : {}),
    url,
    // rating: <when reviews land per location>
  });
  const crumbLd = breadcrumbSchema([
    { name: 'Home', url: 'https://farhand.ai' },
    { name: 'Locations', url: 'https://farhand.ai/locations' },
    { name: `${city.name}, ${city.state}`, url },
  ]);

  return (
    <main className="bg-background min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }}
      />
      <Navigation />

      <section className="pt-32 md:pt-40 lg:pt-48 pb-12 md:pb-16">
        <div className="container max-w-[900px] text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4">
            {city.metroArea}
          </p>
          <h1 className="mb-6">
            Field service in {city.name}, {city.state}.
          </h1>
          <h2 className="max-w-[680px] mx-auto font-normal mb-10">
            On-demand, AI-guided technicians for every robot brand and most
            industrial machinery. Closest-hub dispatch across the {city.metroArea}.
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
            <Button asChild size="lg">
              <Link href="/#schedule">Schedule a call</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/services">See all services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container max-w-[1100px]">
          <h3 className="text-xs uppercase tracking-[0.2em] text-light-gray/60 mb-8 text-center">
            What we service in {city.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {machineTypes.map((m) => (
              <Link
                key={m.slug}
                href={`/services/${m.slug}/${city.slug}`}
                className="block bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-accent/40 rounded-2xl p-5 transition-colors"
              >
                <h4 className="text-base md:text-lg font-medium text-foreground m-0 mb-2">
                  {m.displayName}
                </h4>
                <p className="text-sm text-light-gray/70 m-0">
                  in {city.name}, {city.state}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 border-t border-white/5">
        <div className="container max-w-[800px]">
          <h3 className="text-2xl md:text-3xl font-light mb-6">
            How it works in {city.name}
          </h3>
          <div className="text-light-gray/85 leading-relaxed space-y-4 text-base md:text-lg">
            <p>
              You call. We match the closest qualified Field Service Engineer
              from our nationwide network — vetted, insured, brand-certified.
              They arrive within 48 hours, typically same-day in dense metros
              like the {city.metroArea}.
            </p>
            <p>
              Before they show up, our AI platform — Farhand Relay — has already
              loaded your machine&apos;s manuals, SOPs, error-code dictionary, and
              repair history into context. The technician walks in already
              knowing your machine.
            </p>
            <p>
              Per-job pricing. No retainers, no minimums, no contracts. Insurance
              and travel are included.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container max-w-[1100px]">
          <h3 className="text-xs uppercase tracking-[0.2em] text-light-gray/60 mb-6">
            Other metros
          </h3>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {cities
              .filter((c) => c.slug !== city.slug)
              .slice(0, 30)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/locations/${c.slug}`}
                  className="text-sm md:text-base px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-accent/50 transition-colors"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
