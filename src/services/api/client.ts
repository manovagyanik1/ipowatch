import { API_CONFIG } from '../../config/constants';
import { APIError, NetworkError, isNetworkError } from '../../utils/errors';

interface APIResponse<T> {
  data?: T;
  error?: string;
}

async function checkServerHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HEALTH}`);
    return response.ok;
  } catch {
    return false;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new APIError(
      errorData.error || `HTTP Error ${response.status}`,
      response.status
    );
  }
  
  return response.json();
}

export async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new APIError(errorData.error || 'Failed to fetch data', response.status);
  }

  return response.json();
}