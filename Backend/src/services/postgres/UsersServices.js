/* eslint-disable camelcase */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');

const bycrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class UsersServices {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ fullname, email, password, phone_number, gender, address }) {
    await this.verifyUserEmail(email);
    await this.verifyUserPhoneNumber(phone_number);
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bycrypt.hash(password, 10);
    const created_at = new Date().toISOString();
    const updated_at = created_at;
    const role = 'donor';

    const query = {
      text: 'INSERT INTO users (id, fullname, email, password, phone_number, gender, address, role, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
      values: [
        id,
        fullname,
        email,
        hashedPassword,
        phone_number,
        gender,
        address,
        role,
        created_at,
        updated_at,
      ],
    };

    try {
      const result = await this._pool.query(query);
      if (!result.rows[0].id) {
        throw new InvariantError('User gagal ditambahkan');
      }
      return result.rows[0].id;
    } catch (error) {
      console.error('Database error:', error.message);
      throw new InvariantError('Gagal menambahkan user');
    }
  }

  async verifyUserEmail(email) {
    const query = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [email],
    };
    const result = await this._pool.query(query);
    if (result.rows.length > 0) {
      throw new InvariantError(
        'Gagal menambahkan user. Email sudah digunakan.'
      );
    }
  }

  async verifyUserPhoneNumber(phone_number) {
    const query = {
      text: 'SELECT phone_number FROM users WHERE phone_number = $1',
      values: [phone_number],
    };
    const result = await this._pool.query(query);
    if (result.rows.length > 0) {
      throw new InvariantError(
        'Gagal menambahkan user. Nomor telepon sudah digunakan.'
      );
    }
  }

  async getUserById(id) {
    const query = {
      text: 'SELECT id, fullname, email, phone_number, address FROM users WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('User tidak ditemukan');
    }
    return result.rows[0];
  }
}

module.exports = UsersServices;
