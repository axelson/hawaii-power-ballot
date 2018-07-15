const bookshelf = require('../bookshelf')

const Candidate = bookshelf.Model.extend({
  tableName: 'candidates',
  hasTimestamps: false,
})

module.exports = Candidate
