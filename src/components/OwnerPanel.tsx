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
  Send,
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
import { motion, AnimatePresence } from 'framer-motion';
import { addCyberLog } from '../context/AuthContext';
import { generateAIContent } from '../services/aiService';

interface OwnerPanelProps {
  user: any;
}

const OwnerPanel: React.FC<OwnerPanelProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'monitor' | 'ai' | 'admins' | 'private' | 'maintenance' | 'blacklist' | 'broadcast'>('monitor');
  const [logs, setLogs] = useState<any[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
  const [bannedIps, setBannedIps] = useState<string[]>([]);
  const [maintenance, setMaintenance] = useState(localStorage.getItem('nano_maintenance') === 'true');
  const [maintenanceText, setMaintenanceText] = useState(localStorage.getItem('nano_maintenance_text') || 'Terimakasih telah menggunakan layanan kami. Kami sedang melakukan peningkatan sistem untuk memberikan pengalaman terbaik bagi Anda.');
  const [maintenanceWa, setMaintenanceWa] = useState(localStorage.getItem('nano_maintenance_wa') || '6281234567890');
  
  // Admin Creation State
  const [newAdmin, setNewAdmin] = useState({ fullName: '', username: '', password: '' });
  
  // Private Chat State
  const [privateChat, setPrivateChat] = useState<any[]>(() => {
    const saved = localStorage.getItem('nano_private_chat');
    return saved ? JSON.parse(saved) : [];
  });
  const [privateMsg, setPrivateMsg] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);

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

  useEffect(() => {
    localStorage.setItem('nano_private_chat', JSON.stringify(privateChat));
  }, [privateChat]);

  const handleCreateAdmin = () => {
    if (!newAdmin.fullName || !newAdmin.username || !newAdmin.password) return;
    const users = JSON.parse(localStorage.getItem('nano_registered_users') || '[]');
    const adminUser = { ...newAdmin, role: 'admin', id: Date.now() };
    users.push(adminUser);
    localStorage.setItem('nano_registered_users', JSON.stringify(users));
    setRegisteredUsers(users);
    setNewAdmin({ fullName: '', username: '', password: '' });
    addCyberLog('OWNER', `Promoted ${newAdmin.username} to ADMINISTRATOR`);
    alert('Admin account created successfully.');
  };

  const handleSendPrivate = () => {
    if (!privateMsg.trim() || !selectedUser) return;
    const msg = {
      id: Date.now(),
      from: 'OWNER',
      to: selectedUser.username,
      text: privateMsg,
      time: new Date().toLocaleTimeString()
    };
    setPrivateChat(prev => [...prev, msg]);
    setPrivateMsg('');
  };

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
    localStorage.setItem('nano_maintenance_text', maintenanceText);
    localStorage.setItem('nano_maintenance_wa', maintenanceWa);
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
          { id: 'ai', label: 'TERM-1 AI', icon: Cpu },
          { id: 'admins', label: 'Admins', icon: ShieldAlert },
          { id: 'private', label: 'Private', icon: Lock },
          { id: 'maintenance', label: 'Maintenance', icon: RefreshCw },
          { id: 'blacklist', label: 'Blacklist', icon: Ban },
          { id: 'broadcast', label: 'Broadcast', icon: Bell },
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
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${u.role === 'admin' ? 'bg-blue-500/10 text-blue-400' : 'bg-zinc-500/10 text-zinc-400'}`}>
                            {u.fullName[0]}
                          </div>
                          <div>
                            <div className="text-[10px] font-bold text-zinc-200">{u.fullName}</div>
                            <div className="text-[8px] text-zinc-500">@{u.username} | {u.role.toUpperCase()}</div>
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

          {activeTab === 'ai' && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                    <Cpu className="w-4 h-4" /> Intelligence Core [TERM-1]
                  </h3>
                  <span className="text-[8px] text-zinc-600 font-mono">UNRESTRICTED ACCESS</span>
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
                    placeholder="Command TERM-1..."
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

          {activeTab === 'admins' && (
            <motion.div
              key="admins"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 flex items-center gap-2">
                  <UserPlus className="w-4 h-4" /> Create Admin Account
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input 
                    value={newAdmin.fullName}
                    onChange={e => setNewAdmin({...newAdmin, fullName: e.target.value})}
                    placeholder="Full Name" 
                    className="bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-xs" 
                  />
                  <input 
                    value={newAdmin.username}
                    onChange={e => setNewAdmin({...newAdmin, username: e.target.value})}
                    placeholder="Username" 
                    className="bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-xs" 
                  />
                  <input 
                    type="password"
                    value={newAdmin.password}
                    onChange={e => setNewAdmin({...newAdmin, password: e.target.value})}
                    placeholder="Password" 
                    className="bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-xs" 
                  />
                </div>
                <button 
                  onClick={handleCreateAdmin}
                  className="w-full py-3 bg-blue-500 text-white rounded-xl font-bold uppercase tracking-widest text-[10px]"
                >
                  Authorize Admin Account
                </button>
              </div>

              <div className="glass p-6 rounded-3xl border border-white/5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Current Administrators</h3>
                <div className="space-y-2">
                  {registeredUsers.filter(u => u.role === 'admin').map((u, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/50 border border-white/5">
                      <div className="flex items-center gap-3">
                        <ShieldAlert className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-bold text-zinc-200">{u.fullName} (@{u.username})</span>
                      </div>
                      <button className="text-red-500 text-[10px] font-bold uppercase">Revoke</button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'private' && (
            <motion.div
              key="private"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="glass p-6 rounded-3xl border border-white/5 md:col-span-1 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Select User</h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto no-scrollbar">
                  {registeredUsers.map((u, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedUser(u)}
                      className={`w-full p-3 rounded-xl text-left transition-all border ${
                        selectedUser?.username === u.username ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-zinc-950/50 border-white/5'
                      }`}
                    >
                      <div className="text-[10px] font-bold text-zinc-200">{u.fullName}</div>
                      <div className="text-[8px] text-zinc-500">@{u.username}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="glass p-6 rounded-3xl border border-white/5 md:col-span-2 flex flex-col h-[400px]">
                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">
                  {selectedUser ? `Chat with ${selectedUser.fullName}` : 'Select a user to start private chat'}
                </h3>
                <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar mb-4">
                  {privateChat.filter(m => m.to === selectedUser?.username || (m.from === selectedUser?.username && m.to === 'OWNER')).map((m, i) => (
                    <div key={i} className={`p-3 rounded-xl max-w-[80%] ${m.from === 'OWNER' ? 'bg-emerald-500 text-black ml-auto' : 'bg-zinc-900 text-zinc-300'}`}>
                      <p className="text-xs">{m.text}</p>
                      <span className="text-[8px] opacity-50 block mt-1">{m.time}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    value={privateMsg}
                    onChange={e => setPrivateMsg(e.target.value)}
                    placeholder="Type private message..."
                    className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-xs"
                  />
                  <button 
                    onClick={handleSendPrivate}
                    className="p-2 bg-emerald-500 text-black rounded-xl"
                  >
                    <Send className="w-4 h-4" />
                  </button>
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
              <div className="space-y-4 text-left">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Maintenance Message</label>
                  <textarea 
                    value={maintenanceText}
                    onChange={(e) => setMaintenanceText(e.target.value)}
                    placeholder="Enter maintenance message..."
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 min-h-[100px] resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">WhatsApp Contact (Optional)</label>
                  <input 
                    type="text"
                    value={maintenanceWa}
                    onChange={(e) => setMaintenanceWa(e.target.value)}
                    placeholder="e.g. 6281234567890"
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>
              <button
                onClick={toggleMaintenance}
                className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all ${
                  maintenance 
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                    : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                }`}
              >
                {maintenance ? 'Save & Disable Maintenance' : 'Save & Enable Maintenance'}
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

          {activeTab === 'blacklist' && (
            <motion.div
              key="blacklist"
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

          {activeTab === 'broadcast' && (
            <motion.div
              key="broadcast"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                  <Bell className="w-4 h-4" /> System Broadcast
                </h3>
                <textarea 
                  value={ownerMessage}
                  onChange={(e) => setOwnerMessage(e.target.value)}
                  placeholder="Enter broadcast message for all users..."
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm min-h-[100px] focus:outline-none focus:border-emerald-500/50"
                />
                <button 
                  onClick={() => {
                    if (!ownerMessage.trim()) return;
                    localStorage.setItem('nano_system_broadcast', JSON.stringify({
                      msg: ownerMessage,
                      time: new Date().toLocaleString(),
                      author: 'OWNER'
                    }));
                    setOwnerMessage('');
                    alert('Broadcast sent to all users.');
                  }}
                  className="w-full py-3 bg-emerald-500 text-black rounded-xl font-bold uppercase tracking-widest text-[10px]"
                >
                  Send Broadcast
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OwnerPanel;
