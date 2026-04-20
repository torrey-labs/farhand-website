import type { MetadataRoute } from 'next';
import { cities } from '@/data/cities';
import { machineTypes } from '@/data/machineTypes';

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

  // Programmatic SEO: every machine-type x city landing page.
  // 7 machines x 75 cities = 525 URLs.
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
    'japanese-oems',
    'european-oems',
    'taiwanese-oems',
    'chinese-oems',
  ];

  const blogPosts = [
    'ai-guided-field-service-robots',
    'field-service-skills-gap',
    'remote-resolution-field-service',
    'knowledge-preservation-field-service',
    'first-time-fix-rate-ai',
    'field-service-roi-calculator',
    'fanuc-robot-maintenance-checklist',
    'industrial-robot-downtime-cost',
    'predictive-vs-preventive-maintenance',
    'remote-diagnostics-field-service',
    'oem-field-service-scaling',
    'field-service-knowledge-management',
    'reduce-truck-rolls-ai',
    'field-service-trends-2026',
    'cobot-maintenance-guide',
    'semiconductor-equipment-field-service-benchmarks',
    'medical-device-field-service-fda-compliance',
    'field-service-kpis-that-matter-2026',
    'kuka-robot-service-us',
    'yaskawa-robot-maintenance-us',
    'tsmc-supplier-equipment-service',
    'siemens-industrial-service-us',
  ];

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
