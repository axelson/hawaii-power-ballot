import React from 'react'

import styles from './sidebar.scss'

export default function Sidebar() {
  var t = Date.parse('2018-11-06') - Date.parse(new Date())
  var daysTillGeneralElection = Math.floor( t/(1000*60*60*24) )

  return (
    <div className={styles['container']}>

      <h3 className={styles['header']}>Key Dates</h3>
      <div className={styles['event-title']}>
        Voter Registration Deadline
      </div>
      <p>
        October 9, 2018, 4:30pm
        <br />
        <a href="http://elections.hawaii.gov/">Register now online</a>
      </p>

      <div className={styles['separator']} />

      <div className={styles['event-title']}>
        Early Walk-in Voting/Late Registration
      </div>
      <p>
        October 23 - November 3, 2018
      </p>

      <div className={styles['separator']} />

      <div className={styles['event-title']}>
        Mail-In Ballot Deadline
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
            7 am to 6pm
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
