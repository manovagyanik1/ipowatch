import { scrapeIpoData } from '../services/ipoScraper.js';

export const getIpos = async (req, res, next) => {
  try {
    const ipos = await scrapeIpoData();
    
    if (!ipos || ipos.length === 0) {
      return res.status(404).json({ 
        error: 'No IPO data available at the moment' 
      });
    }
    
    res.json(ipos);
  } catch (error) {
    next(error);
  }
};