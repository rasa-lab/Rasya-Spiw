import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Play, Trash2, Copy, Check, Terminal, Layout as LayoutIcon } from 'lucide-react';

const CodePreview: React.FC = () => {
  const [code, setCode] = useState<string>(`<!DOCTYPE html>
<html>
<head>
<style>
  body { 
    background: #0a0a0a; 
    color: #00ff00; 
    font-family: sans-serif; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    height: 100vh; 
    margin: 0;
  }
  h1 { border: 1px solid #00ff00; padding: 20px; }
</style>
</head>
<body>
  <h1>HELLO NANO SUITE</h1>
  <script>
    console.log("Nano Preview Active");
  </script>
</body>
</html>`);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleRun = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setCode('');
    setPreviewUrl('');
  };

  useEffect(() => {
    handleRun();
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, []);

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <Code className="w-8 h-8 text-emerald-500" />
            CODE PREVIEWER
          </h1>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Execute HTML/CSS/JS Sandbox</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleClear}
            className="p-3 rounded-xl bg-zinc-900 text-zinc-400 hover:text-red-400 transition-all border border-white/5"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button 
            onClick={handleCopy}
            className="p-3 rounded-xl bg-zinc-900 text-zinc-400 hover:text-emerald-400 transition-all border border-white/5"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
          <button 
            onClick={handleRun}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
          >
            <Play className="w-4 h-4 fill-current" /> Run Code
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-250px)]">
        {/* Editor */}
        <div className="glass rounded-3xl border border-white/5 flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-bottom border-white/5 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Source Editor</span>
            </div>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="flex-1 w-full bg-zinc-950 p-6 font-mono text-sm text-zinc-300 focus:outline-none resize-none no-scrollbar"
            placeholder="Paste your HTML code here..."
          />
        </div>

        {/* Preview */}
        <div className="glass rounded-3xl border border-white/5 flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-bottom border-white/5 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutIcon className="w-4 h-4 text-blue-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Live Preview</span>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-orange-500/50" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
            </div>
          </div>
          <div className="flex-1 bg-white">
            <iframe
              ref={iframeRef}
              src={previewUrl}
              title="Preview"
              className="w-full h-full border-none"
              sandbox="allow-scripts allow-modals"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePreview;
