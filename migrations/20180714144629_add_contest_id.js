exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('candidates', function(table) {
      table.text('contest_id')
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('candidates', function(table) {
      table.dropColumn('contest_id')
    }),
  ])
}
