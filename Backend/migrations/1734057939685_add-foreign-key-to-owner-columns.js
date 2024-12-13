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
  pgm.sql(
    "INSERT INTO users(id, fullname, email, password, phone_number, gender, address) VALUES ('old_notes', 'old_notes', 'old_notes', 'old notes', 'old notes', 'old notes', 'old notes')"
  );

  pgm.sql("UPDATE donations SET owner = 'old_notes' WHERE owner IS NULL");

  pgm.addConstraint(
    'donations',
    'fk_donations.owner_users.id',
    'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE'
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropConstraint('donations', 'fk_donations.owner_users.id');

  pgm.sql("UPDATE donations SET owner = NULL WHERE owner = 'old_notes'");

  pgm.sql("DeLETE FROM users WHERE id = 'old_notes'");
};
