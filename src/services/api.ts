import { IPO } from '../types/ipo';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export class APIError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'APIError';
  }
}

export const fetchIpos = async (): Promise<IPO[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ipos`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new APIError(errorData.error || 'Failed to fetch IPO data', response.status);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // Check if it's a network error (server not running)
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new APIError('Unable to connect to the server. Please ensure the backend server is running.');
    }
    
    throw new APIError('An unexpected error occurred while fetching IPO data');
  }
};