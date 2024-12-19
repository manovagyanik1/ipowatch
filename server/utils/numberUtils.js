export const extractNumber = (str) => {
  if (!str) return null;
  const matches = str.match(/[-]?\d+/);
  return matches ? parseInt(matches[0], 10) : null;
};

export const calculatePercentage = (value, total) => {
  if (!value || !total) return null;
  return ((value / total) * 100).toFixed(1);
};