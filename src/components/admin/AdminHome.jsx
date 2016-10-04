import React, { PropTypes } from 'react'

export default class AdminHome extends React.Component {
  render () {
    const { candidates } = this.props

    return (
      <div>
        AdminHome
        {candidates.map((candidate) => {
          return (
            <div key={candidate.Candidate_ID}>
              {candidate.Candidate_Name}&nbsp;
              (<a href={`/admin/candidate/${candidate.Candidate_ID}`}>Edit</a>)
            </div>
          )
        })}
      </div>
    )
  }
}

AdminHome.propTypes = {
  candidates: PropTypes.array.isRequired,
}
