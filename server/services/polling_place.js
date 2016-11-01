"use strict"

const PollingPlace = require('../models/polling_place')

const POLLING_ID = 'POLLINGID'

function getPollingPlace(pollingId) {
  if (pollingId === 'Absentee Ballot') return null

  return PollingPlace
    .where(POLLING_ID, pollingId)
    .fetch()
    .then(pollingPlace => {
      if (pollingPlace) {
        return pollingPlace.attributes
      } else {
        return pollingPlace
      }
    })
}

module.exports = {
  getPollingPlace,
}
