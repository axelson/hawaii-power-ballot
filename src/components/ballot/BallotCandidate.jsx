/* global ga:true */
import React from 'react'
import PropTypes from 'prop-types'
import Modal, {closeStyle} from 'simple-react-modal'

import SvgIcon from 'src/components/common/SvgIcon'

import CandidateDetails from './CandidateDetails.jsx'
import CandidateImage from './CandidateImage.jsx'

import { partyIdToTitle } from 'src/services/candidate_utils.js'

import NoPhoto from 'src/assets/no_photo-14.svg'

import styles from './ballot-candidate.scss'

export default class BallotCandidate extends React.Component {
  state = {}

  _showModal = () => {
    const { candidate_name } = this.props.candidate
    this.setState({showModal: true})
    if (typeof ga !== 'undefined') {
      ga('send', 'event', 'button', 'click', candidate_name, 1)
    }
  }

  _closeModal = () => {
    this.setState({showModal: false})
  }

  render () {
    const { candidate } = this.props

    return (
      <div className={styles['container']}>
        <div className={styles['photo-container']} onClick={this._showModal}>
          {candidate.candidate_photo_url
            ? <CandidateImage candidate={candidate} />
            : <SvgIcon icon={NoPhoto} width={64} height={75} /> }
        </div>

        <div className={styles['details']}>
          <div className={styles['name']}>
            <a onClick={this._showModal}>
              {candidate.candidate_name}
            </a>
          </div>
          <div className={styles['party']}>
            {partyIdToTitle(candidate.party)}
          </div>
        </div>

        <Modal
          containerClassName={styles['modal-container']}
          containerStyle={{marginTop: '5vh'}}
          style={{fontFamily: 'inherit'}}
          closeOnOuterClick
          show={this.state.showModal}
          onClose={this._closeModal}
        >
          <a style={closeStyle} onClick={this._closeModal}>X</a>
          <CandidateDetails candidate={candidate} />
        </Modal>
      </div>
    )
  }
}

BallotCandidate.propTypes = {
  candidate: PropTypes.object,
}
