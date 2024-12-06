/* eslint-disable camelcase */

const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class DonationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addDonation({ requestId, descriptions, owner, donationItems }) {
    const donationId = `donation-${nanoid(16)}`;
    const created_at = new Date().toISOString();
    const updated_at = created_at;

    const client = await this._pool.connect();
    try {
      await client.query('BEGIN');

      // Cek apakah request_id ada
      const requestQuery = {
        text: 'SELECT * FROM requests WHERE id = $1',
        values: [requestId],
      };
      const requestResult = await client.query(requestQuery);
      if (!requestResult.rows.length) {
        throw new NotFoundError('Request tidak ditemukan');
      }

      // Cek apakah request_items ada
      const requestItemsQuery = {
        text: 'SELECT * FROM request_items WHERE request_id = $1',
        values: [requestId],
      };
      const requestItemsResult = await client.query(requestItemsQuery);
      if (!requestItemsResult.rows.length) {
        throw new NotFoundError('Request items tidak ditemukan');
      }

      // Cek apakah donation_items ada
      const donationItemsQuery = {
        text: 'SELECT * FROM donation_items WHERE donation_id = $1',
        values: [donationId],
      };
      const donationItemsResult = await client.query(donationItemsQuery);
      if (donationItemsResult.rows.length) {
        throw new InvariantError('Donation items sudah ada');
      }

      // Insert donation
      const donationQuery = {
        text: 'INSERT INTO donations(id, request_id, description, donor_status, created_at, updated_at, owner) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        values: [
          donationId,
          requestId,
          descriptions,
          'Pending',
          created_at,
          updated_at,
          owner,
        ],
      };
      const donationResult = await client.query(donationQuery);

      // Insert donation_items
      for (const item of donationItems) {
        const donationItemId = `donation-item-${nanoid(16)}`;
        const donationItemQuery = {
          text: 'INSERT INTO donation_items(id, donation_id, request_item_id, description, quantity) VALUES($1, $2, $3, $4, $5, $6)',
          values: [
            donationItemId,
            donationId,
            item.requestItemId,
            item.description,
            item.quantity,
          ],
        };
        await client.query(donationItemQuery);
      }

      // Update stock request_items
      for (const item of requestItemsResult.rows) {
        const stockQuery = {
          text: 'UPDATE request_items SET stock = stock - $1 WHERE id = $2',
          values: [item.quantity, item.id],
        };
        await client.query(stockQuery);
      }

      // Update status request
      const updateRequestQuery = {
        text: 'UPDATE requests SET request_status = $1 WHERE id = $2',
        values: ['In Donations', requestId],
      };
      await client.query(updateRequestQuery);

      await client.query('COMMIT');
      return donationResult.rows[0].id;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = DonationsService;
