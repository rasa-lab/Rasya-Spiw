import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from './context/ConfigContext';
import { Layout } from './components/Layout';

// Pages (to be created)
import Dashboard from './pages/Dashboard';
import Tools from './pages/Tools';
import LiveData from './pages/LiveData';
import AIChat from './pages/AIChat';
import Special from './pages/Special';
import Others from './pages/Others';
import Settings from './pages/Settings';

export default function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/live" element={<LiveData />} />
            <Route path="/chat" element={<AIChat />} />
            <Route path="/special" element={<Special />} />
            <Route path="/others" element={<Others />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

