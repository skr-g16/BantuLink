/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('requests', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    disaster_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'disasters(id)',
      onDelete: 'CASCADE',
    },
    description: {
      type: 'TEXT',
      notNull: true,
    },
    request_status: {
      type: 'VARCHAR(20)',
      notNull: true,
      default: 'Awaiting Donation',
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('requests');
};
