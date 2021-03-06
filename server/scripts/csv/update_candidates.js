// This script updates candidate data from the CSV of volunteer database
// It prompts on each update

// Open csv file
var parse = require('csv-parse')
var readline = require('readline-sync')
var fs = require('fs')

const Bookshelf = require('../../bookshelf')
const Candidate = require('../../models/candidate')

var inputFile = 'data/2018-data-from-volunteers-2018-09-20.csv'
// var inputFile = 'short.csv'

const columnDefinitions = {
  contests: {
    name: 'contests',
    columnNumber: 0,
    dbColumnName: false,
  },
  candidateName: {
    name: 'Candidate Name',
    columnNumber: 1,
    dbColumnName: 'candidate_name',
  },
  party: {
    name: 'Party',
    columnNumber: 2,
    dbColumnName: 'party',
  },
  _emailWebSiteIgnore: {
    name: 'EmailWebsiteIgnore',
    columnNumber: 3,
    dbColumnName: false,
  },
  phoneNumber: {
    name: 'Phone Number',
    columnNumber: 4,
    dbColumnName: 'phone',
  },
  candWebsiteUrl: {
    name: 'cand_website_url',
    columnNumber: 5,
    dbColumnName: 'website',
  },
  candFacebookUrl: {
    name: 'cand_facebook_url',
    columnNumber: 6,
    dbColumnName: 'facebook_url',
  },
  candTwitterUrl: {
    name: 'cand_twitter_url',
    columnNumber: 7,
    dbColumnName: 'twitter_url',
  },
  candInstagramUrl: {
    name: 'cand_instagram_url',
    columnNumber: 8,
    dbColumnName: 'instagram_url',
  },
  candEmailAddress: {
    name: 'cand_email_address',
    columnNumber: 9,
    dbColumnName: 'email_address',
  },
  ccRegistrationNumber: {
    name: 'cc_registration_number',
    columnNumber: 10,
    dbColumnName: 'cc_registration_number',
  },
  fecCCId: {
    name: 'fec_cc_id',
    columnNumber: 11,
    dbColumnName: 'fec_cc_id',
  },
  previousCivilBeatUrl: {
    name: 'civil_beat_url',
    columnNumber: 12,
    dbColumnName: 'civil_beat_previous_url',
  },
  civilBeatUrl: {
    name: 'cb_url_2018',
    columnNumber: 13,
    dbColumnName: 'civil_beat_url',
  },
  leageWomenVotersUrl: {
    name: 'lwv_url',
    columnNumber: 14,
    dbColumnName: false,
  },
  previousStarAdvertiserUrl: {
    name: 'staradvertiser_previous_url',
    columnNumber: 15,
    dbColumnName: 'staradvertiser_previous_url',
  },
  candidatePhotoUrl: {
    name: 'candidate_photo_url',
    columnNumber: 16,
    dbColumnName: 'candidate_photo_url',
  },
  hawaiiNewsNowUrl: {
    name: 'hawaiiNewsNowUrl',
    columnNumber: 17,
    dbColumnName: 'hawaii_news_now_url',
  },
  starAdvertiserUrl: {
    name: 'staradvertiser_url',
    columnNumber: 18,
    dbColumnName: 'staradvertiser_url',
  },
  inGeneralElection: {
    name: 'in_general_election',
    columnNumber: 19,
  },
}

const columnDefinitionsByLine = Object.values(columnDefinitions).reduce((result, definition) => {
  result[definition.columnNumber] = definition
  return result
}, {})

var parser = parse({delimiter: ','}, function (err, data) {
  data.reduce((promise, line) => {
    return promise.then(() => {
      return handleCsvLine(line)
    })
  }, new Promise(resolve => resolve()))
    .then(function() {
      console.log("Destroying bookshelf pool so process can exit")
      Bookshelf.knex.destroy()
    })
})

fs.createReadStream(inputFile).pipe(parser)
// process.stdin.pipe(parser)

// Print out each candidate
function handleCsvLine(line) {
  // console.log('line', line)
  const inGeneral = line[columnDefinitions['inGeneralElection'].columnNumber]
  const candidateName = readColumn(columnDefinitions.candidateName, line)
  if (candidateName === 'Candidate Name') return new Promise(resolve => resolve())
  // console.log(candidateName, "inGeneral", inGeneral)

  return Candidate
    .forge({candidate_name: candidateName})
    .fetch()
    .then(foundCandidate => {
      // Compare the attributes in the database
      if (inGeneral !== 'Y') {
        // console.log('Deleting!')
        return deleteCandidate(foundCandidate)
      } else if (foundCandidate) {
        // console.log('Comparing!')
        return compareAttributes(foundCandidate, line)
      } else {
        console.log(`Unable to find information for ${candidateName}`)
        return insertNewCandidate(line)
      }
    })
}

function readColumn(columnDefinition, line) {
  return line[columnDefinition.columnNumber]
}

function deleteCandidate(candidate) {
  if (candidate) {
    console.log("Actually deleting")
    return candidate.destroy()
  } else {
    console.log("Already deleted")
    return new Promise(resolve => resolve())
  }
}

function insertNewCandidate(line) {
  const candidateName = readColumn(columnDefinitions.candidateName, line)
  const attributes = line.reduce((attrs, column, i) => {
    const columnDefinition = columnDefinitionsByLine[i]
    if (columnDefinition.dbColumnName) {
      const csvValue = readColumn(columnDefinition, line)
      attrs[columnDefinition.dbColumnName] = csvValue
    }
    return attrs
  }, {})

  console.log('Candidate attributes', attributes)
  var answer = readline.question(`\nAdd new candidate ${candidateName}? `)
  if (answer === 'y') {
    console.log("adding!")
    return new Candidate(attributes).save(null, {method: 'insert'})
  } else {
    console.log("Skipping")
    return new Promise(resolve => resolve())
  }
}

// Compare the attributes from the csv and the database
// If they are different then prompt the user if we want to change the data in
// the database
async function compareAttributes(candidate, line) {
  // console.log('candidate', candidate)
  console.log(`\nOn ${candidate.attributes.candidate_name}`)
  // console.log('candidate', candidate)
  return line.map(async function(csvAttr, i) {
    csvAttr = csvAttr.trim()
    if (csvAttr === '') return null

    const definition = columnDefinitionsByLine[i]
    if (!definition.dbColumnName) return null
    const dbAttr = candidate.attributes[definition.dbColumnName]
    if (csvAttr === dbAttr) return null

    console.log(`\nUpdate ${candidate.attributes.candidate_name}'s ${definition.name}?`)
    console.log(`csv value: "${csvAttr}"`)
    console.log(`db value:  "${dbAttr}"`)
    if (dbAttr && csvAttr.trim() === dbAttr.trim()) {
      return updateCandidate(candidate, definition.dbColumnName, csvAttr)
    }
    if (!dbAttr) {
      return updateCandidate(candidate, definition.dbColumnName, csvAttr)
    }

    if (promptForOverWrite(definition.name)) {
      console.log("Overwriting!")
      await updateCandidate(candidate, definition.dbColumnName, csvAttr)
      console.log('awaited!')
      return new Promise(resolve => resolve())
    } else {
      console.log("Skipping")
      return new Promise(resolve => resolve())
    }
  })
}

function updateCandidate(candidate, attribute, newValue) {
  return Candidate
    .forge({candidate_name: candidate.attributes.candidate_name})
    .save({[attribute]: newValue}, {method: 'update'})
    .then(savedModel => {
      console.log('saved model!')
      return savedModel
    }, err => {
      console.error('received error', err)
    })
}

function promptForOverWrite(columnName) {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    var answer = readline.question(`Overwrite value of ${columnName} [n]? `)
      .trim()
      .toLowerCase()

    switch (answer) {
    case 'y':
    case 'yes':
      return true
    case '':
    case 'n':
    case 'no':
      return false
    case 'q':
      // eslint-disable-next-line no-process-exit
      process.exit(0)
    default:
      console.error("\nPlease enter 'y' or 'n'")
    }
  }
}
