import React from 'react'

import styles from './sidebar.scss'

export default function Sidebar() {
  var primaryElectionDate = Date.parse('2018-08-11') - Date.parse(new Date())
  var daysTillPrimaryElection = Math.floor( primaryElectionDate/(1000*60*60*24) )

  var generalElectionDate = Date.parse('2018-11-06') - Date.parse(new Date())
  var daysTillGeneralElection = Math.floor( generalElectionDate/(1000*60*60*24) )

  return (
    <div className={styles['container']}>

      <h3 className={styles['header']}>Key Dates</h3>
      <div className={styles['event-title']}>
        Primary Election Early Walk-in Voting/Late Registration
      </div>
      <p>
        July 30 - August 9, 2018
      </p>

      <div className={styles['separator']} />

      <div className={styles['event-title']}>
        Primary Election Mail-In Ballot Deadline
      </div>
      <p>
        August 4, 2018
      </p>

      <div className={styles['separator']} />

      <div className={styles['general-election']}>
        <div>
          <div className={styles['event-title']}>
            Primary Election
          </div>
          <p>
            August 11, 2018
            <br />
            7am to 6pm
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
        October 9, 2018, 4:30pm
        <br />
        <a href="http://elections.hawaii.gov/">Register now online</a>
      </p>

      <div className={styles['separator']} />

      <div className={styles['event-title']}>
        General Election Early Walk-in Voting/Late Registration
      </div>
      <p>
        October 23 - November 3, 2018
      </p>

      <div className={styles['separator']} />

      <div className={styles['event-title']}>
        General Election Mail-In Ballot Deadline
      </div>
      <p>
        October 30, 2018
      </p>

      <div className={styles['separator']} />

      <div className={styles['general-election']}>
        <div>
          <div className={styles['event-title']}>
            General Election
          </div>
          <p>
            November 6, 2018
            <br />
            7am to 6pm
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
