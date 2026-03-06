import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Activity, 
  MessageSquare, 
  Cpu, 
  Globe, 
  Plane, 
  Users, 
  Zap, 
  Radar, 
  Newspaper,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  AlertTriangle
} from 'lucide-react';

// 1. Crypto Tracker
export const CryptoTracker = memo(() => {
  const [prices, setPrices] = useState([
    { name: 'Bitcoin', symbol: 'BTC', price: 65432.10, change: 2.5 },
    { name: 'Ethereum', symbol: 'ETH', price: 3456.78, change: -1.2 },
    { name: 'Solana', symbol: 'SOL', price: 145.67, change: 5.4 },
    { name: 'Nano', symbol: 'XNO', price: 1.23, change: 0.8 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => prev.map(p => ({
        ...p,
        price: p.price + (Math.random() - 0.5) * (p.price * 0.001),
        change: p.change + (Math.random() - 0.5) * 0.1
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-emerald-400">
        <TrendingUp className="w-4 h-4" />
        <h3 className="text-xs font-bold uppercase tracking-widest">Real-time Crypto</h3>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {prices.map(p => (
          <div key={p.symbol} className="glass p-4 rounded-2xl flex justify-between items-center border border-white/5">
            <div>
              <div className="text-sm font-bold">{p.name}</div>
              <div className="text-[10px] text-zinc-500">{p.symbol}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-mono font-bold text-white">${p.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className={`text-[10px] flex items-center justify-end gap-1 ${p.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {p.change >= 0 ? <ArrowUp className="w-2 h-2" /> : <ArrowDown className="w-2 h-2" />}
                {Math.abs(p.change).toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

// 2. Stock Market
export const StockMarket = memo(() => {
  const [stocks, setStocks] = useState([
    { name: 'Apple', symbol: 'AAPL', price: 189.45, change: 0.45 },
    { name: 'Tesla', symbol: 'TSLA', price: 175.22, change: -2.34 },
    { name: 'Nvidia', symbol: 'NVDA', price: 890.11, change: 3.12 },
    { name: 'Google', symbol: 'GOOGL', price: 154.33, change: 1.11 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev => prev.map(s => ({
        ...s,
        price: s.price + (Math.random() - 0.5) * 0.5,
        change: s.change + (Math.random() - 0.5) * 0.05
      })));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-blue-400">
        <Activity className="w-4 h-4" />
        <h3 className="text-xs font-bold uppercase tracking-widest">Global Stocks</h3>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {stocks.map(s => (
          <div key={s.symbol} className="glass p-4 rounded-2xl flex justify-between items-center border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-[10px] font-bold text-zinc-500">{s.symbol[0]}</div>
              <div>
                <div className="text-sm font-bold">{s.name}</div>
                <div className="text-[10px] text-zinc-500">{s.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-mono font-bold text-white">${s.price.toFixed(2)}</div>
              <div className={`text-[10px] ${s.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

// 3. Global Chat (Simulation)
export const GlobalChat = memo(() => {
  const [messages, setMessages] = useState([
    { user: 'Anon_99', text: 'Anyone seen the latest exploit?', time: '12:01' },
    { user: 'Cyber_Ghost', text: 'Yeah, patching it now.', time: '12:02' },
    { user: 'Root_User', text: 'System online.', time: '12:05' },
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const bots = ['Bot_Alpha', 'Net_Stalker', 'Web_Wizard'];
      const texts = ['Scanning...', 'Connection stable.', 'New data incoming.', 'Who is there?', 'System check.'];
      const newMsg = {
        user: bots[Math.floor(Math.random() * bots.length)],
        text: texts[Math.floor(Math.random() * texts.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev.slice(-10), newMsg]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { user: 'You', text: input, time: 'Now' }]);
    setInput('');
  };

  return (
    <div className="space-y-4 flex flex-col h-[400px]">
      <div className="flex items-center gap-2 text-purple-400">
        <MessageSquare className="w-4 h-4" />
        <h3 className="text-xs font-bold uppercase tracking-widest">Global Secure Chat</h3>
      </div>
      <div className="flex-1 glass rounded-2xl p-4 overflow-y-auto no-scrollbar space-y-3 border border-white/5">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.user === 'You' ? 'items-end' : 'items-start'}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[8px] font-bold text-zinc-500 uppercase">{m.user}</span>
              <span className="text-[8px] text-zinc-700">{m.time}</span>
            </div>
            <div className={`px-3 py-2 rounded-2xl text-[10px] max-w-[80%] ${m.user === 'You' ? 'bg-emerald-500 text-black font-medium' : 'bg-zinc-900 text-zinc-300 border border-white/5'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Type a message..." 
          className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none" 
        />
        <button onClick={send} className="p-2 bg-emerald-500 rounded-xl text-black">
          <Zap className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});

// 4. System Monitor
export const SystemMonitor = memo(() => {
  const [stats, setStats] = useState({ cpu: 24, ram: 52, network: 12, temp: 42 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * 40 + 10),
        ram: Math.floor(Math.random() * 20 + 40),
        network: Math.floor(Math.random() * 100 + 5),
        temp: Math.floor(Math.random() * 10 + 35)
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-orange-400">
        <Cpu className="w-4 h-4" />
        <h3 className="text-xs font-bold uppercase tracking-widest">Live System Status</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'CPU Usage', val: stats.cpu, unit: '%', color: 'bg-emerald-500' },
          { label: 'RAM Usage', val: stats.ram, unit: '%', color: 'bg-blue-500' },
          { label: 'Network', val: stats.network, unit: 'Mb/s', color: 'bg-purple-500' },
          { label: 'Core Temp', val: stats.temp, unit: '°C', color: 'bg-orange-500' },
        ].map(s => (
          <div key={s.label} className="glass p-4 rounded-2xl border border-white/5 space-y-2">
            <div className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{s.label}</div>
            <div className="text-xl font-mono font-bold text-white">{s.val}{s.unit}</div>
            <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
              <motion.div animate={{ width: `${s.val}%` }} className={`h-full ${s.color}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

// 5. Earthquake Tracker
export const EarthquakeTracker = memo(() => {
  const [quakes, setQuakes] = useState([
    { loc: 'Tegal, Indonesia', mag: 4.2, time: '10m ago' },
    { loc: 'Tokyo, Japan', mag: 5.1, time: '25m ago' },
    { loc: 'California, USA', mag: 3.8, time: '1h ago' },
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-red-400">
        <AlertTriangle className="w-4 h-4" />
        <h3 className="text-xs font-bold uppercase tracking-widest">Global Seismograph</h3>
      </div>
      <div className="space-y-2">
        {quakes.map((q, i) => (
          <div key={i} className="glass p-4 rounded-2xl flex items-center gap-4 border border-white/5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${q.mag > 5 ? 'bg-red-500 text-white' : 'bg-yellow-500/20 text-yellow-500'}`}>
              {q.mag}
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold">{q.loc}</div>
              <div className="text-[8px] text-zinc-500 uppercase">{q.time}</div>
            </div>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
});

// 6. Flight Tracker
export const FlightTracker = memo(() => {
  const [flights, setFlights] = useState([
    { id: 'GA402', from: 'CGK', to: 'DPS', alt: 32000, speed: 840 },
    { id: 'SQ12', from: 'SIN', to: 'NRT', alt: 36000, speed: 910 },
    { id: 'EK448', from: 'DXB', to: 'AKL', alt: 34000, speed: 880 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlights(prev => prev.map(f => ({
        ...f,
        alt: f.alt + Math.floor((Math.random() - 0.5) * 100),
        speed: f.speed + Math.floor((Math.random() - 0.5) * 10)
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-cyan-400">
        <Plane className="w-4 h-4" />
        <h3 className="text-xs font-bold uppercase tracking-widest">Air Traffic Control</h3>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {flights.map(f => (
          <div key={f.id} className="glass p-4 rounded-2xl border border-white/5 space-y-3">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold text-cyan-400">{f.id}</div>
              <div className="text-[10px] font-mono text-zinc-500">{f.from} → {f.to}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-[8px] text-zinc-500 uppercase mb-1">Altitude</div>
                <div className="text-xs font-mono">{f.alt.toLocaleString()} FT</div>
              </div>
              <div className="text-center">
                <div className="text-[8px] text-zinc-500 uppercase mb-1">Speed</div>
                <div className="text-xs font-mono">{f.speed} KM/H</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

// 7. Population Clock
export const PopulationClock = memo(() => {
  const [pop, setPop] = useState(8123456789);

  useEffect(() => {
    const interval = setInterval(() => {
      setPop(prev => prev + Math.floor(Math.random() * 3));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-8 space-y-4">
      <Users className="w-12 h-12 text-emerald-500 mx-auto" />
      <div className="space-y-1">
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">World Population</h3>
        <div className="text-3xl font-mono font-bold text-white tabular-nums">
          {pop.toLocaleString()}
        </div>
      </div>
      <p className="text-[8px] text-zinc-600 uppercase tracking-widest">Real-time estimate based on global growth rates</p>
    </div>
  );
});

// 8. Gas Fee Tracker
export const GasFeeTracker = memo(() => {
  const [gas, setGas] = useState({ low: 12, med: 18, high: 25 });

  useEffect(() => {
    const interval = setInterval(() => {
      setGas({
        low: Math.floor(Math.random() * 10 + 5),
        med: Math.floor(Math.random() * 15 + 15),
        high: Math.floor(Math.random() * 20 + 30)
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-yellow-500">
        <Zap className="w-4 h-4" />
        <h3 className="text-xs font-bold uppercase tracking-widest">Ethereum Gas Fees</h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Low', val: gas.low, color: 'text-emerald-400' },
          { label: 'Standard', val: gas.med, color: 'text-yellow-400' },
          { label: 'Fast', val: gas.high, color: 'text-red-400' },
        ].map(g => (
          <div key={g.label} className="glass p-3 rounded-xl text-center border border-white/5">
            <div className="text-[8px] text-zinc-500 uppercase mb-1">{g.label}</div>
            <div className={`text-sm font-mono font-bold ${g.color}`}>{g.val}</div>
            <div className="text-[6px] text-zinc-600 uppercase">Gwei</div>
          </div>
        ))}
      </div>
    </div>
  );
});

// 9. Weather Radar
export const WeatherRadar = memo(() => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-blue-400">
        <Radar className="w-4 h-4" />
        <h3 className="text-xs font-bold uppercase tracking-widest">Live Weather Radar</h3>
      </div>
      <div className="aspect-square glass rounded-3xl border border-white/5 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute w-full h-full border-t border-blue-500/30 origin-center"
        />
        <div className="relative z-10 text-center space-y-2">
          <div className="text-[10px] font-bold text-blue-400 uppercase">Scanning Region...</div>
          <div className="text-[8px] text-zinc-600 font-mono">LAT: -6.2088 | LON: 106.8456</div>
        </div>
      </div>
    </div>
  );
});

// 10. News Ticker
export const NewsTicker = memo(() => {
  const [news, setNews] = useState([
    "Global markets open with record highs in tech sector.",
    "New AI breakthrough announced in quantum computing.",
    "SpaceX successfully launches 100th Starlink mission.",
    "Cybersecurity alert: New zero-day vulnerability found.",
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-red-400">
        <Newspaper className="w-4 h-4" />
        <h3 className="text-xs font-bold uppercase tracking-widest">Global News Ticker</h3>
      </div>
      <div className="glass p-4 rounded-2xl border border-white/5 overflow-hidden">
        <motion.div 
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="whitespace-nowrap text-xs font-medium text-zinc-300"
        >
          {news.join(" • ")}
        </motion.div>
      </div>
      <div className="space-y-2">
        {news.map((n, i) => (
          <div key={i} className="text-[10px] text-zinc-500 border-l-2 border-red-500/30 pl-3 py-1">
            {n}
          </div>
        ))}
      </div>
    </div>
  );
});
