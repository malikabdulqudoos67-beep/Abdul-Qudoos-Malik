import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Building2,
  Check
} from 'lucide-react';
import { useRealEstate } from '../context/RealEstateContext';
import { motion, AnimatePresence } from 'motion/react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    loginWithGoogle, 
    loginWithEmail, 
    signUpWithEmail, 
    demoAdminLogin,
    showToast 
  } = useRealEstate();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        await loginWithEmail(email, password);
      } else {
        if (!name.trim()) {
          showToast('Please enter your full name', 'error');
          setIsLoading(false);
          return;
        }
        await signUpWithEmail(email, password, name);
      }
    } catch (err: any) {
      // Toast already shown in context
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoAdmin = async () => {
    setIsLoading(true);
    await demoAdminLogin();
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-[32px] max-w-md w-full overflow-hidden shadow-2xl border border-[#EAE4DA] relative"
      >
        {/* Close button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#F0EBE1] text-[#1E232A] flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="bg-[#FAF7F2] p-6 text-center border-b border-[#E8E2D9] space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#1E232A] text-[#F2C98A] flex items-center justify-center mx-auto shadow-sm">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-extrabold text-xl text-[#1E232A]">
            {mode === 'signin' ? "Welcome to Abdul's Real Estate" : 'Join the VIP Private Registry'}
          </h3>
          <p className="text-xs text-[#7D8592]">
            Access off-market listings, private viewings, and AI architectural concepts.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-5">
          
          {/* Demo Admin Quick Box (Highlighting requested credentials) */}
          <div className="bg-[#FDF8EE] rounded-2xl p-3.5 border border-[#F2C98A] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-[#94580D] uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C6852C]" />
                Demo Admin Credentials
              </span>
              <span className="text-[10px] bg-[#C6852C] text-white font-bold px-2 py-0.5 rounded-full">
                Pre-configured
              </span>
            </div>
            <div className="text-[11px] text-[#5C6470] space-y-0.5 font-mono">
              <p>Username: <strong className="text-[#1E232A]">admin</strong></p>
              <p>Password: <strong className="text-[#1E232A]">Admin@123</strong></p>
            </div>
            <button
              type="button"
              onClick={handleDemoAdmin}
              disabled={isLoading}
              className="w-full py-2 bg-[#1E232A] hover:bg-[#343D4A] text-[#F2C98A] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E5A853]" />
              <span>1-Click Sign In as Admin</span>
            </button>
          </div>

          {/* Google Sign-in with Firebase Auth */}
          <button
            type="button"
            onClick={loginWithGoogle}
            disabled={isLoading}
            className="w-full py-3 bg-white hover:bg-[#FAF8F5] border border-[#DDD6CB] rounded-2xl text-xs font-bold text-[#1E232A] flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#E8E2D9] w-full"></div>
            <span className="bg-white px-3 text-[11px] font-semibold text-[#8A92A0] uppercase">
              Or with Email
            </span>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#8A92A0] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8A92A0] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Lord Alistair Sterling"
                    className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl py-2.5 pl-10 pr-3 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] uppercase font-bold text-[#8A92A0] mb-1">
                Email Address or "admin"
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8A92A0] absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin or your@email.com"
                  className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl py-2.5 pl-10 pr-3 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-[#8A92A0] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8A92A0] absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl py-2.5 pl-10 pr-3 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#1E232A] hover:bg-[#343D4A] text-white text-xs font-bold rounded-2xl transition-all shadow-sm cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? 'Processing...' : mode === 'signin' ? 'Sign In to Portal' : 'Create Exclusive Account'}
            </button>
          </form>

          {/* Mode Switcher */}
          <div className="text-center text-xs text-[#7D8592] pt-2">
            {mode === 'signin' ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-[#C6852C] font-bold hover:underline cursor-pointer"
                >
                  Join VIP Registry
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-[#C6852C] font-bold hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>

        </div>

      </motion.div>
    </div>
  );
};
