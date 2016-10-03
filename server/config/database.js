const productionConnection = process.env.DATABASE_URL
const devConnection = {
  host     : '127.0.0.1',
  user     : '',
  password : '',
  database : 'power_ballot_development',
  charset  : 'utf8',
}

const connectionConfig = process.env.NODE_ENV === 'production' ? productionConnection : devConnection

module.exports = connectionConfig
