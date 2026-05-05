import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { cities } from '@/data/cities';

export const metadata: Metadata = {
  title: 'Locations',
  description:
    'Farhand serves every US zip code. Browse our city hubs — robot and industrial-machinery field service across every major US metro.',
  alternates: { canonical: 'https://farhand.ai/locations' },
  openGraph: {
    title: 'Farhand — Locations across the US',
    description:
      'Field service hubs in every major US metro. Closest-hub dispatch, AI-guided technicians.',
    url: 'https://farhand.ai/locations',
    type: 'website',
  },
};

// Group cities by region for better skim-reading.
function groupByRegion(): Record<string, typeof cities> {
  const regions: Record<string, string[]> = {
    'Northeast': ['NY', 'NJ', 'CT', 'RI', 'MA', 'NH', 'VT', 'ME', 'PA'],
    'Southeast': ['DE', 'MD', 'DC', 'VA', 'WV', 'NC', 'SC', 'GA', 'FL', 'AL', 'MS', 'TN', 'KY', 'AR', 'LA'],
    'Midwest': ['OH', 'IN', 'IL', 'MI', 'WI', 'MN', 'IA', 'MO', 'ND', 'SD', 'NE', 'KS'],
    'South-Central': ['TX', 'OK'],
    'Mountain': ['MT', 'WY', 'CO', 'UT', 'ID', 'AZ', 'NM', 'NV'],
    'West': ['CA', 'OR', 'WA', 'AK', 'HI'],
  };
  const out: Record<string, typeof cities> = {};
  for (const [region, codes] of Object.entries(regions)) {
    out[region] = cities.filter((c) => codes.includes(c.state));
  }
  return out;
}

export default function LocationsIndex() {
  const grouped = groupByRegion();

  return (
    <main className="bg-background min-h-screen">
      <Navigation />

      <section className="pt-32 md:pt-40 lg:pt-48 pb-12 md:pb-16">
        <div className="container max-w-[900px] text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4">
            Nationwide coverage
          </p>
          <h1 className="mb-6">Field service in every US metro.</h1>
          <h2 className="max-w-[680px] mx-auto font-normal mb-10">
            {cities.length} city hubs across {Object.keys(grouped).length} regions.
            Pick yours — or schedule a call directly.
          </h2>
          <Button asChild size="lg">
            <Link href="/#schedule">Schedule a call</Link>
          </Button>
        </div>
      </section>

      {Object.entries(grouped).map(([region, regionCities]) => {
        if (regionCities.length === 0) return null;
        return (
          <section key={region} className="py-8 md:py-10 border-t border-white/5">
            <div className="container max-w-[1200px]">
              <h3 className="text-xs uppercase tracking-[0.2em] text-light-gray/60 mb-6">
                {region} <span className="text-light-gray/30">· {regionCities.length}</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2">
                {regionCities
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((c) => (
                    <Link
                      key={c.slug}
                      href={`/locations/${c.slug}`}
                      className="text-sm md:text-base text-light-gray/85 hover:text-accent py-1 transition-colors"
                    >
                      {c.name}, {c.state}
                    </Link>
                  ))}
              </div>
            </div>
          </section>
        );
      })}

      <Footer />
    </main>
  );
}
