exports.up = (pgm) => {
  pgm.createTable('categories', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
  });

  // add categories data
  pgm.sql(`
    INSERT INTO categories (id, name) VALUES
      ('category-1', 'Makanan'),
      ('category-2', 'Minuman'),
      ('category-3', 'Pakaian'),
      ('category-4', 'Obat-obatan'),
      ('category-5', 'Perlengkapan Bayi'),
      ('category-6', 'Perlengkapan Kebersihan'),
      ('category-7', 'Perlengkapan Tidur'),
      ('category-8', 'Peralatan Dapur'),
      ('category-9', 'Peralatan Medis'),
      ('category-10', 'Alat Tulis'),
      ('category-11', 'Lainnya');
  `);
};

exports.down = (pgm) => {
  pgm.dropTable('categories');
};
