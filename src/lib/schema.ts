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
