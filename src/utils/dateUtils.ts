export const isDateInRange = (dateRange: string): boolean => {
  if (!dateRange) return false;

  // Split the date range and clean up whitespace
  const [startStr, endStr] = dateRange.split('-').map(d => d.trim());
  if (!startStr || !endStr) return false;

  const parseDate = (dateStr: string): Date | null => {
    // Handle date format: "19 Dec 2023"
    const parts = dateStr.split(' ');
    if (parts.length !== 3) return null;

    const [day, monthStr, year] = parts;
    const months: Record<string, number> = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };

    const monthIndex = months[monthStr];
    if (monthIndex === undefined) return null;

    // Create date with time set to start of day for start date
    // and end of day for end date
    const date = new Date(parseInt(year), monthIndex, parseInt(day));
    return date;
  };

  const startDate = parseDate(startStr);
  const endDate = parseDate(endStr);
  
  if (!startDate || !endDate) return false;

  // Set time to start of day for start date
  startDate.setHours(0, 0, 0, 0);
  
  // Set time to end of day for end date
  endDate.setHours(23, 59, 59, 999);

  const now = new Date();
  return now >= startDate && now <= endDate;
};