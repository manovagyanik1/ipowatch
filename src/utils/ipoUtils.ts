import { IPO } from '../types/ipo';

export const getRecommendation = (gains: string, type: string): 'subscribe' | 'avoid' | 'neutral' => {
  const gainsValue = parseFloat(gains.replace('%', ''));
  
  if (isNaN(gainsValue)) return 'neutral';
  
  if (type.toLowerCase() === 'mainboard') {
    return gainsValue >= 30 ? 'subscribe' : 'avoid';
  }
  
  return gainsValue >= 70 ? 'subscribe' : 'avoid';
};