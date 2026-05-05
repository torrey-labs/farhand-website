import type { MetadataRoute } from 'next';
import { cities } from '@/data/cities';
import { machineTypes } from '@/data/machineTypes';
import { blogPosts as blogPostMeta } from '@/data/blogPosts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://farhand.ai';
  const now = new Date();

  const servicePages = [
    'robots',
    'industrial-robots',
    'industrial-machinery',
    'instruments',
    'equipment',
    'medical-equipment',
    'general-aviation',
  ];

  // Programmatic SEO: every machine-type x city landing page.
  // 7 machines x 85 cities = 595 URLs.
  const programmaticPages: MetadataRoute.Sitemap = [];
  for (const machine of machineTypes) {
    for (const city of cities) {
      programmaticPages.push({
        url: `${baseUrl}/services/${machine.slug}/${city.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    }
  }

  const stakeholderPages = [
    'oems',
    'distributors',
    'fleet-operators',
    'facilities',
    'robotics-labs',
    'japanese-oems',
    'european-oems',
    'taiwanese-oems',
    'chinese-oems',
  ];

  const coreMarketingPages = [
    { slug: 'pitch',    priority: 0.9 },
    { slug: 'oem',      priority: 0.9 },
    { slug: 'relay',    priority: 0.9 },
    { slug: 'connect',  priority: 0.8 },
    { slug: 'partners', priority: 0.7 },
  ];

  // Source of truth: src/data/blogPosts.ts. Importing the full meta lets
  // us also pull each post's per-post OG image into the sitemap, and stay
  // in sync when posts are added (the SEO bug where new posts were absent
  // from the sitemap).
  const blogPosts = blogPostMeta;

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      images: [
        `${baseUrl}/world-map.avif`,
        `${baseUrl}/relay-platform.png`,
        `${baseUrl}/logo-w-type-light-on-dark.png`,
      ],
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mission`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...coreMarketingPages.map(({ slug, priority }) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority,
    })),
    ...servicePages.map((page) => ({
      url: `${baseUrl}/services/${page}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...programmaticPages,
    ...stakeholderPages.map((page) => ({
      url: `${baseUrl}/for/${page}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      // Use post date for lastModified — communicates real freshness
      // to search engines instead of treating every crawl as "now."
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      // Per-post OG image — declares image content for Google Images
      // discoverability via the sitemap protocol.
      images: [`${baseUrl}/blog/${post.slug}/opengraph-image`],
    })),
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
