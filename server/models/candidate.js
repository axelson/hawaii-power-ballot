const bookshelf = require('../bookshelf')

const Candidate = bookshelf.Model.extend({
  idAttribute: 'candidate_name',
  tableName: 'candidates',
  hasTimestamps: false,
})

module.exports = Candidate
