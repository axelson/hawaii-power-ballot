import React, { PropTypes } from 'react'

import CandidateDetailsLinks from './CandidateDetailsLinks.jsx'

import parentStyles from './candidate-details.scss'

export default class CandidateLinks extends React.Component {

  render () {
    const { title, candidate, links } = this.props

    return (
      <div className={this.props.className}>
        <span className={parentStyles['section-title']}>{title}</span>
        {links.map((linkObject, i) => {
          return (
            <CandidateDetailsLinks key={i} candidate={candidate} link={linkObject} />
          )
        })}
      </div>
    )
  }
}

CandidateLinks.propTypes = {
  candidate: PropTypes.object,
  links: PropTypes.array,
}
