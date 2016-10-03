const bookshelf = require('../bookshelf')
const bcrypt = require('bcrypt-nodejs')

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  generateHash: function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
  },

  // checking if password is valid
  validPassword: function(password) {
    return bcrypt.compareSync(password, this.attributes.password)
  },
})


module.exports = User
