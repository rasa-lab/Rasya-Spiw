import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from './context/ConfigContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ChevronRight, X } from 'lucide-react';

// Pages
import Dashboard from './pages/Dashboard';
import Tools from './pages/Tools';
import LiveData from './pages/LiveData';
import AIChat from './pages/AIChat';
import Special from './pages/Special';
import Others from './pages/Others';
import Settings from './pages/Settings';
import { Login } from './pages/Login';

const AppContent = () => {
  const { user } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (user?.isLoggedIn) {
      const hasSeen = localStorage.getItem('nano_welcome_seen');
      if (!hasSeen) {
        setShowWelcome(true);
      }
    }
  }, [user]);

  const closeWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('nano_welcome_seen', 'true');
  };

  if (!user?.isLoggedIn) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              className="w-full max-w-md glass p-10 rounded-[3.5rem] border border-emerald-500/30 relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)]"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500" />
              
              <button 
                onClick={closeWelcome}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5 text-zinc-500" />
              </button>

              <div className="space-y-8 text-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                    <Shield className="w-12 h-12 text-emerald-500" />
                  </div>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-zinc-950 flex items-center justify-center"
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </motion.div>
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-4xl font-serif font-bold tracking-tight text-white">Nano Suite</h2>
                  <p className="text-zinc-400 text-sm leading-relaxed px-4">
                    Welcome back, {user.fullName}. System initialized.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="p-5 glass rounded-3xl border border-white/5 bg-white/[0.02]">
                    <div className="text-[10px] font-bold text-emerald-400 uppercase mb-1 tracking-widest">Security</div>
                    <div className="text-xs text-zinc-400">X zero-antivirus: Active</div>
                  </div>
                  <div className="p-5 glass rounded-3xl border border-white/5 bg-white/[0.02]">
                    <div className="text-[10px] font-bold text-blue-400 uppercase mb-1 tracking-widest">Intelligence</div>
                    <div className="text-xs text-zinc-400">Real-time OSINT: Online</div>
                  </div>
                </div>

                <button 
                  onClick={closeWelcome}
                  className="w-full py-5 bg-emerald-500 text-black rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-400 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group"
                >
                  Enter System
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/live" element={<LiveData />} />
          <Route path="/chat" element={<AIChat />} />
          <Route path="/special" element={<Special />} />
          <Route path="/others" element={<Others />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default function App() {
  return (
    <ConfigProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ConfigProvider>
  );
}

