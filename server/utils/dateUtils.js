import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import isBetween from 'dayjs/plugin/isBetween.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);

const getCurrentYear = () => dayjs().year();

export const parseDate = (dateStr, month, year = getCurrentYear()) => {
  if (!dateStr) return null;
  
  // Convert date string like "13" and month like "Dec" to a full date
  const date = dayjs(`${dateStr} ${month} ${year}`, 'D MMM YYYY');
  return date.isValid() ? date : null;
};

export const parseDateRange = (dateRange) => {
  if (!dateRange) return { startDate: null, endDate: null };
  
  try {
    // Handle date formats like "18-20 Dec"
    const match = dateRange.trim().match(/(\d+)-(\d+)\s+([A-Za-z]+)/);
    if (!match) {
      console.log('Failed to parse date range:', dateRange);
      return { startDate: null, endDate: null };
    }
    
    const [_, startDay, endDay, month] = match;
    
    const currentYear = getCurrentYear();
    let startDate = parseDate(startDay, month, currentYear);
    let endDate = parseDate(endDay, month, currentYear);
    
    
    // Handle month transition (e.g., "30-1 Jan")
    if (startDate && endDate && startDate.isAfter(endDate)) {
      if (endDate.month() === 0) { // January
        startDate = startDate.month(11).year(currentYear - 1); // December of previous year
      } else {
        endDate = endDate.month(startDate.month() + 1);
      }
    }
    
    // Set the time to end of day for endDate (4:00 PM IST)
    endDate = endDate.hour(16).minute(0).second(0);
    
    return { startDate, endDate };
  } catch (error) {
    console.error('Error parsing date range:', dateRange, error);
    return { startDate: null, endDate: null };
  }
};

export const getIpoStatus = (startDate, endDate) => {
  if (!startDate || !endDate) return 'closed';
  
  // Get current time in IST
  const now = dayjs().tz('Asia/Kolkata');
  const currentHour = now.hour();
  const currentMinute = now.minute();
  
  if (now.isBefore(startDate)) {
    return 'upcoming';
  } else if (now.isAfter(endDate) || 
             (now.isSame(endDate, 'day') && (currentHour > 16 || (currentHour === 16 && currentMinute > 0)))) {
    return 'closed';
  } else if (now.isBetween(startDate, endDate, 'day', '[]')) {
    return 'live';
  }
  
  return 'closed';
};