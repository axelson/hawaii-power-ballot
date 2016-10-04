const express = require('express')
const router = express.Router()
const passport = require('passport')

const {scriptUrl} = require('../services/server_helpers')
const {
  getCandidateById,
  getFullCandidatePromise,
  setCandidateMetadata,
} = require('../services/candidate')

router.get('/', isLoggedIn, (req, res) => {
  const initialState = {}
  res.render('index.jade', {
    initialState,
    scriptUrl: scriptUrl(),
    user: req.user,
  })
})

// Login
router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/admin')
  } else {
    res.render('admin/login.jade', { message: req.flash('loginMessage') })
  }
})

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/admin', // redirect to the secure profile section
  failureRedirect : '/login', // redirect back to the signup page if there is an error
  failureFlash : true, // allow flash messages
}))

// Signup
// router.get('/signup', isSuperAdmin, (req, res) => {
router.get('/signup', (req, res) => {
  res.render('admin/signup.jade', { message: req.flash('signupMessage') })
})

// router.post('/signup', isSuperAdmin, passport.authenticate('local-signup', {
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/admin', // redirect to the secure profile section
  failureRedirect: '/admin/signup', // redirect back to the signup page if there is an error
  failureFlash: true, // allow flash messages
}))

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/candidate/id/:id', isLoggedIn, (req, res) => {
  getCandidateById(req.params.id).then(candidate => {
    return res.redirect(`/admin/candidate/${candidate.Candidate_ID}`)
  })
})

router.get('/candidate/:candidateId', isLoggedIn, (req, res) => {
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

router.put('/:candidateId', isLoggedIn, (req, res) => {
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

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next()

  // if they aren't redirect them to the home page
  res.redirect('/admin/login')
}

function isSuperAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.attributes.role === 'admin') {
      return next()
    }
  }

  req.flash('loginMessage', 'Not authorized to signup')
  res.redirect('/admin/login')
}

module.exports = router
