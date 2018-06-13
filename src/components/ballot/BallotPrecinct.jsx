import React from 'react'
import PropTypes from 'prop-types'

import BallotPollingPlace from './BallotPollingPlace.jsx'

import styles from './ballot-precinct.scss'

export default class BallotPrecinct extends React.Component {
  _renderPollingPlace () {
    const { pollingPlace } = this.props
    return (
      <div className={styles['section']}>
        <div className={styles['header']}>Your Polling Place</div>
        <BallotPollingPlace pollingPlace={pollingPlace} />
        <br />
        <a href={`https://olvr.hawaii.gov/2016GeneralElectionBallots/English/${pollingPlace.POLLINGID.replace('-', '')}EN.pdf`} target='_blank'>View Official Ballot</a>
      </div>
    )
  }

  render () {
    const { address, pollingPlace, precinct } = this.props
    const addressInfo = (
      <div className={styles['section']}>
        <div className={styles['header']}>Your Address</div>
        <div>{address}</div>
      </div>
    )

    return (
      <div className={styles['container']}>
        <div>
          {address ? addressInfo : null}
          <div className={styles['section']}>
            <div className={styles['header']}>Your Precinct</div>
            <div>{precinct}</div>
          </div>
        </div>
        {pollingPlace ? this._renderPollingPlace() : null}
      </div>
    )
  }
}

BallotPrecinct.propTypes = {
  address: PropTypes.string,
  pollingPlace: PropTypes.object,
  precinct: PropTypes.string,
}
