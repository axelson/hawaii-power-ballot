exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('candidates', function(table) {
      table.text('candidate_name').primary()
      table.text('contests')
      table.text('party')
      table.text('phone')
      table.text('website')
      table.text('facebook_url')
      table.text('twitter_url')
      table.text('instagram_url')
      table.text('email_address')
      table.text('cc_registration_number')
      table.text('fec_cc_id')
      table.text('civil_beat_url')
      table.text('staradvertiser_url')
      table.text('candidate_photo_url')
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('candidates'),
  ])
}
