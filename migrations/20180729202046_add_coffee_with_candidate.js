exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('candidates', function(table) {
      table.text('hawaii_news_now_url')
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('candidates', function(table) {
      table.dropColumn('hawaii_news_now_url')
    }),
  ])
}
