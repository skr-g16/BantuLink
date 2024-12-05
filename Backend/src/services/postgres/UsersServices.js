/* eslint-disable camelcase */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');

const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationError = require('../../exceptions/AuthenticationsError');

class UsersServices {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ fullname, email, password, phone_number, gender, address }) {
    await this.verifyUserEmail(email);
    await this.verifyUserPhoneNumber(phone_number);
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const created_at = new Date().toISOString();
    const updated_at = created_at;

    const query = {
      text: 'INSERT INTO users (id, fullname, email, password, phone_number, gender, address, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [
        id,
        fullname,
        email,
        hashedPassword,
        phone_number,
        gender,
        address,
        created_at,
        updated_at,
      ],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('User gagal ditambahkan');
    }
    return result.rows[0].id;
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
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('User tidak ditemukan');
    }
    return result.rows[0];
  }

  async editProfileUser(
    id,
    { fullname, email, password, phone_number, gender, address }
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updated_at = new Date().toISOString();
    const query = {
      text: 'UPDATE users SET fullname = $1, email = $2, password = $3, phone_number = $4, gender = $5, address = $6, updated_at = $7 WHERE id = $8 RETURNING id',
      values: [
        fullname,
        email,
        hashedPassword,
        phone_number,
        gender,
        address,
        updated_at,
        id,
      ],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Profile gagal di Update, User tidak ditemukan');
    }
  }

  async verifyUserCredential(email, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new AuthenticationError('Email yang Anda berikan salah');
    }

    const { id, password: hashedPassword } = result.rows[0];
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Password yang Anda berikan salah');
    }
    return id;
  }
}

module.exports = UsersServices;
