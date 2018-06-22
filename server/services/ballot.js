"use strict"

const { getPrecinct, getAllContests } = require('./arc_gis')
const { getCandidatesForContests, getCandidatesMetadata } = require('./candidate')
const { getPollingPlace } = require('./polling_place')
const STATIC_AMENDMENTS = require('./../data/static_amendments.json')

const CANDIDATE_ID = 'Candidate_ID'

function getAllContestsAndAmendments() {
  return getAllContests().then(results => {
    let contestIds = []
    results.forEach(result => {
      const contest = result.attributes
      let contestId = undefined
      switch (contest.Contest_ID) {

      // TODO: HACK: Need to resolve the issue between PVP and USPVP, shows up
      // as USPVP in the contest ids, but for the candidates field its stored
      // as PVP.
      // UPDATE: both now show up, so just skip it
      case 'USPVP':
        break

      // TODO: HACK: Also limit the results for some presidential fields that
      // are unused
      case 'USP':
      case 'USVP':
        break

      default:
        contestId = result.attributes.Contest_ID
      }

      // A 2016 check used to determine amendments; since we're avoiding using
      // the ArcGIS data for amendments in 2018 this is left to ensure that we
      // don't include amendments in place of candidates
      const isAmendment = Number(contest.Contest_Order) >= 1500

      if (contestId) {
        if (!isAmendment) {
          contestIds.push(contestId)
        }
      }
    })

    let amendments = STATIC_AMENDMENTS

    return {
      contestIds,
      amendments,
    }
  })
}

function getDistrictInfo(dp) {
  return getPrecinct(dp).then(results => {
    let pollingId = ''
    let contestsFromAllDistricts = results.map(result => {
      pollingId = result.attributes.PollingID
      return result.attributes.Contests.split('-')
    })

    let amendmentsFromAllDistricts = results.map(result => {
      return result.attributes.Amendments.split('-')
    })

    const allContests = [].concat.apply([], contestsFromAllDistricts)
    const allAmendmentContestIds = [].concat.apply([], amendmentsFromAllDistricts)

    const allCandidateContests = allContests.filter(contestId => {
      return allAmendmentContestIds.indexOf(contestId) < 0
    })

    return {
      pollingId: pollingId,
      contestIds: allCandidateContests,
      amendmentIds: allAmendmentContestIds,
    }
  })
}

function getCandidatesMappedIntoContests(contestIds) {
  const candidatesForContestsPr = getCandidatesForContests(contestIds)
  return candidatesForContestsPr.then(candidates => {
    var contestIdToCandidates = {}
    var candidateIdToCandidate = {}
    var candidateIds = candidates.map(candidate => {
      const { Contest_ID } = candidate

      candidate.metadata = null
      contestIdToCandidates[Contest_ID] = contestIdToCandidates[Contest_ID] || []
      contestIdToCandidates[Contest_ID].push(candidate)
      candidateIdToCandidate[candidate[CANDIDATE_ID]] = candidate
      return candidate[CANDIDATE_ID]
    })

    const candidateMetadataPr = getCandidatesMetadata(candidateIds)
    return candidateMetadataPr.then(candidatesMetadata => {

      candidatesMetadata.map(metadata => {
        let candidate = candidateIdToCandidate[metadata[CANDIDATE_ID]]
        if (candidate) {
          candidate.metadata = metadata
        }
      })

      // Only build up the array of contests with candidates
      let contests = []
      contestIds.forEach(contestId => {
        if (contestIdToCandidates[contestId]) {
          contests.push({
            Contest_ID: contestId,
            candidates: contestIdToCandidates[contestId],
          })
        }
      })

      return contests
    })
  })
}

function getAmendmentsArray() {
  return Promise.resolve(STATIC_AMENDMENTS)
}

function getBallot(districtId) {
  return getDistrictInfo(districtId).then(districtInfo => {
    const {pollingId, contestIds} = districtInfo

    const pollingPlacePr = getPollingPlace(pollingId)
    const contestsWithCandidatesPr = getCandidatesMappedIntoContests(contestIds)
    const amendmentsPr = getAmendmentsArray()

    return Promise.all([pollingPlacePr, contestsWithCandidatesPr, amendmentsPr]).then(results => {
      const ballot = {
        pollingPlace: results[0],
        contests: results[1],
        amendments: results[2],
      }

      return ballot
    })
  })
}

function getStatewideBallot() {
  return getAllContestsAndAmendments().then(results => {
    const { contestIds, amendments } = results
    const contestsWithCandidatesPr = getCandidatesMappedIntoContests(contestIds)
    return contestsWithCandidatesPr.then(contests => {
      const ballot = {
        contests,
        amendments: amendments,
      }
      return ballot
    })
  })
}

module.exports = {
  getBallot,
  getStatewideBallot,
}
