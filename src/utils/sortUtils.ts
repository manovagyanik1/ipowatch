import { IPO } from '../types/ipo';

export const getStatusSortValue = (status: string): number => {
  switch (status.toLowerCase()) {
    case 'live':
    case 'open': return 3;
    case 'upcoming': return 2;
    case 'closed': return 1;
    default: return 0;
  }
};

export const getRecommendationSortValue = (recommendation: string): number => {
  switch (recommendation.toLowerCase()) {
    case 'subscribe': return 3;
    case 'neutral': return 2;
    case 'avoid': return 1;
    default: return 0;
  }
};