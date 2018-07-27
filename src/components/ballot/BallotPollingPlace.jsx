import React from 'react'
import PropTypes from 'prop-types'

export default class BallotPollingPlace extends React.Component {

  render () {
    const { pollingPlace } = this.props

    return (
      <div>
        <div>
          {pollingPlace.POLLNAME + ' ' + pollingPlace.FACILITY}
        </div>
        <div>
          {pollingPlace.FULLADD}
        </div>
        <div>
          {pollingPlace.CITY}
        </div>
      </div>
    )
  }
}

BallotPollingPlace.propTypes = {
  pollingPlace: PropTypes.object,
}
