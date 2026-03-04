import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Users, 
  Server, 
  Activity, 
  Database, 
  Lock, 
  Globe, 
  Cpu, 
  Zap,
  Terminal,
  Search,
  RefreshCw,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'servers' | 'logs' | 'security'>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [serverStatus, setServerStatus] = useState({
    cpu: 12,
    ram: 45,
    storage: 68,
    uptime: '14d 5h 22m',
    status: 'OPTIMIZED'
  });

  useEffect(() => {
    // Load registered users from localStorage
    const savedUsers = JSON.parse(localStorage.getItem('nano_registered_users') || '[]');
    setUsers(savedUsers);
    
    // Load cyber logs
    const savedLogs = JSON.parse(localStorage.getItem('nano_cyber_logs') || []);
    setLogs(savedLogs);
  }, []);

  if (user?.role !== 'owner' && user?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Lock className="w-16 h-16 text-red-500" />
        <h2 className="text-xl font-bold uppercase tracking-widest">Access Denied</h2>
        <p className="text-zinc-500 text-sm">Owner/Admin privileges required.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between px-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">ADMIN PANEL</h1>
          <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">System Management & Intelligence</p>
        </div>
        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">Owner Mode</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Total Users', val: users.length, icon: Users, color: 'text-blue-400' },
          { label: 'Active Servers', val: '4/4', icon: Server, color: 'text-emerald-400' },
          { label: 'System Load', val: 'Low', icon: Activity, color: 'text-purple-400' },
          { label: 'Security Level', val: 'MAX', icon: Shield, color: 'text-red-400' },
        ].map((s, i) => (
          <div key={i} className="glass p-4 rounded-2xl border border-white/5 flex items-center gap-3">
            <div className={`p-2 bg-white/5 rounded-xl ${s.color}`}>
              <s.icon className="w-3 h-3" />
            </div>
            <div>
              <div className="text-[8px] text-zinc-500 uppercase font-bold">{s.label}</div>
              <div className="text-[10px] font-mono font-bold text-zinc-200">{s.val}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-zinc-900 rounded-2xl overflow-x-auto no-scrollbar">
        {[
          { id: 'users', name: 'Users', icon: Users },
          { id: 'servers', name: 'Servers', icon: Server },
          { id: 'logs', name: 'Logs', icon: Terminal },
          { id: 'security', name: 'Security', icon: Lock }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex-1 min-w-[80px] py-2 flex flex-col items-center gap-1 rounded-xl transition-all ${activeTab === t.id ? 'bg-emerald-500 text-black' : 'text-zinc-500'}`}
          >
            <t.icon className="w-4 h-4" />
            <span className="text-[8px] font-bold uppercase tracking-widest">{t.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="glass rounded-[2.5rem] p-6 border border-white/5 min-h-[400px]">
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Registered Users</h3>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-600" />
                <input type="text" placeholder="Search..." className="bg-black/50 border border-white/5 rounded-lg pl-7 pr-2 py-1 text-[10px] focus:outline-none" />
              </div>
            </div>
            <div className="space-y-2">
              {users.map((u, i) => (
                <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between group hover:border-emerald-500/30 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-[10px] font-bold text-zinc-500">
                      {u.fullName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-zinc-200">{u.fullName}</div>
                      <div className="text-[8px] text-zinc-500 font-mono">@{u.username} • {u.role}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-3 h-3 text-zinc-700 group-hover:text-emerald-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'servers' && (
          <div className="space-y-6">
            <div className="p-6 bg-emerald-500/5 rounded-3xl border border-emerald-500/20 text-center space-y-2">
              <Server className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="font-bold">Server Optimization</h3>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Global Node Status: {serverStatus.status}</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {[
                { label: 'CPU Usage', val: serverStatus.cpu, color: 'bg-blue-500' },
                { label: 'RAM Usage', val: serverStatus.ram, color: 'bg-purple-500' },
                { label: 'Storage', val: serverStatus.storage, color: 'bg-emerald-500' },
              ].map((s, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest text-zinc-500">
                    <span>{s.label}</span>
                    <span>{s.val}%</span>
                  </div>
                  <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${s.val}%` }}
                      className={`h-full ${s.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button className="py-3 bg-zinc-900 border border-white/5 rounded-xl text-[8px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <RefreshCw className="w-3 h-3" />
                Restart Node
              </button>
              <button className="py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[8px] font-bold uppercase tracking-widest text-emerald-500 flex items-center justify-center gap-2">
                <Zap className="w-3 h-3" />
                Optimize
              </button>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">System Logs</h3>
            <div className="bg-black/50 rounded-2xl p-4 font-mono text-[9px] space-y-2 max-h-[300px] overflow-y-auto no-scrollbar border border-white/5">
              {logs.length > 0 ? logs.map((log) => (
                <div key={log.id} className="flex gap-2">
                  <span className="text-zinc-500">[{log.time}]</span>
                  <span className="text-emerald-500 font-bold">{log.user}:</span>
                  <span className="text-zinc-300">{log.action}</span>
                </div>
              )) : (
                <div className="text-zinc-600 italic">No logs available...</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="p-6 bg-red-500/5 rounded-3xl border border-red-500/20 text-center space-y-2">
              <Lock className="w-12 h-12 text-red-500 mx-auto" />
              <h3 className="font-bold">Security Protocols</h3>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Firewall Status: ULTRA-SECURE</p>
            </div>

            <div className="space-y-3">
              {[
                { label: 'IP Masking', status: 'ENABLED', desc: 'DDoS Protection Active' },
                { label: 'X Zero-AV', status: 'ENABLED', desc: 'Real-time Virus Shield' },
                { label: 'Data Encryption', status: 'AES-256', desc: 'End-to-end active' },
              ].map((s, i) => (
                <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-zinc-200">{s.label}</div>
                    <div className="text-[8px] text-zinc-500 uppercase">{s.desc}</div>
                  </div>
                  <div className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">{s.status}</div>
                </div>
              ))}
            </div>

            <button className="w-full py-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-red-500 flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Emergency Lockdown
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
