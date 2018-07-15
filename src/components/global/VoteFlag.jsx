import React from 'react'

import SvgIcon from 'src/components/common/SvgIcon.jsx'

import StripedFlag from 'src/assets/striped_flag_r0-01.svg'

import styles from './vote-flag.scss'
import {
  YEAR,
  GENERAL_ELECTION_DATE_STRING,
} from './../../services/dates'

export default function VoteFlag (props) {
  const { } = props

  return (
    <div className={styles['flag-container']}>
      <div className={styles['stars']}>★★★</div>
      <div className={styles['flag-title']}>{YEAR} General Election</div>
      <div className={styles['flag-date']}>{GENERAL_ELECTION_DATE_STRING}</div>
      <div>
        <a className={styles['flag-link']} href='http://elections.hawaii.gov/' target='_blank'>Register to Vote!</a>
      </div>
      <SvgIcon
        containerClassName={styles['striped-flag']}
        width='152'
        height='66'
        icon={StripedFlag}
      />
    </div>
  )
}

VoteFlag.propTypes = {
}
