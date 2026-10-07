import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Target dynamic core framework directly to your frontend app interface
  // (Change this string to your premium custom domain like 'https://resumevectors.com' later)
  const baseUrl = 'http://localhost:3000'; 

  // Comprehensive array of your programmatic pSEO target roles
  const popularRoles = [
    'software-engineer',
    'react-developer',
    'data-analyst',
    'product-manager',
    'devops-architect',
    'frontend-developer',
    'backend-engineer',
    'fullstack-developer'
  ];

  // Map pSEO paths safely with strict formatting standards
  const roleEntries = popularRoles.map((role) => ({
    url: `${baseUrl}/resume-analyzer/${role}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Base landing core pages mapping matrix
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
      priority: 0.5,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  return [...baseEntries, ...roleEntries];
}
