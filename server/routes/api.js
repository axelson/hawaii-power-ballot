var express = require('express')
var router = express.Router()

const {getBallot, getStatewideBallot} = require('../services/ballot')

router.get('/precincts/:precinct', (req, res) => {
  const precinct = req.params.precinct

  getBallot(precinct).then(data => {
    res.json({ballot: data})
  }).catch(reason => {
    console.error('Unable to get precinct data', reason)
    console.error(reason.stack)
    res.status(400).send(reason)
  })
})

router.get('/statewide', (req, res) => {
  getStatewideBallot().then(data => {
    res.json({ballot: data})
  }).catch(reason => {
    console.error('Problem with statewide ballot', reason)
    console.error(reason.stack)
    res.status(400).send(reason)
  })
})

module.exports = router
