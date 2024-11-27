import db from '../database/init.js';

export class PaymentsService {
  async getPaymentMethods(userId) {
    return db.prepare(`
      SELECT id, stripe_payment_method_id, last4, brand, is_default, created_at
      FROM payment_methods
      WHERE user_id = ?
      ORDER BY is_default DESC, created_at DESC
    `).all(userId);
  }

  async addPaymentMethod(userId, { paymentMethodId, last4, brand }) {
    return db.prepare(`
      INSERT INTO payment_methods (user_id, stripe_payment_method_id, last4, brand)
      VALUES (?, ?, ?, ?)
      RETURNING *
    `).get(userId, paymentMethodId, last4, brand);
  }

  async setDefaultPaymentMethod(methodId, userId) {
    const tx = db.transaction(() => {
      // Reset all payment methods to non-default
      db.prepare(`
        UPDATE payment_methods
        SET is_default = false
        WHERE user_id = ?
      `).run(userId);

      // Set the selected method as default
      return db.prepare(`
        UPDATE payment_methods
        SET is_default = true
        WHERE id = ? AND user_id = ?
        RETURNING *
      `).get(methodId, userId);
    });

    return tx();
  }

  async deletePaymentMethod(methodId, userId) {
    return db.prepare(`
      DELETE FROM payment_methods
      WHERE id = ? AND user_id = ?
    `).run(methodId, userId);
  }
}