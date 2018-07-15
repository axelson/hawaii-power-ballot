import React from 'react'

import styles from './sidebar.scss'

import {
  PRIMARY_ELECTION_WALK_IN,
  PRIMARY_ELECTION_MAIL_IN,
  PRIMARY_ELECTION_DATE,
  PRIMARY_ELECTION_DATE_STRING,
  PRIMARY_ELECTION_BUSINESS_HOURS,
  GENERAL_ELECTION_REGISTRATION_DEADLINE,
  GENERAL_ELECTION_WALK_IN,
  GENERAL_ELECTION_MAIL_IN,
  GENERAL_ELECTION_DATE,
  GENERAL_ELECTION_DATE_STRING,
  GENERAL_ELECTION_BUSINESS_HOURS,
} from './../../services/dates'

export default function Sidebar() {
  var primaryElectionDate = PRIMARY_ELECTION_DATE - Date.parse(new Date())
  var daysTillPrimaryElection = Math.floor( primaryElectionDate/(1000*60*60*24) )

  var generalElectionDate = GENERAL_ELECTION_DATE - Date.parse(new Date())
  var daysTillGeneralElection = Math.floor( generalElectionDate/(1000*60*60*24) )

  return (
    <div className={styles['container']}>

      <h3 className={styles['header']}>Key Dates</h3>
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

      <div className={styles['separator']} />
      <div className={styles['event-title']}>
        General Election Voter Registration Deadline
      </div>
      <p>
        {GENERAL_ELECTION_REGISTRATION_DEADLINE}
        <br />
        <a href="http://elections.hawaii.gov/">Register now online</a>
      </p>

      <div className={styles['separator']} />

      <div className={styles['event-title']}>
        General Election Early Walk-in Voting/Late Registration
      </div>
      <p>
        {GENERAL_ELECTION_WALK_IN}
      </p>

      <div className={styles['separator']} />

      <div className={styles['event-title']}>
        General Election Mail-In Ballot Deadline
      </div>
      <p>
        {GENERAL_ELECTION_MAIL_IN}
      </p>

      <div className={styles['separator']} />

      <div className={styles['general-election']}>
        <div>
          <div className={styles['event-title']}>
            General Election
          </div>
          <p>
            {GENERAL_ELECTION_DATE_STRING}
            <br />
            {GENERAL_ELECTION_BUSINESS_HOURS}
          </p>
        </div>
        <div className={styles['countdown-container']}>
          <div className={styles['countdown-number']}>{daysTillGeneralElection}</div>
          <div className={styles['countdown-days']}>days left</div>
        </div>
      </div>

      <div className={styles['separator']} />
    </div>
  )
}
Sidebar.propTypes = {
}
