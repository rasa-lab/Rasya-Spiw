import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, User, ChevronRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !password) return;

    setIsAuthenticating(true);
    // Simulate auth
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsAuthenticating(false);
    setShowAnimation(true);

    // After "video" animation
    setTimeout(() => {
      setShowAnimation(false);
      setShowWelcome(true);
      login(fullName);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {!showAnimation && !showWelcome && (
          <motion.div
            key="login-form"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full max-w-md p-8"
          >
            <div className="glass p-10 rounded-[3rem] border border-emerald-500/20 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
              
              <div className="text-center space-y-2">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 mb-4">
                  <Shield className="w-10 h-10 text-emerald-500" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white">NANO SUITE</h1>
                <p className="text-zinc-500 text-xs uppercase tracking-[0.3em]">Secure Access Required</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Access Key"
                      className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-4 bg-emerald-500 text-black rounded-2xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isAuthenticating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Initialize Session
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {showAnimation && (
          <motion.div
            key="video-animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1001] bg-black flex items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {/* Cyber Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98111_1px,transparent_1px),linear-gradient(to_bottom,#10b98111_1px,transparent_1px)] bg-[size:40px_40px]" />
              
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: [0, 1.2, 1], rotate: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative z-10"
              >
                <div className="w-48 h-48 border-4 border-emerald-500 rounded-full flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl absolute"
                  />
                  <Shield className="w-24 h-24 text-emerald-500" />
                </div>
              </motion.div>

              <div className="absolute bottom-20 left-0 w-full text-center space-y-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 3 }}
                  className="h-1 bg-emerald-500 mx-auto rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                />
                <motion.p
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-emerald-500 font-mono text-xs tracking-[0.5em] uppercase"
                >
                  Decrypting System Core...
                </motion.p>
              </div>

              {/* Matrix-like falling characters */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -100 }}
                    animate={{ y: 1000 }}
                    transition={{ 
                      duration: Math.random() * 2 + 1, 
                      repeat: Infinity, 
                      ease: "linear",
                      delay: Math.random() * 2
                    }}
                    className="absolute text-emerald-500 font-mono text-[10px]"
                    style={{ left: `${i * 5}%` }}
                  >
                    {Array.from({ length: 10 }).map(() => String.fromCharCode(Math.floor(Math.random() * 94) + 33)).join('\n')}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {showWelcome && (
          <motion.div
            key="welcome-msg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 border-2 border-dashed border-emerald-500/30 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.5)]">
                  <Shield className="w-10 h-10 text-black" />
                </div>
              </motion.div>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
                className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
              />
              <div className="space-y-1">
                <h2 className="text-5xl font-black text-white tracking-tighter italic">SYSTEM INITIALIZED</h2>
                <p className="text-emerald-500 font-mono text-sm tracking-[0.3em] uppercase">Welcome to Nano Suite Pro</p>
              </div>
              <div className="flex flex-col items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                <div className="flex gap-4">
                  <span>User: <span className="text-white">{fullName}</span></span>
                  <span>Status: <span className="text-emerald-500">Authorized</span></span>
                </div>
                <div className="flex gap-4">
                  <span>Level: <span className="text-blue-400">Owner/Admin</span></span>
                  <span>Region: <span className="text-purple-400">Tegal, ID</span></span>
                </div>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
