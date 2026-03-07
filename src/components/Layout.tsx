import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wrench, 
  Activity, 
  Users, 
  Settings, 
  Cpu, 
  Star, 
  MoreHorizontal,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Layout: React.FC = React.memo(() => {
  const location = useLocation();
  const [showMonitor, setShowMonitor] = React.useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Wrench, label: 'Tools', path: '/tools' },
    { icon: Star, label: 'Special', path: '/special' },
    { icon: MessageSquare, label: 'Group', path: '/group' },
    { icon: MoreHorizontal, label: 'Others', path: '/others' },
  ];

  return (
    <div className="min-h-screen pb-24 bg-zinc-950">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 glass flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowMonitor(!showMonitor)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Settings className="w-5 h-5 text-zinc-400" />
          </button>
          <h1 className="font-serif text-lg font-bold tracking-tight text-emerald-500">
            NANO SUITE
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">System Status</span>
            <span className="text-xs font-mono text-emerald-400">ONLINE</span>
          </div>
          <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
        </div>
      </header>

      {/* Monitor Overlay */}
      <AnimatePresence>
        {showMonitor && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed inset-y-0 left-0 w-64 z-[60] glass-darker p-6 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">System Monitor</h2>
              <button onClick={() => setShowMonitor(false)} className="text-zinc-500 hover:text-white">×</button>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-500">CPU Usage</span>
                  <span className="text-emerald-400">12%</span>
                </div>
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[12%]" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-500">Memory</span>
                  <span className="text-emerald-400">2.4GB / 8GB</span>
                </div>
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[30%]" />
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <NavLink 
                  to="/settings" 
                  onClick={() => setShowMonitor(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-sm text-zinc-300"
                >
                  <Settings className="w-4 h-4" />
                  Configuration
                </NavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-20 px-4 max-w-lg mx-auto relative z-10">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] h-20 glass-darker px-2 pb-safe">
        <div className="flex items-center justify-around h-full max-w-lg mx-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex flex-col items-center gap-1 p-2 transition-all duration-300",
                isActive ? "text-emerald-400 scale-110" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium uppercase tracking-tighter">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
});
