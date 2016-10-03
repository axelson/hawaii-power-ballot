var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var passport = require('passport')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var morgan = require('morgan')
var flash    = require('connect-flash')

const {scriptUrl} = require('./server/services/server_helpers')
var ballotsRoute = require('./server/routes/ballots')
var candidatesRoute = require('./server/routes/admin_candidates')
var apiRoute = require('./server/routes/api')

var app = express()
require('./server/config/passport')(passport) // pass passport for configuration

var port = process.env.PORT || 4000

app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')
app.set('views', './server/views')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(flash()) // use connect-flash for flash messages stored in session

// passport setup
const pgSession = require('connect-pg-simple')(session)
app.use(session({
  secret: '8OQzLos3l1fODmCpO00uWxKpiQF2VCP8ok5fRZhc',
  name: 'pballot',
  store: new pgSession({
    conString: require('./server/config/database'),
    // pg : pg,                                  // Use global pg-module
    tableName : 'session',               // Use another table-name than the default "session" one
  }),
  proxy: true,
  resave: true,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions

app.use('/static/', express.static(path.join(__dirname, '/dist')))
app.use('/assets/', express.static(path.join(__dirname, '/src/assets')))

app.use('/api', apiRoute)
app.use('/ballot', ballotsRoute)
app.use('/admin/candidate', candidatesRoute)
require('./server/routes.js')(app, passport)

app.get('*', (req, res) => {
  res.render('index.jade', {
    scriptUrl: scriptUrl(),
  })
})

app.listen(port, () => {
  console.log('Express listening on ', port)
})
