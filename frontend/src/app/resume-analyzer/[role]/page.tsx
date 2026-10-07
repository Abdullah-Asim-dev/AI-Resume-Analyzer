import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, ArrowRight, ShieldCheck, Sparkles, CheckCircle } from 'lucide-react';

interface Props {
  params: Promise<{ role: string }>;
}

// Helper to format role text strings beautifully
function formatRoleName(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// 1. DYNAMIC SEO & GEO METADATA GENERATOR LAYER
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const roleName = formatRoleName(resolvedParams.role);
  
  return {
    title: `Best AI ATS Resume Analyzer for ${roleName} | Free Matrix Audit`,
    description: `Optimize your professional ${roleName} resume against advanced corporate neural ATS screeners. Identify semantic technology gaps, skills matching weights, and achieve quantifiable line rewrites instantly.`,
    alternates: {
      canonical: `https://resumevectors.com{resolvedParams.role}`,
    },
    openGraph: {
      title: `Best AI ATS Resume Analyzer for ${roleName}`,
      description: `Tailored automated compliance scoring systems for professional ${roleName} roles.`,
      url: `https://resumevectors.com{resolvedParams.role}`,
      type: 'website',
    }
  };
}

// 2. STATIC SITE GENERATION PATHS MAP (PROGRAMMATIC SEO ENGINE)
export async function generateStaticParams() {
  const targetRoles = [
    'software-engineer',
    'react-developer',
    'data-analyst',
    'product-manager',
    'devops-architect',
    'frontend-developer',
    'backend-engineer',
    'fullstack-developer'
  ];
  return targetRoles.map((role) => ({ role }));
}

export default async function ProgrammaticRolePage({ params }: Props) {
  const resolvedParams = await params;
  const roleName = formatRoleName(resolvedParams.role);

  // AEO/GEO Injection Schema: Informs AI Engines explicitly about this specific landing page capability
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    'name': `AI ATS Resume Optimization Target for ${roleName}`,
    'description': `Dedicated system workflow parameters to analyze and validate resume vectors for ${roleName} positions.`,
    'url': `https://resumevectors.com{resolvedParams.role}`,
    'mainEntity': {
      '@type': 'SoftwareApplication',
      'name': 'Resume Vectors AI Platform',
      'applicationCategory': 'BusinessApplication'
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-indigo-500/30">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-indigo-600/5 blur-[120px] pointer-events-none"></div>

      {/* Header Framework */}
      <nav className="max-w-7xl w-full mx-auto px-6 py-5 flex justify-between items-center border-b border-slate-900/60 backdrop-blur-md sticky top-0 z-50 bg-slate-950/10">
        <Link href="/" className="flex items-center gap-2 font-black text-sm tracking-wider bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          <Sparkles className="w-4 h-4 text-indigo-400 fill-indigo-500/20" /> RESUME VECTORS
        </Link>
        <Link href="/auth" className="bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md">
          Launch Sandbox
        </Link>
      </nav>

      {/* Hero Landing Content */}
      <main className="max-w-4xl w-full mx-auto px-6 py-16 md:py-24 text-center space-y-8 my-auto relative z-10">
        
        <div className="inline-flex items-center gap-2 bg-indigo-950/40 border border-indigo-900/60 px-4 py-1.5 rounded-full text-[11px] font-bold text-indigo-300">
          <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400/20 animate-pulse" /> Targeted Compliance Model Active
        </div>

        <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-tight bg-gradient-to-b from-slate-50 via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Optimize Your Resume Vectors For <span className="text-indigo-400">{roleName}</span> Positions
        </h1>

        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Do not let automated corporate filtering layers drop your profile. Our algorithmic system evaluates your text parameters against the precise technical skill constraints required for <strong className="text-slate-300 font-semibold">{roleName}</strong> roles, automatically highlighting hidden capability gaps in seconds.
        </p>

        {/* Feature Check Grid Box */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left pt-4">
          <div className="p-4 bg-slate-900/20 border border-slate-900 rounded-xl flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-slate-300 font-medium">Llama-3 & Qwen Structured Optimization Outputs</div>
          </div>
          <div className="p-4 bg-slate-900/20 border border-slate-900 rounded-xl flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-slate-300 font-medium">Targeted {roleName} Core Extraction Grids</div>
          </div>
          <div className="p-4 bg-slate-900/20 border border-slate-900 rounded-xl flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-slate-300 font-medium">Quantifiable Experience Line Item Bullet Rewriter</div>
          </div>
        </div>

        {/* Conversion Prompt Action Button Box */}
        <div className="pt-6">
          <Link href="/auth" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-4 rounded-xl text-xs tracking-wider shadow-xl shadow-indigo-950/40 transition-all active:scale-[0.99]">
            Analyze Your {roleName} Resume Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>

      {/* Footer Interface Container */}
      <footer className="w-full text-center py-6 border-t border-slate-900/40 text-[10px] text-slate-600 font-mono tracking-wide bg-slate-950/20">
        SYSTEM_ROUTER_NODE // Rendered under strict programmatic crawler specifications indexes.
      </footer>

    </div>
  );
}
