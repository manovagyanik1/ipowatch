import { scheduleJob } from 'node-schedule';
import { sendDailyUpdates } from '../services/emailService.js';

// Schedule for 1:45 PM IST (8:15 AM UTC)
export function scheduleDailyUpdates() {
  scheduleJob('15 8 * * *', async () => {
    console.log('Running daily IPO update job');
    try {
      await sendDailyUpdates();
    } catch (error) {
      console.error('Failed to send daily updates:', error);
    }
  });
} 