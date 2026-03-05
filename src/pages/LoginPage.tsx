import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../types';
import { Home, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('student');
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill all fields'); return; }
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password, role);
      if (result.success) {
        if (role === 'student') navigate('/student');
        else if (role === 'owner') navigate('/owner');
        else navigate('/admin');
      } else {
        setError(result.error || 'Login failed');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
      </div>
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl mb-4 shadow-lg shadow-amber-500/30">
            <Home className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Houstd</h1>
          <p className="text-purple-200 mt-1">Student Housing Platform</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-6">Welcome back</h2>

          {error && (
            <div className="bg-red-500/20 border border-red-500/40 rounded-xl p-3 mb-4">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition"
                placeholder="you@example.com" />
            </div>

            <div>
              <label className="block text-purple-200 text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition pr-12"
                  placeholder="••••••••" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white transition">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">Login as</label>
              <div className="grid grid-cols-3 gap-2">
                {(['student', 'owner', 'admin'] as Role[]).map(r => (
                  <button key={r} type="button" onClick={() => setRole(r)}
                    className={`py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                      role === r
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                        : 'bg-white/10 text-purple-200 hover:bg-white/20 border border-white/10'
                    }`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all disabled:opacity-50 mt-2">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-purple-200 mt-6 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-amber-400 hover:text-amber-300 font-medium transition">Sign Up</Link>
          </p>

          <div className="mt-6 pt-5 border-t border-white/10">
            <p className="text-purple-300/60 text-xs text-center mb-3">Demo accounts</p>
            <div className="grid grid-cols-1 gap-1.5 text-xs text-purple-200/80">
              <div className="flex justify-between bg-white/5 rounded-lg px-3 py-1.5"><span>Student:</span><span>youssef@houstd.com / student123</span></div>
              <div className="flex justify-between bg-white/5 rounded-lg px-3 py-1.5"><span>Owner:</span><span>ahmed@houstd.com / owner123</span></div>
              <div className="flex justify-between bg-white/5 rounded-lg px-3 py-1.5"><span>Admin:</span><span>admin@houstd.com / admin123</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
