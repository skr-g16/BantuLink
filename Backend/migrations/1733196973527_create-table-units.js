exports.up = (pgm) => {
  pgm.createTable('units', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  // add units data
  pgm.sql(`
    INSERT INTO units (id, name) VALUES
      ('unit-1', 'Pcs'),
      ('unit-2', 'Kg'),
      ('unit-3', 'Liter'),
      ('unit-4', 'Gram'),
      ('unit-5', 'Box'),
      ('unit-6', 'Karton'),
      ('unit-7', 'Pack'),
      ('unit-8', 'Lusin'),
      ('unit-9', 'Set'),
      ('unit-10', 'Lainnya');
  `);
};

exports.down = (pgm) => {
  pgm.dropTable('units');
};
