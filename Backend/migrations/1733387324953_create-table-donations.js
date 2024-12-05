/* eslint-disable camelcase */
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('donations', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    donor_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    request_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'requests(id)',
      onDelete: 'CASCADE',
    },
    description: {
      type: 'TEXT',
      notNull: true,
    },
    donor_status: {
      type: 'VARCHAR(50)',
      notNull: true,
      default: 'Pending',
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('donations');
};
