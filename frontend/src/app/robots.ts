import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Target dynamic core framework directly to your frontend app interface
  // (Change this string to your premium custom domain like 'https://resumevectors.com' later)
  const baseUrl = 'http://localhost:3000';

  return {
    rules: {
      userAgent: '*',
      allow: [
        '/', 
        '/auth',
        '/resume-analyzer/' // Allows indexing of all programmatic pSEO landing directories
      ],
      disallow: [
        '/dashboard', // Protects private user workspaces from being scanned by public bots
        '/_next/',     // Blocks crawling of dynamic internal Next.js assets
        '/api/'       // Protects stateless application endpoints metadata proxies
      ], 
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
