export const parseDate = (dateStr) => {
  if (!dateStr) return null;
  
  // Handle Indian date format (DD MMM YYYY)
  const [day, month, year] = dateStr.trim().split(' ');
  
  const months = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };
  
  const monthIndex = months[month];
  if (monthIndex === undefined) return null;
  
  return new Date(parseInt(year), monthIndex, parseInt(day));
};

export const parseDateRange = (dateRange) => {
  if (!dateRange) return { startDate: null, endDate: null };
  
  try {
    const [start, end] = dateRange.split('-').map(d => parseDate(d.trim()));
    return { startDate: start, endDate: end };
  } catch (error) {
    console.error('Error parsing date range:', error);
    return { startDate: null, endDate: null };
  }
};