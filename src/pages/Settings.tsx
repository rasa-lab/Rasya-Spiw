import React, { useState, useEffect } from 'react';
import { useConfig } from '../context/ConfigContext';
import { 
  Save, 
  Key, 
  Globe, 
  Database, 
  Monitor, 
  Folder, 
  MessageSquare, 
  Users, 
  Activity, 
  ChevronRight, 
  ChevronLeft,
  File,
  Send,
  Cpu,
  Zap,
  Shield,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

const Settings: React.FC = () => {
  const { config, updateConfig } = useConfig();
  const { user } = useAuth();
  const [activeSubTool, setActiveSubTool] = useState<'none' | 'files' | 'report' | 'chat' | 'monitor' | 'request'>('none');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Configuration saved locally!');
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'id', name: 'Indonesia' },
    { code: 'my', name: 'Malaysia' },
    { code: 'jp', name: 'Japanese' },
    { code: 'sg', name: 'Singapore' },
    { code: 'ru', name: 'Russian' },
    { code: 'ca', name: 'Canada' },
    { code: 'sa', name: 'Arab Saudi' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Monitor className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-serif font-bold">Settings</h1>
        </div>
        {activeSubTool !== 'none' && (
          <button 
            onClick={() => setActiveSubTool('none')}
            className="p-2 rounded-full hover:bg-white/5 text-zinc-400 flex items-center gap-1 text-[10px] font-bold uppercase"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {activeSubTool === 'none' ? (
          <motion.div 
            key="main"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* System & Support Section */}
            <section className="glass p-6 rounded-3xl space-y-4 border border-white/5">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <Zap className="w-4 h-4" />
                <h2 className="text-sm font-bold uppercase tracking-widest">System & Support</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'files', name: 'File Manager', icon: Folder, desc: 'Manage system assets' },
                  { id: 'report', name: 'Report Issue', icon: MessageSquare, desc: 'Contact Admin/Owner' },
                  { id: 'chat', name: 'Group Chat', icon: Users, desc: 'Global community chat' },
                  { id: 'monitor', name: 'System Monitor', icon: Activity, desc: 'Real-time performance' },
                  { id: 'request', name: 'Request Feature', icon: Zap, desc: 'Suggest new tools' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSubTool(item.id as any)}
                    className="w-full p-4 bg-zinc-950/50 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-emerald-500/30 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-white/5 text-zinc-400 group-hover:text-emerald-400 transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-zinc-200">{item.name}</div>
                        <div className="text-[10px] text-zinc-500">{item.desc}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-emerald-500" />
                  </button>
                ))}
              </div>
            </section>

            <form onSubmit={handleSave} className="space-y-6">
              {/* AI Config */}
              <section className="glass p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 mb-2">
                  <Key className="w-4 h-4" />
                  <h2 className="text-sm font-bold uppercase tracking-widest">AI & API Keys</h2>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-zinc-500 uppercase tracking-wider">OpenRouter API Key</label>
                  <input 
                    type="password"
                    value={config.openRouterKey}
                    onChange={(e) => updateConfig({ openRouterKey: e.target.value })}
                    placeholder="sk-or-v1-..."
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
              </section>

              {/* Database Config */}
              <section className="glass p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 mb-2">
                  <Database className="w-4 h-4" />
                  <h2 className="text-sm font-bold uppercase tracking-widest">Database Connections</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-500 uppercase tracking-wider">Supabase URL</label>
                    <input 
                      type="text"
                      value={config.supabaseUrl}
                      onChange={(e) => updateConfig({ supabaseUrl: e.target.value })}
                      placeholder="https://xyz.supabase.co"
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-500 uppercase tracking-wider">Supabase Anon Key</label>
                    <input 
                      type="password"
                      value={config.supabaseKey}
                      onChange={(e) => updateConfig({ supabaseKey: e.target.value })}
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </div>
                </div>
              </section>

              {/* Language */}
              <section className="glass p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 mb-2">
                  <Globe className="w-4 h-4" />
                  <h2 className="text-sm font-bold uppercase tracking-widest">Localization</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => updateConfig({ language: lang.code })}
                      className={`p-3 rounded-xl text-sm transition-all ${
                        config.language === lang.code 
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                          : 'bg-zinc-950 text-zinc-400 border border-white/5 hover:border-white/20'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </section>

              <button 
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save All Changes
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div 
            key="subtool"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass rounded-[2.5rem] p-6 border border-white/5 min-h-[500px]"
          >
            {activeSubTool === 'files' && <FileManager />}
            {activeSubTool === 'report' && <ReportIssue user={user} />}
            {activeSubTool === 'chat' && <GroupChat user={user} />}
            {activeSubTool === 'monitor' && <SystemMonitor />}
            {activeSubTool === 'request' && <RequestFeature user={user} />}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FileManager = () => {
  const files = [
    { name: 'system_core.bin', size: '1.2 GB', type: 'System' },
    { name: 'user_database.db', size: '450 MB', type: 'Database' },
    { name: 'security_logs.txt', size: '12 MB', type: 'Logs' },
    { name: 'assets_v2.zip', size: '890 MB', type: 'Archive' },
    { name: 'config_backup.json', size: '45 KB', type: 'Config' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Folder className="w-6 h-6 text-emerald-400" />
        <h3 className="text-lg font-bold uppercase tracking-widest">File Manager</h3>
      </div>
      <div className="space-y-2">
        {files.map((f, i) => (
          <div key={i} className="p-4 bg-zinc-950/50 border border-white/5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <File className="w-5 h-5 text-zinc-500" />
              <div>
                <div className="text-xs font-bold text-zinc-200">{f.name}</div>
                <div className="text-[8px] text-zinc-600 uppercase tracking-widest">{f.type}</div>
              </div>
            </div>
            <div className="text-[10px] font-mono text-emerald-500/50">{f.size}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReportIssue = ({ user }: { user: any }) => {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([
    { role: 'admin', text: 'Hello! How can I help you today?', time: '09:00' }
  ]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setChat(prev => [...prev, { role: 'user', text: msg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setMsg('');
    setTimeout(() => {
      setChat(prev => [...prev, { role: 'admin', text: 'Your report has been received. Our team will investigate.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="w-6 h-6 text-emerald-400" />
        <h3 className="text-lg font-bold uppercase tracking-widest">Report Issue</h3>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 no-scrollbar">
        {chat.map((c, i) => (
          <div key={i} className={`flex flex-col ${c.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-xs ${c.role === 'user' ? 'bg-emerald-500 text-black font-bold' : 'bg-zinc-900 text-zinc-300 border border-white/5'}`}>
              {c.text}
            </div>
            <span className="text-[8px] text-zinc-600 mt-1 uppercase">{c.time}</span>
          </div>
        ))}
      </div>
      <form onSubmit={send} className="mt-4 flex gap-2">
        <input 
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Describe the issue..."
          className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-emerald-500/50"
        />
        <button type="submit" className="p-2 bg-emerald-500 text-black rounded-xl">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

const GroupChat = ({ user }: { user: any }) => {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { user: 'Admin', text: 'Welcome to the global suite chat!', time: '08:00' },
    { user: 'CyberX', text: 'Anyone found the new exploit?', time: '08:30' },
  ]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { user: user?.fullName || 'Guest', text: msg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setMsg('');
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-emerald-400" />
        <h3 className="text-lg font-bold uppercase tracking-widest">Group Chat</h3>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 no-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-bold text-emerald-500 uppercase">{m.user}</span>
              <span className="text-[7px] text-zinc-700">{m.time}</span>
            </div>
            <div className="p-3 bg-zinc-900 border border-white/5 rounded-2xl text-xs text-zinc-300">
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={send} className="mt-4 flex gap-2">
        <input 
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type message..."
          className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-emerald-500/50"
        />
        <button type="submit" className="p-2 bg-emerald-500 text-black rounded-xl">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

const SystemMonitor = () => {
  const [stats, setStats] = useState({ cpu: 0, ram: 0, net: 0 });
  const [history, setHistory] = useState<{ cpu: number[], ram: number[] }>({ cpu: [], ram: [] });

  useEffect(() => {
    const interval = setInterval(() => {
      const newCpu = Math.floor(Math.random() * 30) + 10;
      const newRam = Math.floor(Math.random() * 20) + 40;
      const newNet = Math.floor(Math.random() * 100) + 50;
      
      setStats({ cpu: newCpu, ram: newRam, net: newNet });
      setHistory(prev => ({
        cpu: [...prev.cpu.slice(-29), newCpu],
        ram: [...prev.ram.slice(-29), newRam]
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-4">
        <Activity className="w-6 h-6 text-emerald-400" />
        <h3 className="text-lg font-bold uppercase tracking-widest">System Monitor</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {[
          { label: 'CPU LOAD', val: stats.cpu, icon: Cpu, color: 'text-blue-400', bar: 'bg-blue-500', hist: history.cpu },
          { label: 'RAM USAGE', val: stats.ram, icon: Database, color: 'text-purple-400', bar: 'bg-purple-500', hist: history.ram },
          { label: 'NETWORK SPEED', val: stats.net, icon: Zap, color: 'text-emerald-400', bar: 'bg-emerald-500', unit: 'MB/s' },
        ].map((s, i) => (
          <div key={i} className="space-y-3">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2">
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{s.label}</span>
              </div>
              <span className="text-sm font-mono font-bold text-zinc-200">{s.val}{s.unit || '%'}</span>
            </div>
            
            {s.hist && (
              <div className="flex items-end gap-0.5 h-8 mb-1">
                {s.hist.map((h, idx) => (
                  <div 
                    key={idx} 
                    className={`flex-1 ${s.bar} opacity-20 rounded-t-sm`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            )}

            <div className="h-2 bg-zinc-950 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                animate={{ width: `${s.val}%` }}
                className={`h-full ${s.bar} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-2 relative z-10">
          <Shield className="w-5 h-5 text-emerald-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">System Status</span>
        </div>
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed relative z-10">
          All nodes operational. Firewall integrity at 100%. No unauthorized intrusions detected in the last 24 hours. Kernel version 6.1.0-xzero-pro.
        </p>
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />
      </div>
    </div>
  );
};

const RequestFeature = ({ user }: { user: any }) => {
  const [feature, setFeature] = useState('');
  const [desc, setDesc] = useState('');
  const [isSending, setIsSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSending(false);
    alert('Feature request submitted to Nano Admin!');
    setFeature('');
    setDesc('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-6 h-6 text-emerald-400" />
        <h3 className="text-lg font-bold uppercase tracking-widest">Request Feature</h3>
      </div>
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Feature Name</label>
          <input 
            value={feature}
            onChange={(e) => setFeature(e.target.value)}
            placeholder="e.g. Advanced SQL Injection Tool"
            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Description</label>
          <textarea 
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Explain how the feature should work..."
            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 min-h-[150px] resize-none"
            required
          />
        </div>
        <button 
          type="submit"
          disabled={isSending}
          className="w-full py-4 bg-emerald-500 text-black font-black rounded-2xl text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all disabled:opacity-50"
        >
          {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default Settings;
