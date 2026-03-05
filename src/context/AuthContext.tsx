import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  fullName: string;
  username: string;
  isLoggedIn: boolean;
  role: 'user' | 'admin' | 'owner';
  ip?: string;
  device?: string;
  bssid?: string;
  ssid?: string;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password?: string) => Promise<boolean>;
  register: (fullName: string, username: string, password?: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getCyberData = async () => {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return {
      ip: data.ip,
      device: navigator.platform + ' (' + navigator.userAgent.split(')')[0].split('(')[1] + ')',
      bssid: '00:1A:2B:3C:4D:5E', // Simulated
      ssid: 'NANO_SECURE_WIFI', // Simulated
      lastLogin: new Date().toISOString()
    };
  } catch (e) {
    return {
      ip: '127.0.0.1',
      device: navigator.platform,
      bssid: 'Unknown',
      ssid: 'Unknown',
      lastLogin: new Date().toISOString()
    };
  }
};

const addCyberLog = (user: string, action: string) => {
  const logs = JSON.parse(localStorage.getItem('nano_cyber_logs') || '[]');
  logs.unshift({
    time: new Date().toLocaleTimeString(),
    user,
    action,
    id: Date.now()
  });
  localStorage.setItem('nano_cyber_logs', JSON.stringify(logs.slice(0, 50)));
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('nano_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username: string, password?: string): Promise<boolean> => {
    const cyber = await getCyberData();
    
    // Owner Check
    if (username === 'Rasya_444_111' && password === 'RASYA_111_512') {
      const ownerUser: User = { 
        fullName: 'Rasya', 
        username, 
        isLoggedIn: true, 
        role: 'owner',
        ...cyber
      };
      setUser(ownerUser);
      localStorage.setItem('nano_user', JSON.stringify(ownerUser));
      addCyberLog(username, 'Logged in as Owner');
      return true;
    }

    // Normal User Check from LocalStorage
    const users = JSON.parse(localStorage.getItem('nano_registered_users') || '[]');
    const foundUser = users.find((u: any) => 
      (u.username === username || u.fullName === username) && u.password === password
    );
    
    if (foundUser) {
      const loggedUser: User = { 
        fullName: foundUser.fullName, 
        username: foundUser.username, 
        isLoggedIn: true, 
        role: foundUser.role || 'user',
        ...cyber
      };
      setUser(loggedUser);
      localStorage.setItem('nano_user', JSON.stringify(loggedUser));
      addCyberLog(username, 'User Login');
      return true;
    }

    return false;
  };

  const register = async (fullName: string, username: string, password?: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('nano_registered_users') || '[]');
    if (users.find((u: any) => u.username === username)) return false;

    const newUser = { fullName, username, password, role: 'user' };
    users.push(newUser);
    localStorage.setItem('nano_registered_users', JSON.stringify(users));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nano_user');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem('nano_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
