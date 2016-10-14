import React, { PropTypes } from 'react'

import styles from './admin-home.scss'

export default class AdminHome extends React.Component {
  _renderEditProgress (candidate) {
    if (!candidate) return null

    const metadata = candidate.metadata
    const totalNumFields = Object.keys(metadata).length
    const filledValues = Object.keys(metadata).filter((key) => {
      !!metadata[key]
    }).length

    return (
      <span>
        &nbsp;{filledValues}/{totalNumFields}
      </span>
    )
  }

  _renderCandidate = (candidate) => {
    return (
      <div key={candidate.Candidate_ID}>
        {candidate.Candidate_Name}&nbsp;
        (<a href={`/admin/candidate/${candidate.Candidate_ID}`}>Edit</a>)
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
