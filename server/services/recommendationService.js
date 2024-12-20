export const getRecommendation = ({ gmp, gain, type }) => {
  const isSME = type?.toLowerCase().includes('sme');
  
  // SME IPOs need higher gains to recommend
  if (isSME) {
    return gain >= 75 ? 'subscribe' : 'avoid';
  }
  
  // Regular IPOs
  return gain >= 35 ? 'subscribe' : 'avoid';
};