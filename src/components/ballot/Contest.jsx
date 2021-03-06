import React from 'react'
import PropTypes from 'prop-types'

import BallotCandidate from './BallotCandidate.jsx'
import { sortCandidates } from 'src/services/candidate_utils'
import { getContestTitle } from 'src/services/contest_utils.js'

import styles from './contest.scss'

export default class Contest extends React.Component {
  _renderContestName () {
    const { contest } = this.props
    return getContestTitle(contest.contest_id)
  }

  render () {
    const { contest } = this.props
    let { candidates } = contest

    candidates = sortCandidates(candidates)

    return (
      <div>
        <div className={styles['header']}>
          {this._renderContestName()}
        </div>
        <div className={styles['candidate-list']}>
          {candidates.map((c, i) => {
            return (
              <BallotCandidate key={i} candidate={c} />
            )
          })}
        </div>
      </div>
    )
  }
}

Contest.propTypes = {
  contest: PropTypes.object,
}
