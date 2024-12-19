const isProd = import.meta.env.PROD;

export const API_CONFIG = {
  BASE_URL: isProd 
    ? '/api'
    : 'http://localhost:3000/api',
  ENDPOINTS: {
    IPOS: '/ipos',
    HEALTH: '/health'
  },
  REFRESH_INTERVAL: 5 * 60 * 1000 // 5 minutes
};