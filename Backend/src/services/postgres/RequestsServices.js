/* eslint-disable camelcase */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationsError');

class RequestsService {
  constructor() {
    this._pool = new Pool();
  }

  async addRequest({ disasterId, description, requestItems, owner }) {
    const id = `request-${nanoid(16)}`;
    const created_at = new Date().toISOString();
    const updated_at = created_at;

    const client = await this._pool.connect();
    try {
      await client.query('BEGIN');

      const requestQuery = {
        text: 'INSERT INTO requests(id, disaster_id, description, request_status, created_at, updated_at, owner) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        values: [
          id,
          disasterId,
          description,
          'Awaiting Donation',
          created_at,
          updated_at,
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
                d.id as disaster_id,
                d.name as disaster_name,
                r.description,
                r.request_status,
                r.created_at,
                r.updated_at,
                (
                  SELECT json_agg(
                    json_build_object(
                      'category_id', c.id,
                      'category_name', c.name,
                      'quantity', ri.quantity,
                      'unit_id', u.id,
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
                d.id as disaster_id,
                d.name as disaster_name,
                r.description,
                r.request_status,
                r.created_at,
                r.updated_at,
                (
                  SELECT json_agg(
                    json_build_object(
                      'category_id', c.id,
                      'category_name', c.name,
                      'quantity', ri.quantity,
                      'unit_id', u.id,
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

  async getRequestByOwner(owner) {
    const query = {
      text: `SELECT 
                r.id,
                d.id as disaster_id,
                d.name as disaster_name,
                r.description,
                r.request_status,
                r.created_at,
                r.updated_at,
                (
                  SELECT json_agg(
                    json_build_object(
                      'category_id', c.id,
                      'category_name', c.name,
                      'quantity', ri.quantity,
                      'unit_id', u.id,
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
              WHERE r.owner = $1`,
      values: [owner],
    };
    const result = await this._pool.query(query);
    return result.rows;
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
    console.log(query);

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Request tidak ditemukan');
    }

    const request = result.rows[0];
    if (request.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }

  async getRequestItemsByRequestId(id) {
    const query = {
      text: 'SELECT * FROM request_items WHERE request_id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Request items tidak ditemukan');
    }
    return result.rows;
  }
}

module.exports = RequestsService;
