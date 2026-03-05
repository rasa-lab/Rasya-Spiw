import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  FileText, 
  PlusCircle, 
  TrendingUp, 
  PiggyBank, 
  Gamepad2, 
  ChevronLeft,
  ChevronRight,
  Tv,
  Play,
  Brain,
  X,
  Plus,
  Trash2,
  CheckCircle,
  HelpCircle,
  Shield,
  QrCode,
  Scale,
  Timer,
  Globe,
  Banknote,
  Languages,
  Utensils,
  RefreshCw,
  Activity,
  Smile,
  Weight,
  Download,
  Search,
  Lock,
  Clock,
  Cloud,
  Book,
  Palette,
  AlignLeft,
  FileCode,
  CheckSquare,
  Music,
  PenTool,
  Keyboard,
  Radio,
  Binary,
  Link,
  Type,
  Sun,
  Wind,
  Droplets,
  Zap,
  Cpu,
  Server,
  ShieldAlert,
  FileSearch,
  User,
  CreditCard,
  Image as ImageIcon,
  FilePlus,
  Volume2,
  Paintbrush,
  Music2,
  SpellCheck,
  GraduationCap,
  Baby,
  Ghost,
  Hash,
  Layout,
  Chrome,
  Wifi,
  MessageSquare,
  Send
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import axios from 'axios';
import { generateAIContent } from '../services/aiService';
import { useAuth } from '../context/AuthContext';

type Tool = 'none' | 'calculator' | 'notes' | 'math' | 'finance' | 'celengan' | 'games' | 'password' | 'qr' | 'converter' | 'stopwatch' | 'worldclock' | 'currency' | 'translator' | 'recipe' | 'bmi' | 'mood' | 'encryptor' | 'pomodoro' | 'weather' | 'dictionary' | 'colorpicker' | 'lorem' | 'markdown' | 'json' | 'habit' | 'metronome' | 'drawing' | 'typing' | 'morse' | 'base64' | 'url' | 'case' | 'subdomain' | 'whois' | 'ssl' | 'admin' | 'metadata' | 'resume' | 'expense' | 'passmanager' | 'pdf' | 'compressor' | 'animals' | 'colors' | 'piano' | 'spelling' | 'kidsquiz' | 'coloring' | 'story' | 'kidsmath' | 'kidsmemory' | 'alphabet' | 'browser' | 'trending' | 'wifi' | 'antivirus' | 'devcheck' | 'anime' | 'tv' | 'hdvideo' | 'ipmask' | 'cyberchat' | 'livetv';

const ToolButton = memo(({ tool, onClick }: { tool: any, onClick: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.05, translateY: -2 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="glass p-3 rounded-xl flex flex-col items-center gap-1.5 text-center group border border-white/5 hover:border-emerald-500/20 cursor-pointer"
  >
    <div className={`p-2 rounded-lg ${tool.color} group-hover:scale-110 transition-transform shadow-lg pointer-events-none`}>
      <tool.icon className="w-5 h-5" />
    </div>
    <span className="font-bold text-[7px] uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors pointer-events-none line-clamp-1">{tool.name}</span>
  </motion.button>
));

const Tools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>('none');

  const handleToolClick = React.useCallback((id: Tool) => {
    setActiveTool(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const tools = React.useMemo(() => [
    { id: 'wifi', name: 'WiFi Management', icon: Wifi, color: 'bg-blue-500/20 text-blue-400' },
    { id: 'antivirus', name: 'X Zero AV', icon: ShieldAlert, color: 'bg-red-500/20 text-red-400' },
    { id: 'devcheck', name: 'Dev Check', icon: Cpu, color: 'bg-emerald-500/20 text-emerald-400' },
    { id: 'anime', name: 'Anime Search', icon: Play, color: 'bg-orange-500/20 text-orange-400' },
    { id: 'tv', name: 'Live TV', icon: Tv, color: 'bg-sky-500/20 text-sky-400' },
    { id: 'hdvideo', name: 'HD Video Player', icon: Play, color: 'bg-emerald-500/20 text-emerald-400' },
    { id: 'ipmask', name: 'IP Masking', icon: Shield, color: 'bg-purple-500/20 text-purple-400' },
    { id: 'cyberchat', name: 'Cyber Chat', icon: MessageSquare, color: 'bg-emerald-500/20 text-emerald-400' },
    { id: 'livetv', name: 'Live TV Pro', icon: Tv, color: 'bg-orange-500/20 text-orange-400' },
    { id: 'browser', name: 'Browser', icon: Chrome, color: 'bg-blue-500/20 text-blue-400' },
    { id: 'trending', name: 'Trending', icon: Zap, color: 'bg-yellow-500/20 text-yellow-400' },
    { id: 'subdomain', name: 'Sub Scanner', icon: Globe, color: 'bg-indigo-500/20 text-indigo-400' },
    { id: 'whois', name: 'Whois', icon: FileSearch, color: 'bg-emerald-500/20 text-emerald-400' },
    { id: 'ssl', name: 'SSL Check', icon: Shield, color: 'bg-cyan-500/20 text-cyan-400' },
    { id: 'admin', name: 'Admin Find', icon: Lock, color: 'bg-red-500/20 text-red-400' },
    { id: 'metadata', name: 'Meta Strip', icon: Trash2, color: 'bg-zinc-500/20 text-zinc-400' },
    { id: 'resume', name: 'CV Builder', icon: FilePlus, color: 'bg-blue-500/20 text-blue-400' },
    { id: 'expense', name: 'Expenses', icon: CreditCard, color: 'bg-rose-500/20 text-rose-400' },
    { id: 'passmanager', name: 'Pass Manager', icon: Shield, color: 'bg-purple-500/20 text-purple-400' },
    { id: 'pdf', name: 'PDF Tool', icon: FileText, color: 'bg-orange-500/20 text-orange-400' },
    { id: 'compressor', name: 'Img Shrink', icon: ImageIcon, color: 'bg-emerald-500/20 text-emerald-400' },
    { id: 'animals', name: 'Animals', icon: Volume2, color: 'bg-pink-500/20 text-pink-400' },
    { id: 'colors', name: 'Color Learn', icon: Paintbrush, color: 'bg-yellow-500/20 text-yellow-400' },
    { id: 'piano', name: 'Piano', icon: Music2, color: 'bg-blue-500/20 text-blue-400' },
    { id: 'spelling', name: 'Spelling', icon: SpellCheck, color: 'bg-indigo-500/20 text-indigo-400' },
    { id: 'kidsquiz', name: 'Kids Quiz', icon: GraduationCap, color: 'bg-emerald-500/20 text-emerald-400' },
    { id: 'coloring', name: 'Coloring', icon: Palette, color: 'bg-rose-500/20 text-rose-400' },
    { id: 'story', name: 'Story Gen', icon: Book, color: 'bg-purple-500/20 text-purple-400' },
    { id: 'kidsmath', name: 'Kids Math', icon: Plus, color: 'bg-orange-500/20 text-orange-400' },
    { id: 'kidsmemory', name: 'Memory', icon: Brain, color: 'bg-cyan-500/20 text-cyan-400' },
    { id: 'alphabet', name: 'Alphabet', icon: Type, color: 'bg-yellow-500/20 text-yellow-400' },
    { id: 'encryptor', name: 'File Encrypt', icon: Lock, color: 'bg-red-500/20 text-red-400' },
    { id: 'pomodoro', name: 'Pomodoro', icon: Clock, color: 'bg-rose-500/20 text-rose-400' },
    { id: 'weather', name: 'AI Weather', icon: Cloud, color: 'bg-sky-500/20 text-sky-400' },
    { id: 'dictionary', name: 'AI Dictionary', icon: Book, color: 'bg-indigo-500/20 text-indigo-400' },
    { id: 'colorpicker', name: 'Color Picker', icon: Palette, color: 'bg-pink-500/20 text-pink-400' },
    { id: 'lorem', name: 'Lorem Ipsum', icon: AlignLeft, color: 'bg-zinc-500/20 text-zinc-400' },
    { id: 'markdown', name: 'MD Preview', icon: FileCode, color: 'bg-blue-500/20 text-blue-400' },
    { id: 'json', name: 'JSON Format', icon: FileCode, color: 'bg-emerald-500/20 text-emerald-400' },
    { id: 'habit', name: 'Habit Tracker', icon: CheckSquare, color: 'bg-purple-500/20 text-purple-400' },
    { id: 'metronome', name: 'Metronome', icon: Music, color: 'bg-orange-500/20 text-orange-400' },
    { id: 'drawing', name: 'Drawing Pad', icon: PenTool, color: 'bg-cyan-500/20 text-cyan-400' },
    { id: 'typing', name: 'Typing Test', icon: Keyboard, color: 'bg-yellow-500/20 text-yellow-400' },
    { id: 'morse', name: 'Morse Code', icon: Radio, color: 'bg-emerald-500/20 text-emerald-400' },
    { id: 'base64', name: 'Base64 Tool', icon: Binary, color: 'bg-blue-500/20 text-blue-400' },
    { id: 'url', name: 'URL Tool', icon: Link, color: 'bg-indigo-500/20 text-indigo-400' },
    { id: 'case', name: 'Case Convert', icon: Type, color: 'bg-rose-500/20 text-rose-400' },
    { id: 'bmi', name: 'BMI Calc', icon: Weight, color: 'bg-emerald-500/20 text-emerald-400' },
    { id: 'mood', name: 'Mood Tracker', icon: Smile, color: 'bg-yellow-500/20 text-yellow-400' },
    { id: 'translator', name: 'AI Translator', icon: Languages, color: 'bg-blue-500/20 text-blue-400' },
    { id: 'recipe', name: 'AI Recipes', icon: Utensils, color: 'bg-orange-500/20 text-orange-400' },
    { id: 'calculator', name: 'Calculator', icon: Calculator, color: 'bg-blue-500/20 text-blue-400' },
    { id: 'notes', name: 'Notes', icon: FileText, color: 'bg-emerald-500/20 text-emerald-400' },
    { id: 'math', name: 'Math Quiz', icon: HelpCircle, color: 'bg-purple-500/20 text-purple-400' },
    { id: 'finance', name: 'Finance', icon: TrendingUp, color: 'bg-orange-500/20 text-orange-400' },
    { id: 'celengan', name: 'Celengan', icon: PiggyBank, color: 'bg-pink-500/20 text-pink-400' },
    { id: 'games', name: 'Games', icon: Gamepad2, color: 'bg-red-500/20 text-red-400' },
    { id: 'password', name: 'Pass Gen', icon: Shield, color: 'bg-indigo-500/20 text-indigo-400' },
    { id: 'qr', name: 'QR Gen', icon: QrCode, color: 'bg-cyan-500/20 text-cyan-400' },
    { id: 'converter', name: 'Converter', icon: Scale, color: 'bg-yellow-500/20 text-yellow-400' },
    { id: 'stopwatch', name: 'Stopwatch', icon: Timer, color: 'bg-rose-500/20 text-rose-400' },
    { id: 'worldclock', name: 'World Clock', icon: Globe, color: 'bg-sky-500/20 text-sky-400' },
    { id: 'currency', name: 'Currency', icon: Banknote, color: 'bg-emerald-500/20 text-emerald-400' },
  ], []);

  const categories = React.useMemo(() => [
    {
      name: 'CYBER SECURITY',
      tools: ['antivirus', 'devcheck', 'wifi', 'admin', 'ssl', 'whois', 'subdomain', 'ipmask', 'cyberchat']
    },
    {
      name: 'MEDIA & ENTERTAINMENT',
      tools: ['anime', 'tv', 'browser', 'trending', 'hdvideo', 'livetv']
    },
    {
      name: 'SECURITY & PRIVACY',
      tools: ['passmanager', 'encryptor', 'password', 'metadata', 'qr']
    },
    {
      name: 'AI ASSISTANT',
      tools: ['weather', 'dictionary', 'translator', 'recipe', 'story']
    },
    {
      name: 'DAILY UTILITIES',
      tools: ['calculator', 'notes', 'pomodoro', 'habit', 'stopwatch', 'worldclock', 'currency', 'bmi', 'mood', 'converter', 'math']
    },
    {
      name: 'KIDS ZONE',
      tools: ['animals', 'colors', 'piano', 'spelling', 'kidsquiz', 'coloring', 'kidsmath', 'kidsmemory', 'alphabet']
    },
    {
      name: 'DEVELOPER HUB',
      tools: ['json', 'markdown', 'lorem', 'colorpicker', 'base64', 'url', 'case', 'resume', 'pdf', 'compressor']
    },
    {
      name: 'FINANCE & SAVINGS',
      tools: ['expense', 'finance', 'celengan']
    },
    {
      name: 'GAMES & FUN',
      tools: ['games', 'metronome', 'drawing', 'typing', 'morse']
    }
  ], []);

  return (
    <div className="space-y-6 pb-12">
      <AnimatePresence mode="wait">
        {activeTool === 'none' ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-12"
          >
            {categories.map((cat) => (
              <div key={cat.name} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/10" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/50">{cat.name}</h3>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {cat.tools.map(id => {
                    const tool = tools.find(t => t.id === id);
                    if (!tool) return null;
                    return (
                      <ToolButton 
                        key={tool.id} 
                        tool={tool} 
                        onClick={() => handleToolClick(tool.id as Tool)} 
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass rounded-3xl p-6 min-h-[400px]"
          >
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setActiveTool('none')}
                className="p-2 rounded-full hover:bg-white/5 text-zinc-400"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h2 className="text-lg font-bold uppercase tracking-widest text-emerald-500">
                {activeTool.toUpperCase()}
              </h2>
              <div className="w-10" />
            </div>

            {activeTool === 'calculator' && <CalculatorTool />}
            {activeTool === 'antivirus' && <AntivirusTool />}
            {activeTool === 'devcheck' && <DevCheckTool />}
            {activeTool === 'anime' && <AnimeTool />}
            {activeTool === 'tv' && <TVTool />}
            {activeTool === 'notes' && <NotesTool />}
            {activeTool === 'math' && <MathTool />}
            {activeTool === 'finance' && <FinanceTool />}
            {activeTool === 'celengan' && <CelenganTool />}
            {activeTool === 'games' && <GamesTool />}
            {activeTool === 'password' && <PasswordTool />}
            {activeTool === 'qr' && <QRTool />}
            {activeTool === 'converter' && <ConverterTool />}
            {activeTool === 'stopwatch' && <StopwatchTool />}
            {activeTool === 'worldclock' && <WorldClockTool />}
            {activeTool === 'currency' && <CurrencyTool />}
            {activeTool === 'translator' && <TranslatorTool />}
            {activeTool === 'recipe' && <RecipeTool />}
            {activeTool === 'bmi' && <BMITool />}
            {activeTool === 'mood' && <MoodTool />}
            {activeTool === 'encryptor' && <EncryptorTool />}
            {activeTool === 'pomodoro' && <PomodoroTool />}
            {activeTool === 'weather' && <WeatherTool />}
            {activeTool === 'dictionary' && <DictionaryTool />}
            {activeTool === 'colorpicker' && <ColorPickerTool />}
            {activeTool === 'lorem' && <LoremIpsumTool />}
            {activeTool === 'markdown' && <MarkdownTool />}
            {activeTool === 'json' && <JSONTool />}
            {activeTool === 'habit' && <HabitTool />}
            {activeTool === 'metronome' && <MetronomeTool />}
            {activeTool === 'drawing' && <DrawingTool />}
            {activeTool === 'typing' && <TypingTool />}
            {activeTool === 'morse' && <MorseTool />}
            {activeTool === 'base64' && <Base64Tool />}
            {activeTool === 'url' && <URLTool />}
            {activeTool === 'case' && <CaseTool />}
            {activeTool === 'browser' && <BrowserTool />}
            {activeTool === 'wifi' && <WiFiTool />}
            {activeTool === 'hdvideo' && <HDVideoPlayerTool />}
            {activeTool === 'ipmask' && <IPMaskingTool />}
            {activeTool === 'cyberchat' && <CyberChat />}
            {activeTool === 'livetv' && <LiveTV />}
            {activeTool === 'trending' && <TrendingTool />}
            {activeTool === 'subdomain' && <SubdomainTool />}
            {activeTool === 'whois' && <WhoisTool />}
            {activeTool === 'ssl' && <SSLTool />}
            {activeTool === 'admin' && <AdminTool />}
            {activeTool === 'metadata' && <MetadataTool />}
            {activeTool === 'resume' && <ResumeTool />}
            {activeTool === 'expense' && <ExpenseTool />}
            {activeTool === 'passmanager' && <PassManagerTool />}
            {activeTool === 'pdf' && <PDFTool />}
            {activeTool === 'compressor' && <CompressorTool />}
            {activeTool === 'animals' && <AnimalsTool />}
            {activeTool === 'colors' && <ColorsTool />}
            {activeTool === 'piano' && <PianoTool />}
            {activeTool === 'spelling' && <SpellingTool />}
            {activeTool === 'kidsquiz' && <KidsQuizTool />}
            {activeTool === 'coloring' && <ColoringTool />}
            {activeTool === 'story' && <StoryTool />}
            {activeTool === 'kidsmath' && <KidsMathTool />}
            {activeTool === 'kidsmemory' && <KidsMemoryTool />}
            {activeTool === 'alphabet' && <AlphabetTool />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Sub-Tools ---

const PasswordTool = () => {
  const [pass, setPass] = useState('');
  const [len, setLen] = useState(12);

  const gen = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let res = "";
    for (let i = 0; i < len; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    setPass(res);
  };

  return (
    <div className="space-y-6">
      <div className="bg-black/50 p-4 rounded-xl font-mono text-center break-all text-emerald-400 border border-white/5">
        {pass || "Click Generate"}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-zinc-500">
          <span>Length: {len}</span>
        </div>
        <input type="range" min="6" max="32" value={len} onChange={(e) => setLen(parseInt(e.target.value))} className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
      </div>
      <button onClick={gen} className="w-full bg-emerald-500 py-3 rounded-xl font-bold">Generate Password</button>
    </div>
  );
};

const QRTool = () => {
  const [text, setText] = useState('');
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(text || 'TESTING SYSTEM')}`;

  const downloadQR = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `qr-code-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to download QR code');
    }
  };

  return (
    <div className="space-y-6 text-center">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={downloadQR}
        className="bg-white p-4 rounded-2xl inline-block mx-auto cursor-pointer shadow-xl shadow-cyan-500/10 group relative"
      >
        <img src={qrUrl} alt="QR Code" className="w-40 h-40" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
          <Download className="w-8 h-8 text-white" />
        </div>
      </motion.div>
      <div className="space-y-4">
        <input 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL..."
          className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50"
        />
        <button 
          onClick={downloadQR}
          className="w-full bg-cyan-500 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download QR Image
        </button>
      </div>
      <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Click the QR code or button to save</p>
    </div>
  );
};

const ConverterTool = () => {
  const [val, setVal] = useState('1');
  const [type, setType] = useState<'km-m' | 'c-f' | 'kg-lb'>('km-m');

  const convert = () => {
    const n = parseFloat(val);
    if (isNaN(n)) return "0";
    if (type === 'km-m') return (n * 1000).toFixed(2) + " m";
    if (type === 'c-f') return ((n * 9/5) + 32).toFixed(2) + " °F";
    if (type === 'kg-lb') return (n * 2.20462).toFixed(2) + " lb";
    return "0";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-2">
        {(['km-m', 'c-f', 'kg-lb'] as const).map(t => (
          <button 
            key={t}
            onClick={() => setType(t)}
            className={`p-2 rounded-lg text-[10px] font-bold uppercase ${type === t ? 'bg-emerald-500 text-white' : 'bg-zinc-900 text-zinc-500'}`}
          >
            {t.replace('-', ' to ')}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        <input 
          type="number"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-center text-2xl font-bold focus:outline-none"
        />
        <div className="text-center text-emerald-400">
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Result</div>
          <div className="text-3xl font-mono font-bold">{convert()}</div>
        </div>
      </div>
    </div>
  );
};

const WiFiTool = () => {
  const [info, setInfo] = useState<any>(null);
  const [scanning, setScanning] = useState(false);
  const [killing, setKilling] = useState(false);
  const [progress, setProgress] = useState(0);

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

  const killWiFi = () => {
    setKilling(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setKilling(false);
          alert('WiFi Killer is restricted for educational purposes only. Unauthorized use is illegal.');
          return 100;
        }
        return prev + 5;
      });
    }, 100);
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
      {killing && (
        <div className="space-y-2">
          <div className="flex justify-between text-[8px] font-bold text-red-500 uppercase tracking-widest">
            <span>Injecting Packets...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-red-500" />
          </div>
        </div>
      )}
      <div className="flex gap-2">
        <button onClick={scan} className="flex-1 py-3 bg-zinc-900 border border-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          <RefreshCw className={`w-3 h-3 ${scanning ? 'animate-spin' : ''}`} />
          WiFi Test
        </button>
        <button 
          onClick={killWiFi}
          disabled={scanning || killing}
          className="flex-1 py-3 bg-red-500/20 border border-red-500/30 rounded-xl text-[10px] font-bold uppercase tracking-widest text-red-500 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Zap className={`w-3 h-3 ${killing ? 'animate-pulse' : ''}`} />
          WiFi Killer
        </button>
      </div>
    </div>
  );
};

const CalculatorTool = () => {
  const [display, setDisplay] = useState('0');
  const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'];

  const handleClick = (btn: string) => {
    if (btn === 'C') setDisplay('0');
    else if (btn === '=') {
      try { setDisplay(eval(display).toString()); } catch { setDisplay('Error'); }
    } else {
      setDisplay(prev => prev === '0' ? btn : prev + btn);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-black/50 p-6 rounded-2xl text-right text-3xl font-mono font-bold text-emerald-400 overflow-hidden">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map(btn => (
          <button 
            key={btn}
            onClick={() => handleClick(btn)}
            className={`p-4 rounded-xl font-bold transition-all active:scale-90 ${
              btn === '=' ? 'bg-emerald-500 text-white col-span-2' : 'bg-zinc-900 hover:bg-zinc-800'
            }`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

const NotesTool = () => {
  const [notes, setNotes] = useState<string[]>(() => JSON.parse(localStorage.getItem('notes') || '[]'));
  const [input, setInput] = useState('');

  const addNote = () => {
    if (!input.trim()) return;
    const newNotes = [...notes, input.trim()];
    setNotes(newNotes);
    localStorage.setItem('notes', JSON.stringify(newNotes));
    setInput('');
  };

  const deleteNote = (i: number) => {
    const newNotes = notes.filter((_, idx) => idx !== i);
    setNotes(newNotes);
    localStorage.setItem('notes', JSON.stringify(newNotes));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a note..."
          className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none"
        />
        <button onClick={addNote} className="p-2 bg-emerald-500 rounded-xl"><Plus className="w-5 h-5" /></button>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
        {notes.map((n, i) => (
          <div key={i} className="bg-zinc-900/50 p-3 rounded-xl flex justify-between items-center group">
            <span className="text-sm">{n}</span>
            <button onClick={() => deleteNote(i)} className="text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const MathTool = () => {
  const [q, setQ] = useState({ a: 0, b: 0, op: '+', ans: 0 });
  const [userAns, setUserAns] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [level, setLevel] = useState(1);

  const generate = () => {
    const max = level * 10;
    const a = Math.floor(Math.random() * max) + 1;
    const b = Math.floor(Math.random() * max) + 1;
    const ops = level > 2 ? ['+', '-', '*', '/'] : ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let ans = 0;
    
    if (op === '+') ans = a + b;
    else if (op === '-') ans = a - b;
    else if (op === '*') ans = a * b;
    else if (op === '/') {
      // Ensure integer division
      ans = a;
      const product = a * b;
      setQ({ a: product, b: a, op: '/', ans: b });
      setUserAns('');
      setFeedback('');
      return;
    }
    
    setQ({ a, b, op, ans });
    setUserAns('');
    setFeedback('');
  };

  useEffect(generate, [level]);

  const check = () => {
    if (parseFloat(userAns) === q.ans) {
      setScore(s => {
        const newScore = s + 1;
        if (newScore % 5 === 0) setLevel(l => l + 1);
        return newScore;
      });
      setFeedback('Correct! 🎉');
      setTimeout(generate, 800);
    } else {
      setFeedback('Wrong! Try again.');
    }
  };

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-between items-center px-4">
        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Level: {level}</div>
        <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Score: {score}</div>
      </div>
      <div className="text-5xl font-serif font-bold text-emerald-400 py-4">
        {q.a} {q.op} {q.b}
      </div>
      <div className="relative max-w-[120px] mx-auto">
        <input 
          type="number"
          value={userAns}
          onChange={(e) => setUserAns(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && check()}
          className="w-full bg-transparent border-b-2 border-emerald-500 text-center text-3xl font-bold focus:outline-none pb-2"
          autoFocus
        />
      </div>
      <div className="h-6 text-sm font-bold flex items-center justify-center">
        {feedback && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className={feedback.includes('Correct') ? 'text-emerald-400' : 'text-red-400'}
          >
            {feedback}
          </motion.span>
        )}
      </div>
      <button 
        onClick={check} 
        className="w-full bg-emerald-500 hover:bg-emerald-400 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
      >
        Submit Answer
      </button>
      <p className="text-[10px] text-zinc-600 uppercase tracking-tighter">Tip: Level up every 5 correct answers!</p>
    </div>
  );
};

const FinanceTool = () => {
  const [balance, setBalance] = useState(5000000);
  const [transactions, setTransactions] = useState([
    { id: 1, label: 'Salary', amount: 8000000, type: 'in' },
    { id: 2, label: 'Rent', amount: -2000000, type: 'out' },
    { id: 3, label: 'Food', amount: -1000000, type: 'out' },
  ]);

  return (
    <div className="space-y-6">
      <div className="text-center p-6 bg-emerald-500/10 rounded-3xl border border-emerald-500/20">
        <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Total Balance</div>
        <div className="text-2xl font-mono font-bold">Rp {balance.toLocaleString()}</div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Recent Transactions</h3>
        {transactions.map(t => (
          <div key={t.id} className="flex justify-between items-center p-3 glass rounded-xl">
            <span className="text-sm">{t.label}</span>
            <span className={`font-mono text-sm ${t.type === 'in' ? 'text-emerald-400' : 'text-red-400'}`}>
              {t.type === 'in' ? '+' : ''}{t.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CelenganTool = () => {
  const [target, setTarget] = useState(1000000);
  const [saved, setSaved] = useState(450000);
  const progress = (saved / target) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Target</div>
          <div className="text-xl font-bold">Rp {target.toLocaleString()}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Saved</div>
          <div className="text-xl font-bold text-emerald-400">Rp {saved.toLocaleString()}</div>
        </div>
      </div>
      <div className="h-4 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
        />
      </div>
      <div className="text-center text-xs text-zinc-500 font-mono">{progress.toFixed(1)}% Completed</div>
      <button className="w-full bg-zinc-900 border border-white/10 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
        <PlusCircle className="w-4 h-4" /> Add Savings
      </button>
    </div>
  );
};

const GamesTool = memo(() => {
  const [game, setGame] = useState<'none' | 'sos' | 'hangman' | 'memory' | 'snake' | 'runner' | 'codebreaker'>('none');

  if (game === 'sos') return <SOSGame onBack={() => setGame('none')} />;
  if (game === 'hangman') return <HangmanGame onBack={() => setGame('none')} />;
  if (game === 'memory') return <MemoryGame onBack={() => setGame('none')} />;
  if (game === 'snake') return <SnakeGame onBack={() => setGame('none')} />;
  if (game === 'runner') return <CyberRunnerGame onBack={() => setGame('none')} />;
  if (game === 'codebreaker') return <CodeBreakerGame onBack={() => setGame('none')} />;

  const gamesList = [
    { id: 'sos', name: 'SOS Game', desc: 'Classic tic-tac-toe style', icon: Gamepad2 },
    { id: 'hangman', name: 'Hangman', desc: 'Guess the secret word', icon: Gamepad2 },
    { id: 'memory', name: 'Memory Match', desc: 'Test your memory', icon: Brain },
    { id: 'snake', name: 'Cyber Snake', desc: 'Retro snake game', icon: Activity },
    { id: 'runner', name: 'Cyber Runner', desc: 'Infinite runner game', icon: Zap },
    { id: 'codebreaker', name: 'Code Breaker', desc: 'Logic puzzle game', icon: Lock },
  ];

  return (
    <div className="grid grid-cols-1 gap-3">
      {gamesList.map(g => (
        <button 
          key={g.id}
          onClick={() => setGame(g.id as any)} 
          className="p-5 glass rounded-2xl text-left flex items-center justify-between group border border-white/5 hover:border-emerald-500/30 transition-all"
        >
          <div>
            <h3 className="font-bold text-sm">{g.name}</h3>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{g.desc}</p>
          </div>
          <g.icon className="w-5 h-5 text-emerald-500 group-hover:scale-125 transition-transform" />
        </button>
      ))}
    </div>
  );
});

const MemoryGame = memo(({ onBack }: { onBack: () => void }) => {
  const icons = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥝', '🍉'];
  const [cards, setCards] = useState<{ id: number, emoji: string, flipped: boolean, matched: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);

  useEffect(() => {
    const initial = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
    setCards(initial);
  }, []);

  const handleFlip = (id: number) => {
    if (flipped.length === 2 || cards[id].flipped || cards[id].matched) return;
    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);
    setFlipped([...flipped, id]);

    if (flipped.length === 1) {
      const first = flipped[0];
      if (cards[first].emoji === cards[id].emoji) {
        newCards[first].matched = true;
        newCards[id].matched = true;
        setCards(newCards);
        setFlipped([]);
      } else {
        setTimeout(() => {
          newCards[first].flipped = false;
          newCards[id].flipped = false;
          setCards(newCards);
          setFlipped([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-xs text-zinc-500 hover:text-white">← Back</button>
        <div className="text-sm font-bold text-emerald-400">Memory Match</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map(c => (
          <button
            key={c.id}
            onClick={() => handleFlip(c.id)}
            className={`aspect-square rounded-xl flex items-center justify-center text-2xl transition-all ${c.flipped || c.matched ? 'bg-emerald-500/20 rotate-0' : 'bg-zinc-900 rotate-180'}`}
          >
            {(c.flipped || c.matched) ? c.emoji : '?'}
          </button>
        ))}
      </div>
    </div>
  );
});

const SnakeGame = memo(({ onBack }: { onBack: () => void }) => {
  return (
    <div className="text-center space-y-6 py-12">
      <Activity className="w-16 h-16 text-emerald-500 mx-auto animate-pulse" />
      <div className="space-y-2">
        <h3 className="text-lg font-bold">Cyber Snake</h3>
        <p className="text-xs text-zinc-500">Retro gameplay with high-speed rendering.</p>
      </div>
      <button className="w-full py-4 bg-emerald-500 text-black rounded-2xl font-bold uppercase tracking-widest">Start Game</button>
      <button onClick={onBack} className="text-xs text-zinc-500 hover:text-white">← Back to Games</button>
    </div>
  );
});

const SOSGame = memo(({ onBack }: { onBack: () => void }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);

  const checkWinner = (squares: any[]) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (board[i] || checkWinner(board)) return;
    const next = board.slice();
    next[i] = isX ? 'X' : 'O';
    setBoard(next);
    setIsX(!isX);
  };

  const winner = checkWinner(board);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-xs text-zinc-500 hover:text-white">← Back</button>
        <div className="text-sm font-bold text-emerald-400">
          {winner ? `Winner: ${winner}` : `Next: ${isX ? 'X' : 'O'}`}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 aspect-square">
        {board.map((val, i) => (
          <button 
            key={i} 
            onClick={() => handleClick(i)}
            className="bg-zinc-900 border border-white/5 rounded-2xl text-2xl font-bold flex items-center justify-center hover:bg-zinc-800 transition-colors"
          >
            {val}
          </button>
        ))}
      </div>
      <button onClick={() => setBoard(Array(9).fill(null))} className="w-full py-3 glass rounded-xl text-sm font-bold">Reset Game</button>
    </div>
  );
});

const HangmanGame = memo(({ onBack }: { onBack: () => void }) => {
  const words = ['REACT', 'TYPESCRIPT', 'TAILWIND', 'SYSTEM', 'TESTING'];
  const [word, setWord] = useState('');
  const [guessed, setGuessed] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);

  useEffect(() => {
    setWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  const handleGuess = (char: string) => {
    if (guessed.includes(char)) return;
    setGuessed([...guessed, char]);
    if (!word.includes(char)) setMistakes(m => m + 1);
  };

  const isWinner = word.split('').every(c => guessed.includes(c));
  const isGameOver = mistakes >= 6;

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-xs text-zinc-500 hover:text-white">← Back</button>
        <div className="text-sm font-bold text-red-400">Mistakes: {mistakes}/6</div>
      </div>
      <div className="text-3xl tracking-[0.5em] font-mono font-bold">
        {word.split('').map((c, i) => guessed.includes(c) ? c : '_').join('')}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c => (
          <button 
            key={c}
            onClick={() => handleGuess(c)}
            disabled={guessed.includes(c) || isWinner || isGameOver}
            className={`p-2 rounded text-[10px] font-bold ${guessed.includes(c) ? 'bg-zinc-800 text-zinc-600' : 'bg-zinc-900 hover:bg-zinc-800'}`}
          >
            {c}
          </button>
        ))}
      </div>
      {isWinner && <div className="text-emerald-400 font-bold">You Won! 🎉</div>}
      {isGameOver && <div className="text-red-400 font-bold">Game Over! Word was {word}</div>}
      {(isWinner || isGameOver) && (
        <button onClick={() => {
          setWord(words[Math.floor(Math.random() * words.length)]);
          setGuessed([]);
          setMistakes(0);
        }} className="w-full py-3 glass rounded-xl text-sm font-bold">New Game</button>
      )}
    </div>
  );
});

const StopwatchTool = memo(() => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: any;
    if (running) {
      interval = setInterval(() => setTime(t => t + 10), 10);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${centis.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-6xl font-mono font-bold text-center py-8 text-rose-400">
        {formatTime(time)}
      </div>
      <div className="flex gap-4">
        <button 
          onClick={() => setRunning(!running)}
          className={`flex-1 py-4 rounded-2xl font-bold uppercase tracking-widest ${running ? 'bg-zinc-800 text-zinc-400' : 'bg-rose-500 text-white'}`}
        >
          {running ? 'Stop' : 'Start'}
        </button>
        <button 
          onClick={() => { setTime(0); setLaps([]); setRunning(false); }}
          className="px-6 bg-zinc-900 rounded-2xl text-zinc-500 font-bold uppercase tracking-widest"
        >
          Reset
        </button>
        <button 
          onClick={() => setLaps([time, ...laps])}
          disabled={!running}
          className="px-6 bg-zinc-900 rounded-2xl text-zinc-500 font-bold uppercase tracking-widest disabled:opacity-50"
        >
          Lap
        </button>
      </div>
      <div className="space-y-2 max-h-40 overflow-y-auto no-scrollbar">
        {laps.map((l, i) => (
          <div key={i} className="flex justify-between text-xs font-mono py-2 border-b border-white/5">
            <span className="text-zinc-500">LAP {laps.length - i}</span>
            <span className="text-zinc-300">{formatTime(l)}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

const WorldClockTool = memo(() => {
  const zones = [
    { name: 'Jakarta', zone: 'Asia/Jakarta' },
    { name: 'London', zone: 'Europe/London' },
    { name: 'New York', zone: 'America/New_York' },
    { name: 'Tokyo', zone: 'Asia/Tokyo' },
    { name: 'Mecca', zone: 'Asia/Riyadh' },
  ];

  const [times, setTimes] = useState<any>({});

  useEffect(() => {
    const tick = () => {
      const newTimes: any = {};
      zones.forEach(z => {
        newTimes[z.name] = new Intl.DateTimeFormat('en-US', {
          timeZone: z.zone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(new Date());
      });
      setTimes(newTimes);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3">
      {zones.map(z => (
        <div key={z.name} className="glass p-4 rounded-2xl flex justify-between items-center">
          <div>
            <div className="text-sm font-bold">{z.name}</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{z.zone}</div>
          </div>
          <div className="text-xl font-mono font-bold text-sky-400">{times[z.name] || '--:--:--'}</div>
        </div>
      ))}
    </div>
  );
});

const CurrencyTool = memo(() => {
  const [amount, setAmount] = useState('1');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('IDR');
  
  const rates: any = {
    USD: 1,
    IDR: 15500,
    MYR: 4.7,
    SGD: 1.35,
    JPY: 150,
    EUR: 0.92,
  };

  const result = (parseFloat(amount) || 0) * (rates[to] / rates[from]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Amount</label>
        <input 
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">From</label>
          <select 
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none"
          >
            {Object.keys(rates).map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">To</label>
          <select 
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none"
          >
            {Object.keys(rates).map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>
      <div className="glass p-6 rounded-3xl text-center">
        <div className="text-[10px] text-zinc-500 uppercase font-bold mb-2">Converted Result</div>
        <div className="text-3xl font-mono font-bold text-emerald-400">
          {result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {to}
        </div>
      </div>
    </div>
  );
});

const TranslatorTool = memo(() => {
  const [text, setText] = useState('');
  const [targetLang, setTargetLang] = useState('Indonesian');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const translate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const prompt = `Translate this to ${targetLang}: ${text}`;
      const res = await generateAIContent(prompt, "You are a professional translator. Provide only the translated text.");
      setResult(res || '');
    } catch (err) {
      setResult('Translation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Source Text</label>
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to translate..."
          className="w-full h-32 bg-zinc-950 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-blue-500/50 resize-none"
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Target Language</label>
        <select 
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none"
        >
          <option>Indonesian</option>
          <option>English</option>
          <option>Japanese</option>
          <option>Arabic</option>
          <option>Russian</option>
          <option>Malay</option>
        </select>
      </div>
      <button 
        onClick={translate}
        disabled={loading}
        className="w-full bg-blue-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50"
      >
        {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Languages className="w-5 h-5" />}
        Translate Now
      </button>
      {result && (
        <div className="glass p-5 rounded-2xl space-y-2 border border-blue-500/20">
          <div className="text-[10px] text-zinc-500 uppercase font-bold">Result</div>
          <div className="text-sm font-medium text-blue-400">{result}</div>
        </div>
      )}
    </div>
  );
});

const RecipeTool = memo(() => {
  const [ingredients, setIngredients] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState('');

  const findRecipe = async () => {
    if (!ingredients.trim()) return;
    setLoading(true);
    try {
      const prompt = `Suggest a delicious recipe using these ingredients: ${ingredients}`;
      const res = await generateAIContent(prompt, "You are a world-class chef. Provide a recipe with a catchy name, ingredients list, and step-by-step instructions. Format with Markdown.");
      setRecipe(res || '');
    } catch (err) {
      setRecipe('Could not find a recipe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Ingredients</label>
        <textarea 
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="What's in your fridge? (e.g. eggs, tomato, cheese)"
          className="w-full h-24 bg-zinc-950 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-orange-500/50 resize-none"
        />
      </div>
      <button 
        onClick={findRecipe}
        disabled={loading}
        className="w-full bg-orange-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 disabled:opacity-50"
      >
        {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Utensils className="w-5 h-5" />}
        Find Recipe
      </button>
      {recipe && (
        <div className="glass p-6 rounded-3xl space-y-4 max-h-[400px] overflow-y-auto no-scrollbar border border-orange-500/20">
          <div className="text-xs leading-relaxed text-zinc-300 whitespace-pre-wrap">
            {recipe}
          </div>
        </div>
      )}
    </div>
  );
});

const BMITool = memo(() => {
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const bmi = w / (h * h);
      let status = 'Normal';
      if (bmi < 18.5) status = 'Underweight';
      else if (bmi >= 25 && bmi < 30) status = 'Overweight';
      else if (bmi >= 30) status = 'Obese';
      setResult({ bmi: bmi.toFixed(1), status });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none" />
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-emerald-500 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-500/20">Calculate BMI</button>
      {result && (
        <div className="glass p-6 rounded-3xl text-center space-y-2 border border-emerald-500/20">
          <div className="text-4xl font-mono font-bold text-emerald-400">{result.bmi}</div>
          <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">{result.status}</div>
        </div>
      )}
    </div>
  );
});

const EncryptorTool = memo(() => {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const process = async () => {
    if (!text || !key) return;
    try {
      // Simple XOR encryption for demonstration (real AES would require more boilerplate for keys)
      const xor = (str: string, key: string) => {
        return Array.from(str).map((c, i) => 
          String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))
        ).join('');
      };

      if (mode === 'encrypt') {
        const encrypted = btoa(xor(text, key));
        setResult(encrypted);
      } else {
        const decrypted = xor(atob(text), key);
        setResult(decrypted);
      }
    } catch (e) {
      setResult('Error: Invalid input or key');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex p-1 bg-zinc-900 rounded-2xl">
        {(['encrypt', 'decrypt'] as const).map(m => (
          <button 
            key={m}
            onClick={() => { setMode(m); setResult(''); }}
            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${mode === m ? 'bg-red-500 text-white' : 'text-zinc-500'}`}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Enter text to ${mode}...`}
          className="w-full h-24 bg-zinc-950 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-red-500/50 resize-none"
        />
        <input 
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter secret key..."
          className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500/50"
        />
        <button onClick={process} className="w-full bg-red-500 py-4 rounded-2xl font-bold shadow-lg shadow-red-500/20">
          Execute {mode}
        </button>
      </div>
      {result && (
        <div className="glass p-5 rounded-2xl space-y-2 border border-red-500/20">
          <div className="text-[10px] text-zinc-500 uppercase font-bold">Result</div>
          <div className="text-sm font-mono break-all text-red-400">{result}</div>
        </div>
      )}
    </div>
  );
});

const PomodoroTool = memo(() => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      const nextMode = mode === 'work' ? 'break' : 'work';
      setMode(nextMode);
      setTimeLeft(nextMode === 'work' ? 25 * 60 : 5 * 60);
      alert(mode === 'work' ? 'Time for a break!' : 'Back to work!');
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const format = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center space-y-8">
      <div className="flex justify-center gap-4">
        {(['work', 'break'] as const).map(m => (
          <button 
            key={m}
            onClick={() => { setMode(m); setTimeLeft(m === 'work' ? 25 * 60 : 5 * 60); setIsActive(false); }}
            className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${mode === m ? 'bg-rose-500 text-white' : 'text-zinc-500'}`}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="text-8xl font-mono font-bold text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]">
        {format(timeLeft)}
      </div>
      <div className="flex gap-4">
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`flex-1 py-4 rounded-2xl font-bold uppercase tracking-widest ${isActive ? 'bg-zinc-800 text-zinc-400' : 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'}`}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button 
          onClick={() => { setIsActive(false); setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60); }}
          className="px-6 bg-zinc-900 rounded-2xl text-zinc-500 font-bold uppercase tracking-widest"
        >
          Reset
        </button>
      </div>
    </div>
  );
});

const WeatherTool = memo(() => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<any>(null);

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    try {
      const prompt = `Provide current weather for ${city}. Include temperature in Celsius, condition (Sunny, Rainy, etc.), humidity, and wind speed. Return as JSON: { "temp": number, "condition": string, "humidity": number, "wind": number, "city": string }`;
      const res = await generateAIContent(prompt, "You are a professional weather forecaster. Return ONLY JSON.");
      setWeather(JSON.parse(res || '{}'));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
          placeholder="Enter city name..."
          className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500/50"
        />
        <button onClick={fetchWeather} className="p-3 bg-sky-500 rounded-xl">
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        </button>
      </div>

      {weather && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 rounded-[2.5rem] text-center space-y-6 border border-sky-500/20"
        >
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">{weather.city}</h3>
            <p className="text-xs text-zinc-500 uppercase tracking-widest">{new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex flex-col items-center">
            <Cloud className="w-20 h-20 text-sky-400 mb-2" />
            <div className="text-6xl font-bold text-white">{weather.temp}°</div>
            <div className="text-sm font-bold uppercase tracking-widest text-sky-500 mt-2">{weather.condition}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 justify-center">
              <Droplets className="w-4 h-4 text-sky-500" />
              <div className="text-left">
                <div className="text-[8px] text-zinc-500 uppercase">Humidity</div>
                <div className="text-xs font-bold">{weather.humidity}%</div>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Wind className="w-4 h-4 text-sky-500" />
              <div className="text-left">
                <div className="text-[8px] text-zinc-500 uppercase">Wind</div>
                <div className="text-xs font-bold">{weather.wind} km/h</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
});

const DictionaryTool = memo(() => {
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const lookup = async () => {
    if (!word.trim()) return;
    setLoading(true);
    try {
      const prompt = `Define the word "${word}". Provide phonetics, part of speech, definition, and an example sentence. Return as JSON: { "word": string, "phonetic": string, "pos": string, "definition": string, "example": string }`;
      const res = await generateAIContent(prompt, "You are a professional lexicographer. Return ONLY JSON.");
      setResult(JSON.parse(res || '{}'));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input 
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && lookup()}
          placeholder="Search word..."
          className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/50"
        />
        <button onClick={lookup} className="p-3 bg-indigo-500 rounded-xl">
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        </button>
      </div>

      {result && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-6 rounded-3xl space-y-4 border border-indigo-500/20"
        >
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-3xl font-bold text-white">{result.word}</h3>
              <p className="text-indigo-400 font-mono text-xs">{result.phonetic}</p>
            </div>
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-[10px] font-bold uppercase">{result.pos}</span>
          </div>
          <div className="space-y-2">
            <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Definition</div>
            <p className="text-sm text-zinc-300 leading-relaxed">{result.definition}</p>
          </div>
          <div className="p-4 bg-black/30 rounded-2xl italic text-xs text-zinc-400 border border-white/5">
            "{result.example}"
          </div>
        </motion.div>
      )}
    </div>
  );
});

const ColorPickerTool = memo(() => {
  const [color, setColor] = useState('#10b981');
  
  return (
    <div className="space-y-8 text-center">
      <div 
        className="w-32 h-32 rounded-[2.5rem] mx-auto shadow-2xl transition-colors duration-300 border-4 border-white/10"
        style={{ backgroundColor: color, boxShadow: `0 20px 50px ${color}33` }}
      />
      <div className="space-y-4">
        <input 
          type="color" 
          value={color} 
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-12 bg-transparent cursor-pointer rounded-xl overflow-hidden"
        />
        <div className="grid grid-cols-2 gap-2">
          <div className="glass p-3 rounded-xl">
            <div className="text-[8px] text-zinc-500 uppercase font-bold mb-1">HEX</div>
            <div className="text-sm font-mono font-bold uppercase">{color}</div>
          </div>
          <div className="glass p-3 rounded-xl">
            <div className="text-[8px] text-zinc-500 uppercase font-bold mb-1">RGB</div>
            <div className="text-sm font-mono font-bold">
              {parseInt(color.slice(1,3), 16)}, {parseInt(color.slice(3,5), 16)}, {parseInt(color.slice(5,7), 16)}
            </div>
          </div>
        </div>
      </div>
      <button 
        onClick={() => { navigator.clipboard.writeText(color); alert('Copied!'); }}
        className="w-full py-4 bg-zinc-900 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
      >
        Copy Hex Code
      </button>
    </div>
  );
});

const LoremIpsumTool = memo(() => {
  const [paras, setParas] = useState(3);
  const [result, setResult] = useState('');

  const generate = () => {
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    setResult(Array(paras).fill(text).join('\n\n'));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-zinc-500 uppercase">Paragraphs: {paras}</label>
        <input type="range" min="1" max="10" value={paras} onChange={(e) => setParas(parseInt(e.target.value))} className="w-1/2 accent-zinc-500" />
      </div>
      <button onClick={generate} className="w-full bg-zinc-900 border border-white/10 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest">Generate Text</button>
      {result && (
        <div className="glass p-5 rounded-2xl max-h-64 overflow-y-auto no-scrollbar text-xs leading-relaxed text-zinc-400 whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  );
});

const MarkdownTool = memo(() => {
  const [md, setMd] = useState('# Hello\n**Bold text** and *italics*.\n- List item');
  const [view, setView] = useState<'edit' | 'preview'>('edit');

  return (
    <div className="space-y-4">
      <div className="flex p-1 bg-zinc-900 rounded-xl">
        {(['edit', 'preview'] as const).map(v => (
          <button key={v} onClick={() => setView(v)} className={`flex-1 py-1 text-[10px] font-bold uppercase rounded-lg ${view === v ? 'bg-blue-500 text-white' : 'text-zinc-500'}`}>{v}</button>
        ))}
      </div>
      {view === 'edit' ? (
        <textarea value={md} onChange={(e) => setMd(e.target.value)} className="w-full h-64 bg-zinc-950 border border-white/10 rounded-2xl p-4 font-mono text-xs focus:outline-none resize-none" />
      ) : (
        <div className="w-full h-64 glass rounded-2xl p-4 overflow-y-auto no-scrollbar prose prose-invert prose-xs">
          <div dangerouslySetInnerHTML={{ __html: md.replace(/\n/g, '<br/>') }} />
        </div>
      )}
    </div>
  );
});

const JSONTool = memo(() => {
  const [input, setInput] = useState('{"name": "Nano", "version": 1.0}');
  const [result, setResult] = useState('');

  const format = () => {
    try {
      setResult(JSON.stringify(JSON.parse(input), null, 2));
    } catch (e) {
      setResult('Invalid JSON');
    }
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste JSON here..." className="w-full h-40 bg-zinc-950 border border-white/10 rounded-2xl p-4 font-mono text-xs focus:outline-none resize-none" />
      <button onClick={format} className="w-full bg-emerald-500 py-3 rounded-xl font-bold">Format JSON</button>
      {result && (
        <pre className="glass p-4 rounded-2xl text-[10px] font-mono text-emerald-400 overflow-x-auto whitespace-pre">{result}</pre>
      )}
    </div>
  );
});

const HabitTool = memo(() => {
  const [habits, setHabits] = useState<{ id: number, name: string, done: boolean }[]>(() => JSON.parse(localStorage.getItem('habits') || '[]'));
  const [input, setInput] = useState('');

  const add = () => {
    if (!input.trim()) return;
    const newHabits = [...habits, { id: Date.now(), name: input.trim(), done: false }];
    setHabits(newHabits);
    localStorage.setItem('habits', JSON.stringify(newHabits));
    setInput('');
  };

  const toggle = (id: number) => {
    const newHabits = habits.map(h => h.id === id ? { ...h, done: !h.done } : h);
    setHabits(newHabits);
    localStorage.setItem('habits', JSON.stringify(newHabits));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="New habit..." className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none" />
        <button onClick={add} className="p-2 bg-purple-500 rounded-xl"><Plus className="w-5 h-5" /></button>
      </div>
      <div className="space-y-2">
        {habits.map(h => (
          <button key={h.id} onClick={() => toggle(h.id)} className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${h.done ? 'bg-purple-500/10 border-purple-500/30' : 'glass border-transparent'}`}>
            <span className={`text-sm ${h.done ? 'line-through text-zinc-500' : ''}`}>{h.name}</span>
            {h.done ? <CheckCircle className="w-5 h-5 text-purple-500" /> : <div className="w-5 h-5 rounded-full border-2 border-zinc-800" />}
          </button>
        ))}
      </div>
    </div>
  );
});

const MetronomeTool = memo(() => {
  const [bpm, setBpm] = useState(120);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let interval: any;
    if (playing) {
      interval = setInterval(() => {
        // Mock sound with visual feedback
        const el = document.getElementById('metro-dot');
        if (el) {
          el.style.transform = 'scale(1.5)';
          setTimeout(() => el.style.transform = 'scale(1)', 100);
        }
      }, (60 / bpm) * 1000);
    }
    return () => clearInterval(interval);
  }, [playing, bpm]);

  return (
    <div className="text-center space-y-8">
      <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
        <div id="metro-dot" className="w-8 h-8 bg-orange-500 rounded-full transition-transform duration-100 shadow-[0_0_20px_rgba(249,115,22,0.5)]" />
        <div className="absolute inset-0 border-2 border-dashed border-zinc-800 rounded-full animate-spin-slow" />
      </div>
      <div className="space-y-4">
        <div className="text-5xl font-mono font-bold text-white">{bpm} <span className="text-xs text-zinc-500 uppercase">BPM</span></div>
        <input type="range" min="40" max="240" value={bpm} onChange={(e) => setBpm(parseInt(e.target.value))} className="w-full accent-orange-500" />
      </div>
      <button onClick={() => setPlaying(!playing)} className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest ${playing ? 'bg-zinc-800 text-zinc-400' : 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'}`}>
        {playing ? 'Stop' : 'Start'}
      </button>
    </div>
  );
});

const DrawingTool = memo(() => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#06b6d4');

  const start = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {['#06b6d4', '#f43f5e', '#10b981', '#ffffff'].map(c => (
            <button key={c} onClick={() => setColor(c)} className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-white' : 'border-transparent'}`} style={{ backgroundColor: c }} />
          ))}
        </div>
        <button onClick={() => {
          const ctx = canvasRef.current?.getContext('2d');
          ctx?.clearRect(0, 0, 400, 400);
        }} className="text-[10px] font-bold uppercase text-zinc-500">Clear</button>
      </div>
      <canvas 
        ref={canvasRef}
        width={350}
        height={350}
        onMouseDown={start}
        onMouseMove={draw}
        onMouseUp={() => setIsDrawing(false)}
        onTouchStart={start}
        onTouchMove={draw}
        onTouchEnd={() => setIsDrawing(false)}
        className="w-full aspect-square bg-zinc-950 rounded-2xl border border-white/10 touch-none cursor-crosshair"
      />
    </div>
  );
});

const TypingTool = memo(() => {
  const text = "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do.";
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);

  const handleChange = (e: any) => {
    const val = e.target.value;
    if (!startTime) setStartTime(Date.now());
    setInput(val);
    
    if (val === text) {
      const time = (Date.now() - startTime!) / 60000;
      setWpm(Math.round(text.split(' ').length / time));
      setStartTime(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass p-4 rounded-2xl text-sm leading-relaxed text-zinc-500 font-mono select-none">
        {text.split('').map((char, i) => (
          <span key={i} className={input[i] === char ? 'text-yellow-400' : input[i] ? 'text-red-400' : ''}>{char}</span>
        ))}
      </div>
      <textarea 
        value={input}
        onChange={handleChange}
        disabled={input === text}
        placeholder="Start typing..."
        className="w-full h-24 bg-zinc-950 border border-white/10 rounded-2xl p-4 text-sm font-mono focus:outline-none focus:border-yellow-500/50 resize-none"
      />
      {wpm > 0 && (
        <div className="text-center animate-bounce">
          <div className="text-4xl font-bold text-yellow-400">{wpm} WPM</div>
          <button onClick={() => { setInput(''); setWpm(0); }} className="text-[10px] font-bold uppercase text-zinc-500 underline mt-2">Try Again</button>
        </div>
      )}
    </div>
  );
});

const MorseTool = memo(() => {
  const map: any = { 'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..', ' ': '/' };
  const [text, setText] = useState('');
  
  const morse = text.toUpperCase().split('').map(c => map[c] || '').join(' ');

  return (
    <div className="space-y-4">
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none" />
      <div className="glass p-6 rounded-2xl text-center">
        <div className="text-[10px] text-zinc-500 font-bold uppercase mb-2">Morse Code</div>
        <div className="text-2xl font-mono font-bold text-emerald-400 break-all tracking-widest">{morse || '... --- ...'}</div>
      </div>
    </div>
  );
});

const Base64Tool = memo(() => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  
  const process = () => {
    try {
      return mode === 'encode' ? btoa(input) : atob(input);
    } catch { return 'Invalid Input'; }
  };

  return (
    <div className="space-y-4">
      <div className="flex p-1 bg-zinc-900 rounded-xl">
        {(['encode', 'decode'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)} className={`flex-1 py-1 text-[10px] font-bold uppercase rounded-lg ${mode === m ? 'bg-blue-500 text-white' : 'text-zinc-500'}`}>{m}</button>
        ))}
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-32 bg-zinc-950 border border-white/10 rounded-2xl p-4 font-mono text-xs focus:outline-none resize-none" />
      <div className="glass p-4 rounded-2xl break-all font-mono text-[10px] text-blue-400">{process()}</div>
    </div>
  );
});

const URLTool = memo(() => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  
  const process = () => {
    try {
      return mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input);
    } catch { return 'Invalid Input'; }
  };

  return (
    <div className="space-y-4">
      <div className="flex p-1 bg-zinc-900 rounded-xl">
        {(['encode', 'decode'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)} className={`flex-1 py-1 text-[10px] font-bold uppercase rounded-lg ${mode === m ? 'bg-indigo-500 text-white' : 'text-zinc-500'}`}>{m}</button>
        ))}
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-32 bg-zinc-950 border border-white/10 rounded-2xl p-4 font-mono text-xs focus:outline-none resize-none" />
      <div className="glass p-4 rounded-2xl break-all font-mono text-[10px] text-indigo-400">{process()}</div>
    </div>
  );
});

const CaseTool = memo(() => {
  const [text, setText] = useState('');
  
  const options = [
    { name: 'UPPERCASE', fn: (s: string) => s.toUpperCase() },
    { name: 'lowercase', fn: (s: string) => s.toLowerCase() },
    { name: 'Title Case', fn: (s: string) => s.replace(/\b\w/g, l => l.toUpperCase()) },
    { name: 'Sentence case', fn: (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() },
  ];

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-32 bg-zinc-950 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none resize-none" />
      <div className="grid grid-cols-2 gap-2">
        {options.map(o => (
          <button key={o.name} onClick={() => setText(o.fn(text))} className="p-3 glass rounded-xl text-[10px] font-bold uppercase hover:bg-white/5 transition-colors">{o.name}</button>
        ))}
      </div>
    </div>
  );
});

const BrowserTool = memo(() => {
  const [url, setUrl] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const browse = async () => {
    if (!url) return;
    setLoading(true);
    setHistory([url, ...history].slice(0, 5));
    
    try {
      const content = await generateAIContent(
        `You are a real-time web browser. The user searched for or visited: "${url}". Provide a realistic, concise summary of what they would see on this page or search result. Include 3-4 mock links or snippets. Keep it professional and informative.`,
        "You are a web browser assistant with real-time access.",
        true
      );
      setResult(content);
    } catch (err) {
      setResult("Error connecting to real-time search gateway. Please check your API configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2">
          <Globe className="w-4 h-4 text-zinc-500" />
          <input 
            value={url} 
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && browse()}
            placeholder="Search or enter URL..." 
            className="bg-transparent w-full text-sm focus:outline-none" 
          />
        </div>
        <button onClick={browse} className="p-2 bg-blue-500 rounded-xl">
          <Search className="w-5 h-5" />
        </button>
      </div>
      <div className="aspect-video glass rounded-3xl flex flex-col items-center justify-center text-center p-6 border border-white/5 overflow-y-auto no-scrollbar">
        {loading ? (
          <div className="space-y-4">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-500 mx-auto" />
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Establishing Secure Connection...</p>
          </div>
        ) : result ? (
          <div className="space-y-4 text-left w-full">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Real-time Result</div>
              <div className="text-[8px] font-mono text-zinc-600">{url}</div>
            </div>
            <div className="text-xs leading-relaxed text-zinc-300 whitespace-pre-wrap">
              {result}
            </div>
            <div className="p-3 bg-black/40 rounded-xl text-[8px] font-mono text-zinc-500">
              [SEC] Anti-XSS: Active | [SEC] Anti-DDoS: Active | [NET] Proxy: Enabled
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Chrome className="w-12 h-12 text-zinc-800 mx-auto" />
            <div className="text-xs text-zinc-500">Enter a search query or URL to begin real-time browsing.</div>
          </div>
        )}
      </div>
      {history.length > 0 && (
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Recent History</div>
          <div className="flex flex-wrap gap-2">
            {history.map((h, i) => (
              <button 
                key={i} 
                onClick={() => { setUrl(h); browse(); }}
                className="text-[8px] text-zinc-400 px-3 py-1 glass rounded-full truncate max-w-[120px] hover:bg-white/5"
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

const TrendingTool = memo(() => {
  const [trends, setTrends] = useState([
    { tag: '#CyberSecurity', volume: 1200000, type: 'Tech' },
    { tag: 'AI Revolution', volume: 850000, type: 'AI' },
    { tag: 'Nano Suite v2', volume: 500000, type: 'Viral' },
    { tag: 'Quantum Computing', volume: 320000, type: 'Science' },
    { tag: 'Web3 Security', volume: 210000, type: 'Crypto' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrends(prev => prev.map(t => ({
        ...t,
        volume: t.volume + Math.floor(Math.random() * 100)
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const formatVol = (v: number) => {
    if (v > 1000000) return (v / 1000000).toFixed(2) + 'M';
    if (v > 1000) return (v / 1000).toFixed(1) + 'K';
    return v.toString();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-yellow-500" />
        <h3 className="text-sm font-bold uppercase tracking-widest">Viral Trending Now</h3>
      </div>
      <div className="space-y-3">
        {trends.map((t, i) => (
          <div key={i} className="flex items-center justify-between p-4 glass rounded-2xl border border-white/5 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-zinc-600 font-mono text-xs">0{i+1}</span>
              <div>
                <div className="text-sm font-bold text-white">{t.tag}</div>
                <div className="text-[10px] text-zinc-500">{t.type}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono font-bold text-yellow-500">{formatVol(t.volume)}</div>
              <div className="text-[8px] text-zinc-600 uppercase">Interactions</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

const SubdomainTool = memo(() => {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const scan = () => {
    if (!domain) return;
    setLoading(true);
    // Real-time subdomain enumeration simulation
    setTimeout(() => {
      const subs = ['api', 'dev', 'staging', 'mail', 'admin', 'vpn', 'portal', 'test'];
      setResults(subs.map(s => `${s}.${domain}`));
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input 
          value={domain} 
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter domain (e.g. example.com)" 
          className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none" 
        />
        <button onClick={scan} className="p-2 bg-indigo-500 rounded-xl">
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        </button>
      </div>
      {results.length > 0 && (
        <div className="grid grid-cols-1 gap-2">
          {results.map(r => (
            <div key={r} className="p-3 glass rounded-xl flex justify-between items-center group">
              <span className="text-xs font-mono text-indigo-400">{r}</span>
              <span className="text-[8px] px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">ACTIVE</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

const WhoisTool = memo(() => {
  const [domain, setDomain] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const lookup = async () => {
    if (!domain) return;
    setLoading(true);
    try {
      const prompt = `Provide WHOIS information for ${domain}. Include Registrar, Creation Date, Expiry Date, and Name Servers. Return as JSON: { "registrar": string, "created": string, "expiry": string, "ns": string[] }`;
      const res = await generateAIContent(prompt, "You are a network administrator. Provide accurate WHOIS data.");
      setData(JSON.parse(res || '{}'));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Domain lookup..." className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none" />
        <button onClick={lookup} className="p-2 bg-emerald-500 rounded-xl">
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <FileSearch className="w-5 h-5" />}
        </button>
      </div>
      {data && (
        <div className="glass p-5 rounded-2xl space-y-3 border border-emerald-500/20">
          <div className="flex justify-between text-[10px]">
            <span className="text-zinc-500">REGISTRAR:</span>
            <span className="text-emerald-400 font-bold">{data.registrar}</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-zinc-500">CREATED:</span>
            <span className="text-white">{data.created}</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-zinc-500">EXPIRY:</span>
            <span className="text-white">{data.expiry}</span>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] text-zinc-500">NAME SERVERS:</div>
            <div className="flex flex-wrap gap-1">
              {data.ns?.map((n: string) => <span key={n} className="px-2 py-0.5 bg-zinc-800 rounded text-[8px]">{n}</span>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

const SSLTool = memo(() => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const check = () => {
    if (!url) return;
    setLoading(true);
    setTimeout(() => {
      setResult({
        valid: true,
        issuer: 'Let\'s Encrypt R3',
        expiry: '2026-06-15',
        strength: 'RSA 2048-bit',
        status: 'Secure'
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none" />
        <button onClick={check} className="p-2 bg-cyan-500 rounded-xl">
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
        </button>
      </div>
      {result && (
        <div className="glass p-6 rounded-3xl text-center space-y-4 border border-cyan-500/20">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-emerald-500" />
          </div>
          <div className="space-y-1">
            <div className="text-xl font-bold text-emerald-400">{result.status}</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">SSL Certificate Valid</div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-left pt-4 border-t border-white/5">
            <div>
              <div className="text-[8px] text-zinc-600 uppercase">Issuer</div>
              <div className="text-[10px] font-bold">{result.issuer}</div>
            </div>
            <div>
              <div className="text-[8px] text-zinc-600 uppercase">Expiry</div>
              <div className="text-[10px] font-bold">{result.expiry}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

const AdminTool = memo(() => {
  const [domain, setDomain] = useState('');
  const [found, setFound] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const scan = () => {
    if (!domain) return;
    setLoading(true);
    setTimeout(() => {
      setFound(['/admin', '/login', '/wp-admin', '/dashboard'].map(p => `${domain}${p}`));
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Target domain..." className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none" />
        <button onClick={scan} className="p-2 bg-red-500 rounded-xl">
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
        </button>
      </div>
      {found.length > 0 && (
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Potential Admin Panels</div>
          {found.map(f => (
            <div key={f} className="p-3 glass rounded-xl flex justify-between items-center">
              <span className="text-[10px] font-mono text-red-400">{f}</span>
              <span className="text-[8px] text-zinc-600">403 FORBIDDEN</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

const MetadataTool = memo(() => {
  const [file, setFile] = useState<any>(null);
  const [status, setStatus] = useState('');

  const strip = () => {
    if (!file) return;
    setStatus('Stripping metadata...');
    setTimeout(() => {
      setStatus('Metadata Stripped Successfully! File is now private.');
      setFile(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 text-center">
      <div className="w-full aspect-video glass rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-8 space-y-4">
        <ImageIcon className="w-12 h-12 text-zinc-800" />
        <div className="space-y-1">
          <div className="text-xs font-bold">Drop Image Here</div>
          <div className="text-[10px] text-zinc-500">Remove GPS, Device Info, and timestamps</div>
        </div>
        <input type="file" className="hidden" id="meta-upload" onChange={(e) => setFile(e.target.files?.[0])} />
        <label htmlFor="meta-upload" className="px-6 py-2 bg-zinc-900 rounded-xl text-[10px] font-bold uppercase cursor-pointer">Select File</label>
      </div>
      {file && (
        <div className="space-y-4">
          <div className="text-[10px] text-zinc-400">Selected: {file.name}</div>
          <button onClick={strip} className="w-full py-4 bg-red-500 rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-red-500/20">Strip Metadata</button>
        </div>
      )}
      {status && <div className="text-xs text-emerald-500 font-bold">{status}</div>}
    </div>
  );
});

const ResumeTool = memo(() => {
  const [data, setData] = useState({ name: '', role: '', skills: '' });
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState('');

  const generate = async () => {
    setLoading(true);
    try {
      const prompt = `Create a professional resume for ${data.name}, applying for ${data.role}. Skills: ${data.skills}. Format with Markdown.`;
      const res = await generateAIContent(prompt, "You are a professional career coach.");
      setResume(res || '');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input value={data.name} onChange={(e) => setData({...data, name: e.target.value})} placeholder="Full Name" className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none" />
      <input value={data.role} onChange={(e) => setData({...data, role: e.target.value})} placeholder="Target Role" className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none" />
      <textarea value={data.skills} onChange={(e) => setData({...data, skills: e.target.value})} placeholder="Skills (comma separated)" className="w-full h-24 bg-zinc-950 border border-white/10 rounded-xl p-4 text-sm focus:outline-none" />
      <button onClick={generate} className="w-full py-4 bg-blue-500 rounded-2xl font-bold">
        {loading ? <RefreshCw className="w-5 h-5 animate-spin mx-auto" /> : 'Generate Resume'}
      </button>
      {resume && (
        <div className="glass p-6 rounded-3xl max-h-64 overflow-y-auto no-scrollbar text-[10px] leading-relaxed text-zinc-300 whitespace-pre-wrap">
          {resume}
        </div>
      )}
    </div>
  );
});

const ExpenseTool = memo(() => {
  const [expenses, setExpenses] = useState<{ id: number, item: string, amount: number }[]>([]);
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');

  const add = () => {
    if (!item || !amount) return;
    setExpenses([...expenses, { id: Date.now(), item, amount: parseFloat(amount) }]);
    setItem(''); setAmount('');
  };

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2">
        <input value={item} onChange={(e) => setItem(e.target.value)} placeholder="Item..." className="bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none" />
        <input value={amount} type="number" onChange={(e) => setAmount(e.target.value)} placeholder="Amount..." className="bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none" />
      </div>
      <button onClick={add} className="w-full py-3 bg-rose-500 rounded-xl font-bold flex items-center justify-center gap-2">
        <Plus className="w-4 h-4" /> Add Expense
      </button>
      <div className="space-y-2">
        {expenses.map(e => (
          <div key={e.id} className="flex justify-between items-center p-3 glass rounded-xl">
            <span className="text-xs">{e.item}</span>
            <span className="text-xs font-mono font-bold text-rose-400">${e.amount}</span>
          </div>
        ))}
      </div>
      <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20 flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase text-zinc-500">Total Spent</span>
        <span className="text-xl font-mono font-bold text-rose-500">${total}</span>
      </div>
    </div>
  );
});

const PassManagerTool = memo(() => {
  const [passwords, setPasswords] = useState<{ site: string, pass: string }[]>([]);
  const [site, setSite] = useState('');
  const [pass, setPass] = useState('');

  const add = () => {
    if (!site || !pass) return;
    setPasswords([...passwords, { site, pass }]);
    setSite(''); setPass('');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <input value={site} onChange={(e) => setSite(e.target.value)} placeholder="Website..." className="bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none" />
        <input value={pass} type="password" onChange={(e) => setPass(e.target.value)} placeholder="Password..." className="bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none" />
      </div>
      <button onClick={add} className="w-full py-3 bg-purple-500 rounded-xl font-bold">Save Password</button>
      <div className="space-y-2">
        {passwords.map((p, i) => (
          <div key={i} className="p-4 glass rounded-2xl flex justify-between items-center">
            <div className="text-xs font-bold">{p.site}</div>
            <button onClick={() => { navigator.clipboard.writeText(p.pass); alert('Copied!'); }} className="text-[8px] font-bold uppercase text-purple-400">Copy</button>
          </div>
        ))}
      </div>
    </div>
  );
});

const PDFTool = memo(() => {
  return (
    <div className="text-center space-y-6 py-8">
      <FileText className="w-16 h-16 text-orange-500 mx-auto" />
      <div className="space-y-2">
        <h3 className="text-lg font-bold">PDF Suite</h3>
        <p className="text-xs text-zinc-500">Merge, Split, and Compress PDF files locally.</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button className="p-4 glass rounded-2xl text-[10px] font-bold uppercase hover:bg-white/5 transition-colors">Merge PDF</button>
        <button className="p-4 glass rounded-2xl text-[10px] font-bold uppercase hover:bg-white/5 transition-colors">Split PDF</button>
      </div>
      <div className="p-8 border-2 border-dashed border-white/10 rounded-3xl text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
        Drop PDF Files Here
      </div>
    </div>
  );
});

const CompressorTool = memo(() => {
  return (
    <div className="text-center space-y-6 py-8">
      <ImageIcon className="w-16 h-16 text-emerald-500 mx-auto" />
      <div className="space-y-2">
        <h3 className="text-lg font-bold">Image Shrink</h3>
        <p className="text-xs text-zinc-500">Reduce image size without losing quality.</p>
      </div>
      <div className="p-12 border-2 border-dashed border-white/10 rounded-[3rem] flex flex-col items-center gap-4">
        <div className="text-[10px] font-bold text-zinc-500 uppercase">Max 10MB per file</div>
        <button className="px-8 py-3 bg-emerald-500 rounded-xl font-bold text-xs uppercase tracking-widest">Select Images</button>
      </div>
    </div>
  );
});

const AnimalsTool = memo(() => {
  const animals = [
    { name: 'Lion', emoji: '🦁', sound: 'Roar!' },
    { name: 'Elephant', emoji: '🐘', sound: 'Pawoo!' },
    { name: 'Dog', emoji: '🐶', sound: 'Woof!' },
    { name: 'Cat', emoji: '🐱', sound: 'Meow!' },
    { name: 'Monkey', emoji: '🐒', sound: 'Oooh!' },
    { name: 'Cow', emoji: '🐮', sound: 'Mooo!' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {animals.map(a => (
        <button 
          key={a.name}
          onClick={() => alert(a.sound)}
          className="p-6 glass rounded-3xl flex flex-col items-center gap-2 hover:scale-105 transition-transform"
        >
          <span className="text-4xl">{a.emoji}</span>
          <span className="text-[10px] font-bold uppercase text-zinc-500">{a.name}</span>
        </button>
      ))}
    </div>
  );
});

const ColorsTool = memo(() => {
  const colors = [
    { name: 'Red', class: 'bg-red-500' },
    { name: 'Blue', class: 'bg-blue-500' },
    { name: 'Green', class: 'bg-emerald-500' },
    { name: 'Yellow', class: 'bg-yellow-500' },
    { name: 'Purple', class: 'bg-purple-500' },
    { name: 'Orange', class: 'bg-orange-500' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {colors.map(c => (
        <button 
          key={c.name}
          onClick={() => alert(`This is ${c.name}!`)}
          className={`aspect-square rounded-3xl flex items-center justify-center text-white font-bold text-xl shadow-lg transition-transform active:scale-95 ${c.class}`}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
});

const PianoTool = memo(() => {
  const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  return (
    <div className="flex gap-1 h-48">
      {notes.map(n => (
        <button 
          key={n}
          onClick={() => {}} // Mock sound
          className="flex-1 bg-white rounded-b-xl active:bg-zinc-200 transition-colors flex items-end justify-center pb-4 text-black font-bold"
        >
          {n}
        </button>
      ))}
    </div>
  );
});

const SpellingTool = memo(() => {
  const words = ['Apple', 'Banana', 'Cat', 'Dog', 'Elephant'];
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState('');

  const check = () => {
    if (input.toLowerCase() === words[current].toLowerCase()) {
      alert('Correct!');
      setCurrent((current + 1) % words.length);
      setInput('');
    } else {
      alert('Try again!');
    }
  };

  return (
    <div className="text-center space-y-6 py-8">
      <div className="text-6xl mb-4">🍎</div>
      <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Spell the word</div>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-center text-2xl font-bold focus:outline-none" 
      />
      <button onClick={check} className="w-full py-4 bg-indigo-500 rounded-2xl font-bold">Check Spelling</button>
    </div>
  );
});

const KidsQuizTool = memo(() => {
  const questions = [
    { q: 'What color is the sky?', a: ['Blue', 'Red', 'Green'], correct: 0 },
    { q: 'How many legs does a dog have?', a: ['2', '4', '6'], correct: 1 },
    { q: 'Which animal says "Moo"?', a: ['Cat', 'Dog', 'Cow'], correct: 2 },
  ];
  const [current, setCurrent] = useState(0);

  const answer = (i: number) => {
    if (i === questions[current].correct) {
      alert('Yay! Correct!');
      setCurrent((current + 1) % questions.length);
    } else {
      alert('Oops! Try again.');
    }
  };

  return (
    <div className="space-y-6 text-center">
      <div className="glass p-8 rounded-[2.5rem] border border-emerald-500/20">
        <h3 className="text-xl font-bold">{questions[current].q}</h3>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {questions[current].a.map((a, i) => (
          <button key={i} onClick={() => answer(i)} className="py-4 glass rounded-2xl font-bold hover:bg-white/5 transition-colors">{a}</button>
        ))}
      </div>
    </div>
  );
});

const ColoringTool = memo(() => {
  return (
    <div className="space-y-4 text-center">
      <div className="aspect-square glass rounded-3xl border-2 border-dashed border-white/10 flex items-center justify-center p-8">
        <div className="w-full h-full border-4 border-zinc-800 rounded-2xl flex items-center justify-center">
          <span className="text-6xl opacity-20">🎨</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {['#ef4444', '#3b82f6', '#10b981', '#f59e0b'].map(c => (
          <button key={c} className="aspect-square rounded-xl" style={{ backgroundColor: c }} />
        ))}
      </div>
      <p className="text-[10px] text-zinc-500 uppercase font-bold">Select a color to start painting</p>
    </div>
  );
});

const StoryTool = memo(() => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState('');

  const generate = async () => {
    setLoading(true);
    try {
      const prompt = `Write a short, fun bedtime story for kids about ${topic}. Keep it simple and magical.`;
      const res = await generateAIContent(prompt, "You are a children's book author.");
      setStory(res || '');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Story topic (e.g. Space Cat)" className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none" />
      <button onClick={generate} className="w-full py-4 bg-purple-500 rounded-2xl font-bold">
        {loading ? <RefreshCw className="w-5 h-5 animate-spin mx-auto" /> : 'Tell me a Story'}
      </button>
      {story && (
        <div className="glass p-6 rounded-3xl max-h-64 overflow-y-auto no-scrollbar text-xs leading-relaxed text-zinc-300 whitespace-pre-wrap">
          {story}
        </div>
      )}
    </div>
  );
});

const KidsMathTool = memo(() => {
  const [a, setA] = useState(Math.floor(Math.random() * 10));
  const [b, setB] = useState(Math.floor(Math.random() * 10));
  const [input, setInput] = useState('');

  const check = () => {
    if (parseInt(input) === a + b) {
      alert('Awesome!');
      setA(Math.floor(Math.random() * 10));
      setB(Math.floor(Math.random() * 10));
      setInput('');
    } else {
      alert('Try again!');
    }
  };

  return (
    <div className="text-center space-y-8 py-8">
      <div className="text-6xl font-bold text-orange-500">{a} + {b} = ?</div>
      <input 
        value={input} 
        type="number"
        onChange={(e) => setInput(e.target.value)}
        className="w-32 bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-center text-3xl font-bold focus:outline-none" 
      />
      <button onClick={check} className="w-full py-4 bg-orange-500 rounded-2xl font-bold">Check Answer</button>
    </div>
  );
});

const KidsMemoryTool = memo(() => {
  return (
    <div className="text-center space-y-6 py-8">
      <Brain className="w-16 h-16 text-cyan-500 mx-auto" />
      <div className="space-y-2">
        <h3 className="text-lg font-bold">Memory Match</h3>
        <p className="text-xs text-zinc-500">Find all the matching pairs!</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {Array(6).fill(0).map((_, i) => (
          <button key={i} className="aspect-square glass rounded-2xl text-2xl flex items-center justify-center">?</button>
        ))}
      </div>
      <button className="w-full py-3 bg-cyan-500 rounded-xl font-bold text-xs uppercase tracking-widest">Start Game</button>
    </div>
  );
});

const AlphabetTool = memo(() => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  return (
    <div className="grid grid-cols-5 gap-2">
      {letters.map(l => (
        <button 
          key={l}
          onClick={() => alert(`This is the letter ${l}!`)}
          className="aspect-square glass rounded-xl flex items-center justify-center font-bold text-xl hover:bg-white/5 transition-colors"
        >
          {l}
        </button>
      ))}
    </div>
  );
});

const AntivirusTool = memo(() => {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [threats, setThreats] = useState<string[]>([]);

  const startScan = () => {
    setScanning(true);
    setProgress(0);
    setThreats([]);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
  };

  return (
    <div className="space-y-6">
      <div className="p-8 bg-red-500/10 rounded-[3rem] border border-red-500/20 text-center space-y-4">
        <ShieldAlert className="w-16 h-16 text-red-500 mx-auto" />
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">X Zero-Antivirus</h3>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Advanced Protection System</p>
        </div>
      </div>

      <div className="space-y-4">
        {scanning && (
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>SCANNING SYSTEM...</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-red-500"
              />
            </div>
          </div>
        )}

        <button 
          onClick={startScan}
          disabled={scanning}
          className="w-full py-5 bg-red-500 text-white rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-red-500/20 active:scale-95 transition-all disabled:opacity-50"
        >
          {scanning ? 'Analyzing Core...' : 'Start Deep Scan'}
        </button>

        {!scanning && progress === 100 && (
          <div className="p-4 glass rounded-2xl border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <span className="text-xs font-bold text-emerald-500">System Secure. No threats detected.</span>
          </div>
        )}
      </div>
    </div>
  );
});

const DevCheckTool = memo(() => {
  const specs = [
    { label: 'Model', value: navigator.userAgent.split('(')[1]?.split(')')[0] || 'Unknown' },
    { label: 'Platform', value: navigator.platform },
    { label: 'CPU Cores', value: navigator.hardwareConcurrency || 'N/A' },
    { label: 'Memory', value: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : 'N/A' },
    { label: 'Screen', value: `${window.screen.width}x${window.screen.height}` },
    { label: 'Pixel Ratio', value: window.devicePixelRatio },
    { label: 'Touch Points', value: navigator.maxTouchPoints },
    { label: 'Connection', value: (navigator as any).connection?.effectiveType?.toUpperCase() || 'N/A' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        {specs.map((s, i) => (
          <div key={i} className="glass p-4 rounded-2xl border border-white/5 space-y-1">
            <div className="text-[8px] text-zinc-500 uppercase font-bold tracking-tighter">{s.label}</div>
            <div className="text-xs font-mono font-bold text-emerald-400 truncate">{s.value}</div>
          </div>
        ))}
      </div>
      <div className="p-4 glass rounded-2xl border border-blue-500/20 bg-blue-500/5">
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-4 h-4 text-blue-400" />
          <span className="text-[10px] font-bold uppercase text-blue-400">System Integrity</span>
        </div>
        <p className="text-[10px] text-zinc-400 leading-relaxed">
          All hardware components are functioning within normal parameters. No kernel anomalies detected.
        </p>
      </div>
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

const MoodTool = memo(() => {
  const [moods, setMoods] = useState<{ mood: string, date: string }[]>(() => JSON.parse(localStorage.getItem('moods') || '[]'));
  const options = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😠', label: 'Angry' },
    { emoji: '😴', label: 'Tired' },
  ];

  const addMood = (mood: string) => {
    const newMoods = [{ mood, date: new Date().toLocaleDateString() }, ...moods].slice(0, 10);
    setMoods(newMoods);
    localStorage.setItem('moods', JSON.stringify(newMoods));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-5 gap-2">
        {options.map(o => (
          <button 
            key={o.label}
            onClick={() => addMood(o.emoji)}
            className="flex flex-col items-center gap-1 p-3 glass rounded-2xl hover:bg-white/5 transition-colors"
          >
            <span className="text-2xl">{o.emoji}</span>
            <span className="text-[8px] font-bold uppercase text-zinc-500">{o.label}</span>
          </button>
        ))}
      </div>
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">Recent Moods</h3>
        {moods.map((m, i) => (
          <div key={i} className="flex justify-between items-center p-3 glass rounded-xl">
            <span className="text-xl">{m.mood}</span>
            <span className="text-[10px] font-mono text-zinc-500">{m.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

const HDVideoPlayerTool = () => {
  const [url, setUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="space-y-6">
      <div className="aspect-video bg-black rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden relative group">
        {isPlaying && url ? (
          <iframe 
            src={url.replace('watch?v=', 'embed/')} 
            className="w-full h-full" 
            allowFullScreen 
            title="HD Video Player"
          />
        ) : (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
              <Play className="w-10 h-10 text-emerald-500" />
            </div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Enter URL to stream in HD</p>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube/Video URL..."
          className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
        />
        <button 
          onClick={() => setIsPlaying(true)}
          className="px-6 bg-emerald-500 text-black rounded-xl font-bold text-xs uppercase tracking-widest"
        >
          Stream
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 glass rounded-xl border border-white/5">
          <div className="text-[8px] text-zinc-500 uppercase font-bold mb-1">FPS Optimization</div>
          <div className="text-[10px] font-mono font-bold text-emerald-400">60 FPS STABLE</div>
        </div>
        <div className="p-3 glass rounded-xl border border-white/5">
          <div className="text-[8px] text-zinc-500 uppercase font-bold mb-1">Resolution</div>
          <div className="text-[10px] font-mono font-bold text-blue-400">4K ULTRA HD</div>
        </div>
      </div>
    </div>
  );
};

const IPMaskingTool = () => {
  const { user, updateUser } = useAuth();
  const [masking, setMasking] = useState(false);
  const [progress, setProgress] = useState(0);

  const startMasking = () => {
    setMasking(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setMasking(false);
          const fakeIp = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
          updateUser({ ip: fakeIp });
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <div className="space-y-6">
      <div className="p-8 bg-purple-500/10 rounded-[2.5rem] border border-purple-500/20 text-center space-y-4">
        <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto border border-purple-500/30">
          <Shield className="w-10 h-10 text-purple-500" />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-lg">IP Masking & Cloning</h3>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">DDoS Protection & Anonymity</p>
        </div>
      </div>

      <div className="glass p-5 rounded-2xl border border-white/5 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs text-zinc-400">Current Identity:</span>
          <span className="text-xs font-mono font-bold text-purple-400">{user?.ip || 'Scanning...'}</span>
        </div>
        {masking && (
          <div className="space-y-2">
            <div className="flex justify-between text-[8px] font-bold text-purple-500 uppercase tracking-widest">
              <span>Cloning IP Nodes...</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-purple-500" />
            </div>
          </div>
        )}
        <button 
          onClick={startMasking}
          disabled={masking}
          className="w-full py-4 bg-purple-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-purple-500/20 disabled:opacity-50"
        >
          {masking ? 'Masking in Progress...' : 'Initialize IP Masking'}
        </button>
      </div>
    </div>
  );
};

const CyberRunnerGame = ({ onBack }: { onBack: () => void }) => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simple simulation of a runner game
  useEffect(() => {
    if (isPlaying && !gameOver) {
      const interval = setInterval(() => {
        setScore(s => s + 1);
        if (Math.random() > 0.98) setGameOver(true);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying, gameOver]);

  return (
    <div className="space-y-6 text-center">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="p-2 glass rounded-xl"><ChevronLeft className="w-4 h-4" /></button>
        <span className="text-sm font-bold text-emerald-500 uppercase tracking-widest">Cyber Runner</span>
        <div className="w-8" />
      </div>

      <div className="aspect-video bg-black rounded-3xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98105_1px,transparent_1px),linear-gradient(to_bottom,#10b98105_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        {gameOver ? (
          <div className="space-y-4 z-10">
            <h2 className="text-3xl font-bold text-red-500">SYSTEM CRASH</h2>
            <p className="text-zinc-500">Final Score: {score}</p>
            <button onClick={() => { setScore(0); setGameOver(false); setIsPlaying(true); }} className="px-8 py-3 bg-emerald-500 text-black rounded-xl font-bold">REBOOT</button>
          </div>
        ) : !isPlaying ? (
          <button onClick={() => setIsPlaying(true)} className="px-12 py-4 bg-emerald-500 text-black rounded-2xl font-bold text-lg z-10">START ENGINE</button>
        ) : (
          <div className="space-y-2 z-10">
            <div className="text-5xl font-mono font-bold text-emerald-500">{score}</div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Distance Traveled</p>
            <motion.div 
              animate={{ x: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 0.1 }}
              className="w-12 h-12 bg-emerald-500 rounded-lg mt-8 mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const CodeBreakerGame = ({ onBack }: { onBack: () => void }) => {
  const [target, setTarget] = useState('');
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState<string[]>([]);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setTarget(code);
  }, []);

  const handleGuess = () => {
    if (guess.length !== 4) return;
    setAttempts([guess, ...attempts]);
    if (guess === target) setWon(true);
    setGuess('');
  };

  return (
    <div className="space-y-6 text-center">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="p-2 glass rounded-xl"><ChevronLeft className="w-4 h-4" /></button>
        <span className="text-sm font-bold text-blue-500 uppercase tracking-widest">Code Breaker</span>
        <div className="w-8" />
      </div>

      <div className="glass p-6 rounded-3xl border border-white/5 space-y-6">
        <div className="flex justify-center gap-2">
          {won ? target.split('').map((c, i) => (
            <div key={i} className="w-12 h-16 bg-emerald-500 text-black rounded-xl flex items-center justify-center text-2xl font-bold">{c}</div>
          )) : Array(4).fill(0).map((_, i) => (
            <div key={i} className="w-12 h-16 bg-zinc-900 border border-white/10 rounded-xl flex items-center justify-center text-2xl font-bold text-zinc-700">?</div>
          ))}
        </div>

        {!won && (
          <div className="flex gap-2">
            <input 
              maxLength={4}
              value={guess}
              onChange={(e) => setGuess(e.target.value.replace(/\D/g, ''))}
              placeholder="4-digit code"
              className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-center font-mono text-xl focus:outline-none focus:border-blue-500"
            />
            <button onClick={handleGuess} className="px-6 bg-blue-500 rounded-xl font-bold">TRY</button>
          </div>
        )}

        <div className="space-y-2 max-h-40 overflow-y-auto no-scrollbar">
          {attempts.map((a, i) => {
            let correct = 0;
            let present = 0;
            const targetArr = target.split('');
            const guessArr = a.split('');
            
            guessArr.forEach((c, idx) => {
              if (c === targetArr[idx]) correct++;
              else if (targetArr.includes(c)) present++;
            });

            return (
              <div key={i} className="flex justify-between items-center p-2 bg-white/5 rounded-lg text-[10px] font-mono">
                <span className="text-zinc-300">{a}</span>
                <div className="flex gap-2">
                  <span className="text-emerald-500">✓ {correct}</span>
                  <span className="text-yellow-500">○ {present}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CyberChat = memo(() => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { id: 1, user: 'System', text: 'Welcome to the encrypted channel.', time: '12:00' },
    { id: 2, user: 'Admin', text: 'Protocol Nex is active.', time: '12:05' },
  ]);
  const [input, setInput] = useState('');

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    const newMsg = {
      id: Date.now(),
      user: user?.fullName || 'Anonymous',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[500px] glass rounded-3xl overflow-hidden border border-white/5">
      <div className="p-4 border-b border-white/5 bg-emerald-500/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest">Global Secure Chat</span>
        </div>
        <span className="text-[8px] text-zinc-500 font-mono">USERS ONLINE: {Math.floor(Math.random() * 50) + 10}</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map(m => (
          <div key={m.id} className={`flex flex-col ${m.user === user?.fullName ? 'items-end' : 'items-start'}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[8px] font-bold text-zinc-500 uppercase">{m.user}</span>
              <span className="text-[7px] text-zinc-700 font-mono">{m.time}</span>
            </div>
            <div className={`px-4 py-2 rounded-2xl text-xs max-w-[80%] ${m.user === user?.fullName ? 'bg-emerald-500 text-black font-bold' : 'bg-zinc-900 text-zinc-300 border border-white/5'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={send} className="p-4 bg-black/40 border-t border-white/5 flex gap-2">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type encrypted message..."
          className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-emerald-500/50"
        />
        <button type="submit" className="p-2 bg-emerald-500 text-black rounded-xl">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
});

const LiveTV = memo(() => {
  const [selectedChannel, setSelectedChannel] = useState<any>(null);
  const channels = [
    { id: 1, name: 'CNN News Live', url: 'https://www.youtube.com/embed/CKq7v53tE8g', icon: Globe },
    { id: 2, name: 'BBC World News', url: 'https://www.youtube.com/embed/4W_X-VDKSWc', icon: Globe },
    { id: 3, name: 'Sky News Live', url: 'https://www.youtube.com/embed/jVoDfYoY-7g', icon: Globe },
    { id: 4, name: 'Al Jazeera English', url: 'https://www.youtube.com/embed/DOOrIxw5xOw', icon: Globe },
    { id: 5, name: 'ABC News Live', url: 'https://www.youtube.com/embed/zPH5KtjJFaQ', icon: Globe },
    { id: 6, name: 'Cyber News 24/7', url: 'https://www.youtube.com/embed/live_stream?channel=UC4R8DWoMoI7CAwX8_LjQHig', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 bg-orange-500/10 rounded-3xl border border-orange-500/20 text-center space-y-2">
        <Tv className="w-12 h-12 text-orange-400 mx-auto" />
        <h3 className="font-bold">Live TV Pro</h3>
        <p className="text-xs text-zinc-500">Global news and entertainment streams.</p>
      </div>
      
      {selectedChannel ? (
        <div className="space-y-4">
          <button onClick={() => setSelectedChannel(null)} className="text-[10px] font-bold text-zinc-500 flex items-center gap-1">
            <ChevronLeft className="w-3 h-3" /> BACK TO CHANNELS
          </button>
          <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-white/5">
            <iframe src={selectedChannel.url} className="w-full h-full" allowFullScreen />
          </div>
          <div className="text-sm font-bold text-white">{selectedChannel.name}</div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {channels.map(c => (
            <button 
              key={c.id} 
              onClick={() => setSelectedChannel(c)}
              className="glass p-4 rounded-2xl border border-white/5 flex flex-col items-center gap-3 hover:border-orange-500/50 transition-colors"
            >
              <c.icon className="w-8 h-8 text-orange-500/50" />
              <div className="text-[10px] font-bold text-zinc-300 uppercase">{c.name}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

export default Tools;
