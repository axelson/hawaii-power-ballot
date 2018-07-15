exports.up = function(knex, Promise) {
  return Promise.all([
    knex('candidates')
      .where('candidate_name', 'RUGGLES, Jen')
      .del(),
  ])
}

exports.down = function(_knex, _Promise) {
}
