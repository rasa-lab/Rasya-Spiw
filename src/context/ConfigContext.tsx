import React, { createContext, useContext, useState, useEffect } from 'react';

interface Config {
  openRouterKey: string;
  supabaseUrl: string;
  supabaseKey: string;
  firebaseConfig: string;
  appwriteEndpoint: string;
  appwriteProject: string;
  language: string;
  theme: 'dark' | 'light';
}

interface ConfigContextType {
  config: Config;
  updateConfig: (newConfig: Partial<Config>) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<Config>(() => {
    const saved = localStorage.getItem('testing_system_config');
    return saved ? JSON.parse(saved) : {
      openRouterKey: '',
      supabaseUrl: '',
      supabaseKey: '',
      firebaseConfig: '',
      appwriteEndpoint: '',
      appwriteProject: '',
      language: 'id',
      theme: 'dark',
    };
  });

  useEffect(() => {
    localStorage.setItem('testing_system_config', JSON.stringify(config));
  }, [config]);

  const updateConfig = (newConfig: Partial<Config>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error('useConfig must be used within ConfigProvider');
  return context;
};
