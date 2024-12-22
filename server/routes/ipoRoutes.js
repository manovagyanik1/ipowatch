import express from 'express';
import { getIpos } from '../controllers/ipoController.js';
import { triggerDailyUpdate } from '../cron/dailyUpdate.js';

const router = express.Router();

router.get('/', getIpos);

// Test endpoint for triggering daily updates
router.post('/trigger-update', async (req, res) => {
  const result = await triggerDailyUpdate();
  if (result.success) {
    res.json({ message: result.message });
  } else {
    res.status(500).json({ error: result.error });
  }
});

export const ipoRouter = router;