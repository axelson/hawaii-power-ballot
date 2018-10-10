"use strict"

const { getPrecinct } = require('./arc_gis')
const { getCandidatesForContests, getAllContestIds } = require('./candidate')
const { getPollingPlace } = require('./polling_place')
const STATIC_AMENDMENTS = require('./../data/static_amendments.json')

function getDistrictInfo(dp) {
  return getPrecinct(dp).then(results => {
    let county = ''
    let pollingId = ''
    let contestsFromAllDistricts = results.map(result => {
      county = result.attributes.County
      pollingId = result.attributes.DP
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
      county: county,
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
    candidates.forEach(candidate => {
      const { contest_id } = candidate

      contestIdToCandidates[contest_id] = contestIdToCandidates[contest_id] || []
      contestIdToCandidates[contest_id].push(candidate)
    })

    let contests = []
    contestIds.forEach(contestId => {
      if (contestIdToCandidates[contestId]) {
        contests.push({
          contest_id: contestId,
          candidates: contestIdToCandidates[contestId],
        })
      }
    })

    return contests
  })
}

function getAmendmentsArray(county) {
  const filteredAmendments = STATIC_AMENDMENTS.filter(amendmentGroup => {
    return amendmentGroup.county === undefined || amendmentGroup.county === county
  })

  return Promise.resolve(filteredAmendments)
}

function getBallot(districtId) {
  return getDistrictInfo(districtId).then(districtInfo => {
    const {county, pollingId, contestIds} = districtInfo

    const pollingPlacePr = getPollingPlace(pollingId)
    const contestsWithCandidatesPr = getCandidatesMappedIntoContests(contestIds)
    const amendmentsPr = getAmendmentsArray(county)

    return Promise.all([pollingPlacePr, contestsWithCandidatesPr, amendmentsPr]).then(results => {
      const ballot = {
        county: county,
        pollingPlace: results[0],
        contests: results[1],
        amendments: results[2],
      }

      return ballot
    })
  })
}

function getStatewideBallot() {
  return getAllContestIds().then(contestIds => {
    let amendments = STATIC_AMENDMENTS
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
