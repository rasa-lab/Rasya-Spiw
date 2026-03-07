import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  File, 
  Folder, 
  Upload, 
  Download, 
  Trash2, 
  Plus, 
  Search, 
  MoreVertical,
  HardDrive,
  FileText,
  Image as ImageIcon,
  FileCode,
  Shield,
  Clock
} from 'lucide-react';

interface NanoFile {
  id: string;
  name: string;
  size: string;
  type: string;
  date: string;
  content: string;
}

const FileManager: React.FC = () => {
  const [files, setFiles] = useState<NanoFile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const savedFiles = localStorage.getItem('nano_files');
    if (savedFiles) {
      try {
        setFiles(JSON.parse(savedFiles));
      } catch (e) {
        setFiles([]);
      }
    }
  }, []);

  const saveFiles = (newFiles: NanoFile[]) => {
    setFiles(newFiles);
    localStorage.setItem('nano_files', JSON.stringify(newFiles));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const newFile: NanoFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        type: file.type || 'application/octet-stream',
        date: new Date().toLocaleDateString(),
        content: event.target?.result as string
      };
      saveFiles([newFile, ...files]);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const deleteFile = (id: string) => {
    saveFiles(files.filter(f => f.id !== id));
  };

  const downloadFile = (file: NanoFile) => {
    const link = document.createElement('a');
    link.href = file.content;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <ImageIcon className="w-5 h-5 text-purple-400" />;
    if (type.includes('text')) return <FileText className="w-5 h-5 text-blue-400" />;
    if (type.includes('javascript') || type.includes('html') || type.includes('css')) return <FileCode className="w-5 h-5 text-emerald-400" />;
    return <File className="w-5 h-5 text-zinc-400" />;
  };

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <HardDrive className="w-8 h-8 text-blue-500" />
            FILE MANAGER
          </h1>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Secure Encrypted Storage [CZ-9]</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files..."
              className="bg-zinc-900 border border-white/5 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-blue-500/50 w-64"
            />
          </div>
          <label className="flex items-center gap-2 px-6 py-2.5 bg-blue-500 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-400 transition-all cursor-pointer shadow-lg shadow-blue-500/20">
            <Upload className="w-3 h-3" /> Upload
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Stats */}
        <div className="md:col-span-1 space-y-4">
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <span>Storage Used</span>
                <span className="text-blue-400">{(files.length * 0.5).toFixed(1)} MB / 50 MB</span>
              </div>
              <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500" 
                  style={{ width: `${(files.length / 100) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Shield className="w-3 h-3 text-emerald-500" /> Security Protocols
              </h3>
              <div className="space-y-2">
                {['AES-256 Encryption', 'Zero-Knowledge', 'Auto-Wipe (OFF)'].map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/50 border border-white/5">
                    <span className="text-[9px] text-zinc-500 font-bold">{s}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* File List */}
        <div className="md:col-span-3">
          <div className="glass rounded-3xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Size</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence>
                    {filteredFiles.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-zinc-600 text-xs italic">
                          No files found in storage.
                        </td>
                      </tr>
                    ) : (
                      filteredFiles.map((file) => (
                        <motion.tr 
                          key={file.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="group hover:bg-white/5 transition-all"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {getFileIcon(file.type)}
                              <span className="text-sm font-medium text-zinc-200">{file.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs text-zinc-500 font-mono">{file.size}</td>
                          <td className="px-6 py-4 text-xs text-zinc-500 font-mono">{file.date}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => downloadFile(file)}
                                className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-blue-400 transition-all border border-white/5"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => deleteFile(file.id)}
                                className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-red-400 transition-all border border-white/5"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileManager;
