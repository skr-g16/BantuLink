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
  // Mengganti nama kolom categories menjadi category_id
  pgm.renameColumn('request_items', 'categories', 'category_id');

  // Menghapus constraint foreign key lama
  pgm.dropConstraint('request_items', 'request_items_categories_fkey');

  // Menambahkan constraint foreign key baru untuk category_id
  pgm.addConstraint('request_items', 'request_items_category_id_fkey', {
    foreignKeys: {
      columns: 'category_id',
      references: 'categories(id)',
      onDelete: 'CASCADE',
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  // Mengembalikan perubahan (rollback)
  pgm.renameColumn('request_items', 'category_id', 'categories');

  pgm.dropConstraint('request_items', 'request_items_category_id_fkey');

  pgm.addConstraint('request_items', 'request_items_categories_fkey', {
    foreignKeys: {
      columns: 'categories',
      references: 'categories(id)',
      onDelete: 'CASCADE',
    },
  });
};
