const bookshelf = require('../bookshelf')
const bcrypt = require('bcrypt-nodejs')

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  generateHash: function(password) {
    console.log('generating hash of', password)
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
  },

  // checking if password is valid
  validPassword: function(password) {
    console.log('passed in  password is: ', password)
    console.log('db password is: ', this.attributes.password)
    return bcrypt.compareSync(password, this.attributes.password)
  },
})


module.exports = User
