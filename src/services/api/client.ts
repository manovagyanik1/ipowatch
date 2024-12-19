import { API_CONFIG } from '../../config/constants';
import { APIError, NetworkError, isNetworkError } from '../../utils/errors';

interface APIResponse<T> {
  data?: T;
  error?: string;
}

async function checkServerHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/health`);
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
  try {
    // Check server health first
    const isServerHealthy = await checkServerHealth();
    if (!isServerHealthy) {
      throw new NetworkError('Server is not responding. Please ensure the backend server is running by executing "npm run server"');
    }

    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`);
    return await handleResponse<T>(response);
  } catch (error) {
    if (error instanceof APIError || error instanceof NetworkError) {
      throw error;
    }
    
    if (isNetworkError(error)) {
      throw new NetworkError('Unable to connect to the server. Please ensure the backend server is running by executing "npm run server"');
    }
    
    throw new APIError('An unexpected error occurred while fetching data');
  }
}