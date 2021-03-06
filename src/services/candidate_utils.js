import SuperAgent from 'superagent'
import groupBy from 'lodash/groupBy'
import flatten from 'lodash/flatten'

import { shuffleArray } from 'src/services/utils'

export function partyIdToTitle(partyId) {
  switch (partyId.toLowerCase()) {
  case 'a':
    return 'American Shopping Party'
  case 'c':
    return 'Constitution Party'
  case 'd':
    return 'Democratic Party'
  case 'g':
    return 'Green Party'
  case 'i':
    return 'Hawaii Independent Party'
  case 'l':
    return 'Libertarian Party'
  case 'r':
    return 'Republican Party'
  case 'ns':
    return 'Non-Partisan Special'
  case 'n':
    return 'Non-Partisan'
  default:
    return partyId
  }
}

export function partyToTitle(party) {
  switch (party) {
  case 'NONPARTISAN SPECIAL':
    return 'NS'
  case 'NONPARTISAN':
    return 'N'
  case 'DEMOCRATIC':
    return 'D'
  case 'GREEN':
    return 'G'
  case 'REPUBLICAN':
    return 'R'
  case 'LIBERTARIAN':
    return 'L'
  default:
    return party
  }
}

export function metadataFieldNameToTitle(fieldName) {
  switch (fieldName) {

  // General
  case 'candidate_name':
    return 'Ballot Name'
  case 'contests':
    return 'Contests'
  case 'party':
    return 'Name of Party'
  case 'candidate_photo_url':
    return 'Photo URL'
  case 'photo_width':
    return 'Photo Width'
  case 'photo_source_text':
    return 'Photo Alt Text'
  case 'phone':
    return 'Phone number'
  case 'website':
    return 'Website'
  case 'facebook_url':
    return 'Facebook'
  case 'twitter_url':
    return 'Twitter'
  case 'instagram_url':
    return 'Instagram'
  case 'email_address':
    return 'E-mail'
  case 'cc_registration_number':
    return 'Candidate Committe Registration Number'
  case 'fec_cc_id':
    return 'FEC Candidate Committee Identifier'
  case 'civil_beat_url':
    return 'Civil Beat Q&A'
  case 'civil_beat_previous_url':
    return 'Civil Beat Q&A (Previous Election)'
  case 'staradvertiser_url':
    return 'Star-Advertiser Link'
  case 'staradvertiser_previous_url':
    return 'Star-Advertiser Link (Previous Election)'
  case 'hawaii_news_now_url':
    return 'Hawaii News Now Coffee with a Candidate'
  case 'candidate_photo_url':
    return 'Candidate Photo URL'
  case 'contest_id':
    return 'Contest Identifier'
  }

  return fieldName
}

export function updateCandidate(candidateName, metadata) {
  var request = SuperAgent.put('/admin/candidate/' + candidateName).send(metadata)
  return request
}

export function sortCandidatesA(candidates) {
  return candidates
}

export function sortCandidates(candidates) {
  // Bracket by party
  const grouped = groupBy(candidates, 'party')
  const values = objectValues(grouped)
  values.forEach(candidateList => {
    shuffleArray(candidateList)
  })
  shuffleArray(values)

  return flatten(values)
}

function objectValues(obj) {
  var res = [];
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      res.push(obj[i]);
    }
  }
  return res;
}
