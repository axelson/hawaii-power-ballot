import SuperAgent from 'superagent'

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
    return 'Offical Website'
  case 'facebook_url':
    return 'Facebook'
  case 'twitter_url':
    return 'Twitter'
  case 'instagram_url':
    return 'Instagram'
  case 'email_address':
    return 'Email Address'
  case 'cc_registration_number':
    return 'Candidate Committe Registration Number'
  case 'fec_cc_id':
    return 'FEC Candidate Committee Identifier'
  case 'civil_beat_url':
    return 'Civil Beat Link'
  case 'staradvertiser_url':
    return 'Star-Advertiser Link'
  case 'candidate_photo_url':
    return 'Candidate Photo URL'
  case 'contest_id':
    return 'Contest Identifier'
  }

  return fieldName
}

export function updateCandidateMetadata(candidateId, metadata) {
  var request = SuperAgent.put('/admin/candidate/' + candidateId).send(metadata)
  return request
}
