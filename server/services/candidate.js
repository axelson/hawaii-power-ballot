"use strict"
const Bookshelf = require('../bookshelf')
const Candidate = require('../models/candidate')

function getCandidateById(id) {
  return Candidate
    .query((qb) => {
      qb.whereIn('id', id)
    })
    .fetchAll()
    .then(results => {
      let candidates = results.map(candidateModel => {
        return candidateModel.attributes
      })
      return candidates[0]
    })
}

function getCandidatesForContests(contestIds) {
  return Candidate
    .query((qb) => {
      qb.whereIn('contest_id', contestIds)
    })
    .orderBy('candidate_name', 'ASC')
    .fetchAll()
    .then(results => {
      let candidates = results.map(candidateModel => {
        return candidateModel.attributes
      })
      return candidates
    })
}

function getCandidate(candidateName) {
  return Candidate
    .where('candidate_name', candidateName)
    .fetch()
    .then(candidate => {
      return candidate.attributes
    })
}

function getFullCandidatePromise(candidateId) {
  const candidatePr = getCandidate(candidateId)
  return Promise.all([candidatePr])
    .then(results => {
      let fullCandidate = results[0] || {}
      return fullCandidate
    })
}

function setCandidate(candidateName, data) {
  return Candidate
    .forge({ candidate_name: candidateName })
    .fetch()
    .then(_foundData => {
      let method = 'update'

      return Candidate
        .forge({ candidate_name: candidateName})
        .save(data, {method: method})
        .then(savedModel => {
          console.log('Saved data', savedModel)
          return savedModel
        })
    })
}

function getAllContestIds() {
  const query = Bookshelf.knex.raw('select distinct contest_id from candidates')
  return query.then(res => {
    return res.rows.map(row => row.contest_id)
  })
}

module.exports = {
  getAllContestIds,
  getCandidateById,
  getCandidatesForContests,
  getFullCandidatePromise,
  setCandidate,
}
