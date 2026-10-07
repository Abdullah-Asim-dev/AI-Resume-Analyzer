import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://yourdomain.com';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/resume-analyzer/'],
      disallow: ['/dashboard', '/api/'], // Protect private internal workspaces from being crawled
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
