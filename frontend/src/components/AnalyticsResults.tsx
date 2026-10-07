'use client';

import { motion } from 'framer-motion';
import { Award, Sparkles, CheckSquare, CheckCircle2, ShieldAlert } from 'lucide-react';

interface AnalyticsResultsProps {
  result: any;
  jd: string;
}

export default function AnalyticsResults({ result, jd }: AnalyticsResultsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-6 w-full"
    >
      {/* Top Balanced Metrics Panel Row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 text-center shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
          <span className="text-[9px] font-extrabold uppercase text-slate-500 tracking-widest flex items-center justify-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-emerald-400" /> ATS FILTER ENGINE MATRIX
          </span>
          <div className="text-4xl font-black text-emerald-400 mt-2.5 drop-shadow-[0_0_15px_rgba(52,211,153,0.15)]">{result.ats_score}%</div>
        </div>
        
        <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 text-center shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
          <span className="text-[9px] font-extrabold uppercase text-slate-500 tracking-widest flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" /> SEMANTIC INDUSTRY PROXIMITY
          </span>
          <div className="text-4xl font-black text-blue-400 mt-2.5 drop-shadow-[0_0_15px_rgba(96,165,250,0.15)]">
            {jd.trim() ? `${result.jd_match_percentage}%` : 'N/A'}
          </div>
        </div>
      </div>

      {/* Mid Splitted Blocks Row: Audit Summary vs Gaps Chips */}
      <div className="grid md:grid-cols-3 gap-6 items-start">
        
        {/* Left Double-Width Box: Findings Report */}
        <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 shadow-md md:col-span-2 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> AI Telemetry Diagnostics & Findings
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed font-sans font-medium">
              {result.summary_feedback}
            </p>
          </div>
        </div>

        {/* Right Single-Width Box: Missing Vectors Skills Chips */}
        <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 shadow-md md:col-span-1 h-full">
          <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-3.5 flex items-center gap-1.5">
            <CheckSquare className="w-3 h-3 text-indigo-400" /> Missing Structural Vectors
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {result.missing_skills?.map((skill: string, i: number) => (
              <span key={i} className="bg-slate-950/80 border border-slate-900 text-slate-300 px-2.5 py-1.5 rounded-xl text-[10px] font-bold shadow-inner transition-colors hover:border-indigo-500/30">
                + {skill}
              </span>
            ))}
            {(!result.missing_skills || result.missing_skills.length === 0) && (
              <div className="text-xs text-slate-600 font-medium py-2">All technical skills completely aligned!</div>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Full-Width Horizontal Block: Rewrite Items Line Lists */}
      <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 shadow-md w-full">
        <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-5">
          Quantifiable Line Rewrites & Vector Optimization
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {result.rewritten_bullet_points?.map((item: any, i: number) => (
            <div key={i} className="border border-slate-900/80 bg-slate-950/20 rounded-2xl p-4.5 space-y-2.5 shadow-inner transition-all hover:border-slate-800">
              <div className="text-[10px] text-slate-500 font-medium line-through leading-relaxed bg-slate-950/40 p-2.5 rounded-xl border border-slate-900/30">
                "{item.original}"
              </div>
              <div className="text-xs text-indigo-200 font-semibold flex items-start gap-2.5 leading-relaxed pt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]" />
                <span>{item.improved}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

