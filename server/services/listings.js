import db from '../database/init.js';

export class ListingsService {
  async getAllListings() {
    return db.prepare(`
      SELECT l.*, i.url as image_url
      FROM listings l
      LEFT JOIN images i ON i.listing_id = l.id AND i.position = 0
      WHERE l.is_active = true
      ORDER BY l.created_at DESC
    `).all();
  }

  async getUserListings(userId) {
    return db.prepare(`
      SELECT l.*, i.url as image_url
      FROM listings l
      LEFT JOIN images i ON i.listing_id = l.id AND i.position = 0
      WHERE l.user_id = ?
      ORDER BY l.created_at DESC
    `).all(userId);
  }

  async getListing(id) {
    const listing = db.prepare(`
      SELECT l.*, json_group_array(i.url) as images
      FROM listings l
      LEFT JOIN images i ON i.listing_id = l.id
      WHERE l.id = ?
      GROUP BY l.id
    `).get(id);

    if (listing) {
      listing.images = JSON.parse(listing.images);
    }

    return listing;
  }

  async createListing({ userId, name, description, price, images }) {
    const listing = db.prepare(`
      INSERT INTO listings (user_id, name, description, price)
      VALUES (?, ?, ?, ?)
      RETURNING *
    `).get(userId, name, description, price);

    if (images && images.length > 0) {
      const insertImage = db.prepare(`
        INSERT INTO images (listing_id, url, position)
        VALUES (?, ?, ?)
      `);

      images.forEach((url, index) => {
        insertImage.run(listing.id, url, index);
      });
    }

    return this.getListing(listing.id);
  }

  async updateListing(id, userId, updates) {
    const { name, description, price, isActive, images } = updates;

    const listing = db.prepare(`
      UPDATE listings
      SET name = coalesce(?, name),
          description = coalesce(?, description),
          price = coalesce(?, price),
          is_active = coalesce(?, is_active)
      WHERE id = ? AND user_id = ?
      RETURNING *
    `).get(name, description, price, isActive, id, userId);

    if (listing && images) {
      // Delete existing images
      db.prepare('DELETE FROM images WHERE listing_id = ?').run(id);

      // Insert new images
      const insertImage = db.prepare(`
        INSERT INTO images (listing_id, url, position)
        VALUES (?, ?, ?)
      `);

      images.forEach((url, index) => {
        insertImage.run(id, url, index);
      });
    }

    return listing ? this.getListing(id) : null;
  }

  async deleteListing(id, userId) {
    const result = db.prepare(`
      DELETE FROM listings
      WHERE id = ? AND user_id = ?
    `).run(id, userId);

    return result.changes > 0;
  }
}