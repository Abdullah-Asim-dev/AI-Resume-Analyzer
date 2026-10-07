'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setToken } from '@/utils/auth';
import { Lock, Mail, RefreshCw, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: '', text: '' });

    const endpoint = isLogin ? '/api/proxy/auth/login' : '/api/proxy/auth/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (isLogin) {
          setToken(data.token);
          setMsg({ type: 'success', text: 'Authorization verified. Decrypting gateway nodes...' });
          setTimeout(() => router.push('/dashboard'), 1000);
        } else {
          setMsg({ type: 'success', text: 'Credentials recorded. Shifting vectors to login node.' });
          setIsLogin(true);
        }
      } else {
        setMsg({ type: 'error', text: data.detail || 'Access handshake failed. Verify signature variables.' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Unable to communicate with the core engine backend layer.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center p-6 relative overflow-hidden selection:bg-indigo-500/30">
      {/* Background glow meshes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full"></div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900/30 border border-slate-900 p-8 rounded-2xl backdrop-blur-2xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600/10 border border-indigo-500/20 rounded-xl mb-3 shadow-inner">
            <Zap className="w-5 h-5 text-indigo-400 fill-indigo-500/30 animate-pulse" />
          </div>
          <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
            {isLogin ? 'Access Portal Gate' : 'Initialize Terminal Node'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isLogin ? 'Provide encryption tokens to retrieve saved data fields' : 'Register parameters to spin up an isolated parsing workspace'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Secure Identity (Email)</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-600" />
              <input
                type="email"
                required
                className="w-full bg-slate-950/70 border border-slate-900 rounded-xl pl-11 pr-4 py-3 text-xs focus:outline-none focus:border-indigo-500/60 transition-all text-slate-300 font-sans shadow-inner"
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Verification Cipher (Password)</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-600" />
              <input
                type="password"
                required
                className="w-full bg-slate-950/70 border border-slate-900 rounded-xl pl-11 pr-4 py-3 text-xs focus:outline-none focus:border-indigo-500/60 transition-all text-slate-300 font-sans shadow-inner"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {msg.text && (
            <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} className={`p-3 rounded-xl text-xs border ${msg.type === 'success' ? 'bg-green-950/20 border-green-900/40 text-green-400' : 'bg-red-950/20 border-red-900/40 text-red-400'}`}>
              {msg.text}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-xs shadow-lg shadow-indigo-950/40"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : (isLogin ? 'Establish Secure Connection' : 'Compile Registration Model')}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            {isLogin ? "Request dynamic account cluster generation?" : 'Return back to standard entry gate point'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
