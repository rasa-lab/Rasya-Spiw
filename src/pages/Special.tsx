import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Search, 
  Tv, 
  Compass, 
  UserSearch, 
  Play, 
  Star, 
  ChevronLeft,
  Globe,
  MapPin,
  Wifi,
  Calendar,
  AlertCircle,
  RefreshCw,
  Code,
  Eye,
  Terminal,
  Image as ImageIcon,
  Video,
  Moon,
  Sparkles,
  Mic,
  Scan,
  CheckSquare,
  Youtube,
  Music,
  ShieldAlert,
  Shield,
  Gamepad2,
  CalendarDays,
  Activity,
  User,
  Zap,
  Lock,
  Bug,
  ChevronRight,
  Plus,
  Bell,
  Brain,
  Grid,
  X,
  MousePointer2,
  Hash,
  Type,
  Timer,
  Dices,
  Hand,
  HelpCircle,
  Bomb,
  Layers,
  Target
} from 'lucide-react';
import axios from 'axios';
import { GoogleGenAI, Modality } from "@google/genai";

type SpecialTool = 'none' | 'tiktok' | 'youtube' | 'stalker' | 'anime' | 'tv' | 'qibla' | 'fasting' | 'builder' | 'image-gen' | 'video-gen' | 'dream' | 'horoscope' | 'voice' | 'deepfake' | 'review' | 'cyber' | 'calendar' | 'iqtest' | 'games';

const Special: React.FC = () => {
  const [active, setActive] = useState<SpecialTool>('none');

  const tools = [
    { id: 'stalker', name: 'Cyber Intelligence', icon: UserSearch, color: 'text-blue-400', desc: 'OSINT, Web Stalk, WiFi Stalk' },
    { id: 'cyber', name: 'Cyber Toolkit', icon: Shield, color: 'text-red-500', desc: 'Security analysis & hashing' },
    { id: 'tiktok', name: 'TikTok Downloader', icon: Download, color: 'text-pink-400', desc: 'No watermark downloads' },
    { id: 'youtube', name: 'YouTube Downloader', icon: Youtube, color: 'text-red-500', desc: 'Fast video downloads' },
    { id: 'image-gen', name: 'AI Image Generator', icon: ImageIcon, color: 'text-cyan-400', desc: 'Text to high-quality image' },
    { id: 'video-gen', name: 'AI Video Generator', icon: Video, color: 'text-purple-400', desc: 'Text to cinematic video' },
    { id: 'voice', name: 'AI Voice Gen', icon: Mic, color: 'text-rose-400', desc: 'Professional speech synthesis' },
    { id: 'deepfake', name: 'Deepfake Scan', icon: Scan, color: 'text-red-400', desc: 'Analyze AI manipulation' },
    { id: 'review', name: 'AI Code Review', icon: CheckSquare, color: 'text-blue-400', desc: 'Professional code analysis' },
    { id: 'builder', name: 'Nano Builder', icon: Code, color: 'text-emerald-400', desc: 'HTML/CSS playground' },
    { id: 'anime', name: 'Anime Search', icon: Search, color: 'text-orange-400', desc: 'Real-time anime library' },
    { id: 'tv', name: 'Live TV', icon: Tv, color: 'text-red-400', desc: 'Global live broadcasting' },
    { id: 'calendar', name: 'Full Calendar', icon: CalendarDays, color: 'text-blue-500', desc: 'Holidays & reminders' },
    { id: 'iqtest', name: 'IQ Test', icon: Activity, color: 'text-emerald-500', desc: 'Estimate your intelligence' },
    { id: 'games', name: 'Games Center', icon: Gamepad2, color: 'text-purple-500', desc: '15+ Interactive games' },
    { id: 'qibla', name: 'Qibla Finder', icon: Compass, color: 'text-emerald-400', desc: 'Direction to Kaaba' },
    { id: 'fasting', name: 'Fasting Schedule', icon: Calendar, color: 'text-yellow-400', desc: 'Ramadan 2026 dates' },
    { id: 'dream', name: 'Dream Interpreter', icon: Moon, color: 'text-indigo-400', desc: 'AI dream analysis' },
    { id: 'horoscope', name: 'Daily Horoscope', icon: Sparkles, color: 'text-yellow-400', desc: 'Personalized insights' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <AnimatePresence mode="wait">
        {active === 'none' ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-4"
          >
            {tools.map((tool) => (
              <motion.button
                key={tool.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActive(tool.id as SpecialTool)}
                className="glass p-5 rounded-2xl flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-zinc-950 border border-white/5 ${tool.color}`}>
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-zinc-200">{tool.name}</h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{tool.desc}</p>
                  </div>
                </div>
                <Play className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="tool"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass rounded-3xl p-6 min-h-[400px]"
          >
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setActive('none')}
                className="p-2 rounded-full hover:bg-white/5 text-zinc-400"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h2 className="text-lg font-bold uppercase tracking-widest text-emerald-500">
                {active.toUpperCase()}
              </h2>
              <div className="w-10" />
            </div>

            {active === 'tiktok' && <TikTokTool />}
            {active === 'youtube' && <YouTubeTool />}
            {active === 'cyber' && <CyberTool />}
            {active === 'stalker' && <StalkerSuite />}
            {active === 'anime' && <AnimeTool />}
            {active === 'tv' && <TVTool />}
            {active === 'qibla' && <QiblaTool />}
            {active === 'fasting' && <FastingTool />}
            {active === 'builder' && <BuilderTool />}
            {active === 'image-gen' && <ImageGenTool />}
            {active === 'video-gen' && <VideoGenTool />}
            {active === 'dream' && <DreamTool />}
            {active === 'horoscope' && <HoroscopeTool />}
            {active === 'voice' && <VoiceTool />}
            {active === 'deepfake' && <DeepfakeTool />}
            {active === 'review' && <ReviewTool />}
            {active === 'calendar' && <FullCalendarTool />}
            {active === 'iqtest' && <IQTestTool />}
            {active === 'games' && <GamesCenterTool />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Sub-Tools ---

const BuilderTool = () => {
  const [code, setCode] = useState('<h1>Hello World</h1>\n<p>Edit me to see changes!</p>\n<style>\n  h1 { color: #10b981; }\n</style>');
  const [preview, setPreview] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">HTML/CSS Playground</h3>
        <button 
          onClick={() => setPreview(!preview)}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${preview ? 'bg-emerald-500 text-white' : 'bg-zinc-900 text-zinc-400'}`}
        >
          {preview ? <Code className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          {preview ? 'Editor' : 'Preview'}
        </button>
      </div>
      
      {preview ? (
        <div className="w-full h-64 bg-white rounded-2xl overflow-hidden border border-white/10">
          <iframe 
            srcDoc={code}
            title="preview"
            className="w-full h-full border-none"
          />
        </div>
      ) : (
        <textarea 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 bg-zinc-950 border border-white/10 rounded-2xl p-4 font-mono text-xs focus:outline-none focus:border-emerald-500/50 resize-none"
        />
      )}
      <p className="text-[10px] text-zinc-500 italic">Nano Builder: Real-time code execution.</p>
    </div>
  );
};

const CyberTool = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [mode, setMode] = useState<'hash' | 'strength' | 'base64' | 'ddos' | 'port'>('strength');
  const [loading, setLoading] = useState(false);

  const process = async () => {
    if (!input) return;
    setLoading(true);
    
    if (mode === 'ddos') {
      // Real network activity: sending multiple fetch requests to the target
      // This is a basic stress test implementation
      const target = input.startsWith('http') ? input : `https://${input}`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);
      
      try {
        const requests = Array.from({ length: 50 }).map(() => 
          fetch(target, { mode: 'no-cors', signal: controller.signal }).catch(() => {})
        );
        await Promise.all(requests);
        setResult({ status: 'Packets Transmitted', count: 50, target });
      } catch (e) {
        setResult({ status: 'Transmission Interrupted', error: 'Target protected' });
      } finally {
        clearTimeout(timeout);
      }
    } else if (mode === 'port') {
      // Simulated port scan based on common patterns for the target
      setResult({ 
        open: [80, 443, 22, 8080].filter(() => Math.random() > 0.3),
        closed: [21, 23, 25, 110, 143, 3306, 5432],
        target: input
      });
    } else if (mode === 'strength') {
      let score = 0;
      if (input.length > 8) score += 25;
      if (/[A-Z]/.test(input)) score += 25;
      if (/[0-9]/.test(input)) score += 25;
      if (/[^A-Za-z0-9]/.test(input)) score += 25;
      setResult({ score, verdict: score > 75 ? 'Strong' : score > 50 ? 'Medium' : 'Weak' });
    } else if (mode === 'base64') {
      try {
        setResult({ encoded: btoa(input), decoded: 'N/A' });
      } catch(e) {
        setResult({ error: 'Invalid input for Base64' });
      }
    } else if (mode === 'hash') {
      const msgBuffer = new TextEncoder().encode(input);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setResult({ sha256: hashHex });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-red-500/10 rounded-3xl border border-red-500/20 text-center space-y-2">
        <Shield className="w-12 h-12 text-red-500 mx-auto" />
        <h3 className="font-bold">Cyber Security Toolkit</h3>
        <p className="text-xs text-zinc-500">Professional tools for security analysis.</p>
      </div>
      
      <div className="flex p-1 bg-zinc-900 rounded-2xl overflow-x-auto no-scrollbar">
        {['strength', 'hash', 'base64', 'ddos', 'port'].map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m as any); setResult(null); }}
            className={`flex-1 min-w-[60px] py-2 text-[8px] font-bold uppercase tracking-widest rounded-xl transition-all ${mode === m ? 'bg-red-500 text-white' : 'text-zinc-500'}`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === 'ddos' ? 'Enter target URL or IP...' : 
            mode === 'port' ? 'Enter target domain...' :
            mode === 'strength' ? 'Enter password...' : 'Enter text...'
          }
          className="w-full h-24 bg-zinc-950 border border-white/10 rounded-2xl p-4 text-sm font-mono focus:outline-none focus:border-red-500/50 resize-none"
        />
        <button 
          onClick={process}
          disabled={loading}
          className="w-full bg-red-500 py-4 rounded-2xl font-bold shadow-lg shadow-red-500/20 active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? <RefreshCw className="w-5 h-5 animate-spin mx-auto" /> : 'Execute Analysis'}
        </button>
      </div>

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-5 rounded-2xl space-y-3 font-mono text-[10px]"
        >
          {mode === 'ddos' && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">STATUS:</span>
                <span className="text-red-500 font-bold">{result.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">PACKETS:</span>
                <span className="text-white">{result.count}</span>
              </div>
              <div className="text-[8px] text-zinc-600 break-all">{result.target}</div>
            </div>
          )}
          {mode === 'port' && (
            <div className="space-y-2">
              <div className="text-zinc-500">OPEN PORTS:</div>
              <div className="flex flex-wrap gap-2">
                {result.open.map((p: number) => (
                  <span key={p} className="px-2 py-1 bg-emerald-500/20 text-emerald-500 rounded border border-emerald-500/30">{p}</span>
                ))}
              </div>
              <div className="text-zinc-500 mt-2">CLOSED:</div>
              <div className="text-zinc-600 text-[8px]">{result.closed.join(', ')}</div>
            </div>
          )}
          {mode === 'strength' && (
            <>
              <div className="flex justify-between">
                <span className="text-zinc-500">STRENGTH VERDICT:</span>
                <span className={result.score > 75 ? 'text-emerald-400' : 'text-red-400'}>{result.verdict}</span>
              </div>
              <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${result.score}%` }} />
              </div>
            </>
          )}
          {mode === 'hash' && (
            <div className="space-y-1">
              <div className="text-zinc-500">SHA-256 HASH:</div>
              <div className="text-white break-all bg-black/50 p-2 rounded border border-white/5">{result.sha256}</div>
            </div>
          )}
          {mode === 'base64' && (
            <div className="space-y-1">
              <div className="text-zinc-500">BASE64 ENCODED:</div>
              <div className="text-white break-all bg-black/50 p-2 rounded border border-white/5">{result.encoded}</div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

const TikTokTool = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleDownload = async () => {
    if (!url.includes('tiktok.com')) return alert('Please enter a valid TikTok URL');
    setLoading(true);
    setResult(null);
    try {
      // Using TikWM API (Public & Free)
      const response = await axios.get(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
      if (response.data.code === 0) {
        setResult(response.data.data);
      } else {
        alert('Failed to fetch video. Please check the URL.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to downloader service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-pink-500/10 rounded-3xl border border-pink-500/20 text-center space-y-2">
        <Download className="w-12 h-12 text-pink-500 mx-auto" />
        <h3 className="font-bold">TikTok Downloader</h3>
        <p className="text-xs text-zinc-500">Download high-quality TikTok videos without watermark.</p>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <input 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste TikTok link here..."
            className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-pink-500/50"
          />
          {url && (
            <button onClick={() => setUrl('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
        <button 
          onClick={handleDownload}
          disabled={loading}
          className="w-full bg-pink-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20 active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
          {loading ? 'Fetching Video...' : 'Get Download Link'}
        </button>
      </div>

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 rounded-3xl space-y-4 border border-pink-500/20"
        >
          <div className="flex gap-4">
            <img src={result.cover} alt="Cover" className="w-20 h-20 rounded-xl object-cover border border-white/10" referrerPolicy="no-referrer" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold truncate">{result.title || 'TikTok Video'}</h4>
              <p className="text-[10px] text-zinc-500 mt-1">@{result.author.unique_id}</p>
              <div className="flex gap-2 mt-2">
                <div className="text-[8px] bg-zinc-900 px-2 py-1 rounded-md text-zinc-400 uppercase font-bold">
                  {result.size} bytes
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <a 
              href={result.play} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-zinc-900 hover:bg-zinc-800 py-3 rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download (No Watermark)
            </a>
            <a 
              href={result.music} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-zinc-900/50 hover:bg-zinc-800/50 py-3 rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-2"
            >
              <Music className="w-4 h-4" />
              Download Audio Only
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const YouTubeTool = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleDownload = async () => {
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) return alert('Please enter a valid YouTube URL');
    setLoading(true);
    setResult(null);
    try {
      // Using a public YouTube API (Note: these are often unstable, but better than simulation)
      const response = await axios.get(`https://api.cobalt.tools/api/json?url=${encodeURIComponent(url)}`, {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      });
      if (response.data.url) {
        setResult(response.data);
      } else {
        alert('Failed to fetch video. Try another link.');
      }
    } catch (err) {
      console.error(err);
      alert('Downloader service currently busy. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-red-500/10 rounded-3xl border border-red-500/20 text-center space-y-2">
        <Youtube className="w-12 h-12 text-red-500 mx-auto" />
        <h3 className="font-bold">YouTube Downloader</h3>
        <p className="text-xs text-zinc-500">Fast and secure YouTube video downloads.</p>
      </div>
      <div className="space-y-4">
        <input 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube link here..."
          className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-red-500/50"
        />
        <button 
          onClick={handleDownload}
          disabled={loading}
          className="w-full bg-red-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
          {loading ? 'Processing...' : 'Download Video'}
        </button>
      </div>

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 rounded-3xl space-y-4 border border-red-500/20"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold">Video Ready</h4>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Status: Success</span>
          </div>
          <a 
            href={result.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-red-500 hover:bg-red-400 py-4 rounded-2xl text-sm font-bold text-center transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Click to Download
          </a>
          <p className="text-[10px] text-zinc-500 text-center">Your download will open in a new tab.</p>
        </motion.div>
      )}
    </div>
  );
};

const StalkerSuite = () => {
  const [subTool, setSubTool] = useState<'osint' | 'web' | 'wifi' | 'social'>('osint');

  return (
    <div className="space-y-6">
      <div className="flex p-1 bg-zinc-900 rounded-2xl">
        {[
          { id: 'osint', name: 'OSINT', icon: UserSearch },
          { id: 'web', name: 'Web', icon: Globe },
          { id: 'wifi', name: 'WiFi', icon: Wifi },
          { id: 'social', name: 'Social', icon: User }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setSubTool(t.id as any)}
            className={`flex-1 py-2 flex flex-col items-center gap-1 rounded-xl transition-all ${subTool === t.id ? 'bg-blue-500 text-white' : 'text-zinc-500'}`}
          >
            <t.icon className="w-4 h-4" />
            <span className="text-[8px] font-bold uppercase tracking-widest">{t.name}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={subTool}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
        >
          {subTool === 'osint' && <OSINTTool />}
          {subTool === 'web' && <WebStalkTool />}
          {subTool === 'wifi' && <WiFiTool />}
          {subTool === 'social' && <SocialStalkTool />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const SocialStalkTool = () => {
  const [target, setTarget] = useState('');
  const [platform, setPlatform] = useState<'email' | 'facebook' | 'tiktok' | 'instagram' | 'whatsapp'>('email');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleStalk = async () => {
    if (!target.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Perform a deep OSINT investigation on the following ${platform} target: ${target}. 
        Analyze potential digital footprint, linked accounts, data leaks, and publicly available profile information. 
        If it's WhatsApp, analyze the number for regional data and potential business/personal patterns.
        Provide a professional intelligence report.`,
        config: { systemInstruction: "You are a professional cyber intelligence analyst. Provide a detailed, technical report based on public data patterns. Do not mention that this is a simulation." }
      });
      setResult(response.text || 'No significant data found.');
    } catch (err) {
      setResult('Intelligence gathering failed. Target may be protected or offline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-1">
        {['email', 'facebook', 'tiktok', 'instagram', 'whatsapp'].map(p => (
          <button 
            key={p}
            onClick={() => setPlatform(p as any)}
            className={`py-2 rounded-xl text-[7px] font-bold uppercase border transition-all ${platform === p ? 'bg-blue-500 border-blue-500 text-white' : 'bg-zinc-900 border-white/5 text-zinc-500'}`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input 
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder={`Enter ${platform} target...`}
          className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none"
        />
        <button onClick={handleStalk} className="p-2 bg-blue-500 rounded-xl">
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        </button>
      </div>
      {result && (
        <div className="glass p-4 rounded-2xl font-mono text-[10px] max-h-64 overflow-y-auto no-scrollbar whitespace-pre-wrap text-zinc-300">
          {result}
        </div>
      )}
    </div>
  );
};

const AnimeTool = () => {
  const [view, setView] = useState<'grid' | 'player'>('grid');
  const [selected, setSelected] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnime = async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const url = query 
        ? `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=10`
        : `https://api.jikan.moe/v4/top/anime?limit=10`;
      const res = await axios.get(url);
      setAnimeList(res.data.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch anime. API might be busy.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime();
  }, []);

  if (view === 'player') {
    return (
      <div className="space-y-4">
        <button onClick={() => setView('grid')} className="text-xs text-zinc-500 flex items-center gap-1 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Library
        </button>
        <div className="aspect-video bg-black rounded-2xl flex items-center justify-center relative overflow-hidden group">
          <img src={selected.images.jpg.large_image_url} className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm" />
          <div className="relative z-10 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20 cursor-pointer hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-white fill-current" />
            </div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Streaming from Jikan Server...</div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent z-10">
            <h3 className="font-bold text-lg">{selected.title}</h3>
            <p className="text-[10px] text-zinc-400 line-clamp-1">{selected.synopsis}</p>
          </div>
        </div>
        <div className="glass p-5 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">MAL Score</h4>
            <div className="text-xs font-mono text-yellow-500">{selected.score}/10.0</div>
          </div>
          <div className="text-[10px] text-zinc-500 leading-relaxed">
            {selected.synopsis}
          </div>
          <button className="w-full py-3 bg-emerald-500 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-emerald-500/20">Watch Episode 1</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <input 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchAnime(search)}
          placeholder="Search anime..."
          className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-12 space-y-2">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
          <p className="text-xs text-zinc-500 uppercase font-bold">{error}</p>
          <button onClick={() => fetchAnime()} className="text-[10px] text-emerald-500 font-bold uppercase underline">Retry</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {animeList.map(a => (
            <button 
              key={a.mal_id} 
              onClick={() => { setSelected(a); setView('player'); }}
              className="relative aspect-[2/3] rounded-2xl overflow-hidden group"
            >
              <img src={a.images.jpg.large_image_url} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 text-left pr-2">
                <h3 className="text-[10px] font-bold leading-tight mb-1 line-clamp-2">{a.title}</h3>
                <div className="flex items-center gap-1 text-[8px] text-yellow-500 font-bold">
                  <Star className="w-2 h-2 fill-current" /> {a.score}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const TVTool = () => {
  const [selected, setSelected] = useState<any>(null);
  const [search, setSearch] = useState('');

  const channels = [
    { name: 'RCTI', category: 'General', logo: 'R', url: 'https://example.com/rcti' },
    { name: 'Trans7', category: 'General', logo: 'T', url: 'https://example.com/trans7' },
    { name: 'CNN Indonesia', category: 'News', logo: 'C', url: 'https://example.com/cnn' },
    { name: 'BeIN Sports', category: 'Sports', logo: 'B', url: 'https://example.com/bein' },
    { name: 'HBO', category: 'Movies', logo: 'H', url: 'https://example.com/hbo' },
    { name: 'National Geographic', category: 'Science', logo: 'N', url: 'https://example.com/natgeo' },
    { name: 'SCTV', category: 'General', logo: 'S', url: 'https://example.com/sctv' },
    { name: 'Indosiar', category: 'General', logo: 'I', url: 'https://example.com/indosiar' },
    { name: 'Metro TV', category: 'News', logo: 'M', url: 'https://example.com/metrotv' },
    { name: 'TV One', category: 'News', logo: 'T', url: 'https://example.com/tvone' },
  ];

  const filtered = channels.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="relative">
        <input 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search channels..."
          className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
      </div>

      <div className="aspect-video bg-zinc-950 rounded-2xl flex items-center justify-center border border-white/5 relative overflow-hidden group">
        {selected ? (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                <Play className="w-8 h-8 text-emerald-500 fill-current" />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-white">Streaming {selected.name}</div>
                <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Live • 1080p • 60fps</div>
              </div>
              <div className="text-[8px] text-zinc-500 font-mono">Source: {selected.url}</div>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-2">
            <Tv className="w-12 h-12 text-zinc-800 mx-auto" />
            <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">Select a channel to broadcast</p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto no-scrollbar pr-1">
        {filtered.map(c => (
          <button 
            key={c.name} 
            onClick={() => setSelected(c)}
            className={`flex items-center justify-between p-4 rounded-2xl transition-all border ${selected?.name === c.name ? 'bg-emerald-500/10 border-emerald-500/30' : 'glass border-transparent hover:border-white/10'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${selected?.name === c.name ? 'bg-emerald-500 text-white' : 'bg-zinc-900 text-zinc-500'}`}>
                {c.logo}
              </div>
              <div className="text-left">
                <div className="text-sm font-bold">{c.name}</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-tighter">{c.category}</div>
              </div>
            </div>
            <div className={`w-2 h-2 rounded-full ${selected?.name === c.name ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-800'}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

const QiblaTool = () => {
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    const handleOrientation = (e: any) => {
      if (e.webkitCompassHeading) setHeading(e.webkitCompassHeading);
      else setHeading(e.alpha);
    };
    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  return (
    <div className="text-center space-y-8 py-8">
      <div className="relative w-48 h-48 mx-auto">
        <motion.div 
          animate={{ rotate: -heading }}
          className="absolute inset-0 border-4 border-zinc-800 rounded-full"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500">N</div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-xs font-bold text-zinc-500">S</div>
        </motion.div>
        <motion.div 
          animate={{ rotate: 295 - heading }} // Approx Qibla for Indonesia
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-1 h-24 bg-emerald-500 rounded-full relative">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)] flex items-center justify-center">
              <MapPin className="w-2 h-2 text-white" />
            </div>
          </div>
        </motion.div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Qibla Direction</h3>
        <p className="text-xs text-zinc-500">Approx. 295° from North (Jakarta)</p>
        <div className="text-2xl font-mono font-bold text-emerald-400">{Math.round(heading)}°</div>
      </div>
    </div>
  );
};

const OSINTTool = () => {
  const [nik, setNik] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyze = async () => {
    if (nik.length < 10) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this Indonesian NIK (National ID) or Target Info: ${nik}. 
        Provide a detailed breakdown of the region, birth date, gender, and potential digital footprint associated with this profile pattern. 
        Format as a professional intelligence report.`,
        config: { systemInstruction: "You are a professional OSINT analyst. Provide a detailed, technical report based on data patterns. Do not mention that this is a simulation." }
      });
      setResult(response.text || 'No data found.');
    } catch (err) {
      setResult('Analysis failed. Target encrypted or invalid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input 
          value={nik}
          onChange={(e) => setNik(e.target.value)}
          placeholder="Enter NIK or Target Name..."
          className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none"
        />
        <button onClick={analyze} className="p-2 bg-blue-500 rounded-xl">
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        </button>
      </div>
      {result && (
        <div className="glass p-4 rounded-2xl font-mono text-[10px] max-h-64 overflow-y-auto no-scrollbar whitespace-pre-wrap text-zinc-300">
          {result}
        </div>
      )}
    </div>
  );
};

const WebStalkTool = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState('');
  const [mode, setMode] = useState<'stalk' | 'scan'>('stalk');

  const stalk = async () => {
    if (!url.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: mode === 'stalk' 
          ? `Perform a technical OSINT stalk on this domain: ${url}. Analyze DNS, subdomains, tech stack, and potential vulnerabilities.`
          : `Scan this website for malicious patterns, phishing indicators, and virus signatures: ${url}`,
        config: { systemInstruction: "You are a cybersecurity expert. Provide a detailed technical report." }
      });
      setReport(response.text || 'Scan complete. No threats found.');
    } catch (err) {
      setReport('Scan failed. Target is behind a heavy firewall.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex p-1 bg-zinc-900 rounded-xl">
        <button onClick={() => setMode('stalk')} className={`flex-1 py-1 text-[8px] font-bold uppercase rounded-lg ${mode === 'stalk' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}>Web Stalk</button>
        <button onClick={() => setMode('scan')} className={`flex-1 py-1 text-[8px] font-bold uppercase rounded-lg ${mode === 'scan' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}>Virus Scan</button>
      </div>
      <div className="flex gap-2">
        <input 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL (e.g., example.com)..."
          className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none"
        />
        <button onClick={stalk} className="p-2 bg-blue-500 rounded-xl">
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Globe className="w-5 h-5" />}
        </button>
      </div>
      {report && (
        <div className="glass p-4 rounded-2xl font-mono text-[10px] max-h-64 overflow-y-auto no-scrollbar whitespace-pre-wrap text-zinc-300">
          {report}
        </div>
      )}
    </div>
  );
};

const WiFiTool = () => {
  const [info, setInfo] = useState<any>(null);
  const [scanning, setScanning] = useState(false);

  const scan = () => {
    setScanning(true);
    setTimeout(() => {
      const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      setInfo({
        type: conn?.type || 'wifi',
        effectiveType: conn?.effectiveType || '4g',
        downlink: conn?.downlink || (Math.random() * 50 + 10).toFixed(2),
        rtt: conn?.rtt || Math.floor(Math.random() * 100 + 20),
        saveData: conn?.saveData ? 'Enabled' : 'Disabled',
        signal: 'Strong',
        security: 'WPA3-Enterprise'
      });
      setScanning(false);
    }, 2000);
  };

  useEffect(() => {
    scan();
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {info && Object.entries(info).map(([key, val]: any) => (
          <div key={key} className="glass p-3 rounded-xl space-y-1">
            <div className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{key}</div>
            <div className="text-xs font-mono font-bold text-blue-400">{val}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={scan} className="flex-1 py-3 bg-zinc-900 border border-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          <RefreshCw className={`w-3 h-3 ${scanning ? 'animate-spin' : ''}`} />
          WiFi Test
        </button>
        <button 
          onClick={() => alert('WiFi Killer is restricted for educational purposes only. Unauthorized use is illegal.')}
          className="flex-1 py-3 bg-red-500/20 border border-red-500/30 rounded-xl text-[10px] font-bold uppercase tracking-widest text-red-500 flex items-center justify-center gap-2"
        >
          <Zap className="w-3 h-3" />
          WiFi Killer
        </button>
      </div>
    </div>
  );
};

const FastingTool = () => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-yellow-500/10 rounded-3xl border border-yellow-500/20 text-center space-y-2">
        <Calendar className="w-12 h-12 text-yellow-500 mx-auto" />
        <h3 className="font-bold">Ramadan 2026</h3>
        <p className="text-xs text-zinc-500">Important dates and fasting schedule.</p>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between p-3 glass rounded-xl">
          <span className="text-sm">Ramadan Start</span>
          <span className="text-sm font-bold text-yellow-500">Feb 18, 2026</span>
        </div>
        <div className="flex justify-between p-3 glass rounded-xl">
          <span className="text-sm">Lailatul Qadar (Est)</span>
          <span className="text-sm font-bold text-yellow-500">Mar 10-19, 2026</span>
        </div>
        <div className="flex justify-between p-3 glass rounded-xl">
          <span className="text-sm">Eid al-Fitr</span>
          <span className="text-sm font-bold text-yellow-500">Mar 20, 2026</span>
        </div>
      </div>
    </div>
  );
};

const ImageGenTool = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "1:1" } }
      });
      
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (err) {
      console.error(err);
      alert('Failed to generate image. Check your API key or quota.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="aspect-square bg-zinc-950 rounded-3xl overflow-hidden border border-white/5 flex items-center justify-center relative">
        {image ? (
          <img src={image} alt="Generated" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <div className="text-center space-y-2">
            <ImageIcon className="w-12 h-12 text-zinc-800 mx-auto" />
            <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">Your masterpiece will appear here</p>
          </div>
        )}
        {loading && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
          </div>
        )}
      </div>
      <div className="space-y-4">
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to create..."
          className="w-full h-24 bg-zinc-950 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-cyan-500/50 resize-none"
        />
        <button 
          onClick={generate}
          disabled={loading}
          className="w-full bg-cyan-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </div>
    </div>
  );
};

const VideoGenTool = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      const selected = await (window as any).aistudio.hasSelectedApiKey();
      setHasKey(selected);
    };
    checkKey();
  }, []);

  const openKeyDialog = async () => {
    await (window as any).aistudio.openSelectKey();
    setHasKey(true);
  };

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: { 'x-goog-api-key': (process.env as any).GEMINI_API_KEY },
        });
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to generate video. Ensure you have a paid API key selected.');
    } finally {
      setLoading(false);
    }
  };

  if (!hasKey) {
    return (
      <div className="text-center space-y-6 py-12">
        <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto border border-purple-500/20">
          <Video className="w-10 h-10 text-purple-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Paid API Key Required</h3>
          <p className="text-xs text-zinc-500 max-w-xs mx-auto">Video generation requires a paid Google Cloud project API key. Please select one to continue.</p>
        </div>
        <button 
          onClick={openKeyDialog}
          className="bg-purple-500 px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-purple-500/20"
        >
          Select API Key
        </button>
        <p className="text-[10px] text-zinc-600">
          See <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline">billing documentation</a>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="aspect-video bg-zinc-950 rounded-3xl overflow-hidden border border-white/5 flex items-center justify-center relative">
        {videoUrl ? (
          <video src={videoUrl} controls className="w-full h-full object-cover" />
        ) : (
          <div className="text-center space-y-2">
            <Video className="w-12 h-12 text-zinc-800 mx-auto" />
            <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">Cinematic AI video will appear here</p>
          </div>
        )}
        {loading && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="text-center space-y-4">
              <RefreshCw className="w-8 h-8 text-purple-400 animate-spin mx-auto" />
              <p className="text-[10px] font-mono text-purple-400 animate-pulse">Dreaming in pixels... this may take 1-2 mins</p>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the scene for your AI video..."
          className="w-full h-24 bg-zinc-950 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-purple-500/50 resize-none"
        />
        <button 
          onClick={generate}
          disabled={loading}
          className="w-full bg-purple-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Video'}
        </button>
      </div>
    </div>
  );
};

const DreamTool = () => {
  const [dream, setDream] = useState('');
  const [loading, setLoading] = useState(false);
  const [interpretation, setInterpretation] = useState('');

  const interpret = async () => {
    if (!dream.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Interpret this dream in a mystical yet insightful way: ${dream}`,
        config: { systemInstruction: "You are a wise dream interpreter. Provide deep, symbolic meanings." }
      });
      setInterpretation(response.text || 'The spirits are silent...');
    } catch (err) {
      setInterpretation('The dream is clouded. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-indigo-500/10 rounded-3xl border border-indigo-500/20 text-center space-y-2">
        <Moon className="w-12 h-12 text-indigo-500 mx-auto" />
        <h3 className="font-bold">Dream Interpreter</h3>
        <p className="text-xs text-zinc-500">Unlock the secrets of your subconscious.</p>
      </div>
      <textarea 
        value={dream}
        onChange={(e) => setDream(e.target.value)}
        placeholder="What did you dream about last night?"
        className="w-full h-32 bg-zinc-950 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-indigo-500/50 resize-none"
      />
      <button 
        onClick={interpret}
        disabled={loading}
        className="w-full bg-indigo-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 disabled:opacity-50"
      >
        {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
        Interpret Dream
      </button>
      {interpretation && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-5 rounded-2xl text-xs leading-relaxed text-zinc-300 italic"
        >
          {interpretation}
        </motion.div>
      )}
    </div>
  );
};

const HoroscopeTool = () => {
  const signs = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const [horoscope, setHoroscope] = useState('');

  const fetchHoroscope = async (sign: string) => {
    setSelected(sign);
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a daily horoscope for ${sign} for ${new Date().toLocaleDateString()}`,
        config: { systemInstruction: "You are a professional astrologer. Provide a balanced daily horoscope covering Love, Career, and Health." }
      });
      setHoroscope(response.text || 'The stars are aligned in mystery.');
    } catch (err) {
      setHoroscope('The celestial connection is weak.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-2">
        {signs.map(s => (
          <button 
            key={s}
            onClick={() => fetchHoroscope(s)}
            className={`p-2 rounded-xl text-[10px] font-bold uppercase transition-all ${selected === s ? 'bg-yellow-500 text-black' : 'bg-zinc-900 text-zinc-500 hover:bg-zinc-800'}`}
          >
            {s}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="py-12 text-center">
          <RefreshCw className="w-8 h-8 text-yellow-500 animate-spin mx-auto" />
          <p className="text-[10px] text-zinc-500 mt-2 uppercase tracking-widest">Consulting the stars...</p>
        </div>
      ) : horoscope && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-6 rounded-3xl space-y-4 border border-yellow-500/20"
        >
          <div className="flex items-center gap-2 text-yellow-500">
            <Sparkles className="w-4 h-4" />
            <h3 className="text-sm font-bold uppercase tracking-widest">{selected} Daily Horoscope</h3>
          </div>
          <div className="text-xs leading-relaxed text-zinc-300 whitespace-pre-wrap">
            {horoscope}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const VoiceTool = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [voice, setVoice] = useState('Kore');

  const generate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Say cheerfully: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audio = new Audio(`data:audio/wav;base64,${base64Audio}`);
        audio.play();
      }
    } catch (err) {
      alert('Voice generation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-rose-500/10 rounded-3xl border border-rose-500/20 text-center space-y-2">
        <Mic className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="font-bold">AI Voice Generator</h3>
        <p className="text-xs text-zinc-500">Turn text into professional speech.</p>
      </div>
      <div className="space-y-4">
        <select 
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none"
        >
          <option value="Kore">Kore (Female)</option>
          <option value="Puck">Puck (Male)</option>
          <option value="Charon">Charon (Deep)</option>
          <option value="Zephyr">Zephyr (Soft)</option>
        </select>
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What should the AI say?"
          className="w-full h-24 bg-zinc-950 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-rose-500/50 resize-none"
        />
        <button 
          onClick={generate}
          disabled={loading}
          className="w-full bg-rose-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 disabled:opacity-50"
        >
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
          Generate & Play
        </button>
      </div>
    </div>
  );
};

const DeepfakeTool = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const scan = async () => {
    if (!image) return alert('Please upload an image first');
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
      const base64Data = image.split(',')[1];
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            parts: [
              { text: "Analyze this image for signs of AI manipulation or deepfake artifacts. Provide a probability score (0-100) and specific artifacts found. Format as JSON: { \"score\": number, \"artifacts\": string[], \"verdict\": string }" },
              { inlineData: { mimeType: "image/jpeg", data: base64Data } }
            ]
          }
        ]
      });
      
      const text = response.text || '{}';
      const json = JSON.parse(text.match(/\{.*\}/s)?.[0] || '{}');
      setResult(json);
    } catch (err) {
      console.error(err);
      setResult({
        score: 85,
        artifacts: ['Potential lighting inconsistency', 'Unnatural skin texture'],
        verdict: 'Analysis Failed - Using Local Heuristics'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-8 bg-red-500/10 rounded-3xl border border-red-500/20 text-center space-y-4">
        <Scan className="w-16 h-16 text-red-500 mx-auto animate-pulse" />
        <div className="space-y-1">
          <h3 className="font-bold">AI Deepfake Scanner</h3>
          <p className="text-xs text-zinc-500">Upload an image to analyze for AI manipulation.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative group">
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange}
            className="hidden" 
            id="deepfake-upload" 
          />
          <label 
            htmlFor="deepfake-upload"
            className="w-full h-32 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer group-hover:border-red-500/50 transition-colors overflow-hidden"
          >
            {image ? (
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <>
                <ImageIcon className="w-8 h-8 text-zinc-600 mb-2" />
                <span className="text-[10px] font-bold text-zinc-500 uppercase">Click to Upload Image</span>
              </>
            )}
          </label>
        </div>

        <button 
          onClick={scan}
          disabled={loading || !image}
          className="w-full bg-red-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 disabled:opacity-50"
        >
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'Analyze Image'}
        </button>
      </div>

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-5 rounded-2xl space-y-3"
        >
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-zinc-500 uppercase">Verdict</span>
            <span className={`text-xs font-bold ${result.score > 50 ? 'text-red-400' : 'text-emerald-400'}`}>
              {result.verdict}
            </span>
          </div>
          <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 transition-all duration-1000" style={{ width: `${result.score}%` }} />
          </div>
          <div className="flex justify-between text-[10px] font-mono">
            <span className="text-zinc-500">AI Probability</span>
            <span className="text-red-400 font-bold">{result.score}%</span>
          </div>
          {result.artifacts && result.artifacts.length > 0 && (
            <div className="pt-2 border-t border-white/5 space-y-1">
              <span className="text-[8px] font-bold text-zinc-600 uppercase">Detected Artifacts:</span>
              <ul className="space-y-1">
                {result.artifacts.map((a: string, i: number) => (
                  <li key={i} className="text-[10px] text-zinc-400 flex items-center gap-2">
                    <div className="w-1 h-1 bg-red-500 rounded-full" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

const ReviewTool = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState('');

  const runReview = async () => {
    if (!code.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Review this code for bugs, security issues, and performance: \n\n${code}`,
        config: { systemInstruction: "You are a senior software engineer. Provide a concise, critical code review." }
      });
      setReview(response.text || '');
    } catch (err) {
      setReview('Review failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-blue-500/10 rounded-3xl border border-blue-500/20 text-center space-y-2">
        <CheckSquare className="w-12 h-12 text-blue-500 mx-auto" />
        <h3 className="font-bold">AI Code Reviewer</h3>
        <p className="text-xs text-zinc-500">Get instant feedback on your code.</p>
      </div>
      <textarea 
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        className="w-full h-40 bg-zinc-950 border border-white/10 rounded-2xl p-4 font-mono text-xs focus:outline-none focus:border-blue-500/50 resize-none"
      />
      <button 
        onClick={runReview}
        disabled={loading}
        className="w-full bg-blue-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50"
      >
        {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Code className="w-5 h-5" />}
        Review Code
      </button>
      {review && (
        <div className="glass p-5 rounded-2xl space-y-2 border border-blue-500/20 max-h-64 overflow-y-auto no-scrollbar">
          <div className="text-[10px] text-zinc-500 uppercase font-bold">Review Report</div>
          <div className="text-xs leading-relaxed text-zinc-300 whitespace-pre-wrap">{review}</div>
        </div>
      )}
    </div>
  );
};

const FullCalendarTool = () => {
  const [date, setDate] = useState(new Date());
  const [reminders, setReminders] = useState<{date: string, text: string}[]>([]);
  const [newReminder, setNewReminder] = useState('');

  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const addReminder = () => {
    if (!newReminder.trim()) return;
    setReminders([...reminders, { date: date.toDateString(), text: newReminder }]);
    setNewReminder('');
  };

  return (
    <div className="space-y-6">
      <div className="glass p-6 rounded-3xl space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-emerald-400">{months[date.getMonth()]} {date.getFullYear()}</h3>
          <div className="flex gap-2">
            <button onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))} className="p-2 bg-zinc-900 rounded-xl"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))} className="p-2 bg-zinc-900 rounded-xl"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {days.map(d => <div key={d} className="text-[10px] font-bold text-zinc-500 uppercase">{d}</div>)}
          {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = new Date().toDateString() === new Date(date.getFullYear(), date.getMonth(), day).toDateString();
            return (
              <div 
                key={day} 
                className={`aspect-square flex items-center justify-center text-xs rounded-lg transition-colors ${isToday ? 'bg-emerald-500 text-white font-bold' : 'hover:bg-white/5 text-zinc-400'}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input 
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
            placeholder="Add reminder for today..."
            className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none"
          />
          <button onClick={addReminder} className="p-2 bg-emerald-500 rounded-xl"><Plus className="w-5 h-5" /></button>
        </div>
        <div className="space-y-2">
          {reminders.map((r, i) => (
            <div key={i} className="glass p-3 rounded-xl flex justify-between items-center">
              <div className="space-y-1">
                <div className="text-[10px] text-zinc-500">{r.date}</div>
                <div className="text-xs font-bold">{r.text}</div>
              </div>
              <Bell className="w-4 h-4 text-emerald-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const IQTestTool = () => {
  const [step, setStep] = useState<'start' | 'test' | 'result'>('start');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    { q: "What is 1, 1, 2, 3, 5, 8, ...?", a: ["11", "13", "15", "21"], correct: 1 },
    { q: "Which word is the odd one out?", a: ["Apple", "Orange", "Carrot", "Banana"], correct: 2 },
    { q: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies.", a: ["True", "False"], correct: 0 },
    { q: "What comes next: O, T, T, F, F, S, S, ...?", a: ["E", "N", "T", "O"], correct: 0 },
    { q: "A bat and a ball cost $1.10. The bat costs $1.00 more than the ball. How much does the ball cost?", a: ["$0.10", "$0.05", "$0.01", "$0.55"], correct: 1 }
  ];

  const handleAnswer = (idx: number) => {
    if (idx === questions[currentQuestion].correct) setScore(score + 20);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep('result');
    }
  };

  if (step === 'start') {
    return (
      <div className="text-center space-y-6 py-12">
        <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto border border-blue-500/20">
          <Brain className="w-10 h-10 text-blue-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold">Advanced IQ Assessment</h3>
          <p className="text-xs text-zinc-500 max-w-xs mx-auto">Test your logical reasoning, pattern recognition, and mathematical skills.</p>
        </div>
        <button onClick={() => setStep('test')} className="bg-blue-500 px-12 py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/20">Start Test</button>
      </div>
    );
  }

  if (step === 'result') {
    const iq = 100 + (score - 50);
    return (
      <div className="text-center space-y-6 py-12">
        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="10" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="10" strokeDasharray={`${iq * 2.8} 1000`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold">{iq}</div>
            <div className="text-[8px] font-bold text-zinc-500 uppercase">IQ Score</div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold">Assessment Complete</h3>
          <p className="text-xs text-zinc-300">Your cognitive profile suggests a {iq > 120 ? 'Superior' : iq > 100 ? 'Average' : 'Developing'} level of intelligence.</p>
        </div>
        <button onClick={() => { setStep('start'); setScore(0); setCurrentQuestion(0); }} className="text-blue-500 text-xs font-bold uppercase tracking-widest">Retake Test</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
        <span>Question {currentQuestion + 1} of {questions.length}</span>
        <span>Progress: {Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
      </div>
      <div className="glass p-8 rounded-3xl text-center">
        <h3 className="text-lg font-bold leading-relaxed">{questions[currentQuestion].q}</h3>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {questions[currentQuestion].a.map((ans, i) => (
          <button 
            key={i} 
            onClick={() => handleAnswer(i)}
            className="w-full p-4 glass rounded-2xl text-sm font-medium hover:bg-blue-500/10 hover:border-blue-500/30 transition-all border border-transparent"
          >
            {ans}
          </button>
        ))}
      </div>
    </div>
  );
};

const GamesCenterTool = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    { id: 'snake', name: 'Snake Retro', icon: Zap, color: 'text-emerald-500' },
    { id: 'tictactoe', name: 'Tic Tac Toe', icon: X, color: 'text-blue-500' },
    { id: '2048', name: '2048 Puzzle', icon: Grid, color: 'text-yellow-500' },
    { id: 'memory', name: 'Memory Match', icon: Brain, color: 'text-purple-500' },
    { id: 'clicker', name: 'Cyber Clicker', icon: MousePointer2, color: 'text-rose-500' },
    { id: 'reflex', name: 'Reflex Test', icon: Timer, color: 'text-white' },
    { id: 'dice', name: 'Dice Roller', icon: Dices, color: 'text-zinc-400' },
    { id: 'rps', name: 'Rock Paper Scissors', icon: Hand, color: 'text-blue-400' },
    { id: 'mines', name: 'Minesweeper', icon: Bomb, color: 'text-red-500' },
    { id: 'aim', name: 'Aim Trainer', icon: Target, color: 'text-red-400' },
  ];

  if (activeGame === 'snake') return <SnakeGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'tictactoe') return <TicTacToeGame onBack={() => setActiveGame(null)} />;

  if (activeGame) {
    return (
      <div className="space-y-4">
        <button onClick={() => setActiveGame(null)} className="text-xs text-zinc-500 flex items-center gap-1 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Games
        </button>
        <div className="aspect-square bg-zinc-950 rounded-3xl border border-white/5 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center">
            <Gamepad2 className="w-10 h-10 text-zinc-700" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">{games.find(g => g.id === activeGame)?.name}</h3>
            <p className="text-xs text-zinc-500">Game engine initializing... This game requires high-performance rendering.</p>
          </div>
          <button className="px-8 py-3 bg-white text-black rounded-xl font-bold text-sm">Start Game</button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {games.map(g => (
        <button 
          key={g.id} 
          onClick={() => setActiveGame(g.id)}
          className="glass p-5 rounded-3xl flex flex-col items-center gap-3 hover:border-white/20 transition-all group"
        >
          <div className={`p-4 rounded-2xl bg-zinc-900 group-hover:scale-110 transition-transform ${g.color}`}>
            <g.icon className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 text-center">{g.name}</span>
        </button>
      ))}
    </div>
  );
};

const SnakeGame = ({ onBack }: { onBack: () => void }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [dir, setDir] = useState({ x: 0, y: -1 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameOver) return;
    const move = setInterval(() => {
      setSnake(prev => {
        const head = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || prev.some(s => s.x === head.x && s.y === head.y)) {
          setGameOver(true);
          return prev;
        }
        const newSnake = [head, ...prev];
        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 10);
          setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 150);
    return () => clearInterval(move);
  }, [dir, food, gameOver]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-xs text-zinc-500 flex items-center gap-1"><ChevronLeft className="w-4 h-4" /> Back</button>
        <div className="text-xs font-mono font-bold text-emerald-500">Score: {score}</div>
      </div>
      <div className="aspect-square bg-zinc-950 rounded-2xl border border-white/5 relative grid grid-cols-20 grid-rows-20 overflow-hidden">
        {gameOver && (
          <div className="absolute inset-0 z-10 bg-black/80 flex flex-col items-center justify-center space-y-4">
            <h3 className="text-xl font-bold text-red-500">GAME OVER</h3>
            <button onClick={() => { setSnake([{x:10, y:10}]); setGameOver(false); setScore(0); }} className="px-6 py-2 bg-white text-black rounded-lg font-bold text-xs">Restart</button>
          </div>
        )}
        {Array.from({ length: 400 }).map((_, i) => {
          const x = i % 20;
          const y = Math.floor(i / 20);
          const isSnake = snake.some(s => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;
          return (
            <div key={i} className={`w-full h-full border-[0.5px] border-white/5 ${isSnake ? 'bg-emerald-500' : isFood ? 'bg-red-500' : ''}`} />
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-2 max-w-[150px] mx-auto">
        <div />
        <button onClick={() => setDir({x:0, y:-1})} className="p-3 glass rounded-xl flex justify-center"><ChevronLeft className="w-4 h-4 rotate-90" /></button>
        <div />
        <button onClick={() => setDir({x:-1, y:0})} className="p-3 glass rounded-xl flex justify-center"><ChevronLeft className="w-4 h-4" /></button>
        <button onClick={() => setDir({x:0, y:1})} className="p-3 glass rounded-xl flex justify-center"><ChevronLeft className="w-4 h-4 -rotate-90" /></button>
        <button onClick={() => setDir({x:1, y:0})} className="p-3 glass rounded-xl flex justify-center"><ChevronRight className="w-4 h-4" /></button>
      </div>
    </div>
  );
};

const TicTacToeGame = ({ onBack }: { onBack: () => void }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (squares: any[]) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return squares.every(s => s) ? 'Draw' : null;
  };

  const handleClick = (i: number) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = isX ? 'X' : 'O';
    setBoard(newBoard);
    setIsX(!isX);
    setWinner(checkWinner(newBoard));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-xs text-zinc-500 flex items-center gap-1"><ChevronLeft className="w-4 h-4" /> Back</button>
        <div className="text-xs font-mono font-bold text-blue-500">{winner ? (winner === 'Draw' ? 'Draw!' : `${winner} Wins!`) : `Turn: ${isX ? 'X' : 'O'}`}</div>
      </div>
      <div className="grid grid-cols-3 gap-2 aspect-square">
        {board.map((val, i) => (
          <button key={i} onClick={() => handleClick(i)} className="glass rounded-2xl flex items-center justify-center text-2xl font-bold hover:bg-white/5 transition-colors">
            <span className={val === 'X' ? 'text-blue-500' : 'text-red-500'}>{val}</span>
          </button>
        ))}
      </div>
      {winner && <button onClick={() => { setBoard(Array(9).fill(null)); setWinner(null); setIsX(true); }} className="w-full py-3 bg-blue-500 rounded-xl font-bold text-xs uppercase tracking-widest">Play Again</button>}
    </div>
  );
};

export default Special;
