export const getRecommendation = ({ gmp, gain, type }) => {
  // Don't recommend if no GMP data available
  if (!gmp || gmp === '-') return 'neutral';
  
  // Don't recommend NSE SME IPOs by default
  if (type?.toLowerCase().includes('sme')) return 'avoid';
  
  // Strong buy signals
  if (gain >= 50) return 'subscribe';
  if (gain >= 25 && gmp > 100) return 'subscribe';
  
  // Neutral signals
  if (gain >= 15) return 'neutral';
  
  // Weak signals
  return 'avoid';
};