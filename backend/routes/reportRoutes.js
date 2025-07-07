import express from 'express';
import { getLastThreeReports } from '../services/reportService.js';

const router = express.Router();

router.get('/monthly', async (req, res) => {
  try {
    const reports = await getLastThreeReports(req.user.userId);
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

export default router;
