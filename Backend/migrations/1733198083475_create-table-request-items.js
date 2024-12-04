/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('request_items', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    request_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'requests(id)',
      onDelete: 'CASCADE',
    },
    categories: {
      type: 'VARCHAR(100)',
      notNull: true,
      references: 'categories(id)',
      onDelete: 'CASCADE',
    },
    quantity: {
      type: 'INTEGER',
      notNull: true,
    },
    unit_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'units(id)',
      onDelete: 'CASCADE',
    },
    description: {
      type: 'TEXT',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('request_items');
};
