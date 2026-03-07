import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Users, 
  Bot, 
  Shield, 
  Terminal,
  User,
  MoreVertical,
  Trash2,
  Lock,
  MessageSquare
} from 'lucide-react';
import { useAuth, addCyberLog } from '../context/AuthContext';
import { generateAIContent } from '../services/aiService';

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  role: 'user' | 'admin' | 'owner' | 'ai';
  isPrivate?: boolean;
}

const GroupChat: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('nano_group_messages');
    return saved ? JSON.parse(saved) : [
      { id: '1', sender: 'System', text: 'Welcome to Nano Suite Global Network.', time: '00:00', role: 'ai' }
    ];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('nano_group_messages', JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: user?.fullName || 'Anonymous',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      role: user?.role || 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Check for AI trigger
    if (input.toLowerCase().includes('@ai')) {
      setIsTyping(true);
      try {
        const prompt = input.replace(/@ai/gi, '').trim();
        const aiResponse = await generateAIContent(prompt || "Hello, how can I help you in this group chat?");
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'NANO_AI',
          text: aiResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          role: 'ai'
        };
        setMessages(prev => [...prev, aiMessage]);
      } catch (err) {
        console.error("AI Error:", err);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const clearChat = () => {
    if (user?.role === 'owner' || user?.role === 'admin') {
      setMessages([{ id: '1', sender: 'System', text: 'Chat cleared by administrator.', time: '00:00', role: 'ai' }]);
      addCyberLog(user.fullName, 'CLEARED_GROUP_CHAT');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] glass rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
            <Users className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-white">Global Network</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Secure Channel Active</span>
            </div>
          </div>
        </div>
        {(user?.role === 'owner' || user?.role === 'admin') && (
          <button 
            onClick={clearChat}
            className="p-3 hover:bg-red-500/10 rounded-2xl text-zinc-500 hover:text-red-500 transition-all"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar"
      >
        {messages.map((msg) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id}
            className={`flex flex-col ${msg.role === 'ai' ? 'items-center' : msg.sender === user?.fullName ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-2 mb-1 px-2">
              {msg.role === 'ai' && <Bot className="w-3 h-3 text-emerald-500" />}
              {msg.role === 'owner' && <Shield className="w-3 h-3 text-red-500" />}
              {msg.role === 'admin' && <Shield className="w-3 h-3 text-blue-500" />}
              <span className={`text-[10px] font-black uppercase tracking-widest ${
                msg.role === 'ai' ? 'text-emerald-500' : 
                msg.role === 'owner' ? 'text-red-500' : 
                msg.role === 'admin' ? 'text-blue-500' : 'text-zinc-500'
              }`}>
                {msg.sender}
              </span>
              <span className="text-[9px] font-mono text-zinc-600">{msg.time}</span>
            </div>
            <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
              msg.role === 'ai' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 text-center italic' :
              msg.sender === user?.fullName ? 'bg-emerald-500 text-black font-medium rounded-tr-none' : 
              'bg-zinc-900 border border-white/5 text-zinc-300 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-emerald-500/50 font-mono text-[10px] uppercase tracking-widest px-2">
            <Bot className="w-3 h-3 animate-bounce" />
            Nano AI is processing...
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-6 bg-white/[0.02] border-t border-white/5">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type @Ai to call intelligence..."
            className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700 font-medium"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-emerald-500 text-black rounded-xl hover:bg-emerald-400 transition-all active:scale-90 shadow-lg shadow-emerald-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
            <Lock className="w-3 h-3" /> End-to-End Encrypted
          </div>
          <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
            {user?.role.toUpperCase()} SESSION
          </div>
        </div>
      </form>
    </div>
  );
};

export default GroupChat;
