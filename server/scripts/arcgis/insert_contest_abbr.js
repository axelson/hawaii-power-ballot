'use strict'

const superagent = require('superagent')

const Candidate = require('./models/candidate')

const CANDIDATE_ID = 'candidate_name'

const baseUrl = 'https://services2.arcgis.com/tuFQUQg1xd48W6M5/arcgis/rest/services/PowerBallotHI2018P/FeatureServer/1/query'

const result = superagent.get(baseUrl)
  .query({
    where: "1=1",
    outFields: '*',
    f: 'pjson',
  })

function setCandidateContestId(candidateName, contestAbbr) {
  return Candidate.where({ [CANDIDATE_ID]:candidateName})
    .save({contest_id: contestAbbr}, {patch:true})
    .then(function(x) {
      console.log(x.toJSON().contest_id)
    })
}

return result.then((data) => {
  const candidates = JSON.parse(data.text).features

  let contestsToAbbr = {}
  candidates.map (data => {
    const candidate = data.attributes
    delete candidate.OBJECTID

    const candidateName = candidate.Ballot_Name
    const contestAbbr = candidate.Contest_Abbr
    contestsToAbbr[candidate.Contests] = contestAbbr

    setCandidateContestId(candidateName, contestAbbr)
  })

  // Ensure/log that we were properly mapping the full name to abbreviation
  console.log(contestsToAbbr)
})
