import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  FileText, 
  PlusCircle, 
  TrendingUp, 
  PiggyBank, 
  Gamepad2, 
  ChevronLeft,
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
  Download
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

type Tool = 'none' | 'calculator' | 'notes' | 'math' | 'finance' | 'celengan' | 'games' | 'password' | 'qr' | 'converter' | 'stopwatch' | 'worldclock' | 'currency' | 'translator' | 'recipe' | 'bmi' | 'mood';

const Tools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>('none');

  const tools = [
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
  ];

  return (
    <div className="space-y-6 pb-12">
      <AnimatePresence mode="wait">
        {activeTool === 'none' ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            {tools.map((tool) => (
              <motion.button
                key={tool.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTool(tool.id as Tool)}
                className="glass p-6 rounded-3xl flex flex-col items-center gap-4 text-center group"
              >
                <div className={`p-4 rounded-2xl ${tool.color} group-hover:scale-110 transition-transform`}>
                  <tool.icon className="w-8 h-8" />
                </div>
                <span className="font-bold text-sm tracking-tight">{tool.name}</span>
              </motion.button>
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

const GamesTool = () => {
  const [game, setGame] = useState<'none' | 'sos' | 'hangman'>('none');

  if (game === 'sos') return <SOSGame onBack={() => setGame('none')} />;
  if (game === 'hangman') return <HangmanGame onBack={() => setGame('none')} />;

  return (
    <div className="grid grid-cols-1 gap-4">
      <button onClick={() => setGame('sos')} className="p-6 glass rounded-2xl text-left flex items-center justify-between group">
        <div>
          <h3 className="font-bold">SOS Game</h3>
          <p className="text-xs text-zinc-500">Classic tic-tac-toe style</p>
        </div>
        <Gamepad2 className="w-6 h-6 text-emerald-500 group-hover:scale-125 transition-transform" />
      </button>
      <button onClick={() => setGame('hangman')} className="p-6 glass rounded-2xl text-left flex items-center justify-between group">
        <div>
          <h3 className="font-bold">Hangman</h3>
          <p className="text-xs text-zinc-500">Guess the secret word</p>
        </div>
        <Gamepad2 className="w-6 h-6 text-emerald-500 group-hover:scale-125 transition-transform" />
      </button>
    </div>
  );
};

const SOSGame = ({ onBack }: { onBack: () => void }) => {
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
};

const HangmanGame = ({ onBack }: { onBack: () => void }) => {
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
};

const StopwatchTool = () => {
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
};

const WorldClockTool = () => {
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
};

const CurrencyTool = () => {
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
};

const TranslatorTool = () => {
  const [text, setText] = useState('');
  const [targetLang, setTargetLang] = useState('Indonesian');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const translate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate this to ${targetLang}: ${text}`,
        config: { systemInstruction: "You are a professional translator. Provide only the translated text." }
      });
      setResult(response.text || '');
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
};

const RecipeTool = () => {
  const [ingredients, setIngredients] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState('');

  const findRecipe = async () => {
    if (!ingredients.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Suggest a delicious recipe using these ingredients: ${ingredients}`,
        config: { systemInstruction: "You are a world-class chef. Provide a recipe with a catchy name, ingredients list, and step-by-step instructions. Format with Markdown." }
      });
      setRecipe(response.text || '');
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
};

const BMITool = () => {
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
};

const MoodTool = () => {
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
};

export default Tools;
