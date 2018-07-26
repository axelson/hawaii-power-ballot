exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('candidates', function(table) {
      table.text('civil_beat_previous_url')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('candidates', function(table) {
      table.dropColumn('civil_beat_previous_url')
    })
  ])
};
