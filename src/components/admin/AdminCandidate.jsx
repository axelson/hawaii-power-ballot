import React from 'react'
import PropTypes from 'prop-types'
import CandidateDetails from 'src/components/ballot/CandidateDetails'
import CandidateForm from './CandidateForm'

import { updateCandidate } from 'src/services/candidate_utils'

import styles from './admin-candidate.scss'

export default class AdminCandidate extends React.Component {

  state = {
    candidate: {},
  }

  componentWillMount() {
    const { candidate } = this.props
    this.setState({candidate})
  }

  _showPreviousCandidate = () => {
    this._showCandidate(this.props.candidate.id - 1)
  }

  _showNextCandidate = () => {
    this._showCandidate(this.props.candidate.id + 1)
  }

  _showCandidate (id) {
    window.location = `/admin/candidate/id/${id}`
  }

  _updateCandidateField = (fieldName, value) => {
    const { candidate } = this.state
    let newCandidate = { ...candidate }
    newCandidate[fieldName] = value
    this.setState({candidate: newCandidate})
  }

  _saveCandidate = () => {
    const { candidate } = this.state

    updateCandidate(candidate.candidate_name, candidate).then(
      updatedCandidate => {
        console.log(updatedCandidate)
        alert('Data saved!')
      },
      failure => {
        console.error('Unable to update', failure)
        alert('error white udating')
      }
    )
  }

  render () {
    const { candidate } = this.state

    return (
      <div className='row'>
        <div className={styles['navigation']}>
          <a onClick={this._showPreviousCandidate}>Previous</a>
          |
          <a onClick={this._showNextCandidate}>Next</a>
        </div>
        <div className={styles['candidate-details-container']}>
          <CandidateDetails candidate={candidate} />
        </div>
        <CandidateForm
          candidate={candidate}
          updateCandidateField={this._updateCandidateField}
          saveCandidate={this._saveCandidate}
        />
      </div>
    )
  }
}

AdminCandidate.propTypes = {
  candidate: PropTypes.object,
}
