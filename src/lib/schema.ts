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
};

export function productSchema({ name, description, url, category }: ProductSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: ORG_NAME,
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
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
