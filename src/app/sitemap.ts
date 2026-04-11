import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://farhand.live';
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

  const stakeholderPages = [
    'oems',
    'distributors',
    'fleet-operators',
    'facilities',
  ];

  const blogPosts = [
    'ai-guided-field-service-robots',
    'field-service-skills-gap',
    'remote-resolution-field-service',
    'knowledge-preservation-field-service',
    'first-time-fix-rate-ai',
  ];

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...servicePages.map((page) => ({
      url: `${baseUrl}/services/${page}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
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
    ...blogPosts.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
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
