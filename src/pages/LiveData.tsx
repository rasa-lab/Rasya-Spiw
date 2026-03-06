import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CloudRain, 
  Moon, 
  Telescope, 
  Newspaper, 
  Smartphone, 
  RefreshCw,
  MapPin,
  Clock,
  Compass,
  Star,
  Globe,
  Calendar as CalendarIcon,
  ChevronRight,
  ChevronLeft,
  Search,
  Cpu,
  Battery,
  HardDrive,
  Activity
} from 'lucide-react';
import axios from 'axios';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

const LiveData: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [prayer, setPrayer] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const [device, setDevice] = useState<any>(null);
  const [nasa, setNasa] = useState<any>(null);
  const [ipInfo, setIpInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastFetch, setLastFetch] = useState<number>(0);
  
  const [city, setCity] = useState('Jakarta');
  const [coords, setCoords] = useState({ lat: -6.2088, lon: 106.8456 });
  const [showCitySearch, setShowCitySearch] = useState(false);

  const cities = [
    { name: 'Jakarta', lat: -6.2088, lon: 106.8456, country: 'Indonesia' },
    { name: 'Tegal', lat: -6.8676, lon: 109.1371, country: 'Indonesia' },
    { name: 'Semarang', lat: -6.9667, lon: 110.4167, country: 'Indonesia' },
    { name: 'Kuala Lumpur', lat: 3.1390, lon: 101.6869, country: 'Malaysia' },
    { name: 'Singapore', lat: 1.3521, lon: 103.8198, country: 'Singapore' },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503, country: 'Japan' },
    { name: 'Cairo', lat: 30.0444, lon: 31.2357, country: 'Egypt' },
    { name: 'London', lat: 51.5074, lon: -0.1278, country: 'UK' },
    { name: 'New York', lat: 40.7128, lon: -74.0060, country: 'USA' },
    { name: 'Toronto', lat: 43.6532, lon: -79.3832, country: 'Canada' },
    { name: 'Mecca', lat: 21.3891, lon: 39.8579, country: 'Saudi Arabia' },
    { name: 'Sydney', lat: -33.8688, lon: 151.2093, country: 'Australia' },
  ];

  const fetchData = async (force = false) => {
    const now = Date.now();
    if (!force && lastFetch && now - lastFetch < 5 * 60 * 1000) return;

    setLoading(true);
    try {
      const wRes = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`);
      setWeather(wRes.data.current_weather);

      const pRes = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Indonesia&method=2`);
      setPrayer(pRes.data.data.timings);

      const nRes = await axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
      setNasa(nRes.data);

      const ipRes = await axios.get('https://ipapi.co/json/');
      setIpInfo(ipRes.data);

      setLastFetch(now);
      setDevice({
        platform: navigator.platform,
        userAgent: navigator.userAgent.split(') ')[0] + ')',
        language: navigator.language,
        cores: navigator.hardwareConcurrency,
        memory: (navigator as any).deviceMemory || 'Unknown',
        screen: `${window.screen.width}x${window.screen.height}`,
      });

      setNews([
        { title: "Indonesia's Digital Economy Booming", source: "TechNews", time: "2h ago" },
        { title: "New Space Discovery by NASA", source: "ScienceDaily", time: "5h ago" },
        { title: "Global Market Trends 2026", source: "FinanceHub", time: "8h ago" },
      ]);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(true);
  }, [city, coords]);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif font-bold">Live Data</h1>
        <button onClick={() => fetchData(true)} className={`p-2 rounded-full glass ${loading ? 'animate-spin' : ''}`}>
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Weather Card */}
      <section className="glass p-6 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <CloudRain className="w-24 h-24" />
        </div>
        <button 
          onClick={() => setShowCitySearch(!showCitySearch)}
          className="flex items-center gap-2 text-blue-400 mb-4 hover:bg-white/5 p-1 rounded-lg transition-colors"
        >
          <MapPin className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">{city}, {ipInfo?.country_name || 'Indonesia'}</span>
          <ChevronRight className="w-3 h-3" />
        </button>

        <AnimatePresence>
          {showCitySearch && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-4 grid grid-cols-2 gap-2"
            >
              {cities.map(c => (
                <button 
                  key={c.name}
                  onClick={() => {
                    setCity(c.name);
                    setCoords({ lat: c.lat, lon: c.lon });
                    setShowCitySearch(false);
                  }}
                  className={`p-2 rounded-xl text-[10px] font-bold uppercase border ${city === c.name ? 'bg-blue-500 border-blue-400 text-white' : 'bg-zinc-950 border-white/5 text-zinc-500'}`}
                >
                  {c.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-end gap-4">
          <div className="text-5xl font-mono font-bold">{weather?.temperature || '--'}°</div>
          <div className="mb-2 text-zinc-500 font-medium">Cloudy</div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <Compass className="w-3 h-3" /> Wind: {weather?.windspeed} km/h
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3" /> Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="glass p-6 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-emerald-400">
            <CalendarIcon className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Calendar</h2>
          </div>
          <div className="text-[10px] font-mono text-zinc-500 uppercase">
            {format(new Date(), 'MMMM yyyy')}
          </div>
        </div>
        <CalendarView />
        <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Hijriah</div>
          <div className="text-xs font-mono text-emerald-400">13 Ramadan 1447</div>
        </div>
      </section>

      {/* Prayer Times */}
      <section className="glass p-6 rounded-3xl">
        <div className="flex items-center gap-2 text-emerald-400 mb-6">
          <Moon className="w-4 h-4" />
          <h2 className="text-sm font-bold uppercase tracking-widest">Prayer Times</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {prayer && Object.entries(prayer).slice(0, 6).map(([name, time]: any) => (
            <div key={name} className="bg-zinc-950/50 p-3 rounded-2xl border border-white/5 text-center">
              <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">{name}</div>
              <div className="text-sm font-mono font-bold text-emerald-400">{time}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Astronomy (NASA) */}
      <section className="glass p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-2 text-purple-400">
          <Telescope className="w-4 h-4" />
          <h2 className="text-sm font-bold uppercase tracking-widest">Astronomy Today</h2>
        </div>
        {nasa && (
          <div className="space-y-3">
            <img src={nasa.url} alt="NASA APOD" className="w-full h-40 object-cover rounded-2xl border border-white/10" referrerPolicy="no-referrer" />
            <h3 className="text-sm font-bold">{nasa.title}</h3>
            <p className="text-[10px] text-zinc-500 line-clamp-2">{nasa.explanation}</p>
          </div>
        )}
      </section>

      {/* Network Identity Card */}
      <section className="glass p-6 rounded-3xl">
        <div className="flex items-center gap-2 text-cyan-400 mb-4">
          <Globe className="w-4 h-4" />
          <h2 className="text-sm font-bold uppercase tracking-widest">Network Identity</h2>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-zinc-500">IP Address</span>
            <span className="text-sm font-mono font-bold text-emerald-400">{ipInfo?.ip || 'Detecting...'}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-zinc-950/50 p-3 rounded-xl border border-white/5">
              <div className="text-[10px] text-zinc-500 uppercase mb-1">City</div>
              <div className="text-xs font-bold">{ipInfo?.city || '--'}</div>
            </div>
            <div className="bg-zinc-950/50 p-3 rounded-xl border border-white/5">
              <div className="text-[10px] text-zinc-500 uppercase mb-1">ISP</div>
              <div className="text-xs font-bold truncate">{ipInfo?.org || '--'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Info */}
      <section className="glass p-6 rounded-3xl">
        <div className="flex items-center gap-2 text-orange-400 mb-4">
          <Smartphone className="w-4 h-4" />
          <h2 className="text-sm font-bold uppercase tracking-widest">Device Status</h2>
        </div>
        <div className="space-y-2">
          {device && Object.entries(device).map(([key, val]: any) => (
            <div key={key} className="flex justify-between text-xs py-1 border-b border-white/5">
              <span className="text-zinc-500 capitalize">{key}</span>
              <span className="font-mono text-zinc-300 truncate max-w-[150px]">{val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* System Performance */}
      <section className="glass p-6 rounded-3xl space-y-6">
        <div className="flex items-center gap-2 text-emerald-400">
          <Activity className="w-4 h-4" />
          <h2 className="text-sm font-bold uppercase tracking-widest">System Performance</h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <div className="flex items-center gap-1"><Cpu className="w-3 h-3" /> CPU Usage</div>
              <span className="text-emerald-400">24%</span>
            </div>
            <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '24%' }} className="h-full bg-emerald-500" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <div className="flex items-center gap-1"><HardDrive className="w-3 h-3" /> RAM Usage</div>
              <span className="text-blue-400">4.2 / 8 GB</span>
            </div>
            <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '52%' }} className="h-full bg-blue-500" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <div className="flex items-center gap-1"><Battery className="w-3 h-3" /> Battery</div>
              <span className="text-yellow-400">85%</span>
            </div>
            <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-yellow-500" />
            </div>
          </div>
        </div>
      </section>

      {/* News Feed */}
      <section className="glass p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-2 text-red-400">
          <Newspaper className="w-4 h-4" />
          <h2 className="text-sm font-bold uppercase tracking-widest">Top Stories</h2>
        </div>
        <div className="space-y-3">
          {news.map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <h3 className="text-sm font-medium group-hover:text-emerald-400 transition-colors">{item.title}</h3>
              <div className="flex gap-2 text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">
                <span>{item.source}</span>
                <span>•</span>
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const CalendarView = () => {
  const today = new Date();
  const start = startOfMonth(today);
  const end = endOfMonth(today);
  const days = eachDayOfInterval({ start, end });
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(d => <div key={d} className="text-[10px] text-center font-bold text-zinc-600">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array(start.getDay()).fill(0).map((_, i) => <div key={`empty-${i}`} />)}
        {days.map(day => (
          <div 
            key={day.toString()}
            className={`aspect-square flex items-center justify-center text-[10px] rounded-lg transition-all ${
              isSameDay(day, today) 
                ? 'bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20' 
                : 'text-zinc-400 hover:bg-white/5'
            }`}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveData;

