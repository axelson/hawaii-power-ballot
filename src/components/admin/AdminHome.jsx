import React from 'react'
import PropTypes from 'prop-types'

import styles from './admin-home.scss'

export default class AdminHome extends React.Component {
  _renderEditProgress (candidate) {
    if (!candidate) return null

    const totalNumFields = Object.keys(candidate).length
    const filledValues = Object.keys(candidate).filter((key) => {
      return !!candidate[key]
    }).length

    return (
      <span>
        &nbsp;{filledValues}/{totalNumFields}
      </span>
    )
  }

  _renderCandidate = (candidate) => {
    return (
      <div key={candidate.candidate_name}>
        {candidate.candidate_name}&nbsp;
        (<a href={`/admin/candidate/${candidate.candidate_name}`}>Edit</a>)
        {this._renderEditProgress(candidate)}
      </div>
    )
  }

  render () {
    const { candidates } = this.props

    return (
      <div className={styles['container']}>
        <h1>Admin Home Page</h1>
        {candidates.map(this._renderCandidate)}
      </div>
    )
  }
}

AdminHome.propTypes = {
  candidates: PropTypes.array.isRequired,
}
