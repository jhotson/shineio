import db from '../database/init.js';

export class AnalyticsService {
  async getOverview(userId) {
    const revenue = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM payments
      WHERE user_id = ? AND status = 'succeeded'
    `).get(userId);

    const sales = db.prepare(`
      SELECT COUNT(*) as total
      FROM payments
      WHERE user_id = ? AND status = 'succeeded'
    `).get(userId);

    const views = db.prepare(`
      SELECT COUNT(*) as total
      FROM listings l
      WHERE l.user_id = ?
    `).get(userId);

    return {
      revenue: revenue.total,
      sales: sales.total,
      views: views.total,
      conversionRate: sales.total > 0 ? (sales.total / views.total * 100).toFixed(1) : 0
    };
  }

  async getRevenue(userId, startDate, endDate) {
    return db.prepare(`
      SELECT 
        date(created_at) as date,
        SUM(amount) as amount
      FROM payments
      WHERE user_id = ?
        AND status = 'succeeded'
        AND created_at >= coalesce(?, date('now', '-30 days'))
        AND created_at <= coalesce(?, date('now'))
      GROUP BY date(created_at)
      ORDER BY date
    `).all(userId, startDate, endDate);
  }

  async getSales(userId, startDate, endDate) {
    return db.prepare(`
      SELECT 
        date(created_at) as date,
        COUNT(*) as count
      FROM payments
      WHERE user_id = ?
        AND status = 'succeeded'
        AND created_at >= coalesce(?, date('now', '-30 days'))
        AND created_at <= coalesce(?, date('now'))
      GROUP BY date(created_at)
      ORDER BY date
    `).all(userId, startDate, endDate);
  }
}