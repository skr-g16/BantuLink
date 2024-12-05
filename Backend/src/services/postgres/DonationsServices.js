const { Pool } = require('pg');
const { nanoid } = require('nanoid');

const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class DisastersService {
  constructor() {
    this._pool = new Pool();
  }

  async addDonation({ donor_id, request_id, description }) {
    const id = `donation-${nanoid(16)}`;
    const created_at = new Date().toISOString();
    const updated_at = created_at;

    const query = {
      text: 'INSERT INTO donations (id, donor_id, request_id, description, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, donor_id, request_id, description, created_at, updated_at],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Donasi gagal ditambahkan');
    }
    return result.rows[0].id;
  }
}
