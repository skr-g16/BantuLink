/* eslint-disable camelcase */

const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationsError');

class DonationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addDonation({ requestId, description, donationItems, owner }) {
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

      // Cek apakah status request adalah Fulfilled
      const requestStatus = requestResult.rows[0].request_status;
      if (requestStatus === 'Fulfilled') {
        throw new InvariantError(
          'Request telah terpenuhi. Tidak dapat menambahkan donasi.'
        );
      }

      // Validasi: User tidak boleh mendonasikan request yang dibuat sendiri
      const requestOwner = requestResult.rows[0].owner;
      if (requestOwner === owner) {
        throw new InvariantError(
          'Anda tidak dapat mendonasikan request yang Anda buat sendiri'
        );
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

      // Insert donation
      const donationQuery = {
        text: 'INSERT INTO donations VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        values: [
          donationId,
          requestId,
          description,
          'Pending',
          created_at,
          updated_at,
          owner,
        ],
      };
      const donationResult = await client.query(donationQuery);

      // Insert donation_items
      for (const item of donationItems) {
        const relatedRequestItem = requestItemsResult.rows.find(
          (reqItem) => reqItem.id === item.requestItemId
        );

        // Validasi: Quantity donasi tidak boleh melebihi stok
        if (
          !relatedRequestItem ||
          item.quantity > relatedRequestItem.quantity
        ) {
          throw new InvariantError(
            `Quantity untuk item "${
              relatedRequestItem?.category_id || 'tidak diketahui'
            }" tidak mencukupi. Maksimum yang tersedia: ${
              relatedRequestItem?.quantity || 0
            }`
          );
        }

        const donationItemId = `donation-item-${nanoid(16)}`;
        const donationItemQuery = {
          text: 'INSERT INTO donation_items(id, donation_id, request_items_id, description, quantity) VALUES($1, $2, $3, $4, $5)',
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

      // Update quantity request_items
      for (const item of donationItems) {
        const quantityUpdateQuery = {
          text: 'UPDATE request_items SET quantity = quantity - $1 WHERE id = $2',
          values: [item.quantity, item.requestItemId],
        };
        await client.query(quantityUpdateQuery);
      }

      // Cek apakah semua quantity request_items sudah 0
      const totalQuantityQuery = {
        text: 'SELECT SUM(quantity) AS total_quantity FROM request_items WHERE request_id = $1',
        values: [requestId],
      };
      const totalQuantityResult = await client.query(totalQuantityQuery);
      const totalQuantity = parseInt(
        totalQuantityResult.rows[0].total_quantity,
        10
      );

      if (totalQuantity === 0) {
        // Update status request menjadi "Fulfilled"
        const updateRequestStatusQuery = {
          text: 'UPDATE requests SET request_status = $1 WHERE id = $2',
          values: ['Fulfilled', requestId],
        };
        await client.query(updateRequestStatusQuery);
      } else {
        // Update status request menjadi "In Donations"
        const updateRequestStatusQuery = {
          text: 'UPDATE requests SET request_status = $1 WHERE id = $2',
          values: ['In Donations', requestId],
        };
        await client.query(updateRequestStatusQuery);
      }

      await client.query('COMMIT');
      return donationResult.rows[0].id;
    } catch (error) {
      console.log(error.message);
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async getDonationById(id) {
    const query = {
      text: `SELECT 
              d.id as donation_id,
              r.id as request_id,
              r.description as request_description,
              r.request_status as request_status,
              d.description as donation_description,
              d.donor_status as donation_status,
              d.created_at as donation_created_at,
              d.updated_at as donation_updated_at,
              (
                SELECT json_agg(
                  json_build_object(
                    'request_item_id', ri.id,
                    'category_id', c.id,
                    'category_name', c.name,
                    'quantity', di.quantity,
                    'description', di.description
                  ) 
                ) FROM donation_items di
                JOIN request_items ri ON di.request_items_id = ri.id
                JOIN categories c ON ri.category_id = c.id
                WHERE di.donation_id = d.id
              ) as donation_items
            FROM donations d
            JOIN requests r ON d.request_id = r.id
            WHERE d.id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getDonationByOwner(owner) {
    const query = {
      text: `SELECT 
              d.id as donation_id,
              r.id as request_id,
              r.description as request_description,
              r.request_status as request_status,
              d.description as donation_description,
              d.donor_status as donation_status,
              d.created_at as donation_created_at,
              d.updated_at as donation_updated_at,
              (
                SELECT json_agg(
                  json_build_object(
                    'request_item_id', ri.id,
                    'category_id', c.id,
                    'category_name', c.name,
                    'quantity', di.quantity,
                    'description', di.description
                  )
                ) FROM donation_items di
                JOIN request_items ri ON di.request_items_id = ri.id
                JOIN categories c ON ri.category_id = c.id
                WHERE di.donation_id = d.id
              ) as donation_items
            FROM donations d
            JOIN requests r ON d.request_id = r.id
            WHERE d.owner = $1`,
      values: [owner],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  // async updateDonation(id, { description, donationItems }) {
  //   const client = await this._pool.connect();

  //   try {
  //     await client.query('BEGIN');

  //     // Lock the donation row for update
  //     const donationQuery = {
  //       text: 'SELECT * FROM donations WHERE id = $1 FOR UPDATE',
  //       values: [id],
  //     };
  //     const donationResult = await client.query(donationQuery);
  //     if (!donationResult.rows.length) {
  //       throw new NotFoundError('Donation tidak ditemukan');
  //     }

  //     const requestId = donationResult.rows[0].request_id;

  //     // Lock the request row for update
  //     const requestQuery = {
  //       text: 'SELECT * FROM requests WHERE id = $1 FOR UPDATE',
  //       values: [requestId],
  //     };
  //     const requestResult = await client.query(requestQuery);
  //     if (!requestResult.rows.length) {
  //       throw new NotFoundError('Request tidak ditemukan');
  //     }

  //     // Get previous donation items
  //     const previousItemsQuery = {
  //       text: 'SELECT * FROM donation_items WHERE donation_id = $1',
  //       values: [id],
  //     };
  //     const previousItemsResult = await client.query(previousItemsQuery);

  //     // Calculate the total donated quantity for this donation
  //     const previousTotalDonated = previousItemsResult.rows.reduce(
  //       (sum, item) => sum + item.quantity,
  //       0
  //     );

  //     // Delete old donation items
  //     await client.query('DELETE FROM donation_items WHERE donation_id = $1', [
  //       id,
  //     ]);

  //     // Validate and insert updated donation items
  //     let newTotalDonated = 0;

  //     for (const item of donationItems) {
  //       const requestItemQuery = {
  //         text: 'SELECT * FROM request_items WHERE id = $1 FOR UPDATE',
  //         values: [item.requestItemId],
  //       };
  //       const requestItemResult = await client.query(requestItemQuery);

  //       if (!requestItemResult.rows.length) {
  //         throw new NotFoundError('Request item tidak ditemukan');
  //       }

  //       const requestItem = requestItemResult.rows[0];

  //       // Calculate the new remaining quantity
  //       const remainingQuantity =
  //         requestItem.quantity + previousTotalDonated - newTotalDonated;

  //       if (item.quantity > remainingQuantity) {
  //         throw new InvariantError(
  //           `Quantity donasi (${item.quantity}) melebihi stok yang tersedia (${remainingQuantity})`
  //         );
  //       }

  //       newTotalDonated += item.quantity;

  //       const donationsQuery = {
  //         text: 'UPDATE donations SET description = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id',
  //         values: [description, id],
  //       };
  //       await client.query(donationsQuery);

  //       // Insert updated donation item
  //       const itemId = `${nanoid(16)}`; // Corrected itemId generation
  //       const insertItemQuery = {
  //         text: 'INSERT INTO donation_items (id, donation_id, request_items_id, quantity, description) VALUES ($1, $2, $3, $4, $5)',
  //         values: [
  //           itemId,
  //           id,
  //           item.requestItemId,
  //           item.quantity,
  //           item.description,
  //         ],
  //       };
  //       await client.query(insertItemQuery);

  //       // Update request item quantity
  //       const updateRequestItemQuantityQuery = {
  //         text: 'UPDATE request_items SET quantity = quantity - $1 WHERE id = $2',
  //         values: [item.quantity, item.requestItemId],
  //       };
  //       await client.query(updateRequestItemQuantityQuery);
  //     }

  //     // Calculate total remaining quantity for the request
  //     const totalQuantityQuery = {
  //       text: 'SELECT SUM(quantity) AS total_quantity FROM request_items WHERE request_id = $1',
  //       values: [requestId],
  //     };
  //     const totalQuantityResult = await client.query(totalQuantityQuery);
  //     const totalQuantity = parseInt(
  //       totalQuantityResult.rows[0].total_quantity,
  //       10
  //     );

  //     // Update request status
  //     const updateRequestStatusQuery = {
  //       text: 'UPDATE requests SET request_status = $1 WHERE id = $2',
  //       values: [totalQuantity === 0 ? 'Fulfilled' : 'In Donations', requestId],
  //     };
  //     await client.query(updateRequestStatusQuery);

  //     await client.query('COMMIT');
  //     return donationResult.rows[0].id;
  //   } catch (error) {
  //     await client.query('ROLLBACK');
  //     throw error;
  //   } finally {
  //     client.release();
  //   }
  // }

  async deleteDonationById(id) {
    const query = {
      text: 'DELETE FROM donations WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Donation tidak ditemukan');
    }
  }

  async verifyDonationOwner(id, owner) {
    const query = {
      text: 'SELECT owner FROM donations WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Donation tidak ditemukan');
    }
    const donation = result.rows[0];
    if (donation.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
}

module.exports = DonationsService;
