/**
 * Security utilities for Nano App
 */

// Basic XSS Sanitization
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Rate Limiting Simulation (Client-side)
const requestCounts: Record<string, { count: number, lastReset: number }> = {};
const LIMIT = 10; // 10 requests
const WINDOW = 60000; // per minute

export const checkRateLimit = (key: string): boolean => {
  const now = Date.now();
  if (!requestCounts[key] || now - requestCounts[key].lastReset > WINDOW) {
    requestCounts[key] = { count: 1, lastReset: now };
    return true;
  }
  
  if (requestCounts[key].count >= LIMIT) {
    return false;
  }
  
  requestCounts[key].count++;
  return true;
};

// Basic SQLi pattern detection
export const isPotentiallyMalicious = (input: string): boolean => {
  const patterns = [
    /UNION SELECT/i,
    /OR '1'='1'/i,
    /<script/i,
    /javascript:/i,
    /onerror=/i
  ];
  return patterns.some(p => p.test(input));
};
