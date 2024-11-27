import db from '../database/init.js';

export class UsersService {
  async getUser(userId) {
    return db.prepare(`
      SELECT id, email, name, bio, created_at
      FROM users
      WHERE id = ?
    `).get(userId);
  }

  async updateUser(userId, updates) {
    const { name, bio, email } = updates;

    return db.prepare(`
      UPDATE users
      SET name = coalesce(?, name),
          bio = coalesce(?, bio),
          email = coalesce(?, email)
      WHERE id = ?
      RETURNING *
    `).get(name, bio, email, userId);
  }

  async updateNotificationPreferences(userId, preferences) {
    // In a real app, you'd store these in a separate table
    // For now, we'll just return the preferences
    return preferences;
  }
}