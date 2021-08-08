exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('authentication', {
    token: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('authentication');
};
