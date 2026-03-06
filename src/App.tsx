import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from './context/ConfigContext';
import { AuthProvider, useAuth, getCyberData } from './context/AuthContext';
import { Layout } from './components/Layout';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ChevronRight, X, RefreshCw, Terminal, Lock, ShieldAlert } from 'lucide-react';

// Pages
import Dashboard from './pages/Dashboard';
import Tools from './pages/Tools';
import LiveData from './pages/LiveData';
import AIChat from './pages/AIChat';
import Special from './pages/Special';
import Others from './pages/Others';
import Settings from './pages/Settings';
import { Login } from './pages/Login';
import { AdminPanel } from './pages/AdminPanel';
import { initSecuritySystems } from './services/CyberSecurityService';

const AppContent = () => {
  const { user, logout } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const isMaintenance = localStorage.getItem('nano_maintenance') === 'true';

  useEffect(() => {
    initSecuritySystems();
    
    const checkSecurity = async () => {
      const cyber = await getCyberData();
      const bannedIps = JSON.parse(localStorage.getItem('nano_banned_ips') || '[]');
      if (bannedIps.includes(cyber.ip) && user?.role !== 'owner') {
        setIsBanned(true);
        logout();
      }
    };
    checkSecurity();

    if (user?.isLoggedIn) {
      const hasSeen = localStorage.getItem('nano_welcome_seen');
      if (!hasSeen) {
        setShowWelcome(true);
      }
    }
  }, [user, logout]);

  const closeWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('nano_welcome_seen', 'true');
  };

  if (isBanned) {
    return (
      <div className="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center p-6 text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full animate-pulse" />
          <ShieldAlert className="w-24 h-24 text-red-500 relative z-10" />
        </div>
        <div className="space-y-4 max-w-md relative z-10">
          <h1 className="text-4xl font-serif font-bold tracking-tighter text-white uppercase">Access Denied</h1>
          <p className="text-zinc-500 text-sm font-mono leading-relaxed">
            Your IP address has been blacklisted by the Nano Suite Security Core [VCX-5] due to suspicious activity.
          </p>
        </div>
      </div>
    );
  }

  if (!user?.isLoggedIn) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      {isMaintenance && user?.role !== 'owner' ? (
        <div className="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center p-6 text-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full animate-pulse" />
            <RefreshCw className="w-24 h-24 text-emerald-500 animate-spin relative z-10" />
          </div>
          <div className="space-y-4 max-w-md relative z-10">
            <h1 className="text-4xl font-serif font-bold tracking-tighter text-white">SYSTEM MAINTENANCE</h1>
            <p className="text-zinc-500 text-sm font-mono leading-relaxed">
              Protocol [UP-1] is currently upgrading the Nano Suite core. 
              Security layers are being reinforced and system modules are being optimized.
            </p>
            <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-2xl text-left space-y-2 font-mono text-[10px]">
              <div className="flex items-center gap-2 text-emerald-400">
                <Terminal className="w-3 h-3" /> STATUS_LOG:
              </div>
              <div className="text-zinc-400">
                &gt; Initializing X-ZERO Antivirus... [OK]<br/>
                &gt; Patching Kernel Vulnerabilities... [OK]<br/>
                &gt; Upgrading UI Engine... [IN_PROGRESS]<br/>
                &gt; Protocol UP-1: ACTIVE
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-700 uppercase tracking-[0.3em]">
            <Lock className="w-3 h-3" /> Secure Connection Active
          </div>
        </div>
      ) : (
        <>
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
                  className="relative z-10 w-full py-5 bg-emerald-500 text-black rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-400 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group"
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
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </>
      )}
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

