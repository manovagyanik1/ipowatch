import axios from 'axios';
import * as cheerio from 'cheerio';
import { SERVER_CONFIG } from '../config/constants.js';
import { findIpoTable } from '../utils/tableUtils.js';
import { parseTableRows } from './tableParser.js';
import { getCachedData, setCachedData, cacheKey } from './cache.js';
import axiosRetry from 'axios-retry';

// Configure axios with retries
const client = axios.create({
  timeout: 60000 // 60 seconds timeout
});

axiosRetry(client, { 
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNABORTED';
  }
});

export const scrapeIpoData = async () => {
  // Check cache first
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const { data } = await client.get(SERVER_CONFIG.IPO_URL);
    const $ = cheerio.load(data);

    const table = findIpoTable($);
    if (!table.length) {
      throw new Error('IPO table not found on the page');
    }

    const rows = table.find('tr');
    const parsedData = parseTableRows($, rows);

    // Only cache successful responses
    if (parsedData && parsedData.length > 0) {
      setCachedData(parsedData);
    }

    return parsedData;
  } catch (error) {
    console.error('Error scraping IPO data:', error);
    throw new Error(`Failed to scrape IPO data: ${error.message}`);
  }
};