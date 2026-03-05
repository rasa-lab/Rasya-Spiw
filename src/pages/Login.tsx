import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, User, ChevronRight, Loader2, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const { login } = useAuth();

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !password || (isRegistering && !username)) return;

    setIsAuthenticating(true);
    
    if (isRegistering) {
      // Save to local storage for "real" registration feel
      const users = JSON.parse(localStorage.getItem('nano_registered_users') || '[]');
      const newUser = { fullName, username, password, role: 'user', id: Date.now() };
      users.push(newUser);
      localStorage.setItem('nano_registered_users', JSON.stringify(users));
      
      // Log the registration
      const logs = JSON.parse(localStorage.getItem('nano_cyber_logs') || '[]');
      logs.unshift({
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        user: fullName,
        action: 'REGISTERED_NEW_ACCOUNT'
      });
      localStorage.setItem('nano_cyber_logs', JSON.stringify(logs));
    }

    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsAuthenticating(false);
    setShowAnimation(true);

    // After cyber animation
    setTimeout(() => {
      setShowAnimation(false);
      setShowWelcomeModal(true);
    }, 4000);
  };

  const handleGetStarted = () => {
    login(fullName);
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {!showAnimation && !showWelcomeModal && (
          <motion.div
            key="login-form"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full max-w-md p-8"
          >
            <div className="glass p-10 rounded-[3rem] border border-emerald-500/20 space-y-8 relative overflow-hidden shadow-2xl shadow-emerald-500/10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
              
              <div className="text-center space-y-2">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 mb-4 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  <Shield className="w-10 h-10 text-emerald-500" />
                </div>
                <h1 className="text-3xl font-black tracking-tighter text-white italic">NANO SUITE</h1>
                <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-bold">
                  {isRegistering ? 'Create New Identity' : 'Secure Access Required'}
                </p>
              </div>

              <form onSubmit={handleAction} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700"
                      required
                    />
                  </div>
                </div>

                {isRegistering && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2"
                  >
                    <div className="relative">
                      <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Access Key"
                      className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-4 bg-emerald-500 text-black rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-emerald-500/20"
                >
                  {isAuthenticating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {isRegistering ? 'Register Account' : 'Initialize Session'}
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="text-center">
                <button
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-emerald-500 transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                  {isRegistering ? (
                    <><LogIn className="w-3 h-3" /> Already have an account?</>
                  ) : (
                    <><UserPlus className="w-3 h-3" /> Create new identity</>
                  )}
                </button>
              </div>
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
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98111_1px,transparent_1px),linear-gradient(to_bottom,#10b98111_1px,transparent_1px)] bg-[size:40px_40px]" />
              
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: [0, 1.2, 1], rotate: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative z-10"
              >
                <div className="w-48 h-48 border-4 border-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)]">
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

        {showWelcomeModal && (
          <motion.div
            key="welcome-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-sm bg-[#111111] border border-white/10 rounded-[2.5rem] p-10 text-center space-y-8 shadow-2xl"
            >
              <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-emerald-500" />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl font-serif font-bold text-white tracking-tight">Welcome to Nano</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Your advanced toolkit for cyber intelligence, system diagnostics, and digital exploration. Experience the power of AI-driven tools with zero simulation.
                </p>
              </div>

              <button
                onClick={handleGetStarted}
                className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl text-sm uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-emerald-500/20"
              >
                Get Started
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
