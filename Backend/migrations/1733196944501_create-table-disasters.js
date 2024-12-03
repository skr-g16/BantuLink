exports.up = (pgm) => {
  pgm.createTable('disasters', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
  });

  // add disaster data
  pgm.sql(`
    INSERT INTO disasters (id, name) VALUES
      ('disaster-1', 'Gempa Bumi'),
      ('disaster-2', 'Letusan Gunung Api'),
      ('disaster-3', 'Tsunami'),
      ('disaster-4', 'Tanah Longsor'),
      ('disaster-5', 'Banjir'),
      ('disaster-6', 'Banjir Bandang'),
      ('disaster-7', 'Kekeringan'),
      ('disaster-8', 'Kebakaran'),
      ('disaster-9', 'Kebakaran Hutan'),
      ('disaster-10', 'Angin Puting Beliung'),
      ('disaster-11', 'Gelombang Pasang atau Badai'),
      ('disaster-12', 'Kecelakaan Transportasi'),
      ('disaster-13', 'Kecelakaan Industri'),
      ('disaster-14', 'Konflik Sosial'),
      ('disaster-15', 'Aksi Teror'),
      ('disaster-16', 'Sabotase'),
      ('disaster-17', 'Lainnya');
  `);
};

exports.down = (pgm) => {
  pgm.dropTable('disasters');
};
