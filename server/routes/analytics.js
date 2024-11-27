import express from 'express';
import { query } from 'express-validator';
import { validateRequest } from '../middleware/validate.js';
import { AnalyticsService } from '../services/analytics.js';

const router = express.Router();
const analyticsService = new AnalyticsService();

// Get user analytics overview
router.get('/overview', async (req, res) => {
  const userId = req.auth.sub;
  const overview = await analyticsService.getOverview(userId);
  res.json(overview);
});

// Get revenue data
router.get('/revenue',
  [
    query('startDate').optional().isISO8601(),
    query('endDate').optional().isISO8601(),
  ],
  validateRequest,
  async (req, res) => {
    const userId = req.auth.sub;
    const { startDate, endDate } = req.query;
    const revenue = await analyticsService.getRevenue(userId, startDate, endDate);
    res.json(revenue);
  }
);

// Get sales data
router.get('/sales',
  [
    query('startDate').optional().isISO8601(),
    query('endDate').optional().isISO8601(),
  ],
  validateRequest,
  async (req, res) => {
    const userId = req.auth.sub;
    const { startDate, endDate } = req.query;
    const sales = await analyticsService.getSales(userId, startDate, endDate);
    res.json(sales);
  }
);

export { router as analyticsRouter };