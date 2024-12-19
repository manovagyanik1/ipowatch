import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

export const isDateInRange = (dateRange: string): boolean => {
  if (!dateRange) return false;

  try {
    // Parse date range like "13-17 Dec 2023"
    const [dates, month, year] = dateRange.trim().split(' ');
    const [startDay, endDay] = dates.split('-').map(d => d.trim());

    const startDate = dayjs(`${startDay} ${month} ${year}`, 'D MMM YYYY');
    const endDate = dayjs(`${endDay} ${month} ${year}`, 'D MMM YYYY').endOf('day');
    
    if (!startDate.isValid() || !endDate.isValid()) return false;

    const now = dayjs();
    return now.isBetween(startDate, endDate, 'day', '[]'); // [] means inclusive
  } catch (error) {
    console.error('Error parsing date range:', error);
    return false;
  }
};