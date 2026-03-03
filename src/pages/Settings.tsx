import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { Save, Key, Globe, Database, Monitor } from 'lucide-react';
import { motion } from 'motion/react';

const Settings: React.FC = () => {
  const { config, updateConfig } = useConfig();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Already saved via useEffect in ConfigProvider
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
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
          <Monitor className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-serif font-bold">Configuration</h1>
      </div>

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
  );
};

export default Settings;
