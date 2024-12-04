const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationsError');

class RequestsService {
  constructor() {
    this._pool = new Pool();
  }

  async addRequest({ userId, disasterId, description, requestItems, owner }) {
    const id = `request-${nanoid(16)}`;

    const client = await this._pool.connect();
    try {
      await client.query('BEGIN');

      const requestQuery = {
        text: 'INSERT INTO requests(id, user_id, disaster_id, description, request_status, owner) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
        values: [
          id,
          userId,
          disasterId,
          description,
          'Awaiting Donation',
          owner,
        ],
      };

      const result = await client.query(requestQuery);
      const requestId = result.rows[0].id;

      for (const item of requestItems) {
        const itemId = `item-${nanoid(16)}`;
        const itemQuery = {
          text: 'INSERT INTO request_items(id, request_id, category_id, quantity, unit_id, description) VALUES($1, $2, $3, $4, $5, $6)',
          values: [
            itemId,
            requestId,
            item.categoryId,
            item.quantity,
            item.unitId,
            item.description,
          ],
        };
        await client.query(itemQuery);
      }

      await client.query('COMMIT');
      return requestId;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async getRequests() {
    const query = {
      text: `SELECT 
              r.id,
              r.user_id,
              r.description,
              r.request_status,
              r.created_at,
              r.updated_at,
              d.name as disaster_name,
              (
                SELECT json_agg(
                  json_build_object(
                    'category_name', c.name,
                    'quantity', ri.quantity,
                    'unit_name', u.name,
                    'description', ri.description
                  )
                )
                FROM request_items ri
                JOIN categories c ON ri.category_id = c.id
                JOIN units u ON ri.unit_id = u.id
                WHERE ri.request_id = r.id
              ) as items
            FROM requests r
            JOIN disasters d ON r.disaster_id = d.id`,
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getRequestById(id) {
    const query = {
      text: `SELECT 
              r.id,
              r.user_id,
              r.description,
              r.request_status,
              r.created_at,
              r.updated_at,
              d.name as disaster_name,
              (
                SELECT json_agg(
                  json_build_object(
                    'category_name', c.name,
                    'quantity', ri.quantity,
                    'unit_name', u.name,
                    'description', ri.description
                  )
                )
                FROM request_items ri
                JOIN categories c ON ri.category_id = c.id
                JOIN units u ON ri.unit_id = u.id
                WHERE ri.request_id = r.id
              ) as items
            FROM requests r
            JOIN disasters d ON r.disaster_id = d.id
            WHERE r.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Request tidak ditemukan');
    }
    return result.rows[0];
  }

  async updateRequest(id, { description, requestItems }) {
    const client = await this._pool.connect();
    try {
      await client.query('BEGIN');

      // Update main request
      const updateRequestQuery = {
        text: 'UPDATE requests SET description = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id',
        values: [description, id],
      };
      const result = await client.query(updateRequestQuery);

      if (!result.rows.length) {
        throw new NotFoundError('Request tidak ditemukan');
      }

      // Delete existing items
      await client.query('DELETE FROM request_items WHERE request_id = $1', [
        id,
      ]);

      // Insert new items
      for (const item of requestItems) {
        const itemId = `item-${nanoid(16)}`;
        const itemQuery = {
          text: 'INSERT INTO request_items(id, request_id, category_id, quantity, unit_id, description) VALUES($1, $2, $3, $4, $5, $6)',
          values: [
            itemId,
            id,
            item.categoryId,
            item.quantity,
            item.unitId,
            item.description,
          ],
        };
        await client.query(itemQuery);
      }

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async deleteRequest(id) {
    const query = {
      text: 'DELETE FROM requests WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Request tidak ditemukan');
    }
  }

  async updateRequestStatus(id, status) {
    const query = {
      text: 'UPDATE requests SET request_status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id',
      values: [status, id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Request tidak ditemukan');
    }
  }

  async verifyRequestOwner(id, owner) {
    const query = {
      text: 'SELECT owner FROM requests WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Request tidak ditemukan');
    }

    const request = result.rows[0];
    if (request.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
}

module.exports = RequestsService;
