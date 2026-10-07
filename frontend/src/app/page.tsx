'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Cpu, ArrowRight, CheckCircle2, Star, Files, Sparkles } from 'lucide-react';

export default function HomeLandingHubPage() {
  const trendingSearches = ['Software Engineer', 'React Developer', 'Data Analyst', 'Product Manager', 'DevOps Architect'];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col justify-between relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Decorative premium radial vector backdrop glow matrices */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-indigo-600/5 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Main Structural Header Navbar */}
      <nav className="max-w-7xl w-full mx-auto px-6 py-5 flex justify-between items-center border-b border-slate-900/60 backdrop-blur-md sticky top-0 z-50 bg-slate-950/20">
        <div className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          <Zap className="w-4 h-4 text-indigo-400 fill-indigo-500/40 animate-pulse" /> MATRIX CORE ANALYZER
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth" className="text-xs font-bold text-slate-400 hover:text-slate-200 transition-colors">
            Sign In
          </Link>
          <Link href="/auth" className="bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-indigo-950/20">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section Container Execution Area */}
      <main className="max-w-5xl w-full mx-auto px-6 py-12 md:py-24 text-center space-y-10 relative z-10 my-auto">
        
        {/* Dynamic GEO Badge Anchor */}
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-indigo-950/30 border border-indigo-900/50 px-4 py-2 rounded-full text-xs font-bold text-indigo-400 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 fill-indigo-500/20" /> Next-Gen Algorithmic ATS Optimization Pipeline
        </motion.div>

        {/* Scalable High-Impact Copy Header */}
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black tracking-tight leading-none bg-gradient-to-b from-slate-50 via-slate-200 to-slate-400 bg-clip-text text-transparent max-w-4xl mx-auto"
          >
            Audit Your Professional Resume Vectors with Advanced AI
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Bypass outdated traditional matching metrics. Our analytical system processes context weights, identifies technical capability gaps, and rewrites weak descriptions into quantifiable corporate achievements instantly.
          </motion.p>
        </div>

        {/* High-Converting CTA Container (Bypassing competitor onboarding walls) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="p-[1px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-3xl inline-block max-w-md w-full shadow-2xl shadow-indigo-950/60"
        >
          <div className="bg-slate-950 p-6 md:p-8 rounded-[23px] text-left space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-600/10 border border-blue-500/20 rounded-xl text-blue-400">
                <Files className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">Initialize Direct Matrix Assessment</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Stateless processing sandbox area active.</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Real-time Gemini 2.5 Audit Scores
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Hugging Face Semantic Text Distance Match
              </div>
            </div>

            <Link href="/auth" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 text-white shadow-lg shadow-indigo-900/20 active:scale-[0.99]">
              Launch Execution Terminal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Programmatic SEO Anchor Nodes Integration (Generates massive inner crawler links maps value) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="pt-6 max-w-2xl mx-auto space-y-3"
        >
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Target Industry Framework Configurations</span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {trendingSearches.map((role, idx) => (
              <Link 
                key={idx} 
                href={`/resume-analyzer/${role.toLowerCase().replace(' ', '-')}`}
                className="text-[11px] font-semibold text-slate-400 bg-slate-900/40 border border-slate-900 hover:border-indigo-500/30 hover:text-indigo-300 px-3 py-1.5 rounded-xl transition-all shadow-inner"
              >
                {role} Profiles
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Structural Crawler Verification Matrix Indicators Grid */}
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto pt-10 border-t border-slate-900/60 items-center">
          <div className="text-center space-y-1.5">
            <Cpu className="w-4 h-4 mx-auto text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.2)]" />
            <div className="text-xs font-bold text-slate-300">Contextual Ingestion</div>
            <p className="text-[10px] text-slate-500 leading-normal max-w-[160px] mx-auto">Neural keyword evaluation mapping parameters.</p>
          </div>
          <div className="text-center space-y-1.5">
            <ShieldCheck className="w-4 h-4 mx-auto text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.2)]" />
            <div className="text-xs font-bold text-slate-300">Data Isolation</div>
            <p className="text-[10px] text-slate-500 leading-normal max-w-[160px] mx-auto">Zero storage pipeline persistence arrays.</p>
          </div>
          <div className="text-center space-y-1.5">
            <Star className="w-4 h-4 mx-auto text-purple-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.2)]" />
            <div className="text-xs font-bold text-slate-300">GEO Structural Mode</div>
            <p className="text-[10px] text-slate-500 leading-normal max-w-[160px] mx-auto">AI engine readable layout specifications schemas.</p>
          </div>
        </div>

      </main>

      {/* Global Minimalist Footer Frame */}
      <footer className="w-full text-center py-6 border-t border-slate-900/40 text-[10px] text-slate-600 font-mono tracking-wide">
        // ROOT_HUB: Compiled under strict automated system engine indexes runtime configurations.
      </footer>
    </div>
  );
}
