// API configuration
export const API_URL = 'http://localhost:3000/api';

// Common headers
export const getHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});