import { IPO } from '../types/ipo';
import { isDateInRange } from './dateUtils';
import { getRecommendation } from './ipoUtils';

export const getIpoSortValue = (ipo: IPO): number => {
  const isOpen = isDateInRange(ipo.subscriptionDates);
  const recommendation = getRecommendation(ipo.listingGains, ipo.type);
  
  // Sorting priority (higher number = higher priority):
  // 4: Open & Subscribe
  // 3: Open & Other
  // 2: Not Open & Subscribe
  // 1: Not Open & Other
  
  if (isOpen) {
    return recommendation === 'subscribe' ? 4 : 3;
  }
  return recommendation === 'subscribe' ? 2 : 1;
};