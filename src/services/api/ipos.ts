import { IPO } from '../../types/ipo';
import { API_CONFIG } from '../../config/constants';
import { fetchFromAPI } from './client';

export async function fetchIpos(): Promise<IPO[]> {
  return fetchFromAPI<IPO[]>(API_CONFIG.ENDPOINTS.IPOS);
}