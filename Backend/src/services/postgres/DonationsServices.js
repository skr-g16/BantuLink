/* eslint-disable camelcase */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class DonationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addDonation({ requestId, descriptions, owner }) {
    const id = `donation-${nanoid(16)}`;
    const created_at = new Date().toISOString();
    const updated_at = created_at;
    const client = await this._pool.connect();
    try {
      await client.query('BEGIN');

      const donationQuery = {
        text: 'INSERT INTO donations(id, request_id, description, donation_status, created_at, updated_at, owner) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        values: [
          id,
          requestId,
          descriptions,
          'Pending',
          created_at,
          updated_at,
          owner,
        ],
      };

      const result = await client.query(donationQuery);
      const donationId = result.rows[0].id;

      for (const item of donationItems) {
        const itemId = `item-${nanoid(16)}`;
        const itemQuery = {
          text: 'INSERT INTO donation_items(id, donation_id, category_id, quantity, unit_id, description) VALUES($1, $2, $3, $4, $5, $6)',
          values: [
            itemId,
            donationId,
            item.categoryId,
            item.quantity,
            item.unitId,
            item.description,
          ],
        };
        await client.query(itemQuery);
      }

      const updateRequestItemsQuery = {
        text: 'UPDATE request_items SET quantity = quantity - $1 WHERE request_id = $2 AND category_id = $3',
        values: [
          donationItems[0].quantity,
          requestId,
          donationItems[0].categoryId,
        ],
      };

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = DonationsService;
