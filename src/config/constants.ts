// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  ENDPOINTS: {
    IPOS: '/api/ipos',
    HEALTH: '/api/health'
  },
  REFRESH_INTERVAL: 5 * 60 * 1000 // 5 minutes
};