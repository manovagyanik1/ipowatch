import { scheduleJob } from 'node-schedule';
import { sendDailyUpdates } from '../services/emailService.js';

// Schedule for 9 AM IST (3:30 AM UTC)
export function scheduleDailyUpdates() {
  scheduleJob('30 3 * * *', async () => {
    console.log('Running daily IPO update job');
    try {
      await sendDailyUpdates();
    } catch (error) {
      console.error('Failed to send daily updates:', error);
    }
  });
} 