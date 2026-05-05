const SITE_URL = 'https://farhand.ai';
const ORG_NAME = 'Farhand';
const ORG_LOGO = `${SITE_URL}/logo-w-type-light-on-dark.png`;
const DEFAULT_OG = `${SITE_URL}/opengraph-image`;

type ArticleSchemaInput = {
  title: string;
  description: string;
  datePublished: string;
  url: string;
  imageUrl?: string;
  author?: string;
};

export function articleSchema({
  title,
  description,
  datePublished,
  url,
  imageUrl,
  author = ORG_NAME,
}: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    author: {
      '@type': 'Organization',
      name: author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      logo: {
        '@type': 'ImageObject',
        url: ORG_LOGO,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: imageUrl ?? DEFAULT_OG,
  };
}

type ProductSchemaInput = {
  name: string;
  description: string;
  url: string;
  category?: string;
  /** When provided, areaServed becomes a City entity with geo coords. */
  city?: {
    name: string;
    state: string;
    lat?: number;
    lng?: number;
  };
};

export function productSchema({ name, description, url, category, city }: ProductSchemaInput) {
  // If a city is supplied, build a City-typed areaServed (with geo when we
  // have coords). Otherwise fall back to country-level. Google's Service
  // rich-result spec rewards more specific area data.
  const areaServed = city
    ? {
        '@type': 'City',
        name: `${city.name}, ${city.state}`,
        ...(city.lat !== undefined && city.lng !== undefined
          ? {
              geo: {
                '@type': 'GeoCoordinates',
                latitude: city.lat,
                longitude: city.lng,
              },
            }
          : {}),
        containedInPlace: {
          '@type': 'Country',
          name: 'United States',
        },
      }
    : {
        '@type': 'Country',
        name: 'United States',
      };

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed,
    ...(category ? { category } : {}),
  };
}

/**
 * Aggregate review schema — render when we have at least one verified
 * review. Until then, every consumer should pass `undefined` and the
 * Service / Organization schemas will skip the field.
 *
 * Once Google Business Profile is claimed and reviews start landing,
 * we can either:
 *   1. Pull from GBP API → Notion → here (hourly cron).
 *   2. Hand-curate the top reviews into a JSON file under src/data/.
 *
 * Either way, the schema rendering is the same.
 */
export type AggregateRatingInput = {
  /** 1-5 average score, e.g. 4.9 */
  ratingValue: number;
  /** Total number of reviews aggregated, e.g. 47 */
  reviewCount: number;
  /** Best possible rating on this scale; default 5. */
  bestRating?: number;
};

export function aggregateRatingSchema({
  ratingValue,
  reviewCount,
  bestRating = 5,
}: AggregateRatingInput) {
  return {
    '@type': 'AggregateRating',
    ratingValue,
    reviewCount,
    bestRating,
    worstRating: 1,
  };
}

export type ReviewInput = {
  author: string;
  /** 1-5 */
  rating: number;
  /** ISO date the review was published */
  datePublished: string;
  body: string;
  /** Optional: org name of the reviewer's company */
  organization?: string;
};

export function reviewSchema(r: ReviewInput) {
  return {
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: r.author,
      ...(r.organization
        ? {
            worksFor: { '@type': 'Organization', name: r.organization },
          }
        : {}),
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: r.rating,
      bestRating: 5,
      worstRating: 1,
    },
    datePublished: r.datePublished,
    reviewBody: r.body,
  };
}

/**
 * LocalBusiness schema for a city hub page (`/locations/[city]`).
 *
 * IMPORTANT: this is for SERVICE-AREA businesses — we do NOT claim a
 * physical storefront in each city. `address` points at the legal HQ;
 * `areaServed` is the metro. This is the legitimate way to mark up
 * city-level service presence without violating Google's policies on
 * fake locations.
 */
export type LocationBusinessInput = {
  cityName: string;
  state: string;
  metroArea: string;
  lat?: number;
  lng?: number;
  url: string;
  /** Override default — once we collect reviews per location. */
  rating?: AggregateRatingInput;
};

export function localBusinessSchema(input: LocationBusinessInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${input.url}#localbusiness`,
    name: `Farhand — ${input.cityName} Field Service`,
    description: `On-demand, AI-guided robot and industrial-machinery field service across the ${input.metroArea}. Dispatched by Farhand from the closest hub.`,
    url: input.url,
    image: DEFAULT_OG,
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '16192 Coastal Highway',
      addressLocality: 'Lewes',
      addressRegion: 'DE',
      postalCode: '19958',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: `${input.cityName}, ${input.state}`,
      ...(input.lat !== undefined && input.lng !== undefined
        ? {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: input.lat,
              longitude: input.lng,
            },
          }
        : {}),
      containedInPlace: {
        '@type': 'Country',
        name: 'United States',
      },
    },
    serviceArea: {
      '@type': 'GeoCircle',
      name: input.metroArea,
      ...(input.lat !== undefined && input.lng !== undefined
        ? {
            geoMidpoint: {
              '@type': 'GeoCoordinates',
              latitude: input.lat,
              longitude: input.lng,
            },
            geoRadius: 80467, // 50 miles in meters
          }
        : {}),
    },
    telephone: '+1-857-498-9778',
    email: 'aaryan@farhand.live',
    priceRange: '$$',
    paymentAccepted: ['Invoice', 'ACH', 'Wire Transfer', 'Credit Card'],
    currenciesAccepted: 'USD',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    ...(input.rating ? { aggregateRating: aggregateRatingSchema(input.rating) } : {}),
  };
}

type BreadcrumbItem = { name: string; url: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
