exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('candidates', function(table) {
      table.text('staradvertiser_previous_url')
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('candidates', function(table) {
      table.dropColumn('staradvertiser_previous_url')
    }),
  ])
}
