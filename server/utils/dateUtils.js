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
    // Split "13-17 Dec" into ["13-17", "Dec"]
    const [dates, month] = dateRange.trim().split(' ');
    const [startDay, endDay] = dates.split('-').map(d => d.trim());
    
    const currentYear = getCurrentYear();
    let startDate = parseDate(startDay, month, currentYear);
    let endDate = parseDate(endDay, month, currentYear);
    
    // Handle month transition (e.g., "30-1 Jan")
    if (startDate && endDate && startDate.isAfter(endDate)) {
      // If start date is after end date, the start date should be in previous month
      startDate = parseDate(startDay, month, currentYear);
      endDate = parseDate(endDay, month, currentYear);
      
      if (endDate.month() === 0) { // January
        startDate = startDate.month(11).year(currentYear - 1); // December of previous year
      } else {
        endDate = endDate.month(startDate.month() + 1);
      }
    }
    
    return { startDate, endDate };
  } catch (error) {
    console.error('Error parsing date range:', error);
    return { startDate: null, endDate: null };
  }
};

export const getIpoStatus = (startDate, endDate) => {
  if (!startDate || !endDate) return 'closed';
  
  // Get current time in IST
  const now = dayjs().tz('Asia/Kolkata');
  const currentTime = now.hour() * 100 + now.minute(); // 1630 for 4:30 PM
  
  if (now.isBefore(startDate)) {
    return 'upcoming';
  } else if (now.isAfter(endDate)) {
    return 'closed';
  } else if (now.isBetween(startDate, endDate, 'day', '[]')) {
    // On the last day, check if it's before 4 PM
    if (now.isSame(endDate, 'day')) {
      return currentTime < 1600 ? 'live' : 'closed';
    }
    return 'live';
  }
  
  return 'closed';
};