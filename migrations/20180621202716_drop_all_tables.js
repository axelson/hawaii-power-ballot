exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('candidate_metadata'),
    knex.schema.dropTable('candidates'),
    knex.schema.dropTable('polling_places'),
  ])
}

exports.down = function(_knex, _Promise) {
}
