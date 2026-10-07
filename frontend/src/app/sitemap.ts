import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yourdomain.com'; // Isko real domain se change karenge baad mein

  // Array of your programmatic pSEO roles
  const popularRoles = [
    'software-engineer',
    'react-developer',
    'data-analyst',
    'product-manager',
    'devops-architect',
  ];

  // Map pSEO paths safely
  const roleEntries = popularRoles.map((role) => ({
    url: `${baseUrl}/resume-analyzer/${role}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Base core pages mapping
  const baseEntries = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/auth`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  return [...baseEntries, ...roleEntries];
}
