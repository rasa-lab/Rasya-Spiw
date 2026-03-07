import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from './context/ConfigContext';
import { AuthProvider, useAuth, getCyberData } from './context/AuthContext';
import { Layout } from './components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, X, RefreshCw, Terminal, Lock, ShieldAlert, MessageSquare } from 'lucide-react';

// Pages
import Dashboard from './pages/Dashboard';
import Tools from './pages/Tools';
import LiveData from './pages/LiveData';
import AIChat from './pages/AIChat';
import GroupChat from './pages/GroupChat';
import FileManager from './pages/FileManager';
import CodePreview from './pages/CodePreview';
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
  const [isLoading, setIsLoading] = useState(true);
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [maintenanceText, setMaintenanceText] = useState('Terimakasih telah menggunakan layanan kami. Kami sedang melakukan peningkatan sistem untuk memberikan pengalaman terbaik bagi Anda.');
  const [maintenanceWa, setMaintenanceWa] = useState('6281234567890');

  useEffect(() => {
    try {
      setIsMaintenance(localStorage.getItem('nano_maintenance') === 'true');
      const text = localStorage.getItem('nano_maintenance_text');
      if (text) setMaintenanceText(text);
      const wa = localStorage.getItem('nano_maintenance_wa');
      if (wa) setMaintenanceWa(wa);
    } catch (e) {
      console.error("Failed to check maintenance mode", e);
    }
    initSecuritySystems();
  }, []);

  useEffect(() => {
    const checkSecurity = async () => {
      try {
        const cyber = await getCyberData();
        let bannedIps = [];
        try {
          bannedIps = JSON.parse(localStorage.getItem('nano_banned_ips') || '[]');
        } catch (e) {
          console.error("Failed to parse banned IPs in App", e);
        }

        if (bannedIps.includes(cyber.ip) && user?.role !== 'owner') {
          setIsBanned(true);
          logout();
        }
      } catch (err) {
        console.error("Security check failed", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSecurity();

    if (user?.isLoggedIn) {
      const hasSeen = localStorage.getItem('nano_welcome_seen');
      if (!hasSeen) {
        setShowWelcome(true);
      }
    }
  }, [user?.isLoggedIn, user?.role, logout]);

  const closeWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('nano_welcome_seen', 'true');
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
          <Shield className="w-12 h-12 text-emerald-500 animate-pulse relative z-10" />
        </div>
        <div className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-[0.3em] animate-pulse">
          Initializing Security Core...
        </div>
      </div>
    );
  }

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

  if (isMaintenance && user?.role !== 'owner') {
    return (
      <div className="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center p-6 text-center space-y-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent animate-pulse" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 blur-[100px] rounded-full animate-blob animation-delay-2000" />
        </div>
        
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute opacity-[0.03]"
        >
          <Terminal className="w-[500px] h-[500px] text-emerald-500" />
        </motion.div>

        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full animate-pulse" />
          <div className="relative p-8 glass rounded-[3rem] border border-emerald-500/30">
            <RefreshCw className="w-16 h-16 text-emerald-500 animate-spin" />
          </div>
        </div>

        <div className="space-y-6 max-w-md relative z-10">
          <div className="space-y-2">
            <h1 className="text-5xl font-serif font-black tracking-tighter text-white uppercase italic">
              Under <span className="text-emerald-500">Maintenance</span>
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-emerald-500/50" />
              <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.3em]">System Upgrade in Progress</span>
              <div className="h-px w-8 bg-emerald-500/50" />
            </div>
          </div>

          <p className="text-zinc-400 text-sm font-mono leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
            "{maintenanceText}"
          </p>
          
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-4 glass rounded-2xl border border-white/5">
              <div className="text-[8px] text-zinc-500 uppercase mb-1">Status</div>
              <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                UPGRADING CORE
              </div>
            </div>
            <div className="p-4 glass rounded-2xl border border-white/5">
              <div className="text-[8px] text-zinc-500 uppercase mb-1">ETA</div>
              <div className="text-[10px] font-bold text-blue-400">~ 2 HOURS</div>
            </div>
          </div>

          <div className="pt-4">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(16,185,129,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(`https://wa.me/${maintenanceWa}`, '_blank')}
              className="w-full py-5 bg-emerald-500 text-black rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-3"
            >
              <MessageSquare className="w-5 h-5" />
              Hubungi Owner
            </motion.button>
          </div>
        </div>

        <div className="absolute bottom-8 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-700 uppercase tracking-[0.3em]">
            <Lock className="w-3 h-3" /> Nano Suite Security Core v2.5
          </div>
          <div className="text-[8px] text-zinc-800 font-mono">ENCRYPTED SESSION: {Math.random().toString(36).substring(7).toUpperCase()}</div>
        </div>
      </div>
    );
  }

  return (
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
                    Welcome back, {user?.fullName}. System initialized.
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
          <Route path="/group" element={<GroupChat />} />
          <Route path="/files" element={<FileManager />} />
          <Route path="/preview" element={<CodePreview />} />
          <Route path="/chat" element={<AIChat />} />
          <Route path="/special" element={<Special />} />
          <Route path="/others" element={<Others />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <ConfigProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ConfigProvider>
  );
}

