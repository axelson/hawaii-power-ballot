import React from 'react'
import PropTypes from 'prop-types'

import { getContestTitle } from 'src/services/contest_utils.js'
import { partyToTitle } from 'src/services/candidate_utils.js'
import { authenticated } from 'src/services/authentication_utils'

import CandidateDetailsLink from './CandidateDetailsLink.jsx'
import CandidateDetailsLinks from './CandidateDetailsLinks.jsx'
import CandidateImage from './CandidateImage.jsx'
import Fact from './Fact'

import styles from './candidate-details.scss'

export default class CandidateDetails extends React.Component {

  render () {
    const { candidate } = this.props

    const campaignLinks = [
      // 'expenditure_viz_url',
      // 'csc_standard_url',
      // 'csc_special_url',
    ]

    const candidateLinks = [
      'website',
      'email_address',
      'facebook_url',
      // 'cand_linked',
      'twitter_url',
      'instagram_url',
    ]

    const otherLinks = [
      // 'gov_website_url',
      // 'lwv_website_url',
      // 'ftm_website_url',
      // 'pvs_website_url',
      // 'bp_website_url',
      // 'wp_website_url',
      'civil_beat_url',
      {
        field: 'civil_beat_previous_url',
        alwaysShow: false,
      },
      // {
      //   field: 'pbs_hawaii_url',
      //   alwaysShow: false,
      // },
      {
        field: 'staradvertiser_url',
        alwaysShow: false,
      },
    ]

    return (
      <div className={styles['container']}>
        <div className={styles['candidate-name-container']}>
          <span className={styles['candidate-name']}>
            {candidate.candidate_name} ({partyToTitle(candidate.party)})
          </span>
          <span className={styles['incumbent-text']}>
            {/* candidate.metadata.incumbent_text */}
          </span>
        </div>
        {authenticated()
          ? <div className={styles['edit-link']}><a href={`/admin/candidate/${candidate.candidate_name}`}>Edit</a></div>
          : null}

        <div className={styles['content']}>
          {candidate.candidate_photo_url
            ? <div className={styles['photo-container']}>
              <CandidateImage candidate={candidate} />
            </div>
            : null}
          <div>
            <div>
              <Fact label='Seeking Office' value={getContestTitle(candidate.contest_id)} />
              <Fact label='Party Affiliations' value={candidate.party} />
              {/*<Fact label='Occupation' value={candidate.metadata.occupation} />*/}
            </div>

            <div className={styles['separator']} />

            {/*
            <div className={styles['section']}>
              <div className={styles['column']}>
                <div className={styles['section-title']}>
                  Candidate Committee
                </div>
                <Fact label='Name' value={candidate.metadata.cc_name} />
                <Fact label='Chair' value={candidate.metadata.cc_chair} />
                <Fact label='Treasurer' value={candidate.metadata.cc_treasurer} />
                <CandidateDetailsLink candidate={candidate} fieldName='cc_report_url' />
              </div>
              <CandidateDetailsLinks className={styles['column']} title="Campaign Finance Links" candidate={candidate} links={campaignLinks} />
            </div>

            <div className={styles['separator']} />
            */}

            <div className={styles['section']}>
              <CandidateDetailsLinks className={styles['column']} title="Candidate Links" candidate={candidate} links={candidateLinks} />
              <CandidateDetailsLinks className={styles['column']} title="Other Links" candidate={candidate} links={otherLinks} />
            </div>

            <div className={styles['separator']} />
            <div>
              See a mistake? Have a suggestion?
              &nbsp;<a className={styles['let-us-know']} href='mailto:hawaiipowerballot@gmail.com'>Let us know</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CandidateDetails.propTypes = {
  candidate: PropTypes.object,
}
