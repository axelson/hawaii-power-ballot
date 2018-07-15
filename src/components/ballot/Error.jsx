import React from 'react'
import PropTypes from 'prop-types'

import styles from './error.scss'

export default class Error extends React.Component {

  render () {
    const { error } = this.props
    const { message } = error

    return (
      <div className='row'>
        <div className={styles['error-container']}>
          {message}
        </div>
      </div>
    )
  }
}

Error.propTypes = {
  error: PropTypes.object,
}
