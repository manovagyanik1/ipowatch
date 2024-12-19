// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  ENDPOINTS: {
    IPOS: '/ipos',
    HEALTH: '/health'
  },
  REFRESH_INTERVAL: 5 * 60 * 1000 // 5 minutes
};