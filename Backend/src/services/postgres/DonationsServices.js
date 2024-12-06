/* eslint-disable camelcase */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class DonationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addDonation({ requestId, descriptions, owner }) {}
}

module.exports = DonationsService;
