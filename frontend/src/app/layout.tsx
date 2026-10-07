import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Resume Vectors | Free AI ATS Optimization Matrix Engine',
  description: 'Instantly audit your professional resume against advanced neural screening algorithms. Identify critical semantic gaps, technical traits, and rewrite weak bullet points effortlessly.',
  alternates: {
    canonical: 'https://resumevectors.com', // Change this to your final custom production domain
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // AEO/GEO Injection Structure: Informs AI search engines that this is a public high-utility engine tool
  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Resume Vectors AI Platform',
    'operatingSystem': 'All Devices',
    'applicationCategory': 'BusinessApplication',
    'browserRequirements': 'Requires HTML5 support',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'featureList': [
      'Real-time ATS Filtration Scoring Engine',
      'Semantic Capability Gap Analysis Matrix',
      'Quantifiable Metric Bullet Item Rewriter',
      'Stateless Document Telemetry Vector Protection'
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
        />
      </head>
      <body className={`${inter.className} bg-[#020617] text-slate-100 antialiased selection:bg-indigo-500/20`}>
        {children}
      </body>
    </html>
  );
}
