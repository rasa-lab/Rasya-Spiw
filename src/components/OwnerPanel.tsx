import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Users, 
  MessageSquare, 
  Plus, 
  ShieldAlert, 
  UserPlus, 
  Terminal, 
  Cpu, 
  Globe, 
  Database, 
  Lock,
  Ban,
  Trash2,
  Bell,
  Tv,
  Film,
  Contact,
  Wifi,
  Eye,
  AlertTriangle,
  RefreshCw,
  Zap,
  Server
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { addCyberLog } from '../context/AuthContext';
import { generateAIContent } from '../services/aiService';

interface OwnerPanelProps {
  user: any;
}

const OwnerPanel: React.FC<OwnerPanelProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'monitor' | 'chat' | 'add' | 'maintenance' | 'band' | 'account'>('monitor');
  const [logs, setLogs] = useState<any[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
  const [bannedIps, setBannedIps] = useState<string[]>([]);
  const [maintenance, setMaintenance] = useState(localStorage.getItem('nano_maintenance') === 'true');
  const [systemStatus, setSystemStatus] = useState({
    ddos: 'NORMAL',
    xss: 'SECURE',
    users: 0,
    server: 'OPTIMAL'
  });

  const [ownerMessage, setOwnerMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { from: 'SYSTEM', msg: 'Secure channel established. TERM-1 AI Core online.', time: new Date().toLocaleTimeString(), isAi: true },
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  const handleSendOwnerMessage = async () => {
    if (!ownerMessage.trim()) return;

    const newMessage = { from: 'OWNER', msg: ownerMessage, time: new Date().toLocaleTimeString(), isAi: false };
    setChatMessages(prev => [...prev, newMessage]);
    setOwnerMessage('');
    setIsAiTyping(true);

    try {
      const aiResponse = await generateAIContent(ownerMessage, 'term-1');
      setChatMessages(prev => [...prev, { from: 'TERM-1', msg: aiResponse, time: new Date().toLocaleTimeString(), isAi: true }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { from: 'SYSTEM', msg: 'AI Core connection lost. Retry protocol initiated.', time: new Date().toLocaleTimeString(), isAi: true }]);
    } finally {
      setIsAiTyping(false);
    }
  };

  useEffect(() => {
    const loadData = () => {
      setLogs(JSON.parse(localStorage.getItem('nano_cyber_logs') || '[]'));
      setRegisteredUsers(JSON.parse(localStorage.getItem('nano_registered_users') || '[]'));
      setBannedIps(JSON.parse(localStorage.getItem('nano_banned_ips') || '[]'));
      setSystemStatus(prev => ({ ...prev, users: JSON.parse(localStorage.getItem('nano_registered_users') || '[]').length }));
    };
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleMaintenance = () => {
    const newState = !maintenance;
    setMaintenance(newState);
    localStorage.setItem('nano_maintenance', String(newState));
    addCyberLog('OWNER', `Maintenance mode ${newState ? 'ENABLED' : 'DISABLED'}`);
    if (newState) {
      addCyberLog('SYSTEM', 'Initiating auto-upgrade protocol [UP-1]');
    }
  };

  const handleBan = (ip: string) => {
    if (!ip) return;
    const newBanned = [...bannedIps, ip];
    setBannedIps(newBanned);
    localStorage.setItem('nano_banned_ips', JSON.stringify(newBanned));
    addCyberLog('OWNER', `Banned IP: ${ip} [VCX-5]`);
  };

  const handleUnban = (ip: string) => {
    const newBanned = bannedIps.filter(i => i !== ip);
    setBannedIps(newBanned);
    localStorage.setItem('nano_banned_ips', JSON.stringify(newBanned));
    addCyberLog('OWNER', `Unbanned IP: ${ip}`);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'DDOS PROTECTION', val: systemStatus.ddos, icon: ShieldAlert, color: 'text-emerald-400' },
          { label: 'XSS SCANNER', val: systemStatus.xss, icon: Lock, color: 'text-blue-400' },
          { label: 'ACTIVE USERS', val: systemStatus.users, icon: Users, color: 'text-purple-400' },
          { label: 'SERVER LOAD', val: systemStatus.server, icon: Server, color: 'text-orange-400' },
        ].map((stat, i) => (
          <div key={i} className="glass p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
            <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
            <div className="text-[8px] text-zinc-500 uppercase font-bold tracking-widest">{stat.label}</div>
            <div className="text-sm font-mono font-bold text-zinc-200">{stat.val}</div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 p-1 bg-zinc-950/50 rounded-2xl border border-white/5">
        {[
          { id: 'monitor', label: 'Monitor', icon: Activity },
          { id: 'chat', label: 'Chat', icon: MessageSquare },
          { id: 'add', label: 'Add', icon: Plus },
          { id: 'maintenance', label: 'Maintenance', icon: RefreshCw },
          { id: 'band', label: 'Band', icon: Ban },
          { id: 'account', label: 'Account', icon: UserPlus },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'monitor' && (
            <motion.div
              key="monitor"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> System Activity Logs
                  </h3>
                  <span className="text-[8px] text-zinc-600 font-mono">REAL-TIME FEED [CZ-1]</span>
                </div>
                <div className="space-y-2 max-h-[300px] overflow-y-auto no-scrollbar font-mono text-[10px]">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 p-2 rounded-lg bg-zinc-950/30 border border-white/5 group hover:border-emerald-500/20 transition-all">
                      <span className="text-zinc-600">[{log.time}]</span>
                      <span className="text-emerald-500 font-bold">{log.user}:</span>
                      <span className="text-zinc-400">{log.action}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass p-6 rounded-3xl border border-white/5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Registered Users
                  </h3>
                  <div className="space-y-3">
                    {registeredUsers.map((u, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/50 border border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-xs">
                            {u.fullName[0]}
                          </div>
                          <div>
                            <div className="text-[10px] font-bold text-zinc-200">{u.fullName}</div>
                            <div className="text-[8px] text-zinc-500">@{u.username}</div>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleBan(u.ip || '127.0.0.1')}
                          className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all"
                        >
                          <Ban className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass p-6 rounded-3xl border border-white/5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> System Status
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'FIREWALL (DF-1)', status: 'ACTIVE', color: 'text-emerald-400' },
                      { label: 'ANTIVIRUS (X ZERO)', status: 'SCANNING', color: 'text-blue-400' },
                      { label: 'AUTO-UPDATE (UP-1)', status: 'READY', color: 'text-zinc-500' },
                      { label: 'ILLEGAL SCAN (VCX-5)', status: 'MONITORING', color: 'text-purple-400' },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/50 border border-white/5">
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">{s.label}</span>
                        <span className={`text-[9px] font-mono font-bold ${s.color}`}>{s.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'maintenance' && (
            <motion.div
              key="maintenance"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-8 rounded-[2.5rem] border border-white/5 text-center space-y-8"
            >
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${maintenance ? 'bg-orange-500/20 text-orange-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                <RefreshCw className={`w-10 h-10 ${maintenance ? 'animate-spin' : ''}`} />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold">System Maintenance</h2>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  When enabled, the system will enter maintenance mode. Users will be blocked, and auto-upgrade protocols will initiate.
                </p>
              </div>
              <button
                onClick={toggleMaintenance}
                className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all ${
                  maintenance 
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                    : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                }`}
              >
                {maintenance ? 'Disable Maintenance' : 'Enable Maintenance'}
              </button>
              {maintenance && (
                <div className="p-4 bg-zinc-950/80 rounded-2xl border border-orange-500/20 text-left space-y-2">
                  <div className="text-[8px] font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2">
                    <Cpu className="w-3 h-3" /> Upgrade Status
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400">
                    &gt; Updating Security Core... [DONE]<br/>
                    &gt; Patching UI Vulnerabilities... [DONE]<br/>
                    &gt; Optimizing Database... [IN PROGRESS]<br/>
                    &gt; Protocol UP-1: ACTIVE
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'band' && (
            <motion.div
              key="band"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="glass p-6 rounded-3xl border border-white/5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-red-400 mb-6 flex items-center gap-2">
                  <Ban className="w-4 h-4" /> IP Blacklist [VCX-5]
                </h3>
                <div className="space-y-2">
                  {bannedIps.length === 0 ? (
                    <div className="text-center py-12 text-zinc-600 text-xs italic">No IPs currently blacklisted.</div>
                  ) : (
                    bannedIps.map((ip, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-950/50 border border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                            <ShieldAlert className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-mono text-zinc-200">{ip}</span>
                        </div>
                        <button 
                          onClick={() => handleUnban(ip)}
                          className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest hover:underline"
                        >
                          Whitelist
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Secure Comms [TERM-1]
                  </h3>
                  <span className="text-[8px] text-zinc-600 font-mono">ENCRYPTED CHANNEL</span>
                </div>
                <div className="space-y-3 max-h-[400px] overflow-y-auto no-scrollbar">
                  {chatMessages.map((m, i) => (
                    <div key={i} className={`p-4 rounded-2xl border border-white/5 space-y-1 ${m.from === 'OWNER' ? 'bg-emerald-500/5 ml-8' : 'bg-zinc-950/50 mr-8'}`}>
                      <div className="flex justify-between items-center">
                        <span className={`text-[10px] font-bold ${m.from === 'OWNER' ? 'text-blue-400' : 'text-emerald-500'}`}>@{m.from}</span>
                        <span className="text-[8px] text-zinc-600 font-mono">{m.time}</span>
                      </div>
                      <p className="text-xs text-zinc-300 whitespace-pre-wrap">{m.msg}</p>
                    </div>
                  ))}
                  {isAiTyping && (
                    <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-mono animate-pulse">
                      <Terminal className="w-3 h-3" /> TERM-1 is generating response...
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <input 
                    value={ownerMessage}
                    onChange={(e) => setOwnerMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendOwnerMessage()}
                    placeholder="Broadcast message to TERM-1..."
                    className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
                  />
                  <button 
                    onClick={handleSendOwnerMessage}
                    disabled={isAiTyping}
                    className="p-3 bg-emerald-500 rounded-xl text-black disabled:opacity-50"
                  >
                    <Zap className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'add' && (
            <motion.div
              key="add"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 flex items-center gap-2">
                  <Bell className="w-4 h-4" /> Global Notification
                </h3>
                <textarea 
                  placeholder="Enter notification content..."
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 h-32 resize-none"
                />
                <button className="w-full py-3 bg-blue-500 text-white rounded-xl font-bold uppercase tracking-widest text-[10px]">
                  Dispatch Alert
                </button>
              </div>

              <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400 flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Featured Links
                </h3>
                <div className="space-y-2">
                  <input placeholder="Link Title" className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-xs" />
                  <input placeholder="URL" className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-xs" />
                </div>
                <button className="w-full py-3 bg-purple-500 text-white rounded-xl font-bold uppercase tracking-widest text-[10px]">
                  Add Link
                </button>
              </div>

              <div className="glass p-6 rounded-3xl border border-white/5 space-y-4 md:col-span-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                  <Contact className="w-4 h-4" /> Manage Contacts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['Support Team', 'Security Ops', 'Dev Core'].map((c, i) => (
                    <div key={i} className="p-4 rounded-xl bg-zinc-950/50 border border-white/5 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-zinc-300">{c}</span>
                      <button className="text-red-500 hover:text-red-400"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  ))}
                  <button className="p-4 rounded-xl border border-dashed border-white/10 flex items-center justify-center gap-2 text-[10px] font-bold text-zinc-500 hover:text-white hover:border-white/20 transition-all">
                    <Plus className="w-3 h-3" /> New Contact
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'account' && (
            <motion.div
              key="account"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center justify-center text-emerald-500 text-4xl font-black">
                  {user.fullName[0]}
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">{user.fullName}</h2>
                  <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Nano Suite Owner</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">12</div>
                    <div className="text-[8px] text-zinc-600 uppercase font-black">Logins</div>
                  </div>
                  <div className="w-px h-8 bg-white/5" />
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">4</div>
                    <div className="text-[8px] text-zinc-600 uppercase font-black">Devices</div>
                  </div>
                  <div className="w-px h-8 bg-white/5" />
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">99%</div>
                    <div className="text-[8px] text-zinc-600 uppercase font-black">Security</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Security Settings</h3>
                  <div className="space-y-3">
                    <button className="w-full p-4 rounded-xl bg-zinc-950/50 border border-white/5 flex justify-between items-center group hover:border-emerald-500/30 transition-all">
                      <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Change Password</span>
                      <Lock className="w-4 h-4 text-zinc-600 group-hover:text-emerald-500" />
                    </button>
                    <button className="w-full p-4 rounded-xl bg-zinc-950/50 border border-white/5 flex justify-between items-center group hover:border-blue-500/30 transition-all">
                      <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">2FA Settings</span>
                      <ShieldAlert className="w-4 h-4 text-zinc-600 group-hover:text-blue-500" />
                    </button>
                  </div>
                </div>

                <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Session Management</h3>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-zinc-950/50 border border-white/5 flex justify-between items-center">
                      <div>
                        <div className="text-[10px] font-bold text-zinc-200">Current Session</div>
                        <div className="text-[8px] text-zinc-600 font-mono">IP: 192.168.1.1 [ACTIVE]</div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <button className="w-full py-3 text-[10px] font-bold text-red-500 uppercase tracking-widest hover:underline">
                      Terminate All Other Sessions
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Add other tabs as needed */}
          {false && (
            <div className="glass p-12 rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center text-center space-y-4">
              <Terminal className="w-12 h-12 text-zinc-800" />
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">Module Under Development</div>
              <p className="text-[10px] text-zinc-700 max-w-xs">Protocol ALPHA is currently prioritizing system stability and security layers.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OwnerPanel;
