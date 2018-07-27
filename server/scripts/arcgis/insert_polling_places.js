'use strict'

const superagent = require('superagent')

const Bookshelf = require('../../bookshelf')
const PollingPlace = require('../../models/polling_place')

const baseUrl = 'https://services.arcgis.com/HQ0xoN0EzDPBOEci/ArcGIS/rest/services/Polling_Places_Statewide/FeatureServer/0/query'

const result = superagent.get(baseUrl)
  .query({
    where: "1=1",
    outFields: '*',
    f: 'pjson',
  })

result.then((data) => {
  const pollingPlaces = JSON.parse(data.text).features
  const promise = pollingPlaces.reduce((promise, data) => {
    return promise.then(() => {
      return insertPollingPlace(data)
    })
  }, new Promise(resolve => resolve()))
  promise.then(() => {
    Bookshelf.knex.destroy()
  })
})

function insertPollingPlace(data) {
  // console.log(data)
  const attrs = data.attributes
  const pollingPlace = {
    OBJECTID: attrs.OBJECTID,
    POLLINGID: attrs.POLLINGID,
    FULLADD: attrs.Address,
    // Warning: This isn't exactly the same
    CITY: attrs.CityZip,
    POLLNAME: attrs.Name,
    FACILITY: attrs.Facility,
    // Note: we could split city and zip if we're actually going to use the data
    ZIPCODE: null,
  }
  console.log('on ', pollingPlace.POLLINGID)

  delete pollingPlace.OBJECTID
  return new PollingPlace(pollingPlace).save()
}
