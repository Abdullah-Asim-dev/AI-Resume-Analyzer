'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, logout } from '../../utils/auth';
import { Upload, FileText, Briefcase, Zap, RefreshCw, AlertCircle, LogOut, Sparkles } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

import AnalyticsResults from '../../components/AnalyticsResults';

export default function DashboardPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/auth');
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('An active payload document asset stream must be loaded first.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('job_description', jd);

    const token = getToken();

    try {
      const response = await fetch('/api/proxy/analyze', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setResult(data.data);
      } else {
        setError(data.detail || 'Algorithmic parsing node dropped text vectors.');
      }
    } catch (err) {
      setError('Communication connection pipeline dropped link status to local core endpoint servers.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col justify-between antialiased selection:bg-indigo-500/30">
      
      <div>
        {/* Clean Top Navigation Control Header */}
        <nav className="border-b border-slate-900 bg-slate-950/40 backdrop-blur-xl px-6 py-4 flex justify-between items-center max-w-7xl mx-auto rounded-b-2xl sticky top-0 z-50">
          <div className="flex items-center gap-2.5 font-black text-sm tracking-wider bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            <Sparkles className="w-4 h-4 text-indigo-400 fill-indigo-500/40 animate-spin" style={{ animationDuration: '4s' }} /> RESUME VECTORS
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-xs font-bold bg-slate-900/60 border border-slate-800/80 hover:border-red-900/60 hover:text-red-400 px-4 py-2.5 rounded-xl transition-all shadow-md">
            <LogOut className="w-3.5 h-3.5" /> Close Session
          </button>
        </nav>

        {/* Main Spacious Dashboard Layout Grid Area */}
        <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
          
          {/* Row 1: Fully Expanded Forms Core Matrix Container */}
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            
            {/* File Uploading Parameter Block */}
            <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-wider mb-4 flex items-center gap-2 text-blue-400">
                  <FileText className="w-3.5 h-3.5" /> Push Active Vector Set
                </h2>
                <label className="flex flex-col items-center justify-center border border-dashed border-slate-800 hover:border-blue-500/40 transition-all rounded-xl p-10 cursor-pointer bg-slate-950/40 group shadow-inner relative overflow-hidden">
                  <Upload className="w-7 h-7 text-slate-500 group-hover:text-blue-400 transition-colors mb-3" />
                  <span className="text-xs font-semibold text-slate-400 text-center truncate max-w-full px-4">
                    {file ? file.name : 'Ingest PDF, DOCX or TXT files'}
                  </span>
                  <input type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
              
              <button 
                onClick={handleAnalyze} 
                disabled={loading} 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-40 text-xs tracking-wider shadow-lg mt-6 shadow-indigo-950/40"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> 
                    <span>Processing Groq LPU Framework Metrics...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 
                    <span>Compute Optimization Matrices</span>
                  </>
                )}
              </button>
            </div>

            {/* Job Requirements Parameter Box */}
            <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 backdrop-blur-xl flex flex-col h-full">
              <h2 className="text-xs font-extrabold uppercase tracking-wider mb-4 flex items-center gap-2 text-purple-400">
                <Briefcase className="w-3.5 h-3.5" /> Target Parameter Constraints
              </h2>
              <textarea
                className="w-full flex-1 min-h-[160px] bg-slate-950/70 border border-slate-900 rounded-xl p-4 text-xs focus:outline-none focus:border-purple-500/60 transition-all text-slate-300 resize-none font-sans leading-relaxed"
                placeholder="Paste target job descriptions, keyword criteria, or performance indicators details here..."
                value={jd}
                onChange={(e) => setJd(e.target.value)}
              />
            </div>

          </div>

          {error && (
            <div className="bg-red-950/20 border border-red-900/50 text-red-400 p-4 rounded-xl flex items-center gap-2.5 text-xs font-medium max-w-2xl mx-auto">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}

          {/* Row 2: Comprehensive Evaluation View (Full Screen Horizontal Spacing Grid Block) */}
          <div className="w-full pt-4 border-t border-slate-900/60">
            <AnimatePresence mode="wait">
              {result ? (
                <AnalyticsResults result={result} jd={jd} />
              ) : (
                <div className="w-full min-h-[300px] border border-dashed border-slate-900 rounded-2xl flex flex-col items-center justify-center text-slate-600 p-8 text-center bg-slate-950/10">
                  <Sparkles className="w-6 h-6 mb-3 text-slate-700 animate-pulse" />
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Standby Evaluation Grid</p>
                  <p className="text-xs text-slate-600 mt-1 max-w-sm leading-relaxed">Upload a document layout model and target constraints on forms arrays to compile multi-vector analytics graphs maps.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </main>
      </div>

      {/* 🌟 MAPPED HIGH-END FOOTER WITH YOUR SIGNATURE 🌟 */}
      <footer className="w-full text-center py-6 border-t border-slate-900/40 text-[10px] text-slate-600 font-mono tracking-widest bg-slate-950/20 mt-12 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
        <span>© {new Date().getFullYear()} RESUME VECTORS. ALL RIGHTS RESERVED.</span>
        <span className="hidden sm:inline text-slate-800">|</span>
        <span className="font-sans font-bold uppercase tracking-wider text-slate-500 text-[9px]">
          Developed by <span className="text-indigo-400 font-sans font-extrabold">{`Abdullah Asim`}</span>
        </span>
      </footer>

    </div>
  );
}
