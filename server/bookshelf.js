const connection = require('./config/database')
var knex = require('knex')({
  client: 'pg',
  connection,
  migrations: {
    tableName: 'migrations',
  },
})

module.exports = require('bookshelf')(knex)
