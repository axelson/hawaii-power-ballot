import React from 'react'
import PropTypes from 'prop-types'

import StatewideBallotHeader from './StatewideBallotHeader'
import Contest from './Contest'
import Amendment from './Amendment'

export default class StatewideBallot extends React.Component {

  _renderContest (contest) {
    return <Contest key={contest.contest_id} contest={contest} />
  }

  _renderAmendment (amendmentGroup) {
    return (
      <Amendment key={amendmentGroup.id} amendmentGroup={amendmentGroup} />
    )
  }

  render () {
    const { ballot } = this.props
    if (!ballot) return null
    const { contests, amendments } = ballot

    return (
      <div>
        <div className='row'>
          <StatewideBallotHeader />
          {contests.map(this._renderContest)}
          {amendments.map(this._renderAmendment)}
        </div>
      </div>
    )
  }
}

StatewideBallot.propTypes = {
  ballot: PropTypes.object,
}
