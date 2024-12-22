import { scheduleJob } from 'node-schedule';
import { sendDailyUpdates } from '../services/emailService.js';
import dayjs from 'dayjs';

// Schedule for 9:00 AM IST (3:30 AM UTC)
export function scheduleDailyUpdates() {
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
  console.log(`[${now}] Initializing daily update cron for 9:00 AM IST`);

  scheduleJob('30 3 * * *', async () => {
    const executionTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    console.log(`[${executionTime}] Starting scheduled IPO update`);

    try {
      await sendDailyUpdates();
      console.log(`[${executionTime}] Scheduled update completed successfully`);
    } catch (error) {
      console.error(`[${executionTime}] Scheduled update failed:`, {
        error: error.message,
        stack: error.stack,
        cause: error.cause
      });
    }
  });

  // Log next execution time
  const nextRun = dayjs().hour(9).minute(0).second(0);
  if (dayjs().isAfter(nextRun)) {
    nextRun.add(1, 'day');
  }
  console.log(`[${now}] Next scheduled run: ${nextRun.format('YYYY-MM-DD HH:mm:ss')}`);
}

// Function to manually trigger updates (for testing)
export async function triggerDailyUpdate() {
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
  console.log(`[${now}] Manual trigger: Starting IPO update`);

  try {
    await sendDailyUpdates();
    console.log(`[${now}] Manual trigger: Update completed successfully`);
    return { success: true, message: 'Update completed successfully' };
  } catch (error) {
    console.error(`[${now}] Manual trigger failed:`, {
      error: error.message,
      stack: error.stack,
      cause: error.cause
    });
    return { success: false, error: error.message };
  }
} 