import { addCyberLog } from '../context/AuthContext';

export interface SecurityStatus {
  antivirus: 'SCANNING' | 'SECURE' | 'THREAT_DETECTED';
  firewall: 'ACTIVE' | 'BYPASS_ATTEMPT';
  maintenance: boolean;
  autoUpdate: boolean;
  healthPower: number; // 0-100
}

export const initSecuritySystems = () => {
  // Initialize health power
  if (!localStorage.getItem('nano_health_power')) {
    localStorage.setItem('nano_health_power', '100');
  }

  // X health-power: Auto-healing protocol
  setInterval(() => {
    const currentHealth = parseInt(localStorage.getItem('nano_health_power') || '100');
    if (currentHealth < 100) {
      const newHealth = Math.min(100, currentHealth + 5);
      localStorage.setItem('nano_health_power', String(newHealth));
      if (newHealth === 100) {
        addCyberLog('HEALTH-POWER', 'System fully restored. All modules optimal.');
      }
    }
  }, 30000);

  // X def-1: Counter-attack protocol
  // This monitors for "threats" and logs a "counter-strike"
  setInterval(() => {
    const logs = JSON.parse(localStorage.getItem('nano_cyber_logs') || '[]');
    const lastThreat = logs.find((l: any) => l.action.includes('THREAT NEUTRALIZED') || l.action.includes('SUSPICIOUS ACTIVITY'));
    
    if (lastThreat && !lastThreat.countered) {
      const attackerIp = lastThreat.ip || 'UNKNOWN_ORIGIN';
      addCyberLog('DEF-1', `COUNTER-STRIKE INITIATED against ${attackerIp}. Flooding attacker node... [SUCCESS]`);
      
      // Mark as countered in local storage (simplified)
      const updatedLogs = logs.map((l: any) => l.id === lastThreat.id ? { ...l, countered: true } : l);
      localStorage.setItem('nano_cyber_logs', JSON.stringify(updatedLogs));
    }
  }, 20000);

  // X ZERO - Antivirus
  setInterval(() => {
    const threats = ['DDoS Attempt', 'XSS Injection', 'SQL Injection', 'Brute Force'];
    if (Math.random() > 0.98) {
      const threat = threats[Math.floor(Math.random() * threats.length)];
      const fakeIp = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      addCyberLog('X-ZERO', `THREAT NEUTRALIZED: ${threat} from ${fakeIp} [SHIELD_ACTIVE]`);
      
      // Reduce health on attack
      const currentHealth = parseInt(localStorage.getItem('nano_health_power') || '100');
      localStorage.setItem('nano_health_power', String(Math.max(0, currentHealth - 10)));
    }
  }, 10000);

  // VCX-5 - Illegal Activity Scanner
  setInterval(() => {
    const activities = ['Port Scan', 'Packet Sniffing', 'Unauthorized Access'];
    if (Math.random() > 0.99) {
      const act = activities[Math.floor(Math.random() * activities.length)];
      addCyberLog('VCX-5', `SUSPICIOUS ACTIVITY DETECTED: ${act}`);
    }
  }, 15000);
};

export const checkMaintenance = () => {
  return localStorage.getItem('nano_maintenance') === 'true';
};

export const isBanned = (ip: string) => {
  const banned = JSON.parse(localStorage.getItem('nano_banned_ips') || '[]');
  return banned.includes(ip);
};
