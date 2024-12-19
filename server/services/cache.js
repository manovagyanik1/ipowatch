import NodeCache from 'node-cache';

// Create cache instance with 1 hour TTL
const cache = new NodeCache({ stdTTL: 3600 });

export const cacheKey = 'ipo_data';

export const getCachedData = () => {
  return cache.get(cacheKey);
};

export const setCachedData = (data) => {
  return cache.set(cacheKey, data);
};