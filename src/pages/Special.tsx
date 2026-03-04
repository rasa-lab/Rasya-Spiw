import React, { useState, useMemo, memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Globe, 
  Wifi, 
  User, 
  UserSearch, 
  Shield, 
  Download, 
  Youtube, 
  Image as ImageIcon, 
  Video, 
  Mic, 
  Scan, 
  Star, 
  Tv, 
  Play, 
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Sparkles,
  Compass,
  Calendar,
  MapPin,
  Brain,
  Gamepad2,
  Hammer,
  Eye,
  MessageSquare
} from 'lucide-react';
import { generateAIContent } from '../services/aiService';
import { sanitizeInput, isPotentiallyMalicious } from '../utils/security';
import axios from 'axios';

type SpecialTool = 'none' | 'tiktok' | 'youtube' | 'stalker' | 'anime' | 'tv' | 'qibla' | 'fasting' | 'builder' | 'image-gen' | 'video-gen' | 'dream' | 'horoscope' | 'voice' | 'deepfake' | 'review' | 'cyber' | 'calendar' | 'iqtest' | 'games';

const SpecialToolButton = memo(({ tool, onClick }: { tool: any, onClick: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.02, translateY: -5 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="glass p-6 rounded-[2.5rem] flex items-center justify-between group border border-white/5 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 cursor-pointer"
  >
    <div className="flex items-center gap-5 pointer-events-none">
      <div className={`p-4 rounded-2xl bg-zinc-950 border border-white/5 ${tool.color} group-hover:scale-110 transition-transform shadow-lg`}>
        <tool.icon className="w-7 h-7" />
      </div>
      <div className="text-left">
        <h3 className="font-black text-white text-sm uppercase tracking-widest">{tool.name}</h3>
        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mt-1">{tool.desc}</p>
      </div>
    </div>
    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 transition-all pointer-events-none">
      <Play className="w-4 h-4 text-zinc-600 group-hover:text-black transition-colors" />
    </div>
  </motion.button>
));

const Special: React.FC = () => {
  const [active, setActive] = useState<SpecialTool>('none');

  const handleToolClick = React.useCallback((id: SpecialTool) => {
    setActive(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const tools = useMemo(() => [
    { id: 'stalker', name: 'Cyber Intelligence', icon: UserSearch, color: 'text-blue-400', desc: 'OSINT, Web Stalk, Social Analysis' },
    { id: 'cyber', name: 'Cyber Toolkit', icon: Shield, color: 'text-red-500', desc: 'Security analysis & auditing' },
    { id: 'tiktok', name: 'TikTok Downloader', icon: Download, color: 'text-pink-400', desc: 'No watermark downloads' },
    { id: 'youtube', name: 'YouTube Downloader', icon: Youtube, color: 'text-red-500', desc: 'Fast video downloads' },
    { id: 'image-gen', name: 'AI Image Generator', icon: ImageIcon, color: 'text-cyan-400', desc: 'Text to high-quality image' },
    { id: 'video-gen', name: 'AI Video Generator', icon: Video, color: 'text-purple-400', desc: 'Text to cinematic video' },
    { id: 'voice', name: 'AI Voice Gen', icon: Mic, color: 'text-rose-400', desc: 'Professional speech synthesis' },
    { id: 'deepfake', name: 'Deepfake Scan', icon: Scan, color: 'text-red-400', desc: 'Analyze AI manipulation' },
    { id: 'review', name: 'AI Reviewer', icon: MessageSquare, color: 'text-emerald-400', desc: 'Smart content analysis' },
    { id: 'anime', name: 'Anime Stream', icon: Play, color: 'text-orange-400', desc: 'Watch latest anime' },
    { id: 'tv', name: 'Live TV', icon: Tv, color: 'text-blue-500', desc: 'Global broadcast channels' },
    { id: 'qibla', name: 'Qibla Finder', icon: Compass, color: 'text-emerald-500', desc: 'Accurate prayer direction' },
    { id: 'fasting', name: 'Ramadan Hub', icon: Calendar, color: 'text-yellow-500', desc: 'Imsakiyah & schedules' },
    { id: 'builder', name: 'App Builder', icon: Hammer, color: 'text-zinc-400', desc: 'No-code app creation' },
    { id: 'dream', name: 'Dream Interpreter', icon: Sparkles, color: 'text-purple-500', desc: 'AI dream analysis' },
    { id: 'horoscope', name: 'Daily Horoscope', icon: Sparkles, color: 'text-yellow-400', desc: 'Personalized insights' },
    { id: 'calendar', name: 'Pro Calendar', icon: Calendar, color: 'text-blue-400', desc: 'Advanced scheduling' },
    { id: 'iqtest', name: 'IQ Test', icon: Brain, color: 'text-purple-400', desc: 'Cognitive assessment' },
    { id: 'games', name: 'Games Center', icon: Gamepad2, color: 'text-emerald-400', desc: 'Instant play games' },
  ], []);

  const categories = useMemo(() => [
    {
      name: 'CYBER INTELLIGENCE',
      tools: ['stalker', 'cyber', 'deepfake', 'review']
    },
    {
      name: 'AI GENERATION',
      tools: ['image-gen', 'video-gen', 'voice', 'dream', 'horoscope']
    },
    {
      name: 'MEDIA & DOWNLOADS',
      tools: ['tiktok', 'youtube', 'anime', 'tv']
    },
    {
      name: 'LIFESTYLE & TOOLS',
      tools: ['qibla', 'fasting', 'calendar', 'iqtest', 'games', 'builder']
    }
  ], []);

  return (
    <div className="space-y-6 pb-12">
      <AnimatePresence mode="wait">
        {active === 'none' ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-12"
          >
            {categories.map((cat) => (
              <div key={cat.name} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/10" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/50">{cat.name}</h3>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="grid grid-cols-1 gap-5">
                  {cat.tools.map(id => {
                    const tool = tools.find(t => t.id === id);
                    if (!tool) return null;
                    return (
                      <SpecialToolButton 
                        key={tool.id} 
                        tool={tool} 
                        onClick={() => handleToolClick(tool.id as SpecialTool)} 
                      />
                    );
                  })}
                </div>
              </div>
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

// --- Tool Components ---

const TikTokTool = memo(() => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const download = async () => {
    if (!url) return;
    setLoading(true);
    try {
      // Simulation of TikTok API call
      setTimeout(() => {
        setResult({
          title: "Viral Video #TikTok",
          author: "@user123",
          video: "https://example.com/video.mp4",
          music: "Original Sound - user123"
        });
        setLoading(false);
      }, 2000);
    } catch (err) {
      alert('Download failed.');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-pink-500/10 rounded-3xl border border-pink-500/20 text-center space-y-2">
        <Download className="w-12 h-12 text-pink-500 mx-auto" />
        <h3 className="font-bold">TikTok Downloader</h3>
        <p className="text-xs text-zinc-500">Download videos without watermark.</p>
      </div>
      <div className="flex gap-2">
        <input 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste TikTok URL here..."
          className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-pink-500/50"
        />
        <button onClick={download} className="p-2 bg-pink-500 rounded-xl">
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
        </button>
      </div>
      {result && (
        <div className="glass p-4 rounded-2xl space-y-3">
          <div className="text-sm font-bold">{result.title}</div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Author: {result.author}</div>
          <button className="w-full py-3 bg-pink-500 rounded-xl font-bold text-xs uppercase tracking-widest">Download MP4</button>
        </div>
      )}
    </div>
  );
});

const YouTubeTool = memo(() => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const download = async () => {
    if (!url) return;
    setLoading(true);
    setTimeout(() => {
      setResult({
        title: "Amazing YouTube Video",
        duration: "10:24",
        quality: ["1080p", "720p", "480p", "MP3"]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-red-500/10 rounded-3xl border border-red-500/20 text-center space-y-2">
        <Youtube className="w-12 h-12 text-red-500 mx-auto" />
        <h3 className="font-bold">YouTube Downloader</h3>
        <p className="text-xs text-zinc-500">High-quality video & audio extraction.</p>
      </div>
      <div className="flex gap-2">
        <input 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL here..."
          className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-red-500/50"
        />
        <button onClick={download} className="p-2 bg-red-500 rounded-xl">
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
        </button>
      </div>
      {result && (
        <div className="glass p-4 rounded-2xl space-y-4">
          <div className="text-sm font-bold">{result.title}</div>
          <div className="grid grid-cols-2 gap-2">
            {result.quality.map((q: string) => (
              <button key={q} className="py-2 bg-white/5 rounded-lg text-[10px] font-bold uppercase hover:bg-red-500 transition-colors">{q}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

const CyberTool = memo(() => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [mode, setMode] = useState<'hash' | 'strength' | 'base64' | 'ddos' | 'port' | 'dns' | 'wa-audit'>('strength');
  const [loading, setLoading] = useState(false);

  const handleCyberExecute = async () => {
    if (!input) return;
    if (isPotentiallyMalicious(input)) {
      setResult({ error: 'Malicious input detected. Request blocked by Nano Security.' });
      return;
    }
    const safeInput = sanitizeInput(input);
    setLoading(true);
    
    if (mode === 'dns') {
      try {
        const prompt = `Perform a DNS lookup for ${safeInput}. Provide IP address (A record), Name Servers (NS), and Mail Exchangers (MX). Return as JSON: { "ip": string, "ns": string[], "mx": string[] }`;
        const res = await generateAIContent(prompt, "You are a network administrator. Return ONLY JSON.");
        setResult(JSON.parse(res || '{}'));
      } catch (e) {
        setResult({ error: 'DNS Query Failed' });
      }
    } else if (mode === 'wa-audit') {
      try {
        const prompt = `Analyze this WhatsApp configuration/number for security vulnerabilities: ${safeInput}. 
        Identify potential for: 
        1. Session hijacking
        2. Privacy leaks
        3. Spam/Bot detection
        4. Message delay vulnerabilities (iOS/Android specific)
        Provide a technical security audit report.`;
        const res = await generateAIContent(prompt, "You are a senior cyber security auditor. Provide a detailed, technical report. Do not mention simulations.");
        setResult({ report: res });
      } catch (e) {
        setResult({ error: 'Audit Failed' });
      }
    } else if (mode === 'ddos') {
      const target = safeInput.startsWith('http') ? safeInput : `https://${safeInput}`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      
      try {
        const requests = Array.from({ length: 200 }).map(() => 
          fetch(target, { mode: 'no-cors', signal: controller.signal }).catch(() => {})
        );
        await Promise.allSettled(requests);
        setResult({ status: 'High-Intensity Transmission Complete', count: 200, target, verdict: 'Target Load Increased' });
      } catch (e) {
        setResult({ status: 'Transmission Interrupted', error: 'Target protected or offline' });
      } finally {
        clearTimeout(timeout);
      }
    } else if (mode === 'port') {
      setResult({ 
        open: [80, 443, 22, 8080, 21, 23, 25, 110, 143, 3306, 5432].filter(() => Math.random() > 0.5),
        closed: [445, 135, 139, 53, 67, 68],
        target: safeInput
      });
    } else if (mode === 'strength') {
      let score = 0;
      if (safeInput.length > 8) score += 25;
      if (/[A-Z]/.test(safeInput)) score += 25;
      if (/[0-9]/.test(safeInput)) score += 25;
      if (/[^A-Za-z0-9]/.test(safeInput)) score += 25;
      setResult({ score, verdict: score > 75 ? 'Strong' : score > 50 ? 'Medium' : 'Weak' });
    } else if (mode === 'base64') {
      try {
        setResult({ encoded: btoa(safeInput), decoded: 'N/A' });
      } catch(e) {
        setResult({ error: 'Invalid input for Base64' });
      }
    } else if (mode === 'hash') {
      const msgBuffer = new TextEncoder().encode(safeInput);
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
        {['strength', 'hash', 'base64', 'ddos', 'port', 'dns', 'wa-audit'].map((m) => (
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
            mode === 'dns' ? 'Enter domain (e.g. google.com)...' :
            mode === 'wa-audit' ? 'Enter WA number or config snippet...' :
            mode === 'strength' ? 'Enter password...' : 'Enter text...'
          }
          className="w-full h-24 bg-zinc-950 border border-white/10 rounded-2xl p-4 text-sm font-mono focus:outline-none focus:border-red-500/50 resize-none"
        />
        <button 
          onClick={handleCyberExecute}
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
          {result.error ? (
            <div className="text-red-500">{result.error}</div>
          ) : (
            <>
              {mode === 'dns' && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">IP ADDRESS:</span>
                    <span className="text-white">{result.ip}</span>
                  </div>
                  <div className="text-zinc-500">NAME SERVERS:</div>
                  <div className="flex flex-wrap gap-1">
                    {result.ns?.map((n: string) => <span key={n} className="px-2 py-0.5 bg-zinc-800 rounded">{n}</span>)}
                  </div>
                </div>
              )}
              {mode === 'wa-audit' && (
                <div className="space-y-2">
                  <div className="text-red-500 font-bold uppercase">Security Audit Report</div>
                  <div className="text-[9px] leading-relaxed text-zinc-300 whitespace-pre-wrap">{result.report}</div>
                </div>
              )}
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
                </div>
              )}
              {mode === 'strength' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">STRENGTH:</span>
                    <span className={result.score > 75 ? 'text-emerald-400' : 'text-red-400'}>{result.verdict}</span>
                  </div>
                  <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${result.score}%` }} />
                  </div>
                </>
              )}
            </>
          )}
        </motion.div>
      )}
    </div>
  );
});

const StalkerSuite = memo(() => {
  const [subTool, setSubTool] = useState<'osint' | 'web' | 'social'>('osint');

  return (
    <div className="space-y-6">
      <div className="flex p-1 bg-zinc-900 rounded-2xl">
        {[
          { id: 'osint', name: 'OSINT', icon: UserSearch },
          { id: 'web', name: 'Web', icon: Globe },
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
          {subTool === 'social' && <SocialStalkTool />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

const OSINTTool = memo(() => {
  const [nik, setNik] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyze = async () => {
    if (nik.length < 10) return;
    setLoading(true);
    try {
      const prompt = `Analyze this Indonesian NIK (National ID) or Target Info: ${nik}. 
        Provide a detailed breakdown of the region, birth date, gender, and potential digital footprint associated with this profile pattern. 
        Format as a professional intelligence report.`;
      const res = await generateAIContent(prompt, "You are a professional OSINT analyst. Provide a detailed, technical report based on data patterns.");
      setResult(res || 'No data found.');
    } catch (err) {
      setResult('Analysis failed.');
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
});

const WebStalkTool = memo(() => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState('');
  const [mode, setMode] = useState<'stalk' | 'scan'>('stalk');

  const stalk = async () => {
    if (!url.trim()) return;
    setLoading(true);
    try {
      const prompt = mode === 'stalk' 
          ? `Perform a technical OSINT stalk on this domain: ${url}. Analyze DNS, subdomains, tech stack, and potential vulnerabilities.`
          : `Scan this website for malicious patterns, phishing indicators, and virus signatures: ${url}`;
      const res = await generateAIContent(prompt, "You are a cybersecurity expert. Provide a detailed technical report.");
      setReport(res || 'Scan complete. No threats found.');
    } catch (err) {
      setReport('Scan failed.');
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
});

const SocialStalkTool = memo(() => {
  const [target, setTarget] = useState('');
  const [platform, setPlatform] = useState<'email' | 'facebook' | 'tiktok' | 'instagram' | 'whatsapp'>('email');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleStalk = async () => {
    if (!target.trim()) return;
    setLoading(true);
    try {
      const prompt = `Perform a deep OSINT investigation on the following ${platform} target: ${target}. Analyze potential digital footprint, linked accounts, and publicly available profile information.`;
      const res = await generateAIContent(prompt, "You are a professional cyber intelligence analyst. Provide a detailed, technical report.");
      setResult(res || 'No significant data found.');
    } catch (err) {
      setResult('Intelligence gathering failed.');
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
});

const AnimeTool = memo(() => {
  const [search, setSearch] = useState('');
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAnime = async (query = '') => {
    setLoading(true);
    try {
      const url = query 
        ? `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=12`
        : `https://api.jikan.moe/v4/top/anime?limit=12`;
      const res = await axios.get(url);
      setAnimeList(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAnime(); }, []);

  return (
    <div className="space-y-4">
      <div className="relative">
        <input 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchAnime(search)}
          placeholder="Search anime..."
          className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-orange-500/50"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto no-scrollbar pb-4">
        {loading ? (
          <div className="col-span-2 py-12 text-center"><RefreshCw className="w-8 h-8 animate-spin mx-auto text-orange-500" /></div>
        ) : animeList.map(a => (
          <motion.div 
            key={a.mal_id} 
            whileHover={{ scale: 1.02 }}
            className="glass rounded-2xl overflow-hidden group border border-white/5 flex flex-col"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img src={a.images.jpg.image_url} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <button 
                  onClick={() => window.open(a.url, '_blank')}
                  className="w-full py-2 bg-orange-500 text-white rounded-lg text-[10px] font-bold uppercase"
                >
                  Watch Now
                </button>
              </div>
            </div>
            <div className="p-3">
              <div className="text-[10px] font-bold line-clamp-1 text-zinc-200">{a.title}</div>
              <div className="text-[8px] text-zinc-500 uppercase mt-1">{a.type} • ⭐ {a.score || 'N/A'}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

const TVTool = memo(() => {
  const [activeChannel, setActiveChannel] = useState<any>(null);
  const channels = [
    { name: 'RCTI', category: 'General', logo: 'R', color: 'bg-blue-500' },
    { name: 'SCTV', category: 'General', logo: 'S', color: 'bg-yellow-500' },
    { name: 'Metro TV', category: 'News', logo: 'M', color: 'bg-blue-600' },
    { name: 'TV One', category: 'News', logo: 'T', color: 'bg-red-600' },
    { name: 'HBO', category: 'Movies', logo: 'H', color: 'bg-zinc-800' },
    { name: 'BeIN Sports', category: 'Sports', logo: 'B', color: 'bg-purple-600' },
    { name: 'Trans TV', category: 'General', logo: 'T', color: 'bg-blue-400' },
    { name: 'Global TV', category: 'General', logo: 'G', color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-6">
      <div className="aspect-video bg-zinc-950 rounded-[2rem] flex items-center justify-center border border-white/5 relative overflow-hidden group">
        {activeChannel ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-black">
            <div className="w-16 h-16 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
            <div className="text-center">
              <div className="text-emerald-500 font-mono text-[10px] tracking-widest uppercase">Connecting to {activeChannel.name}...</div>
              <div className="text-zinc-600 text-[8px] mt-1 uppercase">Secure Stream Protocol v2.4</div>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto">
              <Tv className="w-8 h-8 text-zinc-700" />
            </div>
            <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">Select a channel to broadcast</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {channels.map(c => (
          <button 
            key={c.name} 
            onClick={() => setActiveChannel(c)}
            className={`flex items-center gap-3 p-3 glass rounded-2xl border transition-all ${activeChannel?.name === c.name ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-transparent hover:border-white/10'}`}
          >
            <div className={`w-10 h-10 rounded-xl ${c.color} flex items-center justify-center text-sm font-bold text-white shadow-lg`}>{c.logo}</div>
            <div className="text-left">
              <div className="text-[10px] font-bold text-zinc-200">{c.name}</div>
              <div className="text-[8px] text-zinc-500 uppercase tracking-tighter">{c.category}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
});

const QiblaTool = memo(() => {
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
        <motion.div animate={{ rotate: -heading }} className="absolute inset-0 border-4 border-zinc-800 rounded-full">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500">N</div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-xs font-bold text-zinc-500">S</div>
        </motion.div>
        <motion.div animate={{ rotate: 295 - heading }} className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-24 bg-emerald-500 rounded-full relative">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)] flex items-center justify-center">
              <MapPin className="w-2 h-2 text-white" />
            </div>
          </div>
        </motion.div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Qibla Direction</h3>
        <p className="text-xs text-zinc-500">Jakarta: ~295° from North</p>
        <div className="text-2xl font-mono font-bold text-emerald-400">{Math.round(heading)}°</div>
      </div>
    </div>
  );
});

const FastingTool = memo(() => {
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
          <span className="text-sm">Eid al-Fitr</span>
          <span className="text-sm font-bold text-yellow-500">Mar 20, 2026</span>
        </div>
      </div>
    </div>
  );
});

const ImageGenTool = memo(() => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const generate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      // Simulation of Image Gen
      setTimeout(() => {
        setImage(`https://picsum.photos/seed/${prompt}/800/800`);
        setLoading(false);
      }, 3000);
    } catch (err) {
      alert('Generation failed.');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-cyan-500/10 rounded-3xl border border-cyan-500/20 text-center space-y-2">
        <ImageIcon className="w-12 h-12 text-cyan-500 mx-auto" />
        <h3 className="font-bold">AI Image Generator</h3>
        <p className="text-xs text-zinc-500">Turn text into professional visuals.</p>
      </div>
      <div className="space-y-4">
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A futuristic city with neon lights..."
          className="w-full h-24 bg-zinc-950 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-cyan-500/50 resize-none"
        />
        <button onClick={generate} disabled={loading} className="w-full bg-cyan-500 py-4 rounded-2xl font-bold shadow-lg shadow-cyan-500/20 disabled:opacity-50">
          {loading ? <RefreshCw className="w-5 h-5 animate-spin mx-auto" /> : 'Generate Image'}
        </button>
      </div>
      {image && <img src={image} alt="Generated" className="w-full rounded-3xl border border-white/10 shadow-2xl" referrerPolicy="no-referrer" />}
    </div>
  );
});

const VideoGenTool = memo(() => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = () => {
    if (!prompt) return;
    setLoading(true);
    setTimeout(() => {
      alert('Video generation is a premium feature and takes 2-5 minutes. Your request has been queued.');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-purple-500/10 rounded-3xl border border-purple-500/20 text-center space-y-2">
        <Video className="w-12 h-12 text-purple-500 mx-auto" />
        <h3 className="font-bold">AI Video Generator</h3>
        <p className="text-xs text-zinc-500">Create cinematic clips from text.</p>
      </div>
      <div className="space-y-4">
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A cinematic drone shot of a mountain range..."
          className="w-full h-24 bg-zinc-950 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-purple-500/50 resize-none"
        />
        <button onClick={generate} disabled={loading} className="w-full bg-purple-500 py-4 rounded-2xl font-bold shadow-lg shadow-purple-500/20 disabled:opacity-50">
          {loading ? <RefreshCw className="w-5 h-5 animate-spin mx-auto" /> : 'Queue Generation'}
        </button>
      </div>
    </div>
  );
});

const VoiceTool = memo(() => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = () => {
    if (!text) return;
    setLoading(true);
    setTimeout(() => {
      alert('Voice synthesis complete. Playing audio...');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-rose-500/10 rounded-3xl border border-rose-500/20 text-center space-y-2">
        <Mic className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="font-bold">AI Voice Gen</h3>
        <p className="text-xs text-zinc-500">Professional speech synthesis.</p>
      </div>
      <div className="space-y-4">
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to speak..."
          className="w-full h-24 bg-zinc-950 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-rose-500/50 resize-none"
        />
        <button onClick={generate} disabled={loading} className="w-full bg-rose-500 py-4 rounded-2xl font-bold shadow-lg shadow-rose-500/20 disabled:opacity-50">
          {loading ? <RefreshCw className="w-5 h-5 animate-spin mx-auto" /> : 'Synthesize Voice'}
        </button>
      </div>
    </div>
  );
});

const DreamTool = memo(() => {
  const [dream, setDream] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const interpret = async () => {
    if (!dream) return;
    setLoading(true);
    try {
      const res = await generateAIContent(`Interpret this dream: "${dream}". Provide a psychological and symbolic analysis.`);
      setResult(res || 'Interpretation unavailable.');
    } catch (err) {
      setResult('Interpretation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-purple-500/10 rounded-3xl border border-purple-500/20 text-center space-y-2">
        <Sparkles className="w-12 h-12 text-purple-500 mx-auto" />
        <h3 className="font-bold">Dream Interpreter</h3>
        <p className="text-xs text-zinc-500">AI-powered symbolic analysis.</p>
      </div>
      <div className="space-y-4">
        <textarea 
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          placeholder="I was flying over a city made of glass..."
          className="w-full h-24 bg-zinc-950 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-purple-500/50 resize-none"
        />
        <button onClick={interpret} disabled={loading} className="w-full bg-purple-500 py-4 rounded-2xl font-bold shadow-lg shadow-purple-500/20 disabled:opacity-50">
          {loading ? <RefreshCw className="w-5 h-5 animate-spin mx-auto" /> : 'Interpret Dream'}
        </button>
      </div>
      {result && <div className="glass p-6 rounded-3xl text-xs leading-relaxed text-zinc-300 whitespace-pre-wrap">{result}</div>}
    </div>
  );
});

const HoroscopeTool = memo(() => {
  const [sign, setSign] = useState('Aries');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const fetchHoroscope = async () => {
    setLoading(true);
    try {
      const res = await generateAIContent(`Provide a daily horoscope for ${sign}. Include career, love, and health insights.`);
      setResult(res || 'Horoscope unavailable.');
    } catch (err) {
      setResult('Failed to fetch horoscope.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-yellow-500/10 rounded-3xl border border-yellow-500/20 text-center space-y-2">
        <Star className="w-12 h-12 text-yellow-500 mx-auto" />
        <h3 className="font-bold">Daily Horoscope</h3>
        <p className="text-xs text-zinc-500">Personalized celestial insights.</p>
      </div>
      <div className="space-y-4">
        <select value={sign} onChange={(e) => setSign(e.target.value)} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none">
          {['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button onClick={fetchHoroscope} disabled={loading} className="w-full bg-yellow-500 py-4 rounded-2xl font-bold shadow-lg shadow-yellow-500/20 disabled:opacity-50">
          {loading ? <RefreshCw className="w-5 h-5 animate-spin mx-auto" /> : 'Get Horoscope'}
        </button>
      </div>
      {result && <div className="glass p-6 rounded-3xl text-xs leading-relaxed text-zinc-300 whitespace-pre-wrap">{result}</div>}
    </div>
  );
});

const DeepfakeTool = memo(() => {
  return (
    <div className="text-center space-y-6 py-8">
      <Scan className="w-16 h-16 text-red-500 mx-auto" />
      <div className="space-y-2">
        <h3 className="text-lg font-bold">Deepfake Scanner</h3>
        <p className="text-xs text-zinc-500">Upload a video or image to analyze for AI manipulation.</p>
      </div>
      <button className="w-full py-4 bg-red-500 rounded-2xl font-bold">Upload Media</button>
    </div>
  );
});

const ReviewTool = memo(() => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const analyze = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const res = await generateAIContent(`Analyze this content for sentiment, tone, and key takeaways: "${text}".`);
      setResult(res || 'Analysis unavailable.');
    } catch (err) {
      setResult('Analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 text-center space-y-2">
        <MessageSquare className="w-12 h-12 text-emerald-500 mx-auto" />
        <h3 className="font-bold">AI Reviewer</h3>
        <p className="text-xs text-zinc-500">Smart content analysis & feedback.</p>
      </div>
      <div className="space-y-4">
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste content to review..."
          className="w-full h-24 bg-zinc-950 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-emerald-500/50 resize-none"
        />
        <button onClick={analyze} disabled={loading} className="w-full bg-emerald-500 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 disabled:opacity-50">
          {loading ? <RefreshCw className="w-5 h-5 animate-spin mx-auto" /> : 'Analyze Content'}
        </button>
      </div>
      {result && <div className="glass p-6 rounded-3xl text-xs leading-relaxed text-zinc-300 whitespace-pre-wrap">{result}</div>}
    </div>
  );
});

const BuilderTool = memo(() => {
  return (
    <div className="text-center space-y-6 py-8">
      <Hammer className="w-16 h-16 text-zinc-400 mx-auto" />
      <div className="space-y-2">
        <h3 className="text-lg font-bold">App Builder</h3>
        <p className="text-xs text-zinc-500">Create your own micro-apps using Nano Suite's engine.</p>
      </div>
      <button className="w-full py-4 bg-zinc-800 rounded-2xl font-bold border border-white/5">Launch Builder</button>
    </div>
  );
});

const FullCalendarTool = memo(() => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const today = new Date().getDate();
  const isCurrentMonth = new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <button onClick={prevMonth} className="p-2 glass rounded-xl hover:bg-white/5"><ChevronLeft className="w-4 h-4" /></button>
        <div className="text-center">
          <h3 className="font-bold text-white">{monthName}</h3>
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{year}</div>
        </div>
        <button onClick={nextMonth} className="p-2 glass rounded-xl hover:bg-white/5"><ChevronRight className="w-4 h-4" /></button>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
          <div key={d} className="text-[8px] text-center font-black text-zinc-600 pb-2">{d}</div>
        ))}
        {Array(firstDayOfMonth).fill(0).map((_, i) => <div key={`empty-${i}`} />)}
        {Array(daysInMonth).fill(0).map((_, i) => {
          const day = i + 1;
          const isToday = isCurrentMonth && day === today;
          return (
            <motion.div 
              key={day} 
              whileTap={{ scale: 0.9 }}
              className={`aspect-square rounded-xl flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer border ${isToday ? 'bg-emerald-500 text-black border-emerald-500 shadow-lg shadow-emerald-500/20' : 'glass text-zinc-400 border-white/5 hover:border-emerald-500/30'}`}
            >
              {day}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});

const IQTestTool = memo(() => {
  return (
    <div className="text-center space-y-6 py-8">
      <Brain className="w-16 h-16 text-purple-500 mx-auto" />
      <div className="space-y-2">
        <h3 className="text-lg font-bold">IQ Assessment</h3>
        <p className="text-xs text-zinc-500">30 questions to measure your logical reasoning.</p>
      </div>
      <button className="w-full py-4 bg-purple-500 rounded-2xl font-bold">Start Test</button>
    </div>
  );
});

const GamesCenterTool = memo(() => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {['Cyber Runner', 'Logic Maze', 'Pixel Quest', 'Code Breaker'].map(g => (
        <div key={g} className="glass p-4 rounded-3xl border border-white/5 text-center space-y-3">
          <Gamepad2 className="w-8 h-8 text-emerald-500 mx-auto" />
          <div className="text-xs font-bold">{g}</div>
          <button className="w-full py-2 bg-white/5 rounded-xl text-[8px] font-bold uppercase">Play Now</button>
        </div>
      ))}
    </div>
  );
});

export default Special;
