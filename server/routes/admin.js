var express = require('express')
var router = express.Router()

const {scriptUrl} = require('../services/server_helpers')
const {
  getCandidateById,
  getFullCandidatePromise,
  setCandidateMetadata,
} = require('../services/candidate')

router.get('/', (req, res) => {
  const initialState = {}
  res.render('index.jade', {
    initialState,
    scriptUrl: scriptUrl(),
    user: req.user,
  })
})

router.get('/candidate/id/:id', (req, res) => {
  getCandidateById(req.params.id).then(candidate => {
    return res.redirect(`/admin/candidate/${candidate.Candidate_ID}`)
  })
})

router.get('/candidate/:candidateId', (req, res) => {
  const candidateId = req.params.candidateId
  console.log('candidateId', candidateId)

  const candidatePr = getFullCandidatePromise(candidateId)

  var result = candidatePr.then(data => {
    return {
      candidate: data,
    }
  },
  failure => {
    console.error('Unable to get candidates data')
    console.error(failure)
    return { candidate: {} }
  })

  result.then(data => {
    const initialState = {
      candidate: data.candidate,
      user: req.user,
    }

    res.render('index.jade', {
      initialState,
      scriptUrl: scriptUrl(),
      user: req.user,
    })
  })
})

router.put('/:candidateId', (req, res) => {
  const candidateId = req.params.candidateId

  const candidatePr = setCandidateMetadata(candidateId, req.body)

  var result = candidatePr.then(data => {
    return {
      candidate: data,
    }
  },
  failure => {
    console.error('Unable to set candidates data')
    console.error(failure)
    return { candidate: {} }
  })

  result.then(data => {
    const initialState = {
      candidate: data.candidate,
      user: req.user,
    }

    res.render('index.jade', {
      initialState,
      scriptUrl: scriptUrl(),
      user: req.user,
    })
  })
})

module.exports = router
