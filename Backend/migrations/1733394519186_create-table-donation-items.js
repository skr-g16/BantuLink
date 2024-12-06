/* eslint-disable camelcase */
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('donation_items', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    donation_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'donations(id)',
      onDelete: 'CASCADE',
    },
    request_items_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'request_items(id)',
      onDelete: 'CASCADE',
    },
    description: {
      type: 'TEXT',
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('donation_items');
};
