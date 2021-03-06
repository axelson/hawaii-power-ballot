import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import SvgIcon from 'src/components/common/SvgIcon.jsx'

import VoteFlag from './VoteFlag'

import 'normalize.css'
import Logo from 'src/assets/power_ballot_new-15.svg'
import styles from './header.scss'
import 'src/styles/styles.scss'

import { YEAR } from './../../services/dates'

export default class PublicHeader extends React.Component {
  render () {
    const { } = this.props

    return (
      <div className={styles['container']}>
        <div className={classnames('row', styles['row'])}>
          <div className={styles['hawaii-text']}>STATE OF HAWAII</div>
          <Link to="/">
            <SvgIcon icon={Logo} className={styles['logo']} />
          </Link>
          <div className={styles['subtext']}>
            A robust guide to <u>who</u> and <u>what</u> will be on the {YEAR} General Election ballot.
          </div>
          <div className={styles['vote-flag-container']}>
            <VoteFlag />
          </div>
        </div>
      </div>
    )
  }
}

PublicHeader.propTypes = {
}
