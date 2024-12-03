/* eslint-disable quotes */
exports.up = (pgm) => {
  pgm.sql(`ALTER TABLE users DROP COLUMN IF EXISTS role`);
};

// eslint-disable-next-line no-unused-vars
exports.down = (pgm) => {};
