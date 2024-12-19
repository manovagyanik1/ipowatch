import { extractNumber } from '../utils/numberUtils.js';
import { parseDateRange } from '../utils/dateUtils.js';
import { getRecommendation } from './recommendationService.js';
import { extractHeaderIndices } from '../utils/tableUtils.js';

export const parseTableRows = ($, rows) => {
  if (rows.length < 2) return []; // Need at least header and one data row

  const headerRow = rows.first();
  const headers = extractHeaderIndices($, headerRow);
  const ipos = [];

  // Skip the header row (index 0) and process data rows
  rows.slice(1).each((i, row) => {
    const ipoData = parseTableData($, row, headers);
    if (ipoData) {
      ipos.push(ipoData);
    }
  });

  return ipos;
};

const parseTableData = ($, row, headers) => {
  const columns = $(row).find('td');
  if (columns.length < Object.keys(headers).length) return null;

  const companyName = $(columns[headers.COMPANY]).text().trim();
  if (!companyName) return null;

  const rawData = {
    companyName,
    gmp: $(columns[headers.GMP]).text().trim(),
    price: $(columns[headers.PRICE]).text().trim(),
    gain: $(columns[headers.GAIN]).text().trim(),
    date: $(columns[headers.DATE]).text().trim(),
    kostak: $(columns[headers.KOSTAK]).text().trim(),
    subject: $(columns[headers.SUBJECT]).text().trim(),
    type: $(columns[headers.TYPE]).text().trim()
  };

  return processIpoData(rawData);
};

const processIpoData = (rawData) => {
  const {
    companyName,
    gmp,
    price,
    gain,
    date,
    subject,
    type
  } = rawData;

  const gmpValue = extractNumber(gmp);
  const priceValue = extractNumber(price);
  const gainValue = extractNumber(gain.replace('%', ''));
  const dates = parseDateRange(date);
  
  const recommendation = getRecommendation({
    gmp: gmpValue,
    gain: gainValue,
    type
  });

  return {
    companyName,
    price: price || 'N/A',
    issueSize: subject || 'N/A',
    gmp: gmp || 'N/A',
    listingGains: `${gain || '-'}`,
    subscriptionDates: date,
    status: dates.startDate ? 'upcoming' : 'closed',
    recommendation,
    type
  };
};