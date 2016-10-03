exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('session', function(table) {
      table.increments();
      table.text('sid');
      table.json('sess');
      table.timestamp('expire');
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('session'),
  ])
};
