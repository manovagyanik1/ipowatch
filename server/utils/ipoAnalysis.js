/**
 * Analyzes IPO data and provides recommendation with detailed reasoning
 */
import { getRecommendation } from '../services/recommendationService.js';

export function analyzeIpo(ipo) {
  const gmpValue = parseInt(ipo.gmp);
  const gainValue = parseFloat(ipo.listingGains);
  const type = ipo.type?.toLowerCase() || '';
  const analysis = [];

  // Get recommendation using existing logic
  const recommendation = getRecommendation({
    gmp: gmpValue,
    gain: gainValue,
    type
  });

  // GMP Analysis
  if (gmpValue > 100) {
    analysis.push('Exceptional market interest with very high grey market premium.');
  } else if (gmpValue > 50) {
    analysis.push('Strong market interest with significant grey market premium.');
  } else if (gmpValue > 20) {
    analysis.push('Moderate market interest with decent grey market premium.');
  } else if (gmpValue > 0) {
    analysis.push('Limited market interest with low grey market premium.');
  } else if (gmpValue < 0) {
    analysis.push('Market sentiment is negative with grey market discount.');
  }

  // Type/Category Based Analysis
  if (type.includes('sme')) {
    analysis.push('SME listing carries higher risk but potential for higher returns.');
  }

  // Listing Gains Analysis
  if (gainValue > 50) {
    analysis.push('Historical listing gains are very attractive.');
  } else if (gainValue < 0) {
    analysis.push('Historical listing performance is concerning.');
  }

  return {
    recommendation,
    analysis: analysis.join(' '),
    metrics: {
      gmpValue,
      gainValue
    }
  };
}

/**
 * Gets a color scheme based on recommendation
 */
export function getRecommendationStyle(recommendation) {
  switch (recommendation?.toLowerCase()) {
    case 'subscribe':
      return {
        background: '#dcfce7',
        color: '#059669'
      };
    case 'avoid':
      return {
        background: '#fee2e2',
        color: '#dc2626'
      };
    default:
      return {
        background: '#f3f4f6',
        color: '#4b5563'
      };
  }
} 