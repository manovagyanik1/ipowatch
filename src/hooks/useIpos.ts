import { useState, useEffect, useCallback } from 'react';
import { IPO } from '../types/ipo';
import { fetchIpos } from '../services/api/ipos';
import { APIError, NetworkError } from '../utils/errors';
import { API_CONFIG } from '../config/constants';

export const useIpos = () => {
  const [ipos, setIpos] = useState<IPO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const loadIpos = useCallback(async () => {
    try {
      const data = await fetchIpos();
      setIpos(data);
      setError(null);
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      let errorMessage = 'An unexpected error occurred while fetching IPO data';
      
      if (err instanceof APIError || err instanceof NetworkError) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      console.error('Error fetching IPOs:', err);
      
      // Increment retry count for network errors
      if (err instanceof NetworkError) {
        setRetryCount(prev => prev + 1);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadIpos();
    
    // Only set up polling if we haven't had too many retries
    if (retryCount < 3) {
      const intervalId = setInterval(loadIpos, API_CONFIG.REFRESH_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [loadIpos, retryCount]);

  const retryConnection = useCallback(() => {
    setLoading(true);
    setRetryCount(0); // Reset retry count on manual retry
    loadIpos();
  }, [loadIpos]);

  return { 
    ipos, 
    loading, 
    error,
    refresh: retryConnection
  };
};