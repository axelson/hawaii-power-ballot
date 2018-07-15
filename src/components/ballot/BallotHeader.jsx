import React from 'react'
import PropTypes from 'prop-types'

import SvgIcon from 'src/components/common/SvgIcon.jsx'
import BallotPrecinct from './BallotPrecinct.jsx'
import EmbeddedMap from './EmbeddedMap.jsx'

import YourIcon from 'src/assets/icon_yourpowerballot-10.svg'

import styles from './ballot-header.scss'

import { YEAR } from './../../services/dates'

export default class BallotHeader extends React.Component {
  state = {
    showEmbeddedMap: false,
  }

  _toggleEmbeddedMap = () => {
    this.setState((state) => {
      return {
        showEmbeddedMap: !state.showEmbeddedMap,
      }
    })
  }

  render () {
    const { address, ballot, coordinates, precinct } = this.props
    const { showEmbeddedMap } = this.state

    return (
      <div className={styles['container']}>
        <div className={styles['header']}>
          <SvgIcon className={styles['icon']} icon={YourIcon} width='77px' height='65px' />

          <div className={styles['title-container']}>
            <span className={styles['title']}>
              Your Power Ballot
            </span>
            <span className={styles['sub-title']}>
              General Election {YEAR}
            </span>
          </div>
        </div>
        <div className={styles['contents']}>
          <BallotPrecinct
            address={address}
            pollingPlace={ballot.pollingPlace}
            precinct={precinct}
          />
          {/*
          <a className={styles['toggle-map-link']} onClick={this._toggleEmbeddedMap}>Map</a>
          {showEmbeddedMap
            ? <EmbeddedMap latitude={coordinates.latitude} longitude={coordinates.longitude} />
            : null}
          */}
        </div>
      </div>
    )
  }
}

BallotHeader.propTypes = {
  address: PropTypes.string,
  coordinates: PropTypes.object,
  ballot: PropTypes.object,
  precinct: PropTypes.string,
}
