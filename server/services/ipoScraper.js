import axios from 'axios';
import * as cheerio from 'cheerio';
import { SERVER_CONFIG } from '../config/constants.js';
import { findIpoTable } from '../utils/tableUtils.js';
import { parseTableRows } from './tableParser.js';

export const scrapeIpoData = async () => {
  try {
    const { data } = await axios.get(SERVER_CONFIG.IPO_URL);
    const $ = cheerio.load(data);

    const table = findIpoTable($);
    if (!table.length) {
      throw new Error('IPO table not found on the page');
    }

    const rows = table.find('tr');
    return parseTableRows($, rows);
  } catch (error) {
    console.error('Error scraping IPO data:', error);
    throw new Error(`Failed to scrape IPO data: ${error.message}`);
  }
};