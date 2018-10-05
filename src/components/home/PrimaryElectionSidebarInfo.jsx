import React from 'react'
import PropTypes from 'prop-types'

import styles from './sidebar.scss'

import {
  PRIMARY_ELECTION_WALK_IN,
  PRIMARY_ELECTION_MAIL_IN,
  PRIMARY_ELECTION_DATE_STRING,
  PRIMARY_ELECTION_BUSINESS_HOURS,
} from './../../services/dates'

export default function PrimaryElectionSidebarInfo(props) {
  const { daysTillPrimaryElection } = props

  return (
    <div>
      <div className={styles['event-title']}>
        Primary Election Early Walk-in Voting/Late Registration
      </div>
      <p>
        {PRIMARY_ELECTION_WALK_IN}
      </p>

      <div className={styles['separator']} />

      <div className={styles['event-title']}>
        Primary Election Mail-In Ballot Deadline
      </div>
      <p>
        {PRIMARY_ELECTION_MAIL_IN}
      </p>

      <div className={styles['separator']} />

      <div className={styles['general-election']}>
        <div>
          <div className={styles['event-title']}>
            Primary Election
          </div>
          <p>
            {PRIMARY_ELECTION_DATE_STRING}
            <br />
            {PRIMARY_ELECTION_BUSINESS_HOURS}
          </p>
        </div>
        <div className={styles['countdown-container']}>
          <div className={styles['countdown-number']}>{daysTillPrimaryElection}</div>
          <div className={styles['countdown-days']}>days left</div>
        </div>
      </div>

    </div>
  )
}

PrimaryElectionSidebarInfo.propTypes = {
  daysTillPrimaryElection: PropTypes.number.isRequired,
}
